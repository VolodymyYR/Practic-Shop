public interface IPermissionRepository
{
    Task AddAsync(Permission permission);
    Task DeleteAsync(int id);
    Task<IEnumerable<Permission>> GetAllAsync();
    Task<Permission?> GetByIdAsync(int id);
    Task SaveAsync();
}