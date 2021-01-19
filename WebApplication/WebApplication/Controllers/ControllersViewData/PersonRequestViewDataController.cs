using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonRequestViewDataController : ControllerBase {
        private readonly PersonRequestProcess _personRequestProcess;

        public PersonRequestViewDataController(MaintenanceDatabaseContext context) {
            _personRequestProcess = new PersonRequestProcess(context);
        }

        // GET: api/PersonRequestViewData
        [HttpGet]
        public IEnumerable<PersonRequestViewData> GetPersonRequests() => _personRequestProcess.PersonRequestsViewData();

        // GET: api/PersonRequestViewData/5
        [HttpGet("{id}")]
        public PersonRequestViewData GetPersonRequest(int id) => _personRequestProcess.PersonRequestViewData(id);

        [HttpPut("{id}")]
        public async Task PutPersonRequest(int id, string status) =>
            await _personRequestProcess.ChangePersonRequest(id, status);

        // POST: api/PersonRequestViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostPersonRequest(PersonRequestViewData personRequestViewData) =>
            await _personRequestProcess.AppendPersonRequest(personRequestViewData);
    }
}
