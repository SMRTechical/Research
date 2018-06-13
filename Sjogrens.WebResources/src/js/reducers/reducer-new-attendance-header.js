import {
  NEW_ATTENDANCE_HEADER_SUCCESS,
  NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS,
  NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS, } from '../actions/visit-header';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){

        case NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS:
          return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
          break;
        case NEW_ATTENDANCE_HEADER_SUCCESS:
          // console.log('VisitHeaderSUCCESS')
              return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
              break;
        case NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS:
      // console.log('VisitHeaderCLEARSUCCESS');
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Deleted', statusClass:''})  
            break;

    }
    
    return state;
  }