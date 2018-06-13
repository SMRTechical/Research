
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
    public class VisitControlValueController : ApiController
    {
        private readonly IVisitControlValueRepository _visitControlValueRepository;
        public VisitControlValueController()
        {

        }

        public VisitControlValueController(IVisitControlValueRepository visitControlValueRepository)
        {
            _visitControlValueRepository = visitControlValueRepository;
        }

        [HttpPost]
        [ResponseType(typeof(CompleteVisitControlValue))]
        [Route("visitcontrolvalue")]
        public async Task<IHttpActionResult> GetVisitControlValueAsync([FromBody]VisitControlValueGetParams visitControlValueGetParams)
        {
            if (visitControlValueGetParams == null)
                return BadRequest();

            if (!visitControlValueGetParams.Authorised)
                return Unauthorized();

            if (visitControlValueGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitControlValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitControlValueGetParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitControlValueGetParams.CdeaId != visitControlValueGetParams.UserCdeaId)
                return Unauthorized();


            if (string.IsNullOrEmpty(visitControlValueGetParams.OrganisationCode))
                return BadRequest();

            if (visitControlValueGetParams.OrganisationCode != visitControlValueGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitControlValueRepository.GetVisitControlValueAsync(visitControlValueGetParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        

    }
}
