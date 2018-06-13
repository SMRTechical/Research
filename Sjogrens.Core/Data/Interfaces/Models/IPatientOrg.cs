using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
   public interface IPatientOrg
    {

        int Pid { get; set; }
        string PasId { get; set; }
        string OrganisationCode { get; set; }
        int CdeaId { get; set; }
    }
}
