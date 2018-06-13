
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Data.DbInterfaces;
using Sjogrens.Core.Factories;
using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Params;
using Elmah;

namespace Sjogrens.Data.Repositories.Models
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly ICategoryDbInterface _categoryDbInterface;

        public CategoryRepository()
        {

        }

        public CategoryRepository(ICategoryDbInterface categoryDbInterface)
        {
            _categoryDbInterface = categoryDbInterface;
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
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.CdeaId), "Access Denied");
            
            if (string.IsNullOrEmpty(categoryGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(categoryGetParams.OrganisationCode));

            if (categoryGetParams.OrganisationCode != categoryGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(categoryGetParams.OrganisationCode), "Access Denied");

            try
            {
                var visitHeaders = await _categoryDbInterface.GetCategoriesAsync(categoryGetParams.VisitHeaderId, categoryGetParams.PasId, categoryGetParams.OrganisationCode, categoryGetParams.CdeaId,categoryGetParams.newVisit, categoryGetParams.AdvancedSearch);
                return visitHeaders;
            }
            catch(Exception ex)
            {
               
                ErrorSignal.FromCurrentContext().Raise(ex);

                return null;
            }
        }


    }
}
