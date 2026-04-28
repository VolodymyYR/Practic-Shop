public class ImageService : IImageService
{
    private readonly string uploadsFolder;
    private readonly string[] allowedExtentions = {".png", "jpeg", "webp", "jpg"};
    private const long maxFileSize = 5_000_000; // 5MB 

    public ImageService()
    {
        uploadsFolder = "/home/raslabsa/Learning/Projects/pictures"; //saving localy for testing

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }
    }

    public void DeleteImage(string fileName)
    {
        string filePath = Path.Combine(uploadsFolder, fileName);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("Cannot delete image, file not found!");
        }

        File.Delete(filePath);
    }

    public async Task<string> SaveImageAsync(IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtentions.Contains(extension))
        {
            throw new ArgumentException("Invalid file extention");
        }

        if (file.Length > maxFileSize)
        {
            throw new ArgumentException("File size bigger than 5MB");
        }

        string fileName = $"{Guid.NewGuid()}{extension}";
        string filePath = Path.Combine(uploadsFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return fileName;
    }
}