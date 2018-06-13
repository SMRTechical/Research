import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISIT_HEADERS_SUCCESS = 'VISIT_HEADERS_SUCCESS'
export const VISIT_HEADERS_ASYNC_SUCCESS = 'VISIT_HEADERS_ASYNC_SUCCESS'
export const VISIT_HEADERS_CLEAR_SUCCESS = 'VISIT_HEADERS_CLEAR_SUCCESS'



export function getVisitHeadersSuccess(visitHeaders){
    return{
          type:VISIT_HEADERS_SUCCESS,
          payload: visitHeaders
      }
  }
  
export function getVisitHeaders(visitHeadersGetParams){
   // console.log('API getVisitHeaders')
    return dispatch => {

        dispatch({type:VISIT_HEADERS_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/visitheaders', visitHeadersGetParams)
            .then(function (response) {
                 dispatch(getVisitHeadersSuccess(response.data))
                 return response.data
            })
            .catch(function (error) {
                handleError(error);
            });
    }
}

export function visitHeadersClearSuccess(){
    return{
        type:VISIT_HEADERS_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitHeadersClear(){
    return dispatch => {        
       dispatch(visitHeadersClearSuccess())
    }
}
