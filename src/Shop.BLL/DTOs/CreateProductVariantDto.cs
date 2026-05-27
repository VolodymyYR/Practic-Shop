public record CreateProductVariantDto
(
    string ArticleCode,
    string ImageUrl,
    decimal Price,
    string Label,
    string Describtion,
    int StockQuantity,
    int DiscountPercentage,
    Dictionary<string, object?> Specifications
);