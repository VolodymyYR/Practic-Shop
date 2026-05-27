using System.Collections.Immutable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductController(IProductService productService, IProductVariantService pvService) : ControllerBase
{
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await productService.GetByIdAsync(id);
        var categories = await productService.GetCategoriesAsync(product.Categories
            .Select(pc => pc.CategoryId)
            .ToList());

        var response = product.ToResponse(categories);

        return Ok(response);
    } 

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await productService.GetAllAsync();

        var responses = products.Select(async p => p.ToResponse(
            await productService.GetCategoriesAsync(p.Categories.Select(pc => pc.CategoryId).ToList())
        ));

        return Ok(responses);
    }

    [HttpGet("getCatalog")]
    public async Task<IActionResult> GetCatalog()
    {
        var catalog = await productService.GetCatalogAsync();

        return Ok(catalog);
    }

    [HttpGet("by-sku")]
    public async Task<IActionResult> GetByArticleAsync([FromQuery] string article)
    {
        var variant = await pvService.GetByArticleAsync(article);

        if (variant == null)
            throw new Exception("Cannot find variant by arcticle!");

        var product = await productService.GetByIdAsync(variant.ProductId);
        var categories = await productService.GetCategoriesAsync(product.Categories.Select(pc => pc.CategoryId).ToList());

        var response = new ProductBySkuResponse(variant.ArticleCode, product.ToResponse(categories));

        return Ok(response);
    }

    [HttpPost("create")]
    //[Authorize(Policy = Permissions.ProductCreate)]
    public async Task<IActionResult> Create([FromBody] ProductRequest request)
    {
        var productCreateDto = request.ToCreateDto(); 

        var product = await productService.CreateAsync(productCreateDto);
        var categories = await productService.GetCategoriesAsync(request.Categories);

        var response = product.ToResponse(categories);

        return CreatedAtAction(nameof(Get), new {id = response.Id}, response);
    }

    [HttpPost("{id}/variants")]
    //[Authorize(Policy = Permissions.ProductCreate)]
    public async Task<IActionResult> AddVariant([FromBody] ProductVariantRequest request, int id)
    {
        await productService.AddVariantAsync(id, request.ToCreateDto());
        
        return NoContent();
    }

    [HttpDelete("{productId}/variants/{variantId}")]
    //[Authorize(Policy = Permissions.ProductDelete)]
    public async Task<IActionResult> DeleteVariant(int productId, int variantId)
    {
        await productService.DeleteVariantAsync(productId, variantId);

        return NoContent();
    }

    [HttpDelete()]
    [Route("{id}")]
    [Authorize(Policy = Permissions.ProductDelete)]
    public async Task<IActionResult> Delete(int id)
    {
        await productService.DeleteAsync(id);

        return NoContent();
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(Policy = Permissions.ProductEdit)]
    public async Task<IActionResult> Update([FromBody] string name, int id)
    {
        var product = await productService.GetByIdAsync(id);
        var categories = await productService.GetCategoriesAsync(product.Categories
            .Select(pc => pc.CategoryId)
            .ToList());

        product = await productService.UpdateAsync(id, name);

        return Ok(product.ToResponse(categories));
    }
}