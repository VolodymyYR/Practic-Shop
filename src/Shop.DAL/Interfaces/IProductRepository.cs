public interface IProductRepository
{
    Task AddAsync(Product product);
    Task DeleteAsync(int id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    IQueryable<Product> GetQueryable();
    Task SaveAsync();
    Task Update(Product product);
}