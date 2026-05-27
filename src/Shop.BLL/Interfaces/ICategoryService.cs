public interface ICategoryService{
    Task<Category> CreateAsync(CreateCategoryDto dto);
    Task DeleteAsync(int id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category> GetByIdAsync(int id);
    Task<IEnumerable<Category>> GetAllByIds(IEnumerable<int> ids);
    Task <IEnumerable<SpecificationField>> GetFullSpecSchema(IEnumerable<Category> categories);
    Task<Category> UpdateNameAsync(string name, int id);
}