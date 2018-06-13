using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class VisitHeaderViewModel:VisitHeader
    {
//        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&VisitId={VisitId}&Completed={Completed}&InitialVisit={VisitId == 1 && VisitId == 0}&NewVisit={VisitId==1}&AdvancedSearch={AdvancedSearch}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&VisitId={VisitId}&Completed={Completed}&InitialVisit={InitialVisit}&NewVisit={NewVisit}&AdvancedSearch={AdvancedSearch}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

    }
}