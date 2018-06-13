using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface IVisitKeyValuePostParams 
    {
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
        int VisitHeaderId { get; set; }
        int CategoryId { get; set; }
        int SectionId { get; set; }

        List<VisitKeyValue> VisitKeyValues { get; set; }
    }
}
