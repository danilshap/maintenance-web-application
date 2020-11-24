using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewModels
{
    public class MalfunctionViewModel {
        // id неисправности
        public int Id { get; set; }
        // название неисправности
        public string Title { get; set; }
        // время на устранение неисправности
        public int TimeToFix { get; set; }
        // список деталей для ремонта
        public List<Detail> Details { get; set; }

        public MalfunctionViewModel(Malfunction malfunction, List<Detail> details)
        {
            Id = malfunction.Id;
            Title = malfunction.Title;
            TimeToFix = malfunction.TimeToFix;
            Details = details;

            Price = Details.Where(d => d.IsBuyingToFix).Sum(d => d.Price);
        }

        // стоимость неисправности
        public int Price { get; private set; }
    }
}
