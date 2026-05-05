public static class ProductMappingExtension
{
    public static CreateProductDto ToCreateDto(this ProductRequest dto, string imageUrl)
    {
        return new CreateProductDto(dto.Name, imageUrl, dto.Price, dto.DiscountPercentage, dto.Amount, dto.Categories);
    }

    public static ProductResponse ToResponse(this Product product)
    {
        return new ProductResponse
        (
            product.Id,
            product.Name,
            product.ImageUrl,
            product.Price, 
            product.DiscountPercentage,
            product.Amount,
            product.Categories.Select(pc => 
                new CategoryResponse(pc.CategoryId, pc.Category.Name)
            ).ToList(),
            product.Reviews
        );
    }
}