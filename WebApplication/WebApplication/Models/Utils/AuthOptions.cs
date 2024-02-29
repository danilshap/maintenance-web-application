using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace WebApplication.Models.Utils
{
    // класс для генерации токена
    public class AuthOptions
    {
        public const string ISSUER = "MaintenanceServer";   // издатель токена
        public const string AUDIENCE = "MaintenanceClient"; // потребитель токена
        private const string KEY = "thisismysecretkeythatneeds32characters"; // ключ для шифрования
        public const int LIFETIME = 5;

        // получение нового ключа
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            var keyByteArray = Encoding.ASCII.GetBytes(KEY);
            var signingKey = new SymmetricSecurityKey(keyByteArray);
            return signingKey;
        }
    }
}
