import {VISIT_HEADERS_SUCCESS, VISIT_HEADERS_ASYNC_SUCCESS, VISIT_HEADERS_CLEAR_SUCCESS} from '../actions/visit-headers';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case VISIT_HEADERS_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case VISIT_HEADERS_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case VISIT_HEADERS_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
          // case VISIT_HEADER_SAVE_SUCCESS:
          //   return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saving', statusClass:''})
          //   break;
          // case PATIENT_BASELINE_SAVED_SUCCESS:
          //   return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saved', statusClass:''})
          //   break;
            // case VISIT_HEADER_SAVE_ERROR:
            //  return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
            //     break;
    }
    
    return state;
  }