public static class CategoryMapperExtension
{
    public static CreateCategoryDto ToCreateDto(this CategoryRequestDto dto)
    {
        return new CreateCategoryDto(dto.Name);
    }

    public static CategoryResponseDto ToResponseDto(this Category category)
    {
        return new CategoryResponseDto(category.Id, category.Name);
    }
}