using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IVisitDbInterface
    {
        [Sql("GetVisit")]
        [Recordset(1, typeof(Visit), IsChild = true)]
        [Recordset(2, typeof(Detail), IsChild = true)]
        Task<CompleteVisit> GetVisitAsync(int VisitHeaderId, string OrganisationCode, int CdeaId, bool newVisit, DateTime? dateOfVisit, string UserCreated);

        //[Sql("IsVisitHeaderDuplicate")]
        //Task<bool> IsVisitHeaderDuplicate(DateTime DateOfVisit, string PasId, string OrganisationCode, int CdeaId);


        //[Sql("GetVisitHeader")]
        //Task<VisitHeader> GetVisitHeaderAsync(DateTime DateOfVisit, int VisitId, string PasId, string OrganisationCode, int CdeaId, bool AdvancedSearch);

        [Sql("UpsertVisit")]
        Task<bool> SaveVisitAsync(int VisitHeaderId, int CategoryId, List<Visit> Visit, List<Detail> Detail, string UserCreated);

    }
}
