using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{
    public interface IPatientDetailsGetParams
    {
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }

    }
}
