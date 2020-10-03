using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WisdomAndGrace.Models;
using WisdomAndGrace.Repositories;

namespace WisdomAndGrace.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IQuoteRepository _quoteRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public QuoteController(
            IQuoteRepository quoteRepository, 
            IUserProfileRepository userProfileRepository)
        {
            _quoteRepository = quoteRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_quoteRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var quote = _quoteRepository.GetbyId(id);
            if (quote != null)
            {
                NotFound();
            }
            return Ok(quote);
        }

        [HttpPost]
        public IActionResult Post(Quote quote)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "admin")
            {
                return Unauthorized();
            }
            quote.UserProfileId = currentUserProfile.Id;
            _quoteRepository.Add(quote);
            return CreatedAtAction(nameof(Get), new { id = quote.Id }, quote);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
