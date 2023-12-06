using System.ComponentModel.DataAnnotations;
public class Product
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public int AgeRangeMonthsStart { get; set; }
    public int AgeRangeMonthsEnd { get; set; }
    public int Points { get; set; }
    public string Training { get; set; }
}
