using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.Utils;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class ClientViewDataController : ControllerBase
    {
        private readonly ClientProcess _process;

        public ClientViewDataController(MaintenanceDatabaseContext context) {
            _process = new ClientProcess(context);
        }

        // GET: api/ClientViewData
        [HttpGet("{page}")]
        public IEnumerable<ClientViewData> GetClients(int page) => _process.GetClientsData(page);

        [HttpGet]
        public object GetInfoTable() => Utils.GetInfoPage(_process.GetTableCount());

        // GET: api/ClientViewData/5
        [HttpGet("{id}")]
        public ClientViewData GetClient(int id) => _process.GetClientData(id);

        // PUT: api/ClientViewData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task PutClient(int id, ClientViewData client) {
            if (id != client.Id) throw new Exception("");
            await _process.ChangeClient(client);
        }

        // POST: api/ClientViewData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task PostClient(ClientViewData client) => await _process.AppendClient(client);
    }
}
