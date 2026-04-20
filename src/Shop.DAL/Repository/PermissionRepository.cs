using Microsoft.EntityFrameworkCore;

public class PermissionRepository(ShopContext shopContext) : IPermissionRepository
{
    public async Task AddAsync(Permission permission)
    {
        await shopContext.Permissions.AddAsync(permission);
    }

    public async Task DeleteAsync(int id)
    {
        var permission = await shopContext.Permissions.FindAsync(id);

        if (permission == null)
        {
            throw new KeyNotFoundException("Role {id} not found");
        }

        shopContext.Permissions.Remove(permission);
    }

    public async Task<IEnumerable<Permission>> GetAllAsync()
    {
        return await shopContext.Permissions.ToListAsync();
    }

    public async Task<Permission?> GetByIdAsync(int id)
    {
        return await shopContext.Permissions.FindAsync(id);
    }

    public async Task SaveAsync()
    {
        await shopContext.SaveChangesAsync();
    }
}