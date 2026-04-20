using Microsoft.EntityFrameworkCore;

public class UserRepository(ShopContext shopContext) : IUserRepository
{
    public async Task AddAsync(User user)
    {
        await shopContext.Users.AddAsync(user);
    }

    public async Task DeleteAsync(int id)
    {
        var user = await shopContext.Users.FindAsync(id);

        if (user == null)
        {
            throw new KeyNotFoundException("User {id} not found");
        }

        shopContext.Users.Remove(user);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await shopContext.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await shopContext.Users.FindAsync(id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}