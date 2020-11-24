using System.ComponentModel.DataAnnotations;

namespace Maintenance.Models
{
    public class User {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        public string Password { get; set; }

        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string SurnameNp { get; set; }
    }
}
