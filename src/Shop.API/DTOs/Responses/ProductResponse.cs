public record ProductResponse
(
    int Id,
    string Name,
    string CoverImageUrl,
    decimal Price,
    int DiscountPercentage,
    int Amount,
    IReadOnlyCollection<CategoryResponse> Categories,
    IReadOnlyCollection<ProductVariantResponse> Variants,
    IReadOnlyCollection<ReviewResponse> Reviews 
);