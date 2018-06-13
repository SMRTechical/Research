using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjorgens.Core.Http
{
    public interface IBaseHttpService
    {
        Task<HttpServiceResponse<T>> GetAsync<T>(string uri);
        Task<HttpServiceResponse<T>> PostAsync<T>(string uri, T obj);
        Task<HttpServiceResponse<TResult>> PostAsync<T, TResult>(string uri, T obj);
        Task<HttpServiceResponse<T>> PostAsync<T>(string uri);
        Task<HttpServiceResponse<TResult>> PutAsync<T, TResult>(string uri, T obj);
        Task<HttpServiceResponse<T>> PutAsync<T>(string uri);
        Task<HttpServiceResponse<T>> DeleteAsync<T>(string uri);
        Task<HttpServiceResponse<Stream>> GetStreamAsync(string uri);
    }
}
