using System;

namespace Sjogrens.Core.ExtensionMethods
{
    public static class Numeric
    {
        public static decimal Clamp(this decimal value, decimal min, decimal max)
        {
            if (max < min)
                throw new ArgumentOutOfRangeException(nameof(max), "max must be greater than min.");

            if (value < min) return min;
            if (value > max) return max;
            return value;
        }

        public static bool IsNumeric(this object obj)
        {
            if (Equals(obj, null))
                return false;

            Type objType = obj.GetType();
            objType = Nullable.GetUnderlyingType(objType) ?? objType;

            if (objType.IsPrimitive)
            {
                return objType != typeof(bool) &&
                    objType != typeof(char) &&
                    objType != typeof(IntPtr) &&
                    objType != typeof(UIntPtr);
            }

            return objType == typeof(decimal);
        }
    }
}
