public interface IImageInterface
{
    Task<string> SaveImageAsync(IFormFile file);
    void DeleteImage(string path);
}