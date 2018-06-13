using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface IPatientSearchParams 
    {
        bool Authorised { get; set; }
        string UserOrganisationCode { get; set; }
        int UserCdeaId { get; set; }
        string PasId { get; set; }
        string DateOfBirth { get; set; }
        string NhsNumber { get; set; }
        int CdeaId { get; set; }
    }
}
