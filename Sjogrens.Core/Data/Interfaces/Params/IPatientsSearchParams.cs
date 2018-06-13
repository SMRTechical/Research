using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IPatientsSearchParams
    {
        bool Authorised { get; set; }

        string UserOrganisationCode { get; set; }
        int UserCdeaId { get; set; }
        bool SearchAllTrusts { get; set; }
        string PasId { get; set; }
        string NhsNumber { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string DateOfBirth { get; set; }
        string PostCode { get; set; }
       int CdeaId { get; set; }
        //string OrganisationCode { get; set; }

    }
}
