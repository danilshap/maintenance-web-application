using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;

namespace WebApplication.Controllers.ControllersModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly MaintenanceDatabaseContext _context;

        public AddressesController(MaintenanceDatabaseContext context) {
            _context = context;
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetDetails() {
            return await _context.Addresses.ToListAsync();
        }
    }
}
