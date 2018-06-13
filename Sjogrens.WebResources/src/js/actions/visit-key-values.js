import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISITKEYVALUES_SUCCESS = 'VISITKEYVALUES_SUCCESS'
export const VISITKEYVALUES_ASYNC_SUCCESS = 'VISITKEYVALUES_ASYNC_SUCCESS'
export const VISITKEYVALUES_CLEAR_SUCCESS = 'VISITKEYVALUES_CLEAR_SUCCESS'
export const VISITKEYVALUES_SAVE_SUCCESS = 'VISITKEYVALUES_SAVE_SUCCESS'
export const VISITKEYVALUES_SAVE_ERROR = 'VISITKEYVALUES_SAVE_ERROR'
export const VISITKEYVALUES_SAVED_SUCCESS = 'VISITKEYVALUES_SAVED_SUCCESS'

export function visitKeyValuesClearSuccess(){
    return{
        type:VISITKEYVALUES_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitKeyValuesClear(){
    //console.log('visit header clear....')
    return dispatch => {        
       dispatch(visitKeyValuesClearSuccess())
    }
}

export function saveVisitKeyValuesSuccess(visitKeyValues){

    return{
        type:VISITKEYVALUES_SUCCESS,
        payload: visitKeyValues
    }
}

export function saveVisitKeyValuesError(error){
    return{
        type:VISITKEYVALUES_SAVE_ERROR,
        payload: error
    }
}


export function saveVisitKeyValues(visitKeyValuesPostParams){
  //  console.log('visitKeyValuesPostParams')
   // console.log(visitKeyValuesPostParams)
    return dispatch => {
        dispatch({type:VISITKEYVALUES_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/visitkeyvalue/save',visitKeyValuesPostParams)
                    .then(function(response){
                    if (response.data) {
                        dispatch(saveVisitKeyValuesSuccess(response.data))
                        return response.data
                    }
                    else {
                        var error = new Error("There was a problem saving visit");
                        dispatch(saveVisitError(error))
                    }
                })
                .catch(function(error){
                    handleError(error);
                })
    }
}



export function getVisitKeyValuesSuccess(visitKeyValues){
    return{
          type:VISITKEYVALUES_SUCCESS,
          payload: visitKeyValues
      }
  }

export function getVisitKeyValues(visitKeyValuesGetParams){
   // console.log('getVisitKeyValues')
  //  console.log(getVisitKeyValues)
    return dispatch => {
        dispatch({type:VISITKEYVALUES_ASYNC_SUCCESS});
         return axios.post(paths.api + '/api/visitkeyvalue', visitKeyValuesGetParams)
            .then(function (response) {
                 dispatch(getVisitKeyValuesSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}


export function getSavedVisitKeyValuesSuccess(visitKeyValues){
    return{
          type:VISITKEYVALUES_SAVED_SUCCESS,
          payload: visitKeyValues
      }
  }

export function getSavedVisitKeyValues(visitKeyValuesGetParams){
  //  console.log('getSavedVisitKeyValues')
  //  console.log(getSavedVisitKeyValues)
    return dispatch => {
        dispatch({type:VISITKEYVALUES_ASYNC_SUCCESS});        
         return axios.post(paths.api + '/api/visitkeyvalue', visitKeyValuesGetParams)
            .then(function (response) {
                 dispatch(getSavedVisitKeyValuesSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}