

using Microsoft.AspNet.Identity;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Core.Configuration;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Sjogrens.Client.Authorization
{
    public class AuthorizationHelper : IAuthorizationHelper
    {
        private readonly IConfigStore _configStore;

        public AuthorizationHelper(IConfigStore configStore)
        {
            _configStore = configStore;
        }


        //        public string GetUserActiveInactive()
        //        {
        //#if DEBUG 
        //            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
        //                return "A";
        //#endif

        //            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
        //            var activeInactive = identity.FindFirstValue("ActiveInactive") ?? "I";

        //            return activeInactive;
        //        }

        public bool GetUserAuthorized()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return true;
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var authorized = false;
            var x = bool.TryParse(identity.FindFirstValue("Authorized"), out authorized);
            // identity.FindFirstValue("Authorized") ?? false;

            return authorized;
        }

        public bool GetUserActive()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return true;
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var active = false;
            var x = bool.TryParse(identity.FindFirstValue("Active"), out active);

            return active;
        }


        public string GetUserName()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return _configStore[ConfigKeys.Website.Auth.DevUserName];
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var userName = identity.FindFirstValue("UserName") ?? HttpContext.Current.User.Identity.GetUserName();

            return userName;
        }

        public string GetUserOrganisationCode()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return _configStore[ConfigKeys.Website.Auth.DevOrganisationCode];
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var code = identity.FindFirstValue("OrganisationCode") ?? string.Empty;

            return code;
        }

        public string GetUserOrganisationDescription()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return _configStore[ConfigKeys.Website.Auth.DevOrganisationDescription];
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var description = identity.FindFirstValue("OrganisationDescription") ?? string.Empty;

            return description;
        }

        public int GetUserCdeaId()
        {
#if DEBUG 
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
                return Int32.Parse(_configStore[ConfigKeys.Website.Auth.DevCdeaId]);
#endif

            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var cdeaId = Int32.Parse(identity.FindFirstValue("CdeaId"));

            return cdeaId;
        }

        public string GetUserRole()
        {
            return IsAdministrator() ? ConfigKeys.Website.Auth.Roles.Adminstrator : IsUpdate() ? ConfigKeys.Website.Auth.Roles.Update : IsRead() ? ConfigKeys.Website.Auth.Roles.Read : string.Empty;
        }

        public bool IsAdministrator()
        {
#if DEBUG
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
            {
                return string.Equals(_configStore[ConfigKeys.Website.Auth.DevUserRole], ConfigKeys.Website.Auth.Roles.Adminstrator, StringComparison.InvariantCultureIgnoreCase);
            }
#endif

            var isRole = ClaimsPrincipal.Current?.IsInRole(ConfigKeys.Website.Auth.Roles.Adminstrator) ?? false;
            return isRole;

        }

        public bool IsUpdate()
        {
#if DEBUG
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
            {
                return string.Equals(_configStore[ConfigKeys.Website.Auth.DevUserRole], ConfigKeys.Website.Auth.Roles.Update, StringComparison.InvariantCultureIgnoreCase);
            }
#endif

            var isRole = ClaimsPrincipal.Current?.IsInRole(ConfigKeys.Website.Auth.Roles.Update) ?? false;
            return isRole;
        }

        public bool IsRead()
        {
#if DEBUG
            if (Convert.ToBoolean(_configStore[ConfigKeys.Website.Auth.DisableAuth]))
            {
                return string.Equals(_configStore[ConfigKeys.Website.Auth.DevUserRole], ConfigKeys.Website.Auth.Roles.Read, StringComparison.InvariantCultureIgnoreCase);
            }
#endif

            var isRole = ClaimsPrincipal.Current?.IsInRole(ConfigKeys.Website.Auth.Roles.Read) ?? false;
            return isRole;
        }

    }
}