using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public class WorkerStatus
    {
        [Key]
        // id
        public int Id { get; set; }

        // статус работника
        [Required]
        [MaxLength(50)]
        public string Status { get; set; }

        // коллекция ссылок на работников
        public virtual ICollection<Worker> Workers { get; set; }

        public WorkerStatus() {
            Workers = new HashSet<Worker>();
        }
    }
}
