using Sjogrens.Core.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Application.Services.Interfaces
{
    public interface _IActiveDirectoryService
    {
        string ADInclusionGroup { get; set; }
        bool TechDevAccess { get; set; }
         Task<bool> IsUserActiveAsync(string userName, string password);
        Task<_IActiveDirectoryUser> AuthenticateAsync(string userName, string password);
    }
}
