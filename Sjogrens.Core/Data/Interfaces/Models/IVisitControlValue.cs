using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IVisitControlValue
    {
        int CategoryId { get; set; }
        int ControlId { get; set; }
        int ControlValueId { get; set; }
        string ControlValue { get; set; }
    }
}
