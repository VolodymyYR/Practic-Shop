using System.ComponentModel.Design;

public class ProductService(IProductRepository repository) : IProductService
{
    public async Task<Product> CreateAsync(CreateProductDto dto)
    {
        var product = dto.ToEntity();

        await repository.AddAsync(product);

        await repository.SaveAsync();

        return product;
    }

    public async Task DeleteAsync(int id)
    {
        await repository.DeleteAsync(id);

        await repository.SaveAsync();
    }

    public async Task<Product> UpdateAsync(CreateProductDto dto, int id)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            throw new ArgumentNullException($"Product with id {id} not found!");
        }

        product.UpdateDetails(dto.Name, dto.ImageUrl, dto.Price, dto.DiscountPercentage);

        await repository.Update(product);

        await repository.SaveAsync();

        return product;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        var products = await repository.GetAllAsync();

        if (products == null)
        {
            throw new ArgumentNullException("Cannot get products!");
        }

        return products;
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            throw new ArgumentNullException($"Cannot find product with id {id}!");
        }

        return product;
    }
}