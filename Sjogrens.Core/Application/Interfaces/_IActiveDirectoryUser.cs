using Sjogrens.Core.Generic.Models;
using Sjogrens.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Application.Interfaces
{
    public interface _IActiveDirectoryUser
    {
        string FirstName { get; set; }
        string LastName { get; set; }
        string PrimaryEmail { get; set; }
        string UserName { get; set; }
        string FullName { get; set; }
        Errors Errors { get; set; }
    }
}
