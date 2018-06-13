
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IVisitService
    {
        Task<CompleteVisit> GetVisitAsync(VisitGetParams visitGetParams);
        Task<bool> SaveVisitAsync(VisitPostParams visitPostParams);
        //Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams);
        //Task<VisitHeader> GetVisitAsync(VisitHeaderGetParams visitHeaderGetParams);
    }
}
