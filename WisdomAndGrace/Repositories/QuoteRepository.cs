using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using WisdomAndGrace.Models;
using WisdomAndGrace.Utils;

namespace WisdomAndGrace.Repositories
{
    public class QuoteRepository : BaseRepository, IQuoteRepository
    {
        public QuoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Quote> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = QuoteQuery;

                    var quotes = new List<Quote>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        quotes.Add(NewQuote(reader));
                    }
                    reader.Close();

                    return quotes;
                }
            }
        }

        public object GetbyId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = QuoteQuery + " WHERE q.id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Quote quote = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        quote = NewQuote(reader);
                    }
                    reader.Close();

                    return quote;
                }
            }
        }

        public void Add(Quote quote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Quote (Text, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Text, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Text", quote.Text);
                    DbUtils.AddParameter(cmd, "@UserProfileId", quote.UserProfileId);

                    quote.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private string QuoteQuery
        {
            get
            {
                return @"SELECT q.Id, q.Text, q.UserProfileId,
                                up.FirebaseUserId, up.Name AS UserProfileName, up.Email, up.UserTypeId,
                                ut.Name AS UserTypeName
                           FROM Quote q
                                LEFT JOIN UserProfile up on q.UserProfileId = up.Id
                                LEFT JOIN UserType ut on up.UserTypeId = ut.Id";
            }
        }

        private Quote NewQuote(SqlDataReader reader)
        {
            return new Quote()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Text = DbUtils.GetString(reader, "Text"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                    Name = DbUtils.GetString(reader, "UserProfileName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    UserType = new UserType()
                    {
                        Id = DbUtils.GetInt(reader, "UserTypeId"),
                        Name = DbUtils.GetString(reader, "UserTypeName"),
                    }
                }
            };
        }
    }
}
