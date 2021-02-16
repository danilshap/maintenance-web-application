using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.Utils;

namespace WebApplication.Controllers.ControllersModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase {
        private readonly MaintenanceDatabaseContext _context;
        public AddressesController(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получение данных об адресах
        [HttpGet("{page}")]
        public async Task<ActionResult<IEnumerable<Address>>> GetDetails(int page) {
            // если номер страницы будет нулевой то мы возвращаем null
            if (page == 0) return null;

            // получение диапазона данных в зависимости от страницы и количества данных
            var range = Utils.GetDataRange(page, _context.Addresses.Count());

            // получаем коллекцию
            return await _context.Addresses.Skip(range.from).Take(range.to).ToListAsync();
        }

        // получение информации о таблицах адресов
        [HttpGet]
        public async Task<ActionResult<object>> GetTableInfo() =>
            await Task.Run(() => Utils.GetInfoPage(_context.Addresses.Count()));
        
    }
}
