using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maintenance.Models.MaintenanceEntities
{
    public class PersonRequestStatus {
        [Key]
        // id
        public int Id { get; set; }

        // статус для обращения
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }

        // заявки
        public virtual ICollection<PersonRequest> PersonRequests { get; set; }

        public PersonRequestStatus() {
            PersonRequests = new HashSet<PersonRequest>();
        }
    }
}
