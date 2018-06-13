
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using Sjorgens.Core.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services
{
    public class PatientStateService : IPatientStateService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public PatientStateService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
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

            if (patientStateGetParams.CdeaId != patientStateGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientStateGetParams.PasId))
                throw new ArgumentNullException(nameof(patientStateGetParams.PasId));

            if (string.IsNullOrEmpty(patientStateGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(patientStateGetParams.OrganisationCode));

            if (patientStateGetParams.OrganisationCode != patientStateGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(patientStateGetParams.UserOrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"patientstate");

            var response = await _dataApiHttpService.PostAsync<PatientStateGetParams, PatientState>(uri, patientStateGetParams);
            return response.Success ? response.Data : null;
        }

    }
}
