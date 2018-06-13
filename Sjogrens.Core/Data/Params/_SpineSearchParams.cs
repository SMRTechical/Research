
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class _SpineSearchParams:_ISpineSearchParams
    {
        [Required]
        public bool Authorised { get; set; }
        [Required]
        public string DateOfBirth { get; set; }
        [Required]
        public string NhsNumber { get; set; }

    }
}
