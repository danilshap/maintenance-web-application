using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using SQLitePCL;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MalfunctionViewDataController : ControllerBase
    {
        private readonly MalfunctionProcess _malfunctionProcess;

        public MalfunctionViewDataController(MaintenanceDatabaseContext context) {
            _malfunctionProcess = new MalfunctionProcess(context);
        }

        // GET: api/MalfunctionViewData
        [HttpGet("{page}")]
        [ActionName("GetMalfunctions")]
        public IEnumerable<MalfunctionViewData> GetMalfunctions(int page) =>
            _malfunctionProcess.GetMalfunctionsData(page);

        [HttpGet]
        [ActionName("InfoTable")]
        public object GetInfoTable() => _malfunctionProcess.GetMalfunctionsTableInfo();

        // GET: api/MalfunctionViewData/5
        [HttpGet("{id}")]
        [ActionName("GetMalfunction")]
        public MalfunctionViewData GetMalfunction(int id) => _malfunctionProcess.GetMalfunctionData(id);
    }
}
