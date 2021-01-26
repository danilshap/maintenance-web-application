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
using WebApplication.Models.ViewForm;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RepairOrderViewDataController : ControllerBase
    {
        private readonly RepairOrderProcess _repairOrderProcess;

        public RepairOrderViewDataController(MaintenanceDatabaseContext context) {
            _repairOrderProcess = new RepairOrderProcess(context);
        }

        // GET: api/RepairOrderViewData
        [HttpGet]
        [ActionName("GetRepairOrderForView")]
        public IEnumerable<RepairOrderViewData> GetRepairOrderForView() =>
            _repairOrderProcess.GetRepairOrdersDataForView();

        [HttpGet("{id}")]

        [ActionName("GetRepairOrderForForm")]
        public RepairOrderViewForm GetRepairOrderForForm(int id) => _repairOrderProcess.GetRepairOrdersDataForForm(id);

        // GET: api/RepairOrderViewData/5
        [HttpGet("{id}")]
        [ActionName("GetRepairOrder")]
        public RepairOrderViewData GetRepairOrder(int id) => _repairOrderProcess.GetRepairOrderData(id);

        [HttpGet("{id}")]
        [ActionName("RegistrationNewRepairOrderForPersonRequest")]
        public RepairOrderViewForm RegistrationNewRepairOrderForPersonRequest(int id) =>
            _repairOrderProcess.GetRepairOrderViewFormWithPersonRequest(id).Result;

        // PUT: api/RepairOrderViewData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ActionName("PutRepairOrder")]
        public async Task PutRepairOrder(int id) => await _repairOrderProcess.ChangeRepairOrderStatus(id);

        // POST: api/RepairOrderViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ActionName("PostRepairOrder")]
        public async Task PostRepairOrder(RepairOrderViewForm repairOrder) =>
            await _repairOrderProcess.AppendRepairOrder(repairOrder);
    }
}
