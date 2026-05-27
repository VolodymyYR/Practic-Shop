public class ProductVariantService(IProductVariantRepository repository) : IProductVariantService
{
    public async Task<ProductVariant> GetByArticleAsync(string article)
    {
        if (string.IsNullOrWhiteSpace(article))
            throw new Exception("Article code code is empty!");

        return await repository.GetByArticleAsync(article);
    }
}