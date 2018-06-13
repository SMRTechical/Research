using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class PatientDetailsViewModel :Patient
    {
        
        public string FullName => $"{FirstName} {LastName}";

        public string GenderDescription => !string.IsNullOrEmpty(Gender) ? (Gender == "M") ? "Male" : "Female" : "N/A";

     //   public string Token => HttpContext.Current.Server.UrlEncode((EncryptionFactory.Encrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}", ConfigurationManager.AppSettings["EncryptionKey"].ToString())));

        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());


        public string FullAddress {
            get
            {
                var values = new[] { Address1, Address2, Address3, Address4, PostCode};
                var result = string.Join(", ", values.Where(s => !string.IsNullOrEmpty(s)));

                return string.IsNullOrEmpty(result) ? "Not Stated" : result;

            }
        }

        public DateTime? Imported => UserCreatedDate;

        public int? Age => PatientFactory.CalculateAge(DateOfBirth);

    }
}