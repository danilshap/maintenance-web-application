using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Detail {
        [Key]
        // id
        public int Id { get; set; }

        // название детали
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        // стоимость детали
        [Required]
        [Column("decimal(10, 2)")]
        public decimal Price { get; set; }

        // было ли куплена деталь для ремонта неисправности
        [Required]
        public bool IsBuyingToFix { get; set; }

        // неисправности в которых может использоваться данная деталь
        public virtual ICollection<Malfunction> Malfunctions { get; set; }

        // конструктор
        public Detail() {
            Malfunctions = new HashSet<Malfunction>();
        }
    }
}
