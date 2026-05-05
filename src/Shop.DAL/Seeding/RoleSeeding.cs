using Microsoft.EntityFrameworkCore;

public static class RoleSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>().HasData(
            new {Id = 1, Name = "admin"},
            new {Id = 2, Name = "customer"}
        );

        modelBuilder.Entity<Permission>().HasData(
            new {Id = 1, Name = Permissions.ProductCreate},
            new {Id = 2, Name = Permissions.ProductDelete},
            new {Id = 3, Name = Permissions.ProductEdit},
            new {Id = 4, Name = Permissions.CategoryCreate},
            new {Id = 5, Name = Permissions.CategoryDelete},
            new {Id = 6, Name = Permissions.CategoryEdit}
        );

        // Admin 
        modelBuilder.Entity<RolePermission>().HasData(
            new {RoleId = 1, PermissionId = 1},
            new {RoleId = 1, PermissionId = 2},
            new {RoleId = 1, PermissionId = 3},
            new {RoleId = 1, PermissionId = 4},
            new {RoleId = 1, PermissionId = 5},
            new {RoleId = 1, PermissionId = 6}
        );
    }
}