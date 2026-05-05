using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductController(IProductService productService, IImageService imageService) : ControllerBase
{
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await productService.GetByIdAsync(id);

        var response = product.ToResponse();

        return Ok(response);
    } 

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await productService.GetAllAsync();

        var responses = products.Select(p => p.ToResponse());

        return Ok(responses);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductRequest request)
    {
        var imageUrl = await imageService.SaveImageAsync(request.Image);
        var productCreateDto = request.ToCreateDto(imageUrl); 

        var product = await productService.CreateAsync(productCreateDto);

        var created = await productService.GetByIdAsync(product.Id);
        var response = created.ToResponse();

        return CreatedAtAction(nameof(Get), new {id = response.Id}, response);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await productService.DeleteAsync(id);

        return NoContent();
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromForm] ProductRequest request, int id)
    {
        var product = await productService.GetByIdAsync(id);
        var imageUrl = await imageService.SaveImageAsync(request.Image);

        var createProductDto = request.ToCreateDto(imageUrl);

        product = await productService.UpdateAsync(createProductDto, id);

        return Ok(product.ToResponse());
    }
}