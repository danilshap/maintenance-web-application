using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.Utils;
using WebApplication.Models.ViewData;
using WebApplication.Models.ViewForm;

namespace WebApplication.Models.Processes
{
    public class RepairOrderProcess {
        // доступ к БД
        private readonly MaintenanceDatabaseContext _context;
        // обработка по клиентам
        private readonly ClientProcess _clientProcess;
        // обработка по авто
        private readonly CarProcess _carProcess;
        // обработка по работникам
        private readonly WorkerProcess _workerProcess;

        public RepairOrderProcess(MaintenanceDatabaseContext context) {
            _context = context;

            _carProcess = new CarProcess(context);
            _clientProcess = new ClientProcess(context);
            _workerProcess = new WorkerProcess(context);
        }

        // получить все заказы
        public List<RepairOrderViewData> GetRepairOrdersDataForView() =>
            _context.RepairOrders
                .Include(ro => ro.Car)
                .Include(ro => ro.Client)
                .Include(ro => ro.Worker)
                .Include(ro => ro.Malfunctions)
                .OrderBy(ro => ro.IsReady)
                .Select(ro => new RepairOrderViewData(ro,
                    new ClientViewData(ro.Client, ro.Client.Person, ro.Client.Address),
                    new CarViewData(ro.Car, ro.Car.Owner, ro.Car.Mark),
                    new WorkerViewData(ro.Worker, ro.Worker.Person, ro.Worker.Status, ro.Worker.Specialty),
                    ro.Malfunctions.Select(m => new MalfunctionViewData(m, m.Details.ToList())).ToList())).ToList();

        // получить заявку на неисправность для отображения в форме по id
        public RepairOrderViewForm GetRepairOrdersDataForForm(int id) =>
            _context.RepairOrders
                .Include(ro => ro.Car)
                .Include(ro => ro.Client)
                .Include(ro => ro.Worker)
                .Include(ro => ro.Malfunctions).ThenInclude(ro => ro.Details)
                .Select(ro => new RepairOrderViewForm(ro.Id,
                    new ClientViewData(ro.Client, ro.Client.Person, ro.Client.Address),
                    new CarViewData(ro.Car, ro.Car.Owner, ro.Car.Mark), 
                    $"{ro.Worker.Person.Surname} {ro.Worker.Person.Name} {ro.Worker.Person.Patronymic}",
                    ro.Malfunctions.Select(m => new MalfunctionViewForm(new MalfunctionViewData(m, m.Details.ToList()))).ToList()))
                .First(ro => ro.Id == id);

        // получить конкретный заказ.
        public RepairOrderViewData GetRepairOrderData(int id) {
            if (_context.RepairOrders.Any(ro => ro.Id == id))
                return GetRepairOrdersDataForView().First(ro => ro.Id == id);
            throw new WebApiException("К сожалению, данные недействительны");
        }

        // добавление нового заказа
        public async Task AppendRepairOrder(RepairOrderViewForm repairOrderViewForm) {
            if(_context.Cars.FirstOrDefault(c => c.StateNumber == repairOrderViewForm.CarViewData.StateNumber && (
                    c.Mark.Model != repairOrderViewForm.CarViewData.MarkModel || c.Mark.Title != repairOrderViewForm.CarViewData.MarkModel
                )) != null)
                throw new WebApiException("Авто с таким гос. номер уже существует. Проверьте корректность данных");

            // поиск авто. если не нашли то добавляем его
            if (!_carProcess.IsSetCat(repairOrderViewForm.CarViewData.StateNumber).Result)
                await _carProcess.AppendCar(repairOrderViewForm.CarViewData);

            // после добавления находим это авто
            Car car = _context.Cars.FirstOrDefault(c =>
                c.StateNumber == repairOrderViewForm.CarViewData.StateNumber);
            // после поиска второй раз убеждаемся что мы все нашли и что все хорошо
            if(car == null) throw new WebApiException("Данного авто не существует. Данные недействительны");

            // поиск клиента. если не нашли, то добавляем
            if (!_clientProcess.IsSetClient(repairOrderViewForm.ClientViewData.Passport).Result)
                await _clientProcess.AppendClient(repairOrderViewForm.ClientViewData);
            // поиск после добавления клиента
            Client client = _context.Clients.Include(c => c.Person)
                .FirstOrDefault(c => c.Person.Passport == repairOrderViewForm.ClientViewData.Passport);
            // убеждаемся что мы все нашли и что добавление прошло успешно
            if(client == null) throw new WebApiException("Данного клиента не существует. Данные недействительны");

            // поиск работника. если не нашли, то добавляем
            string[] wokerData = repairOrderViewForm.Worker.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            Worker worker = _context.Workers.Include(w => w.Person).FirstOrDefault(w =>
                w.Person.Surname == wokerData[0] && w.Person.Name == wokerData[1] &&
                w.Person.Patronymic == wokerData[2]);
            if(worker == null) throw new WebApiException("Данного работника не существует. Данные недействительны");

            // создание новой заявки
            RepairOrder repairOrder = new RepairOrder {
                DateOfTheApplication = DateTime.Now, IsReady = false,
                CarId = car.Id, ClientId = client.Id, WorkerId = worker.Id
            };

            // добавляем неисправности
            for (int i = 0; i < repairOrderViewForm.MalfunctionViewModels.Count; i++) 
                repairOrder.Malfunctions.Add(_context.Malfunctions.FirstOrDefault(m =>
                    m.Title == repairOrderViewForm.MalfunctionViewModels[i].Title));

            // добавляем и сохраняем изменения
            _context.RepairOrders.Add(repairOrder);

            worker.StatusId = _context.WorkerStatuses.First(ws => ws.Status == "Работает в данный момент").Id;

            await _context.SaveChangesAsync();
        }

        // завершение заказа
        public async Task ChangeRepairOrderStatus(int id) {
            RepairOrder repairOrder = _context.RepairOrders.FirstOrDefault(ro => ro.Id == id);
            if(repairOrder == null) throw new WebApiException("Заявка на ремонт отсутствует. Данные недействительны");
            repairOrder.IsReady = true;

            var worker = _context.Workers.FirstOrDefault(w => w.Id == repairOrder.WorkerId);
            if (worker == null) throw new WebApiException("Проблемы с данными о работнике.");
            worker.Status = _context.WorkerStatuses.First(wo => wo.Status == "На работе. Свободен");

            await _context.SaveChangesAsync();
        }

        // оформление новой заявки вместе с использованием заявки оставленной человеком
        public async Task<RepairOrderViewForm> GetRepairOrderViewFormWithPersonRequest(int id) {
            PersonRequest personRequest = _context.PersonRequests
                .Include(pr => pr.Person)
                .FirstOrDefault(pr => pr.Id == id);
            if(personRequest == null) throw new WebApiException("Данной заявки нет. Данные недействительны");

            // создаем переменную в которую мы запихиваем новые данные для оформление заявки на ремонт
            ClientViewData clientViewData = new ClientViewData(
                new Client {TelephoneNumber = personRequest.TelephoneNumber},
                new Person
                {
                    Surname = personRequest.Person.Surname, Name = personRequest.Person.Name,
                    Patronymic = personRequest.Person.Patronymic, Passport = personRequest.Person.Passport
                }, new Address());

            return await Task.Run(() => new RepairOrderViewForm(-1, clientViewData,
                new CarViewData(new Car(), new Person(), new Mark()), "", new List<MalfunctionViewForm>()));
        }
    }
}
