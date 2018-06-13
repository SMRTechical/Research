using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using Sjogrens.Core.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Core.Configuration
{
    public class ConfigurationHelper : IConfigurationHelper
    {

        public ConfigurationHelper() { }

        public int GetCurrentCdeaId()
        {
            var cdeaId = 0;
            int.TryParse(ConfigurationManager.AppSettings[ConfigKeys.groups.CdeaId], out cdeaId);

            return cdeaId;
        }


        public string GetCurrentOrganisationCode()
        {
              return   ConfigurationManager.AppSettings[ConfigKeys.groups.OrganisationCode];
        }
    }
}