
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using Sjorgens.Core.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public CategoryService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<IEnumerable<VisitCategory>> GetCategoriesAsync(CategoryGetParams categoryGetParams)
        {

            if (categoryGetParams == null)
                throw new ArgumentNullException(nameof(categoryGetParams));

            if (string.IsNullOrWhiteSpace(categoryGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.UserCreated));

            if (!categoryGetParams.Authorised)
                throw new ArgumentException(nameof(categoryGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(categoryGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.UserOrganisationCode));

            if (categoryGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.UserCdeaId));

            if (categoryGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.CdeaId));

            if (categoryGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.VisitHeaderId));

            if (string.IsNullOrEmpty(categoryGetParams.PasId))
                throw new ArgumentNullException(nameof(categoryGetParams.PasId));

            if (categoryGetParams.CdeaId != categoryGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(categoryGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(categoryGetParams.OrganisationCode));

            if (categoryGetParams.OrganisationCode != categoryGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.UserOrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"categories");

            var response = await _dataApiHttpService.PostAsync<CategoryGetParams, IEnumerable<VisitCategory>>(uri, categoryGetParams);
            return response.Success ? response.Data : Enumerable.Empty<VisitCategory>();
        }
    }
}
