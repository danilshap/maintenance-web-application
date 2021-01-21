using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class ReportsProcess {
        private readonly MaintenanceDatabaseContext _context;

        public ReportsProcess(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получение месячного отчета
        public ReportsViewData GetReport() => new ReportsViewData(_context.RepairOrders
            .Include(ro => ro.Worker)
            .Include(ro => ro.Car)
            .Include(ro => ro.Malfunctions)
            .Where(ro => ro.DateOfTheApplication.Month >= DateTime.Now.Month && ro.IsReady)
            .Select(ro => new CarInServiceViewData(
                new CarViewData(ro.Car, ro.Car.Owner, ro.Car.Mark),
                new WorkerViewData(ro.Worker, ro.Worker.Person, ro.Worker.Status, ro.Worker.Specialty),
                ro.Malfunctions.Select(m => new MalfunctionViewData(m, m.Details.ToList())).ToList()))
            .ToList());

        // получение количества свободных работников
        public int GetFreeWorkers() => _context.Workers
            .Include(w => w.Status)
            .Count(w => w.Status.Status == "На работе. Свободен");

        // получение количества автомобилей в сервисе
        public int GetCarsOnService() => _context.RepairOrders
            .Include(ro => ro.Car)
            .Where(ro => ro.IsReady == false)
            .Select(ro => ro.CarId)
            .Distinct()
            .Count();
    }
}
