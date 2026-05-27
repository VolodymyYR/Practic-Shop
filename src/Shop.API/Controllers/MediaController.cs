using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MediaController(IImageService imageService) : ControllerBase
{
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    //[Authorize()]
    public async Task<IActionResult> UploadPhoto([FromForm] ImageRequest request)
    {
        var imageUrl = await imageService.SaveImageAsync(request.Image);

        return Ok(imageUrl);
    }

    [HttpDelete("delete")]
    //[Authorize()]
    public async Task<IActionResult> DeletePhoto([FromBody] string imageUrl)
    {
        imageService.DeleteImage(imageUrl);

        return NoContent();
    }
}