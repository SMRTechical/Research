
using Insight.Database;
using Microsoft.Practices.Unity;
using Serilog;
using Sjogrens.Core.Configuration;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Logging;
using Sjogrens.Core.Serialization.Interfaces;
using Sjogrens.Core.Serialization.Models;
using Sjogrens.Data.Repositories.Interfaces;
using Sjogrens.Data.Repositories.Models;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;
using Unity.WebApi;
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Data.Insight;
using Sjogrens.Data.DbInterfaces;

namespace Sjogrens.DataApi
{
    public static class UnityConfig
    {


        public static UnityContainer RegisterComponents(UnityContainer container)
        {
            //Config
            // container.RegisterType<IConfigStore, ConfigStore>(new ContainerControlledLifetimeManager());

            //Logging
            container.RegisterType<ILogger>(new ContainerControlledLifetimeManager(),
                new InjectionFactory((ctr) => LoggerFactory.Create(ConfigKeys.DataApi.ApplicationName)));

            //Insight
            var SjogrensConnectionString = ConfigurationManager.ConnectionStrings[ConfigurationManager.AppSettings[ConfigKeys.ConnectionStrings.SqlServer.Sjogrens]];
            container.RegisterType<IDbConnection>(new InjectionFactory(c => new SqlConnection(SjogrensConnectionString.ConnectionString)));
            container.RegisterType<IInsightDatabase, InsightDatabase>(new TransientLifetimeManager());

            RegisterDatabaseInterface<IPatientDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IPatientStateDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IVisitHeaderDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IVisitDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IVisitKeyValueDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IVisitControlValueDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<IConsentDbInterface>(container, SjogrensConnectionString);
            RegisterDatabaseInterface<ICategoryDbInterface>(container, SjogrensConnectionString);

            //Models
            container.RegisterType<IPatient, Patient>(new ContainerControlledLifetimeManager());
            container.RegisterType<IMITPatient, MITPatient>(new ContainerControlledLifetimeManager());
            container.RegisterType<IOrganisation, Organisation>(new ContainerControlledLifetimeManager());
            container.RegisterType<IUserAuditDetails, UserAuditDetails>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPatientBaseline, PatientBaseline>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPatientState, PatientState>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitHeader, VisitHeader>(new ContainerControlledLifetimeManager());
            
           // container.RegisterType<ICompleteVisit, CompleteVisit>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisit, Visit>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitKeyValue, VisitKeyValue>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitControlValue, VisitControlValue>(new ContainerControlledLifetimeManager());
            container.RegisterType<IDetail, Detail>(new ContainerControlledLifetimeManager());
            container.RegisterType<IConsent, Consent>(new TransientLifetimeManager());
            container.RegisterType<ICategory, Category>(new TransientLifetimeManager());
            ////Repositories
            container.RegisterType<IPatientRepository, PatientRepository>(new TransientLifetimeManager());
            container.RegisterType<IPatientStateRepository, PatientStateRepository>(new TransientLifetimeManager());
            container.RegisterType<IOrganisationRepository, OrganisationRepository>(new TransientLifetimeManager());
            container.RegisterType<IVisitHeaderRepository, VisitHeaderRepository>(new TransientLifetimeManager());
            container.RegisterType<IVisitRepository, VisitRepository>(new TransientLifetimeManager());
            container.RegisterType<IVisitKeyValueRepository, VisitKeyValueRepository>(new TransientLifetimeManager());
            container.RegisterType<IVisitControlValueRepository, VisitControlValueRepository>(new TransientLifetimeManager());
            container.RegisterType<IConsentRepository, ConsentRepository>(new TransientLifetimeManager());
            container.RegisterType<ICategoryRepository, CategoryRepository>(new TransientLifetimeManager());



            //Helpers
            //container.RegisterType<ISerializer, Serializer>(new ContainerControlledLifetimeManager());
            //container.RegisterType<IXmlDocumentSerializer, XmlDocumentSerializer>(new ContainerControlledLifetimeManager());

            // container.RegisterType<ICompressor, GZipCompressor>(new ContainerControlledLifetimeManager());


            return container;
        }

        private static void RegisterDatabaseInterface<T>(UnityContainer container, ConnectionStringSettings connectionStringSettings) where T : class
        {
            container.RegisterType<T>(new TransientLifetimeManager(), new InjectionFactory(c => connectionStringSettings.AsParallel<T>()));
        }

    }
}