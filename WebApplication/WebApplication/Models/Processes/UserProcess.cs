using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models;
using WebApplication.Data;

namespace WebApplication.Models.Processes
{
    public class UserProcess {
        private readonly MaintenanceDatabaseContext _context;

        public UserProcess(MaintenanceDatabaseContext context) {
            _context = context;
        }

        public bool CanLogin(User user) =>
            _context.Users.Any(u => u.UserName == user.UserName && u.Password == user.Password);
    }
}
