public interface IUserRepository
{
    Task AddAsync(User user);
    Task DeleteAsync(int id);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByEmail(string email);
    Task SaveAsync();
}