using Microsoft.EntityFrameworkCore;

public class RoleRepository(ShopContext shopContext) : IRoleRepository
{
    public async Task AddAsync(Role role)
    {
        await shopContext.Roles.AddAsync(role);
    }

    public async Task DeleteAsync(int id)
    {
        var role = await shopContext.Roles.FindAsync(id);

        if (role == null)
        {
            throw new KeyNotFoundException("Role {id} not found");
        }

        shopContext.Roles.Remove(role);
    }

    public async Task<IEnumerable<Role>> GetAllAsync()
    {
        return await shopContext.Roles.ToListAsync();
    }

    public async Task<Role?> GetByIdAsync(int id)
    {
        return await shopContext.Roles.FindAsync(id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}