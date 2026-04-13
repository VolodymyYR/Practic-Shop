public class Product 
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;
    public string ImageUrl {get; private set;} = string.Empty;
    public decimal Price {get; private set;}
    public int DiscountPercentage {get; private set;} = 0;
    public int Amount {get; private set;} = 0;

    private readonly List<ProductCategory> _categories = new ();
    public IReadOnlyCollection<ProductCategory> Categories => _categories;

    private readonly List<Review> _reviews = new ();
    public IReadOnlyCollection<Review> Reviews => _reviews;

    public double AverageRating => Reviews.Count == 0 ? 0 : Reviews.Average(r => r.Rating);

    public Product(string name, string imageUrl, decimal price, int discountPercentage, int amount)
    {
        SetName(name);
        SetImage(imageUrl);
        SetPrice(price);
        SetDiscountPercentage(discountPercentage);
        SetAmount(amount);
    }

    private Product() {}

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new Exception("Name cannot be empty");
        }

        Name = name;
    }

    public void SetImage(string imageUrl)
    {
        if (string.IsNullOrWhiteSpace(imageUrl))
        {
            throw new Exception("Url cannot be empty");
        }

        // перевірка чи посилання на фото валідне, хоча думаю що воно буде заливатись

        ImageUrl = imageUrl;
    }

    public void SetPrice(decimal price)
    {
        if (price <= 0)
        {
            throw new Exception("Price must be greater than zero");
        }

        Price = price;
    }

    public void SetDiscountPercentage(int discountPercentage)
    {
        if (discountPercentage < 0 || discountPercentage >= 100)
        {
            throw new Exception("Dicount cannot be grater than 100 and less than 0");
        }

        DiscountPercentage = discountPercentage;
    }

    public void SetAmount(int amount)
    {
        if (amount < 0)
        {
            throw new Exception("Amount cannot be less than 0");
        }

        Amount = amount;
    }

    public void AddCategory(int categoryId)
    {
        if (_categories.Any(c => c.CategoryId == categoryId))
        {
            throw new Exception("Категорії не можуть дублюватись");
        }
        _categories.Add(new ProductCategory(categoryId));
    }

    public void RemoveCategory(int categoryId)
    {
        var productCategory = _categories.FirstOrDefault(c => c.CategoryId == categoryId);

        if (productCategory is null)
        {
            throw new Exception("Категорія для видалення відсутня!");
        }
        
        _categories.Remove(productCategory);
    }
}