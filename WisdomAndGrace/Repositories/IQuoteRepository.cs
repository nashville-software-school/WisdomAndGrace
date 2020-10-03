using System.Collections.Generic;
using WisdomAndGrace.Models;

namespace WisdomAndGrace.Repositories
{
    public interface IQuoteRepository
    {
        void Add(Quote quote);
        List<Quote> GetAll();
        object GetbyId(int id);
    }
}