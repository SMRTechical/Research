import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
// import { NavLink, Link, Route } from 'react-router-dom'
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import InputGroupAddOnLR from '../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../components/generic/input/input-group-add-on-r';
import InputGroupAddOnL from '../../components/generic/input/input-group-add-on-l';
import AuditData from '../../components/generic/audit-data';
//import Consent from '../../containers/patient/consent';
//import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {categories} from '../../config/categories';
import FunkyRadioThreeOptionsVertical from '../../components/generic/radio/funky-radio-three-options-vertical';
import FunkyRadioThreeOptionsVerticalNoCaption from '../../components/generic/radio/funky-radio-three-options-vertical-no-caption';
import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import {ocularSignsObjectiveValidation} from '../../components/visit/modules/functions'

import {isAlpha, isAlphanumericSpace, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,threeDigitsOnly1DecimalPlaces,isNumericPeriod} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
//import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
//import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue,getDetailsControlValue_V2,getCategoryControls,getControlValues,getVisitOptionControlValue_V2} from '../../Factory/visit';

import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import 
{
    VISIT_CATEGORY_AMERICANEUROPEANCGC,
    VISIT_CATEGORY_DIAGNOSIS,
    VISIT_CATEGORY_CURRENTMEDICATIONS,
    VISIT_CATEGORY_ESSDAI,
    VISIT_CATEGORY_ACTIVITYSCORE,
    VISIT_CATEGORY_DAMAGEINDICES,
    VISIT_CATEGORY_PASTMEDICALHISTORY,
    VISIT_CATEGORY_INVESTIGATIONSREQUESTED,
    VISIT_CATEGORY_ULTRASOUNDRESULTS,
    VISIT_CATEGORY_SALIVARYFLOW,
    VISIT_CATEGORY_ROUTINEBLOODS,
    VISIT_CATEGORY_RESEARCHBLOODS,
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS,  
    VISIT_CATEGORY_CLINICALORALDRYNESSSCORE,
    VISIT_CATEGORY_OCULARSURFACESTAININGSCORE,
    VISIT_CATEGORY_FATFREEMASS

} from '../../constants/paths/visit-category-names';

import {FatFreeMassFieldLength} from '../../constants/information/field-length';
import {FatFreeMass} from '../../config/controls/fat-free-mass';


class FatFreeMassForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
         

            visitControls: this.props.visitControlValuesResult && 
                            this.props.visitControlValuesResult.data && 
                            this.props.visitControlValuesResult.data.visitControlValues && 
                            this.props.visitControlValuesResult.data.visitControlValues.length > 0 ?
                            getCategoryControls(categories.salivaryFlow.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          


            fatFreeMass: this.props.visitResult && 
                           this.props.visitResult.data && 
                                        this.props.visitResult.data.details && 
                                        this.props.visitResult.data.details.length > 0 ?
                                getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,this.props.visitResult.data.details) ? 
                                getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,this.props.visitResult.data.details):'':'',

            fatMass: this.props.visitResult && 
                         this.props.visitResult.data && 
                                             this.props.visitResult.data.details && 
                                             this.props.visitResult.data.details.length > 0 ?
                                     getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,this.props.visitResult.data.details) ? 
                                     getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,this.props.visitResult.data.details):'':'',
     
     

         
            changed:false,
            errors:{},
            /*Every visit should have start */
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
            /*Every visit should have end*/
          };        

        this.renderForm = this.renderForm.bind(this);
           this.renderAuditData = this.renderAuditData.bind(this);     
            /*Every visit should have start*/
            this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
            this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
            //this.renderSaveButton = this.renderSaveButton.bind(this);
          //  this.renderSavingButton = this.renderSavingButton.bind(this);
          //  this.renderCompleteButton = this.renderCompleteButton.bind(this);
           // this.renderCompletingButton = this.renderCompletingButton.bind(this)
            this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
            this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
            this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
            this.validateVisit = this.validateVisit.bind(this);
            this.getVisitValues = this.getVisitValues.bind(this);
            this.getDetailValues = this.getDetailValues.bind(this);
            this.renderFieldset = this.renderFieldset.bind(this);
            this.isFormValid = this.isFormValid.bind(this);
            /*Every visit should have end */

            this.fatFreeMass_onChange = this.fatFreeMass_onChange.bind(this)
            this.fatFreeMass_onBlur = this.fatFreeMass_onBlur.bind(this)
            this.fatFreeMass_onKeyPress = this.fatFreeMass_onKeyPress.bind(this)

            this.fatMass_onChange = this.fatMass_onChange.bind(this)
            this.fatMass_onBlur = this.fatMass_onBlur.bind(this)
            this.fatMass_onKeyPress = this.fatMass_onKeyPress.bind(this)

            this.maxLengthCheck_kg = this.maxLengthCheck_kg.bind(this);
    }



    maxLengthCheck_kg(object) {
        // console.log('maxLengthCheck_ml');
        if ((object.target.value.length > object.target.maxLength) ||  (!threeDigitsOnly1DecimalPlaces(object.target.value)))
            {
                object.target.value = object.target.value.slice(0, object.target.maxLength)
            }
    }


    fatFreeMass_onChange(e){

        if (!!this.state.errors['fatFreeMass'] ){
            //One of the above error has occurred 
          //  console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           // delete errorsClone['fatFreeMass'];
           // delete errorsClone['sjogrensSymptomsStartYYYYRange'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && threeDigitsOnly1DecimalPlaces(e.target.value)) {
           // console.log('Entered value is ok');
            delete errorsClone['fatFreeMass'];
           }
           
         
         //copy clone back to errors in state
           this.setState({
               errors:errorsClone,
               fatFreeMass:e.target.value,
               changed:true,
           });
          }
           else {
    
               if (e.target.value.length > 0  && !threeDigitsOnly1DecimalPlaces(e.target.value)) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.fatFreeMass =  'Please provide a valid fat free mass value';
    
                   this.setState({
                               errors:errorsClone,
                               fatFreeMass:e.target.value,
                               changed:true,
                           })
               } 
               else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     //clone object from state 
                 let errorsClone = Object.assign({},this.state.errors);
                     this.setState({
                            errors:errorsClone,
                            fatFreeMass:e.target.value,
                            changed:true,
                           })
                       }
               }
    
    }

    fatFreeMass_onBlur(e){
        this.setState({
            fatFreeMass:e.target.value,
            changed:true,
            });    
    }

    fatFreeMass_onKeyPress(e){
        var charCode = e.keyCode || e.which; 
        var key = String.fromCharCode(charCode);

        if (!isNumericPeriod(key)){
            e.preventDefault();   
        }
    }

    fatMass_onChange(e){

        if (!!this.state.errors['fatMass'] ){
            //One of the above error has occurred 
          //  console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           // delete errorsClone['fatFreeMass'];
           // delete errorsClone['sjogrensSymptomsStartYYYYRange'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && threeDigitsOnly1DecimalPlaces(e.target.value)) {
           // console.log('Entered value is ok');
            delete errorsClone['fatMass'];
           }
           
         
         //copy clone back to errors in state
           this.setState({
               errors:errorsClone,
               fatMass:e.target.value,
               changed:true,
           });
          }
           else {
    
               if (e.target.value.length > 0  && !threeDigitsOnly1DecimalPlaces(e.target.value)) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.fatMass =  'Please provide a valid fat mass value';
    
                   this.setState({
                               errors:errorsClone,
                               fatMass:e.target.value,
                               changed:true,
                           })
               } 
               else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     //clone object from state 
                 let errorsClone = Object.assign({},this.state.errors);
                     this.setState({
                            errors:errorsClone,
                            fatMass:e.target.value,
                            changed:true,
                           })
                       }
               }
    


        /*
        this.setState({
            fatMass:e.target.value,
            changed:true,
        });                
        */
    }

    fatMass_onBlur(e){
        this.setState({
            fatMass:e.target.value,
            changed:true,
            });    
    }

    fatMass_onKeyPress(e){
        var charCode = e.keyCode || e.which; 
        var key = String.fromCharCode(charCode);

        if (!isNumericPeriod(key)){
            e.preventDefault();   
        }
    }


    validateVisit(){
        let errors = {};
      
       
      

            if ( this.state.fatFreeMass.length > 0  && 
                !threeDigitsOnly1DecimalPlaces(this.state.fatFreeMass)) {
                errors.fatFreeMass = 'Please provide valid fat free mass value';  
            } 


            if ( this.state.fatMass.length > 0  && 
                !threeDigitsOnly1DecimalPlaces(this.state.fatMass)) {
                errors.fatMass = 'Please provide valid fat mass value';  
            } 

       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []
        return visit;
    }

    
getDetailValues(){

    var detail = []
    
  
    
    //if (this.state.patientMeetsAECGCGCA){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeetsAECGCGCA,
                controlId:patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
    //}
    

    //if (this.state.patientMeets2016ACRECCriteria){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeets2016ACRECCriteria,
                controlId:patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
    //}

    
    if (this.state.fatFreeMass){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.fatFreeMass,
                controlId:FatFreeMass.txtFatFreeMass.controlId, 
                categoryId:   categories.fatFreeMass.id   
            }
        )
    }

    if (this.state.fatMass){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.fatMass,
                controlId:FatFreeMass.txtFatMass.controlId, 
                categoryId:   categories.fatFreeMass.id   
            }
        )
    }
    
    return detail
}

/*Every visit shold have this --start */

handleSaveVisitHeader(e){
    e.preventDefault();

    let errors = {};
    errors = this.validateVisit()

    const isValid = Object.keys(errors).length === 0    
   
    if (isValid)
    {
            var visit =  [];
            var detail = [];

            visit = this.getVisitValues();
            detail = this.getDetailValues();

            for(var i = visit.length; i--;){
                    if (visit[i].controlId === 0 || visit[i].controlValueId === 0 ) visit.splice(i, 1);
            }

            for(var i = detail.length; i--;){
                    if (detail[i].controlId === 0 || detail[i].value === '') detail.splice(i, 1);
            }
    this.props.handleSaveVisitHeader(visit, detail, categories.fatFreeMass.id);
    }
}


handleCompleteVisitHeader(e){
    e.preventDefault();

    let errors = {};
    errors = this.validateVisit()

    const isValid = Object.keys(errors).length === 0    
   
    if (isValid)
    {
        var visit =  [];
        var detail = [];

        visit = this.getVisitValues();
        detail = this.getDetailValues();

        for(var i = visit.length; i--;){
            if (visit[i].controlId === 0 || visit[i].controlValueId === 0 ) visit.splice(i, 1);
        }

        for(var i = detail.length; i--;){
            if (detail[i].controlId === 0 || detail[i].value === '') detail.splice(i, 1);
        }

        this.props.handleCompleteVisitHeader(visit, detail, categories.fatFreeMass.id);
    }
    else {
        this.setState({
            visitCompleteModalOpen: false
        })
    }
}
/*Every visit shold have this --end */


    componentWillReceiveProps(nextProps){

      this.setState({
        patientMeetsAECGCGCA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,nextProps.visitResult.data.details):'',
        //  patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
        patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
        
        fatFreeMass: nextProps.visitResult && 
        nextProps.visitResult.data && 
                     nextProps.visitResult.data.details && 
                     nextProps.visitResult.data.details.length > 0 ?
             getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,nextProps.visitResult.data.details) ? 
             getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,nextProps.visitResult.data.details):'':'',

fatFree: nextProps.visitResult && 
      nextProps.visitResult.data && 
                          nextProps.visitResult.data.details && 
                          nextProps.visitResult.data.details.length > 0 ?
                  getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,nextProps.visitResult.data.details) ? 
                  getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,nextProps.visitResult.data.details):'':'',



                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
             

                changed:false,
                
        })

       


      }




    componentDidMount () {
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
                //  patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
              
                
                fatFreeMass: this.props.visitResult && 
                this.props.visitResult.data && 
                             this.props.visitResult.data.details && 
                             this.props.visitResult.data.details.length > 0 ?
                     getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,this.props.visitResult.data.details) ? 
                     getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatFreeMass,this.props.visitResult.data.details):'':'',

 fatFree: this.props.visitResult && 
              this.props.visitResult.data && 
                                  this.props.visitResult.data.details && 
                                  this.props.visitResult.data.details.length > 0 ?
                          getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,this.props.visitResult.data.details) ? 
                          getDetailsControlValue_V2(categories.fatFreeMass.id, FatFreeMass.txtFatMass,this.props.visitResult.data.details):'':'',


                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
               
                changed:false,
            });
       }

      


renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading "}>
       <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   




 renderAuditData(){
   // console.log(this.state.createdDateTime);
  //  console.log(this.state.lastUpdatedDateTime);
        return (
            <AuditData createdBy={this.state.createdUser} createdDate={this.state.createdDateTime}  lastUpdatedBy={this.state.lastUpdatedUser} lastUpdatedDate={this.state.lastUpdatedDateTime}/>
            
        )
    }

    



        closeVisitCompleteModal(){
            this.setState({
                visitCompleteModalOpen:false,
            })  
        }
        
  
openVisitCompleteModal(e){
    e.preventDefault();
        this.setState({
            visitCompleteModalOpen:true
        })
    }
    
    
        afterOpenVisitCompleteModal(){
            var p = ''
            //use this to clear any error
        }
    

        renderFieldset(){
            
                 if (this.props.visitHeaderResult && 
                    this.props.visitHeaderResult.data && 
                    this.props.visitHeaderResult.data.completed) {
                    return (
                        <div className="panel-body scrollbar-v-visit-content">
                    <fieldset disabled="disabled">
                        {
                            this.renderForm()
                        }
                        </fieldset>
                        </div>
                        )
                        }
                        else{
                            return (
                                <div className="panel-body scrollbar-v-visit-content">
                                <fieldset>
                           {
                            this.renderForm()
                           }
                           </fieldset>
                           </div>
                            )
                        }
            
            
                }


isFormValid(){
   return Object.keys(this.state.errors).length === 0  
}

                
renderExistingHeaderPanel(){
    return (
        <div className='panel panel-primary'>
    <div className="panel-heading">
        <div className="row">
            <div className="col-md-6">
            <h3 className="panel-title pull-left">Fat Free Mass</h3>
                </div>             
            </div>
        </div>
       

        <form>
    
{
    this.renderFieldset()
}
</form>


<div className='panel-footer visit-well'>

<div className="col-lg-12 col-md-12 col-sm-12">




<Flow  
token = {
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.token
}

hasParentChanged = {
    this.state.changed
}
isComplete=
{
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.completed
}
sendingRequest= {
    this.props.visitResult.sendingRequest
}
isNew={
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.newVisit 
}
/* nextCategoryName = {} */
prevCategoryName = {VISIT_CATEGORY_OCULARSURFACESTAININGSCORE}
showNextNav = {false}
showPrevNav = {true}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
openVisitCompleteModal={this.openVisitCompleteModal}
/>
               
                       
               
          
            </div>
             </div>
             </div>
                                    
            
            
            )
}



renderNewHeaderPanel(){
    
    return (
        <div className= "panel panel-primary">
    
        <div className="panel-heading">
                <h3 className="panel-title">Fat Free Mass</h3>
                
            </div>
           
    
    {
        this.renderForm()
    }
    
    
        <div className="panel-footer">
            
                  
                    
<div className="col-lg-12 col-md-12 col-sm-12">
    
    
    

<Flow  
token = {
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.token
}

hasParentChanged = {
    this.state.changed
}
isComplete=
{
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.completed
}
sendingRequest= {
    this.props.visitResult.sendingRequest
}
isNew={
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.newVisit 
}

/* nextCategoryName = {} */
prevCategoryName = {VISIT_CATEGORY_OCULARSURFACESTAININGSCORE}
showNextNav = {false}
showPrevNav = {false}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
openVisitCompleteModal={this.openVisitCompleteModal}
/>
    
                   
                          
                           
                   
                     </div>
                 </div>
                 </div>
                                        
                
                
                )

    }
    

renderForm(){
    
    return (
        <div>
            <FadeIn>

            

                <div className="row">
                <div className="col-md-12"> 
                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5">Fat mass</div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                    <div className="block-content-no-border row">
                        <div className={classnames('col-lg-2 col-md-2 col-sm-12',{error:!!this.state.errors.fatMass })}>
                       
                                <InputGroupAddOnR  rightAddOn={"kg"}>
                                <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                    id="fatMass"
                                    name="fatMass" 
                                    ref="fatMass"
                                    placeholder="000.0" 
                                    value={this.state.fatMass}
                                    onChange={this.fatMass_onChange}
                                    onKeyPress={this.fatMass_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                    type="number" 
                                    maxLength="5"
                                    onInput={this.maxLengthCheck_kg} 
                                    step="0.1" 
                                    min={FatFreeMassFieldLength.fatMassMin} 
                                    max={FatFreeMassFieldLength.fatMassMax}
                                />       
                                </InputGroupAddOnR>
                                <span className={classnames('',{'visible error info':!!this.state.errors.fatMass,hidden:!!!this.state.errors.fatMass})}>{this.state.errors.fatMass}</span>     
                        </div>        
                    </div>
                </div>
                </div>
                </div>

                <div className="row">
                <div className="col-md-12"> 
                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5">Fat free mass</div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                    <div className="block-content-no-border row">
                        <div className={classnames('col-lg-2 col-md-2 col-sm-12',{error:!!this.state.errors.fatFreeMass })}>
                                              
                                <InputGroupAddOnR  rightAddOn={"kg"}>
                                <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                    id="fatFreeMass"
                                    name="fatFreeMass" 
                                    ref="fatFreeMass"
                                    placeholder="000.0" 
                                    value={this.state.fatFreeMass}
                                    onChange={this.fatFreeMass_onChange}
                                    onKeyPress={this.fatFreeMass_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                    type="number" 
                                    maxLength="5"
                                    onInput={this.maxLengthCheck_kg} 
                                    step="0.1" 
                                    min={FatFreeMassFieldLength.fatFreeMassMin} 
                                    max={FatFreeMassFieldLength.fatFreeMassMax}
                                />       
                                </InputGroupAddOnR>
                                <span className={classnames('',{'visible error info':!!this.state.errors.fatFreeMass,hidden:!!!this.state.errors.fatFreeMass})}>{this.state.errors.fatFreeMass}</span>     
                        </div>        
                    </div>
                </div>
                </div>
                </div>
                </FadeIn>
            </div>
    )
}
    
    render (){
        {
            return(
                <div>
                  {
                    this.props.visitHeaderResult && 
                    this.props.visitHeaderResult.data && 
                    !this.props.visitHeaderResult.data.newVisit  ?
                    this.renderExistingHeaderPanel():this.renderNewHeaderPanel()
                  }

                  <OnLeavePrompt changed={this.state.changed &&  
                            this.props.visitHeaderResult && 
                            this.props.visitHeaderResult.data && 
                            !this.props.visitHeaderResult.data.completed }/>


                            <ModalDefault isOpen={this.state.visitCompleteModalOpen}  onRequestClose={this.closeVisitCompleteModal} onAfterOpen={this.afterOpenVisitCompleteModal} style={VISITCOMPLETE} contentLabel={"Complete Visit"}>
            <div  className='panel panel-danger'>
                <div className="panel-heading">
                    <button type="button" className="close" onClick={this.closeVisitCompleteModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>                   
                    <h4>Complete Visit</h4>
                </div>
                <div className="panel-body">
                     <form className="form" role="form">
 
                        <div className="alert alert-danger complete-visit-warning-message">
                            <i className="fa fa-exclamation-triangle fa-2 mr-10" aria-hidden="true"></i>
                            Warning: Visit data will no longer be editable</div>
 
          
                           
                          
                        </form>
                </div>
                <div className="panel-footer">
                    <button id="visitCompleteCancel" type="button" className="btn btn-primary mr-3" 
                    onClick={this.closeVisitCompleteModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>
                    <button id="visitCompleteConfirm"  
                    type="button" className="btn btn-danger"
                    onClick={this.handleCompleteVisitHeader}>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
                    </button>
                </div>
            </div>
            </ModalDefault>


            </div>
            );
        }
}
}

 export default FatFreeMassForm;

