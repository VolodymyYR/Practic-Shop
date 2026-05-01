public interface IProductService
{
    Task<Product> CreateAsync(CreateProductDto dto);
    Task DeleteAsync(int id);
    Task<Product> UpdateAsync(CreateProductDto dto, int id);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
}