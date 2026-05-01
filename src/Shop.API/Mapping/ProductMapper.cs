public static class ProductMappingExtension
{
    public static CreateProductDto ToCreateDto(this ProductRequestDto dto, string imageUrl)
    {
        return new CreateProductDto(dto.Name, imageUrl, dto.Price, dto.DiscountPercentage, dto.Amount, dto.Categories);
    }

    public static ProductResponseDto ToResponseDto(this Product product)
    {
        return new ProductResponseDto
        (
            product.Id,
            product.Name,
            product.ImageUrl,
            product.Price, 
            product.DiscountPercentage,
            product.Amount,
            product.Categories.Select(pc => 
                new CategoryResponseDto(pc.CategoryId, pc.Category.Name)
            ).ToList(),
            product.Reviews
        );
    }
}