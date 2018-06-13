using Microsoft.Owin.Security;
using Sjogrens.Core.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Sjogrens;
using Sjogrens.Core.Authentication;
using System.Web;
using Microsoft.AspNet.Identity;
using Sjogrens.Core.Application.Models;
using Sjogrens.Core.Application.Services.Interfaces;
using Sjogrens.Core.Application.Models.Interfaces;

namespace Sjogrens.Core.Application.Services
{
    public class AdAuthenticationService : IAdAuthenticationService
    {
      


        private readonly IAuthenticationManager _authenticationManager;
        private readonly IAuthenticationResult _authenticationResult;

        public AdAuthenticationService(IAuthenticationManager authenticationManager, IAuthenticationResult authenticationResult)
        {
            _authenticationManager = authenticationManager;
            _authenticationResult = authenticationResult;
        }

        public UserPrincipal UserPrincipal { get; set; }

        /// <summary>
        /// Check if username and password matches existing account in AD. 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public IAuthenticationResult SignIn(String username, String password)
        {

            ContextType authenticationType = ContextType.Domain;
            PrincipalContext principalContext = new PrincipalContext(authenticationType, null, "xUHB.nhs.uk");

            string itTechnicalDevelopment = ConfigurationManager.AppSettings[ConfigKeys.groups.ItTechnicalDevelopment];
            string aDCdeaGroup = ConfigurationManager.AppSettings[ConfigKeys.groups.ADCdeaGroup];
            bool allowTechDevAccess = bool.Parse(ConfigurationManager.AppSettings[ConfigKeys.groups.AllowITTechDevAccess]);

            bool isAuthenticated = false;
            bool isAuthorised = false;

            try
            {
                isAuthenticated = principalContext.ValidateCredentials(username, password, ContextOptions.Negotiate);
                if (isAuthenticated)
                {
                    try
                    {
                        UserPrincipal = UserPrincipal.FindByIdentity(principalContext, username);

                        if (UserPrincipal != null)
                        {
                            isAuthenticated = principalContext.ValidateCredentials(username, password, ContextOptions.Negotiate);
                        }
                    }
                    catch (Exception exception)
                    {
                        //TODO log exception in your ELMAH like this:
                        //Elmah.ErrorSignal.FromCurrentContext().Raise(exception);
                        //return new AuthenticationResult("Username or Password is not correct");
                        _authenticationResult.ErrorMessage = "Username or Password is not correct";
                        return _authenticationResult;
                    }

                    PrincipalSearchResult<Principal> groups = UserPrincipal.GetAuthorizationGroups();
                    Principal group = groups.Where(g => g.SamAccountName.ToUpper() == aDCdeaGroup.ToUpper() || allowTechDevAccess && g.SamAccountName.ToUpper() == itTechnicalDevelopment).FirstOrDefault();
                    isAuthorised = group != null;
                }
            }
            catch (Exception)
            {
                isAuthenticated = false;
                UserPrincipal = null;
            }

            if (!isAuthenticated || UserPrincipal == null)
            {
                // return new AuthenticationResult("Username or Password is not correct");
                _authenticationResult.ErrorMessage = "The username or password is incorrect";
                return _authenticationResult;
            }

            if (UserPrincipal.IsAccountLockedOut())
            {
                // here can be a security related discussion weather it is worth 
                // revealing this information
                //return new AuthenticationResult("Your account is locked.");
                _authenticationResult.ErrorMessage = "Your account is locked.";
                return _authenticationResult;
            }

            if (UserPrincipal.Enabled.HasValue && UserPrincipal.Enabled.Value == false)
            {
                // here can be a security related discussion weather it is worth 
                // revealing this information
                // return new AuthenticationResult("Your account is disabled");
                _authenticationResult.ErrorMessage = "Your account is disabled.";
                return _authenticationResult;
            }

            if (isAuthenticated && !isAuthorised)
            {
                // return new AuthenticationResult("Your account  does not allow you access to this application");
                _authenticationResult.ErrorMessage = "our account  does not allow you access to this application.";
                return _authenticationResult;
            }

            //var identity = CreateIdentity(userPrincipal);

            //authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

            //authenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = false }, identity);



            return new AuthenticationResult();
        }


        /// <summary>
        /// Check if username and password matches existing account in AD. 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<IAuthenticationResult> SignInAsync(String username, String password)
        {
            return await Task.Run(() => SignIn(username, password));
        }

        //private ClaimsIdentity CreateIdentity(UserPrincipal userPrincipal)
        //{
        //    var identity = new ClaimsIdentity(DefaultAuthenticationTypes.ApplicationCookie, ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        //   identity.AddClaim(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "Active Directory"));



        //    identity.AddClaim(new Claim("FullName", userPrincipal.DisplayName));
        //    identity.AddClaim(new Claim("FirstName", userPrincipal.GivenName));
        //    identity.AddClaim(new Claim("Surname", userPrincipal.Surname));
        //    identity.AddClaim(new Claim("Username", userPrincipal.SamAccountName));
        //    identity.AddClaim(new Claim("OrganisationCode", "RRK"));
        //    identity.AddClaim(new Claim("OrganisationDescription", "University Hospitals Birmingham Nhs Foundation Trust"));
        //    identity.AddClaim(new Claim("Active", "true"));
        //    identity.AddClaim(new Claim("Authorized", "true"));
        //    identity.AddClaim(new Claim("Role", "Update"));

        //    if (!String.IsNullOrEmpty(userPrincipal.EmailAddress))
        //    {
        //        identity.AddClaim(new Claim("PrimaryEmail", userPrincipal.EmailAddress));
        //    }




        //    // add your own claims if you need to add more information stored on the cookie

        //    return identity;
        //}
    }
}
