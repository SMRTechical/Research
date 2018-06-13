import {PATIENT_DETAILS_SUCCESS,PATIENT_DETAILS_ASYNC_SUCCESS, PATIENT_DETAILS_CLEAR_SUCCESS} from '../actions/index';



const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case PATIENT_DETAILS_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case PATIENT_DETAILS_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case PATIENT_DETAILS_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
    }
    
    return state;
  }