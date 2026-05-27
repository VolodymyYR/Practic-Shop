using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.Property(p => p.ArticleCode)
            .HasMaxLength(50);

        builder.HasIndex(p => p.ArticleCode)
            .IsUnique();

        builder.Property(p => p.ImageUrl)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .HasPrecision(18, 2);

        builder.Property(p => p.Label)
            .HasMaxLength(100);
        
        builder.Property(p => p.Description)
            .HasMaxLength(500);

        builder.Property(p => p.Specifications)
            .HasColumnType("jsonb")
            .HasConversion(
                v => v!.RootElement.GetRawText(),
                v => JsonDocument.Parse(v)
            );
        
        builder.HasOne(v => v.Product)
            .WithMany(p => p.Variants)
            .HasForeignKey(v => v.ProductId);
    }
}