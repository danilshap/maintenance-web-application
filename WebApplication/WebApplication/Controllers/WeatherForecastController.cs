using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Loader;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase {
        private List<Address> Addresses = new List<Address>();

        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherForecastController(ILogger<WeatherForecastController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public List<Address> Get()
        {
            return Addresses;
        }
    }
}
