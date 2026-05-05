public interface ICategoryService{
    Task<Category> CreateAsync(CreateCategoryDto dto);
    Task DeleteAsync(int id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category> GetByIdAsync(int id);
    Task<Category> UpdateNameAsync(CreateCategoryDto dto, int id);
}