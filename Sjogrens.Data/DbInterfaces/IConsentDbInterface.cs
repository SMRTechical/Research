using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IConsentDbInterface
    {   
        [Sql("GetConsent")]
        Task<Consent> GetConsentAsync(string PasId, string OrganisationCode, int CdeaId);

        [Sql("UpsertConsent")]
        Task<bool> SaveConsentAsync(string PasId, string OrganisationCode, bool ConsentGiven, int ConsentWithdrawFutureParticipation, int ConsentWithdrawFutureParticipationRemoveData,   string UserCreated, int CdeaId);

    }
}
