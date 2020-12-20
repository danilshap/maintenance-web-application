using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;

namespace WebApplication.Controllers.ControllersModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonRequestStatusController : ControllerBase
    {
        private readonly MaintenanceDatabaseContext _context;

        public PersonRequestStatusController(MaintenanceDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/PersonRequestStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonRequestStatus>>> GetPersonRequestStatuses()
        {
            return await _context.PersonRequestStatuses.ToListAsync();
        }

        // GET: api/PersonRequestStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonRequestStatus>> GetPersonRequestStatus(int id)
        {
            var personRequestStatus = await _context.PersonRequestStatuses.FindAsync(id);

            if (personRequestStatus == null)
            {
                return NotFound();
            }

            return personRequestStatus;
        }

        // PUT: api/PersonRequestStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonRequestStatus(int id, PersonRequestStatus personRequestStatus)
        {
            if (id != personRequestStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(personRequestStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonRequestStatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PersonRequestStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonRequestStatus>> PostPersonRequestStatus(PersonRequestStatus personRequestStatus)
        {
            _context.PersonRequestStatuses.Add(personRequestStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonRequestStatus", new { id = personRequestStatus.Id }, personRequestStatus);
        }

        // DELETE: api/PersonRequestStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonRequestStatus(int id)
        {
            var personRequestStatus = await _context.PersonRequestStatuses.FindAsync(id);
            if (personRequestStatus == null)
            {
                return NotFound();
            }

            _context.PersonRequestStatuses.Remove(personRequestStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonRequestStatusExists(int id)
        {
            return _context.PersonRequestStatuses.Any(e => e.Id == id);
        }
    }
}
