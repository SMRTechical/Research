
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class UserAuditDetails : IUserAuditDetails
    {
        [Required]
        public string OrganisationCode { get; set; }
        [Required]
        public string OrganisationDescription { get; set; }
        [Required]
        public string UserCreated { get; set; }

    }
}
