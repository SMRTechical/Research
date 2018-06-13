using Sjogrens.Core.Data.Interfaces.Models;
using Sjogrens.Core.Data.Interfaces.Params;
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Params;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Factories
{
  public  class SpineFactory
    {
        public static MiniSpine.clsMiniSpinePatient SearchSpine(IPatientSearchParams patientSearchParams)
        {
            string MiniSpineURL = System.Configuration.ConfigurationManager.AppSettings["MiniSpineURL"];

            MiniSpineURL = MiniSpineURL.Trim();
            MiniSpine.clsMiniSpine objMiniSpine = new MiniSpine.clsMiniSpine();
            MiniSpine.clsMiniSpinePatient objMiniSpinePatient = new MiniSpine.clsMiniSpinePatient();

            DateTime? dob =  DateTimeFactory.ConvertStringToDate(patientSearchParams.DateOfBirth);

            var spinePatient = objMiniSpine.GetMiniSpinePatient(patientSearchParams.NhsNumber, dob.Value, MiniSpineURL);

            return spinePatient;


        }
    }
}
