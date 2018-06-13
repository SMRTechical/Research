
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjorgens.Core.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services
{
    public class ConsentService : IConsentService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public ConsentService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

       
        public async Task<Consent> GetConsentAsync(ConsentGetParams consentGetParams)
        {
            if (consentGetParams == null)
                throw new ArgumentNullException(nameof(consentGetParams));

            if (string.IsNullOrEmpty(consentGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserCreated));

            if (!consentGetParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.Authorised));

            if (string.IsNullOrEmpty(consentGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserOrganisationCode));

            if (consentGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserCdeaId));

            if (consentGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.CdeaId));

            if (consentGetParams.CdeaId != consentGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(consentGetParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.PasId));

            if (string.IsNullOrEmpty(consentGetParams.OrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.OrganisationCode));

            if (consentGetParams.OrganisationCode != consentGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.OrganisationCode),"Access Denied");

            var uri = new HttpClientUriBuilder($"consent");

            var response = await _dataApiHttpService.PostAsync<ConsentGetParams, Consent>(uri, consentGetParams);
            return response.Success ? response.Data : null;
        }


        public async Task<bool> SaveConsentAsync(ConsentPostParams consentPostParams)
        {
            if (consentPostParams == null)
                throw new ArgumentNullException(nameof(consentPostParams));

            if (string.IsNullOrEmpty(consentPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserCreated));

            if (!consentPostParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.Authorised));

            if (string.IsNullOrEmpty(consentPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserOrganisationCode));

            if (consentPostParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserCdeaId));

            if (consentPostParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.CdeaId));

            if (consentPostParams.CdeaId != consentPostParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(consentPostParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.PasId));

            if (string.IsNullOrEmpty(consentPostParams.OrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.OrganisationCode));

            if (consentPostParams.OrganisationCode != consentPostParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.OrganisationCode),"Access Denied");

            var uri = new HttpClientUriBuilder($"consent/save");

            var response = await _dataApiHttpService.PostAsync<ConsentPostParams, bool>(uri, consentPostParams);
            return response.Success ? response.Data : false;
        }
    }
}
