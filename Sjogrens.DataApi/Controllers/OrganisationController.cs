using Sjogrens.Data.Repositories.Interfaces;
using Sjogrens.DataApi.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sjogrens.DataApi.Controllers
{
    // [SjogrensCorsPolicy]

    [BasicAuthentication]
    public class OrganisationController : ApiController
    {
        private readonly IOrganisationRepository _organisationRepository;
        public OrganisationController()
        {

        }

        public OrganisationController(IOrganisationRepository organisationRepository)
        {
            _organisationRepository = organisationRepository;
        }

        [HttpGet]
        [Route("organisations")]
        public async Task<IHttpActionResult> GetOrganisationsAsync()
        {
            var results = await _organisationRepository.ListAsync();

            return Content(HttpStatusCode.OK, results);
        }

    }
}
