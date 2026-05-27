using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;

public class ProductService
(
    IProductRepository repository,
    IProductVariantRepository pvRepository,
    ICategoryRepository categoryRepository
): IProductService
{
    public async Task<Product> CreateAsync(CreateProductDto dto)
    {
        var categories = await GetCategoriesAsync(dto.Categories);

        var product = dto.ToEntity(categories.ToImmutableArray());

        await repository.AddAsync(product);

        await repository.SaveAsync();

        return product;
    }

    public async Task AddVariantAsync(int id, CreateProductVariantDto variantDto)
    {
        var product = await GetByIdAsync(id);

        var variant = variantDto.ToEntity();

        product.AddVariant(variant);

        await repository.SaveAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repository.DeleteAsync(id);

        await repository.SaveAsync();
    }

    public async Task DeleteVariantAsync(int productId, int variantId)
    {
        var product = await GetByIdAsync(productId);

        product.RemoveVariant(variantId);

        await pvRepository.SaveAsync();
        await repository.SaveAsync();
    }

    public async Task<Product> UpdateAsync(int id, string name)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            throw new Exception($"Product with id {id} not found!");
        }

        product.UpdateDetails(name);

        await repository.Update(product);

        await repository.SaveAsync();

        return product;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        var products = await repository.GetAllAsync();

        if (products == null)
        {
            throw new Exception("Cannot get products!");
        }

        return products;
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            throw new Exception($"Cannot find product with id {id}!");
        }

        return product;
    }

    public async Task<IEnumerable<ProductCatalogResponse>> GetCatalogAsync()
    {
        return await repository.GetQueryable()
            .Select(p => new ProductCatalogResponse
            (
                p.Id,
                p.Name,
                p.Variants.OrderBy(v => v.Id).Select(v => v.ImageUrl).FirstOrDefault(),
                p.Variants.Min(v => v.Price),
                p.Variants.Max(v => v.DiscountPercentage),
                p.Variants.Sum(v => v.StockQuantity),
                p.Categories.Select(pc => pc.Category.Name).ToList()
            ))
            .ToListAsync();
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync(IEnumerable<int> categoriesId)
    {
        var categories = new List<Category>();

        foreach (int categoryId in categoriesId)
        {
            var category = await categoryRepository.GetByIdAsync(categoryId);

            if (category == null)
                throw new Exception($"Cannot add category with id {categoryId}, do not exist");

            categories.Add(category);
        }
        return categories;
    }
}