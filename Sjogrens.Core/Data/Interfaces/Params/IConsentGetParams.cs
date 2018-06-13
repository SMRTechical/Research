using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{
    public interface IConsentGetParams
    {
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
    }
}
