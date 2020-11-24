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
        [Required]
        public DateTime DateOfBorn { get; set; }

        // номер телефона
        [Required]
        [MaxLength(20)]
        public string TelephoneNumber { get; set; }

        // данные о человеке
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }

        // адрес проживания
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }

        // коллекция заявок на ремонт
        public virtual ICollection<RepairOrder> RepairOrders { get; set; }

        public Client() {
            RepairOrders = new HashSet<RepairOrder>();
        }
    }
}
