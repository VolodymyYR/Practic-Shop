public record ProductCatalogResponse
(
    int Id,
    string Name,
    string? CoverImageUrl,
    decimal MinPrice,
    int MaxDiscountPersentage,
    int TotalStock,
    List<string> Categories
);