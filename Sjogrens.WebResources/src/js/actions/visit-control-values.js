import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISITCONTROLVALUES_SUCCESS = 'VISITCONTROLVALUES_SUCCESS'
export const VISITCONTROLVALUES_ASYNC_SUCCESS = 'VISITCONTROLVALUES_ASYNC_SUCCESS'
// export const VISITCONTROLVALUES_CLEAR_SUCCESS = 'VISITCONTROLVALUES_CLEAR_SUCCESS'
// export const VISITCONTROLVALUES_SAVE_SUCCESS = 'VISITCONTROLVALUES_SAVE_SUCCESS'
// export const VISITCONTROLVALUES_SAVE_ERROR = 'VISITCONTROLVALUES_SAVE_ERROR'
// export const VISITCONTROLVALUES_SAVED_SUCCESS = 'VISITCONTROLVALUES_SAVED_SUCCESS'

export function visitControlValuesClearSuccess(){
    return{
        type:VISITCONTROLVALUES_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitControlValuesClear(){
    //console.log('visit header clear....')
    return dispatch => {        
       dispatch(visitControlValuesClearSuccess())
    }
}

// export function saveVisitKeyValuesSuccess(visitKeyValues){

//     return{
//         type:VISITKEYVALUES_SUCCESS,
//         payload: visitKeyValues
//     }
// }

// export function saveVisitKeyValuesError(error){
//     return{
//         type:VISITKEYVALUES_SAVE_ERROR,
//         payload: error
//     }
// }


// export function saveVisitKeyValues(visitKeyValuesPostParams){
//     console.log('visitKeyValuesPostParams')
//     console.log(visitKeyValuesPostParams)
//     return dispatch => {
//         dispatch({type:VISITKEYVALUES_ASYNC_SUCCESS});
//             return  axios.post(paths.api + '/api/visitkeyvalue/save',visitKeyValuesPostParams)
//                     .then(function(response){
//                     if (response.data) {
//                         dispatch(saveVisitKeyValuesSuccess(response.data))
//                         return response.data
//                     }
//                     else {
//                         var error = new Error("There was a problem saving visit");
//                         dispatch(saveVisitError(error))
//                     }
//                 })
//                 .catch(function(error){
//                     handleError(error);
//                 })
//     }
// }



export function getVisitControlValuesSuccess(visitControlValues){
    return{
          type:VISITCONTROLVALUES_SUCCESS,
          payload: visitControlValues
      }
  }

export function getVisitControlValues(visitControlValuesGetParams){
   // console.log('getVisitControlValues')
    //console.log(getVisitControlValues)
    return dispatch => {
        dispatch({type:VISITCONTROLVALUES_ASYNC_SUCCESS});
         return axios.post(paths.api + '/api/visitcontrolvalue', visitControlValuesGetParams)
            .then(function (response) {
                 dispatch(getVisitControlValuesSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}


// export function getSavedVisitControlValuesSuccess(visitControlValues){
//     return{
//           type:VISITKEYVALUES_SAVED_SUCCESS,
//           payload: visitKeyValues
//       }
//   }

// export function getSavedVisitKeyValues(visitKeyValuesGetParams){
//     console.log('getSavedVisitKeyValues')
//     console.log(getSavedVisitKeyValues)
//     return dispatch => {
//         dispatch({type:VISITKEYVALUES_ASYNC_SUCCESS});        
//          return axios.post(paths.api + '/api/visitkeyvalue', visitKeyValuesGetParams)
//             .then(function (response) {
//                  dispatch(getSavedVisitKeyValuesSuccess(response.data))
//                  return response.data;
//             })
//             .catch(function (error) {
//                 //console.log('the error');
//                // console.log(error);
//                 handleError(error);
//             });
//     }
// }