using Microsoft.EntityFrameworkCore;

public class ProductVariantRepository(ShopContext shopContext) : IProductVariantRepository
{
    public async Task AddAsync(ProductVariant variant)
    {
        await shopContext.ProductVariants.AddAsync(variant);
    }

    public async Task<ProductVariant> GetByArticleAsync(string article)
    {
        var productVariant = await shopContext.ProductVariants.FirstOrDefaultAsync(pv => pv.ArticleCode == article);

        if (productVariant == null)
            throw new KeyNotFoundException($"Product with article {article} not found");

        return productVariant;
    }

    public async Task DeleteAsync(int id)
    {
        var productVariant = await shopContext.ProductVariants.FindAsync(id);

        if (productVariant == null)
            throw new KeyNotFoundException($"Product variant {id} not found");

        shopContext.ProductVariants.Remove(productVariant);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}