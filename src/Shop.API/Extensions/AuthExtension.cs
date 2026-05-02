using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

public static class AuthExtension
{
    public static IServiceCollection AddAuth
    (
        this IServiceCollection serviceCollection, 
        IConfiguration configuration
    )
    {
        var secretKey = configuration["Jwt:SecretKey"]!;

        serviceCollection.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        serviceCollection.AddScoped<IJwtService, JwtService>();
        serviceCollection.AddScoped<IAuthService, AuthService>();
        serviceCollection.AddScoped<IPasswordHasher, PasswordHasher>();
        serviceCollection.AddScoped<IUserRepository, UserRepository>();

        serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });

        return serviceCollection;
    }
}