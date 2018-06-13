
using Sjogrens.Core.Data.Interfaces.Models;
using System;

namespace Sjogrens.Core.Data.Models
{
    public class PatientOrg:IPatientOrg
    {
        public int Pid { get; set; }
        public string PasId { get; set; }
        public string OrganisationCode { get; set; }
        public int CdeaId { get; set; }
    }
}
