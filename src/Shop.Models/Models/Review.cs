public class Review {
    public int Id {get; private set;}
    public int ProductId {get; private set;} // Додати зовнішній ключ
    public int UserId {get; private set;} // Додати зовнішній ключ
    public double Rating {get; private set;} // 1 - 5
    public string Comment {get; private set;} = string.Empty;

    public Review(int productId, int userId, int rating, string comment)
    {
        SetProduct(productId);
        SetUser(userId);
        SetRating(rating);
        SetComment(comment);
    }

    public void SetProduct(int productId)
    {
        ProductId = productId;
        // В майбутньому перевірка чи існує поверх зовнішнього ключа
    }

    public void SetUser(int userId)
    {
        UserId = userId;
        // В майбутньому перевірка чи існує поверх зовнішнього ключа
    }

    public void SetRating(int rating)
    {
        if (rating > 5 || rating < 0)
        {
            throw new Exception("Rating must be in range 0 - 5");
        }

        Rating = rating;
    }

    public void SetComment(string comment)
    {
        if (string.IsNullOrWhiteSpace(comment))
        {
            Comment = string.Empty;
        }

        Comment = comment.Trim();
    }
}