public static class ReviewMapperExtension
{
    public static ReviewResponse ToResponse(this Review review)
    {
        return new ReviewResponse(review.Id, review.ProductId, review.UserId, review.Comment);
    }
}