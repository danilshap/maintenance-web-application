using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Data;

namespace WebApplication.Models.Processes
{
    public class RepairOrderProcess
    {
        private readonly MaintenanceDatabaseContext _context;
        private readonly ClientProcess _clientProcess;
        private readonly CarProcess _carProcess;
        private readonly WorkerProcess _workerProcess;
        private readonly MalfunctionProcess _malfunctionProcess;

        public RepairOrderProcess(MaintenanceDatabaseContext context) {
            _context = context;

            _carProcess = new CarProcess(context);
            _clientProcess = new ClientProcess(context);
            _workerProcess = new WorkerProcess(context);
            _malfunctionProcess = new MalfunctionProcess(context);
        }

        // добавление нового заказа

        // завершение заказа
    }
}
