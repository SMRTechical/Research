using Serilog;
using Sjogrens.Client.Authorization;
using Sjogrens.Client.Authorization.Interfaces;
using Sjogrens.Client.Configuration.Interfaces;
using Sjogrens.Client.Controllers.Api;
using Sjogrens.Client.ViewModels;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Sjorgrens.Client.Controllers.Api
{
    //aplied in webapi.config
    [ApiAuthorize(Roles = "Administrator,Update,Read")]
    public class CategoryController : BaseApiController
    {

       // private readonly ICategoryService _categoryService;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IConfigurationHelper _configurationHelper;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository,ICategoryService categoryService, IAuthorizationHelper authorizationHelper, IConfigurationHelper configurationHelper, ILogger logger) : base(logger)
        {
            //_categoryService = categoryService;
            _authorizationHelper = authorizationHelper;
            _configurationHelper = configurationHelper;
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        [Route("api/categories")]
        public async Task<IHttpActionResult> GetVisitCategoriesAsync(CategoryGetParams categoryGetParams)
        {

            try
            {

                _logger.Information("{Controller:l}/{Action:l} with params: {VisitHeaderId} invoked", new object[] { ControllerName, ActionName, categoryGetParams.VisitHeaderId });

                if (categoryGetParams == null)
                    return BadRequest();

                categoryGetParams.UserCreated = _authorizationHelper.GetUserName();

                if (string.IsNullOrEmpty(categoryGetParams.UserCreated))
                    return BadRequest();


                categoryGetParams.Authorised = _authorizationHelper.GetUserAuthorized();

                if (!categoryGetParams.Authorised)
                    return Unauthorized();

                categoryGetParams.UserOrganisationCode = _authorizationHelper.GetUserOrganisationCode();

                if (string.IsNullOrEmpty(categoryGetParams.UserOrganisationCode))
                    return BadRequest();


                categoryGetParams.UserCdeaId = _authorizationHelper.GetUserCdeaId();

                if (categoryGetParams.UserCdeaId <= 0)
                    return BadRequest();

                categoryGetParams.CdeaId = _configurationHelper.GetCurrentCdeaId();

                if (categoryGetParams.CdeaId <= 0)
                    return BadRequest();

                if (categoryGetParams.CdeaId != categoryGetParams.UserCdeaId)
                    return Unauthorized();

                if (string.IsNullOrEmpty(categoryGetParams.Token))
                    return BadRequest();


                string unencryptedValues = EncryptionFactory.UrlDecodedDecrypt(categoryGetParams.Token, ConfigurationManager.AppSettings["EncryptionKey"].ToString());
                Dictionary<string, string> splitDictionary = EncryptionFactory.SplitUnencryptedString(unencryptedValues);

                categoryGetParams.PasId = splitDictionary["PasId"];
                categoryGetParams.OrganisationCode = splitDictionary["OrganisationCode"];
                categoryGetParams.CdeaId = Int32.Parse(splitDictionary["CdeaId"]);

                //  categoryGetParams.VisithId = Int32.Parse(splitDictionary["VisitId"]);

                //if (categoryGetParams.VisitId <= 0)
                //    return BadRequest();

                if (string.IsNullOrEmpty(categoryGetParams.PasId))
                    return BadRequest();

                if (string.IsNullOrEmpty(categoryGetParams.OrganisationCode))
                    return BadRequest();

                if (categoryGetParams.OrganisationCode != categoryGetParams.UserOrganisationCode)
                    return Unauthorized();

                if (categoryGetParams.CdeaId <= 0)
                    return BadRequest();

                if (categoryGetParams.VisitHeaderId <= 0)
                    return BadRequest();

                if (string.IsNullOrEmpty(categoryGetParams.PasId))
                    return BadRequest();

                if (categoryGetParams.CdeaId != categoryGetParams.UserCdeaId)
                    return Unauthorized();

                //   var results = await _categoryService.GetCategoriesAsync(categoryGetParams);
                var results = await _categoryRepository.GetCategoriesAsync(categoryGetParams);

                if (results == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                var visitHeaders = results?.OrderBy(p => p.Sequence).Select(p => new CategoryViewModel()
                {

                    CategoryId = p.CategoryId,
                    Name = p.Name,
                    HeaderText = p.HeaderText,
                    Description = p.Description,
                    LinkText = p.LinkText,
                    VisitCategory = p.VisitCategory,
                    CdeaId = p.CdeaId,
                    OrganisationCode = p.OrganisationCode,
                    Sequence = p.Sequence,
                    VisitId = p.VisitId,
                    Pid = p.Pid,
                    PasId = p.PasId,
                    InitialVisit = p.InitialVisit,
                    NewVisit = p.NewVisit,
                    Completed = p.Completed,
                    AdvancedSearch = p.AdvancedSearch

                }).ToList();

                if (visitHeaders == null)
                    return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));

                _logger.Information("{Controller:l}/{Action:l} returned {RecordCount} records", new object[] { ControllerName, ActionName, visitHeaders.Count });

                return Content(HttpStatusCode.OK, visitHeaders);


            }
            catch (Exception ex)
            {
                _logger.Information("{Controller:l}/{Action:l} with params: {VisitHeaderId} invoked", new object[] { ControllerName, ActionName, categoryGetParams.VisitHeaderId });

                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.NoContent));
            }
        }




    }
}
