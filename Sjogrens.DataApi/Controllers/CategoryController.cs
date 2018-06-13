
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
    public class CategoryController : ApiController
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController()
        {

        }

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        [ResponseType(typeof(List<VisitHeader>))]
        [Route("categories")]
        public async Task<IHttpActionResult> GetCategoriesAsync([FromBody]CategoryGetParams categoryGetParams)
        {
            if (categoryGetParams == null)
                return BadRequest();

            if (!categoryGetParams.Authorised)
                return Unauthorized();
            
            if (categoryGetParams.UserCdeaId <= 0)
                return BadRequest();

            if (categoryGetParams.CdeaId <= 0)
                return BadRequest();

            if (categoryGetParams.VisitHeaderId <= 0)
                return BadRequest();

            if (string.IsNullOrEmpty(categoryGetParams.PasId))
                return BadRequest();

            if (categoryGetParams.CdeaId != categoryGetParams.UserCdeaId)
                return Unauthorized();

            if (string.IsNullOrEmpty(categoryGetParams.OrganisationCode))
                return BadRequest();

            if (categoryGetParams.OrganisationCode != categoryGetParams.UserOrganisationCode)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _categoryRepository.GetCategoriesAsync(categoryGetParams);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

    }
}
