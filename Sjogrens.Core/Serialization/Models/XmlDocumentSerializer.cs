using Sjogrens.Core.Serialization.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace Sjogrens.Core.Serialization.Models
{
    public class XmlDocumentSerializer : IXmlDocumentSerializer
    {
        public string Serialize(object obj)
        {
            var xmlSerializer = new XmlSerializer(obj.GetType());
            using (var textWriter = new StringWriter())
            {
                var ns = new XmlSerializerNamespaces();
                ns.Add("", "");
                xmlSerializer.Serialize(textWriter, obj, ns);
                return textWriter.ToString();
            }
        }

        public T Deserialize<T>(string xml)
        {
            var serializer = new XmlSerializer(typeof(T));
            return (T)serializer.Deserialize(new StringReader(xml));
        }

        public TInterface DeserializeAndValidateXsdToInterface<T, TInterface>(string xml, string xsd)
        {
            if (string.IsNullOrWhiteSpace(xsd))
                throw new ArgumentNullException("XSD empty", nameof(xsd));

            try
            {
                var schema = XmlSchema.Read(new StringReader(xsd), ValidationEventHandler);
                var xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(xml);
                xmlDoc.Schemas.Add(schema);
                xmlDoc.Validate(ValidationEventHandler);

                var concrete = Deserialize<T>(xml);
                var intrfce = (TInterface)(object)concrete;

                if (intrfce == null)
                    throw new ApplicationException("XML Deserialized to null");

                return intrfce;
            }
            catch (Exception ex)
            {
                throw new SerializationException($"XML Deserialization of {typeof(T)} failed.", ex);
            }
        }

        public void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            switch (e.Severity)
            {
                case XmlSeverityType.Error:
                    throw new XmlValidationException($"Error: {e.Message}");
                case XmlSeverityType.Warning:
                    throw new XmlValidationException($"Warning {e.Message}");
                default:
                    throw new Exception(e.Message);
            }
        }
    }
}
