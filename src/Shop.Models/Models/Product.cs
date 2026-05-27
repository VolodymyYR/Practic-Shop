public class Product 
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;

    public string CoverImageUrl => Variants.Any() ? Variants.FirstOrDefault()?.ImageUrl! : DefaultFields.ImageUrl;
    public decimal MinPrice => Variants.Any() ? Variants.Min(v => v.Price) : 0;
    public int MaxDiscountPercentage => Variants.Any() ? Variants.Max(v => v.DiscountPercentage) : 0;
    public int TotalStock => Variants.Sum(v => v.StockQuantity);
    public double AverageRating => Reviews.Count == 0 ? 0 : Reviews.Average(r => r.Rating);

    private readonly List<ProductVariant> _variants = new();
    public IReadOnlyCollection<ProductVariant> Variants => _variants;

    private readonly List<ProductCategory> _categories = new ();
    public IReadOnlyCollection<ProductCategory> Categories => _categories;

    private readonly List<Review> _reviews = new ();
    public IReadOnlyCollection<Review> Reviews => _reviews;

    private Product() {}

    public Product
    (
        string name,
        IReadOnlyCollection<Category> Categories,
        IReadOnlyCollection<ProductVariant> variants
    )
    {
        Name = Validator.RequiredString(name, nameof(Name));
        SetCategories(Categories);
        SetProductVariant(variants);
    }

    public void UpdateDetails(string name)
    {
        Name = Validator.RequiredString(name, nameof(Name));
    }

    public void AddVariant(ProductVariant variant)
    {
        if (_variants.Any(v => v.ArticleCode == variant.ArticleCode))
            throw new Exception("Cannot add duplicate variant");

        var schema = _categories
            .Select(pc => pc.Category)
            .Where(c => c.GetSpecificationSchema() != null)
            .SelectMany(c => c.GetSpecificationSchema())
            .ToList();

        var missingFields = schema
            .Where(f => f.Required && !variant.Specifications.RootElement.TryGetProperty(f.Key, out _))
            .Select(f => f.Key)
            .ToList();

        if (missingFields.Any())
            throw new Exception("Cannot add variand, missing required fields");

        _variants.Add(variant);       
    }

    public void RemoveVariant(int id)
    {
        var variant = Variants.FirstOrDefault(v => v.Id == id);

        if(!Variants.Any() || variant == null)
            throw new Exception($"Cannot find variant with {id}!");

        _variants.Remove(variant);
    }

    public void AddCategory(Category category)
    {
        if (_categories.Any(c => c.CategoryId == category.Id))
            throw new Exception("Cannot add duplicate category");

        var existingFields = _categories
            .Select(pc => pc.Category)
            .Where(c => c.SpecificationSchema != null)
            .SelectMany(c => c.GetSpecificationSchema())
            .Select(f => f.Key)
            .ToHashSet();

        var conflicts = category.GetSpecificationSchema()
            .Select(f => f.Key)
            .Where(f => existingFields.Contains(f))
            .ToList();

        if (conflicts.Any())
            throw new Exception($"Category conflict! in fields {string.Join(", ", conflicts)}");

        _categories.Add(new ProductCategory(category.Id, category));
    }

    public void RemoveCategory(int categoryId)
    {
        var productCategory = _categories.FirstOrDefault(c => c.CategoryId == categoryId);

        if (productCategory is null)
            throw new Exception($"Cannot delete category with id {categoryId}, dont exist");
        
        _categories.Remove(productCategory);
    }



    public void SetProductVariant(IReadOnlyCollection<ProductVariant> variants)
    {
        if (variants == null || !variants.Any())
            throw new Exception("Product must have at least one variant");

        foreach (var variant in variants)
        {
            AddVariant(variant);
        }
    }

    private void SetCategories(IReadOnlyCollection<Category> categories)
    {
        if (categories == null || !categories.Any())
            throw new Exception("Product must have at least one category");

        foreach (var category in categories)
        {
            AddCategory(category);
        }
    }
}