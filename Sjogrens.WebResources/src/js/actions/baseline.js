import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const PATIENT_BASELINE_SUCCESS = 'PATIENT_BASELINE_SUCCESS'
export const PATIENT_BASELINE_ASYNC_SUCCESS = 'PATIENT_BASELINE_ASYNC_SUCCESS'
export const PATIENT_BASELINE_CLEAR_SUCCESS = 'PATIENT_BASELINE_CLEAR_SUCCESS'
export const PATIENT_BASELINE_SAVE_SUCCESS = 'PATIENT_BASELINE_SAVE_SUCCESS'
export const PATIENT_BASELINE_SAVE_ERROR = 'PATIENT_BASELINE_SAVE_ERROR'
export const PATIENT_BASELINE_SAVED_SUCCESS = 'PATIENT_BASELINE_SAVED_SUCCESS'

export function getPatientBaselineSuccess(patientBaseline){
    return{
          type:PATIENT_BASELINE_SUCCESS,
          payload: patientBaseline
      }
  }
  
export function getPatientBaseline(patientDetailsGetParams){
   // console.log('getPatientBaseline');
    return dispatch => {

        dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/patient/baseline', patientDetailsGetParams)
            .then(function (response) {
                 dispatch(getPatientBaselineSuccess(response.data))
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export function patientBaselineClearSuccess(){
    return{
        type:PATIENT_BASELINE_CLEAR_SUCCESS,
        payload: null
    }
}

export function patientBaselineClear(){
    return dispatch => {        
       dispatch(patientBaselineClearSuccess())
    }
}





export function savePatientBaselineSuccess(patient){
    //console.log(PATIENT_BASELINE_SAVE_SUCCESS);
    return{
        type:PATIENT_BASELINE_SAVE_SUCCESS,
        payload: patient
    }
}

export function savePatientBaselineError(error){
    return{
        type:PATIENT_BASELINE_SAVE_ERROR,
        payload: error
    }
}


export function savePatientBaseline(patientAddParams){
    return dispatch => {
        dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/patient/baseline/save',patientAddParams)
                    .then(function(response){
                  //      console.log(response)
                      //  console.log('the data');
                    if (response.data) {
                        dispatch(savePatientBaselineSuccess(response.data))
                        return response.data
                    }
                    else {
                        var error = new Error("There was a problem saving baseline for Hospital Number: " + patientAddParams.pasId );
                        //throw error
                        dispatch(savePatientBaselineError(error))
                        return error
                    }
                })
                .catch(function(error){
                    handleError(error);
                })
    }
}



export function getSavedPatientBaselineSuccess(patientBaseline){
    return{
          type:PATIENT_BASELINE_SAVED_SUCCESS,
          payload: patientBaseline
      }
  }

export function getSavedPatientBaseline(patientDetailsGetParams){
    //console.log('getSavedPatientBaseline');
   // console.log(patientDetailsGetParams)
    return dispatch => {

        dispatch({type:PATIENT_BASELINE_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/patient/baseline', patientDetailsGetParams)
            .then(function (response) {
                 dispatch(getSavedPatientBaselineSuccess(response.data))
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}