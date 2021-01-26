using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.ViewForm
{
    // класс-представление для формы
    public class MalfunctionViewForm {
        public int Id { get; set; } // id неисправности
        public string Title { get; set; }   // название неисправности
        public double Price { get; set; }  // стоимость неисправности

        public MalfunctionViewForm() { }
        public MalfunctionViewForm(MalfunctionViewData malfunction) {
            this.Id = malfunction.Id;
            this.Title = malfunction.Title;
            this.Price = malfunction.Price;
        }
    }
}
