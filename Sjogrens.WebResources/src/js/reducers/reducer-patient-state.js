import {PATIENT_STATE_SUCCESS, PATIENT_STATE_ASYNC_SUCCESS, PATIENT_STATE_CLEAR_SUCCESS} from '../actions/patient-state';

const INITIAL_STATE = {
    sendingRequest:false,
    requestRecieved:false,
    data:null,
    status:'',
    statusClass:''
}

export default function (state=INITIAL_STATE,action={}){
      switch(action.type){
          case PATIENT_STATE_ASYNC_SUCCESS:
          //console.log('PatientCLEARSUCCESS')
                return Object.assign({}, state, {sendingRequest:true, requestRecieved:false, data:null, status:'Pending', statusClass:'pending'})
                break;
          case PATIENT_STATE_SUCCESS:
           //  console.log('PatientStateSUCCESS')
                return Object.assign({}, state, {sendingRequest:false,requestRecieved:true, data:action.payload, status:'Received', statusClass:''})
                break;
          case PATIENT_STATE_CLEAR_SUCCESS:
         // console.log('PatientStateCLEARSUCCESS');
            return Object.assign({}, state, {sendingRequest:false,requestRecieved:false, data:action.payload, status:'Deleted', statusClass:''})  
             break;
    }
    
    return state;
  }