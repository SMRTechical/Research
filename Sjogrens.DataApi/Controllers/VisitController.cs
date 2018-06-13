
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
    public class VisitController : ApiController
    {
        private readonly IVisitRepository _visitRepository;
        public VisitController()
        {

        }

        public VisitController(IVisitRepository visitRepository)
        {
            _visitRepository = visitRepository;
        }

        [HttpPost]
        [ResponseType(typeof(CompleteVisit))]
        [Route("visit")]
        public async Task<IHttpActionResult> GetVisitAsync([FromBody]VisitGetParams visitGetParams)
        {
            if (visitGetParams == null)
                return BadRequest();

            if (!visitGetParams.Authorised)
                return Unauthorized();

            if (visitGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitGetParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitGetParams.CdeaId != visitGetParams.UserCdeaId)
                return Unauthorized();


            if (string.IsNullOrEmpty(visitGetParams.OrganisationCode))
                return BadRequest();

            if (visitGetParams.OrganisationCode != visitGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitRepository.GetVisitAsync(visitGetParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpPost]
        [Route("visit/save")]
        public async Task<IHttpActionResult> SaveVisitAsync([FromBody]VisitPostParams visitPostParams)
        {

            if (visitPostParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitPostParams.UserCreated))
                return BadRequest();

            if (!visitPostParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitPostParams.UserOrganisationCode))
                return BadRequest();

            if (visitPostParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitPostParams.UserCdeaId != visitPostParams.CdeaId)
                return Unauthorized();

            if (visitPostParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitPostParams.CategoryId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(visitPostParams.OrganisationCode))
                return BadRequest();

            if (visitPostParams.OrganisationCode != visitPostParams.UserOrganisationCode)
                return Unauthorized();

            if (visitPostParams.Visit == null && visitPostParams.Detail == null)
                return BadRequest();

            visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

            if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count ==0)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _visitRepository.SaveVisitAsync(visitPostParams);

            return Content(HttpStatusCode.OK, results);

        }

    }
}
