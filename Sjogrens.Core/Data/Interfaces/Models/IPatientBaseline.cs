using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Models
{
    public interface IPatientBaseline
    {
        DateTime BaselineDate { get; set; }   
        int AttendedUHBpSSClinic { get; set; }
        int WarrantingInvestigationForpSS { get; set; }
        int PhysicianDiagnosisOfpSS { get; set; }
        int PreviousHeadAndNeckRadiotherapy { get; set; }
        int PreviousConfirmedDiagnosis { get; set; }
        int CdeaId { get; set; }
    }
}
