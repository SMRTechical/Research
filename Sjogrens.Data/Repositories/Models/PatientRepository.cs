
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Data.DbInterfaces;
using Sjogrens.Core.Factories;
using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Params;
using Elmah;

namespace Sjogrens.Data.Repositories.Models
{
    public class PatientRepository : IPatientRepository
    {
        private readonly IPatientDbInterface _patientDbInterface;

        private IPatient _patient;
        private IMITPatient _mitpatient;
        public PatientRepository()
        {

        }

        public PatientRepository(IPatient patient, IMITPatient mitpatient, IPatientDbInterface patientDbInterface)
        {
            _patient = patient;
            _mitpatient = mitpatient;
            _patientDbInterface = patientDbInterface;
        }

        public async Task<IPatient> SearchPatientAsync(PatientSearchParams patientSearchParams)
        {
            if (patientSearchParams == null)
                throw new ArgumentNullException(nameof(patientSearchParams));

            if (!patientSearchParams.Authorised)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.Authorised));

            if (string.IsNullOrEmpty(patientSearchParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.PasId));

            if (string.IsNullOrWhiteSpace(patientSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserOrganisationCode));

            if (patientSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId));

            if (patientSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId));

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId),"Access Denied");

            SqlConnection con = null;
            SqlCommand cmd = new SqlCommand();
            try
            {
                 con = new SqlConnection(ConfigurationManager.ConnectionStrings["Sjogrens"].ToString());
                con.Open();
               // SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "SearchPatient";
                cmd.Parameters.Add("@OrganisationCode", SqlDbType.VarChar, 10).Value = patientSearchParams.UserOrganisationCode;
                cmd.Parameters.Add("@Authorized", SqlDbType.Bit).Value = patientSearchParams.Authorised;
                cmd.Parameters.Add("@PasId", SqlDbType.VarChar, 10).Value = patientSearchParams.PasId;
                cmd.Parameters.Add("@NhsNumber", SqlDbType.VarChar, 10).Value = patientSearchParams.NhsNumber;
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.VarChar, 10).Value = patientSearchParams.DateOfBirth;
                cmd.Parameters.Add("@CdeaId", SqlDbType.Int).Value = patientSearchParams.CdeaId;
                cmd.Connection = con;
                SqlDataReader dr;
                dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);
                if (dr.HasRows)
                {
                    dr.Read();
                    int pid = 0;
                    int cdeaId = 0;
                    int.TryParse(dr["Pid"].ToString(), out pid);
                    int.TryParse(dr["CdeaId"].ToString(), out cdeaId);
                    _patient.Pid = pid;
                    _patient.PasId = dr["PasID"].ToString().Trim();
                    _patient.NhsNumber = dr["NhsNumber"].ToString();
                    _patient.FirstName = dr["FirstName"].ToString();
                    _patient.LastName = dr["Lastname"].ToString();
                    _patient.DateOfBirth = DateTimeFactory.ConvertStringToDate(DateTimeFactory.ConvertDate((dr["DateOfBirth"].ToString()), ""));
                    _patient.Gender = dr["Gender"].ToString();
                    _patient.Address1 = dr["Address1"].ToString();
                    _patient.Address2 = dr["Address2"].ToString();
                    _patient.Address3 = dr["Address3"].ToString();
                    _patient.Address4 = dr["Address4"].ToString();
                    _patient.Telephone = dr["Telephone"].ToString();
                    _patient.PostCode = dr["PostCode"].ToString();
                    _patient.OrganisationCode = dr["OrganisationCode"].ToString();
                    _patient.CdeaId = cdeaId;

                 

                    return _patient;

                }
                else
                {
                   
                    return null;
                }

               
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
            finally
            {
               // dr.Close();
                cmd = null;
                con.Close();
            }

        }

        public async Task<IPatient> CheckMITPatientAsync(PatientSearchParams patientSearchParams)
        {

            if (patientSearchParams == null)
                throw new ArgumentNullException(nameof(patientSearchParams));

            if (!patientSearchParams.Authorised)
                throw new ArgumentException(nameof(patientSearchParams.Authorised));

            if (string.IsNullOrWhiteSpace(patientSearchParams.PasId))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.PasId));

            if (string.IsNullOrWhiteSpace(patientSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserOrganisationCode));

            if (patientSearchParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId)); ;

            if (patientSearchParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.CdeaId));

            if (patientSearchParams.CdeaId != patientSearchParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.UserCdeaId), "Access Denied");

            SqlConnection con = null;
            SqlCommand cmd = new SqlCommand();

            try
            {
                con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnMIT"].ToString());
                con.Open();
               // SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_GetPatient_webservice";
                SqlParameter param = new SqlParameter("@PASID", SqlDbType.VarChar, 10);
                param.Value = patientSearchParams.PasId;
                cmd.Parameters.Add(param);
                cmd.Connection = con;
                SqlDataReader dr;
                dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);
                if (dr.HasRows)
                {
                    dr.Read();

                    String PasID = dr["PasID"].ToString();
                    if (PasID.IndexOf("/") > 0)
                        PasID = PasID.Substring(0, PasID.IndexOf("/"));

                    _mitpatient.PasId = PasID.Trim();
                    _mitpatient.NhsNumber = dr["NhsNumber"].ToString();
                    _mitpatient.FirstName = dr["Forename_1"].ToString();
                    _mitpatient.LastName = dr["Surname"].ToString();
                    _mitpatient.Dob = DateTimeFactory.ConvertDate((dr["DOB"].ToString()), "yyyyMMdd");
                    _mitpatient.PostCode = dr["Postcode"].ToString();
                    _mitpatient.Gender = dr["Gender"].ToString();

                    //Convert to Patient

                    _patient.PasId = _mitpatient.PasId;
                    _patient.NhsNumber = _mitpatient.NhsNumber;
                    _patient.FirstName = _mitpatient.FirstName;
                    _patient.LastName = _mitpatient.LastName;
                    //_patient.Dob = _mitpatient.Dob;
                    _patient.DateOfBirth = DateTimeFactory.ConvertStringToDate(_mitpatient.Dob.ToString());
                    // _patient.Dob = DateTime.Parse(_mitpatient.Dob.ToString());
                    _patient.PostCode = _mitpatient.PostCode;
                    _patient.Gender = _mitpatient.Gender;

                    return _patient;
                }
                else
                {
                    //_mitpatient = null;
                    //_patient = null;
                    return null;
                }


                //dr.Close();
                //cmd = null;
                //con.Close();
               // return _patient;
            }
            catch (Exception ex)
            {

                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
            finally
            {
               // dr.Close();
                cmd = null;
                con.Close();
            }
        }

        public async Task<IPatient> SearchSpineAsync(IPatientSearchParams patientSearchParams)
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

            if (string.IsNullOrEmpty(patientSearchParams.NhsNumber))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.NhsNumber));

            if (string.IsNullOrEmpty(patientSearchParams.DateOfBirth))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.DateOfBirth));

            if (!DateTimeFactory.IsValidDateTosql(patientSearchParams.DateOfBirth))
                throw new ArgumentOutOfRangeException(nameof(patientSearchParams.DateOfBirth),"Date of birth format is incorrect");

            try
            {

                MiniSpine.clsMiniSpinePatient spinePatient = await Task.Run(() => SpineFactory.SearchSpine(patientSearchParams));

                if (spinePatient != null)
                {

                    _patient.NhsNumber = spinePatient.nhsNumber;
                    _patient.FirstName = spinePatient.forename;
                    _patient.LastName = spinePatient.surname;
                    _patient.MiddleName = spinePatient.middlename;
                    _patient.DateOfBirth = spinePatient.dob;
                    _patient.Address1 = spinePatient.address1;
                    _patient.Address2 = spinePatient.address2;
                    _patient.Address3 = spinePatient.address3;
                    _patient.Address4 = spinePatient.address4;
                    _patient.Address5 = spinePatient.address5;
                    _patient.PostCode = spinePatient.postcode;
                    _patient.Telephone = spinePatient.telephone;
                    _patient.Gender = spinePatient.gender == "1" ? "M" : spinePatient.gender == "2" ? "F" : "";
                    _patient.GpPracticeName = spinePatient.gpPracticeName;
                    _patient.GpAddress1 = spinePatient.gpAddress1;
                    _patient.GpAddress2 = spinePatient.gpAddress2;
                    _patient.GpAddress3 = spinePatient.gpAddress3;
                    _patient.GpAddress4 = spinePatient.gpAddress4;
                    _patient.GpAddress5 = spinePatient.gpAddress5;
                    _patient.GpPostcode = spinePatient.gpPostcode;
                    _patient.GpTelephone = spinePatient.gpTelephone;
                    _patient.Errors = spinePatient.errors;

                    return _patient;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;

            }

        }

        public async Task<IEnumerable<Patient>> SearchPatientsAsync(PatientsSearchParams patientsSearchParams)
        {
            if (patientsSearchParams == null)
                throw new ArgumentNullException(nameof(patientsSearchParams));

            if (!patientsSearchParams.Authorised)
                throw new ArgumentException(nameof(patientsSearchParams.Authorised));

            if (string.IsNullOrWhiteSpace(patientsSearchParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientsSearchParams.UserOrganisationCode));

            if (patientsSearchParams.UserCdeaId <= 0)
                throw new ArgumentException(nameof(patientsSearchParams.UserCdeaId));

            if (patientsSearchParams.CdeaId <= 0)
                throw new ArgumentException(nameof(patientsSearchParams.CdeaId));

            if (patientsSearchParams.CdeaId != patientsSearchParams.UserCdeaId)
                throw new ArgumentException(nameof(patientsSearchParams.CdeaId),"Access Denied");
            

            if (string.IsNullOrEmpty(patientsSearchParams.PasId) &&
               string.IsNullOrEmpty(patientsSearchParams.NhsNumber) &&
               string.IsNullOrEmpty(patientsSearchParams.FirstName) &&
               string.IsNullOrEmpty(patientsSearchParams.LastName) &&
               string.IsNullOrEmpty(patientsSearchParams.DateOfBirth) &&
               string.IsNullOrEmpty(patientsSearchParams.PostCode)
               )
                throw new ArgumentNullException("Search Criteria");


            try
            {

                var patients = await _patientDbInterface.SearchPatientsAsync(patientsSearchParams.UserOrganisationCode, patientsSearchParams.Authorised, patientsSearchParams.PasId,
                                                        patientsSearchParams.NhsNumber, patientsSearchParams.LastName, patientsSearchParams.FirstName, patientsSearchParams.DateOfBirth,
                                                        patientsSearchParams.PostCode, patientsSearchParams.SearchAllTrusts, patientsSearchParams.CdeaId);
                return patients;

            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }

         
        }

        public async Task<Patient> GetPatientDetailsAsync(PatientDetailsGetParams patientDetailsGetParams)
        {
            if (patientDetailsGetParams == null)
                throw new ArgumentNullException(nameof(patientDetailsGetParams));

            if (string.IsNullOrWhiteSpace(patientDetailsGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserCreated));

            if (!patientDetailsGetParams.Authorised)
                throw new ArgumentException(nameof(patientDetailsGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(patientDetailsGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserOrganisationCode));

            if (patientDetailsGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.UserCdeaId));

            if (patientDetailsGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.CdeaId));

            if (patientDetailsGetParams.CdeaId != patientDetailsGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(patientDetailsGetParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(patientDetailsGetParams.PasId))
                throw new ArgumentNullException(nameof(patientDetailsGetParams.PasId));

            if (string.IsNullOrEmpty(patientDetailsGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(patientDetailsGetParams.OrganisationCode));

            if (patientDetailsGetParams.OrganisationCode != patientDetailsGetParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(patientDetailsGetParams.OrganisationCode),"Access Denied");

            try
            {
                  var patient = await _patientDbInterface.GetPatientDetailsAsync(patientDetailsGetParams.PasId, patientDetailsGetParams.OrganisationCode, patientDetailsGetParams.CdeaId);


                return patient;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }

        public async Task<PatientBaseline> GetPatientBaselineAsync(BaselineGetParams baselineGetParams)
        {
            if (baselineGetParams == null)
                throw new ArgumentNullException(nameof(baselineGetParams));

            if (string.IsNullOrWhiteSpace(baselineGetParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserCreated));

            if (!baselineGetParams.Authorised)
                throw new ArgumentException(nameof(baselineGetParams.Authorised));

            if (string.IsNullOrWhiteSpace(baselineGetParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserOrganisationCode));

            if (baselineGetParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.CdeaId));

            if (baselineGetParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserCdeaId));

            if (baselineGetParams.CdeaId != baselineGetParams.UserCdeaId)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(baselineGetParams.PasId))
                throw new ArgumentNullException(nameof(baselineGetParams.PasId));

            if (string.IsNullOrEmpty(baselineGetParams.OrganisationCode))
                throw new ArgumentNullException(nameof(baselineGetParams.OrganisationCode));

            if (baselineGetParams.OrganisationCode != baselineGetParams.UserOrganisationCode)
                throw new ArgumentOutOfRangeException(nameof(baselineGetParams.UserOrganisationCode),"Access Denied");

            try
            {
                var patientBaseline = await _patientDbInterface.GetPatientBaselineAsync(baselineGetParams.PasId, baselineGetParams.OrganisationCode, baselineGetParams.CdeaId);
                return patientBaseline;
            }
            catch (Exception ex)
            {

                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }

        public async Task<bool> SavePatientBaselineAsync(BaselinePostParams baselinePostParams)
        {
            if (baselinePostParams == null)
                throw new ArgumentNullException(nameof(baselinePostParams));

            if (string.IsNullOrWhiteSpace(baselinePostParams.UserCreated))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserCreated));

            if (!baselinePostParams.Authorised)
                throw new ArgumentException(nameof(baselinePostParams.Authorised));

            if (string.IsNullOrWhiteSpace(baselinePostParams.UserOrganisationCode))
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserOrganisationCode));

            if (baselinePostParams.UserCdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.UserCdeaId));

            if (baselinePostParams.CdeaId <= 0)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.CdeaId));

            if (baselinePostParams.UserCdeaId != baselinePostParams.CdeaId)
                throw new ArgumentOutOfRangeException(nameof(baselinePostParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(baselinePostParams.PasId))
                throw new ArgumentNullException(nameof(baselinePostParams.PasId));

            if (string.IsNullOrEmpty(baselinePostParams.OrganisationCode))
                throw new ArgumentNullException(nameof(baselinePostParams.OrganisationCode));

            if (baselinePostParams.OrganisationCode != baselinePostParams.UserOrganisationCode)
                throw new ArgumentNullException(nameof(baselinePostParams.OrganisationCode),"Access Denied");

            if (baselinePostParams.PatientBaseline == null)
                throw new ArgumentNullException(nameof(baselinePostParams.PatientBaseline));

            if (baselinePostParams.BlankBaseline())
                throw new ArgumentNullException(nameof(baselinePostParams.PatientBaseline), "Baseline required");

            try
            {
                var patientBaseline = await _patientDbInterface.SavePatientBaselineAsync(baselinePostParams.PasId, baselinePostParams.OrganisationCode, baselinePostParams.CdeaId, baselinePostParams.PatientBaseline, baselinePostParams.UserCreated);
                return patientBaseline;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return false;
            }
        }
        
        public async Task<IPatient> GetMITPatientAsync(PatientAddParams patientAddParams)
        {
            if (patientAddParams == null)
                throw new ArgumentNullException(nameof(patientAddParams));

            if (!patientAddParams.Authorised)
                throw new ArgumentNullException(nameof(patientAddParams.Authorised));

            if (string.IsNullOrEmpty(patientAddParams.PasId))
                throw new ArgumentNullException(nameof(patientAddParams.PasId));

            if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                throw new ArgumentNullException(nameof(patientAddParams.UserOrganisationCode));

            if (patientAddParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(patientAddParams.UserCdeaId));

            if (patientAddParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(patientAddParams.CdeaId));

            if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                throw new ArgumentNullException(nameof(patientAddParams.CdeaId),"Access Denied");

            if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                throw new ArgumentNullException(nameof(patientAddParams.UserCreated));

            SqlConnection con = null;
            SqlCommand cmd = new SqlCommand();
            try
            {
               con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnMIT"].ToString());
                con.Open();
               
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_GetPatient_webservice";
                SqlParameter param = new SqlParameter("@PASID", SqlDbType.VarChar, 10);
                param.Value = patientAddParams.PasId;
                cmd.Parameters.Add(param);
                cmd.Connection = con;
                SqlDataReader dr;
                dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);
                if (dr.HasRows)
                {
                    dr.Read();

                    String PasID = dr["PasID"].ToString();
                    if (PasID.IndexOf("/") > 0)
                        PasID = PasID.Substring(0, PasID.IndexOf("/"));

                    _mitpatient.PasId = PasID;
                    _mitpatient.NhsNumber = dr["NhsNumber"].ToString();
                    _mitpatient.FirstName = dr["Forename_1"].ToString();
                    _mitpatient.LastName = dr["Surname"].ToString();
                    _mitpatient.Dob = DateTimeFactory.ConvertDate((dr["DOB"].ToString()), "yyyyMMdd");
                    _mitpatient.Address1 = dr["Address_1"].ToString();
                    _mitpatient.Address2 = dr["Address_2"].ToString();
                    _mitpatient.Address3 = dr["Address_3"].ToString();
                    _mitpatient.Address4 = dr["Address_4"].ToString();
                    _mitpatient.PostCode = dr["Postcode"].ToString();
                    _mitpatient.Telephone = dr["Telephone"].ToString();
                    _mitpatient.Mobile1 = dr["Mobile1"].ToString();
                    _mitpatient.EthnicGroup = dr["EthnicGroup"].ToString();
                    _mitpatient.Gender = dr["Gender"].ToString();
                    _mitpatient.GpInitials = dr["GPInitials"].ToString();
                    _mitpatient.GpSurname = dr["GPSurname"].ToString();
                    _mitpatient.GpAddress1 = dr["GPAddress_1"].ToString();
                    _mitpatient.GpAddress2 = dr["GPAddress_2"].ToString();
                    _mitpatient.GpAddress3 = dr["GPAddress_3"].ToString();
                    _mitpatient.GpAddress4 = dr["GPAddress_4"].ToString();
                    _mitpatient.GpPostcode = dr["GPPostcode"].ToString();
                    _mitpatient.GpTelephone = dr["GPTelephone"].ToString();
                    _mitpatient.NokTitle = dr["NokTitle"].ToString();
                    _mitpatient.NokForename = dr["NokForename"].ToString();
                    _mitpatient.NokSurname = dr["NokSurname"].ToString();
                    _mitpatient.NokRelation = dr["NokRelation"].ToString();
                    _mitpatient.NokAddress1 = dr["NokAddress_1"].ToString();
                    _mitpatient.NokAddress2 = dr["NokAddress_2"].ToString();
                    _mitpatient.NokAddress3 = dr["NokAddress_3"].ToString();
                    _mitpatient.NokAddress4 = dr["NokAddress_4"].ToString();
                    _mitpatient.NokPostcode = dr["NokPostcode"].ToString();
                    _mitpatient.NokTelDay = dr["NokTelDay"].ToString();
                    _mitpatient.RefreshDate = DateTime.Now;
                    _mitpatient.UserCreatedDate = DateTime.Now;

                    //Convert to Patient

                    _patient.PasId = _mitpatient.PasId;
                    _patient.NhsNumber = _mitpatient.NhsNumber;
                    _patient.FirstName = _mitpatient.FirstName;
                    _patient.LastName = _mitpatient.LastName;
                    //  _patient.Dob = DateTime.Parse(_mitpatient.Dob);
                    _patient.DateOfBirth = DateTimeFactory.ConvertStringToDate(_mitpatient.Dob.ToString());
                    _patient.Address1 = _mitpatient.Address1;
                    _patient.Address2 = _mitpatient.Address2;
                    _patient.Address3 = _mitpatient.Address3;
                    _patient.Address4 = _mitpatient.Address4;
                    _patient.PostCode = _mitpatient.PostCode;
                    //  _patient.OrganisationCode = _mitpatient.OrganisationCode;
                    _patient.Telephone = _mitpatient.Telephone;
                    _patient.MobileNumber = _mitpatient.Mobile1;
                    _patient.EthnicGroup = _mitpatient.EthnicGroup;
                    _patient.Gender = _mitpatient.Gender;
                    _patient.GpInitials = _mitpatient.GpInitials;
                    _patient.GpSurname = _mitpatient.GpSurname;
                    _patient.GpAddress1 = _mitpatient.GpAddress1;
                    _patient.GpAddress2 = _mitpatient.GpAddress2;
                    _patient.GpAddress3 = _mitpatient.GpAddress3;
                    _patient.GpAddress4 = _mitpatient.GpAddress4;
                    _patient.GpPostcode = _mitpatient.GpPostcode;
                    _patient.GpTelephone = _mitpatient.GpTelephone;
                    _patient.NokTitle = _mitpatient.NokTitle;
                    _patient.NokForename = _mitpatient.NokForename;
                    _patient.NokSurname = _mitpatient.NokSurname;
                    _patient.NokRelation = _mitpatient.NokRelation;
                    _patient.NokAddress1 = _mitpatient.NokAddress1;
                    _patient.NokAddress2 = _mitpatient.NokAddress2;
                    _patient.NokAddress3 = _mitpatient.NokAddress3;
                    _patient.NokAddress4 = _mitpatient.NokAddress4;
                    _patient.NokPostcode = _mitpatient.NokPostcode;
                    _patient.NokTelDay = _mitpatient.NokTelDay;
                    _patient.RefreshDate = _mitpatient.RefreshDate;
                    _patient.UserCreatedDate = _mitpatient.UserCreatedDate;

                    dr.Close();
                    return _patient;
                }
                else
                {
                    //_mitpatient = null;
                    //_patient = null;
                    return null;
                }



            
               
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;            }
            finally
            {
                cmd = null;
                con.Close();
            }
        }

        public async Task<PatientOrg> InsertPatientAsync(PatientAddParams patientAddParams, IPatient patient)
        {


            if (patientAddParams == null)
                throw new ArgumentNullException(nameof(patientAddParams));

            if (!patientAddParams.Authorised)
                throw new ArgumentNullException(nameof(patientAddParams.Authorised));

            if (patientAddParams.exists)
                if (string.IsNullOrEmpty(patientAddParams.PasId))
                    throw new ArgumentOutOfRangeException(nameof(patientAddParams.PasId));

            if (string.IsNullOrEmpty(patientAddParams.UserOrganisationCode))
                throw new ArgumentNullException(nameof(patientAddParams.UserOrganisationCode));

            if (patientAddParams.UserCdeaId <= 0)
                throw new ArgumentNullException(nameof(patientAddParams.UserCdeaId));

            if (patientAddParams.CdeaId <= 0)
                throw new ArgumentNullException(nameof(patientAddParams.CdeaId));

            if (patientAddParams.CdeaId != patientAddParams.UserCdeaId)
                throw new ArgumentNullException(nameof(patientAddParams.CdeaId), "Access Denied");

            if (string.IsNullOrEmpty(patientAddParams.UserCreated))
                throw new ArgumentNullException(nameof(patientAddParams.UserCreated));

            try
            {

          

                PatientOrg po = null;
                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Sjogrens"].ToString());
                con.Open();
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "InsertPatient";
                cmd.Parameters.Add("@NhsNumber", SqlDbType.VarChar, 10).Value = patient.NhsNumber;
                if (string.IsNullOrEmpty(patient.PasId))
                {
                    cmd.Parameters.Add("@PasId", SqlDbType.VarChar, 10).Value = DBNull.Value;
                }
                else
                {
                    cmd.Parameters.Add("@PasId", SqlDbType.VarChar, 10).Value = patient.PasId.Trim();
                }
                cmd.Parameters.Add("@DateOfBirth", SqlDbType.Date).Value = patient.DateOfBirth;
                cmd.Parameters.Add("@GenderCode", SqlDbType.Char, 1).Value = patient.Gender;
                cmd.Parameters.Add("@LastName", SqlDbType.VarChar, 50).Value = patient.LastName;
                cmd.Parameters.Add("@FirstName", SqlDbType.VarChar, 50).Value = patient.FirstName;
                cmd.Parameters.Add("@Address1", SqlDbType.VarChar, 50).Value = patient.Address1;
                cmd.Parameters.Add("@Address2", SqlDbType.VarChar, 50).Value = patient.Address2;
                cmd.Parameters.Add("@Address3", SqlDbType.VarChar, 50).Value = patient.Address3;
                cmd.Parameters.Add("@Address4", SqlDbType.VarChar, 50).Value = patient.Address4;
                cmd.Parameters.Add("@PostCode", SqlDbType.VarChar, 8).Value = patient.PostCode;
                cmd.Parameters.Add("@Telephone", SqlDbType.VarChar, 20).Value = patient.Telephone;
                cmd.Parameters.Add("@Mobile1", SqlDbType.VarChar, 15).Value = patient.MobileNumber;
                cmd.Parameters.Add("@EthnicGroup", SqlDbType.VarChar, 250).Value = patient.EthnicGroup;
                cmd.Parameters.Add("@GPLastName", SqlDbType.VarChar, 50).Value = patient.GpSurname;
                cmd.Parameters.Add("@GPInitials", SqlDbType.VarChar, 4).Value = patient.GpInitials;
                cmd.Parameters.Add("@GPAddress1", SqlDbType.VarChar, 50).Value = patient.GpAddress1;
                cmd.Parameters.Add("@GPAddress2", SqlDbType.VarChar, 50).Value = patient.GpAddress2;
                cmd.Parameters.Add("@GPAddress3", SqlDbType.VarChar, 50).Value = patient.GpAddress3;
                cmd.Parameters.Add("@GPAddress4", SqlDbType.VarChar, 50).Value = patient.GpAddress4;
                cmd.Parameters.Add("@GPPostCode", SqlDbType.VarChar, 8).Value = patient.PostCode;
                cmd.Parameters.Add("@GPTelephone", SqlDbType.VarChar, 20).Value = patient.GpTelephone;
                cmd.Parameters.Add("@NOKTitle", SqlDbType.VarChar, 10).Value = patient.NokTitle;
                cmd.Parameters.Add("@NOKFirstName", SqlDbType.VarChar, 50).Value = patient.NokForename;
                cmd.Parameters.Add("@NOKLastName", SqlDbType.VarChar, 50).Value = patient.NokSurname;
                cmd.Parameters.Add("@NOKRelationship", SqlDbType.VarChar, 20).Value = patient.NokRelation;
                cmd.Parameters.Add("@NOKAddress1", SqlDbType.VarChar, 50).Value = patient.NokAddress1;
                cmd.Parameters.Add("@NOKAddress2", SqlDbType.VarChar, 50).Value = patient.NokAddress2;
                cmd.Parameters.Add("@NOKAddress3", SqlDbType.VarChar, 50).Value = patient.NokAddress3;
                cmd.Parameters.Add("@NOKAddress4", SqlDbType.VarChar, 50).Value = patient.NokAddress4;
                cmd.Parameters.Add("@NOKPostCode", SqlDbType.VarChar, 8).Value = patient.NokPostcode;
                cmd.Parameters.Add("@NOKTelephone", SqlDbType.VarChar, 20).Value = patient.GpTelephone;
                cmd.Parameters.Add("@OrganisationCode", SqlDbType.VarChar, 10).Value = patientAddParams.UserOrganisationCode;
                cmd.Parameters.Add("@CdeaId", SqlDbType.Int).Value = patientAddParams.CdeaId;


                cmd.Parameters.Add("@RefreshDate", SqlDbType.DateTime).Value = patient.RefreshDate == DateTime.MinValue ? DateTime.Now : patient.RefreshDate;
                cmd.Parameters.Add("@UserCreated", SqlDbType.VarChar, 100).Value = patientAddParams.UserCreated;
                // cmd.Parameters.Add("@ReturnVal", SqlDbType.Udt).Direction = ParameterDirection.Output;

                cmd.Connection = con;


                SqlDataReader dr;
                dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);
                while (dr.Read())
                {
                    po = new PatientOrg() { Pid = (Int32)dr["Pid"], PasId = dr["PasId"].ToString(), OrganisationCode = dr["OrganisationCode"].ToString(), CdeaId = (Int32)dr["CdeaId"] };
                }



                cmd = null;
                con.Close();
                return po;
            }
            catch (Exception ex)
            {

                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
        }

        public async Task<IPatient> GetMITPatientAsync(string pasId)
        {

            if (string.IsNullOrWhiteSpace(pasId))
                throw new ArgumentOutOfRangeException(nameof(pasId));


            SqlConnection con = null;
           
            SqlCommand cmd = new SqlCommand();
         

            try
            {

              con = new SqlConnection(ConfigurationManager.ConnectionStrings["cnMIT"].ToString());
                con.Open();
                //SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_GetPatient_webservice";
                SqlParameter param = new SqlParameter("@PASID", SqlDbType.VarChar, 10);
                param.Value = pasId;
                cmd.Parameters.Add(param);
                cmd.Connection = con;
               SqlDataReader dr;
                dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);
                if (dr.HasRows)
                {
                    dr.Read();

                    String PasID = dr["PasID"].ToString();
                    if (PasID.IndexOf("/") > 0)
                        PasID = PasID.Substring(0, PasID.IndexOf("/"));

                    _mitpatient.PasId = PasID.Trim();
                    _mitpatient.NhsNumber = dr["NhsNumber"].ToString();
                    _mitpatient.FirstName = dr["Forename_1"].ToString();
                    _mitpatient.LastName = dr["Surname"].ToString();
                    _mitpatient.Dob = DateTimeFactory.ConvertDate((dr["DOB"].ToString()), "yyyyMMdd");
                    _mitpatient.Address1 = dr["Address_1"].ToString();
                    _mitpatient.Address2 = dr["Address_2"].ToString();
                    _mitpatient.Address3 = dr["Address_3"].ToString();
                    _mitpatient.Address4 = dr["Address_4"].ToString();
                    _mitpatient.PostCode = dr["Postcode"].ToString();
                    _mitpatient.Telephone = dr["Telephone"].ToString();
                    _mitpatient.Mobile1 = dr["Mobile1"].ToString();
                    _mitpatient.EthnicGroup = dr["EthnicGroup"].ToString();
                    _mitpatient.Gender = dr["Gender"].ToString();
                    _mitpatient.GpInitials = dr["GPInitials"].ToString();
                    _mitpatient.GpSurname = dr["GPSurname"].ToString();
                    _mitpatient.GpAddress1 = dr["GPAddress_1"].ToString();
                    _mitpatient.GpAddress2 = dr["GPAddress_2"].ToString();
                    _mitpatient.GpAddress3 = dr["GPAddress_3"].ToString();
                    _mitpatient.GpAddress4 = dr["GPAddress_4"].ToString();
                    _mitpatient.GpPostcode = dr["GPPostcode"].ToString();
                    _mitpatient.GpTelephone = dr["GPTelephone"].ToString();
                    _mitpatient.NokTitle = dr["NokTitle"].ToString();
                    _mitpatient.NokForename = dr["NokForename"].ToString();
                    _mitpatient.NokSurname = dr["NokSurname"].ToString();
                    _mitpatient.NokRelation = dr["NokRelation"].ToString();
                    _mitpatient.NokAddress1 = dr["NokAddress_1"].ToString();
                    _mitpatient.NokAddress2 = dr["NokAddress_2"].ToString();
                    _mitpatient.NokAddress3 = dr["NokAddress_3"].ToString();
                    _mitpatient.NokAddress4 = dr["NokAddress_4"].ToString();
                    _mitpatient.NokPostcode = dr["NokPostcode"].ToString();
                    _mitpatient.NokTelDay = dr["NokTelDay"].ToString();
                    _mitpatient.RefreshDate = DateTime.Now;
                    _mitpatient.UserCreatedDate = DateTime.Now;

                    //Convert to Patient

                    _patient.PasId = _mitpatient.PasId;
                    _patient.NhsNumber = _mitpatient.NhsNumber;
                    _patient.FirstName = _mitpatient.FirstName;
                    _patient.LastName = _mitpatient.LastName;
                    // _patient.Dob = DateTime.Parse(_mitpatient.Dob);
                    _patient.DateOfBirth = DateTimeFactory.ConvertStringToDate(_mitpatient.Dob.ToString());
                    _patient.Address1 = _mitpatient.Address1;
                    _patient.Address2 = _mitpatient.Address2;
                    _patient.Address3 = _mitpatient.Address3;
                    _patient.Address4 = _mitpatient.Address4;
                    _patient.PostCode = _mitpatient.PostCode;
                    _patient.Telephone = _mitpatient.Telephone;
                    _patient.MobileNumber = _mitpatient.Mobile1;
                    _patient.EthnicGroup = _mitpatient.EthnicGroup;
                    _patient.Gender = _mitpatient.Gender;
                    _patient.GpInitials = _mitpatient.GpInitials;
                    _patient.GpSurname = _mitpatient.GpSurname;
                    _patient.GpAddress1 = _mitpatient.GpAddress1;
                    _patient.GpAddress2 = _mitpatient.GpAddress2;
                    _patient.GpAddress3 = _mitpatient.GpAddress3;
                    _patient.GpAddress4 = _mitpatient.GpAddress4;
                    _patient.GpPostcode = _mitpatient.GpPostcode;
                    _patient.GpTelephone = _mitpatient.GpTelephone;
                    _patient.NokTitle = _mitpatient.NokTitle;
                    _patient.NokForename = _mitpatient.NokForename;
                    _patient.NokSurname = _mitpatient.NokSurname;
                    _patient.NokRelation = _mitpatient.NokRelation;
                    _patient.NokAddress1 = _mitpatient.NokAddress1;
                    _patient.NokAddress2 = _mitpatient.NokAddress2;
                    _patient.NokAddress3 = _mitpatient.NokAddress3;
                    _patient.NokAddress4 = _mitpatient.NokAddress4;
                    _patient.NokPostcode = _mitpatient.NokPostcode;
                    _patient.NokTelDay = _mitpatient.NokTelDay;
                    _patient.RefreshDate = _mitpatient.RefreshDate;
                    _patient.UserCreatedDate = _mitpatient.UserCreatedDate;

                    return _patient;
                }
                else
                {
                    //_mitpatient = null;
                    //_patient = null;
                    return null;
                }
                
                
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                return null;
            }
            finally
            {
              
                cmd = null;
                con.Close();
            }
        }

     

    }
}
