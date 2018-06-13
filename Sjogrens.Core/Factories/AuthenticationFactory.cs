using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sjogrens.Core.Authentication
{
    public static class AuthenticationFactory
    {
       public const String ApplicationCookie = "CDEAAuthenticationType";
        public const string CookieName = "CDEAAuthCookie";
        public static TimeSpan ExpireTimeSpan = TimeSpan.FromHours(1);
        public static bool CookieHttpOnly = true;
    }

}