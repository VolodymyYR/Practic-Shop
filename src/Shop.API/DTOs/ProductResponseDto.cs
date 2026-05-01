public record ProductResponseDto
(
    int Id,
    string Name,
    string ImageUrl,
    decimal price,
    int DiscountPercentage,
    int Amount,
    IReadOnlyCollection<CategoryResponseDto> Categories,
    IReadOnlyCollection<Review> Reviews 
);