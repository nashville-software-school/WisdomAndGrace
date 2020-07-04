using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WisdomAndGrace.Data;
using WisdomAndGrace.Models;

namespace WisdomAndGrace.Repositories
{
    public class QuoteRepository
    {
        private readonly ApplicationDbContext _context;

        public QuoteRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Quote> GetAll()
        {
            return _context.Quote
                .Include(q => q.UserProfile)
                .ThenInclude(u => u.UserType)
                .ToList();
        }
    }
}
