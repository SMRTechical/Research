using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Configuration
{
    public static class ConfigKeys
    {
        public static class groups
        {
            public const string ItTechnicalDevelopment = "ItTechnicalDevelopment";
            public const string ADCdeaGroup = "ADCdeaGroup";
            public const string CdeaId = "CdeaId";
            public const string OrganisationCode = "OrganisationCode";
            public const string AllowITTechDevAccess = "AllowITTechDevAccess";
        }

        public static class Logging
        {
            public const string MinLogEventLevel = "MinLogEventLevel";
            public const string LogFilePath = "LogFilePath";
        }

        public static class ConnectionStrings
        {
            public static class SqlServer
            {
                public const string Sjogrens = "Sjogrens";
            }
        }

        public static class AwsSqs
        {
            public const string MaxNumberOfMessages = "AwsSqsMessageBatchSize";
            public const string QueueWaitTime = "AwsSqsQueueWaitTime";
            public const string VisibilityTimeout = "AwsSqsVisibilityTimeout";
            public const string MaxRetryCount = "AwsSqsMaxRetryCount";
        }

        public static class DataApi
        {
            public const string ApplicationName = "BonusDataApi";
            public const string Environment = "Environment";
            public const string DataApi_Local = "http://localhost:64046/";
            public const string DataApi_Paisley = "http://paisley/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Perth = "http://perth/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Cambridge = "http://cambridge/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Carlisle = "http://carlisle/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Canterbury = "http://canterbury/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Wells = "http://wells/CDEA/Sjogrens.DataApi/";
            public const string DataApi_Worcester = "http://worcester/CDEA/Sjogrens.DataApi/";
            public const string DataApi_CPQA1 = "http://cpqa1/CDEA/Sjogrens.DataApi/";
            public const string DataApi_CPQA2 = "http://cpqa2/CDEA/Sjogrens.DataApi/";
            public const string DataApi_CPQA = "http://cpqa/CDEA/Sjogrens.DataApi/";

            //public const string BaseUri = "DataApiBaseUri";
        }

        public static class DataService
        {
            public const string DisableDataService = "DisableDataService";
            public const string ApplicationName = "BonusDataService";
        }

        public static class DataServiceTestHarness
        {
            public const string ApplicationName = "DataServiceTestHarness";
        }

        public static class CaluclationService
        {
            public const string ApplicationName = "BonusCalculationService";
            public const string PollFrequency = "PollFrequency";
            public const string BatchSize = "BatchSize";
            public const string MaxThreads = "MaxThreads";
        }

        public static class Website
        {
            public const string ApplicationName = "ApplicationName";
            public const string EnableBonusRuns = "EnableBonusRuns";
            public const string RefreshTokenMinutes = "RefreshTokenMinutes";
            public const string TimeoutMinutes = "TimeoutMinutes";
            public const string TimeoutWarningMinutes = "TimeoutWarningMinutes";
            public const string CopyrightMessage = "CopyrightMessage";
            public const string ApplicationVersion = "ApplicationVersion";


            public static class Auth
            {
                public const string DisableAuth = "DisableAuthorization";
                //public const string ClientId = "ida:ClientId";
                //public const string AppKey = "ida:AppKey";
                //public const string AadInstance = "ida:AADInstance";
                //public const string TenantId = "ida:TenantId";
                //public const string PostLogoutRedirectUrl = "ida:PostLogoutRedirectUri";
                //public const string MetadataAddress = "ida:MetadataAddress";
                //public const string GraphResourceId = "ida:GraphResourceId";

                public const string DevUserRole = "Administrator";
                public const string DevUserName = "JKR1";
                public const string DevOrganisationCode = "RRK";
                public const string DevOrganisationDescription = "University Hospitals Birmingham Nhs Foundation Trust";
                public const string DevCdeaId = "1";

                public static class Roles
                {
                    public const string Adminstrator = "Administrator";
                    public const string Update = "Update";
                    public const string Read = "Read";
                }
            }


            public static class CorsDomains
            {
                public const string Local = "http://localhost:53818";
                public const string Paisley = "http://paisley/CDEA/Sjogrens";
                public const string Perth = "http://perth/CDEA/Sjogrens";
                public const string Cambridge = "http://cambridge/CDEA/Sjogrens";
                public const string Carlisle = "http://carlisle/CDEA/Sjogrens";
                public const string Canterbury = "http://canterbury/CDEA/Sjogrens";
                public const string Wells = "http://wells/CDEA/Sjogrens";
                public const string Worcester = "http://worcester/CDEA/Sjogrens";
                public const string CPQA1 = "http://cpqa1/CDEA/Sjogrens";
                public const string CPQA2 = "http://cpqa2/CDEA/Sjogrens";
                public const string CPQA = "http://cpqa/CDEA/Sjogrens";
            }
        }



        public static class JsonSchema
        {
            public const string SchemeGroupTemplate = "JsPlc.Ssc.Bonus.Core.Data.JsonSchema.SchemeGroupTemplateSchema.json";
            public const string SchemeComponentTemplate = "JsPlc.Ssc.Bonus.Core.Data.JsonSchema.SchemeComponentTemplateSchema.json";
            public const string EligibilityRuleTemplate = "JsPlc.Ssc.Bonus.Core.Data.JsonSchema.EligibilityRuleTemplateSchema.json";
        }

        public static class XmlSchema
        {
            public const string ColleagueEmployment = "JsPlc.Ssc.Bonus.Core.Data.XmlSchema.ColleagueEmployment.xsd";
            public const string ColleagueProfile = "JsPlc.Ssc.Bonus.Core.Data.XmlSchema.ColleagueProfile.xsd";
            public const string ColleagueAbsence = "JsPlc.Ssc.Bonus.Core.Data.XmlSchema.ColleagueAbsence.xsd";
        }

        public static class SqlScripts
        {
            public const string ReleaseEnvironment = "ReleaseEnvironment";
        }
    }

}
