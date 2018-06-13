import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import PanelDefault from '../../components/generic/panel-default';
import InputGroupAddOnLR from '../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../components/generic/input/input-group-add-on-r';
import InputGroupAddOnL from '../../components/generic/input/input-group-add-on-l';
import AuditData from '../../components/generic/audit-data';
import {getTotalWeighting} from '../../components/visit/modules/functions';
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../config/controls/american-european-cgc';
import {paths} from '../../constants/paths/environment';
import {ESSPRI} from '../../config/controls/esspri';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {categories} from '../../config/categories';
import FunkyRadioThreeOptionsVertical from '../../components/generic/radio/funky-radio-three-options-vertical';
import FunkyRadioThreeOptionsVerticalNoCaption from '../../components/generic/radio/funky-radio-three-options-vertical-no-caption';
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
import {ESSPRISTATICFIELDS} from '../../config/static/esspri';
import 
{
    VISIT_CATEGORY_AMERICANEUROPEANCGC,
    VISIT_CATEGORY_DIAGNOSIS,
    VISIT_CATEGORY_CURRENTMEDICATIONS,
    VISIT_CATEGORY_ESSPRI,
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



class ESSPRIForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            //patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
            
         
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
                     
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues &&
             this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
             getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          



drynessMarks : getControlValues(ESSPRI.ddlDryness.controlId,
    getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),


fatigueMarks: getControlValues(ESSPRI.ddlFatigue.controlId,
    getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),
    
painMarks: getControlValues(ESSPRI.ddlPain.controlId,
    getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),

         
dryness :  
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details):0:0,

fatigue :  
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlFatigue,this.props.visitResult.data.details):0:0,
            
pain :  
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlPain,this.props.visitResult.data.details):0:0,
                                                        
    
           changed:false,
            errors:{},
            /*Every visit should have start */
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
            /*Every visit should have end*/
          };        

         

            /*Every visit should have start*/
            this.renderForm = this.renderForm.bind(this);
            this.renderAuditData = this.renderAuditData.bind(this);         
            this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
            this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
            this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
            this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
            this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
            this.validateVisit = this.validateVisit.bind(this);
            this.getVisitValues = this.getVisitValues.bind(this);
            this.getDetailValues = this.getDetailValues.bind(this);
            this.renderFieldset = this.renderFieldset.bind(this);
            this.isFormValid = this.isFormValid.bind(this);
            /*Every visit should have end */


            this.toMarksObject = this.toMarksObject.bind(this);
            this.renderDrynessSlider = this.renderDrynessSlider.bind(this);
            this.renderFatigueSlider = this.renderFatigueSlider.bind(this);
            this.renderPainSlider = this.renderPainSlider.bind(this);
            this.drynessSlider_OnChange = this.drynessSlider_OnChange.bind(this);
            this.fatigueSlider_OnChange = this.fatigueSlider_OnChange.bind(this);
            this.painSlider_OnChange = this.painSlider_OnChange.bind(this);

    }



        drynessSlider_OnChange(value){
            this.setState({dryness: value, changed:true})
        }


        fatigueSlider_OnChange(value){
            this.setState({fatigue: value, changed:true})
        }


        
        painSlider_OnChange(value){
            this.setState({pain: value, changed:true})
        }


       

   
    validateVisit(){
        let errors = {};
      
            
      
       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []

        
        
                

        return visit;
    }

    
getDetailValues(){

    var detail = []
    
  
    
   // if (this.state.patientMeetsAECGCGCA){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeetsAECGCGCA,
                controlId:patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
    //}
    

   // if (this.state.patientMeets2016ACRECCriteria){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeets2016ACRECCriteria,
                controlId:patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
   // }
//console.log('dryness')
//console.log(this.state.dryness)
//console.log('fatigue')
//console.log(this.state.fatigue)
//console.log('pain')
//console.log(this.state.pain)

   if (this.state.dryness != undefined && parseInt(this.state.dryness) > -1){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.dryness,
            controlId:ESSPRI.ddlDryness.controlId, 
            categoryId: categories.eSSPRI.id   

        }
    )
   }

   if (this.state.fatigue != undefined && parseInt(this.state.fatigue) > -1 ){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.fatigue,
            controlId:ESSPRI.ddlFatigue.controlId, 
            categoryId: categories.eSSPRI.id   

        }
    )
   }


   if (this.state.pain != undefined && parseInt(this.state.pain) > -1 ){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.pain,
            controlId:ESSPRI.ddlPain.controlId, 
            categoryId: categories.eSSPRI.id   

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
    this.props.handleSaveVisitHeader(visit, detail,categories.eSSPRI.id);
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

        this.props.handleCompleteVisitHeader(visit, detail,categories.eSSPRI.id);
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
                patientMeetsAECGCGCA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,nextProps.visitResult.data.details):'',
               // patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.visits):'',
               
               patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
               
               
               createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
               // visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues && nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
               
               visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && 
                                nextProps.visitControlValuesResult.data.visitControlValues &&
                                nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                    getCategoryControls(categories.eSSPRI.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
  
                                    drynessMarks : getControlValues(ESSPRI.ddlDryness.controlId,
                                        getCategoryControls(categories.eSSPRI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                    
                                    fatigueMarks: getControlValues(ESSPRI.ddlFatigue.controlId,
                                        getCategoryControls(categories.eSSPRI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                        
                                    painMarks: getControlValues(ESSPRI.ddlPain.controlId,
                                        getCategoryControls(categories.eSSPRI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                    

                                    dryness :  
                                    nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ?
                                    getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,nextProps.visitResult.data.details) != undefined ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,nextProps.visitResult.data.details):0:0,
      
                                fatigue :  
                                nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ?
                                getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlFatigue,nextProps.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlFatigue,nextProps.visitResult.data.details):0:0,
                                            
                                pain :  
                                nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ?
                                getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlPain, nextProps.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlPain, nextProps.visitResult.data.details):0:0,


                changed:false,                
        })
      }

    componentDidMount () {
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',            
              //  patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',
               
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
                
               
                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
               // visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
               
               visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues &&
               this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
               getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
  
               drynessMarks : getControlValues(ESSPRI.ddlDryness.controlId,
                getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),
            
                fatigueMarks: getControlValues(ESSPRI.ddlFatigue.controlId,
                    getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                
                painMarks: getControlValues(ESSPRI.ddlPain.controlId,
                    getCategoryControls(categories.eSSPRI.id, this.props.visitControlValuesResult.data.visitControlValues)),
            
               dryness :  
               this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
               getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details):0 :0,
               
                fatigue :  
                this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
                getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlDryness,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlFatigue,this.props.visitResult.data.details):0 :0,
                            
                pain :  
                this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ?
                getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlPain,this.props.visitResult.data.details) ? getDetailsControlValue_V2(categories.eSSPRI.id, ESSPRI.ddlPain,this.props.visitResult.data.details):0:0,                      

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
            <h3 className="panel-title pull-left">ESSPRI</h3>
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
nextCategoryName = {VISIT_CATEGORY_ESSDAI}
prevCategoryName = {VISIT_CATEGORY_CURRENTMEDICATIONS}
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
                <h3 className="panel-title">ESSPRI</h3>
                
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
nextCategoryName = {VISIT_CATEGORY_ACTIVITYSCORE}
prevCategoryName = {VISIT_CATEGORY_CURRENTMEDICATIONS}
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


renderDrynessSlider()
{
    if (this.state.drynessMarks){

        const marks = this.toMarksObject(this.state.drynessMarks, ESSPRISTATICFIELDS.dryness.none);
        const min = parseInt(this.state.drynessMarks[0].controlValue);
        const max = parseInt(this.state.drynessMarks[this.state.drynessMarks.length-1].controlValue)
        const  isComplete= this.props.visitHeaderResult &&  this.props.visitHeaderResult.data &&  
                this.props.visitHeaderResult.data.completed ? 
                this.props.visitHeaderResult.data.completed :
                false

              
return (        
<RCSLIDER 
    caption={ESSPRISTATICFIELDS.dryness.caption} 
    beforeText={ESSPRISTATICFIELDS.dryness.beforeText}
    afterText={ESSPRISTATICFIELDS.dryness.afterText}
    min={min}
    max={max}
    marks={marks}
    step={1}
    defaultValue={this.state.dryness == undefined ? min : parseInt(this.state.dryness)} 
    value= {this.state.dryness == undefined ? min : parseInt(this.state.dryness)} 
    onChange={this.drynessSlider_OnChange}
    isComplete={isComplete}
/>

)
    }
    else {
return (<div>..Loading dryness data</div>)
    }
}


renderFatigueSlider()
{
    if (this.state.fatigueMarks){

        const marks = this.toMarksObject(this.state.fatigueMarks, ESSPRISTATICFIELDS.fatigue.none);
        const min = parseInt(this.state.fatigueMarks[0].controlValue);
        const max = parseInt(this.state.fatigueMarks[this.state.fatigueMarks.length-1].controlValue)
        const  isComplete= this.props.visitHeaderResult &&  this.props.visitHeaderResult.data &&  
                this.props.visitHeaderResult.data.completed ? 
                this.props.visitHeaderResult.data.completed :
                false

              

return (
        

<RCSLIDER 
    caption={ESSPRISTATICFIELDS.fatigue.caption} 
    beforeText={ESSPRISTATICFIELDS.fatigue.beforeText}
    afterText={ESSPRISTATICFIELDS.fatigue.afterText}
    min={min}
    max={max}
    marks={marks}
    step={1}
    defaultValue={this.state.fatigue == undefined ? min :  parseInt(this.state.fatigue)} 
  
    onChange={this.fatigueSlider_OnChange}
    isComplete={isComplete}
/>

)
    }
    else {
return (<div>..Loading fatigue data</div>)
    }
}



renderPainSlider()
{
    if (this.state.painMarks){

        const marks = this.toMarksObject(this.state.painMarks, ESSPRISTATICFIELDS.pain.none);
        const min = parseInt(this.state.painMarks[0].controlValue);
        const max = parseInt(this.state.painMarks[this.state.painMarks.length-1].controlValue)
        const  isComplete= this.props.visitHeaderResult &&  this.props.visitHeaderResult.data &&  
                this.props.visitHeaderResult.data.completed ? 
                this.props.visitHeaderResult.data.completed :
                false
return (
        
    
<RCSLIDER 
    caption={ESSPRISTATICFIELDS.pain.caption} 
    beforeText={ESSPRISTATICFIELDS.pain.beforeText}
    afterText={ESSPRISTATICFIELDS.pain.afterText}
    min={min}
    max={max}
    marks={marks}
    step={1}
    defaultValue={this.state.pain == undefined ? min :  parseInt(this.state.pain)} 
   
    onChange={this.painSlider_OnChange}
    isComplete={isComplete}
/>


)
    }
    else {
return (<div>..Loading pain data</div>)
    }
}

renderForm(){

    return (
        <div>
             <FadeIn>
           {
               this.renderDrynessSlider()
           }
           {
               this.renderFatigueSlider()
           }           
           {
               this.renderPainSlider()
           }
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

 export default ESSPRIForm;

