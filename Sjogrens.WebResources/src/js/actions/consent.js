import axios from 'axios'
import {paths} from '../constants/paths/environment';
import {handleError} from '../Factory/error-functions';
export const CONSENT_SUCCESS = 'CONSENT_SUCCESS';
export const CONSENT_CLEAR_SUCCESS = 'CONSENT_CLEAR_SUCCESS';
export const CONSENT_ASYNC_SUCCESS = 'CONSENT_ASYNC_SUCCESS';
export const CONSENT_UPDATE_SUCCESS = 'CONSENT_UPDATE_SUCCESS'
export const CONSENT_UPDATE_ERROR = 'CONSENT_UPDATE_ERROR'
export const CONSENT_UPDATE_ASYNC_SUCCESS = 'CONSENT_UPDATE_ASYNC_SUCCESS'
export const CONSENT_UPDATE_CLEAR_SUCCESS = 'CONSENT_UPDATE_CLEAR_SUCCESS'

export function consentUpdateSuccess(success){
    console.log('consentUpdateSuccess')
    return{
        type:CONSENT_UPDATE_SUCCESS,
        payload: success
    }
}

export function consentUpdateError(error){
    console.log('consentUpdateError')
    return{
        type:CONSENT_UPDATE_ERROR,
        payload: error
    }
}

export function consentUpdate(consentPostParams){
    console.log('consentUpdate');
    return dispatch => {
        dispatch({type: CONSENT_UPDATE_ASYNC_SUCCESS});
       // console.log(consentPostParams);
        
     //   console.log('consentUpdate consentPostParams');
      //  console.log(consentPostParams);
        return  axios.post(paths.api + '/api/consent/save',consentPostParams)
        .then(function(response){
           if (response.data) {    
               console.log('consentUpdate response.data');
               console.log(response.data);
                     dispatch(consentUpdateSuccess(response.data))
                     return response.data;
            }
            else {
                console.log('consentUpdate: There was a problem updating consent')
                var error = new Error('There was a problem updating consent');
                 dispatch(consentUpdateError(error))
            }
        })
        .catch(function(error){
            handleError(error);
        })
    }
}

export function consentUpdateWithToken(token, consentPostParams){
console.log('consentUpdateWithToken:' + token)

//console.log(consentPostParams);

    return dispatch => {

        if (token){
             consentPostParams.token  = token


             var consentGetParams = {
                token: token
            }

           // console.log('updateconsent token:' + consentPostParams.token + ' ' + consentPostParams.consentGiven)
        return   dispatch(consentUpdateAndGet(consentPostParams,consentGetParams));

        }
        else {
            //console.log('consent error');
            return dispatch(consentUpdateError('No Token'));
        }

    }
}


export function consentUpdateAndGet(consentPostParams, consentGetParams){
console.log('consentUpdateAndGet')
//console.log(consentPostParams);
//console.log(consentGetParams);

  return  dispatch => {
        dispatch(consentUpdate(consentPostParams)).then(p=> dispatch(getConsent(consentGetParams)));
    }
}

export function consentUpdateClearSuccess(){
    return{
        type:CONSENT_UPDATE_CLEAR_SUCCESS,
        payload: null
    }
}

export function consentUpdateClear(){
    return dispatch => {        
       dispatch(consentUpdateClearSuccess())
    }
}

export function getConsentSuccess(consent){
    console.log('CONSENT_SUCCESS');
   console.log(consent);
    return{
          type:CONSENT_SUCCESS,
          payload: consent
      }
  }
  
export function getConsent(consentGetParams){
   console.log('getConsent start');
  console.log(consentGetParams)
  console.log('getConsent end');
   
    return dispatch => {

        dispatch({type:CONSENT_ASYNC_SUCCESS});
        console.log('paths.api' + '/api/consent')
        console.log(paths.api + '/api/consent')
         return axios.post(paths.api + '/api/consent', consentGetParams)
            .then(function (response) {
                console.log('getting consent')
                 dispatch(getConsentSuccess(response.data))
                 return response.data
            })
            .catch(function (error) {
                console.log('consent error')
                handleError(error);
            });
    }
}

export function consentClearSuccess(){
   // console.log('consentClearSuccess');
    return{
        type:CONSENT_CLEAR_SUCCESS,
        payload: null
    }
}

export function consentClear(){
   // console.log('consentClear');
    return dispatch => {        
       dispatch(consentClearSuccess())
    }
}


export function getConsentForAddPatient(patient){
    console.log('getConsentForAddPatient')
    return dispatch => {
        if (patient) {
//console.log('patient PasId truthy:' + !!patient.pasId)
//console.log('patient PasId:' + patient.pasId)
//console.log('patient Exists:' + patient.exists)

// console.log('getConsentForAddPatient token:' + patient.token)
           // console.log('error:' + patient.errors ? 'errors' : 'no error')

var error = patient.errors ? patient.errors.length > 0 ? true : false : false
//var pasIdError = !!patient.pasId ? true : false
 

        if (patient.token && !error &&  patient.exists){
            var consentGetParams = {
                token:patient.token
            };
            console.log('getconsenttoken:' + patient.token)
        console.log('dispatch(getConsent(consentGetParams));')
            return   dispatch(getConsent(consentGetParams));

        }
        else {
            //console.log('clear consent');
            return dispatch(consentClear());
        }
    }

    else {
       // console.log('clear consent');
        return dispatch(consentClear()); 
    }
}


}

