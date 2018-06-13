
using Sjogrens.Core.Data.Models;
using Sjogrens.Core.Data.Services.Interfaces;
using Sjorgens.Core.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Data.Services
{
    public class OrganisationService : IOrganisationService
    {
        private readonly IDataApiHttpService _dataApiHttpService;

        public OrganisationService(IDataApiHttpService httpService)
        {
            _dataApiHttpService = httpService;
        }

        public async Task<List<Organisation>> GetOrganisationsAsync()
        {
            var uri = new HttpClientUriBuilder($"organisations");

            var response = await _dataApiHttpService.GetAsync<List<Organisation>>(uri);
            return response.Success ? response.Data : Enumerable.Empty<Organisation>().ToList();
        }



    }
}
