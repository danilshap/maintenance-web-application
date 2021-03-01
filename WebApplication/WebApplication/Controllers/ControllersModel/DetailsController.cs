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
    [Authorize]
    [ApiController]
    public class DetailsController : ControllerBase {
        private readonly MaintenanceDatabaseContext _context;
        public DetailsController(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получение данных о деталях
        [HttpGet("{page}")]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetails(int page) {
            // если номер страницы будет нулевой то мы возвращаем null
            if (page == 0) return null;

            // получаем коллекцию
            return await _context.Details.Skip(page * 10 - 10).Take(10).ToListAsync();
        }

        // получение данных о таблицах деталях
        [HttpGet]
        public async Task<ActionResult<object>> GetTableInfo(int id) =>
            await Task.Run(() => Utils.GetInfoPage(_context.Details.Count()));
    }
}
