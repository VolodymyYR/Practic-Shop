public class CategoryService(ICategoryRepository repository) : ICategoryService
{
    public async Task<Category> CreateAsync(CreateCategoryDto dto)
    {
        var category = dto.ToEntity();

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
            throw new NullReferenceException("Cannot get categories!");
        }

        return categories;
    }

    public async Task<Category> GetByIdAsync(int id)
    {
        var category = await repository.GetByIdAsync(id);

        if (category == null)
        {
            throw new NullReferenceException($"Cannot find category with id {id}!");
        }

        return category;
    }

    public async Task<Category> UpdateNameAsync(CreateCategoryDto dto, int id)
    {
        var category = await repository.GetByIdAsync(id);

        if (category == null)
        {
            throw new ArgumentNullException($"Cannot update category with id {id}");
        }

        category.SetName(dto.Name);

        await repository.Update(category);
        await repository.SaveAsync();

        return category;
    }
}