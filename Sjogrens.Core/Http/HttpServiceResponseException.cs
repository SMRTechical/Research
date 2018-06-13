using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjorgens.Core.Http
{
    [Serializable]
    public class HttpServiceResponseException : ApplicationException
    {
        public HttpServiceResponseException(string message) : base(message)
        { }
    }
}
