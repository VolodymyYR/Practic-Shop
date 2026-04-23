using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public static class Extensions
{
    public static void AddDatabase(this IServiceCollection serviceCollection, string connectionString)
    {
        serviceCollection.AddDbContext<ShopContext>(c =>
        {
            c.UseNpgsql(connectionString);
        });
    }
}