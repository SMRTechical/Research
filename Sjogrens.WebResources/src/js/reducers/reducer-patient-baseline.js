import {PATIENT_BASELINE_SUCCESS,PATIENT_BASELINE_ASYNC_SUCCESS, PATIENT_BASELINE_CLEAR_SUCCESS,PATIENT_BASELINE_SAVE_SUCCESS,PATIENT_BASELINE_SAVED_SUCCESS,PATIENT_BASELINE_SAVE_ERROR} from '../actions/baseline';


const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case PATIENT_BASELINE_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case PATIENT_BASELINE_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case PATIENT_BASELINE_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
          case PATIENT_BASELINE_SAVE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saving', statusClass:''})
            break;
          case PATIENT_BASELINE_SAVED_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saved', statusClass:''})
            break;
            case PATIENT_BASELINE_SAVE_ERROR:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
                break;
    }
    
    return state;
  }