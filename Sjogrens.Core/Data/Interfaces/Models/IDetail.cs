using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IDetail
    {
        int VisitHeaderId { get; set; }
        int CategoryId { get; set; }
        int ControlId { get; set; }
        string Value { get; set; }
        string CreatedUser { get; set; }
        DateTime? CreatedDateTime { get; set; }
        string LastUpdatedUser { get; set; }
        DateTime? LastUpdatedDateTime { get; set; }


    }
}
