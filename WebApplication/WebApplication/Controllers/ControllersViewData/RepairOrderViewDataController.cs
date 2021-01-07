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
    [Route("api/[controller]")]
    [ApiController]
    public class RepairOrderViewDataController : ControllerBase
    {
        private readonly RepairOrderProcess _repairOrderProcess;

        public RepairOrderViewDataController(MaintenanceDatabaseContext context) {
            _repairOrderProcess = new RepairOrderProcess(context);
        }

        // GET: api/RepairOrderViewData
        [HttpGet]
        public IEnumerable<RepairOrderViewData> GetRepairOrders() => _repairOrderProcess.GetRepairOrdersData();

        // GET: api/RepairOrderViewData/5
        [HttpGet("{id}")]
        public RepairOrderViewData GetRepairOrder(int id) => _repairOrderProcess.GetRepairOrderData(id);

        // PUT: api/RepairOrderViewData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task PutRepairOrder(int id) => await _repairOrderProcess.ChangeRepairOrderStatus(id);

        // POST: api/RepairOrderViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostRepairOrder(RepairOrderViewForm repairOrder) =>
            await _repairOrderProcess.AppendRepairOrder(repairOrder);
    }
}
