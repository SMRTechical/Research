


using Microsoft.Practices.Unity;
using Serilog;
using Sjogrens.Core.Application.Services;
using Sjogrens.Core.Configuration;
using Sjogrens.Core.Logging;
using Sjogrens.Core.Models;
using Sjogrens.Core.Application.Services.Interfaces;
using Sjogrens.Client.Controllers;
using Sjogrens.Client.Models;
using Sjogrens.Core.Application.Interfaces;
using Sjogrens.Core.Data.Services;
using Sjorgens.Core.Http;
using Sjogrens.Client.Authorization;
using System;
using Sjogrens.Core.Serialization.Interfaces;
using Sjogrens.Core.Serialization.Models;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Data.Interfaces.Models;
using Microsoft.Owin.Security;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Sjogrens.Core.Application.Models.Interfaces;
using Sjogrens.Core.Application.Models;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using Sjogrens.Data.DbInterfaces;
using System.Configuration;
using System.Data;
using Sjogrens.Data.Insight;
using System.Data.SqlClient;
using Sjogrens.Data.Repositories.Interfaces;
using Sjogrens.Data.Repositories.Models;
using System.Web.Http;
using Unity.WebApi;
using Insight.Database;

namespace Sjogrens.Client
{
    public static class UnityConfig
    {
        
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterComponents(container);
            return container;
        });

        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }

        public static void RegisterComponents(UnityContainer container)
        {
            
            //container.RegisterType<AccountController>(new InjectionConstructor(typeof(IActiveDirectoryUser), typeof(IActiveDirectoryService)));

            //Configuration

            container.RegisterType<IConfigStore, ConfigStore>(new ContainerControlledLifetimeManager());

            //Logging
            container.RegisterType<ILogger>(new ContainerControlledLifetimeManager(),
                new InjectionFactory((ctr) => LoggerFactory.Create(ConfigKeys.Website.ApplicationName)));


            // container.RegisterType<AccountController>(new InjectionConstructor());


            container.RegisterType<IAuthenticationManager>(new InjectionFactory(o => System.Web.HttpContext.Current.GetOwinContext().Authentication));
            container.RegisterType<AccountController>(new InjectionConstructor(typeof(IAuthenticationManager),typeof(IAuthorizationHelper), typeof(IAdAuthenticationService), typeof(IConfigurationHelper)));


            container.RegisterType<HomeController>(new InjectionConstructor(typeof(IAuthenticationManager)));


            container.RegisterType<DbContext, ApplicationDbContext>(new HierarchicalLifetimeManager());

            container.RegisterType<UserManager<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>(new HierarchicalLifetimeManager());



            //Models
            container.RegisterType<IUserAuditDetails, UserAuditDetails>(new ContainerControlledLifetimeManager());
            container.RegisterType<IAuthenticationResult, AuthenticationResult>(new ContainerControlledLifetimeManager());

            //Services
            // container.RegisterType<IActiveDirectoryService, ActiveDirectoryService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPatientService, PatientService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPatientStateService, PatientStateService>(new ContainerControlledLifetimeManager());
            //  container.RegisterType<IMITPatientService, MITPatientService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IOrganisationService, OrganisationService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitHeaderService, VisitHeaderService>(new ContainerControlledLifetimeManager());
            container.RegisterType<ICategoryService, CategoryService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitService, VisitService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitKeyValueService, VisitKeyValueService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitControlValueService, VisitControlValueService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IConsentService, ConsentService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IAdAuthenticationService, AdAuthenticationService>(new ContainerControlledLifetimeManager());




            //Apis
            container.RegisterType<IDataApiHttpService, DataApiHttpService>(new ContainerControlledLifetimeManager());

            //Helpers
            container.RegisterType<ISerializer, Serializer>(new ContainerControlledLifetimeManager());
            container.RegisterType<IAuthorizationHelper, AuthorizationHelper>(new ContainerControlledLifetimeManager());
            container.RegisterType<IConfigurationHelper, ConfigurationHelper>(new ContainerControlledLifetimeManager());


            //*******//
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


            /****************/
            // container.RegisterType<IExcelHandler<ManagerAuthorizationSet>, ManagerAuthorizationExcelHandler>(new ContainerControlledLifetimeManager());



        }

        private static void RegisterDatabaseInterface<T>(UnityContainer container, ConnectionStringSettings connectionStringSettings) where T : class
        {
            container.RegisterType<T>(new TransientLifetimeManager(), new InjectionFactory(c => connectionStringSettings.AsParallel<T>()));
        }
    }
}