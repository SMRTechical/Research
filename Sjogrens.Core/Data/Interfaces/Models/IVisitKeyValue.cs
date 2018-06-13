using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IVisitKeyValue
    {
        int VisitHeaderId { get; set; }
        int CategoryId { get; set; }
        int SectionId { get; set; }
        string Key { get; set; }
        string Value { get; set; }
        string CreatedUser { get; set; }
        DateTime? CreatedDateTime { get; set; }
        string LastUpdatedUser { get; set; }
        DateTime? LastUpdatedDateTime { get; set; }


    }
}
