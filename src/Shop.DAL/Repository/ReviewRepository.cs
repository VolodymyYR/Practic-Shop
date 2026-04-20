using Microsoft.EntityFrameworkCore;

public class ReviewRepository(ShopContext shopContext) : IReviewRepository
{
    public async Task AddAsync(Review review)
    {
        await shopContext.Reviews.AddAsync(review);
    }

    public async Task DeleteAsync(int id)
    {
        var review = await shopContext.Reviews.FindAsync(id);

        if (review == null)
        {
            throw new KeyNotFoundException("Review {id} not found");
        }

        shopContext.Reviews.Remove(review);
    }

    public async Task<IEnumerable<Review>> GetAllAsync()
    {
        return await shopContext.Reviews.ToListAsync();
    }

    public async Task<Review?> GetByIdAsync(int id)
    {
        return await shopContext.Reviews.FindAsync(id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}