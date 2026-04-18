using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Name)
            .HasMaxLength(100);

        builder.Property(p => p.ImageUrl)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .HasPrecision(18, 2);

        builder.Navigation(p => p.Reviews)
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.Navigation(p => p.Categories)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}