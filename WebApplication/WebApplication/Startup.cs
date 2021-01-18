using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;

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
                    Description = "Серверная часть приложения \"Техобслуживание\" для курсового проекта №2.",
                });
            });

            // добавляем синглитон для соединения с БД
            services.AddDbContext<MaintenanceDatabaseContext>(
                options => options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")
                ));

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

            // Use HTTPS Redirection Middleware to redirect HTTP requests to HTTPS.
            app.UseHttpsRedirection();

            app.UseCors("MyPolicy");

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
