using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Interfaces.Params
{
    public interface IPatientAddParams
    {

        //bool Authorised { get; set; }
        //string PasId { get; set; }
        //string UserOrganisationCode { get; set; }
        //int UserCdeaId { get; set; }
        //int CdeaId { get; set; }
        //string DateOfBirth { get; set; }
        // string NhsNumber { get; set; }
        string UserCreated { get; set; }
        bool exists { get; set; }

    }
}
