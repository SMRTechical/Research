

  export function getVisitOptionControlValue(categoryId,visitSectionControls,savedVisitControlArray){
    
        var returnVal = 0;
        for (var ctrl of savedVisitControlArray) {   
            if (ctrl.categoryId == categoryId ){
                for (var visitCtrl of visitSectionControls) {   
                    if (ctrl.controlId == visitCtrl.controlId)
                        returnVal = ctrl.controlValueId;
                    break;
                }
            }
        }
    
            return returnVal 
      }


      export function getVisitOptionControlValue_V2(categoryId,visitSectionControls,savedVisitControlArray){
        
            var returnVal = null;
            for (var ctrl of savedVisitControlArray) {   
                if (ctrl.categoryId == categoryId ){
                    for (var visitCtrl of visitSectionControls) {   
                        if (ctrl.controlId == visitCtrl.controlId)
                            returnVal = ctrl.controlValueId;
                        break;
                    }
                }
            }
        
                return returnVal 
          }

  export function getDetailsControlValue(categoryId,visitSectionControl,savedVisitControlArray){
    var returnVal='';

    for (var ctrl of savedVisitControlArray) { 
        if (ctrl.categoryId == categoryId ){   
                if (ctrl.controlId == visitSectionControl.controlId)
                    {
                    returnVal = ctrl.value;
                break;}
        }
    }
        return returnVal 
  }


  export function getDetailsControlValue_V2(categoryId,visitSectionControl,savedVisitControlArray){
    var returnVal=null;

    for (var ctrl of savedVisitControlArray) { 
        if (ctrl.categoryId == categoryId ){   
                if (ctrl.controlId == visitSectionControl.controlId)
                    {
                    returnVal = ctrl.value;
                break;}
        }
    }
        return returnVal 
  }

  export function getCategoryControls(categoryId,visitControls){
//     var returnVal='';
   var categoryControls =[];
    for (var ctrl of visitControls) { 
        if (ctrl.categoryId == categoryId ){   
            categoryControls.push(ctrl)
        }
    }
// console.log('categoryControls')
// console.log(categoryControls)

//var categoryControls = visitControls.findIndex(x=>x.categoryId == categoryId)

//console.log('categoryControls');
//console.log(categoryControls);

        return categoryControls 
  }


  export function getControlValues(listControlId, options){
//     var returnVal='';
    var controlValues =[];
    for (var ctrl of options) { 
        if (ctrl.controlId == listControlId ){   
            controlValues.push(ctrl)
        }
    }
// console.log('categoryControls')
// console.log(categoryControls)

//var controlValues = options.findIndex(x=>x.controlId == controlId)

//console.log('controlValues');
//console.log(controlValues);

        return controlValues 
  }
