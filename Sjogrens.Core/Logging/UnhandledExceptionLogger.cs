using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Serilog;
using System.Web.Http.ExceptionHandling;

namespace Sjogrens.Core.Logging
{
    public class UnhandledExceptionLogger : ExceptionLogger
    {
        private readonly ILogger _logger;
        private readonly string _applicationName;
        public bool _unwrapExceptions { get; set; }

        public UnhandledExceptionLogger(ILogger logger, string applicationName, bool unwrapExceptions = false)
        {
            _logger = logger;
            _applicationName = applicationName;
            _unwrapExceptions = unwrapExceptions;
        }

        private static Exception Unwrap(Exception ex)
        {
            while (true)
            {
                if (ex.InnerException == null)
                    return ex;
                ex = ex.InnerException;
            }
        }

        public override void Log(ExceptionLoggerContext context)
        {
            //Could this be extended and improved?
            var reportException = _unwrapExceptions ? Unwrap(context.Exception) : context.Exception;
            _logger.Fatal(reportException, "Critical exception occurred in {ApplicationName} call to {Uri} {Method}", _applicationName, context.Request.RequestUri, context.Request.Method);
        }
    }
}
