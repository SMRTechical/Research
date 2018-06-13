
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
    public class VisitRepository : IVisitRepository
    {
        private readonly IVisitDbInterface _visitDbInterface;

        public VisitRepository()
        {

        }

        public VisitRepository(IVisitDbInterface visitDbInterface)
        {
            _visitDbInterface = visitDbInterface;
        }


        public async Task<CompleteVisit> GetVisitAsync(VisitGetParams visitGetParams)
        {
            if (visitGetParams == null)
                throw new ArgumentNullException(nameof(visitGetParams));

            if (string.IsNullOrWhiteSpace(visitGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserCreated));

            if (!visitGetParams.Authorised)
                throw new ArgumentException(nameof(visitGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserOrganisationCode));

            if (visitGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.UserCdeaId));

            if (visitGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.CdeaId));

            if (visitGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitGetParams.VisitHeaderId));

            //if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
            //    throw new ArgumentNullException(nameof(visitHeaderGetParams.PasId));

            if (string.IsNullOrEmpty(visitGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitGetParams.OrganisationCode));

            if (visitGetParams.OrganisationCode != visitGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitGetParams.OrganisationCode), "Access Denied");

            try
            {
                var visitHeader = await _visitDbInterface.GetVisitAsync(visitGetParams.VisitHeaderId, visitGetParams.OrganisationCode, visitGetParams.CdeaId, visitGetParams.newVisit, visitGetParams.DateOfVisit, visitGetParams.UserCreated);
                return visitHeader;
            }
            catch (Exception ex)
            {
                //TODO:ELMAH
                return null;
            }
        }

        public async Task<bool> SaveVisitAsync(VisitPostParams visitPostParams)
        {
            if (visitPostParams == null)
                throw new ArgumentNullException(nameof(visitPostParams));

            if (string.IsNullOrWhiteSpace(visitPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitPostParams.UserCreated));

            if (!visitPostParams.Authorised)
                throw new ArgumentException(nameof(visitPostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitPostParams.UserOrganisationCode));

            if (visitPostParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.UserCdeaId));

            if (visitPostParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.CdeaId));

            if (visitPostParams.UserCdeaId != visitPostParams.CdeaId)
                throw new ArgumentNullException(nameof(visitPostParams.CdeaId), "Access Denied");

            if (visitPostParams.VisitHeaderId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.VisitHeaderId));

            if (visitPostParams.CategoryId <= 0)
                throw new ArgumentNullException(nameof(visitPostParams.CategoryId));

            if (string.IsNullOrEmpty(visitPostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitPostParams.OrganisationCode));

            if (visitPostParams.OrganisationCode != visitPostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitPostParams.OrganisationCode), "Access Denied");


            //if (visitPostParams.VisitHeaderId <= 0)
            //    throw new ArgumentNullException(nameof(visitPostParams.VisitHeaderId));

            if (visitPostParams.Visit == null && visitPostParams.Detail == null)
                throw new ArgumentNullException(nameof(visitPostParams.Visit));

            visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

         

            if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count == 0)
                throw new ArgumentNullException(nameof(visitPostParams.Visit), "Visit has no values");

            try
            {
                var result = await _visitDbInterface.SaveVisitAsync(visitPostParams.VisitHeaderId, visitPostParams.CategoryId, visitPostParams.Visit, visitPostParams.Detail, visitPostParams.UserCreated);
                return result;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return false;
            }
        }





    }
}
