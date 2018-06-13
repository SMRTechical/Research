import React, {Component} from 'react';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {patientsSearch} from '../../actions/index';
import InputMask from 'react-input-mask';
import DatePicker  from 'react-bootstrap-date-picker';
import Moment from 'moment';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange, digitsLessThan, salivaryFlowRate}  from '../../Factory/calculations';
import {PATIENT} from '../../constants/information/messages';
import {PATIENTFIELDS} from '../../constants/information/field-length';

//import DatePicker from 'react-datepicker';
class PatientsSearchForm extends React.Component{
constructor(props) {
        super(props);
        this.state = {
            inputPatientsSearchPasId: '',
            inputPatientsSearchNhsNumber: '',
            inputPatientsSearchFirstName: '',
            inputPatientsSearchLastName: '',
            inputPatientsSearchDateOfBirth: '',
            inputPatientsSearchtDateOfBirthFormattedValue:'',
            inputPatientsSearchPostCode:'',
            patientsSearchLocalErrors:{},
            patientsSearchGlobalError:''
        };

        this.patientsSearch= this.patientsSearch.bind(this);
        this.handlePatientsSearchGlobalError = this.handlePatientsSearchGlobalError.bind(this);
        this.handlePatientsSearchChange = this.handlePatientsSearchChange.bind(this);
        this.clearPatientsSearchForm = this.clearPatientsSearchForm.bind(this);
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);

        this.isAlphaNumeric_onKeyPress = this.isAlphaNumeric_onKeyPress.bind(this);
        this.isAlpha_onKeyPress = this.isAlpha_onKeyPress.bind(this);
        this.isAlphaNumericSpace_onKeyPress = this.isAlphaNumericSpace_onKeyPress.bind(this);

    }


   

    handlePatientsSearchGlobalError(error){
        this.setState({
            patientsSearchGlobalError:error.message
        })
      }

      handleDateOfBirthChange(value, formattedValue) {
   
        //console.log(this.state.patientsSearchLocalErrors)
        // if (!!this.state.patientsSearchLocalErrors['searchCriteriaRequired']){
        //     console.log('test1');
        //     //clone object from state 
        //     let errorsClone = Object.assign({},this.state.patientsSearchLocalErrors);
        //     //remove field we just type into from errors.
        //     delete errorsClone['searchCriteriaRequired'];
        //     //copy clone back to errors in state
            

        //     this.setState({
        //         inputPatientsSearchDateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
        //         inputPatientsSearchtDateOfBirthFormattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
        //     });
        // }
        // else {

           
        if (!!this.state.patientsSearchLocalErrors['searchCriteriaRequired']){
            //clone object from state 
            let errorsClone = Object.assign({},this.state.patientsSearchLocalErrors);
            //remove field we just type into from errors.
            delete errorsClone['searchCriteriaRequired'];
            //copy clone back to errors in state
            this.setState(
              {
                inputPatientsSearchDateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
                inputPatientsSearchtDateOfBirthFormattedValue: formattedValue, // Formatted String, ex: "11/19/2016" 
                  patientsSearchLocalErrors:errorsClone});
            }
            else {
             // this.setState({[e.target.name]: e.target.value.replace(/-/gi, "")});
             this.setState({
                inputPatientsSearchDateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
                inputPatientsSearchtDateOfBirthFormattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
           });
            }
    
            if (this.state.patientsSearchGlobalError){
                this.setState({
                    patientsSearchGlobalError:null
                })
            }
        //     console.log('test2');            
        //     this.setState({
        //         inputPatientsSearchDateOfBirth: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
        //         inputPatientsSearchtDateOfBirthFormattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
        //    });
        


        // if (this.state.patientsSearchGlobalError){
        //     this.setState({
        //         patientsSearchGlobalError:null
        //     })
        // }

        }

      
        // isUkPostcode_onKeyPress(e){
        //     if (!isUkPostcode(e.key)){
        //         e.preventDefault();   
        //     }            
        // }



        isAlphaNumeric_onKeyPress(e){
            if (!isAlphanumeric(e.key)){
                e.preventDefault();   
            }
          }

          isAlphaNumericSpace_onKeyPress(e){
            if (!isAlphanumericSpace(e.key)){
                e.preventDefault();   
            }
          }


          
          isAlpha_onKeyPress(e){
            if (!isAlpha(e.key)){
                e.preventDefault();   
            }
        
          }


    handlePatientsSearchChange(e){    

  

        if (!!this.state.patientsSearchLocalErrors['searchCriteriaRequired'] || 
            !!this.state.patientsSearchLocalErrors["patientIdLength"] ||
            !!this.state.patientsSearchLocalErrors["lastNameLength"] || 
            !!this.state.patientsSearchLocalErrors["firstNameLength"] ||
            !!this.state.patientsSearchLocalErrors["postcodeLength"]){
        //clone object from state 

        let errorsClone = Object.assign({},this.state.patientsSearchLocalErrors);
        //remove field we just type into from errors.
        delete errorsClone['searchCriteriaRequired'];
        delete errorsClone["patientIdLength"]
        delete errorsClone["lastNameLength"]
        delete errorsClone["firstNameLength"]
        delete errorsClone["postcodeLength"]

        //copy clone back to errors in state
        this.setState(
          {[e.target.name]: e.target.value,
            patientsSearchLocalErrors:errorsClone});
        }
        else {
            if (e.target.name == "inputPatientsSearchNhsNumber") {
                this.setState({inputPatientsSearchNhsNumber: e.target.value.replace(/-/gi, "")});
                
            }
            else {
          this.setState({[e.target.name]: e.target.value});
            }
        }

        if (this.state.patientsSearchGlobalError){
            this.setState({
                patientsSearchGlobalError:null
            })
        }
      }


     clearPatientsSearchForm(){
        this.setState({
            inputPatientsSearchPasId: '',
            inputPatientsSearchNhsNumber: '',
            inputPatientsSearchFirstName: '',
            inputPatientsSearchLastName: '',
            inputPatientsSearchDateOfBirth: '',
            inputPatientsSearchtDateOfBirthFormattedValue:'',            
            inputPatientsSearchPostCode:'',
            patientsSearchLocalErrors:{},
            patientsSearchGlobalError:'',
        });
     }


    patientsSearch(e){
        e.preventDefault();
        //console.log('this.state.inputPatientsSearchDateOfBirth.trim().length');
        //console.log(this.state.inputPatientsSearchDateOfBirth.trim().length);
        //validation
        let errorsLocal = {};
        if(this.state.inputPatientsSearchPasId.trim().length == 0 &&
            this.state.inputPatientsSearchNhsNumber.trim().length == 0 &&
            this.state.inputPatientsSearchFirstName.trim().length == 0 &&
            this.state.inputPatientsSearchLastName.trim().length == 0 &&
            this.state.inputPatientsSearchDateOfBirth.trim().length == 0 &&
            this.state.inputPatientsSearchPostCode.trim().length == 0 ) {
                errorsLocal.searchCriteriaRequired= PATIENT.search.searchCriteria;//"Please specify search criteria.";
            }
           
        if(this.state.inputPatientsSearchPasId.length > PATIENTFIELDS.maxLength.pasId) errorsLocal.patientIdLength = PATIENT.add.pasIdLength;//"Patient Id can only be 10 characters."   
        if(this.state.inputPatientsSearchFirstName.length > PATIENTFIELDS.maxLength.firstName) errorsLocal.firstNameLength = PATIENT.add.firstNameLength;//"First name can only be 20 characters."   
        if(this.state.inputPatientsSearchLastName.length > PATIENTFIELDS.maxLength.lastName) errorsLocal.lastNameLength = PATIENT.add.lastNameLength;//"Lastname can only be 20 characters."   
        if(this.state.inputPatientsSearchPostCode.length > PATIENTFIELDS.maxLength.postcode) errorsLocal.postcodeLength = PATIENT.add.postcodeLength;//"Postcode can only be 10 characters"   
 
            // console.log('!isUkPostcode(this.state.inputPatientsSearchPostCode)');
            // console.log(!isUkPostcode(this.state.inputPatientsSearchPostCode));
         
            // if(!isUkPostcode(this.state.inputPatientsSearchPostCode)) {
            //         errorsLocal.postcodeInvalid= "Please specify a valid postcode.";
            //     }
            // console.log('errorsLocal.firstNameLength ');
            // console.log('PATIENTFIELDS.maxLength.firstName');
            // console.log(this.state.inputPatientsSearchFirstName.length);
            // console.log(PATIENTFIELDS.maxLength.firstName)
            
            // console.log(this.state.inputPatientsSearchFirstName.length > PATIENTFIELDS.maxLength.firstName);

        this.setState({patientsSearchLocalErrors:errorsLocal});
       
        const isValid = Object.keys(errorsLocal).length === 0
         if (isValid){
            var patientSearchParams ={
                pasId: this.refs.inputPatientsSearchPasId.value.trim(),
                nhsNumber: this.refs.inputPatientsSearchNhsNumber.value.trim().replace(/-/gi, ""),
                firstName: this.refs.inputPatientsSearchFirstName.value.trim(),
                lastName: this.refs.inputPatientsSearchLastName.value.trim(),
                //dateOfBirth: this.refs.inputPatientsSearchDateOfBirth.value.trim(),
                dateOfBirth: this.state.inputPatientsSearchDateOfBirth,
                postCode: this.refs.inputPatientsSearchPostCode.value.trim(),
                searchAllTrusts: false
            }

            this.props.patientsSearch(patientSearchParams)
            .catch(this.handlePatientsSearchGlobalError)
            this.state.inputPatientsSearchPasId = '';
            this.state.inputPatientsSearchNhsNumber = '';
            this.state.inputPatientsSearchFirstName = '';
            this.state.inputPatientsSearchLastName = '';
            this.state.inputPatientsSearchDateOfBirth = '';
            this.state.inputPatientsSearchtDateOfBirthFormattedValue=''
         }
    }

  

render (){

    return(
            <div>
                 <div className={classnames('',{loading:this.props.patientFindResult.sendingRequest && !this.props.patientFindResult.requestRecieved})}></div>
                {!!this.state.patientsSearchGlobalError && <div className="error"><span>{this.state.patientsSearchGlobalError}</span></div>}
                    <form id="patient-find-form" role="form" className="form-inline">
                        <div className="container-fluid">
                        {!!this.state.patientsSearchLocalErrors.searchCriteriaRequired && <div className="error"><span>{this.state.patientsSearchLocalErrors.searchCriteriaRequired}</span></div>}
                         
                        {!!this.state.patientsSearchLocalErrors.patientIdLength && <div className="error"><span>{this.state.patientsSearchLocalErrors.patientIdLength}</span></div>}
                        {!!this.state.patientsSearchLocalErrors.firstNameLength && <div className="error"><span>{this.state.patientsSearchLocalErrors.firstNameLength}</span></div>}
                        {!!this.state.patientsSearchLocalErrors.lastNameLength && <div className="error"><span>{this.state.patientsSearchLocalErrors.lastNameLength}</span></div>}
                        {!!this.state.patientsSearchLocalErrors.postcodeLength && <div className="error"><span>{this.state.patientsSearchLocalErrors.postcodeLength}</span></div>}
                    
                         
                         
                            <div className="row-fluid">
                                 <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired || !!this.state.patientsSearchLocalErrors.patientIdLength})}>
                                    <div className="col-md-2 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputPatientsSearchPasId">Hospital Number</label>
                                                <input  className="form-control mr-3" 
                                                        id="inputPatientsSearchPasId"
                                                        name="inputPatientsSearchPasId" 
                                                        ref="inputPatientsSearchPasId" 
                                                        value={this.state.inputPatientsSearchPasId}
                                                        onChange={this.handlePatientsSearchChange}
                                                        onKeyPress={this.isAlphaNumeric_onKeyPress}
                                                        placeholder="Hospital Number" />
                                    </div>
                                </div>
                                 <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired})}>
                                     <div className="col-md-2 col-sm-12 mt-1">
                                        <label className="sr-only" htmlFor="inputPatientsSearchNhsNumber">Nhs Number</label>
                                            {/* <input  className="form-control mr-3" 
                                                    id="inputPatientsSearchNhsNumber"
                                                    name="inputPatientsSearchNhsNumber" 
                                                    ref="inputPatientsSearchNhsNumber" 
                                                    value={this.state.inputPatientsSearchNhsNumber}
                                                    onChange={this.handlePatientsSearchChange}
                                                    placeholder="Nhs Number" /> */}

                                                    {/* <InputMask mask="999-999-9999" 
                                                        maskChar={"_"} 
                                                        className="form-control mr-3" 
                                                        id="inputAddPatientNhsNumber"
                                                        name="inputAddPatientNhsNumber" 
                                                        ref="inputAddPatientNhsNumber"
                                                        value={this.state.inputAddPatientNhsNumber}  
                                                        onChange={this.handleAddSpinePatientChange}
                                                        placeholder="Nhs Number" /> */}


                                            <InputMask mask="999-999-9999" 
                                                        maskChar={"_"} 
                                                        className="form-control mr-3" 
                                                        id="inputPatientsSearchNhsNumber"
                                                        name="inputPatientsSearchNhsNumber" 
                                                        ref="inputPatientsSearchNhsNumber"
                                                        value={this.state.inputPatientsSearchNhsNumber}  
                                                        onChange={this.handlePatientsSearchChange}
                                                        placeholder="NHS Number" />

                                    </div>                               
                                </div>
                                <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired  || !!this.state.patientsSearchLocalErrors.firstNameLength})}>
                                    <div className="col-md-2 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputPatientsSearchFirstName">First Name</label>
                                                <input  className="form-control mr-3" 
                                                        id="inputPatientsSearchFirstName"
                                                        name="inputPatientsSearchFirstName" 
                                                        ref="inputPatientsSearchFirstName" 
                                                        value={this.state.inputPatientsSearchFirstName}
                                                        onChange={this.handlePatientsSearchChange}
                                                        onKeyPress={this.isAlpha_onKeyPress}
                                                        placeholder="First Name" />
                                    </div>                              
                                </div>
                                <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired || !!this.state.patientsSearchLocalErrors.lastNameLength})}>
                                    <div className="col-md-2 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputPatientsSearchLastName">Last Name</label>
                                                <input  className="form-control mr-3" 
                                                        id="inputPatientsSearchLastName"
                                                        name="inputPatientsSearchLastName" 
                                                        ref="inputPatientsSearchLastName" 
                                                        value={this.state.inputPatientsSearchLastName}
                                                        onChange={this.handlePatientsSearchChange}
                                                        onKeyPress={this.isAlpha_onKeyPress}
                                                        placeholder="Last Name" />
                                    </div>                                          
                                </div>
                                <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired})}>
                                    <div className="col-md-10 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputPatientsSearchDateOfBirth">Date of Birth</label>
                                                {/* <input  className="form-control mr-3" 
                                                        id="inputPatientsSearchDateOfBirth"
                                                        name="inputPatientsSearchDateOfBirth" 
                                                        ref="inputPatientsSearchDateOfBirth" 
                                                        value={this.state.inputPatientsSearchtDateOfBirth}
                                                        onChange={this.handlePatientsSearchChange}
                                                        placeholder="Date of Birth" /> */}

                                                        <DatePicker id="inputPatientsSearchDateOfBirth" 
                                                                name="inputPatientsSearchDateOfBirth" 
                                                                ref="inputPatientsSearchDateOfBirth" 
                                                                className="form-control"
                                                                dateFormat="DD/MM/YYYY" 
                                                                todayButtonLabel={"Today"}
                                                                showTodayButton={true}  
                                                                value={this.state.inputPatientsSearchDateOfBirth} 
                                                                onChange={this.handleDateOfBirthChange} 
                                                                placeholder="Date of Birth" />
                                                                {/* <DatePicker className="form-control" ref="mydatepicker"
                                todayButton={"Today"}
                                dateFormat="DD/MM/YYYY"
                                showMonthDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={2}
                                showYearDropdown
                               
                                locale="en-gb"          
                                filterDate={this.isWeekday}
                                minDate={Moment().subtract(1, "years")}
                                maxDate={Moment()}    
                                onBlur={this.handleOnBlur}            
   
                               /> */}



                                    </div>                                      
                                </div>
                                <div className={classnames('form-group',{error:!!this.state.patientsSearchLocalErrors.searchCriteriaRequired  || !!this.state.patientsSearchLocalErrors.postcodeLength})}>
                                    <div className="col-md-2 col-sm-12 mt-1">
                                            <label className="sr-only" htmlFor="inputPatientsSearchPostCode">Post Code</label>
                                                <input  className="form-control mr-3" 
                                                        id="inputPatientsSearchPostCode"
                                                        name="inputPatientsSearchPostCode" 
                                                        ref="inputPatientsSearchPostCode" 
                                                        value={this.state.inputPatientsSearchPostCode}
                                                        onChange={this.handlePatientsSearchChange}
                                                        onKeyPress={this.isAlphaNumericSpace_onKeyPress}
                                                        placeholder="PostCode" />
                                    </div>                                      
                                </div>
                                <div className="form-group">
                                    <div className="col-md-2 col-sm-12 mt-1">
                                        <button type="submit" 
                                                name="patient-find-btn"  
                                                id="patient-find-btn"
                                                className="btn btn-success" 
                                                onClick={this.patientsSearch}>
                                                <i className="fa fa-search" aria-hidden="true"></i>&nbsp;Find
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-2 col-sm-12 mt-1">
                                        <button type="reset" 
                                                name="patient-find-clear-btn"  
                                                id="patient-find-clear-btn"
                                                className="btn btn-danger" 
                                                onClick={this.clearPatientsSearchForm}>
                                                <i className="fa fa-eraser" aria-hidden="true"></i>&nbsp;clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </form>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        patientFindResult: state.patientFindResult
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators({patientsSearch: patientsSearch}, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(PatientsSearchForm);


