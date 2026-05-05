public static class CategoryMapperExtension
{
    public static CreateCategoryDto ToCreateDto(this CategoryRequest dto)
    {
        return new CreateCategoryDto(dto.Name);
    }

    public static CategoryResponse ToResponse(this Category category)
    {
        return new CategoryResponse(category.Id, category.Name);
    }
}