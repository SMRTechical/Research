import {VISIT_CATEGORIES_SUCCESS, VISIT_CATEGORIES_ASYNC_SUCCESS, VISIT_CATEGORIES_CLEAR_SUCCESS} from '../actions/visit-categories';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case VISIT_CATEGORIES_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case VISIT_CATEGORIES_SUCCESS:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
             break;
          case VISIT_CATEGORIES_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
    }
    
    return state;
  }