public static class ProductMappingExtension
{
    public static Product ToEntity(this CreateProductDto dto, IReadOnlyCollection<Category> categories)
    {
        return new Product(dto.Name, categories, dto.ProductVariants.Select(pv => pv.ToEntity()).ToList());
    }
}