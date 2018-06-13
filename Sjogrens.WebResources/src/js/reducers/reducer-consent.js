import {CONSENT_SUCCESS,CONSENT_ASYNC_SUCCESS, CONSENT_CLEAR_SUCCESS,CONSENT_UPDATE_SUCCESS,CONSENT_UPDATE_ERROR,CONSENT_UPDATE_ASYNC_SUCCESS,CONSENT_UPDATE_CLEAR_SUCCESS} from '../actions/consent';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
        case CONSENT_ASYNC_SUCCESS:
            return Object.assign({}, state, {sendingRequest:true,requestRecieved:false, data:null, status:'Pending', statusClass:'pending'})
            break;
        case CONSENT_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
            break;
        case CONSENT_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
            break;
          case CONSENT_UPDATE_ASYNC_SUCCESS :
             return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
             break;
          case CONSENT_UPDATE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Updated', statusClass:''})
            break;
        case CONSENT_UPDATE_CLEAR_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
            break;
        case CONSENT_UPDATE_ERROR:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
               break;
    }
    
    return state;
  }