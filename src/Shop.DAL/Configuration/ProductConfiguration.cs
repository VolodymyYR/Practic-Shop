using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Name)
            .HasMaxLength(100);

        builder.Ignore(p => p.CoverImageUrl);
        builder.Ignore(p => p.MinPrice);
        builder.Ignore(p => p.MaxDiscountPercentage);
        builder.Ignore(p => p.TotalStock);
        builder.Ignore(p => p.AverageRating);

        builder.Navigation(p => p.Reviews)
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.Navigation(p => p.Categories)
            .UsePropertyAccessMode(PropertyAccessMode.Field);

        builder.Navigation(p => p.Variants)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}