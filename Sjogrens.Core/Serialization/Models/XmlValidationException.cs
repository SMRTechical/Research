using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Models
{
    public class XmlValidationException : ApplicationException
    {
        public XmlValidationException()
        { }

        public XmlValidationException(string message) : base(message)
        { }

        public XmlValidationException(string message, Exception inner) : base(message, inner)
        { }
    }
}
