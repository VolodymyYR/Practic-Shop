public record ProductRequestDto
(
    string Name,
    IFormFile Image,
    decimal Price, 
    int DiscountPercentage, 
    int Amount, 
    IReadOnlyCollection<int> Categories
);