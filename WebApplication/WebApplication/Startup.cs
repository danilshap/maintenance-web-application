using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApplication.Data;
using WebApplication.Models.Utils;

namespace WebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers();
            
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "WebAPI Maintenance",
                    Version = "v1",
                    Description = "��������� ����� ���������� \"���������������\" ��� ��������� ������� �2.",
                });
            });

            // ��������� ��������� ��� ���������� � ��
            services.AddDbContext<MaintenanceDatabaseContext>(
                options => options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection")));

            // ���������� �����������
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer = true,  // ����� �� �������������� �������� ��� ��������� ������
                        ValidIssuer = AuthOptions.ISSUER, // ������������� ��������
                        ValidateAudience = true, // ����� �� �������������� �����������
                        ValidAudience = AuthOptions.AUDIENCE, // ����������� ������
                        ValidateLifetime = true, // �������������� ����� �������������
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(), // ��������� ����� �������������
                        ValidateIssuerSigningKey = true // ��������� ����� ������������
                    };
                });

            services.AddAuthorization(options => {
                var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
                    JwtBearerDefaults.AuthenticationScheme);

                defaultAuthorizationPolicyBuilder =
                    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();

                options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
            });

            services.AddCors(o => o.AddPolicy("MyPolicy", builder => {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI Maintenance");
                });
            }

            app.UseRouting();
            app.UseAuthorization();

            app.UseAuthentication();
            app.UseAuthorization();

            // Use HTTPS Redirection Middleware to redirect HTTP requests to HTTPS.
            app.UseHttpsRedirection();

            app.UseCors("MyPolicy");

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
