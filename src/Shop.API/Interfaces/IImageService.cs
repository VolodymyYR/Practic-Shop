public interface IImageService
{
    Task<ImageServiceResponse> SaveImageAsync(IFormFile file);
    void DeleteImage(string path);
}