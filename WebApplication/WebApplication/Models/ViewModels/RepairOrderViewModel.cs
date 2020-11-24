using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;

namespace WebApplication.Models.ViewModels
{
    public class RepairOrderViewModel {
        // id заявки на ремонт
        public int Id { get; set; }
        // дата подачи заявки
        public DateTime DateOfTheApplication { get; set; }
        // статус готовности заявки
        public bool IsReady { get; set; }
        // данные о клиенте
        public ClientViewModel ClientViewModel { get; set; }
        // данные о автомобиле
        public CarViewModel CarViewModel { get; set; }
        // данные о работнике
        public WorkerViewModel WorkerViewModel { get; set; }
        // список неиспраностей
        public List<MalfunctionViewModel> MalfunctionViewModels { get; set; }

        public RepairOrderViewModel(RepairOrder order, ClientViewModel clientViewModel, CarViewModel carViewModel,
            WorkerViewModel workerViewModel, List<MalfunctionViewModel> malfunctionViewModels)
        {
            Id = order.Id;
            DateOfTheApplication = order.DateOfTheApplication;
            IsReady = order.IsReady;
            ClientViewModel = clientViewModel;
            CarViewModel = carViewModel;
            WorkerViewModel = workerViewModel;
            MalfunctionViewModels = malfunctionViewModels;

            Price = MalfunctionViewModels.Sum(m => m.Price);
            DateOfCompletion = DateTime.Now + TimeSpan.FromHours(MalfunctionViewModels.Sum(m => m.TimeToFix) + 12);
        }

        // стоимость ремонта
        public int Price { get; private set; }

        // дата завершения ремонта
        public DateTime DateOfCompletion { get; private set; }
    }
}
