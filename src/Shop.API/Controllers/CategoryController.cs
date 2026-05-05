using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(ICategoryService categoryService) : ControllerBase
{
    [HttpGet]
    [Route("{Id}")]
    public async Task<IActionResult> Get(int id)
    {
        var category = await categoryService.GetByIdAsync(id);

        return Ok(category);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await categoryService.GetAllAsync();

        var responses = categories.Select(c => c.ToResponse());

        return Ok(responses);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CategoryRequest request)
    {
        var createCategoryDto = request.ToCreateDto();

        var category = await categoryService.CreateAsync(createCategoryDto);

        var response = category.ToResponse();

        return CreatedAtAction(nameof(Get), new {id = response.Id}, response);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await categoryService.DeleteAsync(id);

        return NoContent();
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromForm] CategoryRequest request, int id)
    {
        var category = await categoryService.GetByIdAsync(id);

        var createCategoryDto = request.ToCreateDto();

        category = await categoryService.UpdateNameAsync(createCategoryDto, id);

        return Ok(category.ToResponse());
    }
}