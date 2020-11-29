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
    public class WorkerStatusController : ControllerBase
    {
        private readonly MaintenanceDatabaseContext _context;

        public WorkerStatusController(MaintenanceDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/WorkerStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkerStatus>>> GetWorkerStatuses()
        {
            return await _context.WorkerStatuses.ToListAsync();
        }

        // GET: api/WorkerStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkerStatus>> GetWorkerStatus(int id)
        {
            var workerStatus = await _context.WorkerStatuses.FindAsync(id);

            if (workerStatus == null)
            {
                return NotFound();
            }

            return workerStatus;
        }

        // PUT: api/WorkerStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkerStatus(int id, WorkerStatus workerStatus)
        {
            if (id != workerStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(workerStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerStatusExists(id))
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

        // POST: api/WorkerStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WorkerStatus>> PostWorkerStatus(WorkerStatus workerStatus)
        {
            _context.WorkerStatuses.Add(workerStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkerStatus", new { id = workerStatus.Id }, workerStatus);
        }

        // DELETE: api/WorkerStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkerStatus(int id)
        {
            var workerStatus = await _context.WorkerStatuses.FindAsync(id);
            if (workerStatus == null)
            {
                return NotFound();
            }

            _context.WorkerStatuses.Remove(workerStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkerStatusExists(int id)
        {
            return _context.WorkerStatuses.Any(e => e.Id == id);
        }
    }
}
