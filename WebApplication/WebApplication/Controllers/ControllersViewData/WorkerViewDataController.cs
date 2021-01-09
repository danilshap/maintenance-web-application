using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkerViewDataController : ControllerBase
    {
        private readonly WorkerProcess _workerProcess;

        public WorkerViewDataController(MaintenanceDatabaseContext context) {
            _workerProcess = new WorkerProcess(context);
        }

        // GET: api/WorkerViewData
        [HttpGet]
        [ActionName("GetWorkers")]
        public IEnumerable<WorkerViewData> GetWorkers() => _workerProcess.GetWorkersData();

        [HttpGet]
        [ActionName("GetWorkerForSelect")]
        public IEnumerable<string> GetWorkersForSelect() => _workerProcess.GetWorkersForSelect();

        // GET: api/WorkerViewData/5
        [HttpGet("{id}")]
        [ActionName("GetWorker")]
        public WorkerViewData GetWorker(int id) => _workerProcess.GetWorkerData(id);

        // POST: api/WorkerViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ActionName("PostWorker")]
        public async Task PostWorker(WorkerViewData worker) =>
            await _workerProcess.AppendWorker(worker);

        // DELETE: api/WorkerViewData/5
        [HttpDelete("{id}")]
        [ActionName("DeleteWorker")]
        public async Task DeleteWorker(int id) =>
            await _workerProcess.SafeRemoveWorker(id);
    }
}
