using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface ICategoryDbInterface
    {
        [Sql("GetCategories")]
        Task<List<VisitCategory>> GetCategoriesAsync(int VisitHeaderId,string PasId, string OrganisationCode, int CdeaId,bool NewVisit, bool AdvancedSearch);

       

    }
}
