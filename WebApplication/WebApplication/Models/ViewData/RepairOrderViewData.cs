using System;
using System.Collections.Generic;
using System.Linq;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewData
{
    public class RepairOrderViewData {
        // id заявки на ремонт
        public int Id { get; set; }
        // дата подачи заявки
        public DateTime DateOfTheApplication { get; set; }
        // статус готовности заявки
        public bool IsReady { get; set; }
        // данные о клиенте
        public ClientViewData ClientViewData { get; set; }
        // данные о автомобиле
        public CarViewData CarViewData { get; set; }
        // данные о работнике
        public WorkerViewData WorkerViewData { get; set; }
        // список неиспраностей
        public List<MalfunctionViewData> MalfunctionViewModels { get; set; }

        public RepairOrderViewData(RepairOrder order, ClientViewData clientViewData, CarViewData carViewData,
            WorkerViewData workerViewData, List<MalfunctionViewData> malfunctionViewModels) {
            Id = order.Id;
            DateOfTheApplication = order.DateOfTheApplication;
            IsReady = order.IsReady;
            ClientViewData = clientViewData;
            CarViewData = carViewData;
            WorkerViewData = workerViewData;
            MalfunctionViewModels = malfunctionViewModels;

            Price = MalfunctionViewModels.Sum(m => m.Price);
            DateOfCompletion = DateTime.Now + TimeSpan.FromHours(MalfunctionViewModels.Sum(m => m.TimeToFix) + 12);
        }

        // стоимость ремонта
        public decimal Price { get; private set; }

        // дата завершения ремонта
        public DateTime DateOfCompletion { get; private set; }
    }
}
