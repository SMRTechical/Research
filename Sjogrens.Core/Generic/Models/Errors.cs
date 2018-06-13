using Sjogrens.Core.Generic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sjogrens.Core.Generic.Models
{
    public class Errors :IErrors
    {
        public Errors()
        {
            ErrorList = new List<string>();
        }
        public bool Success { get; set; }
        public string ErrorView { get; set; }
        public List<string> ErrorList { get; set; }

    }
}