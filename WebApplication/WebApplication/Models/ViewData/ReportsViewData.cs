using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class ReportsViewData {
        // устраненные неисправности за месяц
        public List<GroupMalfunctionViewData> MalfunctionsViewData { get; private set; }

        // количество неисправностей
        public int CountOfMalfunctions { get; private set; }

        // стоимость неисправностей
        public double PriceOfMalfunctions { get; private set; }

        // список автомобилей
        public List<CarInServiceViewData> CarsInServicesViewData { get; set; }

        public ReportsViewData(List<CarInServiceViewData> carsInServicesViewData) {
            CarsInServicesViewData = carsInServicesViewData;
            PriceOfMalfunctions = CarsInServicesViewData
                .Sum(c => c.RepairCost);

            CountOfMalfunctions = CarsInServicesViewData
                .Sum(c => c.CountOfMalfunctions);

            var templ = new List<MalfunctionViewData>();
            carsInServicesViewData.ForEach(c => templ.AddRange(c.MalfunctionsViewData));
            MalfunctionsViewData = templ.GroupBy(t => t.Title).Select(t => new GroupMalfunctionViewData {
                Title = t.Key,
                Count = t.Count()
            }).ToList();
        }
    }
}
