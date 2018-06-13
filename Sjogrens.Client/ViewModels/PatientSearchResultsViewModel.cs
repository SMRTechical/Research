using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class PatientSearchResultsViewModel
    {
        public int Pid { get; set; }
        public string PasId { get; set; }
        public string NHSNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public string PostCode { get; set; }
        public string OrganisationCode { get; set; }
        public string Gender { get; set; }
        public string Ethnicity { get; set; }
        public string FullName => $"{FirstName} {LastName}";

        public int CdeaId { get; set; }
        public bool exists { get; set; } = false;
        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

        public int? Age => PatientFactory.CalculateAge(DateOfBirth);
    }
}