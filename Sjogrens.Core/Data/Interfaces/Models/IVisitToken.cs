using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IVisitToken
    {
         int VisitId { get; set; }
         int Pid { get; set; }
         string PasId { get; set; }
         bool InitialVisit { get; set; }
         bool NewVisit { get; set; }
         bool Completed { get; set; }
         bool AdvancedSearch { get; set; }
    }
}
