using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Client.Configuration.Interfaces
{
    public interface IConfigurationHelper
    {
        int GetCurrentCdeaId();
        string GetCurrentOrganisationCode();
    }
}
