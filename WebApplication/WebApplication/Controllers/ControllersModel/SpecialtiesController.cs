using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;
using WebApplication.Models.Utils;

namespace WebApplication.Controllers.ControllersModel
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpecialtiesController : ControllerBase {
        private readonly MaintenanceDatabaseContext _context;
        public SpecialtiesController(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // получение данных о специальностях
        [HttpGet("{page}")]
        public async Task<ActionResult<IEnumerable<Specialty>>> GetSpecialties(int page) {
            // если номер страницы будет нулевой то мы возвращаем null
            if (page == 0) return null;

            // получаем коллекцию
            return await _context.Specialties.Skip(page * 10 - 10).Take(10).ToListAsync();
        }

        // получение строковых представлений специальностей для добавления нового работника
        [HttpGet]
        public async Task<IEnumerable<string>> GetSpecialtiesStr() {
            return await _context.Specialties.Select(s => s.Title).ToListAsync();
        }

        // получение специальности по id
        [HttpGet("{id}")]
        public async Task<ActionResult<Specialty>> GetSpecialty(int id) {
            var specialty = await _context.Specialties.FindAsync(id);
            if (specialty == null) return NotFound();
            return specialty;
        }

        // получение данных о таблицах специальностей
        [HttpGet]
        public async Task<ActionResult<object>> GetTableInfo() =>
            await Task.Run(() => Utils.GetInfoPage(_context.Specialties.Count()));
    }
}
