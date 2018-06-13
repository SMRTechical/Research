import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PanelConsentSuccess from '../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../components/generic/panel-consent-remove';
import InputMask from 'react-input-mask';
import {trim, left, right} from 'trim';
import StringMask from 'string-mask';
import ReactTooltip from 'react-tooltip'
import PatientDetailsModal from './patient-details-modal';
import AuditData from '../../components/generic/audit-data';
import Consent from '../../containers/patient/consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';

const styles= {
    transition: 'all 1s ease-out'
}

class PatientDetailsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                fullName: this.props.patient && this.props.patient.data ? this.props.patient.data.fullName :'',
                fullAddress: this.props.patient && this.props.patient.data ? this.props.patient.data.fullAddress :'',
                nhsNumber: this.props.patient && this.props.patient.data ? this.props.patient.data.nhsNumber :'',
                genderDescription: this.props.patient && this.props.patient.data ? this.props.patient.data.genderDescription :'',
                ethnicGroup: this.props.patient && this.props.patient.data ? this.props.patient.data.ethnicGroup :'',
                imported: this.props.patient && this.props.patient.data ? this.props.patient.data.imported :'',
                pasId: this.props.patient && this.props.patient.data ? this.props.patient.data.pasId :'',
                dateOfBirth: this.props.patient && this.props.patient.data ? this.props.patient.data.dateOfBirth :'',
                age: this.props.patient && this.props.patient.data ? this.props.patient.data.age :'',
                telephone: this.props.patient && this.props.patient.data ? this.props.patient.data.telephone :'',
                mobileNumber: this.props.patient && this.props.patient.data ? this.props.patient.data.mobileNumber :'',
                userCreated: this.props.patient && this.props.patient.data ? this.props.patient.data.userCreated :'',
                userCreatedDate: this.props.patient && this.props.patient.data ? this.props.patient.data.userCreatedDate :'',
            scale:0,
            patientDetailsModalOpen: false,
        };

        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
        // this.renderConsentSuccess = this.renderConsentSuccess.bind(this);
        // this.renderConsentDanger = this.renderConsentDanger.bind(this);
        // this.handleConsentChange = this.handleConsentChange.bind(this);
        this.onScale = this.onScale.bind(this);

        this.renderPatientPasId = this.renderPatientPasId.bind(this);
        this.renderPatientNhsNumber = this.renderPatientNhsNumber.bind(this);
        this.renderPatientFullname = this.renderPatientFullname.bind(this);
        this.renderPatientFullAddress = this.renderPatientFullAddress.bind(this);
        this.renderPatientGenderImage = this.renderPatientGenderImage.bind(this);
        this.renderPatientDetailsBasic = this.renderPatientDetailsBasic.bind(this);
        
        this.closePatientDetailsModal = this.closePatientDetailsModal.bind(this);
        this.afterOpenPatientDetailsModal = this.afterOpenPatientDetailsModal.bind(this);
    }

onScale() {
    this.setState({
        scale: this.state.scale > 1 ? 1 : 1.3
    })
}


    componentWillReceiveProps(nextProps){
      this.setState({

                fullName: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.fullName :'',
                fullAddress: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.fullAddress :'',
                nhsNumber: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.nhsNumber :'',
                genderDescription: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.genderDescription :'',
                ethnicGroup: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.ethnicGroup :'',
                imported: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.imported :'',
                pasId: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.pasId :'',
                dateOfBirth: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.dateOfBirth :'',
                age: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.age :'',
                telephone: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.telephone :'',
                mobileNumber: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.mobileNumber :'',
                userCreated: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.userCreated :'',
                userCreatedDate: nextProps.patient && nextProps.patient.data ? nextProps.patient.data.userCreatedDate :'',
                patientDetailsModalOpen: false,
        
        })
      
        
      }

    componentDidMount () {
      //  console.log('patientdetailsform: ' + this.props.token)
            this.setState({
                fullName: this.props.patient && this.props.patient.data ? this.props.patient.data.fullName :'',
                fullAddress: this.props.patient && this.props.patient.data  ? this.props.patient.data.fullAddress :'',
                nhsNumber: this.props.patient && this.props.patient.data ? this.props.patient.data.nhsNumber :'',
                genderDescription: this.props.patient && this.props.patient.data ? this.props.patient.data.genderDescription :'',
                ethnicGroup: this.props.patient && this.props.patient.data ? this.props.patient.data.ethnicGroup :'',
                imported: this.props.patient && this.props.patient.data ? this.props.patient.data.imported :'',
                pasId: this.props.patient && this.props.patient.data ? this.props.patient.data.pasId :'',
                dateOfBirth: this.props.patient && this.props.patient.data ? this.props.patient.data.dateOfBirth :'',
                age: this.props.patient && this.props.patient.data ? this.props.patient.data.age :'',
                telephone: this.props.patient && this.props.patient.data ? this.props.patient.data.telephone :'',
                mobileNumber: this.props.patient && this.props.patient.data ? this.props.patient.data.mobileNumber :'',
                userCreated: this.props.patient && this.props.patient.data ? this.props.patient.data.userCreated :'',
                userCreatedDate: this.props.patient && this.props.patient.data ? this.props.patient.data.userCreatedDate :'',
                patientDetailsModalOpen: false,

                

            });
       }


       
   
handlePatientDetailsChange(){
    this.setState({
        patientDetailsModalOpen:true
    })
    }
  
closePatientDetailsModal(){
    this.setState({
        patientDetailsModalOpen:false
    })  
}


afterOpenPatientDetailsModal(){
     var p = ''
     //use this to clear any error
    // this.props.afterOpenConsentModal();
 }

renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading Patient Details"}>
       {/* <div><img src={paths.loader} alt="Download"/></div> */}
        </PanelDefault>
    )
}
   
// handleConsentChange(consentGiven){
//     console.log('consent Given: ' + consentGiven);
//     this.props.updatePatient(consentGiven);
// }

// renderConsentSuccess(title, message){
//     return (
//         <PanelConsentSuccess title={title} consentChange={this.handleConsentChange}>
//             <div>{message}</div>
//         </PanelConsentSuccess>
//     )
// }

// renderConsentDanger(title, message){
//     return (
//         <PanelConsentDanger title={title} consentChange={this.handleConsentChange}>
//              <div>{message}</div>
//         </PanelConsentDanger>
//     )
// }

renderDateOfBirth(){
    return (
        this.state.dateOfBirth && this.state.dateOfBirth.trim().length > 0 ? ' | Date of Birth: ' + handleDateFormat(this.state.dateOfBirth) :''
    )
}

renderAge(){
    return (
        this.state.age ? ' | Age: ' + this.state.age :''
    )
}


renderPatientPasId(){
    return (
        this.state.pasId && this.state.pasId.trim().length > 0 ? ' | Hospital No: ' + this.state.pasId :''
    )
}

renderPatientNhsNumber(){

    var formatter = new StringMask('000-0000-0000');
    //var result = formatter.apply('553122222222'); // +55 (31) 2222-2222 

    return (
        this.state.nhsNumber && this.state.nhsNumber.trim().length > 0 ? ' | NHS No: ' + formatter.apply(this.state.nhsNumber) :''
    )
}

renderPatientFullname(){
    return (
        this.state.fullName && this.state.fullName.trim().length > 0 ? ' | Name: ' + this.state.fullName : ''
    )
}

renderPatientFullAddress(){
    return (
        this.state.fullAddress && this.state.fullAddress.trim().length > 0 ? ' | Address: ' +  this.state.fullAddress : ''
    )
}



renderPatientGenderImage(){
    return (
        <a>
        {!!this.state.genderDescription ? this.state.genderDescription == 'Male' ? <i className="fa fa-male" aria-hidden="true"></i>
        : <i className="fa fa-female" aria-hidden="true"></i> : <i className="fa fa-genderless" aria-hidden="true"></i>}</a>        
    )
}






renderPatientDetailsBasic() {
    return (
            <div className="panel panel-primary panel-patient-details" onClick={() => this.handlePatientDetailsChange()}>
            <div className="panel-heading">
                <h3 className="panel-title text-left" > {this.renderPatientGenderImage()} {this.renderPatientPasId()} {this.renderPatientNhsNumber()} {this.renderPatientFullname()} {this.renderDateOfBirth()} {this.renderAge()}</h3> 
            </div>
            </div>
    )
}



    


        
    render (){


        {
            return(
                <div>
                  {
                    this.props.patient.requestRecieved ?
                    this.renderPatientDetailsBasic() : this.renderLoadingMessage()
                  }
                  <PatientDetailsModal patient={this.props.patient} 
                                patientDetailsModalOpen={this.state.patientDetailsModalOpen}  
                                closePatientDetailsModal={this.closePatientDetailsModal} 
                                onAfterOpen={this.afterOpenPatientDetailsModal} 
                                contentLabel={"Patient Details"}/>
            </div>
            );
        }
    }
}



 export default PatientDetailsForm;
