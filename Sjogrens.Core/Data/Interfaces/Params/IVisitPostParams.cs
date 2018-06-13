using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface IVisitPostParams 
    {
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
        int VisitHeaderId { get; set; }
        int CategoryId { get; set; }
        List<Visit> Visit { get; set; }
        List<Detail> Detail { get; set; }
    }
}
