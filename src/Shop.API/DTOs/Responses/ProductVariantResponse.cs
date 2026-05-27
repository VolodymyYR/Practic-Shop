public record ProductVariantResponse
(
    int Id,
    string Article,
    int ProductId,
    string ImageUrl,
    decimal Price,
    string Label,
    string Description,
    int StockQuantity,
    int DiscountPercentage,
    Dictionary<string, object?> Specifications
);