using Serilog;
using Sjogrens.Core.Enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.Factories;
using Elmah;

namespace Sjorgens.Core.Http
{
    public abstract class BaseHttpService : IBaseHttpService
    {
        private readonly HttpClient HttpClient;
        private readonly ILogger _logger;

        public BaseHttpService(ILogger logger)
        {
            _logger = logger;
            HttpClient = new HttpClient();
            HttpClient.DefaultRequestHeaders.Accept.Clear();
            HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            string _username = ConfigurationManager.AppSettings["Username"].ToString();
            string _password = ConfigurationManager.AppSettings["Password"].ToString();
            string _delimiter = ":";

            string credentials = string.Concat(_username, _delimiter, _password);

            var byteArray = Encoding.ASCII.GetBytes(credentials);
            HttpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
        }

        public BaseHttpService(ILogger logger, string environment) : this(logger)
        {
            if (string.IsNullOrWhiteSpace(environment))
            {
                Exception ex = new Exception(nameof(environment));
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw new ArgumentNullException(nameof(environment));
            }
            Uri baseUri;
            string baseAddress = EnvironmentFactory.getDataApiBaseAddress(environment);

            if (Uri.TryCreate(baseAddress, UriKind.Absolute, out baseUri))
                HttpClient.BaseAddress = baseUri;
            else
            {
                ArgumentException ex= new ArgumentException("Failed to convert to a valid Uri", nameof(baseAddress));
                ErrorSignal.FromCurrentContext().Raise(ex);

                throw new ArgumentException("Failed to convert to a valid Uri", nameof(baseAddress));
            }
          }

        public async Task<HttpServiceResponse<T>> GetAsync<T>(string uri)
        {
            HttpResponseMessage response = null;

            try
            {
                response = await HttpClient.GetAsync(uri);
                return await CreateServiceResponseAsync<T>(response);
            }
            catch (Exception ex)
            {
                if (response?.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    _logger.Information(ex, "HttpService failed on GET {Uri}", uri);
                    ErrorSignal.FromCurrentContext().Raise(ex);

                }
                else
                {
                    _logger.Error(ex, "HttpService failed on GET {Uri}", uri);
                    ErrorSignal.FromCurrentContext().Raise(ex);
                }
                return new HttpServiceResponse<T>(false);
            }
        }

        public async Task<HttpServiceResponse<T>> PostAsync<T>(string uri, T obj)
        {
            return await PostAsync<T, T>(uri, obj);
        }

        public async Task<HttpServiceResponse<TResult>> PostAsync<T, TResult>(string uri, T obj)
        {
            try
            {
                //Exception innerEx = new Exception(" start Uri:" + uri);
                //ErrorSignal.FromCurrentContext().Raise(innerEx);

                var response = await HttpClient.PostAsJsonAsync(uri, obj);

                //Exception innerEx2 = new Exception(" end Uri:" + uri);
                //ErrorSignal.FromCurrentContext().Raise(innerEx2);

                return await CreateServiceResponseAsync<TResult>(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on POST {Uri} {Object}", uri, obj);
               
                //Exception innerEx = new Exception("Uri:" + uri);
                //ErrorSignal.FromCurrentContext().Raise(ex);

                return new HttpServiceResponse<TResult>(false);
            }
        }

        public async Task<HttpServiceResponse<T>> PostAsync<T>(string uri)
        {
            try
            {
                var response = await HttpClient.PostAsync(uri, null);
                return await CreateServiceResponseAsync<T>(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on POST {Uri}", uri);


                Exception innerEx = new Exception("Uri:" + uri);
                ErrorSignal.FromCurrentContext().Raise(ex);

                return new HttpServiceResponse<T>(false);
            }
        }

        public async Task<HttpServiceResponse<TResult>> PutAsync<T, TResult>(string uri, T obj)
        {
            try
            {
                var response = await HttpClient.PutAsJsonAsync(uri, obj);
                return await CreateServiceResponseAsync<TResult>(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on PUT {Uri} {Object}", uri, obj);

                Exception innerEx = new Exception("Uri:" + uri);
                ErrorSignal.FromCurrentContext().Raise(ex);

                return new HttpServiceResponse<TResult>(false);
            }
        }

        public async Task<HttpServiceResponse<T>> PutAsync<T>(string uri)
        {
            try
            {
                var response = await HttpClient.PutAsync(uri, null);
                return await CreateServiceResponseAsync<T>(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on PUT {Uri}", uri);

                Exception innerEx = new Exception("Uri:" + uri);
                ErrorSignal.FromCurrentContext().Raise(ex);


                return new HttpServiceResponse<T>(false);
            }
        }

        public async Task<HttpServiceResponse<T>> DeleteAsync<T>(string uri)
        {
            try
            {
                var response = await HttpClient.DeleteAsync(uri);
                return await CreateServiceResponseAsync<T>(response);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on DELETE {Uri}", uri);
                return new HttpServiceResponse<T>(false);
            }
        }

        public async Task<HttpServiceResponse<Stream>> GetStreamAsync(string uri)
        {
            try
            {
                var response = await HttpClient.GetStreamAsync(uri);

                if (response != null && response.CanRead)
                    return new HttpServiceResponse<Stream>(true, response);
                else
                    return new HttpServiceResponse<Stream>(false);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "HttpService failed on GET Stream {Uri}", uri);
                Exception innerEx = new Exception("Uri:" + uri);
                ErrorSignal.FromCurrentContext().Raise(ex);
                return new HttpServiceResponse<Stream>(false);
            }
        }

        private async Task<HttpServiceResponse<T>> CreateServiceResponseAsync<T>(HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                return new HttpServiceResponse<T>(true, await response.Content.ReadAsAsync<T>());
            }
            else
            {
                Exception ex = new Exception($"Failed to create HttpServiceResponse from {response}");
                ErrorSignal.FromCurrentContext().Raise(ex);

                throw new HttpServiceResponseException($"Failed to create HttpServiceResponse from {response}");
            }
            }
    }
}
