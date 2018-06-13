using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Serilog.Core;
using Serilog.Formatting.Json;
using System.Configuration;
using Sjogrens.Core.Configuration;

namespace Sjogrens.Core.Logging
{
    public static class LoggerFactory
    {
        public static ILogger Create(string applicationName, bool logToConsole = true)
        {
            var loggingLevelSwitch = new LoggingLevelSwitch((LogEventLevel)Enum.Parse(typeof(LogEventLevel), ConfigurationManager.AppSettings[ConfigKeys.Logging.MinLogEventLevel]));
            var logFilePath = ConfigurationManager.AppSettings[ConfigKeys.Logging.LogFilePath];

            if (string.IsNullOrEmpty(logFilePath))
                throw new ArgumentNullException(nameof(ConfigKeys.Logging.LogFilePath));

            logFilePath = logFilePath.Replace("{Date}", "{Date}").Replace("{AppName}", applicationName);

            if (logToConsole)
                return new LoggerConfiguration()
                    .Enrich.WithProperty("Application", applicationName)
                    .WriteTo.LiterateConsole()
                    .WriteTo.RollingFile(new JsonFormatter(), logFilePath, fileSizeLimitBytes: 1073741824, retainedFileCountLimit: 2, shared: true, buffered: false)
                    .MinimumLevel.ControlledBy(loggingLevelSwitch)
                    .CreateLogger();
            else
                return new LoggerConfiguration()
                    .Enrich.WithProperty("Application", applicationName)
                    .WriteTo.RollingFile(new JsonFormatter(), logFilePath, fileSizeLimitBytes: 1073741824, retainedFileCountLimit: 2, shared: true, buffered: false)
                    .MinimumLevel.ControlledBy(loggingLevelSwitch)
                    .CreateLogger();
        }
    }
}
