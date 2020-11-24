using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public class Address {
        [Key]
        // id для адреса
        public int Id { get; set; }
        // улица
        public string Street { get; set; }
        // здание
        public string Building { get; set; }
        // квартира
        public int Flat { get; set; }

        // список клиентов проживающих по этому адресу
        public virtual ICollection<Client> Clients { get; set; }

        public Address() {
            Clients = new HashSet<Client>();
        }
    }
}
