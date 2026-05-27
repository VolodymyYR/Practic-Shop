public interface IReviewRepository
{
    Task AddAsync(Review review);
    Task DeleteAsync(int id);
    Task<IEnumerable<Review>> GetAllAsync();
    Task<Review?> GetByIdAsync(int id);
    Task SaveAsync();
}