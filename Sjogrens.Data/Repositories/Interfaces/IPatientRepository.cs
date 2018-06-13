
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Params;

namespace Sjogrens.Data.Repositories.Interfaces
{
   public interface IPatientRepository
    {
        Task<IPatient> SearchPatientAsync(PatientSearchParams patientSearchParams);
        Task<IPatient> CheckMITPatientAsync(PatientSearchParams patientSearchParams);
        Task<IPatient> SearchSpineAsync(IPatientSearchParams patientSearchParams);
        Task<IEnumerable<Patient>> SearchPatientsAsync(PatientsSearchParams patientsSearchParams);
        Task<Patient> GetPatientDetailsAsync(PatientDetailsGetParams patientDetailsGetParams);
        Task<PatientBaseline> GetPatientBaselineAsync(BaselineGetParams baselineGetParams);
        Task<bool> SavePatientBaselineAsync(BaselinePostParams baselinePostParams);
        Task<IPatient> GetMITPatientAsync(PatientAddParams patientAddParams);
        Task<IPatient> GetMITPatientAsync(string pasId);
        Task<PatientOrg> InsertPatientAsync(PatientAddParams patientAddParams, IPatient patient);
    }
}
