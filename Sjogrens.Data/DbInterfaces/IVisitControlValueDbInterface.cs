using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IVisitControlValueDbInterface
    {
        [Sql("usp_GetVisitControlValues")]
        [Recordset(1, typeof(VisitControlValue), IsChild = true)]
        Task<CompleteVisitControlValue> GetVisitControlValueAsync(int VisitHeaderId, string OrganisationCode, int CdeaId);
    }
}
