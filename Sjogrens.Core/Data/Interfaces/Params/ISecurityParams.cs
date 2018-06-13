using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{ 
    public interface ISecurityParams 
    {
        string UserCreated { get; set; }
        bool Authorised { get; set; }
        string UserOrganisationCode { get; set; }
        int UserCdeaId { get; set; }
        string Token { get; set; }
    }
}
