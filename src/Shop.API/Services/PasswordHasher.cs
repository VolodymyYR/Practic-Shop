using Microsoft.AspNetCore.Identity;

public class PasswordHasher : IPasswordHasher
{
    private readonly PasswordHasher<User> hasher = new();

    public string Hash(string password)
    {
        return hasher.HashPassword(null!, password);
    }

    public bool Verify(string hash, string password)
    {
        return hasher.VerifyHashedPassword(null!, hash, password) == PasswordVerificationResult.Success;
    }
}