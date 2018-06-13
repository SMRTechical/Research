
using Sjorgens.Core.Http;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Configuration;

namespace Sjorgens.Core.Http
{
    public class DataApiHttpService : BaseHttpService, IDataApiHttpService
    {
        public DataApiHttpService(ILogger logger, IConfigStore configStore) : base(logger, configStore[ConfigKeys.DataApi.Environment])
        { }
    }
}
