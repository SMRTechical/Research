
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IPatientStateService
    {
        Task<PatientState> GetPatientStateAsync(PatientStateGetParams patientStateGetParams);
    }
}
