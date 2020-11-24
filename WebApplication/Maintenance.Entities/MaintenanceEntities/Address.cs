using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models.MaintenanceEntities
{
    public sealed class Address {
        [Key]
        // id для адреса
        public int Id { get; set; }

        // улица
        [Required]
        [MaxLength(100)]
        public string Street { get; set; }

        // здание
        [Required]
        [MaxLength(20)]
        public string Building { get; set; }
        // квартира
        public int? Flat { get; set; }

        // список клиентов проживающих по этому адрес
        public ICollection<Client> Clients { get; set; }

        public Address() {
            Clients = new HashSet<Client>();
        }
    }
}
