using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models
{
    public class User {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
