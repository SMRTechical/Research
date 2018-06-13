

using Sjogrens.Core.Generic.Models;
using Sjogrens.Core.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sjogrens.Core.Application.Models
{
    public abstract class _ActiveDirectoryUser : _IActiveDirectoryUser
    {
        public _ActiveDirectoryUser()
        {
            Errors = new Errors();
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string PrimaryEmail { get; set; }
        public string FullName { get; set; }
        public Errors Errors { get; set; }
    }
}