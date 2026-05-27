public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<Category> CreateAsync(CreateCategoryDto dto)
    {
        var category = new Category(dto.Name);

        if (dto.Fields?.Any() == true)
        {
            var fields = dto.Fields.Select(f => new SpecificationField(
                f.Key,
                f.Label,
                f.Type,
                f.Required,
                f.Values
            ))
            .ToList();

            category.SetSpecificationSchema(fields);
        }

        await repository.AddAsync(category);
        await repository.SaveAsync();

        return category;
    }

    public async Task DeleteAsync(int id)
    {
        await repository.DeleteAsync(id);

        await repository.SaveAsync();
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        var categories = await repository.GetAllAsync();

        if (categories == null)
        {
            throw new Exception("Cannot get categories!");
        }

        return categories;
    }

    public async Task<Category> GetByIdAsync(int id)
    {
        var category = await repository.GetByIdAsync(id);

        if (category == null)
        {
            throw new Exception($"Cannot find category with id {id}!");
        }

        return category;
    }

    public async Task<IEnumerable<Category>> GetAllByIds(IEnumerable<int> ids)
    {   
        return await repository.GetByIdsAsync(ids);
    }

    public async Task<IEnumerable<SpecificationField>> GetFullSpecSchema(IEnumerable<Category> categories)
    {
        if (!categories.Any() || categories == null)
            throw new Exception("Request must contain at least one category!");

        var schema = categories
            .Where(c => c.GetSpecificationSchema() != null)
            .SelectMany(c => c.GetSpecificationSchema())
            .ToList();

        if (!schema.Any())
            throw new Exception("Cannot find any schema!");

        return schema;
    }

    public async Task<Category> UpdateNameAsync(string name, int id)
    {
        var category = await repository.GetByIdAsync(id);

        if (category == null)
        {
            throw new Exception($"Cannot update category with id {id}");
        }

        category.UpdateName(name);

        await repository.Update(category);
        await repository.SaveAsync();

        return category;
    }
}