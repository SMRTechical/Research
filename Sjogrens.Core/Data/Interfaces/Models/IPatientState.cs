using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IPatientState
    {
        int Pid { get; set; }
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
        bool InitialVisit { get; set; }
        bool NewVisit { get; set; }
        bool Completed { get; set; }
        bool AdvancedSearch { get; set; }
        bool BaselineExists { get; set; }
        bool HasOpenVisit { get; set; }
        VisitHeader RecentVisit { get; set; }
    }
}
