using Microsoft.Extensions.Configuration;

namespace TryLife.Services
{
    public class Helpers
    {
        private readonly IConfiguration _configuration;

        public Helpers(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetRDSConnectionString()
        {
            var awsConfig = _configuration.GetSection("AwsConfiguration");

            string dbname = awsConfig["RDS_DB_NAME"];
            string username = awsConfig["RDS_USERNAME"];
            string password = awsConfig["RDS_PASSWORD"];
            string hostname = awsConfig["RDS_HOSTNAME"];
            string port = awsConfig["RDS_PORT"];

            return "Data Source=" + hostname + ";Initial Catalog=" + dbname + ";User ID=" + username + ";Password=" + password + ";";
        }
    }
}
