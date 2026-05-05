using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Text;

public class JwtService(IOptions<JwtOptions> options) : IJwtService
{
    public async Task<string> GenerateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.UserRoles.First().Role.Name)
        };

        var permissions = user.UserRoles
            .SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Name)
            .Distinct();

        foreach (var permission in permissions)
        {
            claims.Add(new Claim("permission", permission));
        }

        var jwtToken = new JwtSecurityToken(
            expires: DateTime.UtcNow.AddMinutes(15),
            claims: claims,
            signingCredentials: new SigningCredentials
                (
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Value.SecretKey)),
                    SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
}