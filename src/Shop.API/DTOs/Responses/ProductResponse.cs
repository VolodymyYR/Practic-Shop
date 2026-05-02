public record ProductResponse
(
    int Id,
    string Name,
    string ImageUrl,
    decimal price,
    int DiscountPercentage,
    int Amount,
    IReadOnlyCollection<CategoryResponse> Categories,
    IReadOnlyCollection<Review> Reviews 
);