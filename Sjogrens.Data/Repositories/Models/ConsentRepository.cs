
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
    public class ConsentRepository : IConsentRepository
    {
        private readonly IConsentDbInterface _consentDbInterface;

        private IConsent _consent;
        public ConsentRepository()
        {

        }

        public ConsentRepository(IConsent consent, IConsentDbInterface consentDbInterface)
        {
            _consent = consent;
            _consentDbInterface = consentDbInterface;
        }
        
        public async Task<Consent> GetConsentAsync(ConsentGetParams consentGetParams)
        {
            
            if (consentGetParams == null)
                throw new ArgumentNullException(nameof(consentGetParams));

            if (string.IsNullOrWhiteSpace(consentGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserCreated));

            if (!consentGetParams.Authorised)
                throw new ArgumentException(nameof(consentGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(consentGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserOrganisationCode));

            if (consentGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.UserCdeaId));

            if (consentGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.CdeaId));

            if (consentGetParams.CdeaId != consentGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(consentGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(consentGetParams.PasId))
                throw new ArgumentNullException(nameof(consentGetParams.PasId));

            if (string.IsNullOrEmpty(consentGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(consentGetParams.OrganisationCode));

            if (consentGetParams.OrganisationCode != consentGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(consentGetParams.OrganisationCode),"Access Denied");

            try
            {
                var consent = await _consentDbInterface.GetConsentAsync(consentGetParams.PasId, consentGetParams.OrganisationCode, consentGetParams.CdeaId);
                return consent;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }
        public async Task<bool> SaveConsentAsync(ConsentPostParams consentPostParams)
        {
            if (consentPostParams == null)
                throw new ArgumentNullException(nameof(consentPostParams));

            if (string.IsNullOrWhiteSpace(consentPostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserCreated));

            if (!consentPostParams.Authorised)
                throw new ArgumentException(nameof(consentPostParams.Authorised));

            if (string.IsNullOrWhiteSpace(consentPostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserOrganisationCode));

            if (consentPostParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.UserCdeaId));

            if (consentPostParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.CdeaId));

            if (consentPostParams.CdeaId != consentPostParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(consentPostParams.PasId))
                throw new ArgumentNullException(nameof(consentPostParams.PasId));

            if (string.IsNullOrEmpty(consentPostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(consentPostParams.OrganisationCode));

            if (consentPostParams.OrganisationCode != consentPostParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(consentPostParams.OrganisationCode), "Access Denied");

            try
            {
                var result = await _consentDbInterface.SaveConsentAsync(consentPostParams.PasId, consentPostParams.OrganisationCode, consentPostParams.ConsentGiven,consentPostParams.ConsentWithdrawFutureParticipation, consentPostParams.ConsentWithdrawFutureParticipationRemoveData, consentPostParams.UserCreated, consentPostParams.CdeaId);
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
