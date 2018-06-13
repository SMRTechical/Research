
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjogrens.Core.Factories;
using Sjorgens.Core.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services
{
    public class PatientService : IPatientService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public PatientService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<Patient> SearchPatientAsync(PatientSearchParams patientSearchParams)
        {

            if (patientSearchParams == null)
                throw new ArgumentNullException(nameof(patientSearchParams));

            if (!patientSearchParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.Authorised));

            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserOrganisationCode));

            if (patientSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId));

            if (patientSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId));

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId), "Access Denied");

            var uri = new HttpClientUriBuilder($"patient/search");

            var response = await _dataApiHttpService.PostAsync<PatientSearchParams, Patient>(uri, patientSearchParams);
            return response.Success ? response.Data : null;

        }

        public async Task<Patient> CheckMITPatientAsync(PatientSearchParams patientSearchParams)
        {

            if (patientSearchParams == null)
                throw new ArgumentNullException(nameof(patientSearchParams));

            if (!patientSearchParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.Authorised));

            if (string.IsNullOrEmpty(patientSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserOrganisationCode));

            if (patientSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId));

            if (patientSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId));

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId), "Access Denied");

            var uri = new HttpClientUriBuilder($"mitpatient/Check");

            var response = await _dataApiHttpService.PostAsync<PatientSearchParams, Patient>(uri, patientSearchParams);
            return response.Success ? response.Data : null;

        }

        public async Task<Patient> SearchSpineAsync(PatientSearchParams patientSearchParams)
        {

            if (patientSearchParams == null)
                throw new ArgumentNullException(nameof(patientSearchParams));

            if (!patientSearchParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.Authorised));

            if (string.IsNullOrWhiteSpace(patientSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserOrganisationCode));

            if (patientSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId));

            if (patientSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId));

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientSearchParams.DateOfBirth))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.DateOfBirth));

            if (string.IsNullOrWhiteSpace(patientSearchParams.NhsNumber))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.NhsNumber));

            var uri = new HttpClientUriBuilder($"patient/spine/search");

            var response = await _dataApiHttpService.PostAsync<PatientSearchParams, Patient>(uri, patientSearchParams);
            return response.Success ? response.Data : null;

        }

        public async Task<IEnumerable<Patient>> SearchPatientsAsync(PatientsSearchParams patientsSearchParams)
        {
            if (patientsSearchParams == null)
                throw new ArgumentNullException(nameof(patientsSearchParams));

            if (!patientsSearchParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.Authorised));

            if (string.IsNullOrEmpty(patientsSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.UserOrganisationCode));

            if (patientsSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.UserCdeaId));

            if (patientsSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.CdeaId));

            if (patientsSearchParams.CdeaId != patientsSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientsSearchParams.PasId) &&
               string.IsNullOrEmpty(patientsSearchParams.NhsNumber) &&
               string.IsNullOrEmpty(patientsSearchParams.FirstName) &&
               string.IsNullOrEmpty(patientsSearchParams.LastName) &&
               string.IsNullOrEmpty(patientsSearchParams.DateOfBirth) &&
               string.IsNullOrEmpty(patientsSearchParams.PostCode)
               )
                throw new ArgumentNullException(nameof(patientsSearchParams));

            var uri = new HttpClientUriBuilder($"patients/search");

            var response = await _dataApiHttpService.PostAsync<PatientsSearchParams, IEnumerable<Patient>>(uri, patientsSearchParams);
            return response.Success ? response.Data : Enumerable.Empty<Patient>();
        }

        public async Task<Patient> GetPatientDetailsAsync(PatientDetailsGetParams patientDetailsGetParams)
        {
            if (patientDetailsGetParams == null)
                throw new ArgumentNullException(nameof(patientDetailsGetParams));

            if (string.IsNullOrEmpty(patientDetailsGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserCreated));

            if (!patientDetailsGetParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.Authorised));

            if (string.IsNullOrEmpty(patientDetailsGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserOrganisationCode));

            if (patientDetailsGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserCdeaId));

            if (patientDetailsGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.CdeaId));

            if (patientDetailsGetParams.CdeaId != patientDetailsGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientDetailsGetParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.PasId));

            if (string.IsNullOrEmpty(patientDetailsGetParams.OrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.OrganisationCode));

            if (patientDetailsGetParams.OrganisationCode != patientDetailsGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.OrganisationCode), "Access Denied");

            var uri = new HttpClientUriBuilder($"patient/details");

            var response = await _dataApiHttpService.PostAsync<PatientDetailsGetParams, Patient>(uri, patientDetailsGetParams);
            return response.Success ? response.Data : null;
        }

        public async Task<PatientBaseline> GetPatientBaselineAsync(BaselineGetParams baselineGetParams)
        {
            if (baselineGetParams == null)
                throw new ArgumentNullException(nameof(baselineGetParams));

            if (string.IsNullOrEmpty(baselineGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserCreated));

            if (!baselineGetParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.Authorised));

            if (string.IsNullOrEmpty(baselineGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserOrganisationCode));

            if (baselineGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.CdeaId));

            if (string.IsNullOrEmpty(baselineGetParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.PasId));

            if (string.IsNullOrEmpty(baselineGetParams.OrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.OrganisationCode));

            var uri = new HttpClientUriBuilder($"patient/baseline");

            var response = await _dataApiHttpService.PostAsync<BaselineGetParams, PatientBaseline>(uri, baselineGetParams);
            return response.Success ? response.Data : null;
        }

        public async Task<bool> SavePatientBaselineAsync(BaselinePostParams baselinePostParams)
        {
            if (baselinePostParams == null)
                throw new ArgumentNullException(nameof(baselinePostParams));

            if (string.IsNullOrEmpty(baselinePostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserCreated));

            if (!baselinePostParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.Authorised));

            if (string.IsNullOrEmpty(baselinePostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserOrganisationCode));

            if (baselinePostParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserCdeaId));

            if (baselinePostParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.CdeaId));

            if (baselinePostParams.CdeaId != baselinePostParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(baselinePostParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.PasId));

            if (string.IsNullOrEmpty(baselinePostParams.OrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.OrganisationCode));

            if (baselinePostParams.OrganisationCode != baselinePostParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.OrganisationCode), "Access Denied");

            if (baselinePostParams.PatientBaseline == null)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.PatientBaseline));

            if (baselinePostParams.BlankBaseline())
                throw new ArgumentNullException(nameof(baselinePostParams.PatientBaseline), "Baseline required");

            var uri = new HttpClientUriBuilder($"patient/baseline/save");

            var response = await _dataApiHttpService.PostAsync<BaselinePostParams, bool>(uri, baselinePostParams);
            return response.Success ? response.Data : false;
        }

        public async Task<PatientOrg> SaveSpineAsync(PatientAddParams patientAddParams)
        {

            if (patientAddParams == null)
                throw new ArgumentNullException(nameof(patientAddParams));

            if (!patientAddParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.Authorised));


            if (patientAddParams.exists)
                if (string.IsNullOrEmpty(patientAddParams.PasId))
                    throw new ArgumentOutOfRangeException(nameof(patientAddParams.PasId));

            if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.UserOrganisationCode));

            if (patientAddParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.CdeaId));

            if (patientAddParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.UserCdeaId));

            if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientAddParams.NhsNumber))
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.NhsNumber));

            if (string.IsNullOrEmpty(patientAddParams.DateOfBirth))
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.DateOfBirth));

            if (!DateTimeFactory.IsValidDateTosql(patientAddParams.DateOfBirth))
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.DateOfBirth), "Date format in incorrect");

            if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(patientAddParams.UserCreated));

            var uri = new HttpClientUriBuilder($"patient/spine/save");

            var response = await _dataApiHttpService.PostAsync<PatientAddParams, PatientOrg>(uri, patientAddParams);
            return response.Success ? response.Data : null;

        }

        public async Task<PatientOrg> SaveMITPatientAsync(PatientAddParams patientAddParams)
        {
            try
            {
                if (patientAddParams == null)
                {
                    var ex1 = new ArgumentNullException(nameof(patientAddParams));

                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;
                }
                if (!patientAddParams.Authorised)
                {
                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.Authorised));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;
                }
                if (string.IsNullOrEmpty(patientAddParams.PasId))
                {

                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.PasId));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;

                }

                if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                {
                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.UserOrganisationCode));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;
                    //throw new ArgumentOutOfRangeException(nameof(patientAddParams.UserOrganisationCode));
                }
                if (patientAddParams.CdeaId <= 0)
                {

                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.CdeaId));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;

                  
                }
                if (patientAddParams.UserCdeaId <= 0)
                {
                    
                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.UserCdeaId));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;

                }

                if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                {
                 

                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.CdeaId), "Access Denied");
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;
                }
                if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                {
                  
                    var ex1 = new ArgumentOutOfRangeException(nameof(patientAddParams.UserCreated));
                    Elmah.ErrorSignal.FromCurrentContext().Raise(ex1);

                    throw ex1;
                }

                var ex11 = new Exception("uri before mitpatient/Save");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex11);
                

                var uri = new HttpClientUriBuilder($"mitpatient/Save");

                var ex12 = new Exception("uri after mitpatient/Save");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex12);


                
                var response = await _dataApiHttpService.PostAsync<PatientAddParams, PatientOrg>(uri, patientAddParams);


                var ex13 = new ArgumentOutOfRangeException("uri mitpatient/Save response");
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex13);

                return response.Success ? response.Data : null;
            }
            catch (Exception ex)
            {
                Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

                return null;
            }

        }


    }
}
