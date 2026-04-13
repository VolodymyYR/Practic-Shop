using System.Runtime.CompilerServices;

public class ProductCategory
{
    public int ProductId {get; private set;}
    public int CategoryId {get; private set;}

    public Product Product {get; private set;} = null!;
    public Category Category {get; private set;} = null!;
    
    private ProductCategory(){}

    public ProductCategory(int categoryId)
    {
        CategoryId = categoryId;
    }
}