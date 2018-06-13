using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Sjogrens.Client.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Sjogrens.Client.Controllers
{
    [MvcAuthorize(Roles = "Administrator,Update,Read")]
    public class HomeController : Controller
    {

        private readonly IAuthenticationManager _authenticationManager;
        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public HomeController(IAuthenticationManager authenticationManager)
        {
            _authenticationManager = authenticationManager;
         
        }


        // [OutputCache(VaryByParam = "*", Duration = 0, NoStore = true)]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("keepalive")]
        [OutputCache(VaryByParam = "*", Duration = 0, NoStore = true)]
        public ActionResult KeepAlive()
        {
            return Json("OK", JsonRequestBehavior.AllowGet);
        }

        [Route("logout")]
        public ActionResult Logout()
        {
         //   _authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);
      

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetNoStore();
            HttpContext.GetOwinContext().Authentication.SignOut();

            //  IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
            _authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            FormsAuthentication.SignOut();


            Response.Cookies.Clear();
            Session.Abandon();
            return RedirectToAction("Login", "Account");
        }

        [Route("notsupported")]
        public ActionResult NotSupported()
        {
            return View();
        }
    }
}