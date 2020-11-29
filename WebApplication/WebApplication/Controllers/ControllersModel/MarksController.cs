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
    public class MarksController : ControllerBase
    {
        private readonly MaintenanceDatabaseContext _context;

        public MarksController(MaintenanceDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Marks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mark>>> GetMarks()
        {
            return await _context.Marks.ToListAsync();
        }

        // GET: api/Marks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mark>> GetMark(int id)
        {
            var mark = await _context.Marks.FindAsync(id);

            if (mark == null)
            {
                return NotFound();
            }

            return mark;
        }

        // PUT: api/Marks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMark(int id, Mark mark)
        {
            if (id != mark.Id)
            {
                return BadRequest();
            }

            _context.Entry(mark).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkExists(id))
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

        // POST: api/Marks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mark>> PostMark(Mark mark)
        {
            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMark", new { id = mark.Id }, mark);
        }

        // DELETE: api/Marks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMark(int id)
        {
            var mark = await _context.Marks.FindAsync(id);
            if (mark == null)
            {
                return NotFound();
            }

            _context.Marks.Remove(mark);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MarkExists(int id)
        {
            return _context.Marks.Any(e => e.Id == id);
        }
    }
}
