using System.Collections.Generic;
using System.Linq;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class MalfunctionViewData {
        // id неисправности
        public int Id { get; set; }
        // название неисправности
        public string Title { get; set; }
        // время на устранение неисправности
        public int TimeToFix { get; set; }
        // список деталей для ремонта
        public List<Detail> Details { get; set; }

        public MalfunctionViewData(){}
        public MalfunctionViewData(Malfunction malfunction, List<Detail> details)
        {
            Id = malfunction.Id;
            Title = malfunction.Title;
            TimeToFix = malfunction.TimeToFix;
            Details = details;

            Price = Details.Sum(d => d.Price);
        }

        // стоимость неисправности
        public double Price { get; private set; }
    }
}
