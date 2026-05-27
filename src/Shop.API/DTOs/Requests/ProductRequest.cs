public record ProductRequest
(
    string Name,
    IReadOnlyCollection<int> Categories,
    IReadOnlyCollection<ProductVariantRequest> ProductVariants
);