using Insight.Database;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using Sjogrens.Client.Authorization;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity.WebApi;
namespace Sjogrens.Client
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Insight
            SqlInsightDbProvider.RegisterProvider();

            //Unity configuration
            var container = new UnityContainer();
            UnityConfig.RegisterComponents(container);
            config.DependencyResolver = new UnityDependencyResolver(container);

            //Configure WebApi global authorization
            // config.Filters.Add(new ApiAuthorizeAttribute() { Roles = "Administrator,Update,Read" });

            //config.SuppressDefaultHostAuthentication();
            //config.Filters.Add(new HostAuthenticationFilter("Bearer"));

            //string allowedDomains = EnvironmentFactory.getCorsDomains(ConfigurationManager.AppSettings["Environment"]);

            //var cors = new EnableCorsAttribute("http://cpqa", "accept,content-type,origin, X-Forwarded-For:10.156.71.202, X-Forwarded-Proto:http", "*");
            //config.EnableCors(cors);
            // configure this API to only return Json data
            var jsonFormatter = new JsonMediaTypeFormatter();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Services.Replace(typeof(IContentNegotiator), new Sjogrens.Core.Serialization.Models.JsonContentNegotiator(jsonFormatter));

            // Web API routes
            config.MapHttpAttributeRoutes();
        }
    }
}
