using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Models
{
    public abstract class TypeNameJsonConverter<T> : JsonConverter
    {
        protected virtual string TypeParameterName => "__type";
        protected abstract T Create(Type objectType, JObject jObject);

        public override bool CanWrite => false;

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
                return null;

            var jObject = JObject.Load(reader);

            T target = Create(objectType, jObject);

            serializer.Populate(jObject.CreateReader(), target);

            return target;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var typeNameProperty = new JProperty(TypeParameterName, value.GetType().Name);

            var jObject = new JObject { typeNameProperty };

            foreach (var propertyInfo in value.GetType().GetProperties())
            {
                if (!propertyInfo.CanRead) continue;
                var propertyValue = propertyInfo.GetValue(value);
                if (propertyValue != null)
                {
                    jObject.Add(PropertyNameToCamelCase(propertyInfo.Name), JToken.FromObject(propertyValue, serializer));
                }
            }

            //jObject.WriteTo(writer);
            serializer.Serialize(writer, jObject);
        }

        private string PropertyNameToCamelCase(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return value;

            var chars = value.ToCharArray();

            if (chars.Length > 0)
                chars[0] = char.ToLower(chars[0]);

            return new string(chars);
        }
    }
}
