using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IVisitKeyValueDbInterface
    {
        [Sql("usp_GetVisitKeyValues")]
        [Recordset(1, typeof(VisitKeyValue), IsChild = true)]
        Task<CompleteVisitKeyValue> GetVisitKeyValueAsync(int VisitHeaderId, string OrganisationCode, int CdeaId, int CategoryId, int SectionId);

      
        [Sql("usp_UpsertVisitKeyValues")]
        Task<bool> SaveVisitKeyValueAsync(int VisitHeaderId, int CategoryId, int SectionId, List<VisitKeyValue> VisitKeyValues, string UserCreated);

    }
}
