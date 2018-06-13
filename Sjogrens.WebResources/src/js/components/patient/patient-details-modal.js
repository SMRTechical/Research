import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PanelConsentSuccess from '../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../components/generic/panel-consent-remove';
import PanelNoConsent from '../../components/generic/panel-no-consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import ModalDefault from '../../components/generic/modal-default';
import {PATIENT_DETAILS} from '../../constants/styles/modal';
import {consentCtrls} from '../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import AuditData from '../../components/generic/audit-data';
import StringMask from 'string-mask';

class PatientDetailsModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            patient: this.props.patient  ? this.props.patient:null, 
           isDirty:false
        };

      
        this.closePatientDetailsModal = this.closePatientDetailsModal.bind(this);
        this.afterOpenPatientDetailsModal = this.afterOpenPatientDetailsModal.bind(this);
        this.renderPatientDetails = this.renderPatientDetails.bind(this);
    }



    componentWillReceiveProps(nextProps){
       // console.log('nextProps.patient')    
       // console.log(nextProps.patient)
      this.setState({
                patient: nextProps.patient  ? nextProps.patient :null,
                isDirty:false
        })
      }

      componentDidMount () {
       // console.log('didMount')
            this.setState({
                patient: this.props.patient ? this.props.patient :null,
                isDirty:false
            });
       }






closePatientDetailsModal(){
    this.props.closePatientDetailsModal();
}

afterOpenPatientDetailsModal(){
    this.props.afterOpenPatientDetailsModal();
}


renderPatientDetails(){
    var formatter = new StringMask('000-0000-0000');
    return (
                        <div className="row">
                            <div className="col-md-12">
                            <div className="row">
                                            <div className="col-md-6">
                                                <span >
                                            <strong>Hospital Number:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.pasId}
                                                </span>
                                            </div>
                                    </div>
                                <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>NHS Number:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                    {formatter.apply(this.state.patient.data.nhsNumber)}
                                                </span>
                                            </div>
                                    </div>

                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>First Name:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.firstName}
                                                </span>
                                            </div>
                                    </div>

                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Last Name:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.lastName}
                                                </span>
                                            </div>
                                    </div>

                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Gender:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.genderDescription}
                                                </span>
                                            </div>
                                    </div>
                                  
                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Ethnic Group:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.ethnicGroup}
                                                </span>
                                            </div>
                                    </div>
                             
                                  
                                    
                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Date of Birth:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {handleDateFormat(this.state.patient.data.dateOfBirth)}
                                                </span>
                                            </div>
                                        </div>



                                       
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span >
                                            <strong>Address:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.fullAddress}
                                                </span>
                                            </div>
                                        </div>


                                    <div className="row">
                                            <div className="col-md-6">
                                                <span >
                                            <strong>Telephone:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.telephone}
                                                </span>
                                            </div>
                                        </div>


                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Mobile:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.mobileNumber}
                                                </span>
                                            </div>
                                        </div>


                                      
                                   

                                
                                    <div className="row">
                                            <div className="col-md-6">
                                                <span>
                                            <strong>Age:</strong>
                                            </span>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="pull-left">
                                                {this.state.patient.data.age}
                                                </span>
                                            </div>
                                        </div>
                               
                                      
                            </div>
                        </div>
       
      
    )
}

        
render (){
    return(
       
<ModalDefault isOpen={this.props.patientDetailsModalOpen}  onRequestClose={this.props.closePatientDetailsModal} onAfterOpen={this.props.afterOpenPatientDetailsModal} style={PATIENT_DETAILS} contentLabel={this.props.contentLabel}>
            <div  className="panel panel-primary">
                <div className="panel-heading">
                    <button type="button" className="close" onClick={this.closePatientDetailsModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4>Patient Details</h4>
                </div>
                <div className="panel-body">
                     {
                       this.state.patient && this.state.patient.data ?  this.renderPatientDetails() : null
                     }
                </div>
                <div className="panel-footer">
                
                    <button id="patientDetailsCancel" type="button" className="btn btn-primary mr-3" 
                    onClick={this.closePatientDetailsModal}><i className="fa fa-check" aria-hidden="true"></i>&nbsp;Ok</button>
                   
                   
                   </div>
            </div>
            </ModalDefault>

                )
    }
}



 export default PatientDetailsModal;
