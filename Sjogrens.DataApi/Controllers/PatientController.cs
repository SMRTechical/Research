
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Data.Repositories.Interfaces;
using Sjogrens.DataApi.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Factories;

namespace Sjogrens.DataApi.Controllers
{

    [BasicAuthentication]
    public class PatientController : ApiController
    {


        private readonly IPatientRepository _patientRepository;
        public PatientController()
        {

        }

        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpPost]
        [ResponseType(typeof(Patient))]
        [Route("patient/search")]
        public async Task<IHttpActionResult> SearchPatientAsync([FromBody]PatientSearchParams patientSearchParams)
        {
            if (patientSearchParams == null)
                return BadRequest();

            if (!patientSearchParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientSearchParams.PasId))
                return BadRequest();
            
            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                return BadRequest();

            if (patientSearchParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                return Unauthorized();


            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _patientRepository.SearchPatientAsync(patientSearchParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(Patient))]
        [Route("patient/spine/search")]
        public async Task<IHttpActionResult> SearchSpineAsync([FromBody]PatientSearchParams patientSearchParams)
        {
            if (patientSearchParams == null)
                return BadRequest();

            if (!patientSearchParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                return BadRequest();

            if (patientSearchParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(patientSearchParams.NhsNumber))
                return BadRequest();

            if (string.IsNullOrEmpty(patientSearchParams.DateOfBirth))
                return BadRequest();

            if (!DateTimeFactory.IsValidDateTosql(patientSearchParams.DateOfBirth))
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _patientRepository.SearchSpineAsync(patientSearchParams);

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(Patient))]
        [Route("mitpatient/Check")]
        public async Task<IHttpActionResult> CheckMITPatientAsync([FromBody]PatientSearchParams patientSearchParams)
        {
            if (patientSearchParams == null)
                return BadRequest();

            if (!patientSearchParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientSearchParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                return BadRequest();

            if (patientSearchParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId <= 0)
                return BadRequest();

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                return Unauthorized();


            if (!ModelState.IsValid)
                return BadRequest();


            var result = await _patientRepository.CheckMITPatientAsync(patientSearchParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        
        [HttpPost]
        [ResponseType(typeof(PatientOrg))]
        [Route("mitpatient/Save")]
        public async Task<IHttpActionResult> SaveMITPatientAsync([FromBody]PatientAddParams patientAddParams)
        {

         

            try
            {
                if (patientAddParams == null)
                {
                    Exception ex1 = new Exception("DATAAPI_SaveMITPatientAsync bad Request patientAddParams");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);
                    return BadRequest();
                }

                if (!patientAddParams.Authorised)
                {
                    Exception ex2 = new Exception("DATAAPI_SaveMITPatientAsync Unauthorized patientAddParams");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex2);
                    return Unauthorized();
                }

                if (string.IsNullOrEmpty(patientAddParams.PasId))
                {
                    Exception ex3 = new Exception("DATAAPI_SaveMITPatientAsync BadRequest PasId");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex3);
                    return BadRequest();
                }

                if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                {
                    Exception ex4 = new Exception("DATAAPI_SaveMITPatientAsync BadRequest UserOrganisationCode");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex4);
                    return BadRequest();
                }
                if (patientAddParams.UserCdeaId <= 0)
                {
                    Exception ex5 = new Exception("DATAAPI_SaveMITPatientAsync BadRequest UserCdeaId");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex5);
                    return BadRequest();
                }

                if (patientAddParams.CdeaId <= 0)
                {
                    Exception ex6 = new Exception("DATAAPI_SaveMITPatientAsync BadRequest CdeaId");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex6);
                    return BadRequest();
                }

                if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                {
                    Exception ex7 = new Exception("DATAAPI_SaveMITPatientAsync Unauthorized patientAddParams.CdeaId != patientAddParams.UserCdeaId");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex7);
                    return Unauthorized();

                }

                if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                {
                    Exception ex8 = new Exception("DATAAPI_SaveMITPatientAsync BadRequest UserCreated");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex8);
                    return BadRequest();
                }


                var ex2aa = new Exception("SaveMITPatientAsync dataapi before repo _patientRepository.GetMITPatientAsync");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex2aa);

                IPatient patient = await _patientRepository.GetMITPatientAsync(patientAddParams.PasId);

                Exception ex9 = new Exception("DATAAPI_SaveMITPatientAsync GETmit done");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex9);

                if (patient == null)
                {
                    return NotFound();
                }

                var patientOrg = await _patientRepository.InsertPatientAsync(patientAddParams, patient);


                Exception ex10 = new Exception("DATAAPI_SaveMITPatientAsync Insert MIT done");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex10);

                if (patientOrg != null)

                    return Ok(patientOrg);
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return BadRequest();
            }
        }

        [HttpPost]
        [Route("patients/search")]
        public async Task<IHttpActionResult> SearchPatientsAsync([FromBody]PatientsSearchParams patientsSearchParams)
        {
            if (patientsSearchParams == null)
                return BadRequest();

            if (!patientsSearchParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientsSearchParams.UserOrganisationCode))
                return BadRequest();

            if (patientsSearchParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientsSearchParams.CdeaId <= 0)
                return BadRequest();

            if (patientsSearchParams.CdeaId != patientsSearchParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientsSearchParams.PasId) &&
                string.IsNullOrEmpty(patientsSearchParams.NhsNumber) &&
                string.IsNullOrEmpty(patientsSearchParams.FirstName) &&
                string.IsNullOrEmpty(patientsSearchParams.LastName) &&
                string.IsNullOrEmpty(patientsSearchParams.DateOfBirth) &&
                string.IsNullOrEmpty(patientsSearchParams.PostCode)
                )
                return BadRequest();


            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _patientRepository.SearchPatientsAsync(patientsSearchParams);

            return Content(HttpStatusCode.OK, results);
            // }
            //catch (Exception ex)
            //{
            //    return InternalServerError(ex);
            //}

        }

        [HttpPost]
        [Route("patient/details")]
        public async Task<IHttpActionResult> GetPatientDetailsAsync([FromBody]PatientDetailsGetParams patientDetailsGetParams)
        {
            if (patientDetailsGetParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(patientDetailsGetParams.UserCreated))
                return BadRequest();

            if (!patientDetailsGetParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientDetailsGetParams.UserOrganisationCode))
                return BadRequest();

            if (patientDetailsGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientDetailsGetParams.CdeaId <= 0)
                return BadRequest();

            if (patientDetailsGetParams.CdeaId != patientDetailsGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientDetailsGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(patientDetailsGetParams.OrganisationCode))
                return BadRequest();

            if (patientDetailsGetParams.OrganisationCode != patientDetailsGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _patientRepository.GetPatientDetailsAsync(patientDetailsGetParams);

            return Content(HttpStatusCode.OK, results);
           
        }

        [HttpPost]
        [Route("patient/baseline")]
        public async Task<IHttpActionResult> GetPatientBaselineAsync([FromBody]BaselineGetParams baselineGetParams)
        {
            if (baselineGetParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(baselineGetParams.UserCreated))
                return BadRequest();

            if (!baselineGetParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(baselineGetParams.UserOrganisationCode))
                return BadRequest();

            if (baselineGetParams.CdeaId <= 0)
                return BadRequest();

            if (baselineGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (baselineGetParams.CdeaId != baselineGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(baselineGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(baselineGetParams.OrganisationCode))
                return BadRequest();

            if (baselineGetParams.OrganisationCode != baselineGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _patientRepository.GetPatientBaselineAsync(baselineGetParams);

            return Content(HttpStatusCode.OK, results);
            //}
            //catch (Exception ex)
            //{
            //    return InternalServerError(ex);
            //}
        }


        [HttpPost]
        [Route("patient/baseline/save")]
        public async Task<IHttpActionResult> SavePatientBaselineAsync([FromBody]BaselinePostParams baselinePostParams)
        {
            if (baselinePostParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(baselinePostParams.UserCreated))
                return BadRequest();

            if (!baselinePostParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(baselinePostParams.UserOrganisationCode))
                return BadRequest();

            if (baselinePostParams.UserCdeaId <= 0)
                return BadRequest();

            if (baselinePostParams.CdeaId <= 0)
                return BadRequest();

            if (baselinePostParams.UserCdeaId != baselinePostParams.CdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(baselinePostParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(baselinePostParams.OrganisationCode))
                return BadRequest();

            if (baselinePostParams.OrganisationCode != baselinePostParams.UserOrganisationCode)
                return Unauthorized();

            if (baselinePostParams.PatientBaseline == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _patientRepository.SavePatientBaselineAsync(baselinePostParams);

            return Content(HttpStatusCode.OK, results);
            
        }
        
        [HttpPost]
        [ResponseType(typeof(PatientOrg))]
        [Route("patient/spine/save")]
        public async Task<IHttpActionResult> SaveSpineAsync([FromBody]PatientAddParams patientAddParams)
        {
            if (patientAddParams == null)
                return BadRequest();

            if (!patientAddParams.Authorised)
                return Unauthorized();

            if (patientAddParams.exists)
                if (string.IsNullOrEmpty(patientAddParams.PasId))
                    return BadRequest();
                else
                    patientAddParams.PasId = patientAddParams.PasId.Trim();

            if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                return BadRequest();

            if (patientAddParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientAddParams.CdeaId <= 0)
                return BadRequest();

            if (patientAddParams.UserCdeaId != patientAddParams.CdeaId)
                return Unauthorized();


            if (string.IsNullOrEmpty(patientAddParams.NhsNumber))
                return BadRequest();

            if (string.IsNullOrEmpty(patientAddParams.DateOfBirth))
                return BadRequest();

            if (!DateTimeFactory.IsValidDateTosql(patientAddParams.DateOfBirth))
                return BadRequest();

            if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                return BadRequest();

            //if (!patientAddWithAuditParams.ConsentGiven)
            //    return BadRequest();

            var patient = await _patientRepository.SearchSpineAsync(patientAddParams);
            if (patient == null)
            {
                return NotFound();
            }

            var patientOrg = await _patientRepository.InsertPatientAsync(patientAddParams, patient);

            if (patientOrg != null)

                return Ok(patientOrg);
            else
                return NotFound();

        }

    }
}
