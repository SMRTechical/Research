import axios from 'axios'
import {paths} from '../constants/paths/environment';
import {handleError} from '../Factory/error-functions';

export const SPINE_SEARCH_ASYNC_SUCCESS = 'SPINE_SEARCH_ASYNC_SUCCESS';
export const SPINE_SEARCH_SUCCESS = 'SPINE_SEARCH_SUCCESS';
export const SPINE_SEARCH_CANCEL_SUCCESS = 'SPINE_SEARCH_CANCEL_SUCCESS';
export const SPINE_SEARCH_CLEAR_SUCCESS = 'SPINE_SEARCH_CLEAR_SUCCESS';
export const SPINE_SEARCH_ERROR = 'SPINE_SEARCH_ERROR';
export const SPINE_DETAILS_SUCCESS = 'SPINE_DETAILS_SUCCESS';
export const SPINE_DETAILS_CLEAR_SUCCESS = 'SPINE_DETAILS_CLEAR_SUCCESS';
export const SPINE_DETAILS_ASYNC_SUCCESS = 'SPINE_DETAILS_ASYNC_SUCCESS';
export const SPINE_SAVE_ASYNC_SUCCESS = 'SPINE_SAVE_ASYNC_SUCCESS';
export const SPINE_SAVE_SUCCESS = 'SPINE_SAVE_SUCCESS';
export const SPINE_CLEAR_SUCCESS = 'SPINE_CLEAR_SUCCESS';

export function spineSearchClearSuccess(){
    return{
        type:SPINE_SEARCH_CLEAR_SUCCESS,
        payload: null
    }
   }
   
   export function spineSearchClear(){
        return dispatch => {        
           dispatch(spineSearchClearSuccess())
        }
    }
   
   

export function spineSearchSuccess(patient){
   // console.log(SPINE_SEARCH_SUCCESS)
    return{
        type:SPINE_SEARCH_SUCCESS,
        payload: patient
    }
}

export function spineSearchError(error){
   // console.log(SPINE_SEARCH_ERROR)
    return{
        type:SPINE_SEARCH_ERROR,
        payload: error
    }
}

export function spineSearch(patientAddParams){
    return dispatch => {
      //  console.log(SPINE_SEARCH_ASYNC_SUCCESS);
        dispatch({type:SPINE_SEARCH_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/patient/spine/search',patientAddParams)
                    .then(function(response){
                    //  console.log('/api/patient/spine/search');
                     // console.log(response)
                    if (response.data) {
                        dispatch(spineSearchSuccess(response.data))
//console.log("spine errors check")
                     //  console.log(response.data)
                        // if (response.data.errors){
                        //     var error = new Error("Patient Not found. Please check nhs number and date of birth");
                        //     //throw error
                        //     dispatch(spineSearchError(error))
                        // }
                        // else {

                        return response.data;
                        //}
                    }
                    else {
                        var error = new Error("NHS Number: " + patientAddParams.nhsNumber + " does not exist.");
                        //throw error
                        dispatch(spineSearchError(error))
                    }
                })
                .catch(function(error){
                  // console.log('spine search error');
                    handleError(error);
                })
    }
}

export function spineSearchCancelSuccess(){
    return{
        type:SPINE_SEARCH_CANCEL_SUCCESS,
        payload: null
    }
}

export function spineSearchCancel(){
     return dispatch => {dispatch(spineSearchCancelSuccess());
    }
}

export function spineSaveSuccess(newPatient){
    return{
        type:SPINE_SAVE_SUCCESS,
        payload: newPatient
    }
}

export function spineSave(patientAddWithAuditParams){
    return dispatch => {
        dispatch({type:SPINE_SAVE_ASYNC_SUCCESS});
    
        return  axios.post(paths.api + '/api/patient/spine/save',patientAddWithAuditParams)
        .then(function(response){
            if (response.data && response.data.pid > 0) {           
                     dispatch(spineSaveSuccess(response.data))
                     return response.data
            }
            else {
                var error = new Error('There was a problem importing patient: ' + patientAddWithAuditParams.nhsNumber);
                throw error
            }
        })
        .catch(function(error){
            handleError(error);
        })
    }
}

export function spineClearSuccess(){
    return{
        type:SPINE_CLEAR_SUCCESS,
        payload: null
    }
}

export function spineClear(){
    return dispatch => {        
       dispatch(spineClearSuccess())
    }
}


export function getSpineDetailsSuccess(patientDetails){
    return{
          type:SPINE_DETAILS_SUCCESS,
          payload: patientDetails
      }
  }
  
export function getSpineDetails(patientDetailsGetParams){
    return dispatch => {

        dispatch({type:SPINE_DETAILS_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/patient/spine/details', patientDetailsGetParams)
            .then(function (response) {
                 dispatch(getSpineDetailsSuccess(response.data))
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export function spineDetailsClearSuccess(){
    return{
        type:SPINE_DETAILS_CLEAR_SUCCESS,
        payload: null
    }
}

export function spineDetailsClear(){
    return dispatch => {        
       dispatch(spineDetailsClearSuccess())
    }
}

