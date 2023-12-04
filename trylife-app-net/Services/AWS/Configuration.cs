using Microsoft.Extensions.Configuration;

namespace TryLife
{
    public class AwsConfiguration
    {
        public string RDS_DB_NAME { get; set; }
        public string RDS_USERNAME { get; set; }
        public string RDS_PASSWORD { get; set; }
        public string RDS_HOSTNAME { get; set; }
        public string RDS_PORT { get; set; }
    }
}
