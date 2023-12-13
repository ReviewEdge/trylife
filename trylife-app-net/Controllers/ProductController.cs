using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ProductController> _logger;

    public ProductController(ApplicationDbContext context, ILogger<ProductController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _context.Product.FindAsync(id);

        if (product == null)
        {
            return NotFound(); //404
        }

        _logger.LogInformation("Product with ID {ProductId} has been read: {@Product}", id, product);
        return Ok(product);
    }

    [HttpGet("/products")]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _context.Product.ToListAsync();

        if (products == null || !products.Any())
        {
            return NotFound();
        }

        _logger.LogInformation("All products have been retrieved: {@Products}", products);
        return Ok(products);
    }


    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        if (product == null)
        {
            return BadRequest(); //404
        }

        _context.Product.Add(product);
        await _context.SaveChangesAsync(); //save changes

        _logger.LogInformation("Product with ID {ProductId} has been created: {@Product}", product.Id, product);
        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product); //201
    }
    
}
