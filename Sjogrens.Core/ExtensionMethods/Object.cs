using Newtonsoft.Json;
using System;
using System.Linq;

namespace Sjogrens.Core.ExtensionMethods
{
    public static class Object
    {
        public static T Clone<T>(this T obj)
        {
            // Don't serialize a null object, simply return the default for that object
            if (ReferenceEquals(obj, null))
            {
                return default(T);
            }

            var deserializeSettings = new JsonSerializerSettings { ObjectCreationHandling = ObjectCreationHandling.Replace };

            return JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(obj), deserializeSettings);
        }

        public static object ReflectPropertyValue(this object obj, string propertyName)
        {
            if (obj == null || string.IsNullOrWhiteSpace(propertyName))
                return null;

            return obj.GetType()?.GetProperty(propertyName)?.GetValue(obj, null);
        }

        public static object GetDefaultValue(this Type t)
        {
            if (t.IsValueType)
                return Activator.CreateInstance(t);

            return null;
        }

        public static bool In<T>(this T obj, params T[] args)
        {
            return args.Contains(obj);
        }
    }
}
