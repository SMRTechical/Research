using System;

namespace Sjogrens.Core.ExtensionMethods
{
    public static class String
    {
        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) { return value; }

            return value.Substring(0, Math.Min(value.Length, maxLength));
        }

        public static bool TryParseAs<T>(this string str, out T value) where T : struct
        {
            T val;
            var result = GenericHelper<T>.TryParse(str, out val);

            if (result)
                value = val;
            else
                value = default(T);

            return result;
        }

        private static class GenericHelper<T>
        {
            public delegate bool TryParseFunc(string str, out T result);

            private static TryParseFunc tryParse;
            public static TryParseFunc TryParse
            {
                get
                {
                    if (tryParse == null)
                        tryParse = Delegate.CreateDelegate(
                            typeof(TryParseFunc), typeof(T), "TryParse") as TryParseFunc;
                    return tryParse;
                }
            }
        }
    }
}
