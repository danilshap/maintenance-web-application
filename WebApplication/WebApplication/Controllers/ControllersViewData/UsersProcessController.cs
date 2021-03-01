using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models;
using WebApplication.Data;
using WebApplication.Models.Processes;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersProcessController : ControllerBase
    {
        private readonly UserProcess _usersProcess;

        public UsersProcessController(MaintenanceDatabaseContext context) {
            _usersProcess = new UserProcess(context);
        }

        [HttpPost]
        [ActionName("CanLogin")]
        public object CanLogin([FromBody] User user) =>
            _usersProcess.CanLogin(user);
    }
}
