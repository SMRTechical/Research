using Insight.Database;
using Sjogrens.Core.Serialization.Interfaces;
using System;

namespace JsPlc.Ssc.Bonus.Data.Insight
{
    public class InsightJsonSerializer : DbObjectSerializer
    {
        private readonly ISerializer _serializer;

        public InsightJsonSerializer(ISerializer serializer)
        {
            _serializer = serializer;
        }

        public override object DeserializeObject(Type type, object encoded)
        {
            return _serializer.Deserialize(type, encoded.ToString());
        }

        public override object SerializeObject(Type type, object value)
        {
            return _serializer.Serialize(value);
        }
    }
}
