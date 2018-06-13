

import math from 'mathjs';

   export function  ocularSignsObjectiveValidation(leftEye, rightEye){
    // console.log('ocularSignsObjectiveValidation')
        var l = !isNaN(leftEye) ? leftEye : 0;  
        var r = !isNaN(rightEye) ? rightEye : 0;
       // console.log('l <= 5 && r > (l + 10)) || (r <= 5 && l > (r + 10)')
      //  console.log(l <= 5 && r >= (l + 10)) || (r <= 5 && l >= (r + 10))
       // console.log(l)
       // console.log(r)
        // console.log((l + 10));
        // console.log(l <= 5);
        // console.log(r >= ( l + 10))
        // console.log(r <= 5);
        // console.log((r + 10))
        // console.log(l >= ( r + 10))

        return (parseInt(l) <= parseInt(5) && parseInt(r) >= (parseInt(l) + parseInt(10)) || 
                parseInt(r) <= parseInt(5) && parseInt(l) >= (parseInt(r) + parseInt(10)))
     }





     export function objectiveEvidenceValidation(objectiveEvidenceMins){
         var mins = !isNaN(objectiveEvidenceMins) ? objectiveEvidenceMins : 0;
        //  console.log('mins');
        //  console.log(mins);
        //  console.log('mins < 5 || mins > 15')
        //  console.log(parseInt(mins) < parseInt(5) || parseInt(mins) > parseInt(15));
        //  console.log('parseInt(mins) < parseInt(5)');
        //  console.log(parseInt(mins) < parseInt(5));
        //  console.log('parseInt(mins) > parseInt(15)');
        //  console.log(parseInt(mins) > parseInt(15));
         if (parseInt(mins) <= 0)
          return false;
         else
          return (parseInt(mins) < parseInt(5) || parseInt(mins) > parseInt(15))
     }


export function meets2016ACRECCriteria(ocularSignsObjectiveA,ocularSignsObjectiveB,objectiveEvidenceA, histopathologyA, autoAntibodiesA){
const mustReachTotal = 4
var currentTotal = 0

if (ocularSignsObjectiveA){ 
  currentTotal = currentTotal + 1
}

if (ocularSignsObjectiveB){
    currentTotal = currentTotal + 1
  }
  
if (objectiveEvidenceA){
    currentTotal = currentTotal + 1
  }

  if (histopathologyA) {
    currentTotal = currentTotal + 3
  }

if (autoAntibodiesA){
  currentTotal = currentTotal + 3
}

return currentTotal >= mustReachTotal

}

     export function meetsAECGCCriteria(ocularSymptoms,oralSymptoms,ocularSigns, objectiveEvidence, histopathology,autoAntibodies){
        // console.log('meetsAECGCCriteria');
        // console.log(ocularSymptoms)
        // console.log(oralSymptoms)
        // console.log(ocularSigns)
        // console.log(objectiveEvidence) 
        // console.log(histopathology)
        // console.log(autoAntibodies)

          if (ocularSymptoms && oralSymptoms && ocularSigns && histopathology ){
          // console.log('TRUE 1')
            return true
          }
          /*added start */
          else if (ocularSymptoms && oralSymptoms && histopathology && autoAntibodies){								
            return true								
            }								
            else if (ocularSymptoms && ocularSigns && histopathology && autoAntibodies){								
              return true								
            }								
            else if (oralSymptoms && ocularSigns && histopathology && autoAntibodies){								
              return true					
            }								
            else if (oralSymptoms && objectiveEvidence && histopathology && autoAntibodies){								
              return true					
            }								
            else if (ocularSigns && objectiveEvidence && histopathology && autoAntibodies){								
              return true							
            }								
            else if (ocularSymptoms && objectiveEvidence && histopathology && autoAntibodies){								
              return true						
            }								
            
          /*added end */
         else if (ocularSymptoms && oralSymptoms && ocularSigns && autoAntibodies){
           // console.log('TRUE 2')
             return true
         }
         else if (oralSymptoms && ocularSigns && objectiveEvidence && histopathology){
            //console.log('TRUE 3')
            return true
         }
         else if (oralSymptoms && ocularSigns && objectiveEvidence && autoAntibodies){
         // console.log('TRUE 4')
            return true
         }
         else if (ocularSymptoms &&  ocularSigns && objectiveEvidence && histopathology){
          //console.log('TRUE 5')
            return true
         }
         else if (ocularSymptoms &&  ocularSigns && objectiveEvidence && autoAntibodies){
          //console.log('TRUE 6')
            return true
         }
         else if (ocularSymptoms &&  oralSymptoms && objectiveEvidence && histopathology){
         // console.log('TRUE 7')
            return true
         }
         else if (ocularSymptoms &&  oralSymptoms && objectiveEvidence && autoAntibodies){
         // console.log('TRUE 8')
            return true
         }
         else if (ocularSigns &&  objectiveEvidence && histopathology){
         // console.log('TRUE 9')
            return true
         }
         else if (ocularSigns &&  objectiveEvidence &&  autoAntibodies){
         // console.log('TRUE 10')
            return true
         }
         else if (objectiveEvidence && histopathology && autoAntibodies){
         // console.log('TRUE 11')
            return true
         }
         else if (ocularSigns &&  histopathology &&  autoAntibodies){
          //console.log('TRUE 12')
            return true
         }
         else{
            // console.log('TRUE 13') 
            return false
         }
     }

     export function maxLengthCheck(object) {
        if (object.target.value.length > object.target.maxLength)
          object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    

      
    //  export function maxLengthCheck_YYYY(object) {
       
    //   if (object.target.value.length > object.target.maxLength)
    //     object.target.value = object.target.value.slice(0, object.target.maxLength)
    // }

    //   export function addZeroes( num ) {
    //     // Cast as number
    //     var num = Number(num);
    //     // If not a number, return 0
    //     if (isNaN) {
    //          return 0;
    //     }
    //     // If there is no decimal, or the decimal is less than 2 digits, toFixed
    //     if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
    //         num = num.toFixed(2);
    //     }
    //     // Return the number
    //     return num;
    //  }

    export function addZeroes( num ) {
        var value = Number(num);
        var res = num.split(".");
        if(num.indexOf('.') === -1) {
            value = value.toFixed(2);
            num = value.toString();
        } else if (res[1].length < 3) {
            value = value.toFixed(2);
            num = value.toString();
        }
    return num
    }


    
export function getTotalWeighting(controlValueId, weightingArray, weighting){
  
          var selectedValue = parseInt(controlValueId) % 10
          
          // console.log('selectedValue')
        //  console.log(selectedValue)
          // console.log( weightingArray)
          // console.log( weightingArray[1])
          // console.log( weightingArray[2])
          
          switch (parseInt(selectedValue)) {
              case 1 :
                 {
                  return parseInt(weighting) * parseInt(weightingArray[0]);
                     
                 }
                 case 2 :
                 {
                  return parseInt(weighting) * parseInt(weightingArray[1]);
                 }
                 case 3 :
                 {
                  return parseInt(weighting) * parseInt(weightingArray[2]);
                 }    
                 case 4 :
                 {
                  return parseInt(weighting) * parseInt(weightingArray[3]);
                 }    
  
          }
      }


      export function getCODSTotalScore(controlValueId){
        
                var selectedValue = parseInt(controlValueId) % 10
                
                 console.log('getCODSTotalScore - selectedValue')
                console.log(selectedValue)
                
                switch (parseInt(selectedValue)) {
                    case 1 :
                       {
                        return 1;
                           
                       }
                       case 2 :
                       {
                        return -1;
                       }
                }
            }