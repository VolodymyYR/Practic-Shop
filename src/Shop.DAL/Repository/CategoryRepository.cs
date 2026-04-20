using Microsoft.EntityFrameworkCore;

public class CategoryRepository(ShopContext shopContext) : ICategoryRepository
{
    public async Task AddAsync(Category category)
    {
        await shopContext.Categories.AddAsync(category);
    }

    public async Task DeleteAsync(int id)
    {
        var category = await shopContext.Categories.FindAsync(id);

        if (category == null)
        {
            throw new KeyNotFoundException("Category {id} not found");
        }

        shopContext.Categories.Remove(category);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await shopContext.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await shopContext.Categories.FindAsync(id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}