using System.ComponentModel.DataAnnotations;

public class Client
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(45)]
    public string? Name { get; set; }

    public int Points { get; set; }

    [Required]
    [StringLength(45)]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    [StringLength(11)]
    public string? Phone { get; set; }
}
