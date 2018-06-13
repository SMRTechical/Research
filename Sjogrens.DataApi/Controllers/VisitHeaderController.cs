
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
    public class VisitHeaderController : ApiController
    {


        private readonly IVisitHeaderRepository _visitHeaderRepository;
        public VisitHeaderController()
        {

        }

        public VisitHeaderController(IVisitHeaderRepository visitHeaderRepository)
        {
            _visitHeaderRepository = visitHeaderRepository;
        }

        [HttpPost]
        [ResponseType(typeof(List<VisitHeader>))]
        [Route("visitheaders")]
        public async Task<IHttpActionResult> GetVisitHeadersAsync([FromBody]VisitHeadersGetParams visitHeadersGetParams)
        {
            if (visitHeadersGetParams == null)
                return BadRequest();

            if (!visitHeadersGetParams.Authorised)
                return Unauthorized();
            
            if (visitHeadersGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitHeadersGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeadersGetParams.CdeaId != visitHeadersGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeadersGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeadersGetParams.OrganisationCode))
                return BadRequest();

            if (visitHeadersGetParams.OrganisationCode != visitHeadersGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitHeaderRepository.GetVisitHeadersAsync(visitHeadersGetParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpPost]
        [ResponseType(typeof(int))]
        [Route("visitheader/duplicate")]
        public async Task<IHttpActionResult> IsVisitHeaderDuplicate([FromBody]VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            if (visitHeaderDuplicateParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserCreated))
                return BadRequest();

            if (!visitHeaderDuplicateParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserOrganisationCode))
                return BadRequest();

            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                return BadRequest();

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitHeaderRepository.IsVisitHeaderDuplicateAsync(visitHeaderDuplicateParams);
            
            return Ok(result);
        }


        [ResponseType(typeof(int))]
        [Route("visitheader/valid")]
        public async Task<IHttpActionResult> IsVisitHeaderValid([FromBody]VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            if (visitHeaderDuplicateParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserCreated))
                return BadRequest();

            if (!visitHeaderDuplicateParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.UserOrganisationCode))
                return BadRequest();

            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                return BadRequest();

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitHeaderRepository.IsVisitHeaderValidAsync(visitHeaderDuplicateParams);

            return Ok(result);
        }


        [HttpPost]
        [ResponseType(typeof(int))]
        [Route("visitheader")]
        public async Task<IHttpActionResult> GetVisitHeader([FromBody]VisitHeaderGetParams visitHeaderGetParams)
        {
            if (visitHeaderGetParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderGetParams.UserCreated))
                return BadRequest();

            if (!visitHeaderGetParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderGetParams.UserOrganisationCode))
                return BadRequest();

            if (visitHeaderGetParams.DateOfVisit == null &&  visitHeaderGetParams.VisitId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderGetParams.CdeaId != visitHeaderGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _visitHeaderRepository.GetVisitHeaderAsync(visitHeaderGetParams);

            return Ok(result);
        }

        [HttpPost]
        [Route("visitheader/save")]
        public async Task<IHttpActionResult> SaveVisitHeaderAsync([FromBody]VisitHeaderPostParams visitHeaderPostParams)
        {
            
            if (visitHeaderPostParams == null)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderPostParams.UserCreated))
                return BadRequest();

            if (!visitHeaderPostParams.Authorised)
                return Unauthorized();

            if (string.IsNullOrEmpty(visitHeaderPostParams.UserOrganisationCode))
                return BadRequest();

            if (visitHeaderPostParams.UserCdeaId <= 0)
                return BadRequest();

            if (visitHeaderPostParams.CdeaId <= 0)
                return BadRequest();

            if (visitHeaderPostParams.UserCdeaId != visitHeaderPostParams.CdeaId)
                return Unauthorized();

            if ((visitHeaderPostParams.DateOfVisit == null))
                return BadRequest();

            if (visitHeaderPostParams.VisitId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderPostParams.PasId))
                return BadRequest();

            if (string.IsNullOrEmpty(visitHeaderPostParams.OrganisationCode))
                return BadRequest();

            if (visitHeaderPostParams.OrganisationCode != visitHeaderPostParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var results = await _visitHeaderRepository.SaveVisitHeaderAsync(visitHeaderPostParams);

            return Content(HttpStatusCode.OK, results);
           
        }

    }
}
