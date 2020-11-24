using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Malfunction {
        [Key]
        public int Id { get; set; }

        // название неисправности
        public string Title { get; set; }
        // количество часов которые займут на ремонт
        public int TimeToFix { get; set; }

        // коллекция заявок на ремонт
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }
        // коллекция деталей для ремонта данной неисправности
        public virtual ICollection<Detail> Details { get; set; }

        public Malfunction() {
            RepairOrders = new HashSet<RepairOrder>();
            Details = new HashSet<Detail>();
        }
    }
}
