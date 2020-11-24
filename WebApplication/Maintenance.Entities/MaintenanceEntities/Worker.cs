using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.Design;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Worker {
        [Key]
        // id
        public int Id { get; set; }
        // разряд работника
        public string Discharge { get; set; }
        // стаж работы
        public int WorkExperience { get; set; }

        // ссылка на данные по человеку
        [ForeignKey("Person")]
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }

        // ссылка на специальность работника
        [ForeignKey("Specialty")]
        public int SpecialtyId { get; set; }
        public virtual Specialty Specialty { get; set; }

        // работает ли в данный момент работник или нет
        [ForeignKey("Status")]
        public int StatusId { get; set; }
        public virtual WorkerStatus Status { get; set; }

        // список заявок на починку авто
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }

        public Worker() {
            RepairOrders = new HashSet<RepairOrder>();
        }
    }
}
