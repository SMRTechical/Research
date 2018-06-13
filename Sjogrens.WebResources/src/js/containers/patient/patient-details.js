import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import {getPatientDetails,patientDetailsClear} from '../../actions/index';
import {getPatientState,patientStateClear} from '../../actions/patient-state';
import PatientDetailsForm from '../../components/patient/patient-details-form';



class PatientDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getPatientDetailsGlobalError:'',
            //token:this.props.token
        };
        this.getPatientDetails = this.getPatientDetails.bind(this);
       this.handleGetPatientDetailsGlobalError = this.handleGetPatientDetailsGlobalError.bind(this);
      // this.handleUpdatePatient = this.handleUpdatePatient.bind(this);
    }

    componentDidMount () {
        this.props.patientDetailsClear(); 
        if(this.props.token){
            // this.setState({
            //     token:token;
            // })
             this.getPatientDetails(this.props.token);
           }
       }

    componentWillUnmount(){
        this.props.patientDetailsClear(); 
        this.props.patientStateClear(); 
        
       }

       
    handleGetPatientDetailsGlobalError(error){        
        this.setState({
            getPatientDetailsGlobalError:error.message,
        })
      }

      getPatientDetails(token){       
        var patientDetailsGetParams = {
                token: token
        }
        
        
        var patientStateGetParams = {
            token: token
    }

  //  console.log('patientDetails : patientStateGetParams')

   // console.log(patientStateGetParams)

        this.props.getPatientDetails(patientDetailsGetParams)
        //.then(p=> this.props.getPatientState(patientStateGetParams))
        .catch(this.handleGetPatientDetailsGlobalError)
        }


// handleUpdatePatient(consentGiven){
//     console.log('handleUpdatePatient: ' + this.props.patientDetailsResult.data.token);
//     var patientPostParams = {
// token:this.props.patientDetailsResult.data.token,
// consentGiven:consentGiven
//     }

//     var patientDetailsGetParams = {
//         token: this.props.patientDetailsResult.data.token
// }
//     console.log('patientPostParams')
//     console.log(patientPostParams)
//     console.log(patientDetailsGetParams)
// //this.props.patientUpdate(patientPostParams).then(p=> this.getPatientDetails(this.props.patientDetailsResult.data.token))
// this.props.patientUpdateAndGet(patientPostParams,patientDetailsGetParams)
// }

    render (){
        {
            return (<PatientDetailsForm patient={this.props.patientDetailsResult} token={this.props.token}/>)
         
        }
    }
}

function mapStateToProps(state) {
    return {
        patientDetailsResult: state.patientDetailsResult,
        patientStateResult: state.patientStateResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPatientDetails: getPatientDetails,patientDetailsClear:patientDetailsClear, getPatientState:getPatientState,patientStateClear:patientStateClear}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps)(PatientDetails);
