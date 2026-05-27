public static class ProductMappingExtension
{
    public static CreateProductDto ToCreateDto(this ProductRequest dto)
    {
        return new CreateProductDto(
            dto.Name, 
            dto.ProductVariants.Select(pv => pv.ToCreateDto()).ToList(), 
            dto.Categories
        );
    }

    public static ProductResponse ToResponse(this Product product, IEnumerable<Category> categories)
    {
        return new ProductResponse
        (
            product.Id,
            product.Name,
            product.CoverImageUrl,
            product.MinPrice, 
            product.MaxDiscountPercentage,
            product.TotalStock,
            categories.Select(c => c.ToResponse()).ToList(),
            product.Variants.Select(v => v.ToResponse()).ToList(),
            product.Reviews.Select(r => r.ToResponse()).ToList()
        );
    }
}