
using Sjogrens.Core.Application.Interfaces;
using Sjogrens.Core.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sjogrens.Core.Models
{
    public class _UHBActiveDirectoryUser: _ActiveDirectoryUser
    {
        public _UHBActiveDirectoryUser():base()
        {

        }

        public string OrganisationCode => "RRK";
        public string OrganisationDescription => "University Hospitals Birmingham Nhs Foundation Trust";
        public string ActiveInactive => "A";
        public bool Authorised => true;
        public string Access => "Update";
    }
}