using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Detail {
        [Key]
        // id
        public int Id { get; set; }
        // название детали
        public string Title { get; set; }
        // стоимость детали
        public int Price { get; set; }
        // было ли куплена деталь для ремонта неисправности
        public bool IsBuyingToFix { get; set; }

        // неисправности в которых может использоваться данная деталь
        public virtual ICollection<Malfunction> Malfunctions { get; set; }

        // конструктор
        public Detail() {
            Malfunctions = new HashSet<Malfunction>();
        }
    }
}
