using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IUserAuditDetails
    {
        string OrganisationCode { get; set; }
        string OrganisationDescription { get; set; }
        string UserCreated { get; set; }

    }
}
