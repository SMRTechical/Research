using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Serialization.Interfaces
{
    public interface ISerializer
    {
        T Deserialize<T>(string json);
        object Deserialize(Type type, string json);
        string Serialize<T>(T obj);
    }
}
