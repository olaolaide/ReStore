using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController(StoreContext context, IMapper mapper) : BaseApiController
    {
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null)
                return NotFound();

            return mapper.Map<BasketDto>(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket() ?? await CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if (product == null)
                return NotFound("Product not found");

            basket.AddItem(product, quantity);
            var result = await context.SaveChangesAsync() > 0;

            return result
                ? CreatedAtRoute("GetBasket", mapper.Map<BasketDto>(basket))
                : BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            if (basket.Items.Count == 0)
            {
                context.Baskets.Remove(basket);
            }

            var result = await context.SaveChangesAsync() > 0;

            return result ? Ok() : BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await context.Baskets
                .Include(b => b.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
        }

        private async Task<Basket> CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };
            context.Baskets.Add(basket);
            await context.SaveChangesAsync();
            return basket;
        }
    }
}