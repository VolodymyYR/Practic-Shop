public record CreateProductDto 
(
    string Name,
    string ImageUrl,
    decimal Price, 
    int DiscountPercentage, 
    int Amount, 
    IReadOnlyCollection<int> Categories
);