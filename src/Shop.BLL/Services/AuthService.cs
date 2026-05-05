public class AuthService(IUserRepository userRepository, IPasswordHasher passwordHasher) : IAuthService
{
    public async Task RegisterAsync(CreateUserDto dto)
    {
        var user = dto.ToEntity();

        user.SetPasswordHash(passwordHasher.Hash(dto.Password));
        user.AddRole(2);

        await userRepository.AddAsync(user);
        await userRepository.SaveAsync();
    }

    public async Task<User> LoginAsync(string email, string password)
    {
        var user = await userRepository.GetByEmail(email);

        if (user == null || !passwordHasher.Verify(user.PasswordHash, password))
        {
            throw new Exception("Invalid email or password");
        }

       return user;
    }
}