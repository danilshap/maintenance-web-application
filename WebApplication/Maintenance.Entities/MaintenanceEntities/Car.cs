using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Car {
        [Key]
        // id
        public int Id { get; set; }
        // гос. номер
        public string StateNumber { get; set; }
        // цвет авто
        public string Color { get; set; }
        // год выпуска
        public int YearOfIssue { get; set; }

        // марка авто
        [ForeignKey("Mark")]
        public int MarkId { get; set; }
        public virtual Mark Mark { get; set; }

        // владелец авто
        [ForeignKey("Owner")]
        public int OwnerId { get; set; }
        public virtual Person Owner { get; set; }

        // коллекция заявок на ремонт
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }

        public Car() {
            RepairOrders = new HashSet<RepairOrder>();
        }
    }
}
