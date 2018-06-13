
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
    public class VisitHeaderService : IVisitHeaderService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public VisitHeaderService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<IEnumerable<VisitHeader>> GetVisitHeadersAsync(VisitHeadersGetParams visitHeadersGetParams)
        {

            if (visitHeadersGetParams == null)
                throw new ArgumentNullException(nameof(visitHeadersGetParams));

            if (string.IsNullOrWhiteSpace(visitHeadersGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserCreated));

            if (!visitHeadersGetParams.Authorised)
                throw new ArgumentException(nameof(visitHeadersGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeadersGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserOrganisationCode));

            if (visitHeadersGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserCdeaId));

            if (visitHeadersGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.CdeaId));

            if (visitHeadersGetParams.CdeaId != visitHeadersGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(visitHeadersGetParams.PasId))
                throw new ArgumentNullException(nameof(visitHeadersGetParams.PasId));

            if (string.IsNullOrEmpty(visitHeadersGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeadersGetParams.OrganisationCode));

            if (visitHeadersGetParams.OrganisationCode != visitHeadersGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserOrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visitheaders");

            var response = await _dataApiHttpService.PostAsync<VisitHeadersGetParams, IEnumerable<VisitHeader>>(uri, visitHeadersGetParams);
            return response.Success ? response.Data : Enumerable.Empty<VisitHeader>();
        }

        public async Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {

            if (visitHeaderDuplicateParams == null)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCreated));

            if (!visitHeaderDuplicateParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderDuplicateParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode));

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCdeaId));

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId));

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode));

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visitheader/duplicate");

            var response = await _dataApiHttpService.PostAsync<VisitHeaderDuplicateParams, bool>(uri, visitHeaderDuplicateParams);
            return response.Success ? response.Data : false;
        }


        public async Task<bool> IsVisitHeaderValidAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {

            if (visitHeaderDuplicateParams == null)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCreated));

            if (!visitHeaderDuplicateParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderDuplicateParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode));

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCdeaId));

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId));

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode));

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visitheader/valid");

            var response = await _dataApiHttpService.PostAsync<VisitHeaderDuplicateParams, bool>(uri, visitHeaderDuplicateParams);
            return response.Success ? response.Data : false;
        }

        public async Task<bool> SaveVisitHeaderAsync(VisitHeaderPostParams visitHeaderPostParams)
        { 

            if (visitHeaderPostParams == null)
                throw new ArgumentNullException(nameof(visitHeaderPostParams));

            if (string.IsNullOrWhiteSpace(visitHeaderPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserCreated));

            if (!visitHeaderPostParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderPostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserOrganisationCode));

            if (visitHeaderPostParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserCdeaId));

            if (visitHeaderPostParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.CdeaId));

            if (visitHeaderPostParams.CdeaId != visitHeaderPostParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(visitHeaderPostParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderPostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.OrganisationCode));

            if (visitHeaderPostParams.OrganisationCode != visitHeaderPostParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserOrganisationCode), "Access Denied");

            if (visitHeaderPostParams.DateOfVisit == null)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.DateOfVisit));

            if (visitHeaderPostParams.VisitId <= 0)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.VisitId));


            var uri = new HttpClientUriBuilder($"visitheader/save");

            var response = await _dataApiHttpService.PostAsync<VisitHeaderPostParams, bool>(uri, visitHeaderPostParams);
            return response.Success ? response.Data : false;
        }

        public async Task<VisitHeader> GetVisitHeaderAsync(VisitHeaderGetParams visitHeaderGetParams)
        {

            if (visitHeaderGetParams == null)
                throw new ArgumentNullException(nameof(visitHeaderGetParams));

            if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCreated));

            if (!visitHeaderGetParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserOrganisationCode));

            if (visitHeaderGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCdeaId));

            if (visitHeaderGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.CdeaId));

            if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderGetParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderGetParams.OrganisationCode));

            if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserOrganisationCode), "Access Denied");


            if (visitHeaderGetParams.DateOfVisit == null && visitHeaderGetParams.VisitId <= 0)
                throw new ArgumentOutOfRangeException("DateofVisit or VisitId required", "Bad Request");

            var uri = new HttpClientUriBuilder($"visitheader");

            var response = await _dataApiHttpService.PostAsync<VisitHeaderGetParams, VisitHeader>(uri, visitHeaderGetParams);
            return response.Success ? response.Data : null;
        }

    }
}
