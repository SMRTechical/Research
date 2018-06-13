import moment from 'moment';

    export function padDayMonthWithZero(n) {
        return n<10 ? '0'+n : n
    }

    export function handleDateFormat(theDate){
      
        var currentDate = new Date(theDate);
       
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();
        
        return  padDayMonthWithZero(date) + "/" + padDayMonthWithZero(month + 1) + "/" + year;
     }

     

    export function handleDateTimeFormat(theDate){
       
       var currentDate = new Date(theDate);
      
       var date = currentDate.getDate();
       var month = currentDate.getMonth(); //Be careful! January is 0 not 1
       var year = currentDate.getFullYear();
       var hour = currentDate.getHours();
       var minutes = currentDate.getMinutes();
       var seconds = currentDate.getSeconds();
       
       return  padDayMonthWithZero(date) + "/" + padDayMonthWithZero(month + 1) + "/" + year + " " + padDayMonthWithZero(hour) + ":"+ padDayMonthWithZero(minutes) + ":" + padDayMonthWithZero(seconds);
    }

    
export function isStringValidDate(theDate, format){
    //format: 'DD/MM/YYYY'
    if (theDate.length === 0) return false;
    if (!format || format.length === 0 ) format = 'DD/MM/YYYY'; 

    var momentDate   = moment(theDate, format, true);
    var isDateValid = momentDate.isValid();

// console.log('isStringValidDate')
// console.log(momentDate);
// console.log(isDateValid)


    return isDateValid

}

export function isDateAfterToday(theDate, format){
    if (theDate.length === 0) return false;
    if (!format || format.length === 0 ) format = 'DD/MM/YYYY'; 

    var momentDate   = moment(theDate, format, true);
    var isDateAfter = momentDate.isAfter();
    return isDateAfter
}


export function isDate(dateValue) {
    //http://jsfiddle.net/bruscopelliti/EZVdg/
    var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

    return regex.test(dateValue);
  }