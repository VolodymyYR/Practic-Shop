using Microsoft.EntityFrameworkCore;

public static class RoleSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>().HasData(
            new Role(1, "admin"),
            new Role(2, "customer")
        );
    }
}