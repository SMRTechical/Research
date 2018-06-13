
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IVisitKeyValueService
    {
        Task<CompleteVisitKeyValue> GetVisitKeyValueAsync(VisitKeyValueGetParams visitKeyValueGetParams);
        Task<bool> SaveVisitKeyValueAsync(VisitKeyValuePostParams visitKeyValuePostParams);
        //Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams);
        //Task<VisitHeader> GetVisitAsync(VisitHeaderGetParams visitHeaderGetParams);
    }
}
