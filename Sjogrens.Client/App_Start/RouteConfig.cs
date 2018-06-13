using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Sjogrens.Client
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
          // routes.RouteExistingFiles = true;
           // routes.Route"foo", "Home/Index/visit/{*pathInfo}", "~/Views/Home/Index.cshtml");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Sjogrens",
            //    url: "",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
            //
            //     routes.MapMvcAttributeRoutes();



           // routes.MapRoute(
           //    name: "AmericanEuropeanCGC",
           //    url: "Home/Index/visit/{token}/AmericanEuropeanCGC"
           //);
        //    routes.MapRoute(
        //    name: "AmericanEuropeanCGC",
        //    url: "{controller}/{action}/visit/{token}/AmericanEuropeanCGC",
        //    defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
        //);

           // routes.MapRoute(
           //    name: "Diagnosis",
           //    url: "{controller}/{action}/visit/{token}/Diagnosis",
           //    defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
           //);

            //     routes.MapRoute(
            //       name: "CurrentMedications",
            //       url: "{controller}/{action}/visit/{token}/CurrentMedications",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "ESSDAI",
            //       url: "{controller}/{action}/visit/{token}/ESSDAI",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "ActivityScore",
            //       url: "{controller}/{action}/visit/{token}/ActivityScore",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "DamageIndices",
            //       url: "{controller}/{action}/visit/{token}/DamageIndices",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "PastMedicalHistory",
            //       url: "{controller}/{action}/visit/{token}/PastMedicalHistory",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "InvestigationsRequested",
            //       url: "{controller}/{action}/visit/{token}/InvestigationsRequested",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //       name: "UltrasoundResults",
            //       url: "{controller}/{action}/visit/{token}/UltrasoundResults",
            //       defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //   );

            //     routes.MapRoute(
            //      name: "SalivaryFlow",
            //      url: "{controller}/{action}/visit/{token}/SalivaryFlow",
            //      defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //  );

            //     routes.MapRoute(
            //     name: "RoutineBloods",
            //     url: "{controller}/{action}/visit/{token}/RoutineBloods",
            //     defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            // );

            //     routes.MapRoute(
            //    name: "ResearchBloods",
            //    url: "{controller}/{action}/visit/{token}/ResearchBloods",
            //    defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //);


            //     routes.MapRoute(
            //    name: "OtherResearchBiomaterials",
            //    url: "{controller}/{action}/visit/{token}/OtherResearchBiomaterials",
            //    defaults: new { controller = "Home", action = "Index", token = UrlParameter.Optional }
            //);

            routes.MapRoute(
              name: "Default",
              url: "{controller}/{action}/{id}",
              defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional }
          );

           // routes.MapRoute(
           //    name: "Search",
           //    url: "{controller}/{action}/{id}",
           //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           //);

        }
    }
}
