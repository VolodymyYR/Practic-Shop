using Microsoft.EntityFrameworkCore;

public class ShopContext(DbContextOptions<ShopContext> options) : DbContext(options)
{
    public DbSet<Product> Products {get; set;}
    public DbSet<Category> Categories {get; set;}
    public DbSet<User> Users {get; set;}
    public DbSet<Review> Reviews {get; set;}
    public DbSet<Role> Roles {get; set;}
    public DbSet<Permission> Permissions {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopContext).Assembly);
    }
}