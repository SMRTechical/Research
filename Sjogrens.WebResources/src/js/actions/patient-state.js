import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const PATIENT_STATE_SUCCESS = 'PATIENT_STATE_SUCCESS'
export const PATIENT_STATE_ASYNC_SUCCESS = 'PATIENT_STATE_ASYNC_SUCCESS'
export const PATIENT_STATE_CLEAR_SUCCESS = 'PATIENT_STATE_CLEAR_SUCCESS'

export function patientStateClearSuccess(){
    return{
        type:PATIENT_STATE_CLEAR_SUCCESS,
        payload: null
    }
}

export function patientStateClear(){
   // console.log('patient state clear....')
    return dispatch => {        
       dispatch(patientStateClearSuccess())
    }
}


export function getPatientStateSuccess(patientState){
    return{
          type:PATIENT_STATE_SUCCESS,
          payload: patientState
      }
  }


//   export function getPatientDetails(patientDetailsGetParams){
//     return dispatch => {

//         dispatch({type:PATIENT_DETAILS_ASYNC_SUCCESS});
        
//          return axios.post(paths.api + '/api/patient/details', patientDetailsGetParams)
//             .then(function (response) {
//                  dispatch(getPatientDetailsSuccess(response.data));
//                  return response.data
//             })
//             .catch(function (error) {
//                 handleError(error);
//             });
//     }
// }


export function getPatientState(patientStateParams){
   console.log('API getPatientState');
   console.log(patientStateParams);
    return dispatch => {
     //   console.log('just done dispatch')
        dispatch({type:PATIENT_STATE_ASYNC_SUCCESS});
      //  console.log('bout to call patient state api')
console.log(paths.api + '/api/patientstate');
         return axios.post(paths.api + '/api/patientstate', patientStateParams)
            .then(function (response) {
               // console.log('patientStateParams: getPatientState')     
               // console.log(response);   
                    dispatch(getPatientStateSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
               // console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}


// export function getSavedpatientStateSuccess(patientState){
//     return{
//           type:PATIENT_STATE_SAVED_SUCCESS,
//           payload: patientState
//       }
//   }

// export function getSavedpatientState(patientStateGetParams){
//     //console.log('getSavedPatientBaseline');
//    // console.log(patientDetailsGetParams)
//     return dispatch => {

//         dispatch({type:PATIENT_STATE_ASYNC_SUCCESS});
        
//          return axios.post(paths.api + '/api/patientState', patientStateGetParams)
//             .then(function (response) {
//                  dispatch(getSavedpatientStateSuccess(response.data))
//                  return response.data;
//             })
//             .catch(function (error) {
//                 //console.log('the error');
//                // console.log(error);
//                 handleError(error);
//             });
//     }
// }