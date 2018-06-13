using Sjogrens.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Interfaces.Models;

namespace Sjogrens.Data.Repositories.Models
{
    public class OrganisationRepository : IOrganisationRepository
    {

        private IOrganisation _organisation;
        public OrganisationRepository()
        {

        }

        public OrganisationRepository(IOrganisation organisation)
        {
            _organisation = organisation;
        }
        public async Task<IEnumerable<IOrganisation>> ListAsync()
        {
            List<IOrganisation> organisations = null;
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["Sjogrens"].ToString());
            con.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "GetOrganisations";
           
            cmd.Connection = con;
            SqlDataReader dr;
            dr = await cmd.ExecuteReaderAsync(CommandBehavior.KeyInfo);

            if (dr.HasRows)
            {
                organisations = new List<IOrganisation>();
                while (dr.Read())
                {

                    organisations
                        .Add
                        (
                                new Organisation
                                {
                                   
                                    Code = dr["Code"].ToString(),
                                    Description = dr["Description"].ToString()
                                }
                        );
                }
            }

            dr.Close();
            cmd = null;
            con.Close();
            return organisations;
        }
    }
}
