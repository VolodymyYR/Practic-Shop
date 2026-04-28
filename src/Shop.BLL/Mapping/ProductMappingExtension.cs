public static class ProductMappingExtension
{
    public static Product ToEntity(this CreateProductDto dto)
    {
        return new Product(dto.Name, dto.ImageUrl, dto.Price, dto.DiscountPercentage, dto.Amount, dto.Categories);
    }
}