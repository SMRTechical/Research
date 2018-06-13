

using Sjogrens.Core.Data.Interfaces.Params;
using System;
using System.ComponentModel.DataAnnotations;

namespace Sjogrens.Core.Data.Params
{
    public class PatientAddParams : IPatientAddParams, IPatientSearchParams
    {
        [Required]
        public bool Authorised { get; set; }
        [Required]
        public string UserOrganisationCode { get; set; }
        [Required]
        public int UserCdeaId { get; set; }
        [Required]
        public string PasId { get; set; }
        public int CdeaId { get; set; }
        public string DateOfBirth { get; set; }
        public string NhsNumber { get; set; }
        [Required]
        public string UserCreated { get; set; }
        public bool exists { get; set; } = false;

    }
}
