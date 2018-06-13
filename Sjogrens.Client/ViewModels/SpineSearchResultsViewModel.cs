using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Services;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class SpineSearchResultsViewModel: Patient
    {
        // public IOrganisationService OrganisationService { protected get; set; }

       
        public string FullName => $"{FirstName} {MiddleName} {LastName}";
        public int? age => PatientFactory.CalculateAge(DateOfBirth);
        public string genderDescription => !string.IsNullOrEmpty(Gender) ? (Gender == "M") ? "Male" : (Gender == "F") ? "Female" : "" : "";

        
        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

        public bool exists { get; set; } = false;

        //public List<Organisation> Organisations
        //{
        //    get
        //    {
        //        return Task.Run(async () => await OrganisationService.GetOrganisationsAsync()).Result;
        //    }
        //}

    }
}