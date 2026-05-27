public interface IProductVariantService
{
    Task<ProductVariant> GetByArticleAsync(string article);    
}