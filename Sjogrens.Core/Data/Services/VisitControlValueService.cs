
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
    public class VisitControlValueService : IVisitControlValueService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public VisitControlValueService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<CompleteVisitControlValue> GetVisitControlValuesAsync(VisitControlValueGetParams visitControlValueGetParams)
        {

            if (visitControlValueGetParams == null)
                throw new ArgumentNullException(nameof(visitControlValueGetParams));

            if (string.IsNullOrWhiteSpace(visitControlValueGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserCreated));

            if (!visitControlValueGetParams.Authorised)
                throw new ArgumentException(nameof(visitControlValueGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitControlValueGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserOrganisationCode));

            if (visitControlValueGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserCdeaId));

            if (visitControlValueGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.CdeaId));

            if (visitControlValueGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.VisitHeaderId));

            if (string.IsNullOrEmpty(visitControlValueGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitControlValueGetParams.OrganisationCode));

            if (visitControlValueGetParams.OrganisationCode != visitControlValueGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitControlValueGetParams.OrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visitcontrolvalue");

            var response = await _dataApiHttpService.PostAsync<VisitControlValueGetParams, CompleteVisitControlValue>(uri, visitControlValueGetParams);
            return response.Success ? response.Data : null;
        }

        

    }
}
