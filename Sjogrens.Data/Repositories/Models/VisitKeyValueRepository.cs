
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
    public class VisitKeyValueRepository : IVisitKeyValueRepository
    {
        private readonly IVisitKeyValueDbInterface _visitKeyValueDbInterface;

        public VisitKeyValueRepository()
        {

        }

        public VisitKeyValueRepository(IVisitKeyValueDbInterface visitKeyValueDbInterface)
        {
            _visitKeyValueDbInterface = visitKeyValueDbInterface;
        }


        public async Task<CompleteVisitKeyValue> GetVisitKeyValueAsync(VisitKeyValueGetParams visitKeyValueGetParams)
        {
            if (visitKeyValueGetParams == null)
                throw new ArgumentNullException(nameof(visitKeyValueGetParams));

            if (string.IsNullOrWhiteSpace(visitKeyValueGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserCreated));

            if (!visitKeyValueGetParams.Authorised)
                throw new ArgumentException(nameof(visitKeyValueGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitKeyValueGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserOrganisationCode));

            if (visitKeyValueGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.UserCdeaId));

            if (visitKeyValueGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.CdeaId));

            if (visitKeyValueGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.VisitHeaderId));

            if (visitKeyValueGetParams.CategoryId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.CategoryId));

            if (visitKeyValueGetParams.SectionId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.SectionId));

            //if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
            //    throw new ArgumentNullException(nameof(visitHeaderGetParams.PasId));

            if (string.IsNullOrEmpty(visitKeyValueGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitKeyValueGetParams.OrganisationCode));

            if (visitKeyValueGetParams.OrganisationCode != visitKeyValueGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitKeyValueGetParams.OrganisationCode), "Access Denied");

            if (visitKeyValueGetParams.VisitHeaderId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitKeyValueGetParams.VisitHeaderId));

            try
            {
                var visitHeader = await _visitKeyValueDbInterface.GetVisitKeyValueAsync(visitKeyValueGetParams.VisitHeaderId, visitKeyValueGetParams.OrganisationCode, visitKeyValueGetParams.CdeaId, visitKeyValueGetParams.CategoryId, visitKeyValueGetParams.SectionId);
                return visitHeader;
            }
            catch (Exception ex)
            {
                //TODO:ELMAH
                return null;
            }
        }

        public async Task<bool> SaveVisitKeyValueAsync(VisitKeyValuePostParams visitKeyValuePostParams)
        {
            if (visitKeyValuePostParams == null)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams));

            if (string.IsNullOrWhiteSpace(visitKeyValuePostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValuePostParams.UserCreated));

            if (!visitKeyValuePostParams.Authorised)
                throw new ArgumentException(nameof(visitKeyValuePostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitKeyValuePostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitKeyValuePostParams.UserOrganisationCode));

            if (visitKeyValuePostParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.UserCdeaId));

            if (visitKeyValuePostParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CdeaId));

            if (visitKeyValuePostParams.UserCdeaId != visitKeyValuePostParams.CdeaId)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CdeaId), "Access Denied");

            if (visitKeyValuePostParams.VisitHeaderId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.VisitHeaderId));

            if (visitKeyValuePostParams.CategoryId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.CategoryId));

            if (visitKeyValuePostParams.SectionId <= 0)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.SectionId));


            if (string.IsNullOrEmpty(visitKeyValuePostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.OrganisationCode));

            if (visitKeyValuePostParams.OrganisationCode != visitKeyValuePostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitKeyValuePostParams.OrganisationCode), "Access Denied");


            //if (visitPostParams.VisitHeaderId <= 0)
            //    throw new ArgumentNullException(nameof(visitPostParams.VisitHeaderId));

            //if (visitPostParams.Visit == null && visitPostParams.Detail == null)
            //    throw new ArgumentNullException(nameof(visitPostParams.Visit));

            //visitPostParams.Visit.RemoveAll(c => c.ControlId == 0 || c.ControlValueId == 0);

         

            //if (visitPostParams.Visit.Count == 0 && visitPostParams.Detail.Count == 0)
            //    throw new ArgumentNullException(nameof(visitPostParams.Visit), "Visit has no values");

            try
            {
                var result = await _visitKeyValueDbInterface.SaveVisitKeyValueAsync(visitKeyValuePostParams.VisitHeaderId, visitKeyValuePostParams.CategoryId, visitKeyValuePostParams.SectionId, visitKeyValuePostParams.VisitKeyValues, visitKeyValuePostParams.UserCreated);
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
