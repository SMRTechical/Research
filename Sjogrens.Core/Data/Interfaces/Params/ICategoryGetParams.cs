using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface ICategoryGetParams 
    {
         string UserCreated { get; set; }
         bool Authorised { get; set; }
         string UserOrganisationCode { get; set; }
         int UserCdeaId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
        int VisitHeaderId { get; set; }
          bool newVisit { get; set; }
        string Token { get; set; }
        bool AdvancedSearch { get; set; }
    }
}
