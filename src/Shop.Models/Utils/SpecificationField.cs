using System.Text.Json.Serialization;

public class SpecificationField
{
    public string Key {get; init;} = string.Empty;
    public string Label {get; init;} = string.Empty;
    public string Type {get; init;} = string.Empty;
    public bool Required {get; init;}
    public List<string> Values {get; init;} = new ();

    [JsonConstructor]
    private SpecificationField() {}

    public SpecificationField
    (
        string key,
        string label,
        SpecificationFieldType type,
        bool required,
        List<string>? values
    )
    {
        Key = Validator.RequiredString(key, nameof(Key));
        Label = Validator.RequiredString(label, nameof(Label));
        Type = type.ToString();
        Required = required;

        if (type == SpecificationFieldType.Enum && (values == null || !values.Any()))
        {
            throw new Exception($"Property {key} has type enum and must contain atleast one element");
        }

        Values = values ?? new ();
    }
}

public enum SpecificationFieldType
{
    String,
    Number,
    Enum
}