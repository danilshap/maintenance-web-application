using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models.Utils
{
    // класс-обертка для исключений
    public class WebApiException: Exception {
        public WebApiException(string exception): base($"$$${exception}$$$"){}
    }
}
