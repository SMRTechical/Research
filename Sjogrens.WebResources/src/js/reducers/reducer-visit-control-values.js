import {
  VISITCONTROLVALUES_SUCCESS, 
  VISITCONTROLVALUES_ASYNC_SUCCESS, 
  VISITCONTROLVALUES_CLEAR_SUCCESS
} from '../actions/visit-control-values';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case VISITCONTROLVALUES_ASYNC_SUCCESS:
             return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
             break;
          case VISITCONTROLVALUES_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case VISITCONTROLVALUES_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
    }
    
    return state;
  }