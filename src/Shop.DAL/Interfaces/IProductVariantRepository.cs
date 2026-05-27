public interface IProductVariantRepository
{
    Task AddAsync(ProductVariant variant);
    Task<ProductVariant> GetByArticleAsync(string article);
    Task DeleteAsync(int id);
    Task SaveAsync();
}