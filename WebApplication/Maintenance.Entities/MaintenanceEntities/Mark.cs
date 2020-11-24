using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Mark {
        [Key]
        // id
        public int Id { get; set; }

        // марка авто
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        // модель авто
        [Required]
        [MaxLength(50)]
        public string Model { get; set; }

        // коллекция машин
        public virtual ICollection<Car> Cars { get; set; }

        public Mark() {
            Cars = new HashSet<Car>();
        }
    }
}
