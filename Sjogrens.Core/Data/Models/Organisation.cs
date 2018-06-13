
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class Organisation :IOrganisation
    {
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
