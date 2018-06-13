using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class PatientStateViewModel:PatientState
    {      
        public string Token => 
                                RecentVisit != null ? EncryptionFactory.UrlEncodedEncrypt($"Pid={RecentVisit.Pid}&PasId={RecentVisit.PasId}&VisitId={RecentVisit.VisitId}&Completed={RecentVisit.Completed}&InitialVisit={RecentVisit.InitialVisit}&NewVisit={RecentVisit.NewVisit}&AdvancedSearch={RecentVisit.AdvancedSearch}&OrganisationCode={RecentVisit.OrganisationCode}&CdeaId={RecentVisit.CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString()) :
                                                      EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());


    }
}