using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Client
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? Id { get; set; }

    [Required]
    [StringLength(45)]
    public string? Name { get; set; }

    public int Points { get; set; }

    [Required]
    [StringLength(45)]
    public string? Email { get; set; }

    [Required]
    [StringLength(11)]
    public string? Phone { get; set; }
}
