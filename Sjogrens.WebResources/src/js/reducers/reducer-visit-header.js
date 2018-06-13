import {
  VISIT_HEADER_SUCCESS, VISIT_HEADER_ASYNC_SUCCESS, VISIT_HEADER_CLEAR_SUCCESS, VISIT_HEADER_SAVE_SUCCESS,VISIT_HEADER_SAVED_SUCCESS, VISIT_HEADER_SAVE_ERROR} from '../actions/visit-header';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){

      //   case NEW_ATTENDANCE_HEADER_ASYNC_SUCCESS:
      //     return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
      //     break;
      //   case NEW_ATTENDANCE_HEADER_SUCCESS:
      //     // console.log('VisitHeaderSUCCESS')
      //         return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
      //         break;
      //   case NEW_ATTENDANCE_HEADER_CLEAR_SUCCESS:
      // // console.log('VisitHeaderCLEARSUCCESS');
      //       return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
      //       break;


          case VISIT_HEADER_ASYNC_SUCCESS:
                return Object.assign({}, state, {sendingRequest:true, data:null, status:'Pending', statusClass:'pending'})
                break;
          case VISIT_HEADER_SUCCESS:
            // console.log('VisitHeaderSUCCESS')
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
                break;
          case VISIT_HEADER_CLEAR_SUCCESS:
         // console.log('VisitHeaderCLEARSUCCESS');
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Deleted', statusClass:''})  
             break;
          case VISIT_HEADER_SAVE_SUCCESS:
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saving', statusClass:''})
            break;
          case VISIT_HEADER_SAVED_SUCCESS:
          //console.log('VisitHeaderSAVEDSUCCESS')
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:true,data:action.payload,  status:'Saved', statusClass:''})
            break;
          case VISIT_HEADER_SAVE_ERROR:
             return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Error', statusClass:''})  
            break;
    }
    
    return state;
  }