using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Client {
        [Key]
        // id
        public int Id { get; set; }
        // дата рождения клиента
        public DateTime DateOfBorn { get; set; }
        // номер телефона
        public string TelephoneNumber { get; set; }
        // даты обращения клиента
        public List<DateTime> AppealDates { get; set; }

        // данные о человеке
        [ForeignKey("Person")]
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }

        // адрес проживания
        [ForeignKey("Address")]
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }

        // коллекция заявок на ремонт
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }

        public Client() {
            RepairOrders = new HashSet<RepairOrder>();
            AppealDates = new List<DateTime>();
        }
    }
}
