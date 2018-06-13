
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Data.DbInterfaces;
using Sjogrens.Core.Factories;
using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Params;
using Elmah;

namespace Sjogrens.Data.Repositories.Models
{
    public class PatientStateRepository : IPatientStateRepository
    {
        private readonly IPatientStateDbInterface _patientStateDbInterface;

        public PatientStateRepository()
        {

        }

        public PatientStateRepository(IPatientStateDbInterface patientStateDbInterface)
        {
            _patientStateDbInterface = patientStateDbInterface;
        }
        public async Task<PatientState> GetPatientStateAsync(PatientStateGetParams patientStateGetParams)
        {
            if (patientStateGetParams == null)
                throw new ArgumentNullException(nameof(patientStateGetParams));

            if (string.IsNullOrWhiteSpace(patientStateGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.UserCreated));

            if (!patientStateGetParams.Authorised)
                throw new ArgumentException(nameof(patientStateGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(patientStateGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.UserOrganisationCode));

            if (patientStateGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.UserCdeaId));

            if (patientStateGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.CdeaId));

            if (string.IsNullOrEmpty(patientStateGetParams.PasId))
                throw new ArgumentNullException(nameof(patientStateGetParams.PasId));

            if (string.IsNullOrEmpty(patientStateGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(patientStateGetParams.OrganisationCode));

            if (patientStateGetParams.OrganisationCode != patientStateGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(patientStateGetParams.OrganisationCode), "Access Denied");

            try
            {
                var patientState = await _patientStateDbInterface.GetPatientStateAsync(patientStateGetParams.PasId, patientStateGetParams.OrganisationCode, patientStateGetParams.CdeaId);
                return patientState;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }
    }
}
