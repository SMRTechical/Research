
using Sjogrens.Core.Data.Interfaces.Models;
using System;

namespace Sjogrens.Core.Data.Models
{
    public class Patient:IPatient
    {
        public int Pid { get; set; }
        public string PasId { get; set; }
        public string NhsNumber { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string OrganisationCode { get; set; }
     //   public string OrganisationDescription { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Address5 { get; set; }
        public string PostCode { get; set; }
        public string Telephone { get; set; }
        //Start Mobile Ph No 
        public string MobileNumber { get; set; }
        // Mobile2 As public string
        //End Mobile Ph No 

        public string EthnicGroup { get; set; }
        public string Gender { get; set; }
        public string GpPracticeName { get; set; }
        public string GpInitials { get; set; }
        public string GpSurname { get; set; }
        public string GpAddress1 { get; set; }
        public string GpAddress2 { get; set; }
        public string GpAddress3 { get; set; }
        public string GpAddress4 { get; set; }
        public string GpAddress5 { get; set; }
        public string GpPostcode { get; set; }
        public string GpTelephone { get; set; }
        public string NokTitle { get; set; }
        public string NokForename { get; set; }
        public string NokSurname { get; set; }
        public string NokRelation { get; set; }
        public string NokAddress1 { get; set; }
        public string NokAddress2 { get; set; }
        public string NokAddress3 { get; set; }
        public string NokAddress4 { get; set; }
        public string NokPostcode { get; set; }
        public string NokTelDay { get; set; }

        public int CdeaId { get; set; }
        public string Errors { get; set; }
        public DateTime RefreshDate { get; set; }
        public DateTime UserCreatedDate { get; set; }

        public string UserCreated { get; set; }

    }
}
