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
        // обработка по неисправностям
        private readonly MalfunctionProcess _malfunctionProcess;

        public RepairOrderProcess(MaintenanceDatabaseContext context) {
            _context = context;

            _carProcess = new CarProcess(context);
            _clientProcess = new ClientProcess(context);
            _workerProcess = new WorkerProcess(context);
            _malfunctionProcess = new MalfunctionProcess(context);
        }

        // получить все заказы
        public List<RepairOrderViewData> GetRepairOrdersData() =>
            _context.RepairOrders.Select(ro => new RepairOrderViewData(ro,
                _clientProcess.GetClientData((int) ro.ClientId), _carProcess.GetCarData((int) ro.CarId),
                _workerProcess.GetWorkerData((int) ro.WorkerId),
                ro.Malfunctions.Select(m => _malfunctionProcess.GetMalfunctionData(m.Id)).ToList())).ToList();

        // получить конкретный заказ.
        public RepairOrderViewData GetRepairOrderData(int id) {
            // поиск заявки на ремонт
            RepairOrder repairOrder = _context.RepairOrders.FirstOrDefault(ro => ro.Id == id);
            // если мы не нашли данные то мы кидаем исключение
            if(repairOrder == null) throw new Exception("Заявка не была найдена");
            // если у найденной заявки не все данные на месте, то мы кидаем исключение
            if (repairOrder.CarId != null && repairOrder.ClientId != null && repairOrder.WorkerId != null)
                // возвращаем новые данные
                return new RepairOrderViewData(repairOrder,
                    _clientProcess.GetClientData((int) repairOrder.ClientId),
                    _carProcess.GetCarData((int) repairOrder.CarId),
                    _workerProcess.GetWorkerData((int) repairOrder.WorkerId),
                    repairOrder.Malfunctions.Select(m => _malfunctionProcess.GetMalfunctionData(m.Id))
                        .ToList());
            throw new Exception("К сожалению, данные недействительны");
        }

        // добавление нового заказа
        public async void AppendRepairOrder(RepairOrderViewData repairOrderViewData) {
            // поиск авто. если не нашли то добавляем его
            if (!_carProcess.isSetCat(repairOrderViewData.CarViewData.StateNumber).Result)
                _carProcess.AppendCar(repairOrderViewData.CarViewData);
            // после добавления находим это авто
            Car car = _context.Cars.FirstOrDefault(c => c.StateNumber == repairOrderViewData.CarViewData.StateNumber);
            // после поиска второй раз убеждаемся что мы все нашли и что все хорошо
            if(car == null) throw new Exception("Данного авто не существует. Данные недействительны");

            // поиск клиента. если не нашли, то добавляем
            if (!_clientProcess.isSetClient(repairOrderViewData.ClientViewData.Passport).Result)
                _clientProcess.AppendClient(repairOrderViewData.ClientViewData);
            // поиск после добавления клиента
            Client client = _context.Clients.Include(c => c.Person)
                .FirstOrDefault(c => c.Person.Passport == repairOrderViewData.ClientViewData.Passport);
            // убеждаемся что мы все нашли и что добавление прошло успешно
            if(client == null) throw new Exception("Данного клиента не существует. Данные недействительны");

            // поиск работника. если не нашли, то добавляем
            if (!_workerProcess.isSetWorker(repairOrderViewData.WorkerViewData.Passport).Result)
                _workerProcess.AppendWorker(repairOrderViewData.WorkerViewData);
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
            for (int i = 0; i < repairOrderViewData.MalfunctionViewModels.Count; i++) {
                repairOrder.Malfunctions.Add(_context.Malfunctions.FirstOrDefault(m =>
                    m.Title == repairOrderViewData.MalfunctionViewModels[i].Title));
            }

            // добавляем и сохраняем изменения
            _context.RepairOrders.Add(repairOrder);
            await _context.SaveChangesAsync();
        }

        // завершение заказа
        public async void ChangeRepairOrderStatus(int id) {
            RepairOrder repairOrder = _context.RepairOrders.FirstOrDefault(ro => ro.Id == id);
            if(repairOrder == null) throw new Exception("Заявка на ремонт отсутствует. Данные недействительны");
            repairOrder.IsReady = true;
            await _context.SaveChangesAsync();
        }
    }
}
