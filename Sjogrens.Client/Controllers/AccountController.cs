using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Sjogrens.Client.Models;
using Sjogrens.Core.Models;
using System.Configuration;
using Sjogrens.Core.Application.Services.Interfaces;
using Sjogrens.Core.Enums;
using System.Security.Principal;
using Sjogrens.Core.Application.Services;
using Sjogrens.Core.Application.Interfaces;
using System.Threading;
using System.Web.UI;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using Sjogrens.Core.Authentication;
using Microsoft.AspNet.Identity.EntityFramework;
using Sjogrens.Client.Authorization;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using Vereyon.Web;
using System.Web.Security;

namespace Sjogrens.Client.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        // private IActiveDirectoryUser _activeDirectoryUser;
        // private IActiveDirectoryService _activeDirectoryService;
        private SjogrensSignInStatus _signInStatus = SjogrensSignInStatus.Failure;

        public AccountController()
        {
            // _activeDirectoryUser = new UHBActiveDirectoryUser();
            //  _activeDirectoryService = new ActiveDirectoryService();

            //   _activeDirectoryService.ADInclusionGroup = ConfigurationManager.AppSettings["ADInclusionGroup"];
            // _activeDirectoryService.TechDevAccess = bool.Parse(ConfigurationManager.AppSettings["AllowITTechDevAccess"]);

        }


        //public AccountController(IActiveDirectoryUser activeDirectoryUser, IActiveDirectoryService activeDirectoryService)
        //{

        //    _activeDirectoryUser = activeDirectoryUser;
        //    _activeDirectoryService = activeDirectoryService;


        //    _activeDirectoryService.ADInclusionGroup = ConfigurationManager.AppSettings["ADInclusionGroup"];
        //    _activeDirectoryService.TechDevAccess = bool.Parse(ConfigurationManager.AppSettings["AllowITTechDevAccess"]);
        //}

        private readonly IAuthenticationManager _authenticationManager;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IAdAuthenticationService _adAuthenticationService;
        private readonly IConfigurationHelper _configurationHelper;


        public AccountController(IAuthenticationManager authenticationManager, IAuthorizationHelper authorizationHelper, IAdAuthenticationService adAuthenticationService, IConfigurationHelper configurationHelper)
        {
            _authenticationManager = authenticationManager;
            _authorizationHelper = authorizationHelper;
            _adAuthenticationService = adAuthenticationService;
            _configurationHelper = configurationHelper;
        }


        //[Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            var Db = new ApplicationDbContext();
            var users = Db.Users;
            var model = new List<EditUserViewModel>();
            foreach (var user in users)
            {
                var u = new EditUserViewModel(user);
                model.Add(u);
            }
            return View(model);
        }

        //public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        //{
        //    _userManager = userManager;
        //    _signInManager = signInManager;
        //}

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

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

        //
        // GET: /Account/Login
        [AllowAnonymous]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None)]
        public ActionResult Login(string returnUrl)
        {
            
            //if (AuthenticationManager.User.Identity.IsAuthenticated)
            //{
            //    AuthenticationManager.SignOut();
            //    FormsAuthentication.SignOut();
            //}

          
          //  Session.Abandon();

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetNoStore();

           // if (Request.IsAuthenticated)
          //  {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);
            FormsAuthentication.SignOut();
            // return RedirectToAction("Login", "Account");
            //}

            Response.Cookies.Clear();
            Session.Abandon();
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [OutputCache(NoStore = true, Location = OutputCacheLocation.None)]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            //LoginRegisterViewModel m = new LoginRegisterViewModel();
         //   m.Login = model;
            if (!ModelState.IsValid)
            {
              //  ModelState.AddModelError("", "Please ensure you have selected a role.");
                return View(model);
            }

            if (model.UserName.Contains("@"))
            {
                // To enable password failures to trigger account lockout, change to shouldLockout: true
                var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
                switch (result)
                {
                    case SignInStatus.Success:
                        return RedirectToLocal(returnUrl);
                    case SignInStatus.LockedOut:
                        return View("Lockout");
                    case SignInStatus.RequiresVerification:
                        return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                    case SignInStatus.Failure:
                    default:
                        ModelState.AddModelError("", "Invalid login attempt.");
                        //return View("Login", m);
                        return View(model);
                }
            }
            else
            {
                // IAuthenticationManager authenticationManager = HttpContext.GetOwinContext().Authentication;
               // var authService = new AdAuthenticationService(authenticationManager);

                var authenticationResult = await _adAuthenticationService.SignInAsync(model.UserName, model.Password);

                if (authenticationResult.IsSuccess)
                {
                    // we are in!

                    var manager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                    var user = await manager.FindByNameAsync(model.UserName);

                   
                    if (user != null)
                    {


                        string[] allUserRoles = UserManager.GetRoles(user.Id).ToArray();

                        if (allUserRoles.Count() == 0)
                        {
                            ModelState.AddModelError("", "You are not authorised to access Sjogrens.");
                            return View(model);
                        }

                        string _authorised = user.Claims.FirstOrDefault(c => c.ClaimType == "Authorized")?.ClaimValue;

                            if (_authorised == null || _authorised == "false")
                            {
                                ModelState.AddModelError("", "You are not authorised to access Sjogrens.");
                                return View(model);
                            }
                            

                        string _active = user.Claims.FirstOrDefault(c => c.ClaimType == "Active")?.ClaimValue;
                        if (_active == null || _active == "false")
                        {
                            ModelState.AddModelError("", "There is a problem with your Login.");
                            return View(model);
                        }


                        string _cdeaId = user.Claims.FirstOrDefault(c => c.ClaimType == "CdeaId")?.ClaimValue;
                        if (_cdeaId == null || _cdeaId != _configurationHelper.GetCurrentCdeaId().ToString())
                        {
                            ModelState.AddModelError("", "There is a problem with your Login.");
                            return View(model);
                        }


                        string _organisationCode = user.Claims.FirstOrDefault(c => c.ClaimType == "OrganisationCode")?.ClaimValue;
                        if (_organisationCode == null || _organisationCode != _configurationHelper.GetCurrentOrganisationCode())
                        {
                            ModelState.AddModelError("", "There is a problem with your Login.");
                            return View(model);
                        }




                        await SignInAsync(user, isPersistent: false);

       

                   

                        return RedirectToLocal(returnUrl);
                    }
                    else
                    {
                        //first login



                        var newUser = new ApplicationUser { UserName = model.UserName, Email = _adAuthenticationService.UserPrincipal.EmailAddress };
                        var newUserCreatedresult = await UserManager.CreateAsync(newUser, model.Password);

                        if (newUserCreatedresult.Succeeded)
                        {
                            if (newUser != null)
                            {

                                await UserManager.AddClaimAsync(newUser.Id, new Claim("FirstName", _adAuthenticationService.UserPrincipal.GivenName));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("LastName", _adAuthenticationService.UserPrincipal.Surname));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("UserName", _adAuthenticationService.UserPrincipal.SamAccountName));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("FullName", _adAuthenticationService.UserPrincipal.DisplayName));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("PrimaryEmail", _adAuthenticationService.UserPrincipal.EmailAddress));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("OrganisationCode", "RRK"));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("OrganisationDescription", "University Hospitals Birmingham Nhs Foundation Trust"));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("Active", "true"));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("Authorized", "true"));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("Role", "Update"));
                                await UserManager.AddClaimAsync(newUser.Id, new Claim("CdeaId", _configurationHelper.GetCurrentCdeaId().ToString()));
                                
                                //ApplicationUser user = userManager.FindByEmail("Sajid.Riaz@uhb.nhs.uk");

                                UserManager.AddToRole(newUser.Id, "Update");
                                //   ApplicationDbContext ctx = HttpContext.GetOwinContext().Get<ApplicationDbContext>();
                                //  ctx.SaveChanges();


                            }

                            await SignInManager.SignInAsync(newUser, isPersistent: false, rememberBrowser: false);


                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                           // ModelState.AddModelError("", "There is a problem with your Login.");
                           // return View("Login", m);
                             return View(model);
                        }



                        ///

                    }

                    // return RedirectToLocal(returnUrl);
                }

                ModelState.AddModelError("", authenticationResult.ErrorMessage);

            }
            // This doesn't count login failures towards account lockout
            //LoginRegisterViewModel m = new LoginRegisterViewModel();
            //m.Login = model;
            return View(model);

        }


        private async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {

            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            var identity = await UserManager.CreateIdentityAsync(
               user, DefaultAuthenticationTypes.ApplicationCookie);

            AuthenticationManager.SignIn(
               new AuthenticationProperties()
               {
                   IsPersistent = isPersistent
               }, identity);

            //AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            //var identity = await UserManager.CreateIdentityAsync(
            //   user, DefaultAuthenticationTypes.ApplicationCookie);


            ////  var identity =  await SignInManager.CreateUserIdentityAsync(user);
            //AuthenticationManager.SignIn(
            //   new AuthenticationProperties()
            //   {
            //       IsPersistent = isPersistent
            //   }, identity);


            ////            user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View("Login");
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(LoginRegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Register.Email, Email = model.Register.Email };
                var result = await UserManager.CreateAsync(user, model.Register.Password);
                if (result.Succeeded)
                {

                    //await UserManager.AddClaimAsync(user.Id, new Claim("FirstName", _activeDirectoryUser.FirstName));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("LastName", _activeDirectoryUser.LastName));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("Username", _activeDirectoryUser.UserName));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("FullName", _activeDirectoryUser.FullName));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("PrimaryEmail", _activeDirectoryUser.PrimaryEmail));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("OrganisationCode", "RRK"));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("OrganisationDescription", "University Hospitals Birmingham Nhs Foundation Trust"));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("ActiveInactive", "I"));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("Authorized", "False"));
                    //await UserManager.AddClaimAsync(user.Id, new Claim("Role", "Update"));
                    //await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);

                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                    // Send an email with this link
                    // string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    // var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    // await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }


            //LoginRegisterViewModel m = new LoginRegisterViewModel();
            //m.Register = model;
            // If we got this far, something failed, redisplay form
            return View("Login",model);
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            
            HttpContext.User = new GenericPrincipal(new GenericIdentity(string.Empty), null);
         

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetNoStore();
            HttpContext.GetOwinContext().Authentication.SignOut();
            
            _authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

         
            FormsAuthentication.SignOut();
            Response.Cookies.Clear();
            Session.Abandon();
            return RedirectToAction("Login", "Account");
            // return RedirectToAction("Index");

        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }


          [Authorize(Roles = "Administrator")]
        public ActionResult EditBK(string id, ManageMessageId? Message = null)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            var model = new EditUserViewModel(user);
            ViewBag.MessageId = Message;
            return View(model);
        }


        [HttpPost]
         [Authorize(Roles = "Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditBK(EditUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var Db = new ApplicationDbContext();
                var user = Db.Users.First(u => u.UserName == model.UserName);
               
                user.Email = model.Email;
                Db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                await Db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }


        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult> Edit(string id)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            var model = new AdminViewModel(user);
            return View(model);
        }


        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(AdminViewModel model, IList<ApplicationClaim> selectedClaim)
        {
            if (ModelState.IsValid)
            {
                
                var Db = new ApplicationDbContext();
                var user = Db.Users.First(u => u.UserName == model.SelectUserRolesViewModel.UserName);

                // string[] allUserRoles =  UserManager.GetRoles(user.Id).ToArray();
                //UserManager.RemoveFromRoles(user.Id, allUserRoles);

                var roles = await UserManager.GetRolesAsync(user.Id);
                await UserManager.RemoveFromRolesAsync(user.Id, roles.ToArray());

                bool roleSelected = false;


                foreach (var role in model.SelectUserRolesViewModel.Roles)
                {
                  
                    if (role.Selected)
                    {
                        roleSelected = true;
                        await UserManager.AddToRoleAsync(user.Id, role.RoleName);
                        selectedClaim.Add(new ApplicationClaim() { Type = "Role", Value = role.RoleName });
                    }
                }


                if (!roleSelected)
                {
                    selectedClaim.Add(new ApplicationClaim() { Type = "Role", Value = "" });
                   // IList<string> userRoles = UserManager.GetRoles(user.Id);

                    var userRoles = await UserManager.GetRolesAsync(user.Id);


                    foreach (var userRole in userRoles) {
                       await UserManager.RemoveFromRoleAsync(user.Id, userRole);
                    }
                }



                var Identity = new ClaimsIdentity(User.Identity);
                var claims = await UserManager.GetClaimsAsync(user.Id);
                foreach (var claim in selectedClaim)
                {

                   

                    await UserManager.RemoveClaimAsync(user.Id, claims.FirstOrDefault(t => t.Type == claim.Type));


                }


                foreach (var claim in selectedClaim)
                {
                    
                    await UserManager.AddClaimAsync(user.Id, new Claim(claim.Type, claim.Value));
                }


                
                return RedirectToAction("Edit");
            }
            else
            {

                //  ModelState.AddModelError("", "Please ensure you have selected a role.");

                foreach (var claim in selectedClaim)
                {

                    if (claim.Value == null){
                        ViewData["Error"] = "Please select " + claim.Type.ToLower();
                    }

                }
               
                
                return RedirectToAction("Edit");
            }
            return View();
        }


        [Authorize(Roles = "Administrator")]
        public ActionResult Delete(string id = null)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            var model = new EditUserViewModel(user);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(model);
        }


        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
         [Authorize(Roles = "Administrator")]
        public ActionResult DeleteConfirmed(string id)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            Db.Users.Remove(user);
            Db.SaveChanges();
            return RedirectToAction("Index");
        }


         [Authorize(Roles = "Administrator")]
        public ActionResult UserRoles(string id)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            var model = new SelectUserRolesViewModel(user);
            return View(model);
        }


        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [ValidateAntiForgeryToken]
        public ActionResult UserRoles(SelectUserRolesViewModel model)
        {
            if (ModelState.IsValid)
            {
              //  var idManager = new IdentityManager();
                var Db = new ApplicationDbContext();
                var user = Db.Users.First(u => u.UserName == model.UserName);
               


             
                //var currentRoles = new List<IdentityUserRole>();

                //currentRoles.AddRange(user.Roles);
                //foreach (var role in currentRoles)
                //{
                //    UserManager.RemoveFromRole(user.Id, role.RoleId);
                //}

                string[] allUserRoles = UserManager.GetRoles(user.Id).ToArray();
                UserManager.RemoveFromRoles(user.Id, allUserRoles);

                foreach (var role in model.Roles)
                {
                    if (role.Selected)
                    {
                    UserManager.AddToRole(user.Id, role.RoleName);
                    }
                }
                return RedirectToAction("index");
            }
            return View();
        }


        public ActionResult UserClaims(string id)
        {
            var Db = new ApplicationDbContext();
            var user = Db.Users.First(u => u.UserName == id);
            var model = new SelectUserClaimsViewModel(user);
            return View(model);
        }

        [HttpPost]
        //  [Authorize(Roles = "Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> UserClaims(SelectUserClaimsViewModel model, IList<ApplicationClaim> selectedClaim)
        {
            if (ModelState.IsValid)
            {




           //     var idManager = new IdentityManager();
                var Db = new ApplicationDbContext();
                var user = Db.Users.First(u => u.UserName == model.UserName);


                // Get User and a claims-based identity
                var Identity = new ClaimsIdentity(User.Identity);

                foreach (var claim in selectedClaim)
                {

                    // Claim clm = Identity.FindFirst(claim.Type);
                    // Remove existing claim and replace with a new value
                    await UserManager.RemoveClaimAsync(user.Id, Identity.FindFirst(claim.Type));
                    await UserManager.AddClaimAsync(user.Id, new Claim(claim.Type, claim.Value));


                }

                // Re-Signin User to reflect the change in the Identity cookie
                //   await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                //await SignInAsync(user, false);


                return RedirectToAction("index");
            }
            return View();
        }



        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            Error
        }


        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}