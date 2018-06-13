import {
  VISITKEYVALUES_SUCCESS, 
  VISITKEYVALUES_ASYNC_SUCCESS, 
  VISITKEYVALUES_CLEAR_SUCCESS, 
  VISITKEYVALUES_SAVE_SUCCESS,
  VISITKEYVALUES_SAVED_SUCCESS, 
  VISITKEYVALUES_SAVE_ERROR
} from '../actions/visit-key-values';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case VISITKEYVALUES_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case VISITKEYVALUES_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case VISITKEYVALUES_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
          case VISITKEYVALUES_SAVE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saving', statusClass:''})
            break;
          case VISITKEYVALUES_SAVED_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saved', statusClass:''})
            break;
          case VISITKEYVALUES_SAVE_ERROR:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
            break;
    }
    
    return state;
  }