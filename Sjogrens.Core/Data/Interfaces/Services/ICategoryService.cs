
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<VisitCategory>> GetCategoriesAsync(CategoryGetParams categoryGetParams);
    }
}
