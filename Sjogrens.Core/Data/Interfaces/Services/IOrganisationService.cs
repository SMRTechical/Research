using Sjogrens.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services.Interfaces
{
  public  interface IOrganisationService
    {

   //     Task<Organisation> GetOrganisationAsync(string Code);
        Task<List<Organisation>> GetOrganisationsAsync();
    }
}
