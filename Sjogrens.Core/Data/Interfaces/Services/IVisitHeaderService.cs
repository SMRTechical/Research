
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IVisitHeaderService
    {
        Task<IEnumerable<VisitHeader>> GetVisitHeadersAsync(VisitHeadersGetParams visitHeadersGetParams);
        Task<bool> SaveVisitHeaderAsync(VisitHeaderPostParams visitHeaderPostParams);
        Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams);
        Task<bool> IsVisitHeaderValidAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams);
        Task<VisitHeader> GetVisitHeaderAsync(VisitHeaderGetParams visitHeaderGetParams);
    }
}
