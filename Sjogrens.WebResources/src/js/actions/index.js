import axios from 'axios'
import {paths} from '../constants/paths/environment';
import {handleError, handleErrorMessage} from '../Factory/error-functions';
export const PATIENT_SEARCH_SUCCESS = 'PATIENT_SEARCH_SUCCESS';
export const PATIENT_SEARCH_CANCEL_SUCCESS = 'PATIENT_SEARCH_CANCEL_SUCCESS';
export const MIT_PATIENT_SAVE_SUCCESS = 'MIT_PATIENT_SAVE_SUCCESS';
export const MIT_PATIENT_CLEAR_SUCCESS = 'MIT_PATIENT_CLEAR_SUCCESS';
export const PATIENT_SEARCH_CLEAR_SUCCESS = 'PATIENT_SEARCH_CLEAR_SUCCESS';
export const PATIENTS_SEARCH_SUCCESS = 'PATIENTS_SEARCH_SUCCESS';
export const PATIENTS_SEARCH_CLEAR_SUCCESS = 'PATIENTS_SEARCH_CLEAR_SUCCESS';
export const PATIENT_DETAILS_SUCCESS = 'PATIENT_DETAILS_SUCCESS';
export const PATIENT_DETAILS_CLEAR_SUCCESS = 'PATIENT_DETAILS_CLEAR_SUCCESS';
export const PATIENT_SEARCH_ASYNC_SUCCESS = 'PATIENT_SEARCH_ASYNC_SUCCESS';
export const PATIENT_SEARCH_ERROR = 'PATIENT_SEARCH_ERROR';
export const MIT_PATIENT_SAVE_ASYNC_SUCCESS = 'MIT_PATIENT_SAVE_ASYNC_SUCCESS';
export const PATIENTS_SEARCH_ASYNC_SUCCESS = 'PATIENTS_SEARCH_ASYNC_SUCCESS';
export const PATIENT_DETAILS_ASYNC_SUCCESS = 'PATIENT_DETAILS_ASYNC_SUCCESS';

// export const PATIENT_UPDATE_SUCCESS = 'PATIENT_UPDATE_SUCCESS'
// export const PATIENT_UPDATE_ERROR = 'PATIENT_UPDATE_ERROR'
// export const PATIENT_UPDATE_ASYNC_SUCCESS = 'PATIENT_UPDATE_ASYNC_SUCCESS'
// export const PATIENT_UPDATE_CLEAR_SUCCESS = 'PATIENT_UPDATE_CLEAR_SUCCESS'


/**


export function patientUpdateSuccess(success){
    return{
        type:PATIENT_UPDATE_SUCCESS,
        payload: success
    }
}



export function patientUpdateError(error){
    return{
        type:PATIENT_UPDATE_ERROR,
        payload: error
    }
}

export function patientUpdate(patientPostParams){
    return dispatch => {
        dispatch({type:PATIENT_UPDATE_ASYNC_SUCCESS});
    
        return  axios.post(paths.api + '/api/patient/update',patientPostParams)
        .then(function(response){
            if (response.data && response.data.pid > 0) {           
                     dispatch(patientUpdateSuccess(response.data))
                     return response.data;
            }
            else {
                var error = new Error('There was a problem updating patient: ' + patientPostParams.pasId);
                //throw error
                 dispatch(patientUpdateError(error))
            }
        })
        .catch(function(error){
            handleError(error);
        })
    }
}


export function patientUpdateAndGet(patientPostParams, patientDetailsGetParams){
    console.log('patientUpdateAndGet')
    console.log(patientPostParams);
    console.log(patientDetailsGetParams);
  return  dispatch => {
       dispatch(patientUpdate(patientPostParams)).then(p=> dispatch(getPatientDetails(patientDetailsGetParams)));
    }
}

export function patientUpdateClearSuccess(){
    return{
        type:PATIENT_UPDATE_CLEAR_SUCCESS,
        payload: null
    }
}

export function patientUpdateClear(){
    return dispatch => {        
       dispatch(patientUpdateClearSuccess())
    }
}

***/

export function patientSearchClearSuccess(){
    return{
        type:PATIENT_SEARCH_CLEAR_SUCCESS,
        payload: null
    }
   }
   
   export function patientSearchClear(){
        return dispatch => {        
           dispatch(patientSearchClearSuccess())
        }
    }
   
   
   export function patientsSearchSuccess(patients){
       /*
       If we return null from web api then retun an  empty array so thet react map error
       is not returned within patients-found-list
       */
       return{
           type:PATIENTS_SEARCH_SUCCESS,
           payload: patients //? patients :[]
       }
   }
   export function patientsSearch(patientSearchParams){
       console.log('patientsSearch')
       return dispatch => {
           dispatch({type:PATIENTS_SEARCH_ASYNC_SUCCESS});
           console.log('paths.api + /api/patients/search');
           console.log(paths.api + '/api/patients/search');
           return axios.post(paths.api + '/api/patients/search',patientSearchParams)
           .then(function(response){
                  dispatch(patientsSearchSuccess(response.data)) 
           })
           .catch(function(error){
               handleError(error);
           })
       }
   }
   
   export function patientsSearchClearSuccess(patients){
       return{
           type:PATIENTS_SEARCH_CLEAR_SUCCESS,
           payload: null
       }
   }
   
   export function patientsSearchClear(){
       return dispatch => {        
          dispatch(patientsSearchClearSuccess())
       }
   }
   

export function patientSearchSuccess(patient){
    return{
        type:PATIENT_SEARCH_SUCCESS,
        payload: patient
    }
}

export function patientSearchError(error){
    return{
        type:PATIENT_SEARCH_ERROR,
        payload: error
    }
}

export function patientSearch(patientAddParams){
console.log('patientsearch')
    return dispatch => {
        console.log(paths.api + '/api/patient/search');
        console.log('patientAddParams');
        console.log(patientAddParams);
        dispatch({type:PATIENT_SEARCH_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/patient/search',patientAddParams)
                    .then(function(response){
                     //   console.log('patient_search_response');
                      //  console.log(response)
                    if (response.data) {
                        dispatch(patientSearchSuccess(response.data))
                       // console.log('patient_search_data');
                      //  console.log(response.data)
                        return response.data;
                    }
                    else {
                       // console.log('patientid error')
                        var error = new Error("Hospital Number: " + patientAddParams.pasId + " does not exist.");
                        //throw error
                        dispatch(patientSearchError(error))
                    }
                })
                .catch(function(error){
                   // console.log('error');
                   // console.log(error)
                   handleError(error);
                   // dispatch(patientSearchError(handleError(error)));
                   // var errorMessage = handleErrorMessage(error);
                   //var errorMessage = new Error("There was a problem");
                    //dispatch(patientSearchError(errorMessage));


                  
                })
    }
}

export function patientSearchCancelSuccess(){
    return{
        type:PATIENT_SEARCH_CANCEL_SUCCESS,
        payload: null
    }
}

export function patientSearchCancel(){
     return dispatch => {dispatch(patientSearchCancelSuccess());
    }
}

export function mitPatientSaveSuccess(newPatient){
    return{
        type:MIT_PATIENT_SAVE_SUCCESS,
        payload: newPatient
    }
}

export function mitPatientSave(patientAddWithAuditParams){
    console.log('mitpatientsave patientAddWithAuditParams')  
    console.log(patientAddWithAuditParams)
    return dispatch => {
        dispatch({type:MIT_PATIENT_SAVE_ASYNC_SUCCESS});
    
        return  axios.post(paths.api + '/api/mitpatient/save',patientAddWithAuditParams)
        .then(function(response){
            
            if (response.data && response.data.pid > 0) 
            { 
                console.log('mitpatientsave response.data')  
               console.log(response.data);        
                     dispatch(mitPatientSaveSuccess(response.data))
                     return response.data
            }
            else {
                var error = new Error('There was a problem importing patient: ' + patientAddWithAuditParams.pasId);
                throw error
            }
        })
        .catch(function(error){
            handleError(error);
        })
    }
}

export function mitPatientClearSuccess(){
    return{
        type:MIT_PATIENT_CLEAR_SUCCESS,
        payload: null
    }
}

export function mitPatientClear(){
    return dispatch => {        
       dispatch(mitPatientClearSuccess())
    }
}


export function getPatientDetailsSuccess(patientDetails){
    return{
          type:PATIENT_DETAILS_SUCCESS,
          payload: patientDetails
      }
  }
  
export function getPatientDetails(patientDetailsGetParams){
    return dispatch => {

        dispatch({type:PATIENT_DETAILS_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/patient/details', patientDetailsGetParams)
            .then(function (response) {
                 dispatch(getPatientDetailsSuccess(response.data));
                 return response.data
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export function patientDetailsClearSuccess(){
    return{
        type:PATIENT_DETAILS_CLEAR_SUCCESS,
        payload: null
    }
}

export function patientDetailsClear(){
    return dispatch => {        
       dispatch(patientDetailsClearSuccess())
    }
}

// export function getPatientBaselineSuccess(patientBaseline){
//     return{
//           type:PATIENT_BASELINE_SUCCESS,
//           payload: patientBaseline
//       }
//   }
  
// export function getPatientBaseline(patientDetailsGetParams){
//    // console.log('getPatientBaseline');
//     return dispatch => {

//         dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
        
//          return axios.post(paths.api + '/api/patient/baseline', patientDetailsGetParams)
//             .then(function (response) {
//                  dispatch(getPatientBaselineSuccess(response.data))
//             })
//             .catch(function (error) {
//                 handleError(error);
//             });
//     }
// }

// export function patientBaselineClearSuccess(){
//     return{
//         type:PATIENT_BASELINE_CLEAR_SUCCESS,
//         payload: null
//     }
// }

// export function patientBaselineClear(){
//     return dispatch => {        
//        dispatch(patientBaselineClearSuccess())
//     }
// }





// export function savePatientBaselineSuccess(patient){
//     //console.log(PATIENT_BASELINE_SAVE_SUCCESS);
//     return{
//         type:PATIENT_BASELINE_SAVE_SUCCESS,
//         payload: patient
//     }
// }

// export function savePatientBaselineError(error){
//     return{
//         type:PATIENT_BASELINE_SAVE_ERROR,
//         payload: error
//     }
// }


// export function savePatientBaseline(patientAddParams){
//     return dispatch => {
//         dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
//             return  axios.post(paths.api + '/api/patient/baseline/save',patientAddParams)
//                     .then(function(response){
//                         console.log(response)
//                         console.log('the data');
//                     if (response.data) {
//                         dispatch(savePatientBaselineSuccess(response.data))
//                     }
//                     else {
//                         var error = new Error("There was a problem saving baseline for Patient Id: " + patientAddParams.pasId );
//                         //throw error
//                         dispatch(savePatientBaselineError(error))
//                     }
//                 })
//                 .catch(function(error){
//                     handleError(error);
//                 })
//     }
// }



// export function getSavedPatientBaselineSuccess(patientBaseline){
//     return{
//           type:PATIENT_BASELINE_SAVED_SUCCESS,
//           payload: patientBaseline
//       }
//   }

// export function getSavedPatientBaseline(patientDetailsGetParams){
//     //console.log('getSavedPatientBaseline');
//    // console.log(patientDetailsGetParams)
//     return dispatch => {

//         dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
        
//          return axios.post(paths.api + '/api/patient/baseline', patientDetailsGetParams)
//             .then(function (response) {
//                  dispatch(getSavedPatientBaselineSuccess(response.data))
//             })
//             .catch(function (error) {
//                 //console.log('the error');
//                // console.log(error);
//                 handleError(error);
//             });
//     }
// }