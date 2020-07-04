using Microsoft.EntityFrameworkCore;
using System;
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

        public object GetbyId(int id)
        {
            return _context.Quote
                .Include(q => q.UserProfile)
                .ThenInclude(u => u.UserType)
                .FirstOrDefault(q => q.Id == id);
        }

        public void Add(Quote quote)
        {
            _context.Add(quote);
            _context.SaveChanges();
        }

    }
}
