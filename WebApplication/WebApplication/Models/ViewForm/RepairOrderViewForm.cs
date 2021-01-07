using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.ViewForm
{
    // класс для представления данных о заявках на ремонт в форме
    public class RepairOrderViewForm {
        // id - заявки на ремонт
        public int Id { get; set; }
        // представления о клиенте
        public ClientViewData ClientViewData { get; set; }
        // представления о автомобиле
        public CarViewData CarViewData { get; set; }
        // данные о работнике
        public string Worker { get; set; }
        // список неисправностей
        public List<MalfunctionViewData> MalfunctionViewModels { get; set; }

        public RepairOrderViewForm() { }
        public RepairOrderViewForm(int id, ClientViewData clientViewData, CarViewData carViewData, string worker, List<MalfunctionViewData> malfunctionViewModels) {
            Id = id;
            ClientViewData = clientViewData;
            CarViewData = carViewData;
            Worker = worker;
            MalfunctionViewModels = malfunctionViewModels;
        }
    }
}
