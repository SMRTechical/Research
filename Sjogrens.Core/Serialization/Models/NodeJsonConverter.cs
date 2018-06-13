
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Models
{
    public class NodeJsonConverter : TypeNameJsonConverter<INode>
    {
        protected override string TypeParameterName => "nodeType";
        public override bool CanWrite => true;

        protected override INode Create(Type objectType, JObject jObject)
        {
            if (!jObject.HasValues)
                return null;

            JToken nodeType;

            if (!jObject.TryGetValue(TypeParameterName, out nodeType))
                throw new ArgumentOutOfRangeException(nameof(objectType));

            return Activator.CreateInstance(Type.GetType(string.Concat(objectType.Namespace, ".", jObject.Value<string>(TypeParameterName)))) as INode;
        }
    }
}
