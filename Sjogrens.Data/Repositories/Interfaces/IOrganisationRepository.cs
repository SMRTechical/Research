
using Sjogrens.Core.Data.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Data.Repositories.Interfaces
{
   public interface IOrganisationRepository
    {
        Task<IEnumerable<IOrganisation>> ListAsync();
    }
}
