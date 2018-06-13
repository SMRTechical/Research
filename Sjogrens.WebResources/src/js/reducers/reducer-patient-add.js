import {PATIENT_SEARCH_ASYNC_SUCCESS,PATIENT_SEARCH_SUCCESS, PATIENT_SEARCH_ERROR, PATIENT_SEARCH_CANCEL_SUCCESS, PATIENT_SEARCH_CLEAR_SUCCESS} from '../actions/index';


const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){

        case PATIENT_SEARCH_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
        case PATIENT_SEARCH_SUCCESS:
               return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
               break;
        case PATIENT_SEARCH_CANCEL_SUCCESS:
              return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})
              break;
        case PATIENT_SEARCH_CLEAR_SUCCESS:
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})        
                break;
         case PATIENT_SEARCH_ERROR:
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})
                break;

    }
    
    return state;
  }