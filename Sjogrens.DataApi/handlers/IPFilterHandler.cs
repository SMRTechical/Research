using Sjogrens.Core.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Sjogrens.DataApi.handlers
{
    public class IPFilterHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.AllowIP())
            {
             var response  = await base.SendAsync(request, cancellationToken);
              return response;
                //return Task.Run(async () => await base.SendAsync(request, cancellationToken)).Result;
            }
             var errorResponse = request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Not authorized to view/access this resource");
            return errorResponse;
        }
    }
}