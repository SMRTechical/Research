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
import {ActivityScore} from '../../config/controls/activity-score';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {categories} from '../../config/categories';
import FunkyRadioFourOptionsActivityScore from '../../components/generic/radio/activity-score/funky-radio-four-options-activity-score';
import FunkyRadioTwoOptionsActivityScore from '../../components/generic/radio/activity-score/funky-radio-two-options-activity-score';

import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import {ocularSignsObjectiveValidation} from '../../components/visit/modules/functions'
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue,getDetailsControlValue_V2,getCategoryControls,getControlValues,getVisitOptionControlValue_V2} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import {ACTIVITYSCORESTATICFIELDS} from '../../config/static/activity-score';
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
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS

} from '../../constants/paths/visit-category-names';

import RCSLIDER from '../../components/generic/slider/rc-slider';

class ActivityScoreForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
         
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
            
            patientDisorder:
            this.props.visitResult && 
            this.props.visitResult.data && 
            this.props.visitResult.data.visits && 
            this.props.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.activityScore.id, 
                    getControlValues(ActivityScore.rbtListPatientDisorder.controlId,
                        getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                        this.props.visitResult.data.visits):null,

            
            diseaseGradingMarks : getControlValues(ActivityScore.ddlDeseaseGrading.controlId,
                               getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
         
            diseaseGrading :  
              this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
              getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,this.props.visitResult.data.details) ? 
              getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,this.props.visitResult.data.details):0:0,
                    
            treatPatient:
              this.props.visitResult && 
              this.props.visitResult.data && 
              this.props.visitResult.data.visits && 
              this.props.visitResult.data.visits.length > 0 ? 
              getVisitOptionControlValue_V2(categories.activityScore.id, 
                      getControlValues(ActivityScore.rbtListTreatPatient.controlId,
                          getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                          this.props.visitResult.data.visits):null,


            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
         
         
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

            this.patientDisorder_onChange = this.patientDisorder_onChange.bind(this);
            this.toMarksObject = this.toMarksObject.bind(this);
            this.renderDiseaseGradingSlider = this.renderDiseaseGradingSlider.bind(this);
            this.diseaseGradingSlider_OnChange = this.diseaseGradingSlider_OnChange.bind(this);
            this.treatPatient_onChange = this.treatPatient_onChange.bind(this);

    }

    diseaseGradingSlider_OnChange(value){
        this.setState({diseaseGrading: value, changed:true})
    }

    toMarksObject(arr, noneText) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i){
          if (arr[i] !== undefined)  {
             if (arr[i].controlValue > -1) {
              rv[arr[i].controlValue] = arr[i].controlValue;
             }
             else {
                rv[arr[i].controlValue] = noneText;
             }
            }
        }
          return rv;
      }



      
      renderDiseaseGradingSlider()
{
    if (this.state.diseaseGradingMarks){

        const marks = this.toMarksObject(this.state.diseaseGradingMarks, ACTIVITYSCORESTATICFIELDS.diseaseGrading.none);
        const min = parseInt(this.state.diseaseGradingMarks[0].controlValue);
        const max = parseInt(this.state.diseaseGradingMarks[this.state.diseaseGradingMarks.length-1].controlValue)
        const  isComplete= this.props.visitHeaderResult &&  this.props.visitHeaderResult.data &&  
                this.props.visitHeaderResult.data.completed ? 
                this.props.visitHeaderResult.data.completed :
                false

              
return (        
<RCSLIDER 
    caption={ACTIVITYSCORESTATICFIELDS.diseaseGrading.caption} 
    beforeText={ACTIVITYSCORESTATICFIELDS.diseaseGrading.beforeText}
    afterText={ACTIVITYSCORESTATICFIELDS.diseaseGrading.afterText}
    min={min}
    max={max}
    marks={marks}
    step={1}
    defaultValue={this.state.diseaseGrading == undefined ? min : parseInt(this.state.diseaseGrading)} 
    value= {this.state.diseaseGrading == undefined ? min : parseInt(this.state.diseaseGrading)} 
    onChange={this.diseaseGradingSlider_OnChange}
    isComplete={isComplete}
/>

)
    }
    else {
return (<div>..Loading disease grading scale</div>)
    }
}



    
    patientDisorder_onChange(e){
         if (this.state.patientDisorder == e.target.value) { 
             this.setState({
                patientDisorder:null,
                 changed:true,
              })
         }
         else {
             this.setState({
                patientDisorder: e.target.value,
                 changed:this.state.patientDisorder != e.target.value,
             })
     }
     }


     treatPatient_onChange(e){
        if (this.state.treatPatient == e.target.value) { 
            this.setState({
               treatPatient:null,
                changed:true,
             })
        }
        else {
            this.setState({
                treatPatient: e.target.value,
                changed:this.state.treatPatient != e.target.value,
            })
    }
    }

    validateVisit(){
        let errors = {};
      
            
      
       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []


        if (this.state.patientDisorder){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.patientDisorder,
                    controlId:
                    this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[0].controlId:
                    this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[1].controlId :    
                    this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[2].controlId :   
                    this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[3].controlValueId ? 
                            getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.activityScore.id   
        
                }
            )
        }

        if (this.state.treatPatient){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.treatPatient,
                    controlId:
                    this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[0].controlId:
                    this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[1].controlId :    
                    this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[2].controlId :   
                    this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[3].controlValueId ? 
                            getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.activityScore.id   
        
                }
            )
        }

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
  //  }
  if (this.state.diseaseGrading != undefined && parseInt(this.state.diseaseGrading) > -1){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.diseaseGrading,
            controlId:ActivityScore.ddlDeseaseGrading.controlId, 
            categoryId: categories.activityScore.id  
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
    this.props.handleSaveVisitHeader(visit, detail, categories.activityScore.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.activityScore.id);
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
         //       patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.details):'',
                patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
                

                patientDisorder:
                nextProps.visitResult && 
                nextProps.visitResult.data && 
                nextProps.visitResult.data.visits && 
                nextProps.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.activityScore.id, 
                        getControlValues(ActivityScore.rbtListPatientDisorder.controlId,
                            getCategoryControls(categories.activityScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                            nextProps.visitResult.data.visits):null,


            diseaseGradingMarks : getControlValues(ActivityScore.ddlDeseaseGrading.controlId,
                                getCategoryControls(categories.activityScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
          
             diseaseGrading :  
               nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ?
               getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,nextProps.visitResult.data.details) ? 
               getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,nextProps.visitResult.data.details):0:0,
                                
 
               treatPatient:
               nextProps.visitResult && 
               nextProps.visitResult.data && 
               nextProps.visitResult.data.visits && 
               nextProps.visitResult.data.visits.length > 0 ? 
               getVisitOptionControlValue_V2(categories.activityScore.id, 
                       getControlValues(ActivityScore.rbtListTreatPatient.controlId,
                           getCategoryControls(categories.activityScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                           nextProps.visitResult.data.visits):null,


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
               // patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
                

                patientDisorder:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.activityScore.id, 
                        getControlValues(ActivityScore.rbtListPatientDisorder.controlId,
                            getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,

                diseaseGradingMarks : getControlValues(ActivityScore.ddlDeseaseGrading.controlId,
                                getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
          
             diseaseGrading :  
               this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
               getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,this.props.visitResult.data.details) ? 
               getDetailsControlValue_V2(categories.activityScore.id, ActivityScore.ddlDeseaseGrading,this.props.visitResult.data.details):0:0,
                                
 
               treatPatient:
               this.props.visitResult && 
               this.props.visitResult.data && 
               this.props.visitResult.data.visits && 
               this.props.visitResult.data.visits.length > 0 ? 
               getVisitOptionControlValue_V2(categories.activityScore.id, 
                       getControlValues(ActivityScore.rbtListTreatPatient.controlId,
                           getCategoryControls(categories.activityScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                           this.props.visitResult.data.visits):null,

                

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
            <h3 className="panel-title pull-left">Activity Score</h3>
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
nextCategoryName = {VISIT_CATEGORY_DAMAGEINDICES}
prevCategoryName = {VISIT_CATEGORY_ESSDAI}
showNextNav = {true}
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
                <h3 className="panel-title">Activity Score</h3>
                
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
nextCategoryName = {VISIT_CATEGORY_DAMAGEINDICES}
prevCategoryName = {VISIT_CATEGORY_ESSDAI}
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
        <FadeIn>
        <div className="row">
                <div className="col-md-12">
                <FunkyRadioFourOptionsActivityScore caption={ACTIVITYSCORESTATICFIELDS.patientDisorder.caption}
                                                captionClass={"col-md-12 page-header"}
                                                optionsClass={"col-md-9 col-md-offset-3"}
                                                optionOneId={"optPatientDisorderInActivity"}
                                                optionTwoId={"optPatientDisorderMildlyActive"}
                                                optionThreeId={"optPatientDisorderActive"}
                                                optionFourId={"optPatientDisorderVeryActive"}
                                                optionOneHtmlFor={"optPatientDisorderInActivity"}
                                                optionTwoHtmlFor={"optPatientDisorderMildlyActive"}
                                                optionThreeHtmlFor={"optPatientDisorderActive"}
                                                optionFourHtmlFor={"optPatientDisorderVeryActive"}

                                                    optionOneChecked={this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.patientDisorder_onChange}
                                                    optionOneCaption={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.patientDisorder_onChange}
                                                    optionTwoCaption={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.patientDisorder_onChange}
                                                    optionThreeCaption={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[2].controlValue}
                                                   
                                                    optionFourChecked={this.state.patientDisorder == getControlValues(ActivityScore.rbtListPatientDisorder.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.patientDisorder_onChange}
                                                    optionFourCaption={getControlValues(ActivityScore.rbtListPatientDisorder.controlId,this.state.visitControls)[3].controlValue}
                                                   
                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                  />
                </div>

                <div className="col-md-12">
                {
               this.renderDiseaseGradingSlider()
           }
            </div>
            <div className="col-md-12">
                <FunkyRadioTwoOptionsActivityScore caption={ACTIVITYSCORESTATICFIELDS.treatPatient.caption}
                                                captionClass={"col-md-12 page-header"}
                                                optionsClass={" col-md-9 col-md-offset-3"}
                                                optionOneId={"optTreatPatientYes"}
                                                optionTwoId={"optTreatPatientNo"}
                                                optionOneHtmlFor={"optTreatPatientYes"}
                                                optionTwoHtmlFor={"optTreatPatientNo"}

                                                optionOneChecked={this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[0].controlValueId}
                                                optionOneDefaultValue={ getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[0].controlValueId}
                                                optionOneOnClick={this.treatPatient_onChange}
                                                optionOneCaption={getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                optionTwoChecked={this.state.treatPatient == getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[1].controlValueId}
                                                optionTwoDefaultValue={getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[1].controlValueId}
                                                optionTwoOnClick={this.treatPatient_onChange}
                                                optionTwoCaption={getControlValues(ActivityScore.rbtListTreatPatient.controlId,this.state.visitControls)[1].controlValue}

                                                isComplete={this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                  />
                </div>

        </div>
        </FadeIn>

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

 export default ActivityScoreForm;

