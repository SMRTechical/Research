import React, {Component} from 'react';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {patientSearch} from '../../actions/index';
import {getConsent, getConsentForAddPatient} from '../../actions/consent';
import AddPatientConfirm from './add-patient-confirm'
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {PATIENT} from '../../constants/information/messages';
import {PATIENTFIELDS} from '../../constants/information/field-length';

class AddPatientForm extends React.Component{
constructor(props) {
        super(props);
        this.state = {
            inputAddPatientPasId: '',
            addPatientLocalErrors:{},
            addPatientGlobalError:''
        };

        this.addNewPatient= this.addNewPatient.bind(this);
        this.handleAddPatientGlobalError = this.handleAddPatientGlobalError.bind(this);
        this.handleAddPatientChange = this.handleAddPatientChange.bind(this);
        this.handleGetPatient = this.handleGetPatient.bind(this);
        this.isAlphaNumeric_onKeyPress = this.isAlphaNumeric_onKeyPress.bind(this);
    }


    isAlphaNumeric_onKeyPress(e){
        if (!isAlphanumeric(e.key)){
            e.preventDefault();   
        }
      }



    handleAddPatientGlobalError(error){ 
        this.setState({
            addPatientGlobalError:error.message
        })
      }

    handleAddPatientChange(e){    
        if (!!this.state.addPatientLocalErrors[e.target.name] || 
            !!this.state.addPatientLocalErrors["patientIdLength"]){
        //clone object from state 
        let errorsClone = Object.assign({},this.state.addPatientLocalErrors);
        //remove field we just type into from errors.
        delete errorsClone[e.target.name];
        delete errorsClone["patientIdLength"];
        //copy clone back to errors in state
        this.setState(
          {[e.target.name]: e.target.value,
            addPatientLocalErrors:errorsClone});
        }
        else {
          this.setState({[e.target.name]: e.target.value});
        }

        if (this.state.addPatientGlobalError){
            this.setState({
                addPatientGlobalError:null
            })
        }
      }


    addNewPatient(e){
        e.preventDefault();
        //validation
        let errorsLocal = {};
        if(this.state.inputAddPatientPasId === '') errorsLocal.inputAddPatientPasId = PATIENT.add.pasId;// "Patient Id can't be empty";
        if(this.state.inputAddPatientPasId.length > PATIENTFIELDS.maxLength.pasId) errorsLocal.patientIdLength = PATIENT.add.pasIdLength;//"Patient Id 10 charaters max.";

        this.setState({addPatientLocalErrors:errorsLocal});
        const isValid = Object.keys(errorsLocal).length === 0
        if (isValid){

            var patientAddParams ={
                pasId: this.refs.inputAddPatientPasId.value.trim()
            }
            this.props.patientSearch(patientAddParams).then(p => this.props.getConsentForAddPatient(p))
            //.then(console.log(this.props.patientAddResult.status))
            .catch(this.handleAddPatientGlobalError)
          
            this.setState({
                inputAddPatientPasId:''
            })
        }
    }
    
    handleGetPatient(token){
       // console.log('sr: ' + token)
       // console.log(token)
        this.props.handleGetPatient(token);
    }

render (){
    return(
            <div>
                <div className={classnames('',{loading:this.props.patientAddResult.sendingRequest && !this.props.patientAddResult.requestRecieved && !(!!this.state.addPatientGlobalError)})}></div>
                {!!this.state.addPatientGlobalError && <div className="error"><span>{this.state.addPatientGlobalError}</span></div>}
                {this.props.patientAddResult.status == 'Error' && <div className="error"><span>{this.props.patientAddResult.data.message}</span></div>}
                    <form id="patient-add-form" role="form" className="form-inline">
                        <div className="container-fluid">
                            <div className="row">
                            {!!this.state.addPatientLocalErrors.inputAddPatientPasId && <div className="error"><span>{this.state.addPatientLocalErrors.inputAddPatientPasId}</span></div>}
                            {!!this.state.addPatientLocalErrors.patientIdLength && <div className="error"><span>{this.state.addPatientLocalErrors.patientIdLength}</span></div>}
                     


                            <div className={classnames('form-group',{error:!!this.state.addPatientLocalErrors.inputAddPatientPasId || !!this.state.addPatientLocalErrors.patientIdLength})}>
                                    <div className="col-md-10 col-md-8 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputEmail">Hospital Number</label>
                                            <input  className="form-control mr-3" 
                                                    id="inputAddPatientPasId"
                                                    name="inputAddPatientPasId" 
                                                    ref="inputAddPatientPasId" 
                                                    value={this.state.inputAddPatientPasId}
                                                    onChange={this.handleAddPatientChange}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                    placeholder="Hospital Number" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <div className="col-lg-2 -col-md-4 col-sm-12 mt-1">
                                        <button 
                                            type="submit" 
                                            name="patient-add-btn"  
                                            id="patient-add-btn"
                                            className="btn btn-success" 
                                            onClick={this.addNewPatient}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                        </div>
                                    </div>
                            </div>
                        </div>   
                    </form>

{!(!!this.state.addPatientGlobalError) && 
                    <AddPatientConfirm patientAddResult={this.props.patientAddResult} getPatient={this.handleGetPatient}/>
}
            </div>
        );
    }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        patientAddResult: state.patientAddResult,
        consentResult: state.consentResult
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({patientSearch: patientSearch, getConsent: getConsent, getConsentForAddPatient:getConsentForAddPatient}, dispatch);
}


// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(AddPatientForm);

//line below export default dumb component
//export default AddPatientForm


