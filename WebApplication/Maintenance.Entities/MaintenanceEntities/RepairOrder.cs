using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Maintenance.Models.MaintenanceEntities
{
    public class RepairOrder {
        [Key]
        // id
        public int Id { get; set; }
        // дата оформления заявки
        public DateTime DateOfTheApplication { get; set; }
        // выполнена ли работа или нет
        public bool IsReady { get; set; }

        // клиент
        [ForeignKey("Client")]
        public int ClientId { get; set; }
        public virtual Client Client { get; set; }

        // автомобиль
        [ForeignKey("Car")]
        public int CarId { get; set; }
        public virtual Car Car { get; set; }

        // работник
        [ForeignKey("Worker")]
        public int WorkerId { get; set; }
        public virtual Worker Worker { get; set; }
        
        // неисправности
        public virtual ICollection<Malfunction> Malfunctions { get; set; }

        public RepairOrder() {
            Malfunctions = new HashSet<Malfunction>();
        }
    }
}
