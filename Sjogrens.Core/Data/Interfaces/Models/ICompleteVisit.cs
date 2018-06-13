using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
   public interface ICompleteVisit
    {
         List<Visit> Visits { get; set; }
         List<Detail> Details { get; set; }
    }
}
