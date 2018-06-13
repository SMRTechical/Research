using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class VisitHeader : IVisitHeader, IAudit
    {
        public int VisitHeaderId { get; set; }
        public int VisitId { get; set; }
        public DateTime DateOfVisit { get; set; }
        public int Pid { get; set; }
        public string PasId { get; set; }
        public string OrganisationCode { get; set; }
        public bool InitialVisit { get; set; }
        public bool NewVisit { get; set; }
        public bool Completed { get; set; }
        public bool AdvancedSearch { get; set; }
        public bool IsDuplicate { get; set; }
        public bool IsInvalid { get; set; }
        public int CdeaId { get; set; }
        public string CreatedUser { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string LastUpdatedUser { get; set; }
        public DateTime? LastUpdatedDateTime { get; set; }

    }
}
