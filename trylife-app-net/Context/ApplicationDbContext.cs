using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext() { }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public virtual DbSet<Product> Product { get; set; }
    public virtual DbSet<Client> Client { get; set; }
}
