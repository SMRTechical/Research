using Sjogrens.Core.Serialization.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Models
{
    public class Serializer : ISerializer
    {
        private JsonSerializerSettings settings = new JsonSerializerSettings()
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        public T Deserialize<T>(string json)
        {
            return string.IsNullOrWhiteSpace(json) ? default(T) : JsonConvert.DeserializeObject<T>(json, settings);
        }

        public object Deserialize(Type type, string json)
        {
            return string.IsNullOrWhiteSpace(json) ? Activator.CreateInstance(type) : JsonConvert.DeserializeObject(json, type, settings);
        }

        public string Serialize<T>(T obj)
        {
            return JsonConvert.SerializeObject(obj, settings);
        }
    }
}
