using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface ISpinePatient
    {
        string NhsNumber { get; set; }
        string Title { get; set; }
        string Forename { get; set; }
        string Middlename { get; set; }
        string Surname { get; set; }
        DateTime? Dob { get; set; }
        string Gender { get; set; }
        string Address1 { get; set; }
        string Address2 { get; set; }
        string Address3 { get; set; }
        string Address4 { get; set; }
        string Address5 { get; set; }
        string PostCode { get; set; }
        string Telephone { get; set; }
        string GpPracticeName { get; set; }
        string GpTelephone { get; set; }
        string GpAddress1 { get; set; }
        string GpAddress2 { get; set; }
        string GpAddress3 { get; set; }
        string GpAddress4 { get; set; }
        string GpAddress5 { get; set; }
        string GpPostcode { get; set; }
        string Ethnicity { get; set; }
        int CdeaId { get; set; }
        string Errors { get; set; }
    }
}
