using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sjogrens.Core.Factories
{
    public class PatientFactory
    {
        public static int CalculateAge(DateTime? dateOfBirth)
        {
            int age = 0;
            if (dateOfBirth == null || !dateOfBirth.HasValue)
            {
                return age;
            }
            else
            {
                age = DateTime.Now.Year - dateOfBirth.Value.Year;
                if (DateTime.Now.DayOfYear < dateOfBirth.Value.DayOfYear)
                    age = age - 1;
            }
            return age;
        }


    }
}
