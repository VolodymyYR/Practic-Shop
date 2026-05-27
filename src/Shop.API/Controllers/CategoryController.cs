using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(ICategoryService categoryService) : ControllerBase
{
    [HttpGet]
    [Route("{id}")]
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

    [HttpGet("byIds")]
    public async Task<IActionResult> GetByIds([FromQuery] CategoriesRequest request)
    {
        var categories = await categoryService.GetAllByIds(request.CategoryIds);

        return Ok(categories);
    }

    [HttpGet("getSchema")]
    public async Task<IActionResult> GetFullSpecSchema([FromQuery] List<int> ids)
    {
        var categories = await categoryService.GetAllByIds(ids);
        var schema = await categoryService.GetFullSpecSchema(categories);

        return Ok(schema);
    }

    [HttpPost]
    //[Authorize(Policy = Permissions.CategoryCreate)]
    public async Task<IActionResult> Create([FromBody] CategoryRequest request)
    {
        var createCategoryDto = request.ToCreateDto();

        var category = await categoryService.CreateAsync(createCategoryDto);

        var response = category.ToResponse();

        return CreatedAtAction(nameof(Get), new {id = response.Id}, response);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(Policy = Permissions.CategoryDelete)]
    public async Task<IActionResult> Delete(int id)
    {
        await categoryService.DeleteAsync(id);

        return NoContent();
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Policy = Permissions.CategoryEdit)]
    public async Task<IActionResult> Update([FromForm] string name, int id)
    {
        var category = await categoryService.GetByIdAsync(id);

        category = await categoryService.UpdateNameAsync(name, id);

        return Ok(category.ToResponse());
    }
}