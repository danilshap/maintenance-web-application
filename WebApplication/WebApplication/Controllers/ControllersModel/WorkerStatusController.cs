using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.AspNetCore.Authorization;
using WebApplication.Data;
using WebApplication.Models.Utils;

namespace WebApplication.Controllers.ControllersModel
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkerStatusController : ControllerBase {
        private readonly MaintenanceDatabaseContext _context;
        public WorkerStatusController(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получение данных о статусах работников
        [HttpGet("{page}")]
        public async Task<ActionResult<IEnumerable<WorkerStatus>>> GetWorkerStatuses(int page) {
            // если номер страницы будет нулевой то мы возвращаем null
            if (page == 0) return null;

            // получаем коллекцию
            return await _context.WorkerStatuses.Skip(page * 10 - 10).Take(10).ToListAsync();
        }

        // получение данных о таблицах специальностей
        [HttpGet]
        public async Task<ActionResult<object>> GetTableInfo() =>
            await Task.Run(() => Utils.GetInfoPage(_context.WorkerStatuses.Count()));
        
    }
}
