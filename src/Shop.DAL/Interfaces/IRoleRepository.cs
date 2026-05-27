public interface IRoleRepository
{
    Task AddAsync(Role role);
    Task DeleteAsync(int id);
    Task<IEnumerable<Role>> GetAllAsync();
    Task<Role?> GetByIdAsync(int id);
    Task SaveAsync();
}