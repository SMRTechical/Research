using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace Sjogrens.Core.Configuration
{
    public class ConfigStore : IConfigStore
    {
        public string this[string index] => ConfigurationManager.AppSettings[index];
    }
}
