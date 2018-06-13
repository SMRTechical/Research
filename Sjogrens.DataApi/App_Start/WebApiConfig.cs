using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Insight.Database;
using Microsoft.Practices.Unity;
using Unity.WebApi;
using System.Web.Http.ExceptionHandling;
using Sjogrens.Core.Logging;
using Serilog;
using Sjogrens.Core.Configuration;
using System.Net.Http.Formatting;
using Sjogrens.Core.Serialization.Models;
using System.Web.Http.Cors;
using Sjogrens.DataApi.handlers;
using System.Configuration;
using Sjogrens.Core.Enums;
using Sjogrens.Core.Factories;

namespace Sjogrens.DataApi
{
    public static class WebApiConfig
    {
        //public static void Register(HttpConfiguration config)
        //{
        //    // Web API configuration and services
        //    // Configure Web API to use only bearer token authentication.
        //    config.SuppressDefaultHostAuthentication();
        //    config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

        //    // Web API routes
        //    config.MapHttpAttributeRoutes();

        //    config.Routes.MapHttpRoute(
        //        name: "DefaultApi",
        //        routeTemplate: "api/{controller}/{id}",
        //        defaults: new { id = RouteParameter.Optional }
        //    );
        //}
        public static void Register(HttpConfiguration config)
        {
            //Insight
            SqlInsightDbProvider.RegisterProvider();

            // Web API configuration and services
            var container = new UnityContainer();
            UnityConfig.RegisterComponents(container);
            config.DependencyResolver = new UnityDependencyResolver(container);

            // Configure global exception logging
            config.Services.Replace(typeof(IExceptionLogger), new UnhandledExceptionLogger(container.Resolve<ILogger>(), ConfigKeys.DataApi.ApplicationName, true));

            //var cors = new EnableCorsAttribute("http://localhost:53818", "*", "*");
            //var cors = new EnableCorsAttribute("http://paisley/CDEA/Sjogrens", "*", "*");
            
            string allowedDomains = EnvironmentFactory.getCorsDomains(ConfigurationManager.AppSettings["Environment"]);

            var cors = new EnableCorsAttribute(allowedDomains, "*", "*");
            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();
            // config.MessageHandlers.Add(new IPFilterHandler());
            
            // configure this API to only return Json data
            var jsonFormatter = new JsonMediaTypeFormatter();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));
        }
    }
}
