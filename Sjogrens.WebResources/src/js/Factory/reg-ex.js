    export function digitsOnly2DecimalPlaces(value) {
        const re = /^\d+(?:\.\d{1,2})?$/
         return re.test(value);
    }

    export function twoDigitsOnly2DecimalPlaces(value) {
        const re = /^([0]|[0-9]|[0-9][0-9])(\.[0-9][0-9]?)?$/g;
        //const re = /^([0]|[1-9]|[1-9][0-9])(\.[0-9][1-9])?$/g;
        return re.test(value);
    }


   

    
    export function threeDigitsOnly1DecimalPlaces(value) {
        const re = /^([0]|[0-9]|[0-9][0-9]|[0-9][0-9][0-9])(\.[0-9]?)?$/g;
        //const re = /^([0]|[1-9]|[1-9][0-9])(\.[0-9][1-9])?$/g;
        return re.test(value);
    }

    export function twoDigitsOnly(value) {
        const re = /^([0]|[1-9]|[1-9][0-9])$/;
 
          return re.test(value);
     }

    //  export function time24Hour(value){
    //      const re = /^([0-1]?[0-9]{1}|2[0-3]{1}):([0-5]{1}[0-9]{1})$/;
    //      return re.text(value);
    //  }
 

    export function digitsOnly(value) {
       const re = /^([0]|[1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/

         return re.test(value);
    }
    export function digits1to9Only(value) {
        const re = /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/
         //const re = /(?:\b|-)([1-9]{1,2}[0]?|100)\b/
        // const re = /^([1-9]|[1-9][0-9]\d|100)$/ 
         return re.test(value);
     }

    export function validYear(year, minYear) {
        
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {
               // console.log("Please Enter Numeric Values Only");
                return false;
            }
    
            if (year.length < 4) {
              //  console.log("Year is not proper. Please check");
                return false;
            }
            var current_year=new Date().getFullYear();
            if((parseInt(year) < parseInt(minYear)) || (parseInt(year) > parseInt(current_year)))
                {
              //  console.log("Year should be in range 1920 to current year");
                return false;
                }
            return true;
        }
    }

    export function isNumber(value){
//        if (!isNaN(value) && typeof value === 'number' && isFinite(value)) {
     
        if (!isNaN(value)) {
            return true;
        }           
        else {
            return false;
        } 
    }

    export function isAlphanumeric(value){
        const re = /^[a-zA-Z0-9]+$/g;
        return re.test(value);
    }

    export function isAlpha(value){
        const re = /^[a-zA-Z]+$/g;
        return re.test(value);
    }

    export function isAlphanumericSpace(value){
        const re = /^[a-zA-Z0-9\s]+$/g;
        return re.test(value);
    }

    export function isNumericPeriod(value){
        const re = /^[0-9\.]+$/g;
        return re.test(value);
    }

    // export function isUkPostcode(value){
    //     console.log(value);
    //     //const re=/(?<O>(?<d>[BEGLMNS]|A[BL]|B[ABDHLNRST]|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]|F[KY]|G[LUY]|H[ADGPRSUX]|I[GMPV]|JE|K[ATWY]|L[ADELNSU]|M[EKL]|N[EGNPRW]|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKL-PRSTWY]|T[ADFNQRSW]|UB|W[ADFNRSV]|YO|ZE)(?<a>\d\d?)|(?<d>E)(?<a>\dW)|(?<d>EC)(?<a>\d[AMNPRVY0])|(?<d>N)(?<a>\dP)|(?<d>NW)(?<a>\dW)|(?<d>SE)(?<a>\dP)|(?<d>SW)(?<a>\d[AEHPVWXY])|(?<d>W)(?<a>1[0-4A-DFGHJKSTUW])|(?<d>W)(?<a>[2-9])|(?<d>WC)(?<a>[12][ABEHNRVX]))\ (?<I>(?<s>\d)(?<u>[ABD-HJLNP-UW-Z]{2}))/
    //     const re=/^(GIR ?0AA|(?:[A-PR-UWYZ](?:\d|\d{2}|[A-HK-Y]\d|[A-HK-Y]\d\d|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])) ?\d[ABD-HJLNP-UW-Z]{2})+$/g;
      
    //    // console.log(re.test(value));
    //     return re.test(value);
    // // }

    // export function digitsRange(value, min, max) {
    //     var input=parseFloat(value);
    //       if (input < min || input > max ) {
    //         console.log('value2')
    //         return false
    //       }
    //       else
    //         { 
    //             console.log('value3')                
    //             return true
    //         }
    // }

    // export function digitsLessThan(value, min) {
    //     var input=parseInt(value);
    //       if (input < min ) {
    //         return true
    //       }
    //       else
    //         { 
    //             return false
    //         }
    // }


    
    export function validMonth(month) {
        
        var text = /(^0?[1-9]$)|(^1[0-2]$)/;
        //if (month != 0) {
            if ((month != "") && (!text.test(month))) {
               // console.log("Please Enter valid Month");
                return false;
            }
            else 
            {
                return true;
            }
           // return digitsRange(month,1,12)


       //}
    }