
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
    public class ConsentController : ApiController
    {


        private readonly IConsentRepository _consentRepository;
        public ConsentController()
        {

        }

        public ConsentController(IConsentRepository consentRepository)
        {
            _consentRepository = consentRepository;
        }



        [HttpPost]
        [Route("consent")]
        public async Task<IHttpActionResult> GetConsentAsync([FromBody]ConsentGetParams consentGetParams)
        {

           

            if (consentGetParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(consentGetParams.UserCreated))
                return BadRequest();

            if (!consentGetParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(consentGetParams.UserOrganisationCode))
                return BadRequest();

            if (consentGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (consentGetParams.CdeaId <= 0)
                return BadRequest();

            if (consentGetParams.CdeaId != consentGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(consentGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(consentGetParams.OrganisationCode))
                return BadRequest();

            if (consentGetParams.OrganisationCode != consentGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _consentRepository.GetConsentAsync(consentGetParams);

            return Content(HttpStatusCode.OK, results);
        }

        [HttpPost]
        [Route("consent/save")]
        public async Task<IHttpActionResult> SaveConsentAsync([FromBody]ConsentPostParams consentPostParams)
        {
            if (consentPostParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(consentPostParams.UserCreated))
                return BadRequest();

            if (!consentPostParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(consentPostParams.UserOrganisationCode))
                return BadRequest();

            if (consentPostParams.UserCdeaId <= 0)
                return BadRequest();

            if (consentPostParams.CdeaId <= 0)
                return BadRequest();

            if (consentPostParams.CdeaId != consentPostParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(consentPostParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(consentPostParams.OrganisationCode))
                return BadRequest();

            if (consentPostParams.OrganisationCode != consentPostParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _consentRepository.SaveConsentAsync(consentPostParams);

            return Content(HttpStatusCode.OK, results);

        }

    }
}
