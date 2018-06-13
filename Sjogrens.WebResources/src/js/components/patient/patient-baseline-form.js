import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route, Prompt } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames'
import PanelDefault from '../../components/generic/panel-default';
import AuditData from '../../components/generic/audit-data';
import {isDate, padDayMonthWithZero,handleDateFormat,handleDateTimeFormat,handleUTCDateTimeFormat,isStringValidDate,isDateAfterToday} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import {inclusionCriteriaCtrls, exclusionCriteriaCtrls} from '../../config/controls/baseline';
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import DatePicker  from 'react-bootstrap-date-picker';
import Validator from 'validator'
import {BASELINEMESSAGES} from '../../constants/information/messages';
import InputMask from 'react-input-mask';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt'

class PatientBaselineForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            baselineDateInvalid:false,
            started: false,
            token: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.token :'',
            baselineDate: this.props.patientBaseline && this.props.patientBaseline.data ? 
                            this.props.patientBaseline.data.baselineDate?
                            moment(this.props.patientBaseline.data.baselineDate) :
                            moment() :
                            moment(),            
            baselineDateFormattedValue:'',
            attendedUHBpSSClinic: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.attendedUHBpSSClinic :null,
            warrantingInvestigationForpSS: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.warrantingInvestigationForpSS :null,
            physicianDiagnosisOfpSS: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.physicianDiagnosisOfpSS :null,
           
            previousHeadAndNeckRadiotherapy: this.props.patientBaseline && this.props.patientBaseline.data && this.props.patientBaseline.data ? this.props.patientBaseline.data.previousHeadAndNeckRadiotherapy :null,
            previousConfirmedDiagnosis: this.props.patientBaseline && this.props.patientBaseline.data && this.props.patientBaseline.data ? this.props.patientBaseline.data.previousConfirmedDiagnosis :null,
           
            createdUser: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.createdUser :null,
            createdDateTime: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.createdDateTime :null,
            lastUpdatedUser: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.lastUpdatedUser :null,
            lastUpdatedDateTime: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.lastUpdatedDateTime :null,           
                changed:false,
                errors:{},
                minDate:moment().subtract(1,'year').format("YYYY-MM-DD"),
                maxDate:moment().format("YYYY-MM-DD")
        };

        this.renderPatientBaseline = this.renderPatientBaseline.bind(this);
        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
        this.handleSavePatientBaseline = this.handleSavePatientBaseline.bind(this);
        this.attendedUHBpSSClinic_onChange = this.attendedUHBpSSClinic_onChange.bind(this);
        this.warrantingInvestigationForpSS_onChange = this.warrantingInvestigationForpSS_onChange.bind(this);
        this.physicianDiagnosisOfpSS_onChange = this.physicianDiagnosisOfpSS_onChange.bind(this);
        this.previousHeadAndNeckRadiotherapy_onChange = this.previousHeadAndNeckRadiotherapy_onChange.bind(this);
        this.previousConfirmedDiagnosis_onChange = this.previousConfirmedDiagnosis_onChange.bind(this);
        this.handleBaselineDateChange = this.handleBaselineDateChange.bind(this);
        this.isIncludedDate = this.isIncludedDate.bind(this);
        this.patientMetCriteria = this.patientMetCriteria.bind(this);
        this.renderPartientCriteriaMessage = this.renderPartientCriteriaMessage.bind(this);
        this.isDirty = this.isDirty.bind(this);
        this.handleBaselineDateOnBlur = this.handleBaselineDateOnBlur.bind(this);
      this.renderSaveButton = this.renderSaveButton.bind(this);
      this.renderSavingButton = this.renderSavingButton.bind(this);

this.renderExclusion = this.renderExclusion.bind(this);
this.renderExclusionCriteria = this.renderExclusionCriteria.bind(this);
this.renderInclusionCriteria = this.renderInclusionCriteria.bind(this);
this.renderInclusion = this.renderInclusion.bind(this);


    }



  


    renderSaveButton() {
        return ( 
                <button 
                    type="submit" 
                    name="patientBaseline-save-btn"  
                    id="patient-baseline-btn"
                    className="btn btn-success pull-right btn-nav" 
                    disabled={!this.patientMetCriteria() || !this.isDirty() || this.state.baselineDateInvalid}
                    onClick={this.handleSavePatientBaseline}>
                        <i className="fa fa-floppy-o mr-5" aria-hidden="true"></i>Save
                </button>
            )
        }
        
        
        renderSavingButton(){
            return ( 
                <button 
                    type="submit" 
                    name="patientBaseline-save-btn"  
                    id="patient-baseline-btn"
                    className="btn btn-success pull-right btn-nav" disabled>
                        <span>Saving</span>
                        <Spinner characterStyle={{ color: '#FFFFFF' }}/>
                </button>
         )
        }



isDirty(){
    return this.state.changed == true;
}



    componentWillReceiveProps(nextProps){
      this.setState({
        token: nextProps.patientDetails && nextProps.patientDetails.data ? nextProps.patientDetails.data.token :'',
        baselineDate: nextProps.patientBaseline && nextProps.patientBaseline.data ? 
                        nextProps.patientBaseline.data.baselineDate ?
                        moment(nextProps.patientBaseline.data.baselineDate) : 
                        moment():
                        moment(),
        attendedUHBpSSClinic: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.attendedUHBpSSClinic :'',
        warrantingInvestigationForpSS: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.warrantingInvestigationForpSS :'',
        physicianDiagnosisOfpSS: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.physicianDiagnosisOfpSS :'',   
        previousHeadAndNeckRadiotherapy: nextProps.patientBaseline && nextProps.patientBaseline.data && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.previousHeadAndNeckRadiotherapy :'',
        previousConfirmedDiagnosis: nextProps.patientBaseline && nextProps.patientBaseline.data && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.previousConfirmedDiagnosis :'',
        createdUser: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.createdUser :null,
        createdDateTime: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.createdDateTime :null,
        lastUpdatedUser: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.lastUpdatedUser :null,
        lastUpdatedDateTime: nextProps.patientBaseline && nextProps.patientBaseline.data ? nextProps.patientBaseline.data.lastUpdatedDateTime :null, 
        changed:false,
        started: this.state.attendedUHBpSSClinic || 
                this.state.warrantingInvestigationForpSS || 
                this.state.physicianDiagnosisOfpSS || 
                this.state.previousHeadAndNeckRadiotherapy || 
                this.state.previousConfirmedDiagnosis,
    })        
      }

    componentDidMount () {
            this.setState({
                token: this.props.patientDetails && this.props.patientDetails.data ? this.props.patientDetails.data.token :'',
                baselineDate: this.props.patientBaseline && this.props.patientBaseline.data ? 
                                this.props.patientBaseline.data.baselineDate ? moment(this.props.patientBaseline.data.baselineDate): moment() 
                                :moment(),
                attendedUHBpSSClinic: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.attendedUHBpSSClinic :'',
                warrantingInvestigationForpSS: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.warrantingInvestigationForpSS :'',
                physicianDiagnosisOfpSS: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.physicianDiagnosisOfpSS :'',               
                previousHeadAndNeckRadiotherapy: this.props.patientBaseline && this.props.patientBaseline.data && this.props.patientBaseline.data ? this.props.patientBaseline.data.previousHeadAndNeckRadiotherapy :'',
                previousConfirmedDiagnosis: this.props.patientBaseline && this.props.patientBaseline.data && this.props.patientBaseline.data ? this.props.patientBaseline.data.previousConfirmedDiagnosis :'',
                createdUser: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.createdUser :null,
                createdDateTime: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.createdDateTime :null,
                lastUpdatedUser: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.lastUpdatedUser :null,
                lastUpdatedDateTime: this.props.patientBaseline && this.props.patientBaseline.data ? this.props.patientBaseline.data.lastUpdatedDateTime :null,
                changed:false,
                started: this.state.attendedUHBpSSClinic || 
                        this.state.warrantingInvestigationForpSS || 
                        this.state.physicianDiagnosisOfpSS || 
                        this.state.previousHeadAndNeckRadiotherapy || 
                        this.state.previousConfirmedDiagnosis, 
            });
        }    



        handleBaselineDateChange(value){
            
                let errorsClone = Object.assign({},this.state.errors);
                delete errorsClone['baselineDateInvalidDate'];
                delete errorsClone['baselineDateRequired'];
                delete errorsClone['baselineDateFuture'];
                
              var mDate = moment(value, "DD/MM/YYYY").format("DD/MM/YYYY");
              
                 if (isDate(mDate.toString())) {
                   if (moment(mDate.toString(), "DD/MM/YYYY", true).isValid()) {

                    this.setState({
                        errors: errorsClone,
                        baselineDate:value,
                        changed:true,
                        baselineDateInvalid:false
                    })
                   } else {
                    //moment isvalid error
                     errorsClone.baselineDateInvalidDate = BASELINEMESSAGES.invalidDate; //"Invalid Date"
                     
                     this.setState({
                        errors: errorsClone,
                      //  baselineDate:value,
                         changed:false,
                        baselineDateInvalid:true
                    })
            
                   }
                 } else {
                   //! isdate
                    errorsClone.baselineDateRequired = BASELINEMESSAGES.dateRequired; //"Required"
            
                    this.setState({
                    errors:errorsClone,
                        //baselineDate:value,
                        changed:false,
                        baselineDateInvalid:true
                        })
                 }
            
            }

handleBaselineDateOnBlur(value){
    let errorsClone = Object.assign({},this.state.errors);

    delete errorsClone['baselineDateInvalidDate'];
    delete errorsClone['baselineDateRequired'];
    delete errorsClone['baselineDateFuture'];

    var selectedDate = this.refs.baselineDate.input.value;
        if (selectedDate) {
            if (isDate(selectedDate)) {
                    var mDate = moment(selectedDate, "DD/MM/YYYY").format("YYYY-MM-DD");

                        if (moment(mDate).isAfter(this.state.maxDate.toString())){
                            errorsClone.baselineDateFuture = BASELINEMESSAGES.futureDate
                                                this.setState({
                                                                errors:errorsClone,
                                                            // baselineDate: null ,
                                                                baselineDateInvalid:true
                                                });
                        }
                        else if (moment(mDate).isBefore(this.state.minDate.toString())) {
                            errorsClone.baselineDateFuture = BASELINEMESSAGES.earlyDate
                                                this.setState({
                                                                errors:errorsClone,
                                                                //baselineDate: null ,
                                                                baselineDateInvalid:true
                                                });
                        }
                        else {
                            this.setState({
                                errors:errorsClone,
                              //  baselineDate: null ,
                                baselineDateInvalid:false});
                        }
        }
        else {
            errorsClone.baselineDateInvalidDate = BASELINEMESSAGES.invalidDate
            this.setState({
                                errors:errorsClone,        
                               // baselineDate: null ,
                                baselineDateInvalid:true
                            });      
        }
        }
        else {
            errors.baselineDateRequired = BASELINEMESSAGES.dateRequired
            this.setState({
                errors:errorsClone,
              //  baselineDate: null ,
                baselineDateInvalid:true});
        }
    
}


       handleSavePatientBaseline(e){
        e.preventDefault();
        let errors = {};

if (this.patientMetCriteria()) {


   
    var mDate = moment(this.state.baselineDate, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (isDate(mDate.toString())) {
        if (moment(mDate.toString(), "DD/MM/YYYY", true).isValid()) {

            this.setState({
                errors: errors,
                baselineDate:mDate,
                changed:true,
                baselineDateInvalid:false
            })

        }
        else {
            //console.log('error in momemt')
            errors.baselineDateInvalidDate = BASELINEMESSAGES.invalidDate; //"Invalid Date"
            
            this.setState({
               errors: errors,
              // baselineDate:null,
                changed:false,
               baselineDateInvalid:true
           })
   
        }

    }
    else {

        errors.baselineDateRequired = BASELINEMESSAGES.dateRequired; //"Required"
        
                this.setState({
                errors:errors,
                   // baselineDate:null,
                    changed:false,
                    baselineDateInvalid:true
                    })

    }


  const isValid = Object.keys(errors).length === 0    
 
  if (isValid)
 {
    var patientBaseline = {
        baselineDate: this.state.baselineDate.format("YYYY-MM-DD"),
        attendedUHBpSSClinic: this.state.attendedUHBpSSClinic,
        warrantingInvestigationForpSS: this.state.warrantingInvestigationForpSS,
        physicianDiagnosisOfpSS : this.state.physicianDiagnosisOfpSS,
        previousHeadAndNeckRadiotherapy: this.state.previousHeadAndNeckRadiotherapy,
        previousConfirmedDiagnosis: this.state.previousConfirmedDiagnosis
    }

        this.props.handleSavePatientBaseline(this.state.token,patientBaseline);
 }
    }
    else {
        this.setState({
            metCriteria:false,
            //baselineDate:value,
           // baselineDateFormattedValue:formattedValue,
            changed:false
        })
    }
       }

      
    isIncludedDate(date) {
        return this.includeDates.indexOf(date)
      }



    // handleBaselineDateChange(value){

    //     let errorsClone = Object.assign({},this.state.errors);

    //     if (!value) {
    //         delete errorsClone['baselineDateInvalidDate'];
    //         delete errorsClone['baselineDateFuture'];
    //         errorsClone.baselineDateRequired = BASELINEMESSAGES.dateRequired; //"Required"

    //         this.setState({
    //         errors:errorsClone,
    //             baselineDate:null,
    //             changed:false,
    //             baselineDateInvalid:true
    //             })
    //     }
    // else {
    //     if (!!this.state.errors['baselineDateRequired'] || 
    //         !!this.state.errors['baselineDateInvalidDate'] || 
    //         !!this.state.errors['baselineDateFuture'] ){
    //             var theValue = value.format("DD/MM/YYYY");
              
    //              delete errorsClone['baselineDateRequired'];

    //              if (isStringValidDate(theValue)) {
    //               delete errorsClone['baselineDateInvalidDate'];
    //             }
                
                
    //             if (!isDateAfterToday(theValue,"DD/MM/YYYY")) {
    //               delete errorsClone['baselineDateFuture'];
    //           }
      
    //           if (Object.keys(errorsClone).length === 0){
    //                   this.setState({
    //                       errors: errorsClone,
    //                       baselineDate:value,
    //                       changed:true,
    //                       baselineDateInvalid:false
    //                   })
    //                }
    //                else {
    //                   this.setState({
    //                   errors: errorsClone,
    //                   baselineDate:value,
    //                   changed:false,
    //                   baselineDateInvalid:true
    //                   })
    //                }
    //         }
    //         else {
    //             // first time in here
    //             var theValue = value.format("DD/MM/YYYY");
        
    //             if (Validator.isEmpty(theValue) || 
    //                 !isStringValidDate(theValue,"DD/MM/YYYY") || isDateAfterToday(theValue,"DD/MM/YYYY")) {  
    //                 //we have an error
    //             if (Validator.isEmpty(theValue)) {
    //                  errorsClone.baselineDateRequired = BASELINEMESSAGES.dateRequired; //"Required"
    //             }
            
    //               if (!isStringValidDate(theValue, "DD/MM/YYYY")) {
    //                    errorsClone.baselineDateInvalidDate = BASELINEMESSAGES.invalidDate; //"Invalid Date"
    //               }
            
    //              if (isDateAfterToday(theValue,"DD/MM/YYYY")){
    //                 errorsClone.baselineDateFuture = BASELINEMESSAGES.futureDate //"Future date not allowed"
    //             }

    //             this.setState({
    //                 errors: errorsClone,
    //                 baselineDate:value,
    //                  changed:false,
    //                 baselineDateInvalid:true
    //             })
    //         }
    //         else {
    //             //no error

    //             this.setState({
    //                 baselineDate:value,
    //                  changed:true,
    //                 baselineDateInvalid:false
    //             })
    //         }

    //         }
    //     }
    
         
    // }



renderLoadingMessage(){
    return (
        <PanelDefault title={"Inclusion Criteria"}>
        <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   
patientMetCriteria(){

    if ((this.state.attendedUHBpSSClinic == inclusionCriteriaCtrls.attendedUHBpSSClinic[0].controlValueId ||
    this.state.warrantingInvestigationForpSS == inclusionCriteriaCtrls.warrantingInvestigationForpSS[0].controlValueId ||
    this.state.physicianDiagnosisOfpSS == inclusionCriteriaCtrls.physicianDiagnosisOfpSS[0].controlValueId )
     &&
    (
    this.state.previousHeadAndNeckRadiotherapy == exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[1].controlValueId &&
    this.state.previousConfirmedDiagnosis == exclusionCriteriaCtrls.previousConfirmedDiagnosis[1].controlValueId
    )){
return true;
    }
    else {
        return false
    }
}


attendedUHBpSSClinic_onChange(e){
   // console.log('attendedUHBpSSClinic_onChange' +  e.target.value)
    this.setState({
        attendedUHBpSSClinic: e.target.value,
        changed:true,
        started:true
      //  metCriteria: this.patientMetCriteria()
    })
}

warrantingInvestigationForpSS_onChange(e){
   // console.log('warrantingInvestigationForpSS_onChange' +  e.target.value)

    this.setState({
        warrantingInvestigationForpSS: e.target.value,
        changed:true,
        started:true
       //metCriteria: this.patientMetCriteria()
    })
}

physicianDiagnosisOfpSS_onChange(e){
    //console.log('physicianDiagnosisOfpSS_onChange' +  e.target.value)
    this.setState({
        physicianDiagnosisOfpSS: e.target.value,
        changed:true,
        started:true
       // metCriteria: this.patientMetCriteria()
    })
}

previousHeadAndNeckRadiotherapy_onChange(e){
   // console.log('previousHeadAndNeckRadiotherapy_onChange' +  e.target.value)
    this.setState({
        previousHeadAndNeckRadiotherapy: e.target.value,
        changed:true,
        started:true
       // metCriteria: this.patientMetCriteria()
    })
}

previousConfirmedDiagnosis_onChange(e){
    //console.log('previousConfirmedDiagnosis_onChange' +  e.target.value)
    this.setState({
        previousConfirmedDiagnosis: e.target.value,
        changed:true,
        started:true
        //metCriteria: this.patientMetCriteria()
    })
}

renderPartientCriteriaMessage(){
    // console.log('this.state.started')
    // console.log(this.state.attendedUHBpSSClinic || 
    //     this.state.warrantingInvestigationForpSS || 
    //     this.state.physicianDiagnosisOfpSS || 
    //     this.state.previousHeadAndNeckRadiotherapy || 
    //     this.state.previousConfirmedDiagnosis);
//if (this.state.attendedUHBpSSClinic && this.state.warrantingInvestigationForpSS && this.state.physicianDiagnosisOfpSS && this.state.previousHeadAndNeckRadiotherapy && this.state.previousConfirmedDiagnosis)
if (
    this.state.attendedUHBpSSClinic || 
    this.state.warrantingInvestigationForpSS || 
    this.state.physicianDiagnosisOfpSS || 
    this.state.previousHeadAndNeckRadiotherapy || 
    this.state.previousConfirmedDiagnosis

)
{
    if (!this.patientMetCriteria()){
        return (<div className="alert alert-danger"><i className="fa fa-exclamation-triangle mr-3" aria-hidden="true"></i>This patient has not met the criteria to participate in the Sjögrens study</div>)
    }
    else {
        return (<div className="alert alert-success"><i className="fa fa-check mr-3"  aria-hidden="true"></i>This patient has met the criteria to participate in the Sjögrens study</div>)
    }
}
}

renderInclusionCriteria(){
    return (
        <div className="block block-inclusion-criteria-head no-pad">
        <div className="page-header"><i className="fa fa-check mr-1"></i>Inclusion Criteria</div>
        <div className="block-content-no-border">
            <div className="form-group row">
                <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-9 col-md-6 col-sm-12">Attending UHB pSS clinic for investigation or management of pSS</label>
                <div className="col-lg-3 col-md-6 col-sm-12 funkyradio">
                    <div className="funkyradio-success">
                            <input type="Radio" name="attendedUHBpSSClinic" ref="optAttendedUHBpSSClinicYes" id="optAttendedUHBpSSClinicYes" 
                            defaultChecked={this.state.attendedUHBpSSClinic == inclusionCriteriaCtrls.attendedUHBpSSClinic[0].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.attendedUHBpSSClinic[0].controlValueId} 
                            onClick={this.attendedUHBpSSClinic_onChange}/>
                            <label className="radio-inline " htmlFor="optAttendedUHBpSSClinicYes">{inclusionCriteriaCtrls.attendedUHBpSSClinic[0].description}</label>
                    </div>
                    <div className="funkyradio-danger">
                            <input type="Radio" name="attendedUHBpSSClinic" ref="optAttendedUHBpSSClinicNo" id="optAttendedUHBpSSClinicNo" 
                            defaultChecked={this.state.attendedUHBpSSClinic ==  inclusionCriteriaCtrls.attendedUHBpSSClinic[1].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.attendedUHBpSSClinic[1].controlValueId} 
                            onClick={this.attendedUHBpSSClinic_onChange}/>
                            <label className="radio-inline" htmlFor="optAttendedUHBpSSClinicNo">{inclusionCriteriaCtrls.attendedUHBpSSClinic[1].description}</label>
                    </div>
                    <div className="funkyradio-default">
                            <input type="Radio" name="attendedUHBpSSClinic" ref="optAttendedUHBpSSClinicNA" id="optAttendedUHBpSSClinicNA" 
                            defaultChecked={this.state.attendedUHBpSSClinic == inclusionCriteriaCtrls.attendedUHBpSSClinic[2].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.attendedUHBpSSClinic[2].controlValueId} 
                            onClick={this.attendedUHBpSSClinic_onChange}/>
                            <label className="radio-inline" htmlFor="optAttendedUHBpSSClinicNA">{inclusionCriteriaCtrls.attendedUHBpSSClinic[2].description}</label>
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="warrantingInvestigationForpSS" className ="control-label col-lg-9 col-md-6 col-sm-12">Symptoms, signs, or tests warranting investigation for pSS</label>
                <div className="col-lg-3 col-md-6 col-sm-12 funkyradio">
                    <div className="funkyradio-success">
                            <input type="Radio" name="warrantingInvestigationForpSS" ref="optWarrantingInvestigationForpSSYes" id="optWarrantingInvestigationForpSSYes" 
                            defaultChecked={this.state.warrantingInvestigationForpSS == inclusionCriteriaCtrls.warrantingInvestigationForpSS[0].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.warrantingInvestigationForpSS[0].controlValueId} 
                            onClick={this.warrantingInvestigationForpSS_onChange}/>
                            <label className="radio-inline " htmlFor="optWarrantingInvestigationForpSSYes">{inclusionCriteriaCtrls.warrantingInvestigationForpSS[0].description}</label>
                    </div>
                    <div className="funkyradio-danger">
                            <input type="Radio" name="warrantingInvestigationForpSS" ref="optWarrantingInvestigationForpSSNo" id="optWarrantingInvestigationForpSSNo" 
                            defaultChecked={this.state.warrantingInvestigationForpSS == inclusionCriteriaCtrls.warrantingInvestigationForpSS[1].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.warrantingInvestigationForpSS[1].controlValueId} 
                            onClick={this.warrantingInvestigationForpSS_onChange}/>
                            <label className="radio-inline" htmlFor="optWarrantingInvestigationForpSSNo">{inclusionCriteriaCtrls.warrantingInvestigationForpSS[1].description}</label>
                    </div>
                    <div className="funkyradio-default">
                            <input type="Radio" name="warrantingInvestigationForpSS" ref="optWarrantingInvestigationForpSSNA" id="optWarrantingInvestigationForpSSNA" 
                            defaultChecked={this.state.warrantingInvestigationForpSS == inclusionCriteriaCtrls.warrantingInvestigationForpSS[2].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.warrantingInvestigationForpSS[2].controlValueId} 
                            onClick={this.warrantingInvestigationForpSS_onChange}/>
                            <label className="radio-inline" htmlFor="optWarrantingInvestigationForpSSNA">{inclusionCriteriaCtrls.warrantingInvestigationForpSS[2].description}</label>
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="physicianDiagnosisOfpSS" className ="control-label col-lg-9 col-md-6 col-sm-12">OR, physician diagnosis of pSS</label>
                <div className="col-lg-3 col-md-6 col-sm-12 funkyradio">
                    <div className="funkyradio-success">
                            <input type="Radio" name="physicianDiagnosisOfpSS" ref="optPhysicianDiagnosisOfpSSYes" id="optPhysicianDiagnosisOfpSSYes" 
                            defaultChecked={this.state.physicianDiagnosisOfpSS == inclusionCriteriaCtrls.physicianDiagnosisOfpSS[0].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.physicianDiagnosisOfpSS[0].controlValueId} 
                            onClick={this.physicianDiagnosisOfpSS_onChange}/>
                            <label className="radio-inline " htmlFor="optPhysicianDiagnosisOfpSSYes">{inclusionCriteriaCtrls.physicianDiagnosisOfpSS[0].description}</label>
                    </div>
                    <div className="funkyradio-danger">
                            <input type="Radio" name="physicianDiagnosisOfpSS" ref="optPhysicianDiagnosisOfpSSNo" id="optPhysicianDiagnosisOfpSSNo" 
                            defaultChecked={this.state.physicianDiagnosisOfpSS == inclusionCriteriaCtrls.physicianDiagnosisOfpSS[1].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.physicianDiagnosisOfpSS[1].controlValueId} 
                            onClick={this.physicianDiagnosisOfpSS_onChange}/>
                            <label className="radio-inline" htmlFor="optPhysicianDiagnosisOfpSSNo">{inclusionCriteriaCtrls.physicianDiagnosisOfpSS[1].description}</label>
                    </div>
                    <div className="funkyradio-default">
                            <input type="Radio" name="physicianDiagnosisOfpSS" ref="optPhysicianDiagnosisOfpSSNA" id="optPhysicianDiagnosisOfpSSNA" 
                            defaultChecked={this.state.physicianDiagnosisOfpSS == inclusionCriteriaCtrls.physicianDiagnosisOfpSS[2].controlValueId} 
                            defaultValue={inclusionCriteriaCtrls.physicianDiagnosisOfpSS[2].controlValueId} 
                            onClick={this.physicianDiagnosisOfpSS_onChange}/>
                            <label className="radio-inline" htmlFor="optPhysicianDiagnosisOfpSSNA">{inclusionCriteriaCtrls.physicianDiagnosisOfpSS[2].description}</label>
                    </div>


                </div>
            </div>
        </div>
        <hr className="patient-baseline-inclusion-criteria-hr"/>
    </div>
    )
}


renderInclusion(){


    if (this.props.patientBaseline && 
        this.props.patientBaseline.requestRecieved &&
        this.props.patientBaseline.data && 
        !!this.props.patientBaseline.data.baselineDate) {
            return (
                <fieldset disabled="disabled">
                    {
                this.renderInclusionCriteria()
                    }
            </fieldset>
            )
        }
        else {
            return (
                <fieldset>
                    {
                this.renderInclusionCriteria()
                    }
                </fieldset>
            )
        }
}


renderExclusion(){
    if (this.props.patientBaseline && 
        this.props.patientBaseline.requestRecieved &&
        this.props.patientBaseline.data && 
        !!this.props.patientBaseline.data.baselineDate) {
            return (
                <fieldset disabled="disabled">
                    {
                this.renderExclusionCriteria()
                    }
            </fieldset>
            )
        }
        else {
            return (
                <fieldset>
                    {
                this.renderExclusionCriteria()
                    }
                </fieldset>
            )
        }
}

renderExclusionCriteria(){
    return (
        <div className="block block-exclusion-criteria-head no-pad">
        <div className="page-header"><i className="fa fa-times mr-1"></i>Exclusion Criteria</div>
        <div className="block-content-no-border">
                
            <div className="form-group row">
                <label htmlFor="previousHeadAndNeckRadiotherapy" className="control-label col-lg-9 col-md-6 col-sm-12">Previous head and neck radiotherapy</label>
                <div className="col-lg-3 col-md-6 col-sm-12 funkyradio">
                    <div className="funkyradio-success">
                                <input type="Radio" name="previousHeadAndNeckRadiotherapy" ref="optPreviousHeadAndNeckRadiotherapyYes" id="optPreviousHeadAndNeckRadiotherapyYes"  
                                defaultChecked={this.state.previousHeadAndNeckRadiotherapy == exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[0].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[0].controlValueId} 
                                onClick={this.previousHeadAndNeckRadiotherapy_onChange}/>
                                <label className="radio-inline " htmlFor="optPreviousHeadAndNeckRadiotherapyYes">{exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[0].description}</label>
                        </div>
                        <div className="funkyradio-danger">
                                <input type="Radio" name="previousHeadAndNeckRadiotherapy" ref="optPreviousHeadAndNeckRadiotherapyNo" id="optPreviousHeadAndNeckRadiotherapyNo"  
                                defaultChecked={this.state.previousHeadAndNeckRadiotherapy == exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[1].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[1].controlValueId} 
                                onClick={this.previousHeadAndNeckRadiotherapy_onChange}/>
                                <label className="radio-inline" htmlFor="optPreviousHeadAndNeckRadiotherapyNo">{exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[1].description}</label>
                        </div>
                        <div className="funkyradio-default">
                                <input type="Radio" name="previousHeadAndNeckRadiotherapy" ref="optPreviousHeadAndNeckRadiotherapyNA" id="optPreviousHeadAndNeckRadiotherapyNA"  
                                defaultChecked={this.state.previousHeadAndNeckRadiotherapy == exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[2].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[2].controlValueId} 
                                onClick={this.previousHeadAndNeckRadiotherapy_onChange}/>
                                <label className="radio-inline" htmlFor="optPreviousHeadAndNeckRadiotherapyNA">{exclusionCriteriaCtrls.previousHeadAndNeckRadiotherapy[2].description}</label>
                        </div>
               
                </div>
            </div>

            

            <div className="form-group row mb-10">
                <label htmlFor="previousConfirmedDiagnosis" className ="control-label col-lg-9  col-md-6 col-sm-12">Previous confirmed diagnosis of sarcoidosis, rheumatoid arthritis or other connective tissue disease, graft-versus-host disease, HIV or <span className="nowrap">hepatitis C.</span></label>
                <div className="col-lg-3 col-md-6 col-sm-12 funkyradio">
                    <div className="funkyradio-success">
                                <input type="Radio" name="previousConfirmedDiagnosis" ref="optPreviousConfirmedDiagnosisYes" id="optPreviousConfirmedDiagnosisYes" 
                                defaultChecked={this.state.previousConfirmedDiagnosis == exclusionCriteriaCtrls.previousConfirmedDiagnosis[0].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousConfirmedDiagnosis[0].controlValueId} 
                                onClick={this.previousConfirmedDiagnosis_onChange}/>
                                <label className="radio-inline" htmlFor="optPreviousConfirmedDiagnosisYes">{exclusionCriteriaCtrls.previousConfirmedDiagnosis[0].description}</label>
                        </div>
                        <div className="funkyradio-danger">
                                <input type="Radio" name="previousConfirmedDiagnosis" ref="optPreviousConfirmedDiagnosisNo" id="optPreviousConfirmedDiagnosisNo" 
                                defaultChecked={this.state.previousConfirmedDiagnosis == exclusionCriteriaCtrls.previousConfirmedDiagnosis[1].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousConfirmedDiagnosis[1].controlValueId} 
                                onClick={this.previousConfirmedDiagnosis_onChange}/>
                                <label className="radio-inline" htmlFor="optPreviousConfirmedDiagnosisNo">{exclusionCriteriaCtrls.previousConfirmedDiagnosis[1].description}</label>
                        </div>
                        <div className="funkyradio-default">
                                <input type="Radio" name="previousConfirmedDiagnosis" ref="optPreviousConfirmedDiagnosisNA" id="optPreviousConfirmedDiagnosisNA" 
                                defaultChecked={this.state.previousConfirmedDiagnosis == exclusionCriteriaCtrls.previousConfirmedDiagnosis[2].controlValueId} 
                                defaultValue={exclusionCriteriaCtrls.previousConfirmedDiagnosis[2].controlValueId} 
                                onClick={this.previousConfirmedDiagnosis_onChange}/>
                                <label className="radio-inline" htmlFor="optPreviousConfirmedDiagnosisNA">{exclusionCriteriaCtrls.previousConfirmedDiagnosis[2].description}</label>
                        </div>

                </div>
            </div>
        </div>








        <hr className="patient-baseline-exclusion-criteria-hr"/>
        
        
        </div>
    )
}

renderPatientBaseline(){
    return (
        <PanelDefault title={"Inclusion Criteria"}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">Part 1: Doctors</div>

                <div className="block-baseline-head no-pad">
                

                    <div className="block-content-no-border">
                    
                        <div className="form-group row">
                            <label className ="control-label col-md-2">Baseline Date</label>
                            <div className={classnames('col-md-2',{error:!!this.state.errors.baselineDateRequired || !!this.state.errors.baselineDateInvalidDate || !!this.state.errors.baselineDateFuture})}>
                               
                               

                                <DatePicker 
                                className="form-control" 
                                ref="baselineDate"
                                selected={this.state.baselineDate} 
                                todayButton={"Today"}
                                dateFormat="DD/MM/YYYY"
                                onChange={this.handleBaselineDateChange}
                                onBlur={this.handleBaselineDateOnBlur}
                                locale="en-gb"          
                                filterDate={this.isWeekday}
                                minDate={moment().subtract(1, "year")}
                                maxDate={moment().startOf('day')}           
                               />

                                                <div className={classnames('',{'visible-inline error info':!!this.state.errors.baselineDateRequired,hidden:!!!this.state.errors.baselineDateRequired})}>{this.state.errors.baselineDateRequired}</div>
                                                <div className={classnames('',{'visible-inline error info':!!this.state.errors.baselineDateInvalidDate,hidden:!!!this.state.errors.baselineDateInvalidDate})}>{this.state.errors.baselineDateInvalidDate}</div>
                                                <div className={classnames('',{'visible-inline error info':!!this.state.errors.baselineDateFuture,hidden:!!!this.state.errors.baselineDateFuture})}>{this.state.errors.baselineDateFuture}</div>
                            </div>
                            
                        </div>
                    </div>
                </div>

{
    
    this.renderInclusion()
}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12"> 


{
   this.renderExclusion()
}
                
                    {this.renderPartientCriteriaMessage() }



                    
                </div>
            </div>

            <div className="row patientdetails-well">
                
                <div className="col-lg-12 col-md-12 col-sm-12"> 

               


                {
                           this.props.patientBaseline.sendingRequest ? 
                           this.renderSavingButton() :
                           this.renderSaveButton()
               
                                      }


                 </div>
            </div>
         </div>
     </PanelDefault>
    )
}
    
    render (){
        {
            return(
                <div>
                  {
                    this.props.patientBaseline.requestRecieved ?
                    this.renderPatientBaseline() : null
                  }



<OnLeavePrompt changed={this.state.changed}/>
  
            </div>
            );
        }
    }
}



 export default PatientBaselineForm;
