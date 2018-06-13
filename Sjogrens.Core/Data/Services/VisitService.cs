
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
    public class VisitService : IVisitService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public VisitService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<CompleteVisit> GetVisitAsync(VisitGetParams visitGetParams)
        {

            if (visitGetParams == null)
                throw new ArgumentNullException(nameof(visitGetParams));

            if (string.IsNullOrWhiteSpace(visitGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserCreated));

            if (!visitGetParams.Authorised)
                throw new ArgumentException(nameof(visitGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserOrganisationCode));

            if (visitGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserCdeaId));

            if (visitGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.CdeaId));

            if (visitGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.VisitHeaderId));
            

            if (string.IsNullOrEmpty(visitGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitGetParams.OrganisationCode));

            if (visitGetParams.OrganisationCode != visitGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitGetParams.OrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"visit");

            var response = await _dataApiHttpService.PostAsync<VisitGetParams, CompleteVisit>(uri, visitGetParams);
            return response.Success ? response.Data : null;
        }

        //public async Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        //{

        //    if (visitHeaderDuplicateParams == null)
        //        throw new ArgumentNullException(nameof(visitHeaderDuplicateParams));

        //    if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserCreated))
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCreated));

        //    if (!visitHeaderDuplicateParams.Authorised)
        //        throw new ArgumentException(nameof(visitHeaderDuplicateParams.Authorised));

        //    if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserOrganisationCode))
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode));

        //    if (visitHeaderDuplicateParams.UserCdeaId <= 0)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCdeaId));

        //    if (visitHeaderDuplicateParams.CdeaId <= 0)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId));

        //    if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId), "Access Denied");

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
        //        throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.PasId));

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
        //        throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode));

        //    if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode), "Access Denied");

        //    var uri = new HttpClientUriBuilder($"visitheader/duplicate");

        //    var response = await _dataApiHttpService.PostAsync<VisitHeaderDuplicateParams, bool>(uri, visitHeaderDuplicateParams);
        //    return response.Success ? response.Data : false;
        //}

        public async Task<bool> SaveVisitAsync(VisitPostParams visitPostParams)
        {

            if (visitPostParams == null)
                throw new ArgumentNullException(nameof(visitPostParams));

            if (string.IsNullOrWhiteSpace(visitPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitPostParams.UserCreated));

            if (!visitPostParams.Authorised)
                throw new ArgumentException(nameof(visitPostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitPostParams.UserOrganisationCode));

            if (visitPostParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.UserCdeaId));

            if (visitPostParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.CdeaId));

            if (visitPostParams.UserCdeaId != visitPostParams.CdeaId)
                throw new ArgumentNullException(nameof(visitPostParams.CdeaId), "Access Denied");

            if (visitPostParams.VisitHeaderId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.VisitHeaderId));

            if (visitPostParams.CategoryId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.CategoryId));

            if (string.IsNullOrEmpty(visitPostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitPostParams.OrganisationCode));

            if (visitPostParams.OrganisationCode != visitPostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitPostParams.OrganisationCode), "Access Denied");

            if (visitPostParams.Visit == null && visitPostParams.Detail == null)
                throw new ArgumentNullException(nameof(visitPostParams.Visit));

            visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

            if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count == 0)
                throw new ArgumentNullException(nameof(visitPostParams.Visit), "Visit has no values");

            var uri = new HttpClientUriBuilder($"visit/save");

            var response = await _dataApiHttpService.PostAsync<VisitPostParams, bool>(uri, visitPostParams);
            return response.Success ? response.Data : false;
        }

        //public async Task<VisitHeader> GetVisitHeaderAsync(VisitHeaderGetParams visitHeaderGetParams)
        //{

        //    if (visitHeaderGetParams == null)
        //        throw new ArgumentNullException(nameof(visitHeaderGetParams));

        //    if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserCreated))
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCreated));

        //    if (!visitHeaderGetParams.Authorised)
        //        throw new ArgumentException(nameof(visitHeaderGetParams.Authorised));

        //    if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserOrganisationCode))
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserOrganisationCode));

        //    if (visitHeaderGetParams.UserCdeaId <= 0)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCdeaId));

        //    if (visitHeaderGetParams.CdeaId <= 0)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.CdeaId));

        //    if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.CdeaId), "Access Denied");

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
        //        throw new ArgumentNullException(nameof(visitHeaderGetParams.PasId));

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
        //        throw new ArgumentNullException(nameof(visitHeaderGetParams.OrganisationCode));

        //    if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
        //        throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserOrganisationCode), "Access Denied");


        //    if (visitHeaderGetParams.DateOfVisit == null && visitHeaderGetParams.VisitId <= 0)
        //        throw new ArgumentOutOfRangeException("DateofVisit or VisitId required", "Bad Request");

        //    var uri = new HttpClientUriBuilder($"visitheader");

        //    var response = await _dataApiHttpService.PostAsync<VisitHeaderGetParams, VisitHeader>(uri, visitHeaderGetParams);
        //    return response.Success ? response.Data : null;
        //}

    }
}
