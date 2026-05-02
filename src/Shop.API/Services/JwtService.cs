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
            new Claim("name", user.Name),
            new Claim("email", user.Email),
            new Claim("id", user.Id.ToString()),
            new Claim("role", user.UserRoles.First().Role.Name)
        };

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