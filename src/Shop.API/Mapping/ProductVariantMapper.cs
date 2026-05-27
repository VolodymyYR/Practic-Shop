public static class ProductVariantMapperExtension
{
    public static CreateProductVariantDto ToCreateDto(this ProductVariantRequest variant)
    {
        return new CreateProductVariantDto
        (
            variant.ArticleCode,
            variant.ImageUrl,
            variant.Price,
            variant.Label,
            variant.Describtion,
            variant.StockQuantity,
            variant.DiscountPercentage,
            variant.Specifications
        );
    }

    public static ProductVariantResponse ToResponse(this ProductVariant variant)
    {
        return new ProductVariantResponse
        (
            variant.Id,
            variant.ArticleCode,
            variant.ProductId,
            variant.ImageUrl,
            variant.Price,
            variant.Label,
            variant.Description,
            variant.StockQuantity,
            variant.DiscountPercentage,
            variant.GetSpecifications()
        );
    }
}