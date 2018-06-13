
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
    public class VisitKeyValueService : IVisitKeyValueService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public VisitKeyValueService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<CompleteVisitKeyValue> GetVisitKeyValueAsync(VisitKeyValueGetParams visitKeyValueGetParams)
        {

            if (visitKeyValueGetParams == null)
                throw new ArgumentNullException(nameof(visitKeyValueGetParams));

            if (string.IsNullOrWhiteSpace(visitKeyValueGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserCreated));

            if (!visitKeyValueGetParams.Authorised)
                throw new ArgumentException(nameof(visitKeyValueGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitKeyValueGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserOrganisationCode));

            if (visitKeyValueGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserCdeaId));

            if (visitKeyValueGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.CdeaId));

            if (visitKeyValueGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.VisitHeaderId));
           
            if (string.IsNullOrEmpty(visitKeyValueGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitKeyValueGetParams.OrganisationCode));

            if (visitKeyValueGetParams.OrganisationCode != visitKeyValueGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitKeyValueGetParams.OrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visitkeyvalue");

            var response = await _dataApiHttpService.PostAsync<VisitKeyValueGetParams, CompleteVisitKeyValue>(uri, visitKeyValueGetParams);
            return response.Success ? response.Data : null;
        }

        
        public async Task<bool> SaveVisitKeyValueAsync(VisitKeyValuePostParams visitKeyValuePostParams)
        {

            if (visitKeyValuePostParams == null)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams));

            if (string.IsNullOrWhiteSpace(visitKeyValuePostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValuePostParams.UserCreated));

            if (!visitKeyValuePostParams.Authorised)
                throw new ArgumentException(nameof(visitKeyValuePostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitKeyValuePostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValuePostParams.UserOrganisationCode));

            if (visitKeyValuePostParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.UserCdeaId));

            if (visitKeyValuePostParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CdeaId));

            if (visitKeyValuePostParams.UserCdeaId != visitKeyValuePostParams.CdeaId)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CdeaId), "Access Denied");

            if (visitKeyValuePostParams.VisitHeaderId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.VisitHeaderId));

            if (visitKeyValuePostParams.CategoryId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CategoryId));

            if (string.IsNullOrEmpty(visitKeyValuePostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.OrganisationCode));

            if (visitKeyValuePostParams.OrganisationCode != visitKeyValuePostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.OrganisationCode), "Access Denied");

            //if (visitKeyValuePostParams.Visit == null && visitKeyValuePostParams.Detail == null)
            //    throw new ArgumentNullException(nameof(visitPostParams.Visit));

            //visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

            //if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count == 0)
            //    throw new ArgumentNullException(nameof(visitPostParams.Visit), "Visit has no values");

            var uri = new HttpClientUriBuilder($"visitkeyvalue/save");

            var response = await _dataApiHttpService.PostAsync<VisitKeyValuePostParams, bool>(uri, visitKeyValuePostParams);
            return response.Success ? response.Data : false;
        }

        

    }
}
