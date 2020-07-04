using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WisdomAndGrace.Data;
using WisdomAndGrace.Models;
using WisdomAndGrace.Repositories;

namespace WisdomAndGrace.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly QuoteRepository _quoteRepository;

        public QuoteController(ApplicationDbContext context)
        {
            _quoteRepository = new QuoteRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_quoteRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_quoteRepository.GetbyId(id));
        }

        [HttpPost]
        public IActionResult Post(Quote quote)
        {
            _quoteRepository.Add(quote);
            return CreatedAtAction(nameof(Get), new { id = quote.Id }, quote);
        }
    }
}
