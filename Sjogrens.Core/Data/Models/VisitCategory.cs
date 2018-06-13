using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class VisitCategory : Category, IVisitToken
    {
        public int VisitId { get; set; }
        public int Pid { get; set; }
        public string PasId { get; set; }
        public bool InitialVisit { get; set; }
        public bool NewVisit { get; set; }
        public bool Completed { get; set; }
        public bool AdvancedSearch { get; set; }
    }
}
