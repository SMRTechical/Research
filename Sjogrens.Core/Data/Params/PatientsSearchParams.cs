
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Params
{
    public class PatientsSearchParams:IPatientsSearchParams
    {
        [Required]
        public bool Authorised { get; set; }
        [Required]
        public string UserOrganisationCode { get; set; }
        [Required]
        public int UserCdeaId { get; set; }
        public bool SearchAllTrusts { get; set; } = false;
        public string PasId { get; set; }
        public string NhsNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string PostCode { get; set; }
        [Required]
        public int CdeaId { get; set; }

    }
}
