using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
   public interface IConsent
    {
        int Pid { get; set; }
        string PasId { get; set; }
        bool ConsentGiven { get; set; }
        DateTime? ConsentGivenDate { get; set; }
        int ConsentWithdrawFutureParticipation { get; set; }
        int ConsentWithdrawFutureParticipationRemoveData { get; set; }
        DateTime? ConsentWithdrawnDate { get; set; }

        int CdeaId { get; set; }

    }
}
