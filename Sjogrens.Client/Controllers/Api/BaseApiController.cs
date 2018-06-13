using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sjogrens.Client.Controllers.Api
{
    public abstract class BaseApiController : ApiController
    {
        protected readonly ILogger _logger;
        protected readonly Guid _requestId = Guid.NewGuid();

        public BaseApiController(ILogger logger)
        {
            _logger = logger.ForContext("RequestId", _requestId);
        }
        protected string ControllerName => ControllerContext.ControllerDescriptor.ControllerName;

        protected string ActionName => ActionContext.ActionDescriptor.ActionName;
    }
}
