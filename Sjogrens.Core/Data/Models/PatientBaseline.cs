
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Models
{
    public class PatientBaseline : IPatientBaseline, IAudit
    {
        public DateTime BaselineDate { get; set; }
        public int AttendedUHBpSSClinic { get; set; }
        public int WarrantingInvestigationForpSS { get; set; }
        public int PhysicianDiagnosisOfpSS { get; set; }
        public int PreviousHeadAndNeckRadiotherapy { get; set; }
        public int PreviousConfirmedDiagnosis { get; set; }
        public string CreatedUser { get; set; }
        public DateTime? CreatedDateTime { get; set; }
        public string LastUpdatedUser { get; set; }
        public DateTime? LastUpdatedDateTime { get; set; }

        public int CdeaId { get; set; }

    }
}
