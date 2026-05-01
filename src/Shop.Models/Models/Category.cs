public class Category
{
    public int Id {get; private set;}
    public string Name {get; private set;} = string.Empty;

    public Category(string name){
        SetName(name);
    }

    public void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new Exception("Name cannot be empty");
        }

        Name = name;
    }
}