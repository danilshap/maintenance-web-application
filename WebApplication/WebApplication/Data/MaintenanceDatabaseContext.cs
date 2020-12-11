using System.Linq;
using System.Runtime.CompilerServices;
using Maintenance.Models;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.Data
{
    public class MaintenanceDatabaseContext: DbContext {
        public MaintenanceDatabaseContext(DbContextOptions<MaintenanceDatabaseContext> options)
            : base(options) {
            // для заполнения БД случайными данными
            // раскоментировать перед созданием миграции (второй)
            // this.Seed();
        }

        // данные о персонах
        public DbSet<Person> Persons { get; set; }
        // данные о адресах
        public DbSet<Address> Addresses { get; set; }
        // данные об автомобилях
        public DbSet<Car> Cars { get; set; }
        // данные о клиентах
        public DbSet<Client> Clients { get; set; }
        // данные о деталях
        public DbSet<Detail> Details { get; set; }
        // данные о неисправностях
        public DbSet<Malfunction> Malfunctions { get; set; }
        // данные о марках авто
        public DbSet<Mark> Marks { get; set; }
        // данные о заявках на ремонт
        public DbSet<RepairOrder> RepairOrders { get; set; }
        // данные о специальностях работников
        public DbSet<Specialty> Specialties { get; set; }
        // данные о работниках
        public DbSet<Worker> Workers { get; set; }
        // данные о статусах работников
        public DbSet<WorkerStatus> WorkerStatuses { get; set; }
        // данные о пользователях
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }
    }
}
