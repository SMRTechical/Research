using Sjogrens.Core.Configuration;
using Sjogrens.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Factories
{
   public class EnvironmentFactory
    {

        public static string getCorsDomains(string environment)
        {

            List<String> AllowedDomains = new List<String>();

            int currentEnvironment = 1;
            try
            {
                int.TryParse(environment, out currentEnvironment);
            }
            catch (Exception)
            {
                currentEnvironment = 1;
            }

            switch (currentEnvironment)
            {
                case (int)EnvironmentConfig.local:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Local);
                    break;
                case (int)EnvironmentConfig.paisley:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Paisley);
                    break;
                case (int)EnvironmentConfig.perth:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Perth);
                    break;
                case (int)EnvironmentConfig.cambridge:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Cambridge);
                    break;
                case (int)EnvironmentConfig.carlisle:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Carlisle);
                    break;
                case (int)EnvironmentConfig.canterbury:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Canterbury);
                    break;
                case (int)EnvironmentConfig.wells:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Wells);
                    break;
                case (int)EnvironmentConfig.worcester:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Worcester);
                    break;
                case (int)EnvironmentConfig.cpqa1:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.CPQA1);
                    break;
                case (int)EnvironmentConfig.cpqa2:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.CPQA2);
                    break;
                case (int)EnvironmentConfig.cpqa:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.CPQA);
                    break;
                default:
                    AllowedDomains.Add(ConfigKeys.Website.CorsDomains.Local);
                    break;
            }

            return string.Join(",", AllowedDomains);

        }

        public static string getDataApiBaseAddress(string environment)
        {

            string baseAddress = ConfigKeys.DataApi.DataApi_Local;

            int currentEnvironment = 1;


            try
            {
                int.TryParse(environment, out currentEnvironment);
            }
            catch (Exception)
            {
                currentEnvironment = 1;
            }

            switch (currentEnvironment)
            {
                case (int)EnvironmentConfig.local:
                    baseAddress = ConfigKeys.DataApi.DataApi_Local;
                    break;
                case (int)EnvironmentConfig.paisley:
                    baseAddress  = ConfigKeys.DataApi.DataApi_Paisley;
                    break;
                case (int)EnvironmentConfig.perth:
                    baseAddress = ConfigKeys.DataApi.DataApi_Perth;
                    break;
                case (int)EnvironmentConfig.cambridge:
                    baseAddress = ConfigKeys.DataApi.DataApi_Cambridge;
                    break;
                case (int)EnvironmentConfig.carlisle:
                    baseAddress = ConfigKeys.DataApi.DataApi_Carlisle;
                    break;
                case (int)EnvironmentConfig.canterbury:
                    baseAddress = ConfigKeys.DataApi.DataApi_Canterbury;
                    break;
                case (int)EnvironmentConfig.wells:
                    baseAddress = ConfigKeys.DataApi.DataApi_Wells;
                    break;
                case (int)EnvironmentConfig.worcester:
                    baseAddress = ConfigKeys.DataApi.DataApi_Worcester;
                    break;
                case (int)EnvironmentConfig.cpqa1:
                    baseAddress = ConfigKeys.DataApi.DataApi_CPQA1;
                    break;
                case (int)EnvironmentConfig.cpqa2:
                    baseAddress = ConfigKeys.DataApi.DataApi_CPQA2;
                    break;
                case (int)EnvironmentConfig.cpqa:
                    baseAddress = ConfigKeys.DataApi.DataApi_CPQA;
                    break;
                default:
                    baseAddress = ConfigKeys.DataApi.DataApi_Local;
                    break;
            }

            return baseAddress;

        }

    }
}
