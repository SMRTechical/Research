using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class CategoryViewModel:Category
    {
        public int VisitId { get; set; }
        public int Pid { get; set; }
        public string PasId { get; set; }
        public bool InitialVisit { get; set; }
        public bool NewVisit { get; set; }
        public bool Completed { get; set; }
        public bool AdvancedSearch { get; set; }
        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&VisitId={VisitId}&Completed={Completed}&InitialVisit={InitialVisit}&NewVisit={NewVisit}&AdvancedSearch={AdvancedSearch}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

    }
}