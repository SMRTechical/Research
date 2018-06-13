using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Factories
{
   public  class DateTimeFactory
    {

        public static DateTime? ConvertStringToDate(string date)
        {
            return (!string.IsNullOrEmpty(date)) ? DateTime.Parse(date) : (DateTime?)null;
        }
        public static string ConvertDate(string sDate, string olddateformat = "", bool blnTryParse = true)
        {
            string sDob = null;
            DateTime dDob = default(DateTime);
            if (olddateformat == "yyyyMMdd")
            {
                if (sDate.Length < 8)
                {
                    return string.Empty;
                }
                sDob = sDate.Substring(6, 2) + "/" + sDate.Substring(4, 2) + "/" + sDate.Substring(0, 4);
            }
            else
            {
                sDob = sDate;
            }

            if (blnTryParse)
            {
                bool bResult = false;
                bResult = DateTime.TryParse(sDob, out dDob);
                if (bResult)
                {
                    return dDob.ToString("dd-MMM-yyyy");
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                return sDob;
            }
        }


        public static bool IsValidDateTosql(string dateTime)
        {
            //var dateTime2 = DateTime.ParseExact(dateTime, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            //var yourNewString = dateTime2.ToString("yyyy-MM-dd");

            string[] formats = { "yyyy-MM-dd","yyyy-MM-ddThh:mm:ss", "yyyy-MM-ddThh:mm:ss.SSSZ", "yyyy-MM-ddThh:mm:ss.fffZ" };
            DateTime parsedDateTime;
            return DateTime.TryParseExact(dateTime, formats, new CultureInfo("en-GB"),
                                           DateTimeStyles.None, out parsedDateTime);
        }
    }
}
