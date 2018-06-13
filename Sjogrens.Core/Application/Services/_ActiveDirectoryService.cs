using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.DirectoryServices;
using Sjogrens.Core.Models;
using System.Configuration;
using System.Collections;
using System.Security.Claims;
using Sjogrens.Core.Application.Services.Interfaces;
using Sjogrens.Core.Application.Interfaces;
using System.Threading.Tasks;

namespace Sjogrens.Core.Application.Services
{
    public class _ActiveDirectoryService: _IActiveDirectoryService
    {
       
        public _ActiveDirectoryService()
        {
            _activeDirectoryUser = new _UHBActiveDirectoryUser();
        }

        // Correct
        public const string ItTechnicalDevelopment = "IT TECHNICAL DEVELOPMENT";


        private _IActiveDirectoryUser _activeDirectoryUser;

        public string ADInclusionGroup { get; set; }
        public bool TechDevAccess { get; set; }

        public async Task<_IActiveDirectoryUser> AuthenticateAsync(string userName, string password)
        {

            bool success = false;

            bool active = false;

            active =  await IsUserActiveAsync(userName, password);

            if (!active)
            {
                _activeDirectoryUser.Errors.Success = false;
                _activeDirectoryUser.Errors.ErrorList.Add("Incorrect login credentials.  Please try again");
            }
            else
            {
                string currentUser = userName;
                //if currentUser starts with \ ignore the \
                currentUser = currentUser.StartsWith("\\") ? currentUser.Substring(1) : currentUser;
               // string ADInclusionGroup = ADInclusionGroup;
              //  bool TechDevAccess = TechDevAccess;
               // bool.TryParse(ADInclusionGroup, out TechDevAccess);
                var adsRoot = new DirectoryEntry("LDAP://xUHB.nhs.uk");
                DirectorySearcher adsSearch = new DirectorySearcher(adsRoot);

                try
                {
                    // string group = string.Empty;
                    bool NotAuthorisedList = false;
                    bool AuthorisedList = false;
                    SearchResult groupResult;

                    //We'll load the filter with the items we want to fetch,
                    adsSearch.PropertiesToLoad.Add("sAMAccountName");
                    adsSearch.PropertiesToLoad.Add("memberof");
                    adsSearch.PropertiesToLoad.Add("cn");
                    adsSearch.PropertiesToLoad.Add("givenname");
                    adsSearch.PropertiesToLoad.Add("sn");
                    adsSearch.PropertiesToLoad.Add("FullName");
                    adsSearch.PropertiesToLoad.Add("userPassword");
                    adsSearch.PropertiesToLoad.Add("mail");
                    adsSearch.Filter = $"sAMAccountName= {currentUser}";

                    groupResult = adsSearch.FindOne();

                    if (string.IsNullOrEmpty(ADInclusionGroup) || ADInclusionGroup == null)
                    {
                        // Response.Redirect("~/NotAuthorised.aspx", False);
                        _activeDirectoryUser.Errors.Success = false;
                        _activeDirectoryUser.Errors.ErrorView = "NotAuthorised";
                    }
                    else
                    {
                        if (TechDevAccess)
                        {
                            foreach (string group in (IEnumerable)groupResult.GetDirectoryEntry().Properties["memberof"].Value)
                            {
                                if (group.ToUpper().Contains(ADInclusionGroup.ToUpper()) || TechDevAccess && group.ToUpper().Contains(ItTechnicalDevelopment))
                                {
                                    AuthorisedList = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (AuthorisedList && (NotAuthorisedList == false))
                    {
                        _activeDirectoryUser.FirstName = groupResult.GetDirectoryEntry().Properties["givenname"].Value.ToString();
                        _activeDirectoryUser.LastName = groupResult.GetDirectoryEntry().Properties["sn"].Value.ToString();
                        _activeDirectoryUser.UserName = groupResult.GetDirectoryEntry().Properties["sAMAccountName"].Value.ToString();
                        _activeDirectoryUser.PrimaryEmail = groupResult.GetDirectoryEntry().Properties["mail"].Value.ToString();
                        _activeDirectoryUser.FullName = groupResult.GetDirectoryEntry().Properties["Name"].Value.ToString();
                    }
                    else
                    {
                        _activeDirectoryUser.Errors.Success = false;
                        _activeDirectoryUser.Errors.ErrorView = "NotAuthorised";
                    }

                }
                catch
                {
                    _activeDirectoryUser.Errors.Success = false;
                    _activeDirectoryUser.Errors.ErrorList.Add("Incorrect login credentials.  Please try again");
                }
            }

            _activeDirectoryUser.Errors.Success = true;
            return _activeDirectoryUser;
        }


        public Task<bool> IsUserActiveAsync(string userName, string password)
        {
            return Task.Run(() =>
            {
                bool success = false;

                var entry = new DirectoryEntry("LDAP://xUHB.nhs.uk", "UHB\\" + userName.ToUpper().Replace("UHB\\", ""), password);

                var searcher = new DirectorySearcher(entry);

                searcher.Asynchronous = true;
                searcher.SearchScope = SearchScope.OneLevel;
                searcher.PropertiesToLoad.Add("userAccountControl");
                try
                {
                    SearchResult results = searcher.FindOne();
                    success = !(results == null);
                }
                catch (Exception ex)
                {
                    return success = false;
                }

                return success;
            });
        }

    }
}