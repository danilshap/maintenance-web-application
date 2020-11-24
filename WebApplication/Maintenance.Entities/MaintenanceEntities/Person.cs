using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Person {
        [Key]
        // id
        public int Id { get; set; }

        // фамилия
        [Required]
        [MaxLength(20)]
        public string Surname { get; set; }

        // имя
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        // отчество
        [Required]
        [MaxLength(40)]
        public string Patronymic { get; set; }

        // паспорт
        [Required]
        [MaxLength(20)]
        public string Passport { get; set; }

        // ссылка на клиента
        public virtual Client Client { get; set; }

        // ссылка на работника
        public virtual Worker Worker { get; set; }

        // машины во владении
        public virtual ICollection<Car> Cars { get; set; }

        // конструктор
        public Person() {
            Cars = new HashSet<Car>();
        }
    }
}
