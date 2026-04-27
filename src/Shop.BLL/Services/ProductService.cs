public class ProductService(IProductRepository repository) : IProductService
{
    public async Task CreateAsync(CreateProductDto dto)
    {
        var product = dto.ToEntity();

        await repository.AddAsync(product);

        await repository.SaveAsync();
    }
}