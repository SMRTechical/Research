using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Application.Models.Interfaces
{
    public interface IAuthenticationResult
    {
       
        String ErrorMessage { get; set; }
        Boolean IsSuccess { get; }
    }
}
