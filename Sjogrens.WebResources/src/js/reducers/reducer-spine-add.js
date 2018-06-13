import {SPINE_SEARCH_ASYNC_SUCCESS,
        SPINE_SEARCH_SUCCESS, 
        SPINE_SEARCH_ERROR, 
        SPINE_SEARCH_CANCEL_SUCCESS, 
        SPINE_SEARCH_CLEAR_SUCCESS} from '../actions/spine';


const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){

        case SPINE_SEARCH_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
        case SPINE_SEARCH_SUCCESS:
               return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
               break;
        case SPINE_SEARCH_CANCEL_SUCCESS:
              return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})
              break;
        case SPINE_SEARCH_CLEAR_SUCCESS:
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})        
                break;
         case SPINE_SEARCH_ERROR:
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})
                break;

    }
    
    return state;
  }