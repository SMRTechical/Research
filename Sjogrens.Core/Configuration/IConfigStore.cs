using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Configuration
{
    public interface IConfigStore
    {
        string this[string index] { get; }
    }
}
