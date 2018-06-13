using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IVisitHeaderDbInterface
    {
        [Sql("GetVisitHeaders")]
        Task<List<VisitHeader>> GetVisitHeadersAsync(string PasId, string OrganisationCode, int CdeaId, bool AdvancedSearch);

        [Sql("IsVisitHeaderDuplicate")]
        Task<bool> IsVisitHeaderDuplicate(DateTime DateOfVisit, string PasId, string OrganisationCode, int CdeaId);

        [Sql("usp_IsVisitHeaderValid")]
        Task<bool> IsVisitHeaderValid(DateTime DateOfVisit, string PasId, string OrganisationCode, int CdeaId);

        [Sql("GetVisitHeader")]
        Task<VisitHeader> GetVisitHeaderAsync(DateTime? DateOfVisit, int VisitId, string PasId, string OrganisationCode, int CdeaId, bool AdvancedSearch);

        [Sql("UpsertVisitHeader")]
        Task<bool> SaveVisitHeaderAsync(DateTime DateOfVisit,int VisitId, string PasId, string OrganisationCode, int CdeaId, bool Completed,  string UserCreated);

    }
}
