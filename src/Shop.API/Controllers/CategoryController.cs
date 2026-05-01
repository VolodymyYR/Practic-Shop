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

        var responses = categories.Select(c => c.ToResponseDto());

        return Ok(responses);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CategoryRequestDto dto)
    {
        var createCategoryDto = dto.ToCreateDto();

        var category = await categoryService.CreateAsync(createCategoryDto);

        var response = category.ToResponseDto();

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
    public async Task<IActionResult> Update([FromForm] CategoryRequestDto dto, int id)
    {
        var category = await categoryService.GetByIdAsync(id);

        var createCategoryDto = dto.ToCreateDto();

        category = await categoryService.UpdateNameAsync(createCategoryDto, id);

        return Ok(category.ToResponseDto());
    }
}