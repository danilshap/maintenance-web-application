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
        public string Surname { get; set; }
        // имя
        public string Name { get; set; }
        // отчество
        public string Patronymic { get; set; }
        // паспорт
        public string Passport { get; set; }

        // ссылка на клиента
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        // ссылка на работника
        [ForeignKey("Worker")]
        public int WorkerId { get; set; }
        public virtual Worker Worker { get; set; }

        // машины во владении
        public virtual ICollection<Car> Cars { get; set; }

        // конструктор
        public Person() {
            Cars = new HashSet<Car>();
        }
    }
}
