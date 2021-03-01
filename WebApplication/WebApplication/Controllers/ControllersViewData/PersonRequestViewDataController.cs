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
using WebApplication.Models.Processes;
using WebApplication.Models.Utils;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonRequestViewDataController : ControllerBase {
        private readonly PersonRequestProcess _personRequestProcess;
        public PersonRequestViewDataController(MaintenanceDatabaseContext context) {
            _personRequestProcess = new PersonRequestProcess(context);
        }

        // GET: api/PersonRequestViewData
        [HttpGet("{page}")]
        [Authorize]
        public IEnumerable<PersonRequestViewData> GetPersonRequests(int page, bool isAll) => 
            _personRequestProcess.PersonRequestsViewData(page, isAll);

        [HttpGet]
        [Authorize]
        public object GetInfoTable(bool isAll) => Utils.GetInfoPage(_personRequestProcess.GetTableCount(isAll));

        // GET: api/PersonRequestViewData/5
        [HttpGet("{id}")]
        [Authorize]
        public PersonRequestViewData GetPersonRequest(int id) => _personRequestProcess.PersonRequestViewData(id);

        [HttpPut("{id}")]
        [Authorize]
        public async Task PutPersonRequest(int id, string status) =>
            await _personRequestProcess.ChangePersonRequest(id, status);

        [HttpPost]
        public async Task PostPersonRequest(PersonRequestViewData personRequestViewData) =>
            await _personRequestProcess.AppendPersonRequest(personRequestViewData);
    }
}
