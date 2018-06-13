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
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../config/controls/american-european-cgc';
import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {categories} from '../../config/categories';
import FunkyRadioThreeOptionsVertical from '../../components/generic/radio/funky-radio-three-options-vertical';
import FunkyRadioThreeOptionsVerticalNoCaption from '../../components/generic/radio/funky-radio-three-options-vertical-no-caption';
import FunkyRadioFourOptionsVertical from '../../components/generic/radio/funky-radio-four-options-vertical';

import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import {ocularSignsObjectiveValidation} from '../../components/visit/modules/functions'
//import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
//import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';


import {meetsAECGCCriteria, meets2016ACRECCriteria, maxLengthCheck,addZeroes} from '../../components/visit/modules/functions';
//import NumericInput from 'react-numeric-input';
import {digitsRange,digitsLessThan,isAlpha, isAlphanumericSpace,validMonth, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../Factory/reg-ex';
import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';

import {DiagnosisFields} from '../../constants/information/field-length';
import {DiagnosisValidationMessages} from '../../constants/information/messages';
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

class DiagnosisForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
          
          
          
            // patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',
          
          //start
          ocularSignsObjectiveA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,this.props.visitResult.data.visits):'',
          ocularSignsObjectiveB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,this.props.visitResult.data.visits):'',
          objectiveEvidenceA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,this.props.visitResult.data.visits):'',
          histopathologyA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA,this.props.visitResult.data.visits):'',
          autoAntibodiesA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,this.props.visitResult.data.visits):'',
          //end
          
            patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',           
            alternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,this.props.visitResult.data.visits):'',
            otherAlternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, alternateDiagnosis.txtOtherAlternateDiagnosis ,this.props.visitResult.data.details):'',
            
            sjogrensSymptomsStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartMM ,this.props.visitResult.data.details):'',
            sjogrensSymptomsStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartMMNA ,this.props.visitResult.data.details):false,
            sjogrensSymptomsStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartYYYY ,this.props.visitResult.data.details):'',
            sjogrensSymptomsStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartYYYYNA ,this.props.visitResult.data.details):false,
            
            sjogrensSymptomsSuggestiveStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartMM ,this.props.visitResult.data.details):'',
            sjogrensSymptomsSuggestiveStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartMMNA ,this.props.visitResult.data.details):false,
            sjogrensSymptomsSuggestiveStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartYYYY ,this.props.visitResult.data.details):'',
            sjogrensSymptomsSuggestiveStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartYYYYNA ,this.props.visitResult.data.details):false,
            
            sjogrensSymptomsSuggestedStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartMM ,this.props.visitResult.data.details):'',
            sjogrensSymptomsSuggestedStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartMMNA ,this.props.visitResult.data.details):false,
            sjogrensSymptomsSuggestedStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartYYYY ,this.props.visitResult.data.details):'',
            sjogrensSymptomsSuggestedStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartYYYYNA ,this.props.visitResult.data.details):false,
            
            sjogrensDiagnosisMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisMM ,this.props.visitResult.data.details):'',
            sjogrensDiagnosisMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisMMNA ,this.props.visitResult.data.details):false,
            sjogrensDiagnosisYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisYYYY ,this.props.visitResult.data.details):'',
            sjogrensDiagnosisYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisYYYYNA ,this.props.visitResult.data.details):false,
            
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

         
         // this.getVisitOptionControlValue = this.getVisitOptionControlValue.bind(this);
          //this.getDetailsControlValue = this.getDetailsControlValue.bind(this);
          this.optPatientHasPhysiciansDiagnosis_onChange = this.optPatientHasPhysiciansDiagnosis_onChange.bind(this);
          this.renderDiagnosis = this.renderDiagnosis.bind(this);
          this.renderAuditData = this.renderAuditData.bind(this);
          this.optAlternateDiagnosis_onChange = this.optAlternateDiagnosis_onChange.bind(this);
          this.otherAlternateDiagnosis_onChange = this.otherAlternateDiagnosis_onChange.bind(this);


          this.sjogrensSymptomsStartMM_onChange = this.sjogrensSymptomsStartMM_onChange.bind(this);
          this.sjogrensSymptomsStartMM_onKeyPress = this.sjogrensSymptomsStartMM_onKeyPress.bind(this);
          this.sjogrensSymptomsStartMMNA_onChange = this.sjogrensSymptomsStartMMNA_onChange.bind(this);
          this.sjogrensSymptomsStartYYYY_onChange = this.sjogrensSymptomsStartYYYY_onChange.bind(this);
          this.sjogrensSymptomsStartYYYY_onBlur = this.sjogrensSymptomsStartYYYY_onBlur.bind(this);
          this.sjogrensSymptomsStartYYYY_onKeyPress = this.sjogrensSymptomsStartYYYY_onKeyPress.bind(this);
          this.sjogrensSymptomsStartYYYYNA_onChange = this.sjogrensSymptomsStartYYYYNA_onChange.bind(this);

          this.sjogrensSymptomsSuggestiveStartMM_onChange = this.sjogrensSymptomsSuggestiveStartMM_onChange.bind(this);
          this.sjogrensSymptomsSuggestiveStartMM_onKeyPress = this.sjogrensSymptomsSuggestiveStartMM_onKeyPress.bind(this);
          this.sjogrensSymptomsSuggestiveStartMMNA_onChange = this.sjogrensSymptomsSuggestiveStartMMNA_onChange.bind(this);
          this.sjogrensSymptomsSuggestiveStartYYYY_onChange = this.sjogrensSymptomsSuggestiveStartYYYY_onChange.bind(this);
          this.sjogrensSymptomsSuggestiveStartYYYY_onBlur = this.sjogrensSymptomsSuggestiveStartYYYY_onBlur.bind(this);
          this.sjogrensSymptomsSuggestiveStartYYYY_onKeyPress = this.sjogrensSymptomsSuggestiveStartYYYY_onKeyPress.bind(this);
          this.sjogrensSymptomsSuggestiveStartYYYYNA_onChange = this.sjogrensSymptomsSuggestiveStartYYYYNA_onChange.bind(this);

          this.sjogrensSymptomsSuggestedStartMM_onChange = this.sjogrensSymptomsSuggestedStartMM_onChange.bind(this);
          this.sjogrensSymptomsSuggestedStartMM_onKeyPress = this.sjogrensSymptomsSuggestedStartMM_onKeyPress.bind(this);
          this.sjogrensSymptomsSuggestedStartMMNA_onChange = this.sjogrensSymptomsSuggestedStartMMNA_onChange.bind(this);
          this.sjogrensSymptomsSuggestedStartYYYY_onChange = this.sjogrensSymptomsSuggestedStartYYYY_onChange.bind(this);
          this.sjogrensSymptomsSuggestedStartYYYY_onBlur = this.sjogrensSymptomsSuggestedStartYYYY_onBlur.bind(this);
          this.sjogrensSymptomsSuggestedStartYYYY_onKeyPress = this.sjogrensSymptomsSuggestedStartYYYY_onKeyPress.bind(this);
          this.sjogrensSymptomsSuggestedStartYYYYNA_onChange = this.sjogrensSymptomsSuggestedStartYYYYNA_onChange.bind(this);

          this.sjogrensDiagnosisMM_onChange = this.sjogrensDiagnosisMM_onChange.bind(this);
          this.sjogrensDiagnosisMM_onKeyPress = this.sjogrensDiagnosisMM_onKeyPress.bind(this);
          this.sjogrensDiagnosisMMNA_onChange = this.sjogrensDiagnosisMMNA_onChange.bind(this);
          this.sjogrensDiagnosisYYYY_onChange = this.sjogrensDiagnosisYYYY_onChange.bind(this);
          this.sjogrensDiagnosisYYYY_onBlur = this.sjogrensDiagnosisYYYY_onBlur.bind(this);
          this.sjogrensDiagnosisYYYY_onKeyPress = this.sjogrensDiagnosisYYYY_onKeyPress.bind(this);
          this.sjogrensDiagnosisYYYYNA_onChange = this.sjogrensDiagnosisYYYYNA_onChange.bind(this);
 
          
            /*Every visit should have start*/
            this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
            this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
           // this.renderSaveButton = this.renderSaveButton.bind(this);
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

    }


    validateVisit(){
        let errors = {};
        if (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId &&
                this.state.alternateDiagnosis.length == 0) {
                    errors.alternateDiagnosis = DiagnosisValidationMessages.primarySjogrens.alternateRequired; //'Please specify an alternate diagnosis';
         }
        
        if ((this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId) &&
                this.state.otherAlternateDiagnosis.length == 0) {
                errors.otherAlternateDiagnosis = DiagnosisValidationMessages.primarySjogrens.alternateOtherRequired; //'Please specify other alternate diagnosis';        
        }

        if (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId)
            {
           if (this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[0].controlValueId ||
                this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[1].controlValueId ||
                this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[2].controlValueId ||
                this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId)
                {
                    if ( !this.state.sjogrensSymptomsSuggestedStartMMNA && 
                        this.state.sjogrensSymptomsSuggestedStartMM.length == 0 ) {
                        errors.sjogrensSymptomsSuggestedStartMM = DiagnosisValidationMessages.sjogrensSymptomsSuggested.monthRequired //'Please provide a Month';
                        }
                
                    if ( !this.state.sjogrensSymptomsSuggestedStartYYYYNA && 
                        this.state.sjogrensSymptomsSuggestedStartYYYY.length == 0 ) {
                        errors.sjogrensSymptomsSuggestedStartYYYY = DiagnosisValidationMessages.sjogrensSymptomsSuggested.yearRequired;//'Please provide a Year';        
                        }
                
                    if (!this.state.sjogrensSymptomsSuggestedStartMMNA &&
                        this.state.sjogrensSymptomsSuggestedStartMM.length > 0  && 
                        !validMonth(this.state.sjogrensSymptomsSuggestedStartMM)) {
                        errors.sjogrensSymptomsSuggestedStartMMRange = DiagnosisValidationMessages.sjogrensSymptomsSuggested.monthRange; //'Please provide a valid month between 01-12';  
                    } 
            
                    if (!this.state.sjogrensSymptomsSuggestedStartYYYYNA &&
                        this.state.sjogrensSymptomsSuggestedStartYYYY.length > 0  && 
                        !validYear(this.state.sjogrensSymptomsSuggestedStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestedYearMin)) {
                        errors.sjogrensSymptomsSuggestedStartYYYYRange = DiagnosisValidationMessages.sjogrensSymptomsSuggested.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year() ;
                    } 
                }
            }
    

            
        if (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId){
        
                if ( !this.state.sjogrensSymptomsStartMMNA && 
                    this.state.sjogrensSymptomsStartMM.length == 0 ) {
                    errors.sjogrensSymptomsStartMM = DiagnosisValidationMessages.sjogrensSymptoms.monthRequired //'Please provide a Month';
                    }
            
                if ( !this.state.sjogrensSymptomsStartYYYYNA && 
                    this.state.sjogrensSymptomsStartYYYY.length == 0 ) {
                    errors.sjogrensSymptomsStartYYYY = DiagnosisValidationMessages.sjogrensSymptoms.yearRequired;//'Please provide a Year';        
                    }
            
                if (!this.state.sjogrensSymptomsStartMMNA &&
                    this.state.sjogrensSymptomsStartMM.length > 0  && 
                    !validMonth(this.state.sjogrensSymptomsStartMM)) {
                    errors.sjogrensSymptomsStartMMRange = DiagnosisValidationMessages.sjogrensSymptoms.monthRange; //'Please provide a valid month between 01-12';  
                } 
        
                if (!this.state.sjogrensSymptomsStartYYYYNA &&
                    this.state.sjogrensSymptomsStartYYYY.length > 0  && 
                    !validYear(this.state.sjogrensSymptomsStartYYYY, DiagnosisFields.sjogrensSymptomsYearMin)) {
                    errors.sjogrensSymptomsStartYYYYRange = DiagnosisValidationMessages.sjogrensSymptoms.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year() ;
                } 
        
                if ( !this.state.sjogrensDiagnosisMMNA && 
                    this.state.sjogrensDiagnosisMM.length == 0 ) {
                    errors.sjogrensDiagnosisMM = DiagnosisValidationMessages.sjogrensDiagnosis.monthRequired; //'Please provide a Month';            
                    }
            
                if ( !this.state.sjogrensDiagnosisYYYYNA && 
                    this.state.sjogrensDiagnosisYYYY.length == 0 ) {
                    errors.sjogrensDiagnosisYYYY =  DiagnosisValidationMessages.sjogrensDiagnosis.yearRequired; //'Please provide a Year';        
                    }
            
                if (!this.state.sjogrensDiagnosisMMNA &&
                    this.state.sjogrensDiagnosisMM.length > 0  && 
                    !validMonth(this.state.sjogrensDiagnosisMM)) {
                    errors.sjogrensDiagnosisMMRange =  DiagnosisValidationMessages.sjogrensDiagnosis.monthRange;//'Please provide a valid month between 01-12';
                } 
        
                if (!this.state.sjogrensDiagnosisYYYYNA &&
                    this.state.sjogrensDiagnosisYYYY.length > 0  && 
                    !validYear(this.state.sjogrensDiagnosisYYYY, DiagnosisFields.sjogrensDiagnosisYearMin)) {
                    errors.sjogrensDiagnosisYYYYRange =  DiagnosisValidationMessages.sjogrensDiagnosis.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year() ;
                } 
            }

            if (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValueId){                
                        if ( !this.state.sjogrensSymptomsSuggestiveStartMMNA && 
                            this.state.sjogrensSymptomsSuggestiveStartMM.length == 0 ) {
                            errors.sjogrensSymptomsSuggestiveStartMM = DiagnosisValidationMessages.sjogrensSymptomsSuggestive.monthRequired //'Please provide a Month';
                            }
                    
                        if ( !this.state.sjogrensSymptomsSuggestiveStartYYYYNA && 
                            this.state.sjogrensSymptomsSuggestiveStartYYYY.length == 0 ) {
                            errors.sjogrensSymptomsSuggestiveStartYYYY = DiagnosisValidationMessages.sjogrensSymptomsSuggestive.yearRequired;//'Please provide a Year';        
                            }
                    
                        if (!this.state.sjogrensSymptomsSuggestiveStartMMNA &&
                            this.state.sjogrensSymptomsSuggestiveStartMM.length > 0  && 
                            !validMonth(this.state.sjogrensSymptomsSuggestiveStartMM)) {
                            errors.sjogrensSymptomsSuggestiveStartMMRange = DiagnosisValidationMessages.sjogrensSymptomsSuggestive.monthRange; //'Please provide a valid month between 01-12';  
                        } 
                
                        if (!this.state.sjogrensSymptomsSuggestiveStartYYYYNA &&
                            this.state.sjogrensSymptomsSuggestiveStartYYYY.length > 0  && 
                            !validYear(this.state.sjogrensSymptomsSuggestiveStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestiveYearMin)) {
                            errors.sjogrensSymptomsSuggestiveStartYYYYRange = DiagnosisValidationMessages.sjogrensSymptomsSuggestive.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year() ;
                        }                        
            }
            




            this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = [       
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.patientHasPhysiciansDiagnosis,
                controlId:this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId ? 
                             patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlId : 
                          this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId ? 
                             patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlId :
                         this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValueId ? 
                             patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlId :
                          0,
                categoryId:   categories.diagnosis.id             
            },
            {
                visitHeaderId:this.props.visitHeaderId,
                controlValueId:this.state.alternateDiagnosis,
                controlId:this.state.alternateDiagnosis  == alternateDiagnosis.optAlternateDiagnosis[0].controlValueId ? 
                                alternateDiagnosis.optAlternateDiagnosis[0].controlId : 
                          this.state.alternateDiagnosis  == alternateDiagnosis.optAlternateDiagnosis[1].controlValueId ? 
                                alternateDiagnosis.optAlternateDiagnosis[1].controlId :
                          this.state.alternateDiagnosis  == alternateDiagnosis.optAlternateDiagnosis[2].controlValueId ? 
                                alternateDiagnosis.optAlternateDiagnosis[2].controlId :
                          this.state.alternateDiagnosis  == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId ? 
                                alternateDiagnosis.optAlternateDiagnosis[3].controlId :
                          0,
                categoryId:   categories.diagnosis.id             
            },
        ]

        return visit;
    }

    
getDetailValues(){

    var detail = []
    
    //patientMeetsAECGCGCA
    
    if (this.state.patientMeetsAECGCGCA){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeetsAECGCGCA,
                controlId:patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
    }
    

  //  if (this.state.patientMeets2016ACRECCriteria){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
               // value:this.state.patientMeets2016ACRECCriteria,
               value : this.state.alternateDiagnosis  == alternateDiagnosis.optAlternateDiagnosis[2].controlValueId ? false :  
              meets2016ACRECCriteria(
                            (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId),
                            (this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[0].controlValueId),
                            (this.state.objectiveEvidenceA == objectiveEvidence.optObjectiveEvidenceA[0].controlValueId),
                            (this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId),
                            ((this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId))
                        ),
               controlId:patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
 //   }

    //TODO:  ADD OTYHER TXT IF OTHER IS SELECTED.
    if ((this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId) &&
             this.state.otherAlternateDiagnosis.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.otherAlternateDiagnosis,
                controlId:alternateDiagnosis.txtOtherAlternateDiagnosis.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    
    
    if (this.state.sjogrensSymptomsStartMM.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsStartMM,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartMM.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsStartMMNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsStartMMNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartMMNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    
    if (this.state.sjogrensSymptomsStartYYYY.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsStartYYYY,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartYYYY.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsStartYYYYNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsStartYYYYNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartYYYYNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    //


    if (this.state.sjogrensSymptomsSuggestiveStartMM.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestiveStartMM,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartMM.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsSuggestiveStartMMNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestiveStartMMNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartMMNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    
    if (this.state.sjogrensSymptomsSuggestiveStartYYYY.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestiveStartYYYY,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartYYYY.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsSuggestiveStartYYYYNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestiveStartYYYYNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartYYYYNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    

    //
    //start suggeted


    if (this.state.sjogrensSymptomsSuggestedStartMM.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestedStartMM,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartMM.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsSuggestedStartMMNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestedStartMMNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartMMNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    
    if (this.state.sjogrensSymptomsSuggestedStartYYYY.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestedStartYYYY,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartYYYY.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensSymptomsSuggestedStartYYYYNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensSymptomsSuggestedStartYYYYNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartYYYYNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }

    //end suggested
    
    if (this.state.sjogrensDiagnosisMM.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensDiagnosisMM,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisMM.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensDiagnosisMMNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensDiagnosisMMNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisMMNA.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    
    if (this.state.sjogrensDiagnosisYYYY.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensDiagnosisYYYY,
                controlId:patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisYYYY.controlId, 
                categoryId:   categories.diagnosis.id             
            }
        )
    }
    
    if (this.state.sjogrensDiagnosisYYYYNA ){    
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.sjogrensDiagnosisYYYYNA,
                controlId:patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisYYYYNA.controlId, 
                categoryId:   categories.diagnosis.id             
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
    this.props.handleSaveVisitHeader(visit, detail,categories.diagnosis.id);
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

        this.props.handleCompleteVisitHeader(visit, detail,categories.diagnosis.id);
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
               
                ocularSignsObjectiveA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,nextProps.visitResult.data.visits):'',
                ocularSignsObjectiveB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,nextProps.visitResult.data.visits):'',
                objectiveEvidenceA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,nextProps.visitResult.data.visits):'',
                histopathologyA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA,nextProps.visitResult.data.visits):'',
                  autoAntibodiesA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,nextProps.visitResult.data.visits):'',
              
                patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.visits):'',
                alternateDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,nextProps.visitResult.data.visits):'',
                otherAlternateDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, alternateDiagnosis.txtOtherAlternateDiagnosis, nextProps.visitResult.data.details):'',

                sjogrensSymptomsStartMM: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartMM ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsStartMMNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartMMNA ,nextProps.visitResult.data.details):false,
                sjogrensSymptomsStartYYYY: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartYYYY ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsStartYYYYNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartYYYYNA ,nextProps.visitResult.data.details):false,
                
                sjogrensSymptomsSuggestiveStartMM: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartMM ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsSuggestiveStartMMNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartMMNA ,nextProps.visitResult.data.details):false,
                sjogrensSymptomsSuggestiveStartYYYY: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartYYYY ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsSuggestiveStartYYYYNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartYYYYNA ,nextProps.visitResult.data.details):false,
                
                sjogrensSymptomsSuggestedStartMM: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartMM ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsSuggestedStartMMNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartMMNA ,nextProps.visitResult.data.details):false,
                sjogrensSymptomsSuggestedStartYYYY: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartYYYY ,nextProps.visitResult.data.details):'',
                sjogrensSymptomsSuggestedStartYYYYNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartYYYYNA ,nextProps.visitResult.data.details):false,
             
                sjogrensDiagnosisMM: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisMM ,nextProps.visitResult.data.details):'',
                sjogrensDiagnosisMMNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisMMNA ,nextProps.visitResult.data.details):'',
                sjogrensDiagnosisYYYY: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisYYYY ,nextProps.visitResult.data.details):'',
                sjogrensDiagnosisYYYYNA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisYYYYNA ,nextProps.visitResult.data.details):'',
                
                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? nextProps.visitResult.data.visits[0].createdUser :null,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? nextProps.visitResult.data.visits[0].createdDateTime :null,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? nextProps.visitResult.data.visits[0].lastUpdatedUser :null,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? nextProps.visitResult.data.visits[0].lastUpdatedDateTime :null,
                

                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
             

                changed:false,
                
        })

        // this.sjogrensSymptomsStartMM_onChange = this.sjogrensSymptomsStartMM_onChange.bind(this);
        // this.sjogrensSymptomsStartMM_onKeyPress = this.sjogrensSymptomsStartMM_onKeyPress.bind(this);
        // this.sjogrensSymptomsStartMMNA_onChange = this.sjogrensSymptomsStartMMNA_onChange.bind(this);
        
        // this.sjogrensSymptomsStartYYYY_onChange = this.sjogrensSymptomsStartYYYY_onChange.bind(this);
        // this.sjogrensSymptomsStartYYYY_onKeyPress = this.sjogrensSymptomsStartYYYY_onKeyPress.bind(this);
        // this.sjogrensSymptomsStartYYYYNA_onChange = this.sjogrensSymptomsStartYYYYNA_onChange.bind(this);


      }




    componentDidMount () {
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',            
              
              
                ocularSignsObjectiveA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,this.props.visitResult.data.visits):'',
                ocularSignsObjectiveB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,this.props.visitResult.data.visits):'',
                objectiveEvidenceA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,this.props.visitResult.data.visits):'',
                histopathologyA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA,this.props.visitResult.data.visits):'',
                  autoAntibodiesA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,this.props.visitResult.data.visits):'',
              
              
              
                patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',     
                alternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,this.props.visitResult.data.visits):'',                
                otherAlternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, alternateDiagnosis.txtOtherAlternateDiagnosis ,this.props.visitResult.data.details):'',
                
                sjogrensSymptomsStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartMM ,this.props.visitResult.data.details):'',
                sjogrensSymptomsStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartMMNA ,this.props.visitResult.data.details):false,
                sjogrensSymptomsStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsStartYYYY ,this.props.visitResult.data.details):'',
                sjogrensSymptomsStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsStartYYYYNA ,this.props.visitResult.data.details):false,
                
                sjogrensSymptomsSuggestiveStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartMM ,this.props.visitResult.data.details):'',
                sjogrensSymptomsSuggestiveStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartMMNA ,this.props.visitResult.data.details):false,
                sjogrensSymptomsSuggestiveStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestiveStartYYYY ,this.props.visitResult.data.details):'',
                sjogrensSymptomsSuggestiveStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestiveStartYYYYNA ,this.props.visitResult.data.details):false,
                
                sjogrensSymptomsSuggestedStartMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartMM ,this.props.visitResult.data.details):'',
                sjogrensSymptomsSuggestedStartMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartMMNA ,this.props.visitResult.data.details):false,
                sjogrensSymptomsSuggestedStartYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensSymptomsSuggestedStartYYYY ,this.props.visitResult.data.details):'',
                sjogrensSymptomsSuggestedStartYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensSymptomsSuggestedStartYYYYNA ,this.props.visitResult.data.details):false,
             
                sjogrensDiagnosisMM: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisMM ,this.props.visitResult.data.details):'',
                sjogrensDiagnosisMMNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisMMNA ,this.props.visitResult.data.details):false,
                sjogrensDiagnosisYYYY: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.txtSjogrensDiagnosisYYYY ,this.props.visitResult.data.details):'',
                sjogrensDiagnosisYYYYNA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.chkSjogrensDiagnosisYYYYNA ,this.props.visitResult.data.details):false,
                
                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
               
                changed:false,
            });
       }

      



//   getVisitOptionControlValue(categoryId,visitSectionControls,savedVisitControlArray){
//     var returnVal = 0;
//     for (var ctrl of savedVisitControlArray) {   
//         if (ctrl.categoryId == categoryId ){
//             for (var visitCtrl of visitSectionControls) {   
//                 if (ctrl.controlId == visitCtrl.controlId)
//                     returnVal = ctrl.controlValueId;
//                 break;
//             }
//         }
//     }
//         return returnVal 
//   }



//   getDetailsControlValue(categoryId,visitSectionControl,savedVisitControlArray){
//         var returnVal='';

//         for (var ctrl of savedVisitControlArray) { 
//             if (ctrl.categoryId == categoryId ){   
//                     if (ctrl.controlId == visitSectionControl.controlId)
//                         {
//                         returnVal = ctrl.value;
//                     break;}
//             }
//         }
//             return returnVal 
//       }

renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading Diagnosis"}>
       <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   

sjogrensSymptomsStartMM_onChange(e){
    
      //  console.log('sjogrensSymptomsStartMM_onChange');


        if (!!this.state.errors['sjogrensSymptomsStartMM'] || !!this.state.errors['sjogrensSymptomsStartMMRange'] ){
            //One of the above error has occurred 
            //console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['sjogrensSymptomsStartMM'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && validMonth(e.target.value)) {
           // console.log('Entered value is ok');
            delete errorsClone['sjogrensSymptomsStartMMRange'];
           }
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsStartMM:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
          }
           else {
    
               if (e.target.value.length > 0  && !validMonth(e.target.value)) {
                   //no errors for this field existed before
                  // console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.sjogrensSymptomsStartMMRange =  DiagnosisValidationMessages.sjogrensSymptoms.monthRange;//'Please provide a valid month between 01-12';
    
                   this.setState({
                               errors:errorsClone,
                               sjogrensSymptomsStartMM:e.target.value,
                               //histopathologyAYearPerformedNA: false,   
                               changed:true,
                           })
               } 
               else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                            sjogrensSymptomsStartMM:e.target.value,
                            //histopathologyAYearPerformedNA: false,   
                            changed:true
                           })
                       }
               }
    }

    
sjogrensSymptomsStartMM_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
        // if (!digitsRange(e.key,1,12)) {
        //     e.preventDefault(); 
        // }

        this.setState({
            sjogrensSymptomsStartMMNA:false
        })
    }


sjogrensSymptomsStartMMNA_onChange(e){
       // console.log('sjogrensSymptomsStartYYYYNA_onChange' +  e.target.checked)
//

if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['sjogrensSymptomsStartMM'];
    delete errorsClone['sjogrensSymptomsStartMMRange'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        sjogrensSymptomsStartMM:'',
        sjogrensSymptomsStartMMNA: !this.state.sjogrensSymptomsStartMMNA,
        changed:true,
     });
 
    }
    else{
     this.setState({
        sjogrensSymptomsStartMMNA: !this.state.sjogrensSymptomsStartMMNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }


        //
    }
    

    
sjogrensSymptomsStartYYYY_onBlur(e){
    // console.log('sjogrensSymptomsStartYYYY_onBlur');


    if (!!this.state.errors['sjogrensSymptomsStartYYYY'] || !!this.state.errors['sjogrensSymptomsStartYYYYRange'] ){
        //One of the above error has occurred 
      //  console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
        delete errorsClone['sjogrensSymptomsStartYYYY'];
       // delete errorsClone['sjogrensSymptomsStartYYYYRange'];
       //Only delete range error if current value is ok
       if (this.state.sjogrensSymptomsStartYYYY.length > 0  && validYear(this.state.sjogrensSymptomsStartYYYY, DiagnosisFields.sjogrensSymptomsYearMin)) {
       // console.log('Entered value is ok');
        delete errorsClone['sjogrensSymptomsStartYYYYRange'];
       }
     
     //copy clone back to errors in state
       this.setState({
       // [e.target.name]: e.target.value,
           errors:errorsClone,
         //  sjogrensSymptomsStartYYYY:e.target.value,
           //histopathologyAYearPerformedNA: false,   
           //changed:true
       });
      }
       else {

           if (this.state.sjogrensSymptomsStartYYYY.length > 0  && !validYear(this.state.sjogrensSymptomsStartYYYY, DiagnosisFields.sjogrensSymptomsYearMin)) {
               //no errors for this field existed before
             //  console.log('no errors for this field existed before')
              // console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);
               errorsClone.sjogrensSymptomsStartYYYYRange =  DiagnosisValidationMessages.sjogrensSymptoms.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year();

               this.setState({
                           errors:errorsClone,
                         //  sjogrensSymptomsStartYYYY:e.target.value,
                           //histopathologyAYearPerformedNA: false,   
                          // changed:true,
                       })
           } 
           else {
                // console.log('no invalid values update state with no error');
                //no invalid values update state with no error
                 //clone object from state 
             let errorsClone = Object.assign({},this.state.errors);
                 this.setState({
                        errors:errorsClone
                       // sjogrensSymptomsStartYYYY:e.target.value,
                        //histopathologyAYearPerformedNA: false,   
                        //changed:true
                       })
                   }
           }


}
    
sjogrensSymptomsStartYYYY_onChange(e){
         //console.log('sjogrensSymptomsStartYYYY_onChange');


        // if (!!this.state.errors['sjogrensSymptomsStartYYYY'] || !!this.state.errors['sjogrensSymptomsStartYYYYRange'] ){
        //     //One of the above error has occurred 
        //     console.log('One of the above error has occurred');
        //   //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
        //   //remove field we just type into from errors.
        //   // delete errorsClone[e.target.name];
        //    //Delete the required field      
            delete errorsClone['sjogrensSymptomsStartYYYY'];
            delete errorsClone['sjogrensSymptomsStartYYYYRange'];
        //    //Only delete range error if current value is ok
        //    if (e.target.value.length > 0  && validYear(e.target.value)) {
        //     console.log('Entered value is ok');
        //     delete errorsClone['sjogrensSymptomsStartYYYYRange'];
        //    }
         
        //  //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsStartYYYY:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
        //   }
        //    else {
    
        //        if (e.target.value.length > 0  && !validYear(e.target.value)) {
        //            //no errors for this field existed before
        //            console.log('no errors for this field existed before')
        //            console.log('and user has eneterd invalid value')
        //            //and user has eneterd invalid value
        //            //clone errors and add to state
        //            let errorsClone = Object.assign({},this.state.errors);
        //            errorsClone.sjogrensSymptomsStartYYYYRange = 'Please provide a valid year between 1920 and ' + Moment().year();
    
        //            this.setState({
        //                        errors:errorsClone,
        //                        sjogrensSymptomsStartYYYY:e.target.value,
        //                        //histopathologyAYearPerformedNA: false,   
        //                        changed:true,
        //                    })
        //        } 
        //        else {
        //              console.log('no invalid values update state with no error');
        //             //no invalid values update state with no error
        //              this.setState({
        //                     sjogrensSymptomsStartYYYY:e.target.value,
        //                     //histopathologyAYearPerformedNA: false,   
        //                     changed:true
        //                    })
        //                }
        //        }


    }
    
sjogrensSymptomsStartYYYY_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
       
        this.setState({
            sjogrensSymptomsStartYYYYNA:false
        })
    
    }

    
sjogrensSymptomsStartYYYYNA_onChange(e){
  //  console.log('sjogrensSymptomsStartYYYYNA_onChange' +  e.target.checked);

    if (e.target.checked){
        let errorsClone = Object.assign({},this.state.errors);
        //remove field we just type into from errors.
        delete errorsClone['sjogrensSymptomsStartYYYY'];
        delete errorsClone['sjogrensSymptomsStartYYYYRange'];
        //copy clone back to errors in state
        this.setState({ 
            errors:errorsClone,
            sjogrensSymptomsStartYYYY:'',
            sjogrensSymptomsStartYYYYNA: !this.state.sjogrensSymptomsStartYYYYNA,
            changed:true,
         });
     
        }
        else{
         this.setState({
            sjogrensSymptomsStartYYYYNA: !this.state.sjogrensSymptomsStartYYYYNA,
             changed:true,
           //  metCriteria: this.patientMetCriteria()
         })
        }


}


//////////////////////////////////////////////////


////START


sjogrensSymptomsSuggestiveStartMM_onChange(e){
    
      //  console.log('sjogrensSymptomsStartMM_onChange');


        if (!!this.state.errors['sjogrensSymptomsSuggestiveStartMM'] || !!this.state.errors['sjogrensSymptomsSuggestiveStartMMRange'] ){
            //One of the above error has occurred 
         //   console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['sjogrensSymptomsSuggestiveStartMM'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && validMonth(e.target.value)) {
            //console.log('Entered value is ok');
            delete errorsClone['sjogrensSymptomsSuggestiveStartMMRange'];
           }
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsSuggestiveStartMM:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
          }
           else {
    
               if (e.target.value.length > 0  && !validMonth(e.target.value)) {
                   //no errors for this field existed before
                  //console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.sjogrensSymptomsSuggestiveStartMMRange =  DiagnosisValidationMessages.sjogrensSymptomsSuggestive.monthRange;//'Please provide a valid month between 01-12';
    
                   this.setState({
                               errors:errorsClone,
                               sjogrensSymptomsSuggestiveStartMM:e.target.value,
                               //histopathologyAYearPerformedNA: false,   
                               changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                            sjogrensSymptomsSuggestiveStartMM:e.target.value,
                            //histopathologyAYearPerformedNA: false,   
                            changed:true
                           })
                       }
               }
    }

    
sjogrensSymptomsSuggestiveStartMM_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
        // if (!digitsRange(e.key,1,12)) {
        //     e.preventDefault(); 
        // }

        this.setState({
            sjogrensSymptomsSuggestiveStartMMNA:false
        })
    }


sjogrensSymptomsSuggestiveStartMMNA_onChange(e){
      //  console.log('sjogrensSymptomsSuggestiveStartYYYYNA_onChange' +  e.target.checked)
//

if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['sjogrensSymptomsSuggestiveStartMM'];
    delete errorsClone['sjogrensSymptomsSuggestiveStartMMRange'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        sjogrensSymptomsSuggestiveStartMM:'',
        sjogrensSymptomsSuggestiveStartMMNA: !this.state.sjogrensSymptomsSuggestiveStartMMNA,
        changed:true,
     });
 
    }
    else{
     this.setState({
        sjogrensSymptomsSuggestiveStartMMNA: !this.state.sjogrensSymptomsSuggestiveStartMMNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }


        //
    }
    

    
sjogrensSymptomsSuggestiveStartYYYY_onBlur(e){
    // console.log('sjogrensSymptomsSuggestiveStartYYYY_onBlur');


    if (!!this.state.errors['sjogrensSymptomsSuggestiveStartYYYY'] || !!this.state.errors['sjogrensSymptomsSuggestiveStartYYYYRange'] ){
        //One of the above error has occurred 
        //console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
        delete errorsClone['sjogrensSymptomsSuggestiveStartYYYY'];
       // delete errorsClone['sjogrensSymptomsStartYYYYRange'];
       //Only delete range error if current value is ok
       if (this.state.sjogrensSymptomsSuggestiveStartYYYY.length > 0  && validYear(this.state.sjogrensSymptomsSuggestiveStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestiveYearMin)) {
        //console.log('Entered value is ok');
        delete errorsClone['sjogrensSymptomsSuggestiveStartYYYYRange'];
       }
     
     //copy clone back to errors in state
       this.setState({
       // [e.target.name]: e.target.value,
           errors:errorsClone,
         //  sjogrensSymptomsStartYYYY:e.target.value,
           //histopathologyAYearPerformedNA: false,   
           //changed:true
       });
      }
       else {

           if (this.state.sjogrensSymptomsSuggestiveStartYYYY.length > 0  && !validYear(this.state.sjogrensSymptomsSuggestiveStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestiveYearMin)) {
               //no errors for this field existed before
              // console.log('no errors for this field existed before')
             //  console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);
               errorsClone.sjogrensSymptomsSuggestiveStartYYYYRange =  DiagnosisValidationMessages.sjogrensSymptomsSuggestive.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year();

               this.setState({
                           errors:errorsClone,
                         //  sjogrensSymptomsStartYYYY:e.target.value,
                           //histopathologyAYearPerformedNA: false,   
                          // changed:true,
                       })
           } 
           else {
                // console.log('no invalid values update state with no error');
                //no invalid values update state with no error
                 //clone object from state 
             let errorsClone = Object.assign({},this.state.errors);
                 this.setState({
                        errors:errorsClone
                       // sjogrensSymptomsStartYYYY:e.target.value,
                        //histopathologyAYearPerformedNA: false,   
                        //changed:true
                       })
                   }
           }


}
    
sjogrensSymptomsSuggestiveStartYYYY_onChange(e){
         //console.log('sjogrensSymptomsStartYYYY_onChange');


        // if (!!this.state.errors['sjogrensSymptomsStartYYYY'] || !!this.state.errors['sjogrensSymptomsStartYYYYRange'] ){
        //     //One of the above error has occurred 
        //     console.log('One of the above error has occurred');
        //   //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
        //   //remove field we just type into from errors.
        //   // delete errorsClone[e.target.name];
        //    //Delete the required field      
            delete errorsClone['sjogrensSymptomsSuggestiveStartYYYY'];
            delete errorsClone['sjogrensSymptomsSuggestiveStartYYYYRange'];
        //    //Only delete range error if current value is ok
        //    if (e.target.value.length > 0  && validYear(e.target.value)) {
        //     console.log('Entered value is ok');
        //     delete errorsClone['sjogrensSymptomsStartYYYYRange'];
        //    }
         
        //  //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsSuggestiveStartYYYY:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
        //   }
        //    else {
    
        //        if (e.target.value.length > 0  && !validYear(e.target.value)) {
        //            //no errors for this field existed before
        //            console.log('no errors for this field existed before')
        //            console.log('and user has eneterd invalid value')
        //            //and user has eneterd invalid value
        //            //clone errors and add to state
        //            let errorsClone = Object.assign({},this.state.errors);
        //            errorsClone.sjogrensSymptomsStartYYYYRange = 'Please provide a valid year between 1920 and ' + Moment().year();
    
        //            this.setState({
        //                        errors:errorsClone,
        //                        sjogrensSymptomsStartYYYY:e.target.value,
        //                        //histopathologyAYearPerformedNA: false,   
        //                        changed:true,
        //                    })
        //        } 
        //        else {
        //              console.log('no invalid values update state with no error');
        //             //no invalid values update state with no error
        //              this.setState({
        //                     sjogrensSymptomsStartYYYY:e.target.value,
        //                     //histopathologyAYearPerformedNA: false,   
        //                     changed:true
        //                    })
        //                }
        //        }


    }
    
sjogrensSymptomsSuggestiveStartYYYY_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
       
        this.setState({
            sjogrensSymptomsSuggestiveStartYYYYNA:false
        })
    
    }

    
sjogrensSymptomsSuggestiveStartYYYYNA_onChange(e){
  //  console.log('sjogrensSymptomsStartYYYYNA_onChange' +  e.target.checked);

    if (e.target.checked){
        let errorsClone = Object.assign({},this.state.errors);
        //remove field we just type into from errors.
        delete errorsClone['sjogrensSymptomsSuggestiveStartYYYY'];
        delete errorsClone['sjogrensSymptomsSuggestiveStartYYYYRange'];
        //copy clone back to errors in state
        this.setState({ 
            errors:errorsClone,
            sjogrensSymptomsSuggestiveStartYYYY:'',
            sjogrensSymptomsSuggestiveStartYYYYNA: !this.state.sjogrensSymptomsSuggestiveStartYYYYNA,
            changed:true,
         });
     
        }
        else{
         this.setState({
            sjogrensSymptomsSuggestiveStartYYYYNA: !this.state.sjogrensSymptomsSuggestiveStartYYYYNA,
             changed:true,
           //  metCriteria: this.patientMetCriteria()
         })
        }


}


/////END



///START SUGGESTED


sjogrensSymptomsSuggestedStartMM_onChange(e){
    
      //  console.log('sjogrensSymptomsStartMM_onChange');


        if (!!this.state.errors['sjogrensSymptomsSuggestedStartMM'] || !!this.state.errors['sjogrensSymptomsSuggestedStartMMRange'] ){
            //One of the above error has occurred 
         //   console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['sjogrensSymptomsSuggestedStartMM'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && validMonth(e.target.value)) {
            //console.log('Entered value is ok');
            delete errorsClone['sjogrensSymptomsSuggestedStartMMRange'];
           }
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsSuggestedStartMM:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
          }
           else {
    
               if (e.target.value.length > 0  && !validMonth(e.target.value)) {
                   //no errors for this field existed before
                  //console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.sjogrensSymptomsSuggestedStartMMRange =  DiagnosisValidationMessages.sjogrensSymptomsSuggested.monthRange;//'Please provide a valid month between 01-12';
    
                   this.setState({
                               errors:errorsClone,
                               sjogrensSymptomsSuggestedStartMM:e.target.value,
                               //histopathologyAYearPerformedNA: false,   
                               changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                            sjogrensSymptomsSuggestedStartMM:e.target.value,
                            //histopathologyAYearPerformedNA: false,   
                            changed:true
                           })
                       }
               }
    }

    
sjogrensSymptomsSuggestedStartMM_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
        // if (!digitsRange(e.key,1,12)) {
        //     e.preventDefault(); 
        // }

        this.setState({
            sjogrensSymptomsSuggestedStartMMNA:false
        })
    }


sjogrensSymptomsSuggestedStartMMNA_onChange(e){
      //  console.log('sjogrensSymptomsSuggestiveStartYYYYNA_onChange' +  e.target.checked)
//

if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['sjogrensSymptomsSuggestedStartMM'];
    delete errorsClone['sjogrensSymptomsSuggestedStartMMRange'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        sjogrensSymptomsSuggestedStartMM:'',
        sjogrensSymptomsSuggestedStartMMNA: !this.state.sjogrensSymptomsSuggestedStartMMNA,
        changed:true,
     });
 
    }
    else{
     this.setState({
        sjogrensSymptomsSuggestedStartMMNA: !this.state.sjogrensSymptomsSuggestedStartMMNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }


        //
    }
    

    
sjogrensSymptomsSuggestedStartYYYY_onBlur(e){
    // console.log('sjogrensSymptomsSuggestiveStartYYYY_onBlur');


    if (!!this.state.errors['sjogrensSymptomsSuggestedStartYYYY'] || !!this.state.errors['sjogrensSymptomsSuggestedStartYYYYRange'] ){
        //One of the above error has occurred 
        //console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
        delete errorsClone['sjogrensSymptomsSuggestedStartYYYY'];
       // delete errorsClone['sjogrensSymptomsStartYYYYRange'];
       //Only delete range error if current value is ok
       if (this.state.sjogrensSymptomsSuggestedStartYYYY.length > 0  && validYear(this.state.sjogrensSymptomsSuggestedStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestedYearMin)) {
        //console.log('Entered value is ok');
        delete errorsClone['sjogrensSymptomsSuggestedStartYYYYRange'];
       }
     
     //copy clone back to errors in state
       this.setState({
       // [e.target.name]: e.target.value,
           errors:errorsClone,
         //  sjogrensSymptomsStartYYYY:e.target.value,
           //histopathologyAYearPerformedNA: false,   
           //changed:true
       });
      }
       else {

           if (this.state.sjogrensSymptomsSuggestedStartYYYY.length > 0  && !validYear(this.state.sjogrensSymptomsSuggestedStartYYYY, DiagnosisFields.sjogrensSymptomsSuggestedYearMin)) {
               //no errors for this field existed before
              // console.log('no errors for this field existed before')
             //  console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);
               errorsClone.sjogrensSymptomsSuggestedStartYYYYRange =  DiagnosisValidationMessages.sjogrensSymptomsSuggested.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year();

               this.setState({
                           errors:errorsClone,
                         //  sjogrensSymptomsStartYYYY:e.target.value,
                           //histopathologyAYearPerformedNA: false,   
                          // changed:true,
                       })
           } 
           else {
                // console.log('no invalid values update state with no error');
                //no invalid values update state with no error
                 //clone object from state 
             let errorsClone = Object.assign({},this.state.errors);
                 this.setState({
                        errors:errorsClone
                       // sjogrensSymptomsStartYYYY:e.target.value,
                        //histopathologyAYearPerformedNA: false,   
                        //changed:true
                       })
                   }
           }


}
    
sjogrensSymptomsSuggestedStartYYYY_onChange(e){
         //console.log('sjogrensSymptomsStartYYYY_onChange');


        // if (!!this.state.errors['sjogrensSymptomsStartYYYY'] || !!this.state.errors['sjogrensSymptomsStartYYYYRange'] ){
        //     //One of the above error has occurred 
        //     console.log('One of the above error has occurred');
        //   //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
        //   //remove field we just type into from errors.
        //   // delete errorsClone[e.target.name];
        //    //Delete the required field      
            delete errorsClone['sjogrensSymptomsSuggestedStartYYYY'];
            delete errorsClone['sjogrensSymptomsSuggestedStartYYYYRange'];
        //    //Only delete range error if current value is ok
        //    if (e.target.value.length > 0  && validYear(e.target.value)) {
        //     console.log('Entered value is ok');
        //     delete errorsClone['sjogrensSymptomsStartYYYYRange'];
        //    }
         
        //  //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensSymptomsSuggestedStartYYYY:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
        //   }
        //    else {
    
        //        if (e.target.value.length > 0  && !validYear(e.target.value)) {
        //            //no errors for this field existed before
        //            console.log('no errors for this field existed before')
        //            console.log('and user has eneterd invalid value')
        //            //and user has eneterd invalid value
        //            //clone errors and add to state
        //            let errorsClone = Object.assign({},this.state.errors);
        //            errorsClone.sjogrensSymptomsStartYYYYRange = 'Please provide a valid year between 1920 and ' + Moment().year();
    
        //            this.setState({
        //                        errors:errorsClone,
        //                        sjogrensSymptomsStartYYYY:e.target.value,
        //                        //histopathologyAYearPerformedNA: false,   
        //                        changed:true,
        //                    })
        //        } 
        //        else {
        //              console.log('no invalid values update state with no error');
        //             //no invalid values update state with no error
        //              this.setState({
        //                     sjogrensSymptomsStartYYYY:e.target.value,
        //                     //histopathologyAYearPerformedNA: false,   
        //                     changed:true
        //                    })
        //                }
        //        }


    }
    
sjogrensSymptomsSuggestedStartYYYY_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
       
        this.setState({
            sjogrensSymptomsSuggestedStartYYYYNA:false
        })
    
    }

    
sjogrensSymptomsSuggestedStartYYYYNA_onChange(e){
  //  console.log('sjogrensSymptomsStartYYYYNA_onChange' +  e.target.checked);

    if (e.target.checked){
        let errorsClone = Object.assign({},this.state.errors);
        //remove field we just type into from errors.
        delete errorsClone['sjogrensSymptomsSuggestedStartYYYY'];
        delete errorsClone['sjogrensSymptomsSuggestedStartYYYYRange'];
        //copy clone back to errors in state
        this.setState({ 
            errors:errorsClone,
            sjogrensSymptomsSuggestedStartYYYY:'',
            sjogrensSymptomsSuggestedStartYYYYNA: !this.state.sjogrensSymptomsSuggestedStartYYYYNA,
            changed:true,
         });
     
        }
        else{
         this.setState({
            sjogrensSymptomsSuggestedStartYYYYNA: !this.state.sjogrensSymptomsSuggestedStartYYYYNA,
             changed:true,
           //  metCriteria: this.patientMetCriteria()
         })
        }


}


///END SUGGESTED

sjogrensDiagnosisMM_onChange(e){
    
      //  console.log('sjogrensDiagnosisMM_onChange');


        if (!!this.state.errors['sjogrensDiagnosisMM'] || !!this.state.errors['sjogrensDiagnosisMMRange'] ){
            //One of the above error has occurred 
         //   console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['sjogrensDiagnosisMM'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0  && validMonth(e.target.value)) {
           // console.log('Entered value is ok');
            delete errorsClone['sjogrensDiagnosisMMRange'];
           }
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensDiagnosisMM:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               changed:true
           });
          }
           else {
    
               if (e.target.value.length > 0  && !validMonth(e.target.value)) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                 //  console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.sjogrensDiagnosisMMRange =  DiagnosisValidationMessages.sjogrensDiagnosis.monthRange;//'Please provide a valid month between 01-12';
    
                   this.setState({
                               errors:errorsClone,
                               sjogrensDiagnosisMM:e.target.value,
                               //histopathologyAYearPerformedNA: false,   
                               changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                            sjogrensDiagnosisMM:e.target.value,
                            //histopathologyAYearPerformedNA: false,   
                            changed:true
                           })
                       }
               }
    }

    
sjogrensDiagnosisMM_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
        // if (!digitsRange(e.key,1,12)) {
        //     e.preventDefault(); 
        // }

        this.setState({
            sjogrensDiagnosisMMNA:false
        })
    }


sjogrensDiagnosisMMNA_onChange(e){
       // console.log('sjogrensDiagnosisYYYNA_onChange' +  e.target.checked)


if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['sjogrensDiagnosisMM'];
    delete errorsClone['sjogrensDiagnosisMMRange'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        sjogrensDiagnosisMM:'',
        sjogrensDiagnosisMMNA: !this.state.sjogrensDiagnosisMMNA,
        changed:true,
     });
 
    }
    else{
     this.setState({
        sjogrensDiagnosisMMNA: !this.state.sjogrensDiagnosisMMNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }


        //
    }
    
    
sjogrensDiagnosisYYYY_onChange(e){
       // console.log('sjogrensDiagnosisYYYY_onChange');


        // if (!!this.state.errors['sjogrensDiagnosisYYYY'] || !!this.state.errors['sjogrensDiagnosisYYYYRange'] ){
        //     //One of the above error has occurred 
        //     console.log('One of the above error has occurred');
        //   //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
        //   //remove field we just type into from errors.
        //   // delete errorsClone[e.target.name];
        //    //Delete the required field      
        delete errorsClone['sjogrensDiagnosisYYYY'];
        delete errorsClone['sjogrensDiagnosisYYYYRange'];
        //    //Only delete range error if current value is ok
        //    if (e.target.value.length > 0  && validYear(e.target.value)) {
        //     console.log('Entered value is ok');
        //     delete errorsClone['sjogrensDiagnosisYYYYRange'];
        //    }
         
        //  //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               sjogrensDiagnosisYYYY:e.target.value,
               histopathologyAYearPerformedNA: false,   
               changed:true
           });
        //   }
        //    else {
    
        //        if (e.target.value.length > 0  && !validYear(e.target.value)) {
        //            //no errors for this field existed before
        //            console.log('no errors for this field existed before')
        //            console.log('and user has eneterd invalid value')
        //            //and user has eneterd invalid value
        //            //clone errors and add to state
        //            let errorsClone = Object.assign({},this.state.errors);
        //            errorsClone.sjogrensDiagnosisYYYYRange = 'Please provide a valid year between 1920 and ' + Moment().year();
    
        //            this.setState({
        //                        errors:errorsClone,
        //                        sjogrensDiagnosisYYYY:e.target.value,
        //                        //histopathologyAYearPerformedNA: false,   
        //                        changed:true,
        //                    })
        //        } 
        //        else {
        //              console.log('no invalid values update state with no error');
        //             //no invalid values update state with no error
        //              this.setState({
        //                     sjogrensDiagnosisYYYY:e.target.value,
        //                     //histopathologyAYearPerformedNA: false,   
        //                     changed:true
        //                    })
        //                }
        //        }


    }
    


    sjogrensDiagnosisYYYY_onBlur(e){
       // console.log('sjogrensDiagnosisYYYY_onBlur');
 
 
         if (!!this.state.errors['sjogrensDiagnosisYYYY'] || !!this.state.errors['sjogrensDiagnosisYYYYRange'] ){
             //One of the above error has occurred 
             //console.log('One of the above error has occurred');
           //clone object from state 
           let errorsClone = Object.assign({},this.state.errors);
           //remove field we just type into from errors.
           // delete errorsClone[e.target.name];
            //Delete the required field      
         delete errorsClone['sjogrensDiagnosisYYYY'];
            //Only delete range error if current value is ok
            if (this.state.sjogrensDiagnosisYYYY.length > 0  && validYear(this.state.sjogrensDiagnosisYYYY, DiagnosisFields.sjogrensDiagnosisYearMin)) {
             //console.log('Entered value is ok');
             delete errorsClone['sjogrensDiagnosisYYYYRange'];
            }
          
          //copy clone back to errors in state
            this.setState({
            // [e.target.name]: e.target.value,
                errors:errorsClone,
                // sjogrensDiagnosisYYYY:e.target.value,
                // histopathologyAYearPerformedNA: false,   
                // changed:true
            });
           }
            else {
    // console.log('Sjogrens Diagnosis YYYYY 1')
                if (this.state.sjogrensDiagnosisYYYY.length > 0  && !validYear(this.state.sjogrensDiagnosisYYYY, DiagnosisFields.sjogrensDiagnosisYearMin)) {
                   // console.log('Sjogrens Diagnosis YYYYY 2')
                    //no errors for this field existed before
                    //console.log('no errors for this field existed before')
                    //console.log('and user has eneterd invalid value')
                    //and user has eneterd invalid value
                    //clone errors and add to state
                    let errorsClone = Object.assign({},this.state.errors);
                    errorsClone.sjogrensDiagnosisYYYYRange =  DiagnosisValidationMessages.sjogrensDiagnosis.yearRange;//'Please provide a valid year between 1920 and ' + Moment().year();
     
                    this.setState({
                                errors:errorsClone,
                               // sjogrensDiagnosisYYYY:e.target.value,
                                //histopathologyAYearPerformedNA: false,   
                               // changed:true,
                            })
                } 
                else {
                   //   console.log('no invalid values update state with no error');
                     // console.log('Sjogrens Diagnosis YYYYY 3')
                     //no invalid values update state with no error
                     //clone object from state 
           let errorsClone = Object.assign({},this.state.errors);
                      this.setState({
                             errors:errorsClone,
                             //sjogrensDiagnosisYYYY:e.target.value,
                             //histopathologyAYearPerformedNA: false,   
                             //changed:true
                            })
                        }
                }
 
 
     }

sjogrensDiagnosisYYYY_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    
       
        this.setState({
            sjogrensDiagnosisYYYYNA:false
        })
    
    }

    
sjogrensDiagnosisYYYYNA_onChange(e){
   // console.log('sjogrensDiagnosisYYYYNA_onChange' +  e.target.checked);

    if (e.target.checked){
        let errorsClone = Object.assign({},this.state.errors);
        //remove field we just type into from errors.
        delete errorsClone['sjogrensDiagnosisYYYY'];
        delete errorsClone['sjogrensDiagnosisYYYYRange'];
        //copy clone back to errors in state
        this.setState({ 
            errors:errorsClone,
            sjogrensDiagnosisYYYY:'',
            sjogrensDiagnosisYYYYNA: !this.state.sjogrensDiagnosisYYYYNA,
            changed:true,
         });
     
        }
        else{
         this.setState({
            sjogrensDiagnosisYYYYNA: !this.state.sjogrensDiagnosisYYYYNA,
             changed:true,
           //  metCriteria: this.patientMetCriteria()
         })
        }


}


///////////////////////////////////////////////////


optAlternateDiagnosis_onChange(e){
     //console.log('optAlternateDiagnosis_onChange' +  e.target.value)

     if (!!this.state.errors['alternateDiagnosis'] || !!this.state.errors['otherAlternateDiagnosis']){
        //One of the above error has occurred 
       // console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
       delete errorsClone['alternateDiagnosis'];
       delete errorsClone['otherAlternateDiagnosis'];

     //copy clone back to errors in state
       this.setState({
        //[e.target.name]: e.target.value,
           errors:errorsClone,
           alternateDiagnosis:e.target.value,
           otherAlternateDiagnosis:'',
           sjogrensSymptomsSuggestedStartMM:'',
           sjogrensSymptomsSuggestedStartMMNA: false,
           sjogrensSymptomsSuggestedStartYYYY: '',
           sjogrensSymptomsSuggestedStartYYYYNA: false,
           changed:true
       });
      }
    else {
        this.setState({
            alternateDiagnosis: e.target.value,
            otherAlternateDiagnosis:'',
            sjogrensSymptomsSuggestedStartMM:'',
            sjogrensSymptomsSuggestedStartMMNA: false,
            sjogrensSymptomsSuggestedStartYYYY: '',
            sjogrensSymptomsSuggestedStartYYYYNA: false,
            changed:true,
        })
    }
}



 optPatientHasPhysiciansDiagnosis_onChange(e){
//console.log('optPatientHasPhysiciansDiagnosis_onChange ' +  e.target.value)
    let errorsClone = Object.assign({},this.state.errors);
    delete errorsClone['alternateDiagnosis'];
    delete errorsClone['otherAlternateDiagnosis'];
    delete errorsClone['sjogrensSymptomsStartMM'];
    delete errorsClone['sjogrensSymptomsStartMMRange'];
    delete errorsClone['sjogrensSymptomsStartYYYY'];
    delete errorsClone['sjogrensSymptomsStartYYYYRange'];
    delete errorsClone['sjogrensSymptomsSuggestiveStartMM'];
    delete errorsClone['sjogrensSymptomsSuggestiveStartMMRange'];
    delete errorsClone['sjogrensSymptomsSuggestiveStartYYYY'];
    delete errorsClone['sjogrensSymptomsSuggestiveStartYYYYRange'];
    delete errorsClone['sjogrensDiagnosisMM'];
    delete errorsClone['sjogrensDiagnosisMMRange'];
    delete errorsClone['sjogrensDiagnosisYYYY'];
    delete errorsClone['sjogrensDiagnosisYYYYRange'];

     this.setState({
        patientHasPhysiciansDiagnosis : e.target.value,
        alternateDiagnosis:'',
        otherAlternateDiagnosis:'',
         changed:true,
         sjogrensSymptomsStartMM:'',
         sjogrensSymptomsStartMMNA: false,
         sjogrensSymptomsStartYYYY: '',
         sjogrensSymptomsStartYYYYNA: false,
         sjogrensSymptomsSuggestiveStartMM:'',
         sjogrensSymptomsSuggestiveStartMMNA: false,
         sjogrensSymptomsSuggestiveStartYYYY: '',
         sjogrensSymptomsSuggestiveStartYYYYNA: false,
         sjogrensDiagnosisMM: '',
         sjogrensDiagnosisMMNA: false,
         sjogrensDiagnosisYYYY:'',
         sjogrensDiagnosisYYYYNA: false,
         sjogrensSymptomsSuggestedStartMM:'',
         sjogrensSymptomsSuggestedStartMMNA: false,
         sjogrensSymptomsSuggestedStartYYYY: '',
         sjogrensSymptomsSuggestedStartYYYYNA: false,
         errors:errorsClone
       //  metCriteria: this.patientMetCriteria()
     })
 }


 
 otherAlternateDiagnosis_onChange(e){
    //console.log('otherAlternateDiagnosis_onChange');


    if (!!this.state.errors['otherAlternateDiagnosis']){
        //One of the above error has occurred 
       // console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
       delete errorsClone['otherAlternateDiagnosis'];
       
     
     //copy clone back to errors in state
       this.setState({
        //[e.target.name]: e.target.value,
           errors:errorsClone,
           otherAlternateDiagnosis:e.target.value,
          // ocularSignsObjectiveARNA:false,
           changed:true
       });
      }
       else {
                // console.log('no invalid values update state with no error');
                //no invalid values update state with no error
                 this.setState({
                    otherAlternateDiagnosis:e.target.value,
                        changed:true
                       })
           }
}



 renderAuditData(){
   // console.log(this.state.createdDateTime);
  //  console.log(this.state.lastUpdatedDateTime);
        return (
            <AuditData createdBy={this.state.createdUser} createdDate={this.state.createdDateTime}  lastUpdatedBy={this.state.lastUpdatedUser} lastUpdatedDate={this.state.lastUpdatedDateTime}/>
            
        )
    }

    
renderSaveButton() {
    return (
        <button 
        type="submit" 
        name="patientBaseline-save-btn"  
        onClick={this.handleSaveVisitHeader}
        id="patient-baseline-btn"
        className="btn btn-success pull-right">
            <i className="fa fa-floppy-o mr-1" aria-hidden="true"></i><span>Save</span>
    </button>
    )
    }
    
    
    renderSavingButton(){
     return (
     <button 
        type="submit" 
        name="patientBaseline-save-btn"  
        onClick={this.handleSaveVisitHeader}
        id="patient-baseline-btn"
        disabled
        className="btn btn-success pull-right">
            <span>Saving</span>
            <Spinner characterStyle={{ color: '#FFFFFF' }}/>
    </button>
     )
    }
    
    
    
    renderCompleteButton() {
        return (
    
            <div className="col-md-6">
            <div className="btn btn-danger complete-visit pull-right"  onClick={() => this.openVisitCompleteModal()}>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Complete
        </div>
        </div>
        )
        }
        
        
        renderCompletingButton(){
         return (
            <div className="col-md-6">
             <div className="btn btn-danger complete-visit pull-right">Completing
                <Spinner characterStyle={{ color: '#FFFFFF' }}/>
        </div>
        </div>
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
                            this.renderDiagnosis()
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
                            this.renderDiagnosis()
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
                    <h3 className="panel-title pull-left">Diagnosis</h3>
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
nextCategoryName = {VISIT_CATEGORY_CURRENTMEDICATIONS}
prevCategoryName = {VISIT_CATEGORY_AMERICANEUROPEANCGC}
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
                <h3 className="panel-title">Diagnosis</h3>
                
            </div>
           
            <div className="panel-body scrollbar-v-visit-content">
    {
        this.renderDiagnosis()
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
nextCategoryName = {VISIT_CATEGORY_CURRENTMEDICATIONS}
prevCategoryName = {VISIT_CATEGORY_AMERICANEUROPEANCGC}
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
    

renderDiagnosis(){
    
    return (
        <div>
            <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">Does the patient have a physicians diagnosis of primary Sjogren's Syndrome?</div>  


                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                        <FunkyRadioThreeOptionsVertical caption={""}
                        optionName={"patientHasPhysiciansDiagnosis"}
                        optionOneId={"optPatientHasPhysiciansDiagnosisYes"}
                        optionTwoId={"optPatientHasPhysiciansDiagnosisNo"}
                        optionThreeId={"optPatientHasPhysiciansDiagnosisNoButConsidered"}
                        optionOneHtmlFor={"optPatientHasPhysiciansDiagnosisYes"}
                        optionTwoHtmlFor={"optPatientHasPhysiciansDiagnosisNo"}
                        optionThreeHtmlFor={"optPatientHasPhysiciansDiagnosisNoButConsidered"}

                            optionOneChecked={this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId}
                            optionOneDefaultValue={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId}
                            optionOneOnClick={this.optPatientHasPhysiciansDiagnosis_onChange}
                            optionOneCaption={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValue}
                            
                            optionTwoChecked={this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId}
                            optionTwoDefaultValue={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId}
                            optionTwoOnClick={this.optPatientHasPhysiciansDiagnosis_onChange}
                            optionTwoCaption={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValue}
                            
                            optionThreeChecked={this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValueId}
                            optionThreeDefaultValue={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValueId}
                            optionThreeOnClick={this.optPatientHasPhysiciansDiagnosis_onChange}
                            optionThreeCaption={patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValue} />

                            <span className={classnames('col-md-offset-6 col-md-6 col-sm-12',{'visible error info':this.state.errors.alternateDiagnosis})}><span>{this.state.errors.alternateDiagnosis}</span></span>
                            </div>
                            </div>   
{
    (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[1].controlValueId) && 


<div className="row">
                <div className="col-md-12"> 
                <div className="page-header">Please select one of the following diagnoses?</div>  

      <FadeIn>          
      <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
    <FunkyRadioFourOptionsVertical caption={""}
                        optionName={"alternateDiagnosis "}
                        optionOneId={"optAlternateDiagnosisNIS"}
                        optionTwoId={"optAlternateDiagnosisSSS"}
                        optionThreeId={"optAlternateDiagnosisIgG4S"}
                        optionFourId={"optAlternateDiagnosisOther"}
                        optionOneHtmlFor={"optAlternateDiagnosisNIS"}
                        optionTwoHtmlFor={"optAlternateDiagnosisSSS"}
                        optionThreeHtmlFor={"optAlternateDiagnosisIgG4S"}
                        optionFourHtmlFor={"optAlternateDiagnosisOther"}

                            optionOneChecked={this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[0].controlValueId}
                            optionOneDefaultValue={alternateDiagnosis.optAlternateDiagnosis[0].controlValueId}
                            optionOneOnClick={this.optAlternateDiagnosis_onChange}
                            optionOneCaption={alternateDiagnosis.optAlternateDiagnosis[0].controlValue}
                            
                            optionTwoChecked={this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[1].controlValueId}
                            optionTwoDefaultValue={alternateDiagnosis.optAlternateDiagnosis[1].controlValueId}
                            optionTwoOnClick={this.optAlternateDiagnosis_onChange}
                            optionTwoCaption={alternateDiagnosis.optAlternateDiagnosis[1].controlValue}
                            
                            optionThreeChecked={this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[2].controlValueId}
                            optionThreeDefaultValue={alternateDiagnosis.optAlternateDiagnosis[2].controlValueId}
                            optionThreeOnClick={this.optAlternateDiagnosis_onChange}
                            optionThreeCaption={alternateDiagnosis.optAlternateDiagnosis[2].controlValue} 
                            
                            optionFourChecked={this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId}
                            optionFourDefaultValue={alternateDiagnosis.optAlternateDiagnosis[3].controlValueId}
                            optionFourOnClick={this.optAlternateDiagnosis_onChange}
                            optionFourCaption={alternateDiagnosis.optAlternateDiagnosis[3].controlValue}
                            />
                            </div>
                            </div>
                            </FadeIn>
</div>
</div>
}
{
                                                (this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId)  &&
                                              <FadeIn>
                                                <div className="form-group row">
                                                <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                    <label className ="control-label col-md-3 col-sm-12">Please specify</label>
                                                    <div className={classnames('col-md-9 col-sm-12',{error:!!this.state.errors.otherAlternateDiagnosis})}>
                                                            <textarea rows="6" cols="60" maxLength="250" 
                                                                                    disabled={this.props.visitHeaderResult && 
                                                                                    this.props.visitHeaderResult.data && 
                                                                                    this.props.visitHeaderResult.data.completed ? true: false}
                                                            value={this.state.otherAlternateDiagnosis}
                                                            onChange={this.otherAlternateDiagnosis_onChange}
                                                            onMouseDown={ (e) => e.target.focus() }
                                                            ></textarea>
                                                            <span className={classnames('',{'visible error info':!!this.state.errors.otherAlternateDiagnosis,hidden:!!!this.state.errors.otherAlternateDiagnosis})}>{this.state.errors.otherAlternateDiagnosis}</span>                      
                                                    </div>
                                                </div>
                                            </div>

                                       
                       

</FadeIn>

}

                   
                                               
                       
                        

{
    (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId) && 

    <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">In which month and year did the symptoms of Sjogren's Syndrome first start?</div> 

<FadeIn>
                      

                       
<div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">
                      

                        
                                        <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsStartMM || !!this.state.errors['sjogrensSymptomsStartMMRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Month"}>
                                                
                                                            <input  className="form-control"
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsStartMM"
                                                                                name="sjogrensSymptomsStartMM" 
                                                                                ref="sjogrensSymptomsStartMM" 
                                                                                value={this.state.sjogrensSymptomsStartMM}
                                                                                onChange={this.sjogrensSymptomsStartMM_onChange}
                                                                                onKeyPress={this.sjogrensSymptomsStartMM_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="mm" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="2"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsMonthMin} max={DiagnosisFields.sjogrensSymptomsMonthMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                                        
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsStartMM,hidden:!!!this.state.errors.sjogrensSymptomsStartMM})}>{this.state.errors.sjogrensSymptomsStartMM}</span>                      
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsStartMMRange,hidden:!!!this.state.errors.sjogrensSymptomsStartMMRange})}>{this.state.errors.sjogrensSymptomsStartMMRange}</span>                      
                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsStartMMNA"  id="sjogrensSymptomsStartMMNA" 
                                                            checked={this.state.sjogrensSymptomsStartMM.length > 0 ? false :this.state.sjogrensSymptomsStartMMNA} 
                                                            onChange={this.sjogrensSymptomsStartMMNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsStartMMNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>



                                    <div className="col-md-offset-6 col-md-6 col-sm-12 mt-10">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsStartYYYY || !!this.state.errors['sjogrensSymptomsStartYYYYRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Year"}>
                                                
                                                        <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsStartYYYY"
                                                                                name="sjogrensSymptomsStartYYYY" 
                                                                                ref="sjogrensSymptomsStartYYYY" 
                                                                                value={this.state.sjogrensSymptomsStartYYYY}
                                                                                onChange={this.sjogrensSymptomsStartYYYY_onChange}
                                                                                onBlur={this.sjogrensSymptomsStartYYYY_onBlur}
                                                                                onKeyPress={this.sjogrensSymptomsStartYYYY_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="yyyy" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="4"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsYearMin} 
                                                                                max={DiagnosisFields.sjogrensSymptomsYearMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                           
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsStartYYYY,hidden:!!!this.state.errors.sjogrensSymptomsStartYYYY})}>{this.state.errors.sjogrensSymptomsStartYYYY}</span>                      
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsStartYYYYRange,hidden:!!!this.state.errors.sjogrensSymptomsStartYYYYRange})}>{this.state.errors.sjogrensSymptomsStartYYYYRange}</span>                      

                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsStartYYYYNA"  id="sjogrensSymptomsStartYYYYNA" 
                                                            checked={this.state.sjogrensSymptomsStartYYYY.length > 0 ? false :this.state.sjogrensSymptomsStartYYYYNA} 
                                                            onChange={this.sjogrensSymptomsStartYYYYNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsStartYYYYNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>



 </div>
 </div>                                  

</FadeIn>
                         
</div>
</div>
                   
}

{
    (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[0].controlValueId) &&  

    <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">And, In which month and year did the patient recieve a physicians diagnosis of Sjogren's Syndrome?</div>    

   <FadeIn>
   <div className="block block-inclusion-criteria-head no-pad">
   <div className="block-content-no-border">

                        
                       
                       
                                                
                                        <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensDiagnosisMM || !!this.state.errors['sjogrensDiagnosisMMRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Month"}>
                                                
                                                        <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensDiagnosisMM"
                                                                                name="sjogrensDiagnosisMM" 
                                                                                ref="sjogrensDiagnosisMM" 
                                                                                value={this.state.sjogrensDiagnosisMM}
                                                                                onChange={this.sjogrensDiagnosisMM_onChange}
                                                                                onKeyPress={this.sjogrensDiagnosisMM_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="mm" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="2"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensDiagnosisMonthMin} 
                                                                                max={DiagnosisFields.sjogrensDiagnosisMonthMax}
                                                                                
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensDiagnosisMM,hidden:!!!this.state.errors.sjogrensDiagnosisMM})}>{this.state.errors.sjogrensDiagnosisMM}</span>                      
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensDiagnosisMMRange,hidden:!!!this.state.errors.sjogrensDiagnosisMMRange})}>{this.state.errors.sjogrensDiagnosisMMRange}</span>                      


                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensDiagnosisMMNA"  id="sjogrensDiagnosisMMNA" 
                                                            checked={this.state.sjogrensDiagnosisMM.length > 0 ? false :this.state.sjogrensDiagnosisMMNA} 
                                                            onChange={this.sjogrensDiagnosisMMNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensDiagnosisMMNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>
                                    <div className="col-md-offset-6 col-md-6 col-sm-12 mt-10">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensDiagnosisYYYY || !!this.state.errors['sjogrensDiagnosisYYYYRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Year"}>
                                                
                                                        <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensDiagnosisYYYY"
                                                                                name="sjogrensDiagnosisYYYY" 
                                                                                ref="sjogrensDiagnosisYYYY" 
                                                                                value={this.state.sjogrensDiagnosisYYYY}
                                                                                onChange={this.sjogrensDiagnosisYYYY_onChange}
                                                                                onBlur={this.sjogrensDiagnosisYYYY_onBlur}
                                                                                onKeyPress={this.sjogrensDiagnosisYYYY_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="yyyy" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="4"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensDiagnosisYearMin} 
                                                                                max={DiagnosisFields.sjogrensDiagnosisYearMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensDiagnosisYYYY,hidden:!!!this.state.errors.sjogrensDiagnosisYYYY})}>{this.state.errors.sjogrensDiagnosisYYYY}</span>                      
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensDiagnosisYYYYRange,hidden:!!!this.state.errors.sjogrensDiagnosisYYYYRange})}>{this.state.errors.sjogrensDiagnosisYYYYRange}</span>                      


                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensDiagnosisYYYYNA"  id="sjogrensDiagnosisYYYYNA" 
                                                            checked={this.state.sjogrensDiagnosisYYYY.length > 0 ? false :this.state.sjogrensDiagnosisYYYYNA} 
                                                            onChange={this.sjogrensDiagnosisYYYYNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensDiagnosisYYYYNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>


</div>
<hr className="patient-baseline-inclusion-criteria-hr"/>
</div>
</FadeIn>   
</div>
</div>  
}



{
    (this.state.patientHasPhysiciansDiagnosis == patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis[2].controlValueId) && 


    
    <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">In which month and year did the symptoms suggestive of Sjogren's Syndrome first start?</div> 

<FadeIn>
<div className="block block-inclusion-criteria-head no-pad">
<div className="block-content-no-border">
                     
                      
                                
                                        <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsSuggestiveStartMM || !!this.state.errors['sjogrensSymptomsSuggestiveStartMMRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Month"}>
                                                
                                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsSuggestiveStartMM"
                                                                                name="sjogrensSymptomsSuggestiveStartMM" 
                                                                                ref="sjogrensSymptomsSuggestiveStartMM" 
                                                                                value={this.state.sjogrensSymptomsSuggestiveStartMM}
                                                                                onChange={this.sjogrensSymptomsSuggestiveStartMM_onChange}
                                                                                onKeyPress={this.sjogrensSymptomsSuggestiveStartMM_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="mm" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="2"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsSuggestiveMonthMin} max={DiagnosisFields.sjogrensSymptomsSuggestiveMonthMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                                        
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestiveStartMM,hidden:!!!this.state.errors.sjogrensSymptomsSuggestiveStartMM})}>{this.state.errors.sjogrensSymptomsSuggestiveStartMM}</span>                      
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestiveStartMMRange,hidden:!!!this.state.errors.sjogrensSymptomsSuggestiveStartMMRange})}>{this.state.errors.sjogrensSymptomsSuggestiveStartMMRange}</span>                      
                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsSuggestiveStartMMNA"  id="sjogrensSymptomsSuggestiveStartMMNA" 
                                                            checked={this.state.sjogrensSymptomsSuggestiveStartMM.length > 0 ? false :this.state.sjogrensSymptomsSuggestiveStartMMNA} 
                                                            onChange={this.sjogrensSymptomsSuggestiveStartMMNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsSuggestiveStartMMNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>
                                    <div className="col-md-offset-6 col-md-6 col-sm-12 mt-10">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsSuggestiveStartYYYY || !!this.state.errors['sjogrensSymptomsSuggestiveStartYYYYRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Year"}>
                                                
                                                        <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsSuggestiveStartYYYY"
                                                                                name="sjogrensSymptomsSuggestiveStartYYYY" 
                                                                                ref="sjogrensSymptomsSuggestiveStartYYYY" 
                                                                                value={this.state.sjogrensSymptomsSuggestiveStartYYYY}
                                                                                onChange={this.sjogrensSymptomsSuggestiveStartYYYY_onChange}
                                                                                onBlur={this.sjogrensSymptomsSuggestiveStartYYYY_onBlur}
                                                                                onKeyPress={this.sjogrensSymptomsSuggestiveStartYYYY_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="yyyy" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="4"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsSuggestiveYearMin} 
                                                                                max={DiagnosisFields.sjogrensSymptomsSuggestiveYearMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                           
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestiveStartYYYY,hidden:!!!this.state.errors.sjogrensSymptomsSuggestiveStartYYYY})}>{this.state.errors.sjogrensSymptomsSuggestiveStartYYYY}</span>                      
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestiveStartYYYYRange,hidden:!!!this.state.errors.sjogrensSymptomsSuggestiveStartYYYYRange})}>{this.state.errors.sjogrensSymptomsSuggestiveStartYYYYRange}</span>                      

                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsSuggestiveStartYYYYNA"  id="sjogrensSymptomsSuggestiveStartYYYYNA" 
                                                            checked={this.state.sjogrensSymptomsSuggestiveStartYYYY.length > 0 ? false :this.state.sjogrensSymptomsSuggestiveStartYYYYNA} 
                                                            onChange={this.sjogrensSymptomsSuggestiveStartYYYYNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsSuggestiveStartYYYYNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>
</div>
</div>

</FadeIn>
        </div>
        </div>                 

                   
}




{
    (this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[0].controlValueId ||
        this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[1].controlValueId ||
        this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[2].controlValueId ||
        this.state.alternateDiagnosis == alternateDiagnosis.optAlternateDiagnosis[3].controlValueId) && 

        <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">In which month and year did the symptoms that suggested the possiblity of Sjogren's syndrome start?</div> 

<FadeIn>
<div className="block block-inclusion-criteria-head no-pad">
<div className="block-content-no-border">
              
                     
                        
                               
                                        <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsSuggestedStartMM || !!this.state.errors['sjogrensSymptomsSuggestedStartMMRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Month"}>
                                                
                                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsSuggestedStartMM"
                                                                                name="sjogrensSymptomsSuggestedStartMM" 
                                                                                ref="sjogrensSymptomsSuggestedStartMM" 
                                                                                value={this.state.sjogrensSymptomsSuggestedStartMM}
                                                                                onChange={this.sjogrensSymptomsSuggestedStartMM_onChange}
                                                                                onKeyPress={this.sjogrensSymptomsSuggestedStartMM_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="mm" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="2"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsSuggestedMonthMin} max={DiagnosisFields.sjogrensSymptomsSuggestedMonthMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                                        
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestedStartMM,hidden:!!!this.state.errors.sjogrensSymptomsSuggestedStartMM})}>{this.state.errors.sjogrensSymptomsSuggestedStartMM}</span>                      
                                        <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestedStartMMRange,hidden:!!!this.state.errors.sjogrensSymptomsSuggestedStartMMRange})}>{this.state.errors.sjogrensSymptomsSuggestedStartMMRange}</span>                      
                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsSuggestedStartMMNA"  id="sjogrensSymptomsSuggestedStartMMNA" 
                                                            checked={this.state.sjogrensSymptomsSuggestedStartMM.length > 0 ? false :this.state.sjogrensSymptomsSuggestedStartMMNA} 
                                                            onChange={this.sjogrensSymptomsSuggestedStartMMNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsSuggestedStartMMNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>
                                    <div className="col-md-offset-6 col-md-6 col-sm-12 mt-10">
                                                <div className={classnames('col-lg-3 col-md-3 col-sm-6 pl-0',{error:!!this.state.errors.sjogrensSymptomsSuggestedStartYYYY || !!this.state.errors['sjogrensSymptomsSuggestedStartYYYYRange'] })}>
                                                
                                                <InputGroupAddOnL leftAddOn={"Year"}>
                                                
                                                        <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="sjogrensSymptomsSuggestedStartYYYY"
                                                                                name="sjogrensSymptomsSuggestedStartYYYY" 
                                                                                ref="sjogrensSymptomsSuggestedStartYYYY" 
                                                                                value={this.state.sjogrensSymptomsSuggestedStartYYYY}
                                                                                onChange={this.sjogrensSymptomsSuggestedStartYYYY_onChange}
                                                                                onBlur={this.sjogrensSymptomsSuggestedStartYYYY_onBlur}
                                                                                onKeyPress={this.sjogrensSymptomsSuggestedStartYYYY_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                placeholder="yyyy" 
                                                                                type="number" 
                                                                                step="1"
                                                                                maxLength="4"
                                                                                onInput={maxLengthCheck}
                                                                                min={DiagnosisFields.sjogrensSymptomsSuggestedYearMin} 
                                                                                max={DiagnosisFields.sjogrensSymptomsSuggestedYearMax}
                                                                                />
                                                                                
                                                    </InputGroupAddOnL>

                          
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestedStartYYYY,hidden:!!!this.state.errors.sjogrensSymptomsSuggestedStartYYYY})}>{this.state.errors.sjogrensSymptomsSuggestedStartYYYY}</span>                      
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.sjogrensSymptomsSuggestedStartYYYYRange,hidden:!!!this.state.errors.sjogrensSymptomsSuggestedStartYYYYRange})}>{this.state.errors.sjogrensSymptomsSuggestedStartYYYYRange}</span>                      

                                                    </div>


                                                    <div className="col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="sjogrensSymptomsSuggestedStartYYYYNA"  id="sjogrensSymptomsSuggestedStartYYYYNA" 
                                                            checked={this.state.sjogrensSymptomsSuggestedStartYYYY.length > 0 ? false :this.state.sjogrensSymptomsSuggestedStartYYYYNA} 
                                                            onChange={this.sjogrensSymptomsSuggestedStartYYYYNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="sjogrensSymptomsSuggestedStartYYYYNA">N/A</label>
                                                    </div>
                                                </div>
                                    </div>

</div>
</div>                                   

</FadeIn>
</div>
</div>                         

                   
}






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

 export default DiagnosisForm;

