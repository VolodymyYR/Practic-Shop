using Microsoft.EntityFrameworkCore;

public class ProductRepository(ShopContext shopContext) : IProductRepository
{
    public async Task AddAsync(Product product)
    {
        await shopContext.Products.AddAsync(product);
    }

    public async Task DeleteAsync(int id)
    {
        var product = await shopContext.Products.FindAsync(id);

        if (product == null)
        {
            throw new KeyNotFoundException("Product {id} not found");
        }

        shopContext.Products.Remove(product);
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await shopContext.Products.ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await shopContext.Products
            .Include(p => p.Categories)
                .ThenInclude(pc => pc.Category)
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }

    public async Task Update(Product product)
    {
        shopContext.Products.Update(product);
    }
}