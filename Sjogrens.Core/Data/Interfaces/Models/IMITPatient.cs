using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
   public interface IMITPatient
    {

        int Pid { get; set; }
        string PasId { get; set; }
        string NhsNumber { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string Dob { get; set; }
        string OrganisationCode { get; set; }
        string OrganisationDescription { get; set; }
        string Address1 { get; set; }
        string Address2 { get; set; }
        string Address3 { get; set; }
        string Address4 { get; set; }
        string PostCode { get; set; }
        string Telephone { get; set; }
        //Start Mobile Ph No 
        string Mobile1 { get; set; }
        // Mobile2 As String
        //End Mobile Ph No 

        string EthnicGroup { get; set; }
        string Gender { get; set; }
        string GpInitials { get; set; }
        string GpSurname { get; set; }
        string GpAddress1 { get; set; }
        string GpAddress2 { get; set; }
        string GpAddress3 { get; set; }
        string GpAddress4 { get; set; }
        string GpPostcode { get; set; }
        string GpTelephone { get; set; }
        string NokTitle { get; set; }
        string NokForename { get; set; }
        string NokSurname { get; set; }
        string NokRelation { get; set; }
        string NokAddress1 { get; set; }
        string NokAddress2 { get; set; }
        string NokAddress3 { get; set; }
        string NokAddress4 { get; set; }
        string NokPostcode { get; set; }
        string NokTelDay { get; set; }

        int CdeaId { get; set; }
        DateTime RefreshDate { get; set; }
        DateTime UserCreatedDate { get; set; }

    }
}
