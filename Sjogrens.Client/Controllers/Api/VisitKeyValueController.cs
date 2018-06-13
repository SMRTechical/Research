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
    public class VisitKeyValueController : BaseApiController
    {

       // private readonly IVisitKeyValueService _visitKeyValueService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly IVisitKeyValueRepository _visitKeyValueRepository;

        public VisitKeyValueController(IVisitKeyValueRepository visitKeyValueRepository,IVisitKeyValueService visitKeyValueService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
           // _visitKeyValueService = visitKeyValueService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _visitKeyValueRepository = visitKeyValueRepository;
        }

        [HttpPost]
        [Route("api/visitkeyvalue")]
        public async Task<IHttpActionResult> GetVisitKeyValueAsync(VisitKeyValueGetParams visitKeyValueGetParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });

            if (visitKeyValueGetParams == null)
                return BadRequest();

            visitKeyValueGetParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitKeyValueGetParams.UserCreated))
                return BadRequest();


            visitKeyValueGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitKeyValueGetParams.Authorised)
                return Unauthorized();

            visitKeyValueGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitKeyValueGetParams.UserOrganisationCode))
                return BadRequest();


            visitKeyValueGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitKeyValueGetParams.UserCdeaId <= 0)
                return BadRequest();

            visitKeyValueGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitKeyValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValueGetParams.CdeaId != visitKeyValueGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitKeyValueGetParams.Token))
                return BadRequest();


            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitKeyValueGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);


            visitKeyValueGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitKeyValueGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

       
            if (string.IsNullOrEmpty(visitKeyValueGetParams.OrganisationCode))
                return BadRequest();

            if (visitKeyValueGetParams.OrganisationCode != visitKeyValueGetParams.UserOrganisationCode)
                return Unauthorized();

            if (visitKeyValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValueGetParams.CdeaId != visitKeyValueGetParams.UserCdeaId)
                return Unauthorized();

            // var results = await _visitKeyValueService.GetVisitKeyValueAsync(visitKeyValueGetParams);
            var results = await _visitKeyValueRepository.GetVisitKeyValueAsync(visitKeyValueGetParams);
            if (results == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

          

            var completeVisitKeyValue = new CompleteVisitKeyValueViewModel()
            {
                VisitHeaderId = results.VisitHeaderId,
                VisitId = results.VisitId,
                DateOfVisit = results.DateOfVisit,
                PasId = results.PasId,
                OrganisationCode = results.OrganisationCode,
                Completed = results.Completed,
                CdeaId = results.CdeaId,

                VisitKeyValues = results.VisitKeyValues
            };


            if (completeVisitKeyValue == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, completeVisitKeyValue);
        }

     

        [HttpPost]
        [Route("api/visitkeyvalue/save")]
        public async Task<IHttpActionResult> SaveVisitKeyValueAsync(VisitKeyValuePostParams visitKeyValuePostParams)
        {
            if (visitKeyValuePostParams == null)
                return BadRequest();

            visitKeyValuePostParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.UserCreated))
                return BadRequest();

            visitKeyValuePostParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitKeyValuePostParams.Authorised)
                return Unauthorized();

            visitKeyValuePostParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.UserOrganisationCode))
                return BadRequest();

            visitKeyValuePostParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitKeyValuePostParams.UserCdeaId <= 0)
                return BadRequest();

            visitKeyValuePostParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitKeyValuePostParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.UserCdeaId != visitKeyValuePostParams.CdeaId)
                return Unauthorized();

            if (visitKeyValuePostParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.CategoryId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.Token))
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitKeyValuePostParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitKeyValuePostParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitKeyValuePostParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(visitKeyValuePostParams.OrganisationCode))
                return BadRequest();

            if (visitKeyValuePostParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.OrganisationCode != visitKeyValuePostParams.UserOrganisationCode)
                return Unauthorized();

            if (visitKeyValuePostParams.CdeaId != visitKeyValuePostParams.UserCdeaId)
                return Unauthorized();

            //var result = await _visitKeyValueService.SaveVisitKeyValueAsync(visitKeyValuePostParams);

            var result = await _visitKeyValueRepository.SaveVisitKeyValueAsync(visitKeyValuePostParams);

            if (result)
            {
                return Content(HttpStatusCode.OK, result);
            }

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.BadRequest));
        }

    }
}
