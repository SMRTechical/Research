using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IOrganisation
    {
        string Code { get; set; }
        string Description { get; set; }
    }
}
