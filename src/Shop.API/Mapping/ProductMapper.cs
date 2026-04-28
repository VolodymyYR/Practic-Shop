public static class ProductMappingExtension
{
    public static CreateProductDto ToCreateDto(this ProductRequestDto dto, string imageUrl)
    {
        return new CreateProductDto(dto.Name, imageUrl, dto.Price, dto.DiscountPercentage, dto.Amount, dto.Categories);
    }
}