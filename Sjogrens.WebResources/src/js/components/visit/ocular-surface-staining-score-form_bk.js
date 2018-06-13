
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
import {ocularSignsObjectiveValidation, getCODSTotalScore,maxLengthCheck} from '../../components/visit/modules/functions'
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces, digitsOnly} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue,getCategoryControls,getControlValues,getVisitOptionControlValue_V2,getDetailsControlValue_V2} from '../../Factory/visit';

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


import {OCULARSURFACESTAININGSCORE} from '../../config/controls/ocular-surface-staining-score';
import FunkyRadioTwoOptionsCODS from '../../components/generic/radio/cods/funky-radio-two-options-cods';  
//import {CODSFieldLength} from '../../constants/information/field-length';
//import {CODSValidationMessages} from '../../constants/information/messages';


class OcularSurfaceStainingScoreForm_bk extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
         
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
            
            totalOcularSurfaceStainingScoreRE: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreRE,this.props.visitResult.data.details):null,         
            totalOcularSurfaceStainingScoreLE: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreLE,this.props.visitResult.data.details):null,         
        
        
            nasalConjunctivaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                                this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreRE,
                                                                        this.props.visitResult.data.details):null,    

            nasalConjunctivaRE: this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,
                                        getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                        this.props.visitResult.data.visits):null,



            corneaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                        this.props.visitResult.data.visits.length > 0 ? 
                                        getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreRE,
                                                                this.props.visitResult.data.details):null,    

            corneaRE: this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,
                                getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,


        temporalConjunctivaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                                this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreRE,
                                                                        this.props.visitResult.data.details):null,    

            temporalConjunctivaRE: this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,
                                        getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                        this.props.visitResult.data.visits):null,


            patchesOfConfluentCornealStainingSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                      this.props.visitResult.data.visits.length > 0 ? 
                                        getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreRE,
                                                                this.props.visitResult.data.details):null,    

           patchesOfConfluentCornealStainingRE: this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,
                                getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,


        stainingInPulpillaryAreaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                  getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreRE,
                                                          this.props.visitResult.data.details):null,    

        stainingInPulpillaryAreaRE: this.props.visitResult && 
                  this.props.visitResult.data && 
                  this.props.visitResult.data.visits && 
                  this.props.visitResult.data.visits.length > 0 ? 
                  getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                      getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,
                          getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                          this.props.visitResult.data.visits):null,                        

        oneOrMoreCornealFilamentsSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                          this.props.visitResult.data.visits.length > 0 ? 
                            getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreRE,
                                                    this.props.visitResult.data.details):null,    

       oneOrMoreCornealFilamentsRE: this.props.visitResult && 
            this.props.visitResult.data && 
            this.props.visitResult.data.visits && 
            this.props.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,
                    getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                    this.props.visitResult.data.visits):null,       


/*start */

nasalConjunctivaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreLE,
                        this.props.visitResult.data.details):null,    

nasalConjunctivaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,



corneaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreLE,
                this.props.visitResult.data.details):null,    

corneaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


temporalConjunctivaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreLE,
                        this.props.visitResult.data.details):null,    

temporalConjunctivaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


patchesOfConfluentCornealStainingSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreLE,
                this.props.visitResult.data.details):null,    

patchesOfConfluentCornealStainingLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


stainingInPulpillaryAreaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreLE,
          this.props.visitResult.data.details):null,    

stainingInPulpillaryAreaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,                        

oneOrMoreCornealFilamentsSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreLE,
    this.props.visitResult.data.details):null,    

oneOrMoreCornealFilamentsLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,       


/*end */


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

            this.nasalConjunctivaRE_onClick = this.nasalConjunctivaRE_onClick.bind(this);
            this.corneaRE_onClick = this.corneaRE_onClick.bind(this);
            this.temporalConjunctivaRE_onClick = this.temporalConjunctivaRE_onClick.bind(this);
            this.patchesOfConfluentCornealStainingRE_onClick = this.patchesOfConfluentCornealStainingRE_onClick.bind(this);
            this.stainingInPulpillaryAreaRE_onClick = this.stainingInPulpillaryAreaRE_onClick.bind(this);
            this.oneOrMoreCornealFilamentsRE_onClick = this.oneOrMoreCornealFilamentsRE_onClick.bind(this);
            
            this.nasalConjunctivaLE_onClick = this.nasalConjunctivaLE_onClick.bind(this);
            this.corneaLE_onClick = this.corneaLE_onClick.bind(this);
            this.temporalConjunctivaLE_onClick = this.temporalConjunctivaLE_onClick.bind(this);
            this.patchesOfConfluentCornealStainingLE_onClick = this.patchesOfConfluentCornealStainingLE_onClick.bind(this);
            this.stainingInPulpillaryAreaLE_onClick = this.stainingInPulpillaryAreaLE_onClick.bind(this);
            this.oneOrMoreCornealFilamentsLE_onClick = this.oneOrMoreCornealFilamentsLE_onClick.bind(this);

            this.renderScoreRE = this.renderScoreRE.bind(this);
            this.renderScoreLE = this.renderScoreLE.bind(this);
            this.renderEmptyScoreLE = this.renderEmptyScoreLE.bind(this);
            this.renderEmptyScoreRE = this.renderEmptyScoreRE.bind(this);

            this.calculateTotalRE = this.calculateTotalRE.bind(this);
            this.calculateTotalLE = this.calculateTotalLE.bind(this);
            
            

    }



    renderScoreRE(){
       
        return (
            <div className="text-center">Right eye (<strong>{this.state.totalOcularSurfaceStainingScoreRE}</strong>)</div>
        )
    }

    
    renderScoreLE(){
        return (
            <div className="text-center">Left eye (<strong>{this.state.totalOcularSurfaceStainingScoreLE}</strong>)</div>
        )
    }

    

    
    renderEmptyScoreLE(){
        return (
            <div className="text-center">Left eye</div>
        )
    }

    renderEmptyScoreRE(){
        return (
            <div className="text-center">Right eye</div>
        )
    }



nasalConjunctivaRE_onClick(value){
        if (this.state.nasalConjunctivaRE == value){
            this.setState({
                nasalConjunctivaRE:null,
                changed:true,
                nasalConjunctivaSelectedScoreRE :  null,
                totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.nasalConjunctivaSelectedScoreRE,value, false)
            })
        }
    else {
        this.setState({
            nasalConjunctivaRE:value,
            changed:this.state.nasalConjunctivaRE != value,
            nasalConjunctivaSelectedScoreRE :  parseInt(value),
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.nasalConjunctivaSelectedScoreRE,value, true)
        })
    }
}


corneaRE_onClick(value){
    if (this.state.corneaRE == value){
        this.setState({
            corneaRE:null,
            changed:true,
            corneaSelectedScoreRE :  null,
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.corneaSelectedScoreRE,value, false)
        })
    }
else {
    this.setState({
        corneaRE:value,
        changed:this.state.corneaRE != value,
        corneaSelectedScoreRE :  parseInt(value),
        totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.corneaSelectedScoreRE,value, true)
    })
}
}



temporalConjunctivaRE_onClick(value){
    if (this.state.temporalConjunctivaRE == value){
        this.setState({
            temporalConjunctivaRE:null,
            changed:true,
            temporalConjunctivaSelectedScoreRE :  null,
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.temporalConjunctivaSelectedScoreRE,value, false)
        })
    }
else {
    this.setState({
        temporalConjunctivaRE:value,
        changed:this.state.temporalConjunctivaRE != value,
        temporalConjunctivaSelectedScoreRE :  parseInt(value),
        totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.temporalConjunctivaSelectedScoreRE,value, true)
    })
}
}




patchesOfConfluentCornealStainingRE_onClick (value){
    if (this.state.patchesOfConfluentCornealStainingRE == value){
        this.setState({
            patchesOfConfluentCornealStainingRE:null,
            changed:true,
            patchesOfConfluentCornealStainingSelectedScoreRE :  null,
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.patchesOfConfluentCornealStainingSelectedScoreRE,value, false)
        })
    }
else {
    this.setState({
        patchesOfConfluentCornealStainingRE:value,
        changed:this.state.patchesOfConfluentCornealStainingRE != value,
        patchesOfConfluentCornealStainingSelectedScoreRE :  parseInt(value),
        totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.patchesOfConfluentCornealStainingSelectedScoreRE,value, true)
    })
}
}


stainingInPulpillaryAreaRE_onClick(value){
    if (this.state.stainingInPulpillaryAreaRE == value){
        this.setState({
            stainingInPulpillaryAreaRE:null,
            changed:true,
            stainingInPulpillaryAreaSelectedScoreRE :  null,
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.stainingInPulpillaryAreaSelectedScoreRE,value, false)
        })
    }
else {
    this.setState({
        stainingInPulpillaryAreaRE:value,
        changed:this.state.stainingInPulpillaryAreaRE != value,
        stainingInPulpillaryAreaSelectedScoreRE :  parseInt(value),
        totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.stainingInPulpillaryAreaSelectedScoreRE,value, true)
    })
}
}

oneOrMoreCornealFilamentsRE_onClick(value){
    if (this.state.oneOrMoreCornealFilamentsRE == value){
        this.setState({
            oneOrMoreCornealFilamentsRE:null,
            changed:true,
            oneOrMoreCornealFilamentsSelectedScoreRE :  null,
            totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.oneOrMoreCornealFilamentsSelectedScoreRE,value, false)
        })
    }
else {
    this.setState({
        oneOrMoreCornealFilamentsRE:value,
        changed:this.state.oneOrMoreCornealFilamentsRE != value,
        oneOrMoreCornealFilamentsSelectedScoreRE :  parseInt(value),
        totalOcularSurfaceStainingScoreRE : this.calculateTotalRE(this.state.totalOcularSurfaceStainingScoreRE,this.state.oneOrMoreCornealFilamentsSelectedScoreRE,value, true)
    })
}
}




calculateTotalRE(totalScore,selectedScore, value, increaseTotalScore){
    var returnVal = 0;
   // var previousSelectedScore = selectedScore;
    var selectedValue = parseInt(value) % 10
    selectedValue = (selectedValue - 1)

    var  previousSelectedScore = 0;
    if (selectedValue != undefined && selectedScore != null && selectedScore != ''){
    previousSelectedScore = parseInt(selectedScore) % 10
    previousSelectedScore = (previousSelectedScore - 1)
    }

  
    var currentRow = parseInt((value + '').charAt(0))
    var selectedRow = -1;
    if (selectedValue != undefined && selectedScore != null && selectedScore != ''){
     selectedRow = parseInt((selectedScore + '').charAt(0))
    }


        if (increaseTotalScore){
            if (totalScore == undefined || totalScore == null){totalScore = 0}
           // if (selectedValue == 0) { selectedValue = -1} 
            if (currentRow == selectedRow || selectedRow == -1){
                returnVal =  (parseInt(totalScore) - parseInt(previousSelectedScore)) + parseInt(selectedValue)
            }
            else {
                returnVal = parseInt(totalScore)  + parseInt(selectedValue)
            }
        }
        else {

            if (currentRow == selectedRow){
                if (parseInt(totalScore)  - 1 > 0) {
                returnVal =  parseInt(totalScore)  - parseInt(selectedValue)
                if (returnVal == 0 && 
                    (selectedScore == this.state.corneaRE && this.state.nasalConjunctivaRE == undefined && 
                                                              this.state.temporalConjunctivaRE == undefined && 
                                                              this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                              this.state.stainingInPulpillaryAreaRE == undefined &&
                                                              this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                    (selectedScore == this.state.nasalConjunctivaRE  && this.state.corneaRE == undefined && 
                                                                        this.state.temporalConjunctivaRE == undefined && 
                                                                        this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                        this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                        this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                    (selectedScore == this.state.temporalConjunctivaRE  &&  this.state.corneaRE == undefined && 
                                                                            this.state.nasalConjunctivaRE == undefined && 
                                                                            this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                            this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                            this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                    (selectedScore == this.state.patchesOfConfluentCornealStainingRE   && this.state.temporalConjunctivaRE == undefined && 
                                                                                            this.state.corneaRE == undefined && 
                                                                                            this.state.nasalConjunctivaRE == undefined && 
                                                                                            this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                                            this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                    (selectedScore == this.state.stainingInPulpillaryAreaRE  &&  this.state.corneaRE == undefined && 
                                                                                    this.state.nasalConjunctivaRE == undefined && 
                                                                                    this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                                    this.state.temporalConjunctivaRE == undefined &&
                                                                                    this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                    (selectedScore == this.state.oneOrMoreCornealFilamentsRE  &&  this.state.corneaRE == undefined && 
                                                                                    this.state.nasalConjunctivaRE == undefined && 
                                                                                    this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                                    this.state.temporalConjunctivaRE == undefined &&
                                                                                    this.state.stainingInPulpillaryAreaRE == undefined)){ 
                    return null
                }
                else {
                    return returnVal
                }
                 }
                 else {
                    if (returnVal == 0 && 
                        (selectedScore == this.state.corneaRE && this.state.nasalConjunctivaRE == undefined && 
                                                                  this.state.temporalConjunctivaRE == undefined && 
                                                                  this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                  this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                  this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                        (selectedScore == this.state.nasalConjunctivaRE  && this.state.corneaRE == undefined && 
                                                                            this.state.temporalConjunctivaRE == undefined && 
                                                                            this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                            this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                            this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                        (selectedScore == this.state.temporalConjunctivaRE  &&  this.state.corneaRE == undefined && 
                                                                                this.state.nasalConjunctivaRE == undefined && 
                                                                                this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                                this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                                this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                        (selectedScore == this.state.patchesOfConfluentCornealStainingRE   && this.state.temporalConjunctivaRE == undefined && 
                                                                                                this.state.corneaRE == undefined && 
                                                                                                this.state.nasalConjunctivaRE == undefined && 
                                                                                                this.state.stainingInPulpillaryAreaRE == undefined &&
                                                                                                this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                        (selectedScore == this.state.stainingInPulpillaryAreaRE  &&  this.state.corneaRE == undefined && 
                                                                                        this.state.nasalConjunctivaRE == undefined && 
                                                                                        this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                                        this.state.temporalConjunctivaRE == undefined &&
                                                                                        this.state.oneOrMoreCornealFilamentsRE == undefined) ||
                        (selectedScore == this.state.oneOrMoreCornealFilamentsRE  &&  this.state.corneaRE == undefined && 
                                                                                        this.state.nasalConjunctivaRE == undefined && 
                                                                                        this.state.patchesOfConfluentCornealStainingRE == undefined && 
                                                                                        this.state.temporalConjunctivaRE == undefined &&
                                                                                        this.state.stainingInPulpillaryAreaRE == undefined)){  
                    return null
                    }
                    else {
                        return returnVal
                    }
                }
            }
            else {
            if (parseInt(totalScore)  - 1 > 0) {
            returnVal = parseInt(totalScore)  - parseInt(selectedValue)
            }
            else {
                return null
            }
        }
        }

         return parseInt(returnVal) >= 0 ? returnVal : 0;
 }


 /*le start */


 nasalConjunctivaLE_onClick(value){
    if (this.state.nasalConjunctivaLE == value){
        this.setState({
            nasalConjunctivaLE:null,
            changed:true,
            nasalConjunctivaSelectedScoreLE :  null,
            totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.nasalConjunctivaSelectedScoreLE,value, false)
        })
    }
else {
    this.setState({
        nasalConjunctivaLE:value,
        changed:this.state.nasalConjunctivaLE != value,
        nasalConjunctivaSelectedScoreLE :  parseInt(value),
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.nasalConjunctivaSelectedScoreLE,value, true)
    })
}
}


corneaLE_onClick(value){
if (this.state.corneaLE == value){
    this.setState({
        corneaLE:null,
        changed:true,
        corneaSelectedScoreLE :  null,
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.corneaSelectedScoreLE,value, false)
    })
}
else {
this.setState({
    corneaLE:value,
    changed:this.state.corneaLE != value,
    corneaSelectedScoreLE :  parseInt(value),
    totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.corneaSelectedScoreLE,value, true)
})
}
}



temporalConjunctivaLE_onClick(value){
if (this.state.temporalConjunctivaLE == value){
    this.setState({
        temporalConjunctivaLE:null,
        changed:true,
        temporalConjunctivaSelectedScoreLE :  null,
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.temporalConjunctivaSelectedScoreLE,value, false)
    })
}
else {
this.setState({
    temporalConjunctivaLE:value,
    changed:this.state.temporalConjunctivaLE != value,
    temporalConjunctivaSelectedScoreLE :  parseInt(value),
    totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.temporalConjunctivaSelectedScoreLE,value, true)
})
}
}




patchesOfConfluentCornealStainingLE_onClick (value){
if (this.state.patchesOfConfluentCornealStainingLE == value){
    this.setState({
        patchesOfConfluentCornealStainingLE:null,
        changed:true,
        patchesOfConfluentCornealStainingSelectedScoreLE :  null,
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.patchesOfConfluentCornealStainingSelectedScoreLE,value, false)
    })
}
else {
this.setState({
    patchesOfConfluentCornealStainingLE:value,
    changed:this.state.patchesOfConfluentCornealStainingLE != value,
    patchesOfConfluentCornealStainingSelectedScoreLE :  parseInt(value),
    totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.patchesOfConfluentCornealStainingSelectedScoreLE,value, true)
})
}
}


stainingInPulpillaryAreaLE_onClick(value){
if (this.state.stainingInPulpillaryAreaLE == value){
    this.setState({
        stainingInPulpillaryAreaLE:null,
        changed:true,
        stainingInPulpillaryAreaSelectedScoreLE :  null,
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.stainingInPulpillaryAreaSelectedScoreLE,value, false)
    })
}
else {
this.setState({
    stainingInPulpillaryAreaLE:value,
    changed:this.state.stainingInPulpillaryAreaLE != value,
    stainingInPulpillaryAreaSelectedScoreLE :  parseInt(value),
    totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.stainingInPulpillaryAreaSelectedScoreLE,value, true)
})
}
}

oneOrMoreCornealFilamentsLE_onClick(value){
if (this.state.oneOrMoreCornealFilamentsLE == value){
    this.setState({
        oneOrMoreCornealFilamentsLE:null,
        changed:true,
        oneOrMoreCornealFilamentsSelectedScoreLE :  null,
        totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.oneOrMoreCornealFilamentsSelectedScoreLE,value, false)
    })
}
else {
this.setState({
    oneOrMoreCornealFilamentsLE:value,
    changed:this.state.oneOrMoreCornealFilamentsLE != value,
    oneOrMoreCornealFilamentsSelectedScoreLE :  parseInt(value),
    totalOcularSurfaceStainingScoreLE : this.calculateTotalLE(this.state.totalOcularSurfaceStainingScoreLE,this.state.oneOrMoreCornealFilamentsSelectedScoreLE,value, true)
})
}
}




calculateTotalLE(totalScore,selectedScore, value, increaseTotalScore){
var returnVal = 0;
// var previousSelectedScore = selectedScore;
var selectedValue = parseInt(value) % 10
selectedValue = (selectedValue - 1)

var  previousSelectedScore = 0;
if (selectedValue != undefined && selectedScore != null && selectedScore != ''){
previousSelectedScore = parseInt(selectedScore) % 10
previousSelectedScore = (previousSelectedScore - 1)
}


var currentRow = parseInt((value + '').charAt(0))
var selectedRow = -1;
if (selectedValue != undefined && selectedScore != null && selectedScore != ''){
 selectedRow = parseInt((selectedScore + '').charAt(0))
}


    if (increaseTotalScore){
        if (totalScore == undefined || totalScore == null){totalScore = 0}
       // if (selectedValue == 0) { selectedValue = -1} 
        if (currentRow == selectedRow || selectedRow == -1){
            returnVal =  (parseInt(totalScore) - parseInt(previousSelectedScore)) + parseInt(selectedValue)
        }
        else {
            returnVal = parseInt(totalScore)  + parseInt(selectedValue)
        }
    }
    else {

        if (currentRow == selectedRow){
            if (parseInt(totalScore)  - 1 > 0) {
            returnVal =  parseInt(totalScore)  - parseInt(selectedValue)
            if (returnVal == 0 && 
                (selectedScore == this.state.corneaLE && this.state.nasalConjunctivaLE == undefined && 
                                                          this.state.temporalConjunctivaLE == undefined && 
                                                          this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                          this.state.stainingInPulpillaryAreaLE == undefined &&
                                                          this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                (selectedScore == this.state.nasalConjunctivaLE  && this.state.corneaLE == undefined && 
                                                                    this.state.temporalConjunctivaLE == undefined && 
                                                                    this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                    this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                    this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                (selectedScore == this.state.temporalConjunctivaLE  &&  this.state.corneaLE == undefined && 
                                                                        this.state.nasalConjunctivaLE == undefined && 
                                                                        this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                        this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                        this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                (selectedScore == this.state.patchesOfConfluentCornealStainingLE   && this.state.temporalConjunctivaLE == undefined && 
                                                                                        this.state.corneaLE == undefined && 
                                                                                        this.state.nasalConjunctivaLE == undefined && 
                                                                                        this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                                        this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                (selectedScore == this.state.stainingInPulpillaryAreaLE  &&  this.state.corneaLE == undefined && 
                                                                                this.state.nasalConjunctivaLE == undefined && 
                                                                                this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                                this.state.temporalConjunctivaLE == undefined &&
                                                                                this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                (selectedScore == this.state.oneOrMoreCornealFilamentsLE  &&  this.state.corneaLE == undefined && 
                                                                                this.state.nasalConjunctivaLE == undefined && 
                                                                                this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                                this.state.temporalConjunctivaLE == undefined &&
                                                                                this.state.stainingInPulpillaryAreaLE == undefined)){ 
                return null
            }
            else {
                return returnVal
            }
             }
             else {
                if (returnVal == 0 && 
                    (selectedScore == this.state.corneaLE && this.state.nasalConjunctivaLE == undefined && 
                                                              this.state.temporalConjunctivaLE == undefined && 
                                                              this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                              this.state.stainingInPulpillaryAreaLE == undefined &&
                                                              this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                    (selectedScore == this.state.nasalConjunctivaLE  && this.state.corneaLE == undefined && 
                                                                        this.state.temporalConjunctivaLE == undefined && 
                                                                        this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                        this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                        this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                    (selectedScore == this.state.temporalConjunctivaLE  &&  this.state.corneaLE == undefined && 
                                                                            this.state.nasalConjunctivaLE == undefined && 
                                                                            this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                            this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                            this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                    (selectedScore == this.state.patchesOfConfluentCornealStainingLE   && this.state.temporalConjunctivaLE == undefined && 
                                                                                            this.state.corneaLE == undefined && 
                                                                                            this.state.nasalConjunctivaLE == undefined && 
                                                                                            this.state.stainingInPulpillaryAreaLE == undefined &&
                                                                                            this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                    (selectedScore == this.state.stainingInPulpillaryAreaLE  &&  this.state.corneaLE == undefined && 
                                                                                    this.state.nasalConjunctivaLE == undefined && 
                                                                                    this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                                    this.state.temporalConjunctivaLE == undefined &&
                                                                                    this.state.oneOrMoreCornealFilamentsLE == undefined) ||
                    (selectedScore == this.state.oneOrMoreCornealFilamentsLE  &&  this.state.corneaLE == undefined && 
                                                                                    this.state.nasalConjunctivaLE == undefined && 
                                                                                    this.state.patchesOfConfluentCornealStainingLE == undefined && 
                                                                                    this.state.temporalConjunctivaLE == undefined &&
                                                                                    this.state.stainingInPulpillaryAreaLE == undefined)){  
                return null
                }
                else {
                    return returnVal
                }
            }
        }
        else {
        if (parseInt(totalScore)  - 1 > 0) {
        returnVal = parseInt(totalScore)  - parseInt(selectedValue)
        }
        else {
            return null
        }
    }
    }

     return parseInt(returnVal) >= 0 ? returnVal : 0;
}


 /*le end */

    validateVisit(){
        let errors = {};
      
            
      
       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []

        if (this.state.nasalConjunctivaRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.nasalConjunctivaRE,
                    controlId:
                    this.state.nasalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.nasalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.nasalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.nasalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }
    
        if (this.state.corneaRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.corneaRE,
                    controlId:
                    this.state.corneaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.corneaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.corneaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.corneaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }

        if (this.state.temporalConjunctivaRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.temporalConjunctivaRE,
                    controlId:
                    this.state.temporalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.temporalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.temporalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.temporalConjunctivaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }

        if (this.state.patchesOfConfluentCornealStainingRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.patchesOfConfluentCornealStainingRE,
                    controlId:
                    this.state.patchesOfConfluentCornealStainingRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.patchesOfConfluentCornealStainingRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.patchesOfConfluentCornealStainingRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.patchesOfConfluentCornealStainingRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }

        if (this.state.stainingInPulpillaryAreaRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.stainingInPulpillaryAreaRE,
                    controlId:
                    this.state.stainingInPulpillaryAreaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.stainingInPulpillaryAreaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.stainingInPulpillaryAreaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.stainingInPulpillaryAreaRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }

        if (this.state.oneOrMoreCornealFilamentsRE){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.oneOrMoreCornealFilamentsRE,
                    controlId:
                    this.state.oneOrMoreCornealFilamentsRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[0].controlId:
                    this.state.oneOrMoreCornealFilamentsRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[1].controlId:
                    this.state.oneOrMoreCornealFilamentsRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[2].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[2].controlId:
                    this.state.oneOrMoreCornealFilamentsRE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[3].controlValueId ? 
                    getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[3].controlId:
                    0,
                    categoryId:   categories.ocularSurfaceStainingScore.id   
                }
            )
        }


/*le start */

if (this.state.nasalConjunctivaLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.nasalConjunctivaLE,
            controlId:
            this.state.nasalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[0].controlId:
            this.state.nasalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[1].controlId:
            this.state.nasalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[2].controlId:
            this.state.nasalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.corneaLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.corneaLE,
            controlId:
            this.state.corneaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[0].controlId:
            this.state.corneaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[1].controlId:
            this.state.corneaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[2].controlId:
            this.state.corneaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.temporalConjunctivaLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.temporalConjunctivaLE,
            controlId:
            this.state.temporalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[0].controlId:
            this.state.temporalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[1].controlId:
            this.state.temporalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[2].controlId:
            this.state.temporalConjunctivaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.patchesOfConfluentCornealStainingLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.patchesOfConfluentCornealStainingLE,
            controlId:
            this.state.patchesOfConfluentCornealStainingLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[0].controlId:
            this.state.patchesOfConfluentCornealStainingLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[1].controlId:
            this.state.patchesOfConfluentCornealStainingLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[2].controlId:
            this.state.patchesOfConfluentCornealStainingLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.stainingInPulpillaryAreaLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.stainingInPulpillaryAreaLE,
            controlId:
            this.state.stainingInPulpillaryAreaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[0].controlId:
            this.state.stainingInPulpillaryAreaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[1].controlId:
            this.state.stainingInPulpillaryAreaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[2].controlId:
            this.state.stainingInPulpillaryAreaLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.oneOrMoreCornealFilamentsLE){
    visit.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.oneOrMoreCornealFilamentsLE,
            controlId:
            this.state.oneOrMoreCornealFilamentsLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[0].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[0].controlId:
            this.state.oneOrMoreCornealFilamentsLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[1].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[1].controlId:
            this.state.oneOrMoreCornealFilamentsLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[2].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[2].controlId:
            this.state.oneOrMoreCornealFilamentsLE == getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[3].controlValueId ? 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[3].controlId:
            0,
            categoryId:   categories.ocularSurfaceStainingScore.id   
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
    //}

    
   
    
    if (this.state.totalOcularSurfaceStainingScoreRE || parseInt(this.state.totalOcularSurfaceStainingScoreRE) >= 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.totalOcularSurfaceStainingScoreRE,
                controlId:OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreRE.controlId, 
                categoryId:   categories.ocularSurfaceStainingScore.id   
            }
        )
       }

       if (this.state.nasalConjunctivaSelectedScoreRE || parseInt(this.state.nasalConjunctivaSelectedScoreRE) >= 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.nasalConjunctivaSelectedScoreRE,
                controlId:OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreRE.controlId, 
                categoryId:   categories.ocularSurfaceStainingScore.id   
            }
        )
 }
  
 if (this.state.corneaSelectedScoreRE || parseInt(this.state.corneaSelectedScoreRE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.corneaSelectedScoreRE,
            controlId:OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreRE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}



if (this.state.temporalConjunctivaSelectedScoreRE || parseInt(this.state.temporalConjunctivaSelectedScoreRE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.temporalConjunctivaSelectedScoreRE,
            controlId:OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreRE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}


if (this.state.patchesOfConfluentCornealStainingRE || parseInt(this.state.patchesOfConfluentCornealStainingRE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.patchesOfConfluentCornealStainingRE,
            controlId:OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreRE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.stainingInPulpillaryAreaRE || parseInt(this.state.stainingInPulpillaryAreaRE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.stainingInPulpillaryAreaRE,
            controlId:OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreRE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.oneOrMoreCornealFilamentsRE || parseInt(this.state.oneOrMoreCornealFilamentsRE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.oneOrMoreCornealFilamentsRE,
            controlId:OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreRE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

/**LE START */

if (this.state.totalOcularSurfaceStainingScoreLE || parseInt(this.state.totalOcularSurfaceStainingScoreLE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.totalOcularSurfaceStainingScoreLE,
            controlId:OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreLE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
   }

   if (this.state.nasalConjunctivaSelectedScoreLE || parseInt(this.state.nasalConjunctivaSelectedScoreLE) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.nasalConjunctivaSelectedScoreLE,
            controlId:OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreLE.controlId, 
            categoryId:   categories.ocularSurfaceStainingScore.id   
        }
    )
}

if (this.state.corneaSelectedScoreLE || parseInt(this.state.corneaSelectedScoreLE) >= 0){
detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value:this.state.corneaSelectedScoreLE,
        controlId:OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreLE.controlId, 
        categoryId:   categories.ocularSurfaceStainingScore.id   
    }
)
}



if (this.state.temporalConjunctivaSelectedScoreLE || parseInt(this.state.temporalConjunctivaSelectedScoreLE) >= 0){
detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value:this.state.temporalConjunctivaSelectedScoreLE,
        controlId:OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreLE.controlId, 
        categoryId:   categories.ocularSurfaceStainingScore.id   
    }
)
}


if (this.state.patchesOfConfluentCornealStainingLE || parseInt(this.state.patchesOfConfluentCornealStainingLE) >= 0){
detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value:this.state.patchesOfConfluentCornealStainingLE,
        controlId:OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreLE.controlId, 
        categoryId:   categories.ocularSurfaceStainingScore.id   
    }
)
}

if (this.state.stainingInPulpillaryAreaLE || parseInt(this.state.stainingInPulpillaryAreaLE) >= 0){
detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value:this.state.stainingInPulpillaryAreaLE,
        controlId:OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreLE.controlId, 
        categoryId:   categories.ocularSurfaceStainingScore.id   
    }
)
}

if (this.state.oneOrMoreCornealFilamentsLE || parseInt(this.state.oneOrMoreCornealFilamentsLE) >= 0){
detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value:this.state.oneOrMoreCornealFilamentsLE,
        controlId:OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreLE.controlId, 
        categoryId:   categories.ocularSurfaceStainingScore.id   
    }
)
}

/*LE END */

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
    this.props.handleSaveVisitHeader(visit, detail, categories.ocularSurfaceStainingScore.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.ocularSurfaceStainingScore.id);
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
        patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
        


        visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues && nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
        
        totalOcularSurfaceStainingScoreRE: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreRE,nextProps.visitResult.data.details):null,         
        
        totalOcularSurfaceStainingScoreLE: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreLE,nextProps.visitResult.data.details):null,         
        

        nasalConjunctivaSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
                                            nextProps.visitResult.data.visits.length > 0 ? 
                                            getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  
                                                                    OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreRE,nextProps.visitResult.data.details):null,    

        nasalConjunctivaRE: nextProps.visitResult && 
                            nextProps.visitResult.data && 
                            nextProps.visitResult.data.visits && 
                            nextProps.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                                getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,
                                    getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                    nextProps.visitResult.data.visits):null,



       
        corneaSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreRE,
                                                            nextProps.visitResult.data.details):null,    

        corneaRE: nextProps.visitResult && 
                    nextProps.visitResult.data && 
                    nextProps.visitResult.data.visits && 
                    nextProps.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                        getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,
                            getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                            nextProps.visitResult.data.visits):null,
                        

        temporalConjunctivaSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
                            nextProps.visitResult.data.visits.length > 0 ? 
                            getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreRE,
                                                    nextProps.visitResult.data.details):null,    

        temporalConjunctivaRE: nextProps.visitResult && 
            nextProps.visitResult.data && 
            nextProps.visitResult.data.visits && 
            nextProps.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,
                    getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                    nextProps.visitResult.data.visits):null,


/** */


patchesOfConfluentCornealStainingSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
  getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreRE,
                          nextProps.visitResult.data.details):null,    

patchesOfConfluentCornealStainingRE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,


stainingInPulpillaryAreaSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreRE,
                    nextProps.visitResult.data.details):null,    

stainingInPulpillaryAreaRE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,                        

oneOrMoreCornealFilamentsSelectedScoreRE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreRE,
              nextProps.visitResult.data.details):null,    

oneOrMoreCornealFilamentsRE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,       


/** */
                    
/*start */

nasalConjunctivaSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreLE,
                        nextProps.visitResult.data.details):null,    

nasalConjunctivaLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,



corneaSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreLE,
                nextProps.visitResult.data.details):null,    

corneaLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,


temporalConjunctivaSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreLE,
                        nextProps.visitResult.data.details):null,    

temporalConjunctivaLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,


patchesOfConfluentCornealStainingSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreLE,
                nextProps.visitResult.data.details):null,    

patchesOfConfluentCornealStainingLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,


stainingInPulpillaryAreaSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreLE,
          nextProps.visitResult.data.details):null,    

stainingInPulpillaryAreaLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,                        

oneOrMoreCornealFilamentsSelectedScoreLE :  nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreLE,
    nextProps.visitResult.data.details):null,    

oneOrMoreCornealFilamentsLE: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null,       


/*end */



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
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
              
                visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
                
                totalOcularSurfaceStainingScoreRE: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreRE,this.props.visitResult.data.details):null,         
                
                totalOcularSurfaceStainingScoreLE: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.ocularSurfaceStainingScore.id, OCULARSURFACESTAININGSCORE.txtTotalOcularSurfaceStainingScoreLE,this.props.visitResult.data.details):null,         
                
    
                nasalConjunctivaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                                    this.props.visitResult.data.visits.length > 0 ? 
                                                    getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreRE,
                                                        this.props.visitResult.data.details):null,    
    
                nasalConjunctivaRE: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                                        getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,
                                            getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                            this.props.visitResult.data.visits):null,


                corneaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                            this.props.visitResult.data.visits.length > 0 ? 
                                            getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreRE,
                                                                    this.props.visitResult.data.details):null,    
        
                corneaRE: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                                getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,
                                    getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                    this.props.visitResult.data.visits):null,
                                
        
                temporalConjunctivaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreRE,
                                                            this.props.visitResult.data.details):null,    

                temporalConjunctivaRE: this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                        getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,
                            getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,                



                            patchesOfConfluentCornealStainingSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                              getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreRE,
                                                      this.props.visitResult.data.details):null,    

 patchesOfConfluentCornealStainingRE: this.props.visitResult && 
              this.props.visitResult.data && 
              this.props.visitResult.data.visits && 
              this.props.visitResult.data.visits.length > 0 ? 
              getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
                  getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,
                      getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                      this.props.visitResult.data.visits):null,


stainingInPulpillaryAreaSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                      this.props.visitResult.data.visits.length > 0 ? 
                        getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreRE,
                                                this.props.visitResult.data.details):null,    

stainingInPulpillaryAreaRE: this.props.visitResult && 
        this.props.visitResult.data && 
        this.props.visitResult.data.visits && 
        this.props.visitResult.data.visits.length > 0 ? 
        getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,
                getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,                        

oneOrMoreCornealFilamentsSelectedScoreRE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                  getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreRE,
                                          this.props.visitResult.data.details):null,    

oneOrMoreCornealFilamentsRE: this.props.visitResult && 
  this.props.visitResult.data && 
  this.props.visitResult.data.visits && 
  this.props.visitResult.data.visits.length > 0 ? 
  getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
      getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,
          getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
          this.props.visitResult.data.visits):null,       



/*left eye*/


nasalConjunctivaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtNasalConjunctivaSelectedScoreLE,
                        this.props.visitResult.data.details):null,    

nasalConjunctivaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,



corneaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtCorneaSelectedScoreLE,
                this.props.visitResult.data.details):null,    

corneaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


temporalConjunctivaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtTemporalConjunctivaSelectedScoreLE,
                        this.props.visitResult.data.details):null,    

temporalConjunctivaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


patchesOfConfluentCornealStainingSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtPatchesOfConfluentCornealStainingSelectedScoreLE,
                this.props.visitResult.data.details):null,    

patchesOfConfluentCornealStainingLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,


stainingInPulpillaryAreaSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtStainingInPupillaryAreaSelectedScoreLE,
          this.props.visitResult.data.details):null,    

stainingInPulpillaryAreaLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,                        

oneOrMoreCornealFilamentsSelectedScoreLE :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.ocularSurfaceStainingScore.id,  OCULARSURFACESTAININGSCORE.txtOneOrMoreCornealFilamentsSelectedScoreLE,
    this.props.visitResult.data.details):null,    

oneOrMoreCornealFilamentsLE: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.ocularSurfaceStainingScore.id, 
getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,
getCategoryControls(categories.ocularSurfaceStainingScore.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,       


/*left end */

                
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
            <h3 className="panel-title pull-left">Ocular Surface Staining Score</h3>
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

nextCategoryName = {VISIT_CATEGORY_FATFREEMASS}
prevCategoryName = {VISIT_CATEGORY_CLINICALORALDRYNESSSCORE}
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
                <h3 className="panel-title">Ocular Surface Staining Score Form</h3>
                
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

nextCategoryName = {VISIT_CATEGORY_FATFREEMASS}
prevCategoryName = {VISIT_CATEGORY_CLINICALORALDRYNESSSCORE}
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




            <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                   
                                    
                                    <table className="table table-bordered table-striped table-osss">
                                    <thead>
                                    <tr>
            <th scope="col"></th>
            <th scope="col" colSpan="4">

                                    { 
                
                (this.state.totalOcularSurfaceStainingScoreRE || parseInt(this.state.totalOcularSurfaceStainingScoreRE) >= 0 ) ? 
                    this.renderScoreRE()
                    :this.renderEmptyScoreRE()

                                    }

</th>
<th className="spacerCol"></th>
<th scope="col" colSpan="4">                               
    {
                    (this.state.totalOcularSurfaceStainingScoreLE || parseInt(this.state.totalOcularSurfaceStainingScoreLE) >= 0 ) ? 
                    this.renderScoreLE()
                    :this.renderEmptyScoreLE()
            }
</th>
</tr>
                                        <tr>
                                        <th scope="col"></th>
                                        <th scope="col"><div className="text-center">0</div></th>
                                        <th scope="col"><div className="text-center">1</div></th>
                                        <th scope="col"><div className="text-center">2</div></th>
                                        <th scope="col"><div className="text-center">3</div></th>
                                        <th scope="col" className="spacerCol"></th>
                                        <th scope="col"><div className="text-center">0</div></th>
                                        <th scope="col"><div className="text-center">1</div></th>
                                        <th scope="col"><div className="text-center">2</div></th>
                                        <th scope="col"><div className="text-center">3</div></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">Nasal conjunctiva</div></th>
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.nasalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.nasalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>
                                        

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.nasalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.nasalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaRE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>    
                                        <td className="spacerCol"></td>
                                       
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.nasalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.nasalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>
                                        

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.nasalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.nasalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.nasalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListNasalConjunctivaLE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>    


                                        </tr>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">Cornea</div></th>


                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.corneaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>    


                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.corneaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.corneaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>    

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.corneaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    } style={{}}>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaRE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>    

                                       
                                        <td className="spacerCol"></td>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.corneaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>    


                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.corneaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.corneaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>    

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.corneaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.corneaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    } style={{}}>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListCorneaLE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>    
                                       
                                        </tr>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">Temporal conjunctiva</div></th>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.temporalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>
                         
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.temporalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.temporalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.temporalConjunctivaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaRE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>

                                       
                                        <td className="spacerCol"></td>
                                       
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.temporalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>
                         
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.temporalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-2':this.state.temporalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[2].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[2].controlValue}
                                            
                                        </td>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-3':this.state.temporalConjunctivaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.temporalConjunctivaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[3].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListTemporalConjunctivaLE.controlId,this.state.visitControls)[3].controlValue}
                                            
                                        </td>
                    
                                        </tr>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">Patches of confluent corneal staining</div></th>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.patchesOfConfluentCornealStainingRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.patchesOfConfluentCornealStainingRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>               

                                        
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.patchesOfConfluentCornealStainingRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.patchesOfConfluentCornealStainingRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    
                                       
                                      

                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[2].controlValue}</td>
                                       
                                      
                                       
                                       
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingRE.controlId,this.state.visitControls)[3].controlValue}</td>
                                        
                                        <td className="spacerCol"></td>
                                        
                                      
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.patchesOfConfluentCornealStainingLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.patchesOfConfluentCornealStainingLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>               

                                        
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.patchesOfConfluentCornealStainingLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.patchesOfConfluentCornealStainingLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    

                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[2].controlValue}</td>
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListPatchesOfConfluentCornealStainingLE.controlId,this.state.visitControls)[3].controlValue}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">Staining in pupillary area</div></th>

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.stainingInPulpillaryAreaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.stainingInPulpillaryAreaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>     


                                     

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.stainingInPulpillaryAreaRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.stainingInPulpillaryAreaRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    

                                     

                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[2].controlValue}</td>
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaRE.controlId,this.state.visitControls)[3].controlValue}</td>
                                      
                                        <td className="spacerCol"></td>
                                      
                                      

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.stainingInPulpillaryAreaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.stainingInPulpillaryAreaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>     


                                     

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.stainingInPulpillaryAreaLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.stainingInPulpillaryAreaLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>    

                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[2].controlValue}</td>
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListStainingInPupillaryAreaLE.controlId,this.state.visitControls)[3].controlValue}</td>
                                        </tr>
                                        <tr>
                                        <th scope="row"><div className="page-header text-left">One or more corneal filaments</div></th>
                                       

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.oneOrMoreCornealFilamentsRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.oneOrMoreCornealFilamentsRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>     
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.oneOrMoreCornealFilamentsRE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.oneOrMoreCornealFilamentsRE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>     
                                       
                                        
                                       
                                       
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[2].controlValue}</td>
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsRE.controlId,this.state.visitControls)[3].controlValue}</td>
                                      
                                        <td className="spacerCol"></td>
                                      

                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-0':this.state.oneOrMoreCornealFilamentsLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[0].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.oneOrMoreCornealFilamentsLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[0].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[0].controlValue}
                                            
                                        </td>     
                                       
                                        <td className=
                                                {classnames('text-center selectable',
                                                    {'eye-selected-1':this.state.oneOrMoreCornealFilamentsLE == 
                                                            getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[1].controlValueId})}
                                            onClick={
                                                this.props.visitHeaderResult && 
                                                this.props.visitHeaderResult.data && 
                                                !this.props.visitHeaderResult.data.completed ? 
                                                        ()=>this.oneOrMoreCornealFilamentsLE_onClick(getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[1].controlValueId):null
                                                    }>
                                               
                                            {getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[1].controlValue}
                                            
                                        </td>     

                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[2].controlValue}</td>
                                        <td className="text-center not-selectable">{getControlValues(OCULARSURFACESTAININGSCORE.rbtListOneOrMoreCornealFilamentsLE.controlId,this.state.visitControls)[3].controlValue}</td>
                                        </tr>
                                    </tbody>
                                    </table>


                                


                                    </FadeIn>

                                </div>
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

 export default OcularSurfaceStainingScoreForm;

