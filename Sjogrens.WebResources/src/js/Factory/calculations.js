    


    export function digitsRange(value, min, max) {
        var input=parseFloat(value);
//         console.log('digitsRange');
// console.log('input < parseFloat(min) || input > parseFloat(max) ')
// console.log(input < parseFloat(min) || input > parseFloat(max) )
// console.log(input < parseFloat(min) )
// console.log(input > parseFloat(max) )


          if (input < parseFloat(min) || input > parseFloat(max) ) {
            return false
          }
          else
            {              
                return true
            }
    }

    export function digitsLessThan(value, min) {
    //  console.log('digitsLessThan');
        var input=parseInt(value);
          if (input < parseInt(min) ) {
            return true
          }
          else
            { 
                return false
            }
    }



   

    export function salivaryFlowRate(mlValue, minValue) {
      // console.log('salivaryFlowRate')
      // console.log(mlValue);
      // console.log(minValue);
      
      var ml=parseFloat(mlValue);
      var min=parseFloat(minValue);
      
      // console.log('(ml/min) >= parseFloat(flowRate)')
      // console.log((ml/min) >= parseFloat(flowRate))
      // if (ml == 0 || min == 0){
      //   return false;
      // }
      // else {
        var flowRate = 0.1;
        if ((ml/min) > parseFloat(flowRate)) {
          return false
        }
        else
          { 
              return true
          }

     // }
     
  }
  
  export function SchirmersITest(ocularValue){
    ocular=parseFloat(ocularValue);
    var flowRate = (ocular/5);
      if(flowRate <= 1){
        return true
      }
      else {
        return false
      }
  }

