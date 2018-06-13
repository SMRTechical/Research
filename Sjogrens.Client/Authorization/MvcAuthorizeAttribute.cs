using Sjogrens.Core.Configuration;
using System;
using System.Web.Mvc;

namespace Sjogrens.Client.Authorization
{
    public class MvcAuthorizeAttribute : System.Web.Mvc.AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContex)
        {
#if DEBUG 
            IConfigStore config = new ConfigStore();
            if (Convert.ToBoolean(config[ConfigKeys.Website.Auth.DisableAuth]))
                return;
#endif
            base.OnAuthorization(filterContex);
        }
    }
}
