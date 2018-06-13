using Serilog;
using Sjogrens.Client.Authorization;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using Sjogrens.Client.Controllers.Api;
using Sjogrens.Client.ViewModels;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Sjorgrens.Client.Controllers.Api
{
    //aplied in webapi.config
    [ApiAuthorize(Roles = "Administrator,Update,Read")]
    public class VisitHeaderController : BaseApiController
    {

      //  private readonly IVisitHeaderService _visitHeaderService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly IVisitHeaderRepository _visitHeaderRepository;

        public VisitHeaderController(IVisitHeaderRepository visitHeaderRepository,IVisitHeaderService visitHeaderService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
           // _visitHeaderService = visitHeaderService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _visitHeaderRepository = visitHeaderRepository;
        }

        [HttpPost]
        [Route("api/visitheaders")]
        public async Task<IHttpActionResult> GetVisitHeadersAsync(VisitHeadersGetParams visitHeadersGetParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });

            if (visitHeadersGetParams == null)
                return BadRequest();

            visitHeadersGetParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitHeadersGetParams.UserCreated))
                return BadRequest();


            visitHeadersGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitHeadersGetParams.Authorised)
                return Unauthorized();

            visitHeadersGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitHeadersGetParams.UserOrganisationCode))
                return BadRequest();


            visitHeadersGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitHeadersGetParams.UserCdeaId <= 0)
                return BadRequest();

            visitHeadersGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitHeadersGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeadersGetParams.CdeaId != visitHeadersGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeadersGetParams.Token))
                return BadRequest();


            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeadersGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitHeadersGetParams.PasId = splitDictionary["PasId"];
            visitHeadersGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitHeadersGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(visitHeadersGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeadersGetParams.OrganisationCode))
                return BadRequest();

            if (visitHeadersGetParams.OrganisationCode != visitHeadersGetParams.UserOrganisationCode)
                return Unauthorized();

            if (visitHeadersGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeadersGetParams.CdeaId != visitHeadersGetParams.UserCdeaId)
                return Unauthorized();

            // var results = await _visitHeaderService.GetVisitHeadersAsync(visitHeadersGetParams);

            var results = await _visitHeaderRepository.GetVisitHeadersAsync(visitHeadersGetParams);

            if (results == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            var visitHeaders = results?.OrderByDescending(p => p.VisitId).Select(p => new VisitHeaderViewModel()
            {

                VisitHeaderId = p.VisitHeaderId,
                VisitId = p.VisitId,
                DateOfVisit = p.DateOfVisit,
                Pid = p.Pid,
                PasId = p.PasId,
                OrganisationCode = p.OrganisationCode,
                InitialVisit = p.InitialVisit,
                NewVisit = p.NewVisit,
                Completed = p.Completed,
                IsDuplicate = p.IsDuplicate,
                IsInvalid = p.IsInvalid,
                CdeaId = p.CdeaId
            }).ToList();

            if (visitHeaders == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, visitHeaders);
        }


        [HttpPost]
        [Route("api/visitheader/duplicate")]
        public async Task<IHttpActionResult> IsVisitHeaderDuplicate(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });



            if (visitHeaderDuplicateParams == null)
                return BadRequest();

            visitHeaderDuplicateParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserCreated))
                return BadRequest();


            visitHeaderDuplicateParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitHeaderDuplicateParams.Authorised)
                return Unauthorized();


            visitHeaderDuplicateParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserOrganisationCode))
                return BadRequest();


            visitHeaderDuplicateParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                return BadRequest();

            visitHeaderDuplicateParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();

            //could be in token
            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.Token))
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderDuplicateParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitHeaderDuplicateParams.PasId = splitDictionary["PasId"];
            visitHeaderDuplicateParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitHeaderDuplicateParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                return Unauthorized();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();


            // var result = await _visitHeaderService.IsVisitHeaderDuplicateAsync(visitHeaderDuplicateParams);

            var result = await _visitHeaderRepository.IsVisitHeaderDuplicateAsync(visitHeaderDuplicateParams);

            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, result);
        }


        [HttpPost]
        [Route("api/visitheader/valid")]
        public async Task<IHttpActionResult> IsVisitHeaderValid(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });



            if (visitHeaderDuplicateParams == null)
                return BadRequest();

            visitHeaderDuplicateParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserCreated))
                return BadRequest();


            visitHeaderDuplicateParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitHeaderDuplicateParams.Authorised)
                return Unauthorized();


            visitHeaderDuplicateParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserOrganisationCode))
                return BadRequest();


            visitHeaderDuplicateParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                return BadRequest();

            visitHeaderDuplicateParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();

            //could be in token
            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.Token))
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderDuplicateParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitHeaderDuplicateParams.PasId = splitDictionary["PasId"];
            visitHeaderDuplicateParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitHeaderDuplicateParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                return Unauthorized();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();


            // var result = await _visitHeaderService.IsVisitHeaderValidAsync(visitHeaderDuplicateParams);

            var result = await _visitHeaderRepository.IsVisitHeaderValidAsync(visitHeaderDuplicateParams);

            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, result);
        }


        [HttpPost]
        [Route("api/visitheader")]
        public async Task<IHttpActionResult> GetVisitHeader(VisitHeaderGetParams visitHeaderGetParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });

            if (visitHeaderGetParams == null)
                return BadRequest();

            visitHeaderGetParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitHeaderGetParams.UserCreated))
                return BadRequest();

            visitHeaderGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitHeaderGetParams.Authorised)
                return Unauthorized();

            visitHeaderGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitHeaderGetParams.UserOrganisationCode))
                return BadRequest();


            visitHeaderGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitHeaderGetParams.UserCdeaId <= 0)
                return BadRequest();

            visitHeaderGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitHeaderGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderGetParams.Token))
                return BadRequest();

            visitHeaderGetParams.AdvancedSearch = _authorizationHelper.IsAdministrator();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitHeaderGetParams.PasId = splitDictionary["PasId"];
            visitHeaderGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitHeaderGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);


            if (visitHeaderGetParams.DateOfVisit == null && visitHeaderGetParams.VisitId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.DateOfVisit == null || visitHeaderGetParams.DateOfVisit == DateTime.MinValue)
                visitHeaderGetParams.VisitId = Int32.Parse(splitDictionary["VisitId"]);

            if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
                return Unauthorized();

            if (visitHeaderGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
                return Unauthorized();

            // var result = await _visitHeaderService.GetVisitHeaderAsync(visitHeaderGetParams);

            var result = await _visitHeaderRepository.GetVisitHeaderAsync(visitHeaderGetParams);

            var visitHeader = new VisitHeaderViewModel()
            {

                VisitHeaderId = result.VisitHeaderId,
                VisitId = result.VisitId,
                DateOfVisit = result.DateOfVisit,
                Pid = result.Pid,
                PasId = result.PasId,
                OrganisationCode = result.OrganisationCode,
                InitialVisit = result.InitialVisit,
                NewVisit = result.NewVisit,
                Completed = result.Completed,
                IsDuplicate = result.IsDuplicate,
                IsInvalid = result.IsInvalid,
                CdeaId = result.CdeaId,
                CreatedUser = result.CreatedUser,
                CreatedDateTime = result.CreatedDateTime,
                LastUpdatedUser = result.LastUpdatedUser,
                LastUpdatedDateTime = result.LastUpdatedDateTime,

            };


            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, visitHeader);
        }


        [HttpPost]
        [Route("api/visitheader/save")]
        public async Task<IHttpActionResult> SaveVisitHeaderAsync(VisitHeaderPostParams visitHeaderPostParams)
        {
            if (visitHeaderPostParams == null)
                return BadRequest();

            visitHeaderPostParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitHeaderPostParams.UserCreated))
                return BadRequest();

            visitHeaderPostParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitHeaderPostParams.Authorised)
                return Unauthorized();

            visitHeaderPostParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitHeaderPostParams.UserOrganisationCode))
                return BadRequest();


            visitHeaderPostParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitHeaderPostParams.UserCdeaId <= 0)
                return BadRequest();

            visitHeaderPostParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitHeaderPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderPostParams.UserCdeaId != visitHeaderPostParams.CdeaId)
                return Unauthorized();

            if (visitHeaderPostParams.DateOfVisit == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderPostParams.Token))
                return BadRequest();

            if (visitHeaderPostParams.DateOfVisit == null)
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderPostParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitHeaderPostParams.PasId = splitDictionary["PasId"];
            visitHeaderPostParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitHeaderPostParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);
            visitHeaderPostParams.VisitId = Int32.Parse(splitDictionary["VisitId"]);

            if (string.IsNullOrEmpty(visitHeaderPostParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderPostParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderPostParams.OrganisationCode != visitHeaderPostParams.UserOrganisationCode)
                return Unauthorized();

            if (visitHeaderPostParams.CdeaId != visitHeaderPostParams.UserCdeaId)
                return Unauthorized();

            if (visitHeaderPostParams.VisitId <= 0)
                return BadRequest();

            //  var result = await _visitHeaderService.SaveVisitHeaderAsync(visitHeaderPostParams);

            var result = await _visitHeaderRepository.SaveVisitHeaderAsync(visitHeaderPostParams);

            if (result)
            {
                return Content(HttpStatusCode.OK, result);
            }

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.BadRequest));
        }

    }
}
