using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface _ISpineSearchParams
    {
        bool Authorised { get; set; }
        string DateOfBirth { get; set; }
        string NhsNumber { get; set; }

    }
}
