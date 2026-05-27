public record CategoryRequest
(
    string Name,
    List<SpecificationFieldDto>? Fields
);