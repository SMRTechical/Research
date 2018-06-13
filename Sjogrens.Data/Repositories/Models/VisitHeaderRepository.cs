
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
    public class VisitHeaderRepository: IVisitHeaderRepository
    {
        private readonly IVisitHeaderDbInterface _visitHeaderDbInterface;

        public VisitHeaderRepository()
        {

        }

        public VisitHeaderRepository(IVisitHeaderDbInterface visitHeaderDbInterface)
        {
            _visitHeaderDbInterface = visitHeaderDbInterface;
        }

        
        public async Task<IEnumerable<IVisitHeader>> GetVisitHeadersAsync(VisitHeadersGetParams visitHeadersGetParams)
        {
            if (visitHeadersGetParams == null)
                throw new ArgumentNullException(nameof(visitHeadersGetParams));

            if (string.IsNullOrWhiteSpace(visitHeadersGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserCreated));

            if (!visitHeadersGetParams.Authorised)
                throw new ArgumentException(nameof(visitHeadersGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeadersGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserOrganisationCode));

            if (visitHeadersGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.UserCdeaId));

            if (visitHeadersGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.CdeaId));

            if (visitHeadersGetParams.CdeaId != visitHeadersGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(visitHeadersGetParams.PasId)) 
                throw new ArgumentNullException(nameof(visitHeadersGetParams.PasId));

            if (string.IsNullOrEmpty(visitHeadersGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeadersGetParams.OrganisationCode));

            if (visitHeadersGetParams.OrganisationCode != visitHeadersGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(visitHeadersGetParams.OrganisationCode), "Access Denied");

            try
            {
                var visitHeaders = await _visitHeaderDbInterface.GetVisitHeadersAsync(visitHeadersGetParams.PasId, visitHeadersGetParams.OrganisationCode, visitHeadersGetParams.CdeaId, visitHeadersGetParams.AdvancedSearch);
                return visitHeaders;
            }
            catch(Exception ex)
            {
                //TODO:ELMAH
                return null;
            }
        }



        public async Task<bool> IsVisitHeaderDuplicateAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            if (visitHeaderDuplicateParams == null)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCreated));

            if (!visitHeaderDuplicateParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderDuplicateParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode));

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCdeaId));

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId));

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId),"Access Denied");

            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.DateOfVisit));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode));

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode),"Access Denied");


            try
            {
                var visitHeaderDuplicate = await _visitHeaderDbInterface.IsVisitHeaderDuplicate(visitHeaderDuplicateParams.DateOfVisit, visitHeaderDuplicateParams.PasId, visitHeaderDuplicateParams.OrganisationCode, visitHeaderDuplicateParams.CdeaId);
                return visitHeaderDuplicate;
            }
            catch (Exception ex)
            {
                //TODO:ELMAH
                return false;
            }
        }

        public async Task<bool> IsVisitHeaderValidAsync(VisitHeaderDuplicateParams visitHeaderDuplicateParams)
        {
            if (visitHeaderDuplicateParams == null)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCreated));

            if (!visitHeaderDuplicateParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderDuplicateParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderDuplicateParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserOrganisationCode));

            if (visitHeaderDuplicateParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.UserCdeaId));

            if (visitHeaderDuplicateParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId));

            if (visitHeaderDuplicateParams.CdeaId != visitHeaderDuplicateParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderDuplicateParams.CdeaId), "Access Denied");

            if ((visitHeaderDuplicateParams.DateOfVisit == null))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.DateOfVisit));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderDuplicateParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode));

            if (visitHeaderDuplicateParams.OrganisationCode != visitHeaderDuplicateParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitHeaderDuplicateParams.OrganisationCode), "Access Denied");


            try
            {
                var visitHeaderValid = await _visitHeaderDbInterface.IsVisitHeaderValid(visitHeaderDuplicateParams.DateOfVisit, visitHeaderDuplicateParams.PasId, visitHeaderDuplicateParams.OrganisationCode, visitHeaderDuplicateParams.CdeaId);
                return visitHeaderValid;
            }
            catch (Exception ex)
            {
                //TODO:ELMAH
                return false;
            }
        }

        public async Task<VisitHeader> GetVisitHeaderAsync(VisitHeaderGetParams visitHeaderGetParams)
        {
            if (visitHeaderGetParams == null)
                throw new ArgumentNullException(nameof(visitHeaderGetParams));

            if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCreated));

            if (!visitHeaderGetParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserOrganisationCode));

            if (visitHeaderGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.UserCdeaId));

            if (visitHeaderGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(visitHeaderGetParams.CdeaId));

            if (visitHeaderGetParams.DateOfVisit == null && visitHeaderGetParams.VisitId <= 0)
                throw new ArgumentOutOfRangeException("DateofVisit or VisitId required", "Bad Request");

            if (string.IsNullOrEmpty(visitHeaderGetParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderGetParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderGetParams.OrganisationCode));

            if (visitHeaderGetParams.OrganisationCode != visitHeaderGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitHeaderGetParams.OrganisationCode),"Access Denied");

            try
            {
                var visitHeader = await _visitHeaderDbInterface.GetVisitHeaderAsync(visitHeaderGetParams.DateOfVisit, visitHeaderGetParams.VisitId, visitHeaderGetParams.PasId, visitHeaderGetParams.OrganisationCode, visitHeaderGetParams.CdeaId, visitHeaderGetParams.AdvancedSearch);
                return visitHeader;
            }
            catch (Exception ex)
            {
                //TODO:ELMAH
                return null;
            }
        }

        public async Task<bool> SaveVisitHeaderAsync(VisitHeaderPostParams visitHeaderPostParams)
        {
            if (visitHeaderPostParams == null)
                throw new ArgumentNullException(nameof(visitHeaderPostParams));

            if (string.IsNullOrWhiteSpace(visitHeaderPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserCreated));

            if (!visitHeaderPostParams.Authorised)
                throw new ArgumentException(nameof(visitHeaderPostParams.Authorised));

            if (string.IsNullOrWhiteSpace(visitHeaderPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(visitHeaderPostParams.UserOrganisationCode));

            if ((visitHeaderPostParams.DateOfVisit == null))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.DateOfVisit));

            if ((visitHeaderPostParams.VisitId <= 0))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.VisitId));

            if (visitHeaderPostParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.UserCdeaId));

            if (visitHeaderPostParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.CdeaId));

            if (visitHeaderPostParams.UserCdeaId != visitHeaderPostParams.CdeaId)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.CdeaId),"Access Denied");


            if (string.IsNullOrEmpty(visitHeaderPostParams.PasId))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.PasId));

            if (string.IsNullOrEmpty(visitHeaderPostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(visitHeaderPostParams.OrganisationCode));

            if (visitHeaderPostParams.OrganisationCode != visitHeaderPostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(visitHeaderPostParams.OrganisationCode),"Access Denied");

            try
            {
                var result = await _visitHeaderDbInterface.SaveVisitHeaderAsync(visitHeaderPostParams.DateOfVisit,visitHeaderPostParams.VisitId, visitHeaderPostParams.PasId, visitHeaderPostParams.OrganisationCode, visitHeaderPostParams.CdeaId, visitHeaderPostParams.Completed, visitHeaderPostParams.UserCreated);
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
