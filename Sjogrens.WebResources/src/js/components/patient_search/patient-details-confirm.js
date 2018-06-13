import React from 'react';
import {padDayMonthWithZero,handleDateFormat } from '../../factory/date-functions'
import InputMask from 'react-input-mask';
import {Toggle, Choice} from 'belle';
import Moment from 'moment';

class PatientDetailsConfirm extends React.Component{
constructor(props) {
        super(props);
       
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
        this.renderConsentCheck = this.renderConsentCheck.bind(this);
    }


handleConsentGiven(e){
   // console.log('consentGiven')
   // console.log(e.value);
    this.props.handleConsentGiven(e.value)
}



renderConsentCheck(){
    //console.log('renderConsentGiven')
//console.log(this.props.patient ? this.props.patient.consentGiven ? this.props.patient.consentGiven: false:false);

    return (
    <div className="row">

<div className="col-md-offset-2 col-md-8 col-centered text-center">
     {/* <div className={this.props.patient.consentGiven? "alert alert-success":"alert alert-danger"}> */}
        <div className="form-inline">
            <label className="control-label">Consent Given: </label>&nbsp;
            <Toggle defaultValue={this.props.patient.consentGiven} onUpdate={this.handleConsentGiven} className="checkbox" 
                        firstChoiceStyle={{ backgroundColor: '#5cb85c' }}  secondChoiceStyle={{ backgroundColor: '#D8000C' }}>
                <Choice value={this.props.patient ? this.props.patient.consentGiven ? this.props.patient.consentGiven: false:false} >Yes</Choice>
                <Choice value >No</Choice>
            </Toggle>                
         </div>
         {/* </div> */}
         </div>
</div>

)
}



render (){
    return(
                <form className="form" role="form">
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPasId" className="col-md-5 col-sm-4 col-form-label">Hospital Number:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPasId" 
                                value={ this.props.patient.pasId } readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientNHSNumber" className="col-md-5 col-sm-4 col-form-label">NHS Number:</label>
                            <div className="col-md-7 col-sm-8">

                                <InputMask mask="999 999 9999" maskChar={null} className="form-control" id="inputAddPatientNHSNumber"  
                                value={ this.props.patient.nhsNumber}  
                                readOnly
                                />

                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientFirstName" className="col-md-5 col-sm-4 col-form-label">First Name:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientFirstName" 
                                value={ this.props.patient.firstName} readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientLastName" className="col-md-5 col-sm-4 col-form-label">Last Name:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientLastName" 
                                value={ this.props.patient.lastName} readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Post Code:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.patient.postCode} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientGender" className="col-md-5 col-sm-4 col-form-label">Gender:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientGender" 
                                value={ this.props.patient.gender} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientDob" className="col-md-5 col-sm-4 col-form-label">Date of Birth:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientDob" 
                                value={  handleDateFormat(this.props.patient.dateOfBirth)} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientAge" className="col-md-5 col-sm-4 col-form-label">Age:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientAge" 
                                value={  this.props.patient.age} readOnly/>
                            </div>
                        </div>
                        
                      {
                        !this.props.patient.exists ?
                          this.props.consentable ? this.renderConsentCheck() : null : null
                      }

                    </form>
        );
    }
}

export default PatientDetailsConfirm;
