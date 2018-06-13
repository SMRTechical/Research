using Sjogrens.Core.Configuration;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;

namespace Sjogrens.Client.Authorization
{
    public class ApiAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
#if DEBUG
            IConfigStore config = new ConfigStore();
            if (Convert.ToBoolean(config[ConfigKeys.Website.Auth.DisableAuth]))
                return;
#endif
            base.OnAuthorization(actionContext);
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden);
            return;

        }
    }
}