public static class UserMappingExtension
{
    public static CreateUserDto ToCreateDto(this RegisterUserRequest dto)
    {
        return new CreateUserDto(dto.Name, dto.Password, dto.Email);
    }
}