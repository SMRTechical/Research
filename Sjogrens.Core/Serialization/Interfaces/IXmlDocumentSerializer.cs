using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Interfaces
{
    public interface IXmlDocumentSerializer
    {
        string Serialize(object obj);
        T Deserialize<T>(string xml);
        TInterface DeserializeAndValidateXsdToInterface<T, TInterface>(string xml, string xsd);
    }
}
