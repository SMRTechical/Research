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

import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {paths} from '../../constants/paths/environment';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {salivaryGlandBiospy, pulmonaryFunctionTests, salivaryGlandUltrasound, imagingDepartment, irfCohort} from '../../config/controls/investigations-requested';
import {categories} from '../../config/categories';
import FunkyRadioTwoOptions from '../../components/generic/radio/funky-radio-two-options';
import FadeIn from '../../components/animation/fade-in';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
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
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS

} from '../../constants/paths/visit-category-names';

class InvestigationsRequestedForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            /*added start */
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',   
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',
             /*added end */

            salivaryGlandBiopsy: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandBiospy.optSalivaryGlandBiospy,this.props.visitResult.data.visits):'',
            pulmonaryFunctionTests: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, pulmonaryFunctionTests.optPulmonaryFunctionTests,this.props.visitResult.data.visits):'',
            salivaryGlandUltrasound: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandUltrasound.optSalivaryGlandUltrasound,this.props.visitResult.data.visits):'',
            imagingDepartment: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, imagingDepartment.optImagingDepartment,this.props.visitResult.data.visits):'',
            irfCohort: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, irfCohort.optIRFCohort,this.props.visitResult.data.visits):'',
                 
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

        //  this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
        //  this.getVisitOptionControlValue = this.getVisitOptionControlValue.bind(this);
        //  this.getDetailsControlValue = this.getDetailsControlValue.bind(this);
          this.renderInvestigationsRequested = this.renderInvestigationsRequested.bind(this);
          this.renderAuditData = this.renderAuditData.bind(this);   
          
          this.optSalivaryGlandBiopsy_onChange = this.optSalivaryGlandBiopsy_onChange.bind(this);
          this.optPulmonaryFunctionTests_onChange = this.optPulmonaryFunctionTests_onChange.bind(this);
          this.optSalivaryGlandUltrasound_onChange = this.optSalivaryGlandUltrasound_onChange.bind(this);
          this.optImagingDepartment_onChange = this.optImagingDepartment_onChange.bind(this);
          this.optIrfCohort_onChange = this.optIrfCohort_onChange.bind(this);


           /*Every visit should have start*/
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
    }


    optSalivaryGlandBiopsy_onChange(e){
         this.setState({
            salivaryGlandBiopsy: e.target.value,
             changed:true,
         })
     }

     optPulmonaryFunctionTests_onChange(e){
         this.setState({
            pulmonaryFunctionTests: e.target.value,
             changed:true,
         })
     }

     
     optSalivaryGlandUltrasound_onChange(e){
         this.setState({
            salivaryGlandUltrasound: e.target.value,
             changed:true,
         })
     }

     optImagingDepartment_onChange(e){
         this.setState({
            imagingDepartment: e.target.value,
             changed:true,
         })
     }

     optIrfCohort_onChange(e){
         this.setState({
            irfCohort: e.target.value,
             changed:true,
         })
     }

     validateVisit(){
        let errors = {};

        this.setState({errors});  
        return errors
     }

     getVisitValues(){
        var visit = [       
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.salivaryGlandBiopsy,
                controlId:this.state.salivaryGlandBiopsy == salivaryGlandBiospy.optSalivaryGlandBiospy[0].controlValueId ? 
                                salivaryGlandBiospy.optSalivaryGlandBiospy[0].controlId : 
                          this.state.salivaryGlandBiopsy == salivaryGlandBiospy.optSalivaryGlandBiospy[1].controlValueId ? 
                            salivaryGlandBiospy.optSalivaryGlandBiospy[1].controlId  :
                         0,
                categoryId:   categories.investigationsRequested.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.pulmonaryFunctionTests,
                controlId:this.state.pulmonaryFunctionTests  == pulmonaryFunctionTests.optPulmonaryFunctionTests[0].controlValueId ? 
                                pulmonaryFunctionTests.optPulmonaryFunctionTests[0].controlId : 
                          this.state.pulmonaryFunctionTests  == pulmonaryFunctionTests.optPulmonaryFunctionTests[1].controlValueId ? 
                                pulmonaryFunctionTests.optPulmonaryFunctionTests[1].controlId :
                          0,
                categoryId:   categories.investigationsRequested.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.salivaryGlandUltrasound,
                controlId:this.state.salivaryGlandUltrasound  == salivaryGlandUltrasound.optSalivaryGlandUltrasound[0].controlValueId ? 
                                salivaryGlandUltrasound.optSalivaryGlandUltrasound[0].controlId : 
                          this.state.salivaryGlandUltrasound  == salivaryGlandUltrasound.optSalivaryGlandUltrasound[1].controlValueId ? 
                                salivaryGlandUltrasound.optSalivaryGlandUltrasound[1].controlId :
                          0,
                categoryId:   categories.investigationsRequested.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.imagingDepartment,
                controlId:this.state.imagingDepartment  == imagingDepartment.optImagingDepartment[0].controlValueId ? 
                                imagingDepartment.optImagingDepartment[0].controlId : 
                          this.state.imagingDepartment  == imagingDepartment.optImagingDepartment[1].controlValueId ? 
                                imagingDepartment.optImagingDepartment[1].controlId :
                          0,
                categoryId:   categories.investigationsRequested.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.irfCohort,
                controlId:this.state.irfCohort  == irfCohort.optIRFCohort[0].controlValueId ? 
                                irfCohort.optIRFCohort[0].controlId : 
                          this.state.irfCohort  == irfCohort.optIRFCohort[1].controlValueId ? 
                                irfCohort.optIRFCohort[1].controlId :
                          0,
                categoryId:   categories.investigationsRequested.id             
            }
        ]
        return visit;
     }


       
getDetailValues(){    
        var detail = []

        return detail;
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
    this.props.handleSaveVisitHeader(visit, detail, categories.investigationsRequested.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.investigationsRequested.id);
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
        patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.visits):'',

        salivaryGlandBiopsy: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandBiospy.optSalivaryGlandBiospy,nextProps.visitResult.data.visits):'',
        pulmonaryFunctionTests: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, pulmonaryFunctionTests.optPulmonaryFunctionTests,nextProps.visitResult.data.visits):'',
        salivaryGlandUltrasound: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandUltrasound.optSalivaryGlandUltrasound,nextProps.visitResult.data.visits):'',
        imagingDepartment: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, imagingDepartment.optImagingDepartment,nextProps.visitResult.data.visits):'',
        irfCohort: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, irfCohort.optIRFCohort,nextProps.visitResult.data.visits):'',
        
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
                patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',
                salivaryGlandBiopsy: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandBiospy.optSalivaryGlandBiospy,this.props.visitResult.data.visits):'',
                pulmonaryFunctionTests: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, pulmonaryFunctionTests.optPulmonaryFunctionTests,this.props.visitResult.data.visits):'',
                salivaryGlandUltrasound: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, salivaryGlandUltrasound.optSalivaryGlandUltrasound,this.props.visitResult.data.visits):'',
                imagingDepartment: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, imagingDepartment.optImagingDepartment,this.props.visitResult.data.visits):'',
                irfCohort: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.investigationsRequested.id, irfCohort.optIRFCohort,this.props.visitResult.data.visits):'',
          
                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
            
              
              
                changed:false,
            });
       }

      

renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading investigations requested"}>
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
                                this.renderInvestigationsRequested()
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
                                    this.renderInvestigationsRequested()
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
                    <h3 className="panel-title pull-left">Investigations Requested</h3>
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
nextCategoryName = {VISIT_CATEGORY_ULTRASOUNDRESULTS}
prevCategoryName = {VISIT_CATEGORY_PASTMEDICALHISTORY}
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
                <h3 className="panel-title">Investigations Requested</h3>
                
            </div>
           
            <div className="panel-body scrollbar-v-visit-content">
    {
        
        this.renderInvestigationsRequested()
    }
    </div>
    
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
nextCategoryName = {VISIT_CATEGORY_ULTRASOUNDRESULTS}
prevCategoryName = {VISIT_CATEGORY_PASTMEDICALHISTORY}
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


    renderInvestigationsRequested(){
    
    return (
        <div className="panel-body scrollbar-v-visit-content">
        <div className="row">
                <div className="col-md-12"> 
                <div className="page-header"></div>  

               
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <FunkyRadioTwoOptions caption={"Salivary gland biopsy"}
                                                    optionName={"salivaryglandbiopsy"}
                                                    optionOneId={"optSalivaryGlandBiopsyYes"}
                                                    optionTwoId={"optSalivaryGlandBiopsyNo"}
                                                    optionOneHtmlFor={"optSalivaryGlandBiopsyYes"}
                                                    optionTwoHtmlFor={"optSalivaryGlandBiopsyNo"}
                                                        optionOneChecked={this.state.salivaryGlandBiopsy == salivaryGlandBiospy.optSalivaryGlandBiospy[0].controlValueId}
                                                        optionOneDefaultValue={salivaryGlandBiospy.optSalivaryGlandBiospy[0].controlValueId}
                                                        optionOneOnClick={this.optSalivaryGlandBiopsy_onChange}
                                                        optionOneCaption={salivaryGlandBiospy.optSalivaryGlandBiospy[0].controlValue}
                                                        optionTwoChecked={this.state.salivaryGlandBiopsy == salivaryGlandBiospy.optSalivaryGlandBiospy[1].controlValueId}
                                                        optionTwoDefaultValue={salivaryGlandBiospy.optSalivaryGlandBiospy[1].controlValueId}
                                                        optionTwoOnClick={this.optSalivaryGlandBiopsy_onChange}
                                                        optionTwoCaption={salivaryGlandBiospy.optSalivaryGlandBiospy[1].controlValue}
                                                        /> 
                        </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                        
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <FunkyRadioTwoOptions caption={"Pulmonary function tests"}
                                                    optionName={"pulmonaryfunctiontests"}
                                                    optionOneId={"optPulmonaryFunctionTestsYes"}
                                                    optionTwoId={"optPulmonaryFunctionTestsNo"}
                                                    optionOneHtmlFor={"optPulmonaryFunctionTestsYes"}
                                                    optionTwoHtmlFor={"optPulmonaryFunctionTestsNo"}
                                                        optionOneChecked={this.state.pulmonaryFunctionTests == pulmonaryFunctionTests.optPulmonaryFunctionTests[0].controlValueId}
                                                        optionOneDefaultValue={pulmonaryFunctionTests.optPulmonaryFunctionTests[0].controlValueId}
                                                        optionOneOnClick={this.optPulmonaryFunctionTests_onChange}
                                                        optionOneCaption={pulmonaryFunctionTests.optPulmonaryFunctionTests[0].controlValue}
                                                        optionTwoChecked={this.state.pulmonaryFunctionTests == pulmonaryFunctionTests.optPulmonaryFunctionTests[1].controlValueId}
                                                        optionTwoDefaultValue={pulmonaryFunctionTests.optPulmonaryFunctionTests[1].controlValueId}
                                                        optionTwoOnClick={this.optPulmonaryFunctionTests_onChange}
                                                        optionTwoCaption={pulmonaryFunctionTests.optPulmonaryFunctionTests[1].controlValue}/> 
                        </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>

                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                            <div className="form-group row">
                                                        <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-8 col-md-4 col-sm-12">Salivary Gland Ultrasound</label>
                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="salivaryGlandUltrasound"  id="optSalivaryGlandUltrasoundYes"
                                                                    checked={this.state.salivaryGlandUltrasound == salivaryGlandUltrasound.optSalivaryGlandUltrasound[0].controlValueId}
                                                                    defaultValue={salivaryGlandUltrasound.optSalivaryGlandUltrasound[0].controlValueId} 
                                                                    onChange={this.optSalivaryGlandUltrasound_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optSalivaryGlandUltrasoundYes">{salivaryGlandUltrasound.optSalivaryGlandUltrasound[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="salivaryGlandUltrasound" id="optSalivaryGlandUltrasoundNo" 
                                                                    checked={this.state.salivaryGlandUltrasound == salivaryGlandUltrasound.optSalivaryGlandUltrasound[1].controlValueId} 
                                                                    defaultValue={salivaryGlandUltrasound.optSalivaryGlandUltrasound[1].controlValueId} 
                                                                    onChange={this.optSalivaryGlandUltrasound_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optSalivaryGlandUltrasoundNo"}>{salivaryGlandUltrasound.optSalivaryGlandUltrasound[1].controlValue}</label>
                                                       </div>
                                                        </div>
                                                       <span className ="col-lg-offset-1 col-md-offset-1 col-lg-7 col-md-3 col-sm-12">Imaging Department</span>
                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="imagingDepartment"  id="optImagingDepartmentYes"
                                                                    checked={this.state.imagingDepartment == imagingDepartment.optImagingDepartment[0].controlValueId}
                                                                    defaultValue={imagingDepartment.optImagingDepartment[0].controlValueId} 
                                                                    onChange={this.optImagingDepartment_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optImagingDepartmentYes">{imagingDepartment.optImagingDepartment[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="imagingDepartment" id="optImagingDepartmentNo" 
                                                                    checked={this.state.imagingDepartment == imagingDepartment.optImagingDepartment[1].controlValueId} 
                                                                    defaultValue={imagingDepartment.optImagingDepartment[1].controlValueId} 
                                                                    onChange={this.optImagingDepartment_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optImagingDepartmentNo"}>{imagingDepartment.optImagingDepartment[1].controlValue}</label>
                                                            </div>
                                                        </div>


                                                        <span className ="col-lg-offset-1 col-md-offset-1 col-lg-7 col-md-3 col-sm-12">IRF cohort</span>
                                                        <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name="irfCohort"  id="optIRFCohortYes"
                                                                    checked={this.state.irfCohort == irfCohort.optIRFCohort[0].controlValueId}
                                                                    defaultValue={irfCohort.optIRFCohort[0].controlValueId} 
                                                                    onChange={this.optIrfCohort_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optIRFCohortYes">{irfCohort.optIRFCohort[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name="irfCohort" id="optIRFCohortNo" 
                                                                    checked={this.state.irfCohort == irfCohort.optIRFCohort[1].controlValueId} 
                                                                    defaultValue={irfCohort.optIRFCohort[1].controlValueId} 
                                                                    onChange={this.optIrfCohort_onChange}/>
                                                                    <label className="radio-inline" htmlFor="optIRFCohortNo">{irfCohort.optIRFCohort[1].controlValue}</label>
                                                            </div>
                                                        </div>


                                            </div>
                            </div>    
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                </div>
                </div>
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

 export default InvestigationsRequestedForm;

