
using Sjogrens.Client.Authorization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Sjogrens.Client
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
          //  BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Suppress X-AspNetMvc-Version header
            MvcHandler.DisableMvcResponseHeader = true;

            //Configure MVC global authorization
            GlobalFilters.Filters.Add(new MvcAuthorizeAttribute() { Roles = "Administrator, Update, Read" });


        }

        protected void Application_BeginRequest()
        {
            Debug.WriteLine("Begin Request");
        }

        protected void Application_MapRequestHandler()
        {
            Debug.WriteLine("Map Handler");
        }

        protected void Application_PostMapRequestHandler()
        {
            Debug.WriteLine("Post Map Handler");
        }

        protected void Application_AcquireRequestState()
        {
            Debug.WriteLine("Request State");
        }

        protected void Application_PreRequestHandlerExecute()
        {
            Debug.WriteLine("Pre Handler Execute");
        }

        protected void Application_PostRequestHandlerExecute()
        {
            Debug.WriteLine("Post Handler Execute");
        }

        protected void Application_EndRequest()
        {
            Debug.WriteLine("End Request");
        }

    }
}
