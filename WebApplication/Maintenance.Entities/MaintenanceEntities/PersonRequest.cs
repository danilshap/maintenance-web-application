using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maintenance.Models.MaintenanceEntities
{
    public class PersonRequest {
        [Key]
        // id
        public int Id { get; set; }

        // номер телефона
        [Required]
        [MaxLength(20)]
        public string TelephoneNumber { get; set; }

        // описание проблемы при обращении
        [Required]
        [MaxLength(200)]
        public string DescriptionOfTheProblem { get; set; }

        // данные о человеке
        public int? PersonId { get; set; }
        public virtual Person Person { get; set; }

        // данные о человеке
        public int? PersonRequestStatusId { get; set; }
        public virtual PersonRequestStatus PersonRequestStatus { get; set; }

        public PersonRequest()
        {
        }
    }
}
