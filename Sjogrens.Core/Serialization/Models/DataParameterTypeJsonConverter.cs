using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sjogrens.Core.ExtensionMethods;

namespace Sjogrens.Core.Serialization.Models
{
    public class DataParameterTypeJsonConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return typeof(Type).IsAssignableFrom(objectType);
        }

        public override bool CanRead => true;
        public override bool CanWrite => true;

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JToken token = JToken.Load(reader);

            Type t = Type.GetType(token.ToString(), false, true);

            if (t != null && t.In(typeof(bool), typeof(int), typeof(Int64), typeof(decimal), typeof(DateTime)))
                return t;
            else
                return typeof(string);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value is Type && value.In(typeof(bool), typeof(int), typeof(Int64), typeof(decimal), typeof(DateTime)))
                serializer.Serialize(writer, ((Type)value).FullName);
            else
                serializer.Serialize(writer, typeof(string).FullName);
        }
    }
}
