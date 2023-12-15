using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Client> Clients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Product>().ToTable("product")
        .Property(p => p.Id)
        .ValueGeneratedOnAdd();

        modelBuilder.Entity<Client>().ToTable("client")
        .Property(p => p.Id)
        .ValueGeneratedOnAdd();
    }
    
}
