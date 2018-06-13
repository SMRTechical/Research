import React,{Component} from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import AlertSuccess from '../../components/generic/alert-success';
import AlertDanger from '../../components/generic/alert-danger';
import NoMatch from '../../components/generic/NoMatch';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions';
import {getDetailsControlValue} from '../../factory/visit'
import AmericanEuropeanCGCForm from  '../../components/visit/american-european-cgc-form';
import DiagnosisForm from  '../../components/visit/diagnosis-form';
import CurrentMedicationsForm from  '../../components/visit/current-medications-form';
import ESSDAIForm from  '../../components/visit/essdai-form';
import ESSPRIForm from  '../../components/visit/esspri-form';


import ActivityScoreForm from  '../../components/visit/activity-score-form';
import DamageIndicesForm from  '../../components/visit/damage-indices-form';
import PastMedicalHistoryForm from  '../../components/visit/past-medical-history-form';
import UltrasoundResultsForm from  '../../components/visit/ultrasound-results-form';
import SalivaryFlowForm from  '../../components/visit/salivary-flow-form';
import RoutineBloodsForm from  '../../components/visit/routine-bloods-form';
import OtherResearchBiomaterialsForm from  '../../components/visit/other-research-biomaterials-form';

import ClinicalOralDrynessScoreForm from  '../../components/visit/clinical-oral-dryness-score-form';
import OcularSurfaceStainingScoreForm from  '../../components/visit/ocular-surface-staining-score-form';
import FatFreeMassForm from  '../../components/visit/fat-free-mass-form';

import InvestigationsRequestedForm from  '../../components/visit/investigations-requested-form'
import ResearchBloodsForm from  '../../components/visit/research-bloods-form'
import AttendanceCard from  '../../components/visit/attendance-card'
import {getVisitHeader, visitHeaderClear, saveVisitHeader,getSavedVisitHeader} from '../../actions/visit-header';
import {getVisitHeaders} from '../../actions/visit-headers';
import {visitCategoriesClear,getVisitCategories } from '../../actions/visit-categories';
import {saveVisit, getVisit, getSavedVisit,visitClear} from '../../actions/visit';
import {saveVisitKeyValues, getVisitKeyValues, getSavedVisitKeyValues,visitKeyValuesClear} from '../../actions/visit-key-values';
import { getVisitControlValues, visitControlValuesClear} from '../../actions/visit-control-values';
import {getPatientState,patientStateClear} from '../../actions/patient-state';
import {ALERTS} from '../../constants/information/messages';
import classnames from 'classnames'
import {paths} from '../../constants/paths/environment';
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
    VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS,
    VISIT_CATEGORY_CLINICALORALDRYNESSSCORE,
    VISIT_CATEGORY_OCULARSURFACESTAININGSCORE,
    VISIT_CATEGORY_FATFREEMASS    
} from '../../constants/paths/visit-category-names';
import {CATEGORY_BASE} from '../../constants/paths/first-category';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {categories} from '../../config/categories';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria,patientMeets2016ACRECCriteria, alternateDiagnosis} from '../../config/controls/diagnosis';
import FadeIn from '../../components/animation/fade-in';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class VisitBase extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA:null,//this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
            patientMeets2016ACRECCriteria:null,
            visitHeaderId:null,
            completed:null,
            newVisit:null,
            dateOfVisit:null,
            token:null,
            initialVisit:null,
            cdeaId:null,
            visitId:null,
            AECGCGlobalError:'',
            visitHeaderPostParams:null,
            initialLoad:true,
            newVisitSaved:false,
            visitCompletedSaved:false
        };
        this.renderEmpty = this.renderEmpty.bind(this);
        this.renderAttendanceCard = this.renderAttendanceCard.bind(this);
        this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
        this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
        this.getVisit = this.getVisit.bind(this);
        this.handleSaveVisitKeyValues = this.handleSaveVisitKeyValues.bind(this);
        this.handleGetVisitKeyValues = this.handleGetVisitKeyValues.bind(this);
        this.handleClearVisitKeyValues = this.handleClearVisitKeyValues.bind(this);
       // this.getVisitWithCategories = this.getVisitWithCategories.bind(this);
       // this.getVisitWithCategoriesPatientState = this.getVisitWithCategoriesPatientState.bind(this);
        this.handleGetAECGCGlobalError = this.handleGetAECGCGlobalError.bind(this);
        this.handleAddVisit = this.handleAddVisit.bind(this);
        this.handleUpdateVisit = this.handleUpdateVisit.bind(this);
        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);

        this.renderMeetsAECGCGCACriteria = this.renderMeetsAECGCGCACriteria.bind(this);
        this.renderDoesNotMeetsAECGCGCACriteria = this.renderDoesNotMeetsAECGCGCACriteria.bind(this);        
        this.renderYetToMeetAECGCGCACriteria = this.renderYetToMeetAECGCGCACriteria.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
       // this.getAECGCGCACriteria = this.getAECGCGCACriteria.bind(this);
       this.renderMeets2016ACRECCriteria = this.renderMeets2016ACRECCriteria.bind(this);
       this.renderDoesNotMeets2016ACRECCriteria = this.renderDoesNotMeets2016ACRECCriteria.bind(this);
       //this.checkIsDirty = this.checkIsDirty.bind(this);

       this.switchPath = this.switchPath.bind(this);
       this.renderAECGC = this.renderAECGC.bind(this);
        this.renderDiagnosis = this.renderDiagnosis.bind(this);
        this.renderCurrentMedications = this.renderCurrentMedications.bind(this);
       // this.renderInvestigationsRequested = this.renderInvestigationsRequested.bind(this);
        this.renderResearchBloods = this.renderResearchBloods.bind(this);
        this.renderESSPRI = this.renderESSPRI.bind(this);
        this.renderESSDAI = this.renderESSDAI.bind(this);
        this.renderActivityScore = this.renderActivityScore.bind(this);
        this.renderDamageIndices = this.renderDamageIndices.bind(this);
        this.renderPastMedicalHistory = this.renderPastMedicalHistory.bind(this);
        this.renderInvestigationsRequested = this.renderInvestigationsRequested.bind(this);
        this.renderUltrasoundResults = this.renderUltrasoundResults.bind(this);
        this.renderSalivaryFlow = this.renderSalivaryFlow.bind(this);
        this.renderRoutineBloods = this.renderRoutineBloods.bind(this);
      //  this.renderResearchBloods = this.renderResearchBloods.bind(this);
        this.renderOtherResearchBiomaterials = this.renderOtherResearchBiomaterials.bind(this);
        this.renderClinicalOralDrynessScore = this.renderClinicalOralDrynessScore.bind(this);
        this.renderOcularSurfaceStainingScore = this.renderOcularSurfaceStainingScore.bind(this);
        


        this.getCurrentCategoryForRedirect = this.getCurrentCategoryForRedirect.bind(this);
        this.getCurrentCategoryName = this.getCurrentCategoryName.bind(this);
    }

//     checkIsDirty(){
//     this.setState({
//         isDirty:true
//     })
// }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props!== nextProps) {
    //       return true;
    //     }
    //     // if (this.state.count !== nextState.count) {
    //     //   return true;
    //     // }
    //     return false;
    //   }
       
//   shouldComponentUpdate(nextProps, nextState) {
// console.log('nextState')
//     console.log(nextState)

//         // You can access `this.props` and `this.state` here
//         // This function should return a boolean, whether the component should re-render.
//         return !this.state.isDirty;
//       }



switchPath(){
    var path = location.pathname;
    var idx = path.lastIndexOf('/') ;

    if (idx > 0) {
   var pageName = path.substring(idx + 1);
    console.log('pageName')
    console.log(pageName);
   switch (pageName) {
    case VISIT_CATEGORY_AMERICANEUROPEANCGC :
        return this.renderAECGC();
    case VISIT_CATEGORY_DIAGNOSIS:
        return this.renderDiagnosis()
    case VISIT_CATEGORY_CURRENTMEDICATIONS:
        return this.renderCurrentMedications();
    case VISIT_CATEGORY_ESSPRI:
           return this.renderESSPRI()
    case VISIT_CATEGORY_ESSDAI:
       return this.renderESSDAI()
    case VISIT_CATEGORY_ACTIVITYSCORE:
        return this.renderActivityScore();
    case VISIT_CATEGORY_DAMAGEINDICES:
       return this.renderDamageIndices();
    case VISIT_CATEGORY_PASTMEDICALHISTORY:
        return this.renderPastMedicalHistory();
    case VISIT_CATEGORY_INVESTIGATIONSREQUESTED:
        return this.renderInvestigationsRequested()
    case VISIT_CATEGORY_ULTRASOUNDRESULTS:
        return this.renderUltrasoundResults();
    case VISIT_CATEGORY_SALIVARYFLOW:
       return this.renderSalivaryFlow()
    case VISIT_CATEGORY_ROUTINEBLOODS:
       return this.renderRoutineBloods();
    case VISIT_CATEGORY_RESEARCHBLOODS:
        return this.renderResearchBloods()
    case VISIT_CATEGORY_OTHERRESEARCHBIOMATERIALS:
        return this.renderOtherResearchBiomaterials();
    case VISIT_CATEGORY_CLINICALORALDRYNESSSCORE:
        return this.renderClinicalOralDrynessScore();
    case VISIT_CATEGORY_OCULARSURFACESTAININGSCORE :
        return this.renderOcularSurfaceStainingScore();
    case VISIT_CATEGORY_FATFREEMASS :
        return this.renderFatFreeMass();
}

    }
    return  <NoMatch location={location}/>

}

renderAECGC(){
    return (
        <AmericanEuropeanCGCForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} />
    )
}


renderDiagnosis(){
    return (
        <DiagnosisForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} />
    )
}


renderCurrentMedications(){

return (
<CurrentMedicationsForm 
    visitHeaderId={this.state.visitHeaderId} 
    visitHeaderResult={this.props.visitHeaderResult} 
    visitResult={this.props.visitResult} 
    dateOfAttendance={this.state.dateOfVisit} 
    handleSaveVisitHeader={this.handleSaveVisitHeader} 
    handleCompleteVisitHeader={this.handleCompleteVisitHeader}
    token={this.state.token} 
    handleSaveVisitKeyValues={this.handleSaveVisitKeyValues}
    handleGetVisitKeyValues={this.handleGetVisitKeyValues}
    visitKeyValuesResult={this.props.visitKeyValuesResult}
    handleClearVisitKeyValues={this.handleClearVisitKeyValues}
    />
)
}




renderESSPRI(){
    
    return (
    <ESSPRIForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} 
        visitControlValuesResult={this.props.visitControlValuesResult}/>
    )
    }


renderESSDAI(){
    
    return (
    <ESSDAIForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} 
        visitControlValuesResult={this.props.visitControlValuesResult}/>
    )
    }



    renderActivityScore(){
        return (
        <ActivityScoreForm 
            visitHeaderId={this.state.visitHeaderId} 
            visitHeaderResult={this.props.visitHeaderResult} 
            visitResult={this.props.visitResult} 
            dateOfAttendance={this.state.dateOfVisit} 
            handleSaveVisitHeader={this.handleSaveVisitHeader} 
            handleCompleteVisitHeader={this.handleCompleteVisitHeader}
            token={this.state.token} 
            visitControlValuesResult={this.props.visitControlValuesResult}/>
        )
        }


        renderDamageIndices() {
        return (
            <DamageIndicesForm 
            visitHeaderId={this.state.visitHeaderId} 
            visitHeaderResult={this.props.visitHeaderResult} 
            visitResult={this.props.visitResult} 
            dateOfAttendance={this.state.dateOfVisit} 
            handleSaveVisitHeader={this.handleSaveVisitHeader} 
            handleCompleteVisitHeader={this.handleCompleteVisitHeader}
            token={this.state.token} 
            visitControlValuesResult={this.props.visitControlValuesResult}/>
        )
        }


        renderPastMedicalHistory(){
            return (
                <PastMedicalHistoryForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} 
                visitControlValuesResult={this.props.visitControlValuesResult}/>
                
            )
        }

        renderInvestigationsRequested(){
            return (
                <InvestigationsRequestedForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} />
            )
        }

        renderUltrasoundResults(){
            return (
                <UltrasoundResultsForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} />
            )
        }


        renderSalivaryFlow(){
            return (
                <SalivaryFlowForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} 
                visitControlValuesResult={this.props.visitControlValuesResult}/>
            )
        }


        renderClinicalOralDrynessScore(){
            return (
                <ClinicalOralDrynessScoreForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} 
                visitControlValuesResult={this.props.visitControlValuesResult}/>
            )
        }


        renderOcularSurfaceStainingScore(){
            return (
                <OcularSurfaceStainingScoreForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} 
                visitControlValuesResult={this.props.visitControlValuesResult}/>
            )
        }


        renderFatFreeMass(){
            return (
                <FatFreeMassForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} 
                visitControlValuesResult={this.props.visitControlValuesResult}/>
            )
        }


        renderRoutineBloods(){
            return (
                <RoutineBloodsForm 
                visitHeaderId={this.state.visitHeaderId} 
                visitHeaderResult={this.props.visitHeaderResult} 
                visitResult={this.props.visitResult} 
                dateOfAttendance={this.state.dateOfVisit} 
                handleSaveVisitHeader={this.handleSaveVisitHeader} 
                handleCompleteVisitHeader={this.handleCompleteVisitHeader}
                token={this.state.token} />
            )
        }

// renderInvestigationsRequested(){
//     return (
//             <InvestigationsRequestedForm 
//             visitHeaderId={this.state.visitHeaderId} 
//             visitHeaderResult={this.props.visitHeaderResult} 
//             visitResult={this.props.visitResult} 
//             dateOfAttendance={this.state.dateOfVisit} 
//             handleSaveVisitHeader={this.handleSaveVisitHeader} 
//         handleCompleteVisitHeader={this.handleCompleteVisitHeader}
//             token={this.state.token} />
//     )
// }


renderResearchBloods(){
    return (
        <ResearchBloodsForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} />
        
        
    )
}


renderOtherResearchBiomaterials(){
    return (
        <OtherResearchBiomaterialsForm 
        visitHeaderId={this.state.visitHeaderId} 
        visitHeaderResult={this.props.visitHeaderResult} 
        visitResult={this.props.visitResult} 
        dateOfAttendance={this.state.dateOfVisit} 
        handleSaveVisitHeader={this.handleSaveVisitHeader} 
        handleCompleteVisitHeader={this.handleCompleteVisitHeader}
        token={this.state.token} />
        
        
    )
}

    componentDidUpdate(prevProps, prevState) {
        
     
         //to prevent this component from doing a redirect 2nd time keep this in.
         if (this.state.newVisitSaved) {
           //  console.log('new visit saved componentDidUpdate')
        //      this.props.visitClear();       
        //   this.props.visitHeaderClear();
        //   this.props.visitCategoriesClear();
          this.setState({
              newVisitSaved:false
          })
       }
       else if (this.state.visitCompletedSaved &&
        this.props.visitHeaderResult && 
        this.props.visitHeaderResult.data 
        && this.props.visitHeaderResult.data.completed) {
    
  this.setState({
    visitCompletedSaved:false
  })
    }
}
  
    componentDidMount () {
        
//console.log('visit-base-- componentDidMount')
        
     //    if ((this.props.location.state && this.props.location.state.initialLoad) || !this.props.patientStateResult.data.hasVisits) {
    //if ((this.props.location.state && this.props.location.state.initialLoad)) {
//console.log('aecgc did mount doin')
        if (this.props.location.state && this.props.location.state.visitHeaderResult){
        
          // console.log('aecgc componentDidMount location')
       // console.log('token: ' + this.props.location.state.visitHeaderResult)

                this.setState({

                    visitHeaderId: this.props.location.state.visitHeaderResult.visitHeaderId,
                    completed: this.props.location.state.visitHeaderResult.completed,
                    newVisit: this.props.location.state.visitHeaderResult.newVisit,
                    initialVisit: this.props.location.state.visitHeaderResult.initialVisit,
                    dateOfVisit: this.props.location.state.visitHeaderResult.dateOfVisit,
                    token:this.props.location.state.visitHeaderResult.token,
                    patientMeetsAECGCGCA: this.props.location.state.visitResult && 
                                         this.props.location.state.visitResult.details && 
                                        this.props.location.state.visitResult.details.length > 0 ? 
                                        getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                        this.props.location.state.visitResult.details):null,

                    patientMeets2016ACRECCriteria: this.props.location.state.visitResult && 
                                          this.props.location.state.visitResult.details && 
                                          this.props.location.state.visitResult.details.length > 0 ? 
                                          getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                          this.props.location.state.visitResult.details):null
                });

     
            }
            else {
        
                    if (!this.props.visitHeaderResult || 
                        (this.props.visitHeaderResult && !this.props.visitHeaderResult.data) || 
                        !this.props.visitResult || 
                        (this.props.visitResult && !this.props.visitResult.data) //||
                        // !this.props.visitCategoriesResult || 
                        // (this.props.visitCategoriesResult && !this.props.visitCategoriesResult.data) ||
                        // !this.props.patientStateResult || 
                        // (this.props.patientStateResult && !this.props.patientStateResult.data)
                    ) {
                           // console.log('getting visit 1')
                    // console.log('aecgc -- componentDidMount NO LOCATION RELOAD DATA --HAPPENS ON INITIAL LOAD OF ALL PAGE');
                          
                    
                    
                    var visitHeaderParams = {
                                token: this.props.match.params.token,
                                dateOfVisit:null
                               
                            }

                         

                          //  console.log('AAA START')
                         //   console.log(visitHeaderParams)
                          //  console.log('AAA END')

                            this.props.getVisitHeader(visitHeaderParams)
                            .then( vh=>this.getVisit(vh))
                            .catch(this.handleGetVisitHeaderGlobalError)
                        }
                            else {
                               // console.log('getting visit 2')
                               // console.log('aecgc -- componentDidMount NO LOCATION SUBSEQUENT CLICKS OF MENU CAUSE THIS TO FIRE')
                               this.setState({
                                visitHeaderId: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.visitHeaderId:null,
                                completed: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.completed:null,
                                newVisit: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.newVisit:null,
                                initialVisit: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.initialVisit:null,
                                dateOfVisit: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.dateOfVisit:null,
                                token:this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.token:null,
                                patientMeetsAECGCGCA: this.props.visitResult && 
                                                        this.props.visitResult.data && 
                                                        this.props.visitResult.data.details && 
                                                        this.props.visitResult.data.details.length > 0 ? 
                                                            getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                                                                    this.props.visitResult.data.details):null,
                                patientMeets2016ACRECCriteria: this.props.visitResult && 
                                                                this.props.visitResult.data && 
                                                                this.props.visitResult.data.details && 
                                                                this.props.visitResult.data.details.length > 0 ? 
                                                            getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                                                this.props.visitResult.data.details):null
                            
                                
                                                          


                            
                            
                            
                                                        });
                            
                            }

            }
        
        //  }
           
        
               }

    componentWillReceiveProps(nextProps){
   // console.log('visistbase - componentWillReceiveProps CONTAINET')
       
if  (this.props.match.params != nextProps.match.params) {
   
    if (nextProps.location.state && nextProps.location.state.visitHeaderResult){
        

       // console.log('visistbase - componentWillReceiveProps bbb')
        //console.log(nextProps)
        
        this.setState({
                        visitHeaderId: nextProps.location.state.visitHeaderResult.visitHeaderId,
                        completed: nextProps.location.state.visitHeaderResult.completed,
                        newVisit: nextProps.location.state.visitHeaderResult.newVisit,
                        initialVisit: nextProps.location.state.visitHeaderResult.initialVisit,
                        dateOfVisit: nextProps.location.state.visitHeaderResult.dateOfVisit,
                        token:nextProps.location.state.visitHeaderResult.token,
                        patientMeetsAECGCGCA: nextProps.visitResult && 
                                                nextProps.visitResult.data && 
                                                nextProps.visitResult.data.details && 
                                                nextProps.visitResult.data.details.length > 0 ? 
                                                getDetailsControlValue(categories.diagnosis.id, 
                                                                        patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                                                        nextProps.visitResult.data.details):null,
                        
                        patientMeets2016ACRECCriteria: nextProps.visitResult && 
                                                      nextProps.visitResult.data && 
                                                      nextProps.visitResult.data.details && 
                                                     nextProps.visitResult.data.details.length > 0 ? 
                                                    getDetailsControlValue(categories.diagnosis.id, 
                                                                patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                                                    nextProps.visitResult.data.details):null                                    


                      
                    });
}
     else {
       
          //  console.log('AECG - componentWillReceiveProp  NOT LOCATION')
         // console.log(nextProps.match.params.token)
        //console.log(this.state.token)      
      
      // console.log('visistbase - componentWillReceiveProps cc')
        
        if (nextProps.match.params.token != this.state.token){
        // console.log('Diff VISIT')
            var visitHeaderParams = {
                                token: nextProps.match.params.token,
                                dateOfVisit:null
                            }
                      //  console.log('AAA1')
                            nextProps.getVisitHeader(visitHeaderParams)
                            .then( vh=>this.getVisit(vh))
                            .catch(this.handleGetVisitHeaderGlobalError)

                           // console.log('AFTER API -- 1componentWillReceiveProps GETS CALLED BELOW')

                        }
                        
else {
//console.log('SAME VISIT')

//console.log('visistbase - componentWillReceiveProps ddd')
            this.setState({
                            visitHeaderId: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.visitHeaderId:null,
                            completed: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.completed: null,
                            newVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.newVisit:null,
                            initialVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.initialVisit:null,
                            dateOfVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.dateOfVisit:null,
                            token: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.token:null,
                            patientMeetsAECGCGCA: nextProps.visitResult && 
                                                    nextProps.visitResult.data && 
                                                    nextProps.visitResult.data.details && 
                                                    nextProps.visitResult.data.details.length > 0 ? 
                                                    getDetailsControlValue(categories.diagnosis.id, 
                                                                            patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                                                            nextProps.visitResult.data.details):null,
                                                                            
                           patientMeets2016ACRECCriteria: nextProps.visitResult && 
                                                          nextProps.visitResult.data && 
                                                          nextProps.visitResult.data.details && 
                                                         nextProps.visitResult.data.details.length > 0 ? 
                                                         getDetailsControlValue(categories.diagnosis.id, 
                                                                               patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                                                                nextProps.visitResult.data.details):null                       
                        
                        });
                    }
     
                    }
    }
    else {

       // console.log('visistbase - componentWillReceiveProps eee')
      // console.log('1componentWillReceiveProps -- clicked on a Diff visit IN ATTENDANCE HISTORY. buut this called after API call above IN DIFF VISIT ');
       
       //console.log('nextProps')        
       //console.log(nextProps)        
       if (nextProps.location && nextProps.location.state && nextProps.location.state.visitHeaderResult) {
//adding new visit
//console.log('NEW VISIT ')

if (nextProps.visitHeaderResult && nextProps.visitHeaderResult.data) {

   // console.log('NEW VISIT AFTER SAVE');
     //console.log(nextProps.visitHeaderResult);
  //   console.log('visistbase - componentWillReceiveProps ddd')

this.setState({
        // visitHeaderId:nextProps.visitHeaderResult.data.visitHeaderId,
        // completed:nextProps.visitHeaderResult.data.completed,
        // newVisit: nextProps.visitHeaderResult.data.newVisit,
        // initialVisit: nextProps.visitHeaderResult.data.initialVisit,
        // dateOfVisit: nextProps.visitHeaderResult.data.dateOfVisit,
        // token:nextProps.visitHeaderResult.data.token


        visitHeaderId: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.visitHeaderId:null,
        completed: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.completed: null,
        newVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.newVisit:null,
        initialVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.initialVisit:null,
        dateOfVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.dateOfVisit:null,
        token: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.token:null,
        patientMeetsAECGCGCA: nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.details && 
                                nextProps.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.diagnosis.id, 
                                                        patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                                        nextProps.visitResult.data.details):null,
                                                        
        patientMeets2016ACRECCriteria: nextProps.visitResult && 
                                       nextProps.visitResult.data && 
                                      nextProps.visitResult.data.details && 
                                       nextProps.visitResult.data.details.length > 0 ? 
                                       getDetailsControlValue(categories.diagnosis.id, 
                                                             patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                                             nextProps.visitResult.data.details):null   

    });

    //console.log('NEW VISIT AFTER SAVE END');

// this.setState({
//     token:nextProps.visitHeaderResult.data.token,
//     dateOfVisit:nextProps.visitHeaderResult.data.dateOfVisit,
//     newVisitSaved:true
// })
    

//console.log('visistbase - componentWillReceiveProps fff')

    var visitHeaderParams = {
                        token: nextProps.visitHeaderResult.data.token,
                        dateOfVisit:nextProps.visitHeaderResult.data.dateOfVisit
                    }
///

// var visitCategoriesGetParams = {
//             visitHeaderId:  nextProps.visitHeaderResult.data.visitHeaderId,
//             token:   nextProps.visitHeaderResult.data.token,
//             newVisit:false
//     }
    
    
        //this.props.getVisit(visitGetParams)
        //nextProps.getVisitCategories(visitCategoriesGetParams)


////

                   // console.log('visitHeaderParams')
                  //  console.log(visitHeaderParams)

    // console.log('AAA1')
    // nextProps.getVisitHeader(visitHeaderParams)
    // .then( vh=>this.getVisit(vh))
    // .catch(this.handleGetVisitHeaderGlobalError)


                  //  nextProps.getVisitHeader(visitHeaderParams)
                   // .then( vh=>this.getVisit(vh))
                    //.catch(this.handleGetVisitHeaderGlobalError)
                    
    //                 // <Redirect to={{
    //                 //     pathname: paths.visitLink + nextProps.visitHeaderResult.data.token + CATEGORY_BASE
    //                 // }}/>



/*
 var visitHeaderParams = {
                                token: this.props.match.params.token,
                                dateOfVisit:null
                            }

                            this.props.getVisitHeader(visitHeaderParams)
                            .then( vh=>this.getVisit(vh))
                            .catch(this.handleGetVisitHeaderGlobalError)
*/

}

       }
       else {
//            //clicked on different visit date
//console.log('visistbase - componentWillReceiveProps fff')
       this.setState({
                    initialLoad: false,
                    visitHeaderId: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.visitHeaderId:null,
                    completed: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.completed: null,
                    newVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.newVisit:null,
                    initialVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.initialVisit:null,
                    dateOfVisit:  nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.dateOfVisit:null,
                    token: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.token:null,
                    patientMeetsAECGCGCA: nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.details && 
                                            nextProps.visitResult.data.details.length > 0 ? 
                                            getDetailsControlValue(categories.diagnosis.id, 
                                                                    patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria, 
                                                                    nextProps.visitResult.data.details):null,
                                                                    
                    patientMeets2016ACRECCriteria: nextProps.visitResult && 
                                                   nextProps.visitResult.data && 
                                                  nextProps.visitResult.data.details && 
                                                   nextProps.visitResult.data.details.length > 0 ? 
                                                   getDetailsControlValue(categories.diagnosis.id, 
                                                                         patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria, 
                                                                         nextProps.visitResult.data.details):null                       
                            })
                        }
                        }


          
       
     
        }

    handleGetAECGCGlobalError(error){        
        this.setState({
            AECGCGlobalError:error.message,
        })


        this.errorMessage()

      }
    
    handleSaveVisitHeader(visit,detail,categoryId){

                var visitHeaderPostParams = {
                    token: this.state.token,
                    dateOfVisit: this.state.dateOfVisit
                }
                if (Object.keys(visit).length > 0 ||  (Object.keys(detail).length > 0)) {

                    if (this.state.newVisit) {
                                    this.props.saveVisitHeader(visitHeaderPostParams)
                                    .then(vh=> this.props.getSavedVisitHeader(visitHeaderPostParams))
                                    .then(ph=> this.handleAddVisit(ph,visit,detail,categoryId))
                                    .catch(this.handleGetAECGCGlobalError)
                    }
                    else {
                        this.handleUpdateVisit(this.props.visitHeaderResult.data,visit,detail,categoryId)
                    }
            }
            }



        
    handleSaveVisitKeyValues(visitKeyValues,categoryId,sectionId){
// console.log('-- handleSaveVisitKeyValues --')
//         console.log('visitKeyValues')
//         console.log(visitKeyValues)

                        for (var vkv of visitKeyValues) {
                            vkv.visitHeaderId = this.props.visitHeaderResult.data.visitHeaderId
                            vkv.categoryId = categoryId,
                            vkv.sectionId = sectionId
                        }

                        var visitKeyValuePostParams = {
                            visitHeaderId: this.props.visitHeaderResult.data.visitHeaderId,
                            token: this.state.token,
                            categoryId:categoryId,
                            sectionId: sectionId,
                            visitKeyValues: visitKeyValues
                        }
        
                        var visitKeyValueGetParams = {
                            visitHeaderId:  this.props.visitHeaderResult.data.visitHeaderId,
                            categoryId:categoryId,
                            sectionId: sectionId,
                            token: this.state.token
                        }
                        
                            this.props.saveVisitKeyValues(visitKeyValuePostParams)
                            .then(v=> this.props.getSavedVisitKeyValues(visitKeyValueGetParams))
                            //.then(s=> this.saveMessage())
                            .catch(this.handleGetAECGCGlobalError)


                    }
        




handleAddVisit(visitHeader, visit,detail, categoryId){
//console.log('ADD VISIT START')
   // console.log('AECGC handleSaveVisit newVisit:' + this.state.newVisit)
   // console.log('AECGC handleSaveVisit initialVisit:' + this.state.initialVisit)

    

      for (var v of visit) {
        v.visitHeaderId = visitHeader.visitHeaderId
     }
     for (var d of detail) {
        d.visitHeaderId = visitHeader.visitHeaderId
     }



    // var visitPostParams = {
    //     token: this.state.token,
    //     visit: visit,
    //     detail:detail
    // }

    var visitPostParams = {
        token: this.state.token,
        visitHeaderId: visitHeader.visitHeaderId,
        categoryId: categoryId,
        visit: visit,
        detail:detail
    }


    var visitGetParams = {
        visitHeaderId:  visitHeader.visitHeaderId,
        token: this.state.token
    }

   var patientStateGetParams = {
    token: this.state.token
}

var visitCategoriesGetParams = {
    visitHeaderId:  visitHeader.visitHeaderId,
    token: this.state.token,
    newVisit:false
}
var visitHeadersGetParams = {
    token: this.state.token
}



var visitControlValueGetParams = {
    visitHeaderId: visitHeader.visitHeaderId,
    token: visitHeader.token
}



    this.props.saveVisit(visitPostParams)
    .then(v=> this.props.getSavedVisit(visitGetParams))
    .then(t=>this.props.getVisitHeaders(visitHeadersGetParams))
    .then(q=> this.props.getVisitCategories(visitCategoriesGetParams))
    .then(vc=>this.props.getVisitControlValues(visitControlValueGetParams))
    .then(s=> this.saveMessage())
    .catch(this.handleGetAECGCGlobalError)


this.setState({
    newVisitSaved:true
})

//console.log('ADD VISIT END')

}


handleUpdateVisit(visitHeader, visit,detail, categoryId){
   // console.log('UPDATE VISIT')
   // console.log(categoryId);
       // console.log('AECGC handleSaveVisit newVisit:' + this.state.newVisit)
       // console.log('AECGC handleSaveVisit initialVisit:' + this.state.initialVisit)
    
        
    
          for (var v of visit) {
            v.visitHeaderId = visitHeader.visitHeaderId
         }
         for (var d of detail) {
            d.visitHeaderId = visitHeader.visitHeaderId
         }
    
    
    
         var visitPostParams = {
            token: this.state.token,
            visitHeaderId: visitHeader.visitHeaderId,
            categoryId: categoryId,
            visit: visit,
            detail:detail
        }
    
       // console.log('VISIT POST PARAMS')
      //  console.log(visitPostParams);
        
    
        var visitGetParams = {
            visitHeaderId:  visitHeader.visitHeaderId,
            token: this.state.token
        }
    
       var patientStateGetParams = {
        token: this.state.token
    }
    
    var visitCategoriesGetParams = {
        visitHeaderId:  visitHeader.visitHeaderId,
        token: this.state.token,
        newVisit:false
    }
    
        this.props.saveVisit(visitPostParams)
        .then(v=> this.props.getSavedVisit(visitGetParams))
//removed for SHISTA.
        //.then(p=> this.props.getPatientState(patientStateGetParams))
        .then(s=> this.saveMessage())
        .catch(this.handleGetAECGCGlobalError)
    
    }    



    handleCompleteVisitHeader(visit, detail,categoryId){
        
                // this.setState({
                //     visitCompleteModalOpen:false
                // })
        
        
                var visitHeaderPostParams = {
                    token: this.props.visitHeaderResult.data.token,
                    dateOfVisit: this.props.visitHeaderResult.data.dateOfVisit,
                    completed:true
                }
        
                var patientStateGetParams = {
                    token: this.props.visitHeaderResult.data.token
                }
                
                var visitCategoriesGetParams = {

                    visitHeaderId:  this.props.visitHeaderResult.data.visitHeaderId,
                    token:  this.props.visitHeaderResult.data.token,
                    newVisit:false
                    
                   
                }
                
                var visitHeadersGetParams = {
                    token: this.props.visitHeaderResult.data.token
            }
               
        
            // var visitPostParams = {
            //     token: this.state.token,
            //     visit: visit,
            //     detail:detail
            // }
        
            var visitPostParams = {
                token: this.state.token,
                visitHeaderId: this.props.visitHeaderResult.data.visitHeaderId,
                categoryId: categoryId,
                visit: visit,
                detail:detail
            }

        
            var visitGetParams = {
                visitHeaderId:  this.props.visitHeaderResult.data.visitHeaderId,
                token: this.state.token
            }
        
       
        
               
                
                 this.props.saveVisitHeader(visitHeaderPostParams)
                 .then(vh=> this.props.getSavedVisitHeader(visitHeaderPostParams))
                 .then (svh => this.props.getVisitHeaders(visitHeadersGetParams))
                 // .then(vhs=> this.props.getPatientState(patientStateGetParams))
                  .then(ps=> this.props.getVisitCategories(visitCategoriesGetParams))
                  .then(vc=>this.props.saveVisit(visitPostParams))
                  .then(v=> this.props.getSavedVisit(visitGetParams))
                  .then(sv=>  this.saveMessage())
                  .catch(this.handleGetVisitCompleteGlobalError)

        
               
        
        this.setState({
            visitCompletedSaved:true
        })
        

               }



saveMessage(){
var message =  'Saved successfully';
var heading = 'Success'
var pageName = this.getCurrentCategoryName();
switch (pageName) {
    case VISIT_CATEGORY_AMERICANEUROPEANCGC :
       {
           message =ALERTS.aecgcSaveSuccess.message;
           heading = ALERTS.aecgcSaveSuccess.heading;
           break;
       }
    case VISIT_CATEGORY_DIAGNOSIS:
    {
        message = ALERTS.diagnosisSaveSuccess.message;
        heading =  ALERTS.diagnosisSaveSuccess.heading;
    break;
    }
    case VISIT_CATEGORY_CURRENTMEDICATIONS:
    {
        message = ALERTS.currentMedicationsSaveSuccess.message;
        heading =  ALERTS.currentMedicationsSaveSuccess.heading;
    break;
    }
}

    NotificationManager.success(message, heading,2000);
}

errorMessage (){
    var heading = 'Error'

    var pageName = this.getCurrentCategoryName();
    switch (pageName) {
        case VISIT_CATEGORY_AMERICANEUROPEANCGC :
           {
               heading = ALERTS.aecgcSaveError.heading;
               break;
           }
        case VISIT_CATEGORY_DIAGNOSIS:
        {
            heading =  ALERTS.diagnosisSaveError.heading
        break;
        }
    }



    NotificationManager.error( this.state.AECGCGlobalError, heading,5000);
}

getVisit(visitHeader){
  // console.log('visitHeader')
//console.log(visitHeader)

    var visitGetParams = {
        visitHeaderId:  visitHeader.visitHeaderId,
        token: visitHeader.token
    }
  
    var visitCategoriesGetParams = {


        visitHeaderId:  visitHeader.visitHeaderId,
        token:  visitHeader.token,
        newVisit:false

}

var visitKeyValueGetParams = {
    visitHeaderId: visitHeader.visitHeaderId,
    categoryId:5,
    sectionId: 1,
    token: visitHeader.token
}

var visitControlValueGetParams = {
    visitHeaderId: visitHeader.visitHeaderId,
    token: visitHeader.token
}


    this.props.getVisit(visitGetParams)
    .then(v=>this.props.getVisitCategories(visitCategoriesGetParams))
    .then(vc=>this.props.getVisitControlValues(visitControlValueGetParams))


}




handleClearVisitKeyValues(){
    this.props.visitKeyValuesClear()
}

handleGetVisitKeyValues(visitHeader, categoryId, sectionId){
  
  
  
    var visitKeyValueGetParams = {
        visitHeaderId: visitHeader.visitHeaderId,
        categoryId:categoryId,
        sectionId: sectionId,
        token: visitHeader.token
    }
  
  
      this.props.getVisitKeyValues(visitKeyValueGetParams)    
  }
   


componentWillUnmount(){
  
  }


  renderLoadingMessage(){
    return (
        
       <div><img src={paths.loader} alt="Loading"/></div>
       
    )
}

renderMeetsAECGCGCACriteria(){
    return (
        <div className="col-md-6">
        <div className="panel panel-success">
              <div className="panel-heading text-left">
                  <h3 className="panel-title"><i className="fa fa-check-circle fa-2 mr-10" aria-hidden="true"></i>Meets 2002 AECG classification criteria</h3>
              </div>
          </div>
        </div>
    )
}

renderDoesNotMeetsAECGCGCACriteria(){
    return (
        <div className="col-md-6">
        <div className="panel panel-danger">
              <div className="panel-heading text-left">
                  <h3 className="panel-title"><i className="fa fa-times-circle fa-2 mr-10" aria-hidden="true"></i>Does not meet 2002 AECG classification criteria</h3>
              </div>
          </div>
        </div>
    )
}


renderYetToMeetAECGCGCACriteria(){
    return (
        <div className="col-md-6">
        <div className="panel panel-warning">
              <div className="panel-heading text-left">
                  <h3 className="panel-title"><i className="fa fa-times-circle fa-2 mr-10" aria-hidden="true"></i>Yet to meet AECG Consensus Group Criteria</h3>
              </div>
          </div>
        </div>
    )
}



renderMeets2016ACRECCriteria(){
    return (
        <div className="col-md-6">
        <div className="panel panel-success">
              <div className="panel-heading text-left">
                  <h3 className="panel-title"><i className="fa fa-check-circle fa-2 mr-10" aria-hidden="true"></i>Meets 2016 ACR/EULAR classification criteria</h3>
              </div>
          </div>
        </div>
    )
}

renderDoesNotMeets2016ACRECCriteria(){
    return (
        <div className="col-md-6">
        <div className="panel panel-danger">
              <div className="panel-heading text-left">
                  <h3 className="panel-title"><i className="fa fa-times-circle fa-2 mr-10" aria-hidden="true"></i>Does not meet 2016 ACR/EULAR classification criteria</h3>
              </div>
          </div>
        </div>
    )
}



renderEmpty()
{
   return <p>Please select a Follow-up</p>
}

renderAttendanceCard(){
    //console.log('renderAttendanceCard')
    
    return    (
            
            
        <AttendanceCard dateOfAttendance={this.state.dateOfVisit} newVisit={this.state.newVisit} initialVisit={this.state.initialVisit} completed={this.state.completed} visitHeaderId=

{this.state.visitHeaderId} />
        ) 
    }


 getCurrentCategoryForRedirect(){
        var path = location.pathname;
        var pageName = CATEGORY_BASE;
        var idx = path.lastIndexOf('/') ;
    
        if (idx > 0) {
            pageName = path.substring(idx);
        }

       return pageName
    
    }


    getCurrentCategoryName(){
        var pageName = "Category"
        var path = location.pathname;
        var idx = path.lastIndexOf('/') ;
        if (idx > 0) {
             pageName = path.substring(idx + 1);
        }
        return pageName
    }


    render (){

if (this.state.newVisitSaved){
 console.log('this.state.newVisitSaved 11')
// console.log(nextProps)
// console.log(this.props.visitHeaderResult)

// console.log('this.state.newVisitSaved END')
//     console.log(this.props.visitHeaderResult.data.token)
//    console.log(this.state.token)
   return(
       <div>
            <Redirect to={paths.visitLink + this.props.visitHeaderResult.data.token + CATEGORY_BASE } />
       </div>
   ) 
} 
else 
    if (this.state.visitCompletedSaved && 
        this.props.visitHeaderResult && 
        this.props.visitHeaderResult.requestRecieved && 
        this.props.visitHeaderResult.data && 
        !!this.props.visitHeaderResult.data.token){
         //   console.log('this.state.newVisitSaved 22')
            //console.log(nextProps)

        return(
            <div>
                 <Redirect to={paths.visitLink + this.props.visitHeaderResult.data.token + this.getCurrentCategoryForRedirect()} />
            </div>
        ) 
    }
else {

        // if((this.props.patientStateResult && this.props.patientStateResult.data && this.props.patientStateResult.data.hasVisits) || 
        //     (this.props.location.state && this.props.location.state.visitHeaderResult)) {

        return(
            <div >
                



               <div className="row">
               <div className="col-md-3"> 
                  
              {
                this.state.dateOfVisit?
                 this.renderAttendanceCard():null
                  }
                  </div>
                  <div className="col-md-9">
                      <div className="row">
{
                    this.state.patientMeetsAECGCGCA ? this.state.patientMeetsAECGCGCA == 'True' ? this.renderMeetsAECGCGCACriteria() :this.renderDoesNotMeetsAECGCGCACriteria() :null
}
{
                    this.state.patientMeets2016ACRECCriteria ? this.state.patientMeets2016ACRECCriteria == 'True' ? this.renderMeets2016ACRECCriteria() :this.renderDoesNotMeets2016ACRECCriteria() :null
}
                    </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12"> 
                     
                  <FadeIn>
{
this.switchPath()
}
                   


                   
                   </FadeIn>
                   </div>
                </div>
                <NotificationContainer/>
        </div>
        );
    // }
    // else  {
    //     return (            
    //             this.renderLoadingMessage()
    //     );
    // }
    }
}
}



function mapStateToProps(state) {
    return {
        visitHeaderResult : state.visitHeaderResult,
        visitResult : state.visitResult,
        patientStateResult: state.patientStateResult,
        visitHeaderResult : state.visitHeaderResult,
        visitHeadersResult: state.visitHeadersResult,
        visitCategoriesResult : state.visitCategoriesResult,
        visitKeyValuesResult : state.visitKeyValuesResult,
        visitControlValuesResult : state.visitControlValuesResult, 
        configResult : state.configResult
        
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
                                visitCategoriesClear:visitCategoriesClear, 
                                getVisitCategories: getVisitCategories, 
                                visitHeaderClear:visitHeaderClear, 
                                saveVisitHeader:saveVisitHeader, 
                                getVisitHeader:getVisitHeader, 
                                getSavedVisitHeader:getSavedVisitHeader,
                                saveVisit:saveVisit, 
                                getVisit: getVisit, 
                                getSavedVisit: getSavedVisit,
                                visitClear:visitClear, 
                                getPatientState:getPatientState,
                                patientStateClear:patientStateClear,
                                getVisitHeaders: getVisitHeaders,
                            
                                saveVisitKeyValues:saveVisitKeyValues, 
                                getVisitKeyValues: getVisitKeyValues, 
                                getSavedVisitKeyValues: getSavedVisitKeyValues,
                                visitKeyValuesClear:visitKeyValuesClear,

                                getVisitControlValues, 
                                visitControlValuesClear

                            }, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps,null, {
    pure: false
  })(VisitBase);
