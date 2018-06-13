using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Interfaces.Params;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Params
{
    public class PatientSearchParams : IPatientSearchParams
    {
        [Required]
        public bool Authorised { get; set; }
        [Required]
        public string UserOrganisationCode { get; set; }
        [Required]
        public int UserCdeaId { get; set; }
        public string PasId { get; set; }
        public string DateOfBirth { get; set; }
        public string NhsNumber { get; set; }
        [Required]
        public int CdeaId { get; set; }
    }
}
