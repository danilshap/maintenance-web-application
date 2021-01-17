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
        public Dictionary<MalfunctionViewData, int> MalfunctionsViewData { get; private set; } = new Dictionary<MalfunctionViewData, int>();

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
        }
    }
}
