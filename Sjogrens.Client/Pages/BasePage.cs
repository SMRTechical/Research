using System.Diagnostics;
using System.Reflection;
using Microsoft.Practices.Unity;
using System.Threading.Tasks;
using Sjogrens.Core.Configuration;
using Sjogrens.Core.Data.Models;
using Sjogrens.Client.Authorization;
using System.Collections.Generic;
using Sjogrens.Core.Serialization.Interfaces;
using System.Web.Helpers;
using Sjogrens.Core.Data.Services.Interfaces;
using System.Configuration;
using Sjogrens.Client.Authorization.Interfaces;

namespace Sjogrens.Client.Pages
{
    public class BasePage : System.Web.Mvc.WebViewPage
    {
        [Dependency]
        public IOrganisationService OrganisationService { protected get; set; }

        [Dependency]
        public IConfigStore ConfigStore { protected get; set; }

        [Dependency]
        public IAuthorizationHelper AuthorizationHelper { protected get; set; }

        [Dependency]
        public ISerializer Serializier { protected get; set; }


        public List<Organisation> Organisations
        {
            get
            {
                return Task.Run(async () => await OrganisationService.GetOrganisationsAsync()).Result;
            }
        }

        public string Version
        {
            get
            {
                return FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion;
            }
        }

        public bool UserAuthorized
        {
            get
            {
                return AuthorizationHelper.GetUserAuthorized();
            }
        }

        //public string UserActiveInactive
        //{
        //    get
        //    {
        //        return AuthorizationHelper.GetUserActiveInactive();
        //    }
        //}

        public string UserName
        {
            get
            {
                return AuthorizationHelper.GetUserName();
            }
        }

        public string UserRole
        {
            get
            {
                return AuthorizationHelper.GetUserRole();
            }
        }

        public string UserOrganisationCode
        {
            get
            {
                return AuthorizationHelper.GetUserOrganisationCode();
            }
        }


        public string ApplicationName
        {
            get
            {
                return ConfigurationManager.AppSettings[ConfigKeys.Website.ApplicationName];
            }
        }


        public string ApplicationVersion
        {
            get
            {
                return ConfigurationManager.AppSettings[ConfigKeys.Website.ApplicationVersion];
            }
        }

        public string ApplicationTitle
        {
            get
            {
                return string.Format("{0}{1}", ApplicationName, "<span>@QEHB</span>");
            }
        }


        public string CopyrightMessage
        {
            get
            {
                return ConfigurationManager.AppSettings[ConfigKeys.Website.CopyrightMessage];
            }
        }
        public int RefreshTokenMinutes
        {
            get
            {
                return GetConfigStoreMinutes(ConfigKeys.Website.RefreshTokenMinutes, 3);
            }
        }

        public int TimeoutMinutes
        {
            get
            {
                return GetConfigStoreMinutes(ConfigKeys.Website.TimeoutMinutes, 15);
            }
        }

        public int TimeoutWarningMinutes
        {
            get
            {
                return GetConfigStoreMinutes(ConfigKeys.Website.TimeoutWarningMinutes, 1);
            }
        }

        public bool DisableAuthorization
        {
            get
            {
                var disableAuthorization = false;
                bool.TryParse(ConfigStore[ConfigKeys.Website.Auth.DisableAuth], out disableAuthorization);
                return disableAuthorization;
            }
        }

        public override void Execute()
        {

        }

        private int GetConfigStoreMinutes(string configStoreKey, int defaultMinutes)
        {
            int configMinutes;

            int.TryParse(ConfigStore[configStoreKey], out configMinutes);

            if (configMinutes <= 0)
            {
                return defaultMinutes;
            }
            else
            {
                return configMinutes;
            }
        }


        //public string TokenHeaderValue()
        //{
        //    string cookieToken, formToken;
        //    AntiForgery.GetTokens(null, out cookieToken, out formToken);
        //    return cookieToken + ":" + formToken;
        //}
    }
}