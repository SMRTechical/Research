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
  [AllowAnonymous]
    public class ConsentController : BaseApiController
    {

       // private readonly IConsentService _consentService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly IConsentRepository _consentRepository;
       
       

        public ConsentController(IConsentRepository consentRepository, IConsentService consentService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
          //  _consentService = consentService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _consentRepository = consentRepository;
            //when saving you will need username:
            //var userName = _authorizationHelper.GetUserName();
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [Route("api/consent")]
        public async Task<IHttpActionResult> GetConsentAsync(ConsentGetParams consentGetParams)
        {
            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, consentGetParams.PasId });


            

                if (consentGetParams == null)
                    return BadRequest();

                consentGetParams.UserCreated = _authorizationHelper.GetUserName();
                
                if (string.IsNullOrEmpty(consentGetParams.UserCreated))
                    return BadRequest();

                consentGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!consentGetParams.Authorised)
                    return Unauthorized();

                consentGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(consentGetParams.UserOrganisationCode))
                    return BadRequest();

                consentGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (consentGetParams.UserCdeaId <= 0)
                    return BadRequest();

                consentGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (consentGetParams.CdeaId <= 0)
                    return BadRequest();

                if (consentGetParams.CdeaId != consentGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(consentGetParams.Token))
                    return BadRequest();

                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(consentGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);
                

                consentGetParams.PasId = splitDictionary["PasId"];
                consentGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
                consentGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

               

                if (string.IsNullOrEmpty(consentGetParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(consentGetParams.OrganisationCode))
                    return BadRequest();

                if (consentGetParams.OrganisationCode != consentGetParams.UserOrganisationCode)
                    return Unauthorized();



                if (consentGetParams.CdeaId <= 0)
                    return BadRequest();

                if (consentGetParams.CdeaId != consentGetParams.UserCdeaId)
                    return Unauthorized();

               

                ConsentViewModel consentVM = null;

                var result = await _consentRepository.GetConsentAsync(consentGetParams);
                

                if (result != null)
                {
                    
                    consentVM = new ConsentViewModel()
                    {
                        Pid = result.Pid,
                        PasId = result.PasId,
                        OrganisationCode = result.OrganisationCode,
                        ConsentGiven = result.ConsentGiven,
                        ConsentGivenDate = result.ConsentGivenDate,
                        ConsentWithdrawFutureParticipation = result.ConsentWithdrawFutureParticipation,
                        ConsentWithdrawFutureParticipationRemoveData = result.ConsentWithdrawFutureParticipationRemoveData,
                        ConsentWithdrawnDate = result.ConsentWithdrawnDate,
                        CdeaId = result.CdeaId,
                        CreatedUser = result.CreatedUser,
                        CreatedDateTime = result.CreatedDateTime,
                        LastUpdatedUser = result.LastUpdatedUser,
                        LastUpdatedDateTime = result.LastUpdatedDateTime
                    };
                 
                    return Content(HttpStatusCode.OK, consentVM);
                }
                

                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
            catch(Exception ex)
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, consentGetParams.PasId });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }


        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/consent/save")]
        public async Task<IHttpActionResult> SaveConsentAsync(ConsentPostParams consentPostParams)
        {
            try
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, consentPostParams.PasId });

              

                if (consentPostParams == null)
                    return BadRequest();

                consentPostParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(consentPostParams.UserCreated))
                    return BadRequest();

                consentPostParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!consentPostParams.Authorised)
                    return Unauthorized();

                consentPostParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(consentPostParams.UserOrganisationCode))
                    return BadRequest();

                consentPostParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (consentPostParams.UserCdeaId <= 0)
                    return BadRequest();

                consentPostParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (consentPostParams.CdeaId <= 0)
                    return BadRequest();

                if (consentPostParams.UserCdeaId != consentPostParams.CdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(consentPostParams.Token))
                    return BadRequest();


                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(consentPostParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

                consentPostParams.PasId = splitDictionary["PasId"];
                consentPostParams.OrganisationCode =  splitDictionary["OrganisationCode"];
                consentPostParams.CdeaId =  Int32.Parse(splitDictionary["CdeaId"]);


                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, consentPostParams.PasId });

             

                if (string.IsNullOrEmpty(consentPostParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(consentPostParams.OrganisationCode))
                    return BadRequest();

                if (consentPostParams.CdeaId <= 0)
                    return BadRequest();

                if (consentPostParams.OrganisationCode != consentPostParams.UserOrganisationCode)
                    return Unauthorized();

                if (consentPostParams.CdeaId != consentPostParams.UserCdeaId)
                    return Unauthorized();

                //   var result = await _consentService.SaveConsentAsync(consentPostParams);


                var result = await _consentRepository.SaveConsentAsync(consentPostParams);

                if (result)
                {
                    return Content(HttpStatusCode.OK, result);
                }


                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }
            catch(Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, consentPostParams.PasId });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }
    }
}
