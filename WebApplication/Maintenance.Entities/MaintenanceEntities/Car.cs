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
        [Required]
        [MaxLength(10)]
        public string StateNumber { get; set; }

        // цвет авто
        [Required]
        [MaxLength(50)]
        public string Color { get; set; }

        // год выпуска
        [Required]
        public int YearOfIssue { get; set; }

        // марка авто
        public int MarkId { get; set; }
        public virtual Mark Mark { get; set; }

        // владелец авто
        public int OwnerId { get; set; }
        public virtual Person Owner { get; set; }

        // коллекция заявок на ремонт
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }

        public Car() {
            RepairOrders = new HashSet<RepairOrder>();
        }
    }
}
