public interface IAuthService
{
    Task RegisterAsync(CreateUserDto dto);
    Task<User> LoginAsync(string email, string password);
}