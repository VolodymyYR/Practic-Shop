public static class UserMappingExtension
{
    public static User ToEntity(this CreateUserDto dto)
    {
        return new User(dto.Name, dto.Password, dto.Email);
    }
}