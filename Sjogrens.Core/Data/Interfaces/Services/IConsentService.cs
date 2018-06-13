using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IConsentService
    {
        Task<Consent> GetConsentAsync(ConsentGetParams consentGetParams);     
        Task<bool> SaveConsentAsync(ConsentPostParams consentPostParams);
    }
}
