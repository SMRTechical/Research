using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
   public interface IVisitHeader
    {
        int VisitHeaderId { get; set; }
        int VisitId { get; set; }
        DateTime DateOfVisit { get; set; }
        int Pid { get; set; }
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        bool InitialVisit { get; set; }
        bool NewVisit { get; set; }
        bool Completed { get; set; }

        int CdeaId { get; set; }
        bool AdvancedSearch { get; set; }
        bool IsDuplicate { get; set; }
        bool IsInvalid { get; set; }

    }
}
