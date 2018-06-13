using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface IVisitKeyValueGetParams 
    {   
        int VisitHeaderId { get; set; }

        int CategoryId { get; set; }

        int SectionId { get; set; }

        string OrganisationCode { get; set; }

        int CdeaId { get; set; }
    }
}
