public static class CategoryMappingExtension
{
    public static Category ToEntity(this CreateCategoryDto dto)
    {
        return new Category(dto.Name);
    }
}