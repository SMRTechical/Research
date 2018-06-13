using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Factories;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Sjogrens.Client.ViewModels
{
    public class ConsentViewModel :Consent
    {
        public string Token => EncryptionFactory.UrlEncodedEncrypt($"Pid={Pid}&PasId={PasId}&OrganisationCode={OrganisationCode}&CdeaId={CdeaId}", ConfigurationManager.AppSettings["EncryptionKey"].ToString());

    }
}