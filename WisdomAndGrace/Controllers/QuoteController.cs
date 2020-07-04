using Microsoft.AspNetCore.Mvc;
using WisdomAndGrace.Data;
using WisdomAndGrace.Repositories;

namespace WisdomAndGrace.Controllers
{
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
    }
}
