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
    public class VisitController : BaseApiController
    {

       // private readonly IVisitService _visitService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly IVisitRepository _visitRepository;

        public VisitController(IVisitRepository visitRepository,IVisitService visitService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
           // _visitService = visitService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _visitRepository = visitRepository;
        }

        [HttpPost]
        [Route("api/visit")]
        public async Task<IHttpActionResult> GetVisitAsync(VisitGetParams visitGetParams)
        {
             _logger.Information("{Controller:l}/{Action:l} with params: {VisitHeaderId} invoked", new object[] { ControllerName, ActionName, visitGetParams.VisitHeaderId });

            try
            {

                if (visitGetParams == null)
                    return BadRequest();

                visitGetParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(visitGetParams.UserCreated))
                    return BadRequest();


                visitGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!visitGetParams.Authorised)
                    return Unauthorized();

                visitGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(visitGetParams.UserOrganisationCode))
                    return BadRequest();


                visitGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (visitGetParams.UserCdeaId <= 0)
                    return BadRequest();

                visitGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (visitGetParams.CdeaId <= 0)
                    return BadRequest();

                if (visitGetParams.CdeaId != visitGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(visitGetParams.Token))
                    return BadRequest();


                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);


                visitGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
                visitGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);



                if (string.IsNullOrEmpty(visitGetParams.OrganisationCode))
                    return BadRequest();

                if (visitGetParams.OrganisationCode != visitGetParams.UserOrganisationCode)
                    return Unauthorized();

                if (visitGetParams.CdeaId <= 0)
                    return BadRequest();

                if (visitGetParams.CdeaId != visitGetParams.UserCdeaId)
                    return Unauthorized();

                // var results = await _visitService.GetVisitAsync(visitGetParams);
                var results = await _visitRepository.GetVisitAsync(visitGetParams);
                if (results == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                //var visitValues = results.Visits?.OrderBy(p => p.CategoryId).ThenBy(p => p.ControlId).Select(p => new Visit()
                //{

                //    VisitHeaderId = p.VisitHeaderId,
                //    CategoryId = p.CategoryId,
                //    ControlId = p.ControlId,
                //    ControlValueId = p.ControlValueId,
                //    CreatedUser = p.CreatedUser,
                //    CreatedDateTime = p.CreatedDateTime,
                //    LastUpdatedUser = p.LastUpdatedUser,
                //    LastUpdatedDateTime = p.LastUpdatedDateTime,

                //}).ToList();

                //var detailValues = results.Details?.OrderBy(p => p.CategoryId).ThenBy(p => p.ControlId).Select(p => new Detail()
                //{

                //    VisitHeaderId = p.VisitHeaderId,
                //    CategoryId = p.CategoryId,
                //    ControlId = p.ControlId,
                //    Value = p.Value,
                //    CreatedUser = p.CreatedUser,
                //    CreatedDateTime = p.CreatedDateTime,
                //    LastUpdatedUser = p.LastUpdatedUser,
                //    LastUpdatedDateTime = p.LastUpdatedDateTime,

                //}).ToList();


                var completeVisit = new CompleteVisitViewModel()
                {
                    VisitHeaderId = results.VisitHeaderId,
                    VisitId = results.VisitId,
                    DateOfVisit = results.DateOfVisit,

                    //  Pid = results.Pid,
                    // PasId = result.PasId,
                    // OrganisationCode = result.OrganisationCode,
                    // InitialVisit = results.InitialVisit,
                    // NewVisit = results.NewVisit,

                    PasId = results.PasId,
                    OrganisationCode = results.OrganisationCode,
                    Completed = results.Completed,
                    CdeaId = results.CdeaId,

                    Visits = results.Visits,
                    Details = results.Details
                    // Visits = visitValues,
                    //Details = detailValues

                };


                if (completeVisit == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                _logger.Information("{Controller:l}/{Action:l} returned {VisitHeaderId} records", new object[] { ControllerName, ActionName, completeVisit.VisitHeaderId });

                return Content(HttpStatusCode.OK, completeVisit);

            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {VisitHeaderId} invoked", new object[] { ControllerName, ActionName, visitGetParams.VisitHeaderId
    });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }


        //[HttpPost]
        //[Route("api/visitheader/duplicate")]
        //public async Task<IHttpActionResult> IsVisitHeaderDuplicate(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        //{
        //    // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });



        //    if (visitHeaderDuplicateParams == null)
        //        return BadRequest();

        //    visitHeaderDuplicateParams.UserCreated = _authorizationHelper.GetUserName();

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserCreated))
        //        return BadRequest();


        //    visitHeaderDuplicateParams.Authorised = _authorizationHelper.GetUserAuthorized();

        //    if (!visitHeaderDuplicateParams.Authorised)
        //        return Unauthorized();


        //    visitHeaderDuplicateParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserOrganisationCode))
        //        return BadRequest();


        //    visitHeaderDuplicateParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

        //    if (visitHeaderDuplicateParams.UserCdeaId <= 0)
        //        return BadRequest();

        //    visitHeaderDuplicateParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

        //    if (visitHeaderDuplicateParams.CdeaId <= 0)
        //        return BadRequest();

        //    if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
        //        return Unauthorized();

        //    //could be in token
        //    if ((visitHeaderDuplicateParams.DateOfVisit == null))
        //        return BadRequest();

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.Token))
        //        return BadRequest();

        //    string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderDuplicateParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
        //    Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

        //    visitHeaderDuplicateParams.PasId = splitDictionary["PasId"];
        //    visitHeaderDuplicateParams.OrganisationCode = splitDictionary["OrganisationCode"];
        //    visitHeaderDuplicateParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
        //        return BadRequest();

        //    if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
        //        return BadRequest();

        //    if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
        //        return Unauthorized();

        //    if (visitHeaderDuplicateParams.CdeaId <= 0)
        //        return BadRequest();

        //    if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
        //        return Unauthorized();


        //    var result = await _visitHeaderService.IsVisitHeaderDuplicateAsync(visitHeaderDuplicateParams);

        //    // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

        //    return Content(HttpStatusCode.OK, result);
        //}


        //[HttpPost]
        //[Route("api/visitheader")]
        //public async Task<IHttpActionResult> GetVisitHeader(VisitHeaderGetParams visitHeaderGetParams)
        //{
        //    // _logger.Information("{Controller:l}/{Action:l} with params: {FinancialYearId} invoked", new object[] { ControllerName, ActionName, financialYearId });

        //    if (visitHeaderGetParams == null)
        //        return BadRequest();

        //    visitHeaderGetParams.UserCreated = _authorizationHelper.GetUserName();

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.UserCreated))
        //        return BadRequest();

        //    visitHeaderGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

        //    if (!visitHeaderGetParams.Authorised)
        //        return Unauthorized();

        //    visitHeaderGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.UserOrganisationCode))
        //        return BadRequest();


        //    visitHeaderGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

        //    if (visitHeaderGetParams.UserCdeaId <= 0)
        //        return BadRequest();

        //    visitHeaderGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

        //    if (visitHeaderGetParams.CdeaId <= 0)
        //        return BadRequest();

        //    if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
        //        return Unauthorized();

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.Token))
        //        return BadRequest();

        //    visitHeaderGetParams.AdvancedSearch = _authorizationHelper.IsAdministrator();

        //    string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitHeaderGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
        //    Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

        //    visitHeaderGetParams.PasId = splitDictionary["PasId"];
        //    visitHeaderGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
        //    visitHeaderGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);


        //    if (visitHeaderGetParams.DateOfVisit == null && visitHeaderGetParams.VisitId <= 0)
        //        return BadRequest();

        //    if (visitHeaderGetParams.DateOfVisit == null || visitHeaderGetParams.DateOfVisit == DateTime.MinValue)
        //        visitHeaderGetParams.VisitId = Int32.Parse(splitDictionary["VisitId"]);

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
        //        return BadRequest();

        //    if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
        //        return BadRequest();

        //    if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
        //        return Unauthorized();

        //    if (visitHeaderGetParams.CdeaId <= 0)
        //        return BadRequest();

        //    if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
        //        return Unauthorized();

        //    var result = await _visitHeaderService.GetVisitHeaderAsync(visitHeaderGetParams);


        //    var visitHeader = new VisitHeaderViewModel()
        //    {

        //        VisitHeaderId = result.VisitHeaderId,
        //        VisitId = result.VisitId,
        //        DateOfVisit = result.DateOfVisit,
        //        Pid = result.Pid,
        //        PasId = result.PasId,
        //        OrganisationCode = result.OrganisationCode,
        //        InitialVisit = result.InitialVisit,
        //        NewVisit = result.NewVisit,
        //        Completed = result.Completed,
        //        IsDuplicate = result.IsDuplicate,
        //        CdeaId = result.CdeaId

        //    };


        //    // _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, populations.Count });

        //    return Content(HttpStatusCode.OK, visitHeader);
        //}


        [HttpPost]
        [Route("api/visit/save")]
        public async Task<IHttpActionResult> SaveVisitAsync(VisitPostParams visitPostParams)
        {
            if (visitPostParams == null)
                return BadRequest();

            visitPostParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(visitPostParams.UserCreated))
                return BadRequest();

            visitPostParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!visitPostParams.Authorised)
                return Unauthorized();

            visitPostParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(visitPostParams.UserOrganisationCode))
                return BadRequest();

            visitPostParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (visitPostParams.UserCdeaId <= 0)
                return BadRequest();

            visitPostParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (visitPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitPostParams.UserCdeaId != visitPostParams.CdeaId)
                return Unauthorized();

            if (visitPostParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitPostParams.CategoryId <= 0)
                return BadRequest();

            if (visitPostParams.Visit == null &&  visitPostParams.Detail == null)
                return BadRequest();

            visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

            if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count == 0)
                return BadRequest();

            if (string.IsNullOrEmpty(visitPostParams.Token))
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(visitPostParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            visitPostParams.OrganisationCode = splitDictionary["OrganisationCode"];
            visitPostParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(visitPostParams.OrganisationCode))
                return BadRequest();

            if (visitPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitPostParams.OrganisationCode != visitPostParams.UserOrganisationCode)
                return Unauthorized();

            if (visitPostParams.CdeaId != visitPostParams.UserCdeaId)
                return Unauthorized();




            //  var result = await _visitService.SaveVisitAsync(visitPostParams);
            var result = await _visitRepository.SaveVisitAsync(visitPostParams);
            if (result)
            {
                return Content(HttpStatusCode.OK, result);
            }

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.BadRequest));
        }

    }
}
