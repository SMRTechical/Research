
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
    public class VisitControlValueRepository : IVisitControlValueRepository
    {
        private readonly IVisitControlValueDbInterface _visitControlValueDbInterface;

        public VisitControlValueRepository()
        {

        }

        public VisitControlValueRepository(IVisitControlValueDbInterface visitControlValueDbInterface)
        {
            _visitControlValueDbInterface = visitControlValueDbInterface;
        }


        public async Task<CompleteVisitControlValue> GetVisitControlValueAsync(VisitControlValueGetParams visitControlValueGetParams)
        {
            if (visitControlValueGetParams == null)
                throw new ArgumentNullException(nameof(visitControlValueGetParams));

            if (string.IsNullOrWhiteSpace(visitControlValueGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserCreated));

            if (!visitControlValueGetParams.Authorised)
                throw new ArgumentException(nameof(visitControlValueGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitControlValueGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserOrganisationCode));

            if (visitControlValueGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.UserCdeaId));

            if (visitControlValueGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.CdeaId));

            if (visitControlValueGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitControlValueGetParams.VisitHeaderId));

            if (string.IsNullOrEmpty(visitControlValueGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitControlValueGetParams.OrganisationCode));

            if (visitControlValueGetParams.OrganisationCode != visitControlValueGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitControlValueGetParams.OrganisationCode), "Access Denied");

          

            try
            {
                var visitControlValues = await _visitControlValueDbInterface.GetVisitControlValueAsync(visitControlValueGetParams.VisitHeaderId, visitControlValueGetParams.OrganisationCode, visitControlValueGetParams.CdeaId);
                return visitControlValues;
            }
            catch (Exception ex)
            {

                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }
        

    }
}
