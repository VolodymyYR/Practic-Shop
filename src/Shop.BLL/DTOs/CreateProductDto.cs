public record CreateProductDto 
(
    string Name,
    IReadOnlyCollection<CreateProductVariantDto> ProductVariants,
    IReadOnlyCollection<int> Categories
);