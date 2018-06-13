import axios from 'axios'
import {handleError} from '../Factory/error-functions';
import {paths} from '../constants/paths/environment';

export const VISIT_HEADER_SUCCESS = 'VISIT_HEADER_SUCCESS'
export const VISIT_HEADER_ASYNC_SUCCESS = 'VISIT_HEADER_ASYNC_SUCCESS'


export const NEW_ATTENDANCE_HEADER_SUCCESS = 'NEW_ATTENDANCE_HEADER_SUCCESS'
export const NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS = 'NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS'
export const NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS = 'NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS'



export const VISIT_HEADER_CLEAR_SUCCESS = 'VISIT_HEADER_CLEAR_SUCCESS'
export const VISIT_HEADER_SAVE_SUCCESS = 'VISIT_HEADER_SAVE_SUCCESS'
export const VISIT_HEADER_SAVE_ERROR = 'VISIT_HEADER_SAVE_ERROR'
export const VISIT_HEADER_SAVED_SUCCESS = 'VISIT_HEADER_SAVED_SUCCESS'

export function visitHeaderClearSuccess(){
    return{
        type:VISIT_HEADER_CLEAR_SUCCESS,
        payload: null
    }
}

export function visitHeaderClear(){
   // console.log('visit header clear....')
    return dispatch => {        
       dispatch(visitHeaderClearSuccess())
    }
}




export function saveVisitHeaderSuccess(visitHeader){
   // console.log('saveVisitHeaderSuccess')
   // console.log('VISIT_HEADER_SAVE_SUCCESS')
   // console.log(visitHeader);
    return{
        type:VISIT_HEADER_SAVE_SUCCESS,
        payload: visitHeader
    }
}

export function saveVisitHeaderError(error){
    return{
        type:VISIT_HEADER_SAVE_ERROR,
        payload: error
    }
}


export function saveVisitHeader(visitHeaderPostParams){
  //  console.log('API saveVisitHeader')
    return dispatch => {
        dispatch({type:VISIT_HEADER_ASYNC_SUCCESS});
            return  axios.post(paths.api + '/api/visitheader/save',visitHeaderPostParams)
                    .then(function(response){
                    if (response.data) {
                        dispatch(saveVisitHeaderSuccess(response.data))
                       // console.log(response.data);
                        return response.data
                    }
                    else {
                        var error = new Error("There was a problem saving visit header: " + visitHeaderPostParams.dateOfVisit );
                        //throw error
                        dispatch(saveVisitHeaderError(error))
                    }
                })
                .catch(function(error){
                    handleError(error);
                })
    }
}


export function getVisitHeaderSuccess(visitHeader){
   // console.log(visitHeader);
    return{
          type:VISIT_HEADER_SUCCESS,
          payload: visitHeader
      }
  }

//   export function getVisitNewHeaderSuccess(visitHeader){
//     return{
//           type:VISIT_NEW_HEADER_SUCCESS,
//           payload: visitHeader
//       }
//   }

export function getVisitHeader(visitHeaderParams){
   // console.log('API getVisitHeader')
    return dispatch => {
//console.log('from api')
        //console.log(visitHeaderParams);
        dispatch({type:VISIT_HEADER_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/visitheader', visitHeaderParams)
            .then(function (response) {
                //console.log('getVisitHeader')
                    dispatch(getVisitHeaderSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}

export function newAttendanceHeaderClearSuccess(){
    return{
        type:NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS,
        payload: null
    }
}

export function newAttendanceHeaderClear(){
   // console.logconsole.log('newAttendanceHeaderClear....')
    return dispatch => {        
       dispatch(newAttendanceHeaderClearSuccess())
    
    }
}

export function getNewAttendanceHeaderSuccess(newAttendanceHeader){
    // console.log('getNewAttendanceHeaderSuccess');
     //console.log(newAttendanceHeader)
     return{
           type:NEW_ATTENDANCE_HEADER_SUCCESS,
           payload: newAttendanceHeader
       }
   }
 
 //   export function getVisitNewHeaderSuccess(visitHeader){
 //     return{
 //           type:VISIT_NEW_HEADER_SUCCESS,
 //           payload: visitHeader
 //       }
 //   }
 
 export function getNewAttendanceHeader(visitHeaderParams){
    // console.log('API getNewAttendanceHeader')
     return dispatch => {
        // console.log('getNewAttendanceHeader');
 //console.log(visitHeaderParams);
         dispatch({type:NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS});
         
          return axios.post(paths.api + '/api/visitheader', visitHeaderParams)
             .then(function (response) {
                 
               // console.log('response');
                //console.log(response);
                     dispatch(getNewAttendanceHeaderSuccess(response.data))
                     //console.log('getNewAttendanceHeader --data')
                     //console.log(response);
                  return response.data;
             })
             .catch(function (error) {
                // console.log('getNewAttendanceHeader the error');
                //console.log(error);
                 handleError(error);
             });
     }
 }
 


export function getSavedVisitHeaderSuccess(visitHeader){
    return{
          type:VISIT_HEADER_SAVED_SUCCESS,
          payload: visitHeader
      }
  }

export function getSavedVisitHeader(visitHeaderGetParams){
//console.log('API getSavedVisitHeader')
    return dispatch => {

        dispatch({type:VISIT_HEADER_ASYNC_SUCCESS});
        
         return axios.post(paths.api + '/api/visitheader', visitHeaderGetParams)
            .then(function (response) {
                 dispatch(getSavedVisitHeaderSuccess(response.data))
                 return response.data;
            })
            .catch(function (error) {
                //console.log('the error');
               // console.log(error);
                handleError(error);
            });
    }
}