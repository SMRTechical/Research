using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Sjorgens.Core.Http
{
    public class HttpClientUriBuilder
    {
        private string _uri = string.Empty;
        private NameValueCollection _queryString = HttpUtility.ParseQueryString(string.Empty);

        public HttpClientUriBuilder(string uri)
        {
            _uri = uri;
        }

        public HttpClientUriBuilder(string uri, params object[] args)
        {
            _uri = string.Format(uri, args);
        }

        public void AddQueryString<T>(string name, T value)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(value?.ToString()))
                return;

            _queryString.Add(name, value.ToString());
        }

        public void AddQueryString<T>(string name, T value, Func<bool> condition)
        {
            if (condition())
                AddQueryString(name, value);
        }

        public void AddQueryString<T>(string name, T[] values)
        {
            if (string.IsNullOrWhiteSpace(name) || values?.Length < 1)
                return;

            if (values != null)
                _queryString.Add(name, string.Join(",", values.Select(v => v.ToString())));
        }

        public void AddQueryString<T>(string name, T[] values, Func<bool> condition)
        {
            if (condition())
                AddQueryString(name, values);
        }

        public override string ToString()
        {
            if (_queryString.Count > 0)
                return string.Concat(_uri, "?", _queryString);
            else
                return _uri;
        }

        public static implicit operator string(HttpClientUriBuilder uriBuilder)
        {
            return uriBuilder.ToString();
        }
    }
}
