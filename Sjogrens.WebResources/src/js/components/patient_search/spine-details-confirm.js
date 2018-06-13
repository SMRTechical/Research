import React from 'react';
import {padDayMonthWithZero,handleDateFormat } from '../../factory/date-functions'
import Textarea from 'react-textarea-autosize';
import InputMask from 'react-input-mask';
import {Toggle, Choice} from 'belle';


class SpineDetailsConfirm extends React.Component{
constructor(props) {
        super(props);
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
        this.renderConsentCheck = this.renderConsentCheck.bind(this);
        this.renderPasId = this.renderPasId.bind(this);
        this.renderAddress = this.renderAddress.bind(this);
    }


// handleConsentGiven(e){
//     this.props.handleConsentGiven(e.target.checked)
// }


handleConsentGiven(e){
   // console.log('consentGiven')
    this.props.handleConsentGiven(e.value)
}


renderConsentCheck(){
    return (
        <div className="row">
    
    <div className="col-md-offset-2 col-md-8 col-centered text-center">
         <div className={this.props.spine.consentGiven? "alert alert-success":"alert alert-danger"}>
            <div className="form-inline">
                <label className="control-label">Consent Given: </label>&nbsp;
                <Toggle defaultValue={this.props.spine.consentGiven} onUpdate={this.handleConsentGiven} className="checkbox" 
                            firstChoiceStyle={{ backgroundColor: '#5cb85c' }}  secondChoiceStyle={{ backgroundColor: '#D8000C' }}>
                    <Choice value={this.props.spine ? this.props.spine.consentGiven ? this.props.spine.consentGiven: false:false} >Yes</Choice>
                    <Choice value >No</Choice>
                </Toggle>                
             </div>
             </div>
             </div>
    </div>
    
    )
    }


// renderConsentCheck(){
// return (
//     <div className="form-group row">
//     <label htmlFor="inputConsentGiven" className="col-md-7 col-sm-6 col-form-label">Written informed consent:</label>
//     <div className="col-md-5 col-sm-6">
//         <input className="form-control" disabled={this.props.spine.exists} type="checkbox" id="chkConsentGiven"  onChange={this.handleConsentGiven} ref="consentGiven" defaultChecked={this.props.spine.consentGiven}/>
//     </div>
// </div>
// )
// }


renderPasId(exists,pasId){
    if (exists){
        return (
<div className="form-group row">
                            <label htmlFor="inputAddPatientPasId" className="col-md-5 col-sm-4 col-form-label">Hospital Number:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPasId" 
                                value={pasId } readOnly/>
                            </div>
                        </div>
        )
    }
    
  else {
      return null
  }
}

renderAddress(address1, address2, address3, address4, address5, postCode){
   // console.log(address1);
  //  console.log(address2);
   // console.log(address3);
   // console.log(address4);
   // console.log(address5);
   // console.log(postCode);

    var fullAddress = '';
    fullAddress = [address1, address2, address3, address4, address5, postCode].filter(val => val).join(', ')

   // console.log(fullAddress);
    return fullAddress

    }



render (){
    return(
                <form className="form" role="form">
                        
                        {/* <div className="form-group row">
                            <label htmlFor="inputAddPatientNHSNumber" className="col-md-5 col-sm-4 col-form-label">NHS Number:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientNHSNumber" 
                                value={ this.props.spine.nhsNumber}  
                                readOnly/>
                            </div>
                        </div> */}
                        {
                            this.renderPasId(this.props.spine.exists, this.props.spine.pasId)
                        }

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientNHSNumber" className="col-md-5 col-sm-4 col-form-label">NHS Number:</label>
                            <div className="col-md-7 col-sm-8">
                                
                                <InputMask mask="999 999 9999" maskChar={null} className="form-control" id="inputAddPatientNHSNumber"  
                                value={ this.props.spine.nhsNumber}  
                                readOnly
                                />

                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientFirstName" className="col-md-5 col-sm-4 col-form-label">First Name:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientFirstName" 
                                value={ this.props.spine.firstName} readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientMiddleName" className="col-md-5 col-sm-4 col-form-label">Middle Name:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientMiddleName" 
                                value={ this.props.spine.middleName} readOnly/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddPatientLastName" className="col-md-5 col-sm-4 col-form-label">Last Name:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientLastName" 
                                value={ this.props.spine.lastName} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientDob" className="col-md-5 col-sm-4 col-form-label">Date of Birth:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientDob" 
                                value={  handleDateFormat(this.props.spine.dateOfBirth)} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientGender" className="col-md-5 col-sm-4 col-form-label">Gender:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientGender" 
                                value={ this.props.spine.genderDescription} readOnly/>
                            </div>
                        </div>


                        

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address :</label>
                            <div className="col-md-7 col-sm-8">
                                <div className="form-group">

                                    <Textarea style={{maxHeight: 200,height:200}} 
                                                     useCacheForDOMMeasurements
                                                     onHeightChange={(height, instance) => console.log(height, instance.rowCount)}
                                                        className="form-control" 
                                                        defaultValue={this.renderAddress(this.props.spine.address1,
                                                                                                 this.props.spine.address2,
                                                                                                 this.props.spine.address3,
                                                                                                 this.props.spine.address4,
                                                                                                 this.props.spine.address5,
                                                                                                 this.props.spine.postCode)} 
                                                        readOnly></Textarea>
                                </div>
                            </div>
                        </div>   


                        {/* <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address 1:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.address1} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address 2:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.address2} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address 3:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.address3} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address 4:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.address4} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Address 5:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.address5} readOnly/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientPostCode" className="col-md-5 col-sm-4 col-form-label">Post Code:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientPostCode" 
                                value={ this.props.spine.postcode} readOnly/>
                            </div>
                        </div> */}

                        <div className="form-group row">
                            <label htmlFor="inputAddPatientAge" className="col-md-5 col-sm-4 col-form-label">Age:</label>
                            <div className="col-md-7 col-sm-8">
                                <input type="text" className="form-control" id="inputAddPatientAge" 
                                value={  this.props.spine.age} readOnly/>
                            </div>
                        </div>
                        
                      {
                        !this.props.spine.exists ?
                          this.props.consentable ? this.renderConsentCheck() : null : null
                      }

                    </form>
        );
    }
}

export default SpineDetailsConfirm;
