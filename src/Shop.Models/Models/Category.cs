using System.Text.Json;

public class Category
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;
    public JsonDocument? SpecificationSchema {get; private set;}

    private Category(){}
    public Category(string name){
        Name = Validator.RequiredString(name, nameof(Name));
    }

    public void SetSpecificationSchema(List<SpecificationField> fields)
    {
        var json = JsonSerializer.Serialize(fields);
        SpecificationSchema = JsonDocument.Parse(json);
    }

    public List<SpecificationField> GetSpecificationSchema()
    {
        if (SpecificationSchema == null)
        {
            return new ();
        }

        return JsonSerializer.Deserialize<List<SpecificationField>>
        (
            SpecificationSchema.RootElement.GetRawText()
        ) 
        ?? new();
    }

    public void UpdateName(string name)
    {
        Name = Validator.RequiredString(name, nameof(Name));
    }
}