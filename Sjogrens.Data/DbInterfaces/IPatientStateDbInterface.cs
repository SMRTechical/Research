using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IPatientStateDbInterface
    {
        [Sql("GetPatientState")]
        [Recordset(1, typeof(VisitHeader), IsChild = true)]
        Task<PatientState> GetPatientStateAsync(string PasId, string OrganisationCode, int CdeaId);

       

    }
}
