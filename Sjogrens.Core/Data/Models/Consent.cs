
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;

namespace Sjogrens.Core.Data.Models
{
    public class Consent:IConsent, IAudit
    {
        public int Pid { get; set; }
        public string PasId { get; set; }
        public string OrganisationCode { get; set; }
        public bool ConsentGiven { get; set; }
        public DateTime? ConsentGivenDate { get; set; }
        public int ConsentWithdrawFutureParticipation { get; set; }
        public int ConsentWithdrawFutureParticipationRemoveData { get; set; }
        public DateTime? ConsentWithdrawnDate { get; set; }

        public int CdeaId { get; set; }

        public string CreatedUser { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string LastUpdatedUser { get; set; }
        public DateTime? LastUpdatedDateTime { get; set; }
    }
}
