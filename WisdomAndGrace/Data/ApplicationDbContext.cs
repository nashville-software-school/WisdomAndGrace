using Microsoft.EntityFrameworkCore;
using WisdomAndGrace.Models;

namespace WisdomAndGrace.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Quote> Quote { get; set; }

    }
}
