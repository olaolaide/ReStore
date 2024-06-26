using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(StoreContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await context.Products.ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        return await context.Products.FindAsync(id);
    }
}