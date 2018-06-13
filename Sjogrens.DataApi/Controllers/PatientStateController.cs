
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

namespace Sjogrens.DataApi.Controllers
{

    [BasicAuthentication]
    public class PatientStateController : ApiController
    {


        private readonly IPatientStateRepository _patientStateRepository;
        public PatientStateController()
        {

        }

        public PatientStateController(IPatientStateRepository patientStateRepository)
        {
            _patientStateRepository = patientStateRepository;
        }


        [HttpPost]
        [ResponseType(typeof(PatientState))]
        [Route("patientstate")]
        public async Task<IHttpActionResult> GetPatientState([FromBody]PatientStateGetParams patientStateGetParams)
        {
            if (patientStateGetParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(patientStateGetParams.UserCreated))
                return BadRequest();

            if (!patientStateGetParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientStateGetParams.UserOrganisationCode))
                return BadRequest();

            if (patientStateGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (patientStateGetParams.CdeaId <= 0)
                return BadRequest();

            if (patientStateGetParams.CdeaId != patientStateGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(patientStateGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(patientStateGetParams.OrganisationCode))
                return BadRequest();

            if (patientStateGetParams.OrganisationCode != patientStateGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _patientStateRepository.GetPatientStateAsync(patientStateGetParams);

            return Ok(result);
        }
    }
}
