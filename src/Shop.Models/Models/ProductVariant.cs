using System.Text.Json;

public class ProductVariant
{
    public int Id {get; private set;}
    public string ArticleCode {get; private set;} = string.Empty;

    public int ProductId {get; private set;}
    public Product Product {get; private set;} = null!;
    
    public string ImageUrl {get; private set;} = string.Empty;
    public decimal Price {get; private set;}
    public string Label {get; private set;} = string.Empty;
    public string Description {get; private set;} = string.Empty;
    public int StockQuantity {get; private set;}
    public int DiscountPercentage {get; private set;} = 0;

    public JsonDocument Specifications {get; private set;} = JsonDocument.Parse("{}");

    private ProductVariant(){}

    public ProductVariant
    (
        string articleCode,
        string imageUrl,
        decimal price,
        string label,
        string description,
        int stockQuantity,
        int discountPercentage,
        Dictionary<string, object?> specifications
    )
    {        
        ArticleCode = Validator.RequiredString(articleCode, nameof(ArticleCode));
        ImageUrl = Validator.RequiredString(imageUrl, nameof(ImageUrl));
        Price = Validator.RequiredPositive(price, nameof(Price));
        Label = Validator.RequiredString(label, nameof(Label));
        Description = Validator.RequiredString(description, nameof(Description));
        StockQuantity = Validator.RequiredNonNegative(stockQuantity, nameof(StockQuantity));
        DiscountPercentage = Validator.RequiredNonNegative(discountPercentage, nameof(DiscountPercentage));
        SetSpecifications(specifications);
    }

    private void SetSpecifications(Dictionary<string, object?> specs)
    {
        var json = JsonSerializer.Serialize(specs);
        Specifications = JsonDocument.Parse(json);
    }

    public Dictionary<string, object?> GetSpecifications()
    {
        if (Specifications == null)
        {
            return new ();
        }

        return JsonSerializer.Deserialize<Dictionary<string, object?>>(
            Specifications.RootElement.GetRawText()
        ) ?? new();
    }
}