public interface ICategoryRepository
{
    Task AddAsync(Category category);
    Task DeleteAsync(int id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(int id);
    Task SaveAsync();
    Task Update(Category category);
}