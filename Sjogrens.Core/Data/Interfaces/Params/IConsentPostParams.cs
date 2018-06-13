using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{
    public interface IConsentPostParams
    {
        //string UserCreated { get; set; }
        //bool Authorised { get; set; }
        string PasId { get; set; }
        //string UserOrganisationCode { get; set; }
        //int UserCdeaId { get; set; }
        bool ConsentGiven { get; set; }
        int ConsentWithdrawFutureParticipation { get; set; }
        int ConsentWithdrawFutureParticipationRemoveData { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }

    }
}
