using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
    public interface IAudit
    {
        string CreatedUser { get; set; }
        DateTime? CreatedDateTime { get; set; }
        string LastUpdatedUser { get; set; }
        DateTime? LastUpdatedDateTime { get; set; }
    }
}
