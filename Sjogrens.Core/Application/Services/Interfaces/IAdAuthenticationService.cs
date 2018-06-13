using Microsoft.Owin.Security;
using Sjogrens.Core.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Sjogrens;
using Sjogrens.Core.Authentication;
using System.Web;
using Microsoft.AspNet.Identity;
using Sjogrens.Core.Application.Models;
using Sjogrens.Core.Application.Models.Interfaces;

namespace Sjogrens.Core.Application.Services.Interfaces
{
    public interface IAdAuthenticationService
    {
         UserPrincipal UserPrincipal { get; set; }
        IAuthenticationResult SignIn(String username, String password);
        Task<IAuthenticationResult> SignInAsync(String username, String password);
    }
}
