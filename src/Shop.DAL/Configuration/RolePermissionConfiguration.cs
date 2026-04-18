using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.HasKey(rl => new {rl.RoleId, rl.PermissionId});

        builder.HasOne(rl => rl.Role)
            .WithMany(r => r.RolePermissions)
            .HasForeignKey(r => r.RoleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(rl => rl.Permission)
            .WithMany()
            .HasForeignKey(p => p.PermissionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}