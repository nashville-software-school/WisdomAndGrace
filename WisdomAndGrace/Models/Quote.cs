using System.ComponentModel.DataAnnotations;

namespace WisdomAndGrace.Models
{
    public class Quote
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
