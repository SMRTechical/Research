using Sjogrens.Core.Data.Interfaces;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Sjogrens.DataApi.Controllers
{
    public class MITPatientController : ApiController
    {


        private readonly IMITPatientRepository _mitpatientRepository;
        public MITPatientController()
        {

        }

        public MITPatientController(IMITPatientRepository mitpatientRepository)
        {
            _mitpatientRepository = mitpatientRepository;
        }


        [ResponseType(typeof(MITPatient))]
        [Route("mitpatient/{pasId}")]
        public async Task<IHttpActionResult> GetPatientAsync([FromBody]PatientSearchParams patientSearchParams)
        {
            var result = await _mitpatientRepository.GetAsync(patientSearchParams);
            if (result == null)
            {
                return NotFound();
            }

            //return Content(HttpStatusCode.OK, result);

            return Ok(result);
        }
        


    }
}
