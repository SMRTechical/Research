using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IPatientService
    {
        Task<Patient> SearchPatientAsync(PatientSearchParams patientSearchParams);
        Task<Patient> CheckMITPatientAsync(PatientSearchParams patientSearchParams);
        Task<Patient> SearchSpineAsync(PatientSearchParams patientSearchParams);
        Task<IEnumerable<Patient>> SearchPatientsAsync(PatientsSearchParams patientsSearchParams);
        Task<Patient> GetPatientDetailsAsync(PatientDetailsGetParams patientDetailsGetParams);
        Task<PatientBaseline> GetPatientBaselineAsync(BaselineGetParams baselinePostParams);
        Task<bool> SavePatientBaselineAsync(BaselinePostParams baslinePostParams);
        Task<PatientOrg> SaveSpineAsync(PatientAddParams patientAddParams);
        Task<PatientOrg> SaveMITPatientAsync(PatientAddParams patientAddWithAuditParams);
    }
}
