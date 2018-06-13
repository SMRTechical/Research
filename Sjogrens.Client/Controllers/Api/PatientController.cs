using Serilog;
using Sjogrens.Client.Authorization;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using Sjogrens.Client.Controllers.Api;
using Sjogrens.Client.ViewModels;
using Sjogrens.Core.Data.Interfaces.Models;
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
    public class PatientController : BaseApiController
    {

        //private readonly IPatientService _patientService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;


        private readonly IPatientRepository _patientRepository;
       


        public PatientController(IPatientService patientService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger, IPatientRepository patientRepository) : base(logger)
        {
          //_patientService = patientService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _patientRepository = patientRepository;
            //when saving you will need username:
            //var userName = _authorizationHelper.GetUserName();
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/patient/search")]
        public async Task<IHttpActionResult> SearchPatientAsync(PatientSearchParams patientSearchParams)
        {

            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {patientSearchParams} invoked", new object[] { ControllerName, ActionName, "patientSearchParams" });


                if (patientSearchParams == null)
                return BadRequest();

            patientSearchParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!patientSearchParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientSearchParams.PasId))
                return BadRequest();

            patientSearchParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                return BadRequest();

            patientSearchParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (patientSearchParams.UserCdeaId <= 0)
                return BadRequest();

            patientSearchParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (patientSearchParams.CdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                return NotFound();


                //  var result = await _patientService.SearchPatientAsync(patientSearchParams);



                var result = await _patientRepository.SearchPatientAsync(patientSearchParams);
             

                if (result != null)
            {

                //PatientSearchResultsViewModel patientVM = null;

                PatientSearchResultsViewModel patientVM = new PatientSearchResultsViewModel()
                {
                    Pid = result.Pid,
                    PasId = result.PasId,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    // DateOfBirth = (!string.IsNullOrEmpty(result.Dob.ToString())) ? Convert.ToDateTime(result.Dob) : (DateTime?)null,
                    DateOfBirth = result.DateOfBirth,
                    NHSNumber = result.NhsNumber,
                    Ethnicity = result.EthnicGroup,
                    Gender = !string.IsNullOrEmpty(result.Gender) ? (result.Gender == "M") ? "Male" : "Female" : "N/A",
                    PostCode = result.PostCode,
                    OrganisationCode = result.OrganisationCode,
                     exists = patientSearchParams.UserOrganisationCode == result.OrganisationCode,
                     CdeaId = result.CdeaId
                };

                return Content(HttpStatusCode.OK, patientVM);
            }

            if (result == null)
            {
                    //   result = await _patientService.CheckMITPatientAsync(patientSearchParams);


                    result = await _patientRepository.CheckMITPatientAsync(patientSearchParams);
                   

                    if (result != null)
                {
                    MITPatientSearchResultsViewModel mitPatientVM = new MITPatientSearchResultsViewModel()
                    {
                        //  Pid = result.Pid,
                        PasId = result.PasId,
                        FirstName = result.FirstName,
                        LastName = result.LastName,
                        // DateOfBirth = (!string.IsNullOrEmpty(result.Dob.ToString())) ? Convert.ToDateTime(result.Dob) : (DateTime?)null,
                        DateOfBirth = result.DateOfBirth,
                        NHSNumber = result.NhsNumber,
                        //   Ethnicity = result.EthnicGroup,
                        //Gender = !string.IsNullOrEmpty(result.Gender) ? (result.Gender == "M") ? "Male" : "Female" : "N/A",
                        Gender = !string.IsNullOrEmpty(result.Gender) ? result.Gender : "N/A",
                        PostCode = result.PostCode,
                        // OrganisationCode = result.OrganisationCode,
                        //exists = false
                    };
                        _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, mitPatientVM.PasId });


                        return Content(HttpStatusCode.OK, mitPatientVM);
                }
            }

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {patientSearchParams} invoked", new object[] { ControllerName, ActionName, "patientSearchParams" });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }

        }

        

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/mitpatient/save")]
        public async Task<IHttpActionResult> SaveMitPatientAsync(PatientAddParams patientAddParams)
        {

            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientAddParams.PasId });
                
                if (patientAddParams == null)
                {
                    return BadRequest();
                }

                patientAddParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!patientAddParams.Authorised)
                {
                   
                    return Unauthorized();
                }
                
                if (string.IsNullOrEmpty(patientAddParams.PasId))
                    return BadRequest();
                else
                    patientAddParams.PasId = patientAddParams.PasId.Trim();

                
                patientAddParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();
                
                if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                    return BadRequest();
                
                patientAddParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();
                
                if (patientAddParams.UserCdeaId <= 0)
                    return BadRequest();
                
                patientAddParams.CdeaId = _configurationHelper.GetCurrentCdeaId();
                

                if (patientAddParams.CdeaId <= 0)
                    return BadRequest();
                
                if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                    return Unauthorized();
                
                patientAddParams.UserCreated = _authorizationHelper.GetUserName();

                
                if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                    return BadRequest();

              //  var patientOrg = await _patientService.SaveMITPatientAsync(patientAddParams);
                /****/




                IPatient patient = await _patientRepository.GetMITPatientAsync(patientAddParams.PasId);

             
                if (patient == null)
                    return NotFound();

                var patientOrg = await _patientRepository.InsertPatientAsync(patientAddParams, patient);




                /****/
                
                if (patientOrg != null)
                {
                    PatientOrgViewModel newPatient = new PatientOrgViewModel()
                    {
                        Pid = patientOrg.Pid,
                        PasId = patientOrg.PasId,
                        OrganisationCode = patientOrg.OrganisationCode,
                        CdeaId = patientOrg.CdeaId
                    };

                    return Content(HttpStatusCode.OK, newPatient);
                }
                else
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientAddParams.PasId });
                
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }


        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/patients/search")]
        public async Task<IHttpActionResult> SearchPatientsAsync(PatientsSearchParams patientsSearchParams)
        {
    
            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {patientsSearchParams} invoked", new object[] { ControllerName, ActionName, "patientsSearchParams" });

                if (patientsSearchParams == null)
                    return BadRequest();

                patientsSearchParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!patientsSearchParams.Authorised)
                    return Unauthorized();

                patientsSearchParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(patientsSearchParams.UserOrganisationCode))
                    return BadRequest();

                patientsSearchParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (patientsSearchParams.UserCdeaId <= 0)
                    return BadRequest();

                patientsSearchParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (patientsSearchParams.CdeaId <= 0)
                    return BadRequest();

                if (patientsSearchParams.CdeaId != patientsSearchParams.UserCdeaId)
                    return Unauthorized();

                //var results = await _patientService.SearchPatientsAsync(patientsSearchParams);
                var results = await _patientRepository.SearchPatientsAsync(patientsSearchParams);
                if (results == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                if (string.IsNullOrEmpty(patientsSearchParams.PasId) &&
                    string.IsNullOrEmpty(patientsSearchParams.NhsNumber) &&
                    string.IsNullOrEmpty(patientsSearchParams.FirstName) &&
                    string.IsNullOrEmpty(patientsSearchParams.LastName) &&
                    string.IsNullOrEmpty(patientsSearchParams.DateOfBirth) &&
                    string.IsNullOrEmpty(patientsSearchParams.PostCode)
                    )
                    return BadRequest();

                var patients = results?.OrderBy(p => p.FirstName).Select(p => new PatientSearchResultsViewModel()
                {
                    Pid = p.Pid,
                    PasId = p.PasId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    //  DateOfBirth = (!string.IsNullOrEmpty(p.Dob.ToString())) ? Convert.ToDateTime(p.Dob) : (DateTime?)null,
                    DateOfBirth = p.DateOfBirth,
                    NHSNumber = p.NhsNumber,
                    Ethnicity = p.EthnicGroup,
                    Gender = !string.IsNullOrEmpty(p.Gender) ? (p.Gender == "M") ? "Male" : "Female" : "N/A",
                    PostCode = p.PostCode,
                    OrganisationCode = p.OrganisationCode,
                    CdeaId = p.CdeaId
                }).ToList();

                if (patients == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                 _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, patients.Count });

                return Content(HttpStatusCode.OK, patients);

            
               }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {patientSearchParams} invoked", new object[] { ControllerName, ActionName, "patientSearchParams" });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/patient/details")]
        public async Task<IHttpActionResult> GetPatientDetailsAsync(PatientDetailsGetParams patientDetailsGetParams)
        {
            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientDetailsGetParams.PasId });

                if (patientDetailsGetParams == null)
                    return BadRequest();

                patientDetailsGetParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(patientDetailsGetParams.UserCreated))
                    return BadRequest();


                patientDetailsGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!patientDetailsGetParams.Authorised)
                    return Unauthorized();


                patientDetailsGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(patientDetailsGetParams.UserOrganisationCode))
                    return BadRequest();

                patientDetailsGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (patientDetailsGetParams.UserCdeaId <= 0)
                    return BadRequest();

                patientDetailsGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (patientDetailsGetParams.CdeaId <= 0)
                    return BadRequest();

                if (patientDetailsGetParams.CdeaId != patientDetailsGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(patientDetailsGetParams.Token))
                    return BadRequest();

                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(patientDetailsGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

                patientDetailsGetParams.PasId = splitDictionary["PasId"];
                patientDetailsGetParams.OrganisationCode = splitDictionary["OrganisationCode"].ToString();
                patientDetailsGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

                if (string.IsNullOrEmpty(patientDetailsGetParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(patientDetailsGetParams.OrganisationCode))
                    return BadRequest();

                if (patientDetailsGetParams.CdeaId <= 0)
                    return BadRequest();

                if (patientDetailsGetParams.OrganisationCode != patientDetailsGetParams.UserOrganisationCode)
                    return Unauthorized();

                if (patientDetailsGetParams.CdeaId != patientDetailsGetParams.UserCdeaId)
                    return Unauthorized();

                PatientDetailsViewModel patientDetailsVM = null;

              //  var result = await _patientService.GetPatientDetailsAsync(patientDetailsGetParams);

                var result = await _patientRepository.GetPatientDetailsAsync(patientDetailsGetParams);

                if (result != null)
                {
                    patientDetailsVM = new PatientDetailsViewModel()
                    {
                        Pid = result.Pid,
                        PasId = result.PasId,
                        FirstName = result.FirstName,
                        LastName = result.LastName,
                        DateOfBirth = result.DateOfBirth,
                        NhsNumber = result.NhsNumber,
                        EthnicGroup = result.EthnicGroup,
                        Gender = result.Gender,
                        Address1 = result.Address1,
                        Address2 = result.Address2,
                        Address3 = result.Address3,
                        Address4 = result.Address4,
                        PostCode = result.PostCode,
                        Telephone = result.Telephone,
                        MobileNumber = result.MobileNumber,
                        OrganisationCode = result.OrganisationCode,
                        CdeaId = result.CdeaId,
                        UserCreatedDate = result.UserCreatedDate,
                        UserCreated = result.UserCreated



                    };

                    _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientDetailsVM.PasId });


                    return Content(HttpStatusCode.OK, patientDetailsVM);
                }


                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            
             }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, patientDetailsGetParams.PasId });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/patient/baseline")]
        public async Task<IHttpActionResult> GetPatientBaselineAsync(BaselineGetParams baselineGetParams)
        {
            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, baselineGetParams.PasId });

                if (baselineGetParams == null)
                    return BadRequest();

                baselineGetParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(baselineGetParams.UserCreated))
                    return BadRequest();

                baselineGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!baselineGetParams.Authorised)
                    return Unauthorized();

                baselineGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(baselineGetParams.UserOrganisationCode))
                    return BadRequest();

                baselineGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (baselineGetParams.UserCdeaId <= 0)
                    return BadRequest();

                baselineGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (baselineGetParams.CdeaId <= 0)
                    return BadRequest();

                if (baselineGetParams.CdeaId != baselineGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(baselineGetParams.Token))
                    return BadRequest();

                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(baselineGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

                baselineGetParams.PasId = splitDictionary["PasId"];
                baselineGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
                baselineGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

                if (string.IsNullOrEmpty(baselineGetParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(baselineGetParams.OrganisationCode))
                    return BadRequest();

                if (baselineGetParams.CdeaId <= 0)
                    return BadRequest();

                if (baselineGetParams.OrganisationCode != baselineGetParams.UserOrganisationCode)
                    return Unauthorized();

                if (baselineGetParams.CdeaId != baselineGetParams.UserCdeaId)
                    return Unauthorized();


                PatientBaselineViewModel patientBaselineVM = null;

                //   var result = await _patientService.GetPatientBaselineAsync(baselineGetParams);
                var result = await _patientRepository.GetPatientBaselineAsync(baselineGetParams);
                if (result != null)
                {
                    patientBaselineVM = new PatientBaselineViewModel()
                    {
                        BaselineDate = result.BaselineDate,
                        AttendedUHBpSSClinic = result.AttendedUHBpSSClinic,
                        WarrantingInvestigationForpSS = result.WarrantingInvestigationForpSS,
                        PhysicianDiagnosisOfpSS = result.PhysicianDiagnosisOfpSS,
                        PreviousHeadAndNeckRadiotherapy = result.PreviousHeadAndNeckRadiotherapy,
                        PreviousConfirmedDiagnosis = result.PreviousConfirmedDiagnosis,
                        CreatedUser = result.CreatedUser,
                        CreatedDateTime = result.CreatedDateTime,
                        LastUpdatedUser = result.LastUpdatedUser,
                        LastUpdatedDateTime = result.LastUpdatedDateTime,
                        CdeaId = result.CdeaId

                    };


                    _logger.Information("{Controller:l}/{Action:l} with params: {CdeaId} invoked", new object[] { ControllerName, ActionName, patientBaselineVM.CdeaId });

                    return Content(HttpStatusCode.OK, patientBaselineVM);
                }


                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            
             }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, baselineGetParams.PasId
    });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [HttpPost]
        [Route("api/patient/baseline/save")]
        public async Task<IHttpActionResult> SavePatientBaselineAsync(BaselinePostParams baselinePostParams)
        {
            try
            { 
            if (baselinePostParams == null)
                return BadRequest();

            baselinePostParams.UserCreated = _authorizationHelper.GetUserName();

            if (string.IsNullOrEmpty(baselinePostParams.UserCreated))
                return BadRequest();


            baselinePostParams.Authorised = _authorizationHelper.GetUserAuthorized();

            if (!baselinePostParams.Authorised)
                return Unauthorized();


            baselinePostParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

            if (string.IsNullOrEmpty(baselinePostParams.UserOrganisationCode))
                return BadRequest();


            baselinePostParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

            if (baselinePostParams.UserCdeaId <= 0)
                return BadRequest();


            baselinePostParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

            if (baselinePostParams.CdeaId <= 0)
                return BadRequest();

            if (baselinePostParams.UserCdeaId != baselinePostParams.CdeaId)
                return Unauthorized();


            if (string.IsNullOrEmpty(baselinePostParams.Token))
                return BadRequest();

            string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(baselinePostParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
            Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

            baselinePostParams.PasId = splitDictionary["PasId"];
            baselinePostParams.OrganisationCode = splitDictionary["OrganisationCode"];
            baselinePostParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

            if (string.IsNullOrEmpty(baselinePostParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(baselinePostParams.OrganisationCode))
                return BadRequest();

            if (baselinePostParams.CdeaId <= 0)
                return BadRequest();

            if (baselinePostParams.OrganisationCode != baselinePostParams.UserOrganisationCode)
                return Unauthorized();

            if (baselinePostParams.CdeaId != baselinePostParams.UserCdeaId)
                return Unauthorized();


            if (baselinePostParams.PatientBaseline == null)
                return BadRequest();

            if (baselinePostParams.BlankBaseline())
                return BadRequest();

                //  var result = await _patientService.SavePatientBaselineAsync(baselinePostParams);
                var result = await _patientRepository.SavePatientBaselineAsync(baselinePostParams);
                if (result)
            {
                return Content(HttpStatusCode.OK, result);
            }

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.BadRequest));

            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {PasId} invoked", new object[] { ControllerName, ActionName, baselinePostParams.PasId
    });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }

        }

       
    }
}
