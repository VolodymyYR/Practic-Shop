public interface IProductRepository
{
    Task AddAsync(Product product);
    Task DeleteAsync(int id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task SaveAsync();
    Task Update(Product product);
}