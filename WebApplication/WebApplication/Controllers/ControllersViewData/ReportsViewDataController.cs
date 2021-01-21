using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.ViewData;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportsViewDataController : ControllerBase {

        private readonly ReportsProcess _reportsProcess;

        public ReportsViewDataController(MaintenanceDatabaseContext context) {
            _reportsProcess = new ReportsProcess(context);
        }

        // GET: api/<ReportsViewDataController>
        [HttpGet]
        [ActionName("Get")]
        public ReportsViewData Get() => _reportsProcess.GetReport();

        [HttpGet]
        [ActionName("GetCountOfFreeWorker")]
        public int GetCountOfFreeWorker() => _reportsProcess.GetFreeWorkers();

        [HttpGet]
        [ActionName("GetCountOfCarsInService")]
        public int GetCountOfCarsInService() => _reportsProcess.GetCarsOnService();
    }
}
