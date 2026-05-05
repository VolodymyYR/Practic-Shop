using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

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

        serviceCollection.AddAuthorization(options =>
        {
            foreach (var permission in typeof(Permissions)
                .GetFields()
                .Select(f => f.GetValue(null)!.ToString()!))
            {
                options.AddPolicy(permission, p => p.AddRequirements(new PermissionRequirement(permission)));
            }
        });

        serviceCollection.AddSingleton<IAuthorizationHandler, PermissionHadler>();

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