using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Specialty {
        [Key]
        // id
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Worker> Workers { get; set; }

        public Specialty() {
            Workers = new HashSet<Worker>();
        }
    }
}
