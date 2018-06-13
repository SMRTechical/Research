import {VISIT_SUCCESS, VISIT_ASYNC_SUCCESS, VISIT_CLEAR_SUCCESS, VISIT_SAVE_SUCCESS,VISIT_SAVED_SUCCESS, VISIT_SAVE_ERROR} from '../actions/visit';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case VISIT_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case VISIT_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case VISIT_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
          case VISIT_SAVE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saving', statusClass:''})
            break;
          case VISIT_SAVED_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saved', statusClass:''})
            break;
          case VISIT_SAVE_ERROR:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
            break;
    }
    
    return state;
  }