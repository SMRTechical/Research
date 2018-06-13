using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{
    public interface IVisitHeaderGetParams
    {
        DateTime DateOfVisit { get; set; }
        string PasId { get; set; }

        string Token { get; set; }

        int VisitId { get; set; }

        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
    }
}
