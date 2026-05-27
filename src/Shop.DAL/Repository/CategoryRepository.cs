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

    public async Task<IEnumerable<Category>> GetByIdsAsync(IEnumerable<int> ids)
    {
        if (!ids.Any() || ids == null)
            throw new Exception("In list must be at least one category!");

        var categories = await shopContext.Categories.Where(c => ids.Contains(c.Id)).ToListAsync();

        if (!categories.Any() || categories == null)
            throw new Exception("Cannot find any categories!");

        if (categories.Count() != ids.Count())
            throw new Exception("Not all categories was found!");
        
        return categories;
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }

    public async Task Update(Category category)
    {
        shopContext.Categories.Update(category);
    }
}