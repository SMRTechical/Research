import {SPINE_SAVE_SUCCESS, SPINE_SAVE_ASYNC_SUCCESS, SPINE_CLEAR_SUCCESS} from '../actions/spine';



const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
         case SPINE_SAVE_ASYNC_SUCCESS:
            return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
            break;
          case SPINE_SAVE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
            break;
          case SPINE_CLEAR_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})    
            break;
    }
    return state;
  }