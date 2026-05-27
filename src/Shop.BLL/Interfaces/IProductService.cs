public interface IProductService
{
    Task<Product> CreateAsync(CreateProductDto dto);
    Task AddVariantAsync(int id, CreateProductVariantDto variantDto);
    Task DeleteAsync(int id);
    Task DeleteVariantAsync(int productId, int variantId);
    Task<Product> UpdateAsync(int id, string name);
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product> GetByIdAsync(int id);
    Task<IEnumerable<ProductCatalogResponse>> GetCatalogAsync();
    Task<IEnumerable<Category>> GetCategoriesAsync(IEnumerable<int> categoriesId);
}