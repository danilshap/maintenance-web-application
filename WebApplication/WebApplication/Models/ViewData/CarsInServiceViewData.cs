using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Models.ViewData
{
    public class CarInServiceViewData {
        // данные об автомобиле
        public CarViewData CarViewData { get; set; }
        // данные о работнике
        public WorkerViewData WorkerViewData { get; set; }
        // список неисправностей
        public List<MalfunctionViewData> MalfunctionsViewData { get; set; }
        // стоимость ремонта
        public double RepairCost => MalfunctionsViewData.Sum(m => m.Price);
        // количество неисправностей
        public int CountOfMalfunctions => MalfunctionsViewData.Count;

        public CarInServiceViewData(CarViewData carViewData, WorkerViewData workerViewData,
            List<MalfunctionViewData> malfunctionsViewData) {
            CarViewData = carViewData;
            WorkerViewData = workerViewData;
            MalfunctionsViewData = malfunctionsViewData;
        }
    }
}
