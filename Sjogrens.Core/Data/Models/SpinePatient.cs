
using Sjogrens.Core.Data.Interfaces.Models;
using System;

namespace Sjogrens.Core.Data.Models
{
    public class SpinePatient : ISpinePatient
    {

        public string NhsNumber { get; set; }
        public string Title { get; set; }
        public string Forename { get; set; }
        public string Middlename { get; set; }
        public string Surname { get; set; }
        public DateTime? Dob { get; set; }
        public string Gender { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Address5 { get; set; }
        public string PostCode { get; set; }
        public string Telephone { get; set; }
        public string Ethnicity { get; set; }
        public string GpPracticeName { get; set; }
        public string GpAddress1 { get; set; }
        public string GpAddress2 { get; set; }
        public string GpAddress3 { get; set; }
        public string GpAddress4 { get; set; }
        public string GpAddress5 { get; set; }
        public string GpPostcode { get; set; }
        public string GpTelephone { get; set; }
        public int CdeaId { get; set; }
        public string Errors { get; set; }
    }
}
