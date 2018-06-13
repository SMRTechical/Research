using Insight.Database;
using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.DbInterfaces
{
    public interface IPatientDbInterface
    {
        
        [Sql("SearchPatients")]
        Task<IEnumerable<Patient>> SearchPatientsAsync(string OrganisationCode, bool Authorised, string PasId, string NhsNumber, string LastName, string FirstName, string DateOfBirth,string PostCode, bool searchAllTrusts, int CdeaId);

        [Sql("GetPatientDetails")]
        Task<Patient> GetPatientDetailsAsync(string PasId, string OrganisationCode, int CdeaId);


        [Sql("GetPatientBaseline")]
        Task<PatientBaseline> GetPatientBaselineAsync(string PasId, string OrganisationCode, int CdeaId);


        [Sql("UpsertPatientBaseline")]
        Task<bool> SavePatientBaselineAsync(string PasId, string OrganisationCode,int CdeaId, PatientBaseline patientBaseline, string UserCreated);

        //[Sql("UpsertPatient")]
        //Task<bool> UpdatePatientAsync(string PasId, string OrganisationCode, bool ConsentGiven, string UserName);

        //[Sql("InsertPatient")]
        //Task<bool> InsertPatientAsync(string PasId, string OrganisationCode, bool ConsentGiven,  string UserName);


    }
}
