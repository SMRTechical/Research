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
using Sjogrens.Client.Authorization.Interfaces;

namespace Sjogrens.Client
{
    public static class _UnityConfig
    {
        //     public static void RegisterComponents()
        //     {
        //var container = new UnityContainer();

        //         // register all your components with the container here
        //         // it is NOT necessary to register your controllers

        //         // e.g. container.RegisterType<ITestService, TestService>();

        //         GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        //     }

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


            //container.RegisterType<AccountController>(new InjectionConstructor());

            container.RegisterType<AccountController>(new InjectionConstructor(typeof(_IActiveDirectoryUser), typeof(_IActiveDirectoryService)));


            //Models
            container.RegisterType<_IActiveDirectoryUser, _UHBActiveDirectoryUser>(new ContainerControlledLifetimeManager());
            container.RegisterType<IUserAuditDetails, UserAuditDetails>(new ContainerControlledLifetimeManager());

            //Services
            container.RegisterType<_IActiveDirectoryService, _ActiveDirectoryService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IPatientService, PatientService>(new ContainerControlledLifetimeManager());
          //  container.RegisterType<IMITPatientService, MITPatientService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IOrganisationService, OrganisationService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IVisitHeaderService, VisitHeaderService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IConsentService, ConsentService>(new ContainerControlledLifetimeManager());

            //Apis
            container.RegisterType<IDataApiHttpService, DataApiHttpService>(new ContainerControlledLifetimeManager());

            //Helpers
            container.RegisterType<ISerializer, Serializer>(new ContainerControlledLifetimeManager());
            container.RegisterType<IAuthorizationHelper, AuthorizationHelper>(new ContainerControlledLifetimeManager());

            // container.RegisterType<IExcelHandler<ManagerAuthorizationSet>, ManagerAuthorizationExcelHandler>(new ContainerControlledLifetimeManager());



        }


    }
}