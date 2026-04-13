public class User
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;
    public string PassWordHash {get; private set;} = string.Empty;
    public string Email {get; private set;} = string.Empty;

    private List<UserRole> _userRoles = new ();
    public IReadOnlyCollection<UserRole> UserRoles => _userRoles;

    private User(){}

    public User(string name, string passWordHash, string email)
    {
        SetName(name);
        SetPassWordHash(passWordHash);
        SetEmail(email);
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new Exception("Name cannot be empty");
        }

        Name = name;
    }

    public void SetPassWordHash(string passWordHash)
    {
        if (string.IsNullOrWhiteSpace(passWordHash))
        {
            throw new Exception("PassWordHash cannot be empty");
        }

        PassWordHash = passWordHash;
    }

    public void SetEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new Exception("Email cannot be empty");
        }

        if (!email.Contains("@gmail.com"))
        {
            throw new Exception("Email have invalid format");
        }

        Email = email;
    }

    public void AddRole(int roleId)
    {
        if (_userRoles.Any(r => r.RoleId == roleId))
        {
            throw new Exception("Cannot duplicate roles");
        }

        _userRoles.Add(new UserRole(roleId));
    }

    public void RemoveRole(int roleId)
    {
        var userRole = _userRoles.FirstOrDefault(r => r.RoleId == roleId);

        if (userRole is null)
        {
            throw new Exception("Cannot find role");
        }

        _userRoles.Remove(userRole);
    }
}