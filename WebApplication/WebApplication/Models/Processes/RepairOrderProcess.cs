using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.ViewData;

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
        public List<RepairOrderViewData> GetRepairOrdersData() =>
            _context.RepairOrders
                .Include(ro => ro.Car)
                .Include(ro => ro.Client)
                .Include(ro => ro.Worker)
                .Include(ro => ro.Malfunctions).ThenInclude(ro => ro.Details)
                .Select(ro => new RepairOrderViewData(ro,
                    new ClientViewData(ro.Client, ro.Client.Person, ro.Client.Address),
                    new CarViewData(ro.Car, ro.Car.Owner, ro.Car.Mark),
                    new WorkerViewData(ro.Worker, ro.Worker.Person, ro.Worker.Status, ro.Worker.Specialty),
                    ro.Malfunctions.Select(m => new MalfunctionViewData(m, m.Details.ToList())).ToList())).ToList();

        // получить конкретный заказ.
        public RepairOrderViewData GetRepairOrderData(int id) {
            if (_context.RepairOrders.Any(ro => ro.Id == id))
                return GetRepairOrdersData().First(ro => ro.Id == id);
            throw new Exception("К сожалению, данные недействительны");
        }

        // добавление нового заказа
        public async Task AppendRepairOrder(RepairOrderViewData repairOrderViewData) {
            // поиск авто. если не нашли то добавляем его
            if (!_carProcess.IsSetCat(repairOrderViewData.CarViewData.StateNumber).Result)
                await _carProcess.AppendCar(repairOrderViewData.CarViewData);
            // после добавления находим это авто
            Car car = _context.Cars.FirstOrDefault(c => c.StateNumber == repairOrderViewData.CarViewData.StateNumber);
            // после поиска второй раз убеждаемся что мы все нашли и что все хорошо
            if(car == null) throw new Exception("Данного авто не существует. Данные недействительны");

            // поиск клиента. если не нашли, то добавляем
            if (!_clientProcess.IsSetClient(repairOrderViewData.ClientViewData.Passport).Result)
                await _clientProcess.AppendClient(repairOrderViewData.ClientViewData);
            // поиск после добавления клиента
            Client client = _context.Clients.Include(c => c.Person)
                .FirstOrDefault(c => c.Person.Passport == repairOrderViewData.ClientViewData.Passport);
            // убеждаемся что мы все нашли и что добавление прошло успешно
            if(client == null) throw new Exception("Данного клиента не существует. Данные недействительны");

            // поиск работника. если не нашли, то добавляем
            if (!_workerProcess.isSetWorker(repairOrderViewData.WorkerViewData.Passport).Result)
                await _workerProcess.AppendWorker(repairOrderViewData.WorkerViewData);
            // поиск после добавления работника
            Worker worker = _context.Workers.Include(w => w.Person)
                .FirstOrDefault(w => w.Person.Passport == repairOrderViewData.WorkerViewData.Passport);
            // убеждаемся что мы все нашли и что добавление прошло успешно
            if(worker == null) throw new Exception("Данного работника не существует. Данные недействительны");

            // создание новой заявки
            RepairOrder repairOrder = new RepairOrder {
                DateOfTheApplication = repairOrderViewData.DateOfTheApplication, IsReady = repairOrderViewData.IsReady,
                CarId = car.Id, ClientId = client.Id, WorkerId = worker.Id
            };

            // добавляем неисправности
            for (int i = 0; i < repairOrderViewData.MalfunctionViewModels.Count; i++) 
                repairOrder.Malfunctions.Add(_context.Malfunctions.FirstOrDefault(m =>
                    m.Title == repairOrderViewData.MalfunctionViewModels[i].Title));

            // добавляем и сохраняем изменения
            _context.RepairOrders.Add(repairOrder);
            await _context.SaveChangesAsync();
        }

        // завершение заказа
        public async Task ChangeRepairOrderStatus(int id) {
            RepairOrder repairOrder = _context.RepairOrders.FirstOrDefault(ro => ro.Id == id);
            if(repairOrder == null) throw new Exception("Заявка на ремонт отсутствует. Данные недействительны");
            repairOrder.IsReady = true;
            await _context.SaveChangesAsync();
        }
    }
}
