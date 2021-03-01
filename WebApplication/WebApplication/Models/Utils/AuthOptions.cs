using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication.Models.Utils
{
    // класс для генерации токена
    public class AuthOptions
    {
        public const string ISSUER = "MaintenanceServer";   // издатель токена
        public const string AUDIENCE = "MaintenanceClient"; // потребитель токена
        private const string KEY = "maintenancesecret_key!123"; // ключ для шифрования
        public const int LIFETIME = 5;

        // получение нового ключа
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
    }
}
