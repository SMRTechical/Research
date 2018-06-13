using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjorgens.Core.Http
{
    public struct HttpServiceResponse<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }

        public HttpServiceResponse(bool success)
        {
            Success = success;
            Data = default(T);
        }

        public HttpServiceResponse(bool success, T data)
        {
            Success = success;
            Data = data;
        }
    }
}
