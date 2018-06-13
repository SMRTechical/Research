using Sjogrens.Core.Application.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Application.Models
{
    public class AuthenticationResult: IAuthenticationResult
    {
        //public AuthenticationResult(string errorMessage = null)
        //{
        //    ErrorMessage = errorMessage;
        //}

        public AuthenticationResult()
        {
        }

        public String ErrorMessage { get;  set; }
        public Boolean IsSuccess => String.IsNullOrEmpty(ErrorMessage);
    }
}
