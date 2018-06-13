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
    public class PatientStateController : BaseApiController
    {

       // private readonly IPatientStateService _patientStateService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;

        private readonly IPatientStateRepository _patientStateRepository;

        public PatientStateController(IPatientStateRepository patientStateRepository,IPatientStateService patientStateService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
           // _patientStateService = patientStateService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _patientStateRepository = patientStateRepository;
        }


        [HttpPost]
        [Route("api/patientstate")]
        public async Task<IHttpActionResult> GetPatientState(PatientStateGetParams patientStateGetParams)
        {
            try
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientStateGetParams.PasId });

                if (patientStateGetParams == null)
                    return BadRequest();

                patientStateGetParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(patientStateGetParams.UserCreated))
                    return BadRequest();

                patientStateGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!patientStateGetParams.Authorised)
                    return Unauthorized();

                patientStateGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(patientStateGetParams.UserOrganisationCode))
                    return BadRequest();

                patientStateGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (patientStateGetParams.UserCdeaId <= 0)
                    return BadRequest();

                patientStateGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (patientStateGetParams.CdeaId <= 0)
                    return BadRequest();

                if (patientStateGetParams.CdeaId != patientStateGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(patientStateGetParams.Token))
                    return BadRequest();

                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(patientStateGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

                patientStateGetParams.PasId = splitDictionary["PasId"];
                patientStateGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
                patientStateGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);


                if (string.IsNullOrEmpty(patientStateGetParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(patientStateGetParams.OrganisationCode))
                    return BadRequest();

                if (patientStateGetParams.OrganisationCode != patientStateGetParams.UserOrganisationCode)
                    return Unauthorized();

                if (patientStateGetParams.CdeaId <= 0)
                    return BadRequest();

                if (patientStateGetParams.CdeaId != patientStateGetParams.UserCdeaId)
                    return Unauthorized();

                //var result = await _patientStateService.GetPatientStateAsync(patientStateGetParams);

                var result = await _patientStateRepository.GetPatientStateAsync(patientStateGetParams);

                var patientState = new PatientStateViewModel()
                {
                    Pid = result.Pid,
                    PasId = result.PasId,
                    OrganisationCode = result.OrganisationCode,
                    CdeaId = result.CdeaId,
                    InitialVisit = result.InitialVisit,
                    NewVisit = result.NewVisit,
                    Completed = result.Completed,
                    BaselineExists = result.BaselineExists,
                    HasOpenVisit = result.HasOpenVisit,
                    RecentVisit = result.RecentVisit
                };

                _logger.Information("{Controller:l}/{Action:l} returned {Pid} records", new object[] { ControllerName, ActionName, patientState.Pid });

                return Content(HttpStatusCode.OK, patientState);

            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientStateGetParams.PasId
    });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }
    }
}
