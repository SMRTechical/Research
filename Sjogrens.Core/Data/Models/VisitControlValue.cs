using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class VisitControlValue : IVisitControlValue
    {
        public int CategoryId { get; set; }
        public int ControlId { get; set; }
        public int ControlValueId { get; set; }
        public string ControlValue { get; set; }

    }
}
