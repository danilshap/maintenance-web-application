using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Maintenance.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApplication.Data;
using WebApplication.Models.Utils;

namespace WebApplication.Models.Processes
{
    public class UserProcess {
        private readonly MaintenanceDatabaseContext _context;
        

        public UserProcess(MaintenanceDatabaseContext context) {
            _context = context;
        }

        public object CanLogin(User user) {
            var identity = GetIdentity(user);
            if(identity == null) throw new WebException("Неверные данные для авторизации");

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                AuthOptions.ISSUER,
                AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new {
                access_token = encodedJwt,
                username = identity.Name
            };
        }

        private ClaimsIdentity GetIdentity(User user) {
            User templateUser =
                _context.Users.FirstOrDefault(u => u.UserName == user.UserName && u.Password == user.Password);
            
            if (templateUser != null) {
                var claims = new List<Claim> {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, templateUser.UserName),
                };
                return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            }

            return null;
        }
    }
}
