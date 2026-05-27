public record CreateCategoryDto
(
    string Name,
    List<SpecificationFieldDto>? Fields
);

public record SpecificationFieldDto
(
    string Key,
    string Label,
    SpecificationFieldType Type,
    bool Required,
    List<string>? Values
);