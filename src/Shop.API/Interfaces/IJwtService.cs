public interface IJwtService
{
    Task<string> GenerateToken(User user);
}