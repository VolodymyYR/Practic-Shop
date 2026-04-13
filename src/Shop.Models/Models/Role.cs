public class Role
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;

    private List<RolePermission> _rolePermissions = new ();
    public IReadOnlyCollection<RolePermission> RolePermissions => _rolePermissions;

    public void AddRolePermission(int permissionId)
    {
        if (_rolePermissions.Any(p => p.PermissionId == permissionId))
        {
            throw new Exception("Cannot duplicate permissions");
        }

        _rolePermissions.Add(new RolePermission(permissionId));
    }

    public void RemoveRolePermission(int permissionId)
    {
        var rolePermission = _rolePermissions.FirstOrDefault(p => p.PermissionId == permissionId);

        if (rolePermission is null)
        {
            throw new Exception("Cannot find persmission");
        }

        _rolePermissions.Remove(rolePermission);
    }
}