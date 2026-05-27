public static class ProductVariantExtension
{
    public static ProductVariant ToEntity(this CreateProductVariantDto dto)
    {
        return new ProductVariant
        (
            dto.ArticleCode,
            dto.ImageUrl,
            dto.Price,
            dto.Label,
            dto.Describtion,
            dto.StockQuantity,
            dto.DiscountPercentage,
            dto.Specifications
        );
    }
}