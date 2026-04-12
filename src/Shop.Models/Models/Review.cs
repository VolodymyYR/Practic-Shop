public class Review {
    public int Id {get; private set;}
    public int ProductId {get; private set;}
    public double Rating {get; private set;} // 1 - 5
    public string Comment {get; private set;} = string.Empty;
}