
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Interfaces.Params;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class BaselinePostParams:IBaselinePostParams, ISecurityParams
    {
        [Required]
        public string UserCreated { get; set; }
        [Required]
        public bool Authorised { get; set; }
        [Required]
        public string UserOrganisationCode { get; set; }

        [Required]
        public int UserCdeaId { get; set; }

        [Required]
        public string Token { get; set; }
        [Required]     
        public string PasId { get; set; }
        [Required]
        public string OrganisationCode { get; set; }

        [Required]
        public int CdeaId { get; set; }

        [Required]
        public PatientBaseline PatientBaseline { get; set; }

        private bool BlankInclusionCriteria()
        {
            return PatientBaseline.AttendedUHBpSSClinic == 0 && PatientBaseline.WarrantingInvestigationForpSS == 0 && PatientBaseline.PhysicianDiagnosisOfpSS == 0;
        }

        private bool BlankExclusionCriteria()
        {
            return PatientBaseline.PreviousHeadAndNeckRadiotherapy == 0 && PatientBaseline.PreviousConfirmedDiagnosis == 0;
        }

        public bool BlankBaseline()
        {
            return BlankInclusionCriteria() && BlankExclusionCriteria() && PatientBaseline.BaselineDate == null;
        }

    }
}
