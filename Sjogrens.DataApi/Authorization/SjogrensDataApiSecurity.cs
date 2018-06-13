using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
namespace Sjogrens.DataApi.Authorization
{
    public class SjogrensDataApiSecurity
    {
        public static bool Login(string username, string password)
        {
           string  _username = ConfigurationManager.AppSettings["Username"].ToString();
           string _password = ConfigurationManager.AppSettings["Password"].ToString();

            return _username == username && _password == password;

        }

    }
}