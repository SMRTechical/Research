import React, {Component} from 'react';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {spineSearch} from '../../actions/spine';
import {getConsent, getConsentForAddPatient} from '../../actions/consent';
import AddSpineConfirm from './add-spine-confirm';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import GenericInput from '../../components/generic/generic-input';
import InputMask from 'react-input-mask';
import DatePicker  from 'react-bootstrap-date-picker';
import Moment from 'moment';
//import {isAlphanumeric, digitsOnly, validYear,  digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear,  digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {PATIENT} from '../../constants/information/messages';
import {PATIENTFIELDS} from '../../constants/information/field-length';
class AddSpinePatientForm extends React.Component{
constructor(props) {
        super(props);
        this.state = {
            inputAddPatientNhsNumber: '',
            inputAddPatientDateOfBirth: null,      
            inputAddPatientDateOfBirthFormattedValue:'',      
            addPatientLocalErrors:{},
            addPatientGlobalError:'',
            maxDate:moment().startOf('day')
        };

        this.addNewPatient= this.addNewPatient.bind(this);
        this.handleAddPatientGlobalError = this.handleAddPatientGlobalError.bind(this);
        this.handleAddSpinePatientChange = this.handleAddSpinePatientChange.bind(this);
        this.handleGetSpinePatient = this.handleGetSpinePatient.bind(this);
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
       
    }


    
// handleDateOfBirthChange (date) {
//     this.setState(
//         {
//             inputAddPatientDateOfBirth: date //.format("YYYY-MM-DD"),
//             //dateOfBirth: date
//          })
//         



nhsNumber_onKeyPress(e){
    if (!isAlphanumeric(e.key)){
        e.preventDefault();   
    }

  }
    

         
handleDateOfBirthChange(value, formattedValue) {
  
        this.setState({
            inputAddPatientDateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
            inputAddPatientDateOfBirthFormattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
        });

//

if (!!this.state.addPatientLocalErrors["inputAddPatientDateOfBirth"]){
    //clone object from state 
    let errorsClone = Object.assign({},this.state.addPatientLocalErrors);
    //remove field we just type into from errors.
    delete errorsClone["inputAddPatientDateOfBirth"];
    //copy clone back to errors in state
    this.setState(
      {["inputAddPatientDateOfBirth"]: value,
        addPatientLocalErrors:errorsClone});
    }
    else {
      this.setState({["inputAddPatientDateOfBirth"]: value});
    }

     }

  


    handleAddPatientGlobalError(error){ 
        this.setState({
            addPatientGlobalError:error.message
        })
      }

    handleAddSpinePatientChange(e){    
       
      
        if (!!this.state.addPatientLocalErrors[e.target.name] || !!this.state.addPatientLocalErrors["inputAddPatientNhsNumberLength"]){
        //clone object from state 
        let errorsClone = Object.assign({},this.state.addPatientLocalErrors);
        //remove field we just type into from errors.
        delete errorsClone[e.target.name];
        delete errorsClone["inputAddPatientNhsNumberLength"]
        //copy clone back to errors in state
        this.setState(
          {[e.target.name]: e.target.value,
            addPatientLocalErrors:errorsClone});
        }
        else {
          this.setState({[e.target.name]: e.target.value.replace(/-/gi, "")});
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
       // console.log(this.state.inputAddPatientNhsNumber)
        let errorsLocal = {};
        if(this.state.inputAddPatientNhsNumber.length > PATIENTFIELDS.maxLength.nhsNumber) errorsLocal.inputAddPatientNhsNumberLength = PATIENT.add.nhsNumberLength;//"Nhs Number can only be 10 characters";        
        if(this.state.inputAddPatientNhsNumber === '') errorsLocal.inputAddPatientNhsNumber = PATIENT.add.nhsNumber;//"Nhs Number is required.";
        if(!this.state.inputAddPatientDateOfBirth) errorsLocal.inputAddPatientDateOfBirth = PATIENT.add.dateOfBirth;//"Date of birth is required.";

        

      
      
        this.setState({addPatientLocalErrors:errorsLocal});
        const isValid = Object.keys(errorsLocal).length === 0
        if (isValid){


            

            var patientAddParams ={
                NhsNumber: this.refs.inputAddPatientNhsNumber.value.trim().replace(/-/gi, ""),
                DateOfBirth: this.state.inputAddPatientDateOfBirth //.format("YYYY-MM-DD")                
            }
            this.props.spineSearch(patientAddParams).then(p => this.props.getConsentForAddPatient(p))
            .catch(this.handleAddPatientGlobalError)
          
            this.setState({
                inputAddPatientNhsNumber:'',
                inputAddPatientDateOfBirth:''
            })
        }
    }
    
    handleGetSpinePatient(token){
        this.props.handleGetSpinePatient(token);
    }

render (){
    return(
            <div>
                <div className={classnames('',{loading:this.props.spineAddResult.sendingRequest && !this.props.spineAddResult.requestRecieved && !(!!this.state.addPatientGlobalError)})}></div>
                {!!this.state.addPatientGlobalError && <div className="error"><span>{this.state.addPatientGlobalError}</span></div>}
                {this.props.spineAddResult.status == 'Error' && <div className="error"><span>{this.props.spineAddResult.data.message}</span></div>}
                    <form id="patient-add-form" role="form" className="form-inline">
                        <div className="container-fluid">
                            <div className="row">
                            {!!this.state.addPatientLocalErrors.inputAddPatientNhsNumberLength && <div className="error"><span>{this.state.addPatientLocalErrors.inputAddPatientNhsNumberLength}</span></div>}
                          
                            {!!this.state.addPatientLocalErrors.inputAddPatientNhsNumber && <div className="error"><span>{this.state.addPatientLocalErrors.inputAddPatientNhsNumber}</span></div>}
                            {!!this.state.addPatientLocalErrors.inputAddPatientDateOfBirth && <div className="error"><span>{this.state.addPatientLocalErrors.inputAddPatientDateOfBirth}</span></div>}       
                                    <div className={classnames('form-group',{error:!!this.state.addPatientLocalErrors.inputAddPatientNhsNumber || !!this.state.addPatientLocalErrors.inputAddPatientNhsNumberLength })}>
                                        <div className="col-md-3 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputEmail">Nhs Number</label>
                                            {/* <input  className="form-control mr-3" 
                                                    id="inputAddPatientNhsNumber"
                                                    name="inputAddPatientNhsNumber" 
                                                    ref="inputAddPatientNhsNumber" 
                                                    value={this.state.inputAddPatientNhsNumber}
                                                    onChange={this.handleAddSpinePatientChange}
                                                    onKeyPress={this.nhsNumber_onKeyPress}
                                                    placeholder="Nhs Number" /> */}


                                                    <InputMask mask="999-999-9999" 
                                                        maskChar={"_"} 
                                                        className="form-control mr-3" 
                                                        id="inputAddPatientNhsNumber"
                                                        name="inputAddPatientNhsNumber" 
                                                        ref="inputAddPatientNhsNumber"
                                                        value={this.state.inputAddPatientNhsNumber}  
                                                        onChange={this.handleAddSpinePatientChange}
                                                        placeholder="NHS Number" />

                                        </div>
                                    </div>

                                    <div className={classnames('form-group',{error:!!this.state.addPatientLocalErrors.inputAddPatientDateOfBirth})}>
                                        <div className="col-md-9 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputEmail">Date of Birth</label>
                                           
                                                    {/* <DatePicker
                                                    selected={this.state.inputAddPatientDateOfBirth}
                                                        dateFormat="DD/MM/YYYY"
                                                        onChange={this.handleDateOfBirthChange}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        locale="en-gb" 
                                                        isClearable={true}
                                                        placeholderText="Date of Birth"                                        
                                                        maxDate={moment().startOf('day')}
                                                        dropdownMode="select"/> */}

                                                        <DatePicker id="example-datepicker" 
                                                                className="form-control"
                                                                dateFormat="DD/MM/YYYY" 
                                                                todayButtonLabel={"Today"}
                                                                showTodayButton={true}  
                                                                value={this.state.inputAddPatientDateOfBirth} 
                                                                onChange={this.handleDateOfBirthChange} 
                                                                placeholder="Date of Birth"    />

                                                    
                                        </div>
                                    </div>

                                    <div className="form-group">
                                    <div className="col-md-4 col-sm-12 mt-1">
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
                    <AddSpineConfirm spineAddResult={this.props.spineAddResult} getSpinePatient={this.handleGetSpinePatient}/>
                    }
            </div>
        );
    }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        spineAddResult: state.spineAddResult,
        consentResult: state.consentResult
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({ spineSearch: spineSearch, getConsent: getConsent, getConsentForAddPatient:getConsentForAddPatient}, dispatch);
}
//spineSearch: spineSearch,

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(AddSpinePatientForm);

//line below export default dumb component
//export default AddPatientForm


