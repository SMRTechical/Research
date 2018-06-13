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
    public class VisitControlValueController : BaseApiController
    {

       // private readonly IVisitControlValueService _visitControlValueService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly IVisitControlValueRepository _visitControlValueRepository;

        public VisitControlValueController(IVisitControlValueRepository visitControlValueRepository,IVisitControlValueService visitControlValueService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
           // _visitControlValueService = visitControlValueService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _visitControlValueRepository = visitControlValueRepository;
        }

        [HttpPost]
        [Route("api/visitcontrolvalue")]
        public async Task<IHttpActionResult> GetVisitControlValueAsync(VisitControlValueGetParams visitControlValueGetParams)
        {
            // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });

            if (visitControlValueGetParams == null)
                return BadRequest();

            visitControlValueGetParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitControlValueGetParams.UserCreated))
                return BadRequest();


            visitControlValueGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitControlValueGetParams.Authorised)
                return Unauthorized();

            visitControlValueGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitControlValueGetParams.UserOrganisationCode))
                return BadRequest();


            visitControlValueGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitControlValueGetParams.UserCdeaId <= 0)
                return BadRequest();

            visitControlValueGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitControlValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitControlValueGetParams.CdeaId != visitControlValueGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitControlValueGetParams.Token))
                return BadRequest();


            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitControlValueGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);


            visitControlValueGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitControlValueGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

       
            if (string.IsNullOrEmpty(visitControlValueGetParams.OrganisationCode))
                return BadRequest();

            if (visitControlValueGetParams.OrganisationCode != visitControlValueGetParams.UserOrganisationCode)
                return Unauthorized();

            if (visitControlValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitControlValueGetParams.CdeaId != visitControlValueGetParams.UserCdeaId)
                return Unauthorized();

            // var results = await _visitControlValueService.GetVisitControlValuesAsync(visitControlValueGetParams);
            var results = await _visitControlValueRepository.GetVisitControlValueAsync(visitControlValueGetParams);
            if (results == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));



            var completeVisitControlValue = new CompleteVisitControlValueViewModel()
            {
                VisitHeaderId = results.VisitHeaderId,
                VisitId = results.VisitId,
                DateOfVisit = results.DateOfVisit,
                PasId = results.PasId,
                OrganisationCode = results.OrganisationCode,
                Completed = results.Completed,
                CdeaId = results.CdeaId,

                VisitControlValues = results.VisitControlValues
            };

            if (completeVisitControlValue == null)
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

            return Content(HttpStatusCode.OK, completeVisitControlValue);
        }
        

    }
}
