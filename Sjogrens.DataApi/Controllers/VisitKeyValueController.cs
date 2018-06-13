
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
    public class VisitKeyValueController : ApiController
    {
        private readonly IVisitKeyValueRepository _visitKeyValueRepository;
        public VisitKeyValueController()
        {

        }

        public VisitKeyValueController(IVisitKeyValueRepository visitKeyValueRepository)
        {
            _visitKeyValueRepository = visitKeyValueRepository;
        }

        [HttpPost]
        [ResponseType(typeof(CompleteVisitKeyValue))]
        [Route("visitkeyvalue")]
        public async Task<IHttpActionResult> GetVisitKeyValueAsync([FromBody]VisitKeyValueGetParams visitKeyValueGetParams)
        {
            if (visitKeyValueGetParams == null)
                return BadRequest();

            if (!visitKeyValueGetParams.Authorised)
                return Unauthorized();

            if (visitKeyValueGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitKeyValueGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValueGetParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitKeyValueGetParams.CdeaId != visitKeyValueGetParams.UserCdeaId)
                return Unauthorized();


            if (string.IsNullOrEmpty(visitKeyValueGetParams.OrganisationCode))
                return BadRequest();

            if (visitKeyValueGetParams.OrganisationCode != visitKeyValueGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitKeyValueRepository.GetVisitKeyValueAsync(visitKeyValueGetParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpPost]
        [Route("visitkeyvalue/save")]
        public async Task<IHttpActionResult> SaveVisitKeyValueAsync([FromBody]VisitKeyValuePostParams visitKeyValuePostParams)
        {

            if (visitKeyValuePostParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.UserCreated))
                return BadRequest();

            if (!visitKeyValuePostParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.UserOrganisationCode))
                return BadRequest();

            if (visitKeyValuePostParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.CdeaId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.UserCdeaId != visitKeyValuePostParams.CdeaId)
                return Unauthorized();

            if (visitKeyValuePostParams.VisitHeaderId <= 0)
                return BadRequest();

            if (visitKeyValuePostParams.CategoryId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(visitKeyValuePostParams.OrganisationCode))
                return BadRequest();

            if (visitKeyValuePostParams.OrganisationCode != visitKeyValuePostParams.UserOrganisationCode)
                return Unauthorized();

            //if (visitKeyValuePostParams.VisitKeyValues == null && visitPostParams.Detail == null)
            //    return BadRequest();

           //visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

            //if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count ==0)
            //    return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _visitKeyValueRepository.SaveVisitKeyValueAsync(visitKeyValuePostParams);

            return Content(HttpStatusCode.OK, results);

        }

    }
}
