using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IBaselinePostParams
    {
        //string UserCreated { get; set; }
        //bool Authorised { get; set; }
        //string UserOrganisationCode { get; set; }
        //int UserCdeaId { get; set; }
        string Token { get; set; }
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
        PatientBaseline PatientBaseline { get; set; }
        bool BlankBaseline();

    }
}
