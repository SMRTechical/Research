import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISIT_SUCCESS = 'VISIT_SUCCESS'
export const VISIT_ASYNC_SUCCESS = 'VISIT_ASYNC_SUCCESS'
export const VISIT_CLEAR_SUCCESS = 'VISIT_CLEAR_SUCCESS'
export const VISIT_SAVE_SUCCESS = 'VISIT_SAVE_SUCCESS'
export const VISIT_SAVE_ERROR = 'VISIT_SAVE_ERROR'
export const VISIT_SAVED_SUCCESS = 'VISIT_SAVED_SUCCESS'

export function visitClearSuccess(){
    return{
        type:VISIT_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitClear(){
    //console.log('visit header clear....')
    return dispatch => {        
       dispatch(visitClearSuccess())
    }
}

export function saveVisitSuccess(visit){
    //console.log('saveVisitSuccess')
   //console.log(VISIT_SAVE_SUCCESS)
   // console.log(visit);
    return{
        type:VISIT_SAVE_SUCCESS,
        payload: visit
    }
}

export function saveVisitError(error){
    return{
        type:VISIT_SAVE_ERROR,
        payload: error
    }
}


export function saveVisit(visitPostParams){
    //console.log('visitPostParams');
   // console.log('API saveVisit');
    return dispatch => {
        dispatch({type:VISIT_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/visit/save',visitPostParams)
                    .then(function(response){
                    if (response.data) {
                        dispatch(saveVisitSuccess(response.data))
                       // console.log(response.data);
                        return response.data
                    }
                    else {
                        var error = new Error("There was a problem saving visit");
                       // console.log(error)
                        //throw error
                        dispatch(saveVisitError(error))
                    }
                })
                .catch(function(error){
                    handleError(error);
                })
    }
}



export function getVisitSuccess(visit){
    return{
          type:VISIT_SUCCESS,
          payload: visit
      }
  }

export function getVisit(visitParams){
  //  console.log('API getVisit')
    return dispatch => {
//console.log(visitParams);
        dispatch({type:VISIT_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/visit', visitParams)
            .then(function (response) {
                 dispatch(getVisitSuccess(response.data))
                 //console.log(response.data);
                 return response.data;
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}


export function getSavedVisitSuccess(visit){
    return{
          type:VISIT_SAVED_SUCCESS,
          payload: visit
      }
  }

export function getSavedVisit(visitGetParams){
  //  console.log('API getSavedVisit');
   // console.log(patientDetailsGetParams)
    return dispatch => {

        dispatch({type:VISIT_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/visit', visitGetParams)
            .then(function (response) {
                 dispatch(getSavedVisitSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}