using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Generic.Interfaces
{
    public interface IErrors
    {
        bool Success { get; set; }
        string ErrorView { get; set; }
        List<string> ErrorList { get; set; }
    }
}
