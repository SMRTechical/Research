import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Prompt} from 'react-router-dom'
import classnames from 'classnames'
// import { NavLink, Link, Route } from 'react-router-dom'
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import InputGroupAddOnLR from '../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../components/generic/input/input-group-add-on-r';
import AuditData from '../../components/generic/audit-data';
//import Consent from '../../containers/patient/consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../config/controls/american-european-cgc';
import {patientHasPhysiciansDiagnosis,patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';
import {categories} from '../../config/categories';
import FunkyRadioThreeOptions from '../../components/generic/radio/funky-radio-three-options';
import FunkyRadioOneOption from '../../components/generic/radio/funky-radio-one-option';
import FunkyRadioTwoOptions from '../../components/generic/radio/funky-radio-two-options';
import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal';
import ObjectiveEvidenceModal from '../../components/visit/modals/objective-evidence-modal';
import {ocularSignsObjectiveValidation, objectiveEvidenceValidation, meetsAECGCCriteria, meets2016ACRECCriteria, maxLengthCheck,addZeroes} from '../../components/visit/modules/functions';
//import NumericInput from 'react-numeric-input';
import {isAlpha, isAlphanumericSpace, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {trim, left, right} from 'trim';
import {AECGC} from '../../constants/styles/input';
import ReactTooltip from 'react-tooltip';
import InputMask from 'react-input-mask';
import {AECGCValidationMessages} from '../../constants/information/messages';
import {AECGCFields} from '../../constants/information/field-length';
import DynamicNumber from 'react-dynamic-number';
import NumericInput from 'react-numeric-input';
import MaskedInput from 'react-maskedinput';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import VisitComplete from '../../containers/visit/visit-complete';
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
class AmericanEuropeanCGCForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mask:"99.99",
            preventBlur: false,
           // dateOfAttendance: this.props.dateOfAttendance,
           ocularSymptomsA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsA,this.props.visitResult.data.visits):'',
           ocularSymptomsB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsB,this.props.visitResult.data.visits):'',
           ocularSymptomsC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsC,this.props.visitResult.data.visits):'',

           oralSymptomsA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsA,this.props.visitResult.data.visits):'',
           oralSymptomsB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsB,this.props.visitResult.data.visits):'',
           oralSymptomsC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsC,this.props.visitResult.data.visits):'',

           ocularSignsObjectiveA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,this.props.visitResult.data.visits):'',
           ocularSignsObjectiveAR:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveARight,this.props.visitResult.data.details):'',
           ocularSignsObjectiveAL:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveALeft,this.props.visitResult.data.details):'',           
           ocularSignsObjectiveARNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveARightNA,this.props.visitResult.data.details):false,
           ocularSignsObjectiveALNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveALeftNA,this.props.visitResult.data.details):false,           
           
           ocularSignsObjectiveB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,this.props.visitResult.data.visits):'',
           
           objectiveEvidenceA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,this.props.visitResult.data.visits):'',
           objectiveEvidenceAMl:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMl,this.props.visitResult.data.details):'',
           objectiveEvidenceAMins:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMins,this.props.visitResult.data.details):'',           
           objectiveEvidenceANA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.chkObjectiveEvidenceANA,this.props.visitResult.data.details):'',

           objectiveEvidenceB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceB,this.props.visitResult.data.visits):'',
        //   objectiveEvidenceC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceC,this.props.visitResult.data.visits):'',

           histopathologyA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA,this.props.visitResult.data.visits):'',
           histopathologyAYearPerformed:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.txtHistopathologyAYearPerformed,this.props.visitResult.data.details):'',
           histopathologyAYearPerformedNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.chkHistopathologyAYearPerformedNA, this.props.visitResult.data.details):false,           
           
           autoAntibodiesA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,this.props.visitResult.data.visits):'',
           autoAntibodiesB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesB,this.props.visitResult.data.visits):'',
       
           alternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,this.props.visitResult.data.visits):'',
           

           
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
                 
           
            changed:false,
            ocularSignsModalOpen:false,
            ocularSignsObjectiveALRConfirmed:false,
            ocularSignsObjectiveALChanged:false,
            ocularSignsObjectiveARChanged:false,

            
            objectiveEvidenceModalOpen:false,
            objectiveEvidenceMinsConfirmed:false,
            objectiveEvidenceMinsChanged:false,

            errors:{},
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
        };
//console.log('dustbin')
        this.optOcularSymptomsA_onChange = this.optOcularSymptomsA_onChange.bind(this);
        this.optOcularSymptomsB_onChange = this.optOcularSymptomsB_onChange.bind(this);
        this.optOcularSymptomsC_onChange = this.optOcularSymptomsC_onChange.bind(this);

        this.optOralSymptomsA_onChange = this.optOralSymptomsA_onChange.bind(this);
        this.optOralSymptomsB_onChange = this.optOralSymptomsB_onChange.bind(this);
        this.optOralSymptomsC_onChange = this.optOralSymptomsC_onChange.bind(this);
        
     //   this.optOcularSignsObjectiveA_onChange = this.optOcularSignsObjectiveA_onChange.bind(this);
        this.ocularSignsObjectiveAR_onChange = this.ocularSignsObjectiveAR_onChange.bind(this);
        this.ocularSignsObjectiveARNA_onChange = this.ocularSignsObjectiveARNA_onChange.bind(this);
        this.ocularSignsObjectiveAL_onChange = this.ocularSignsObjectiveAL_onChange.bind(this);
        this.ocularSignsObjectiveALNA_onChange = this.ocularSignsObjectiveALNA_onChange.bind(this);
        this.optOcularSignsObjectiveB_onChange = this.optOcularSignsObjectiveB_onChange.bind(this);

        this.optObjectiveEvidenceA_onChange = this.optObjectiveEvidenceA_onChange.bind(this);
        this.objectiveEvidenceAMl_onChange = this.objectiveEvidenceAMl_onChange.bind(this);
        this.objectiveEvidenceAMins_onChange = this.objectiveEvidenceAMins_onChange.bind(this);
        this.objectiveEvidenceANA_onChange = this.objectiveEvidenceANA_onChange.bind(this);

        this.optObjectiveEvidenceB_onChange = this.optObjectiveEvidenceB_onChange.bind(this);
        this.optObjectiveEvidenceC_onChange = this.optObjectiveEvidenceC_onChange.bind(this);

        this.optHistopathologyA_onChange = this.optHistopathologyA_onChange.bind(this);
        this.histopathologyAYearPerformed_onChange = this.histopathologyAYearPerformed_onChange.bind(this);
        this.histopathologyAYearPerformed_onBlur = this.histopathologyAYearPerformed_onBlur.bind(this);
        
        this.optAutoAntibodiesA_onChange = this.optAutoAntibodiesA_onChange.bind(this);
        this.optAutoAntibodiesB_onChange = this.optAutoAntibodiesB_onChange.bind(this);

        this.handleSaveVisitHeader = this.handleSaveVisitHeader.bind(this);
        this.handleCompleteVisitHeader = this.handleCompleteVisitHeader.bind(this);
        this.getVisitOptionControlValue = this.getVisitOptionControlValue.bind(this);
        this.getDetailsControlValue = this.getDetailsControlValue.bind(this);
        this.ocularSignsModalClose = this.ocularSignsModalClose.bind(this);
        this.ocularSignsConfirmed = this.ocularSignsConfirmed.bind(this);

        this.ocularSignsObjectiveALR_onBlur = this.ocularSignsObjectiveALR_onBlur.bind(this);
        this.ocularSignsObjectiveAR_onKeyPress = this.ocularSignsObjectiveAR_onKeyPress.bind(this);
       // this.ocularSignsObjectiveAR_onKeyUp = this.ocularSignsObjectiveAR_onKeyUp.bind(this);
      //  this.ocularSignsObjectiveAL_onKeyUp = this.ocularSignsObjectiveAL_onKeyUp.bind(this);
        this.ocularSignsObjectiveAL_onKeyPress = this.ocularSignsObjectiveAL_onKeyPress.bind(this);

        this.objectiveEvidenceAMl_onKeyPress = this.objectiveEvidenceAMl_onKeyPress.bind(this);
        this.objectiveEvidenceAMl_onKeyUp = this.objectiveEvidenceAMl_onKeyUp.bind(this);
        this.objectiveEvidenceAMins_onKeyPress = this.objectiveEvidenceAMins_onKeyPress.bind(this);
        this.objectiveEvidenceModalClose = this.objectiveEvidenceModalClose.bind(this);
        this.objectiveEvidenceAMins_onBlur = this.objectiveEvidenceAMins_onBlur.bind(this);
        this.objectiveEvidenceConfirmed = this.objectiveEvidenceConfirmed.bind(this);

        this.histopathologyAYearPerformed_onKeyPress = this.histopathologyAYearPerformed_onKeyPress.bind(this);
        this.histopathologyAYearPerformedNA_onChange = this.histopathologyAYearPerformedNA_onChange.bind(this);

        this.renderAuditData = this.renderAuditData.bind(this);
        this.renderExistingAECGCHeaderPanel = this.renderExistingAECGCHeaderPanel.bind(this);
        this.renderNewAECGCHeaderPanel = this.renderNewAECGCHeaderPanel.bind(this);
        this.renderAmericanEuropeanConsensusGroupCriteria = this.renderAmericanEuropeanConsensusGroupCriteria.bind(this);
        this.maxLengthCheck_ml = this.maxLengthCheck_ml.bind(this);
        this.optBiopsyAnalysedAtUHB_onChange = this.optBiopsyAnalysedAtUHB_onChange.bind(this);

        this.objectiveEvidenceAMl_onBlur = this.objectiveEvidenceAMl_onBlur.bind(this);
        this.renderSaveButton = this.renderSaveButton.bind(this);
        this.renderSavingButton = this.renderSavingButton.bind(this);

        this.renderCompleteButton = this.renderCompleteButton.bind(this);
        this.renderCompletingButton = this.renderCompletingButton.bind(this)
        this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
        this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
        this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
       // this.handleSaveVisitComplete = this.handleSaveVisitComplete.bind(this);

       this.validateVisit = this.validateVisit.bind(this);
       this.getVisitValues = this.getVisitValues.bind(this);
       this.getDetailValues = this.getDetailValues.bind(this);
       this.renderFieldset = this.renderFieldset.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        //  this.ocularSignsObjectiveAR_onKeyUp = this.ocularSignsObjectiveAR_onKeyUp.bind(this);
    }

 
    // shouldComponentUpdate(nextProps, nextState) {
    //     // You can access `this.props` and `this.state` here
    //     // This function should return a boolean, whether the component should re-render.
    //     return !this.state.changed;
    //   }

    // ocularSignsObjectiveAR_onKeyUp(e){
    //     console.log('ocularSignsObjectiveAR_onKeyUp')
    //     console.log(e.target.value);

    //     if (e.target.value.length > 0){
    //         this.setState({
    //             ocularSignsObjectiveAR:parseInt(e.target.value)
    //     })
    //     }
    // }


     maxLengthCheck_ml(object) {
        // console.log('maxLengthCheck_ml');
        if ((object.target.value.length > object.target.maxLength) ||  (!twoDigitsOnly2DecimalPlaces(object.target.value)))
            {
                object.target.value = object.target.value.slice(0, object.target.maxLength)
            }
    }


validateVisit(){
    let errors = {};
    
      
          if( !this.state.ocularSignsObjectiveARNA && 
            this.state.ocularSignsObjectiveAR.length == 0 &&  
            this.state.ocularSignsObjectiveAL.length > 0
            && digitsOnly(this.state.ocularSignsObjectiveAL)
            && digitsRange(this.state.ocularSignsObjectiveAL, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
                errors.ocularSignsObjectiveAR = AECGCValidationMessages.ocularSignsObjective.rightEyeRequired; 
            }
        
          if (!this.state.ocularSignsObjectiveALNA && 
            this.state.ocularSignsObjectiveAL.length == 0 && 
            this.state.ocularSignsObjectiveAR.length > 0 
            && digitsOnly(this.state.ocularSignsObjectiveAR)
            && digitsRange(this.state.ocularSignsObjectiveAR, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
                errors.ocularSignsObjectiveAL = AECGCValidationMessages.ocularSignsObjective.leftEyeRequired; 
            }
    
         if (!this.state.ocularSignsObjectiveARNA &&
                this.state.ocularSignsObjectiveAR.length > 0  && 
                !digitsOnly(this.state.ocularSignsObjectiveAR)) {
               errors.ocularSignsObjectiveARInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
            } 
    
        if (!this.state.ocularSignsObjectiveALNA &&
                this.state.ocularSignsObjectiveAL.length > 0  && 
                !digitsOnly(this.state.ocularSignsObjectiveAL)) {
               errors.ocularSignsObjectiveALInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
            } 
    
    
        if (!this.state.ocularSignsObjectiveARNA &&
            this.state.ocularSignsObjectiveAR.length > 0  && 
            !digitsRange(this.state.ocularSignsObjectiveAR, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
           errors.ocularSignsObjectiveARRange = AECGCValidationMessages.ocularSignsObjective.range;
        } 
    
        if (!this.state.ocularSignsObjectiveALNA &&
            this.state.ocularSignsObjectiveAL.length > 0  && 
           !digitsRange(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveEyeMin,AECGCFields.ocularSignsObjectiveEyeMax)) {
                    errors.ocularSignsObjectiveALRange = AECGCValidationMessages.ocularSignsObjective.range;
        } 
    
    
        if(!this.state.objectiveEvidenceA && (!this.state.objectiveEvidenceANA &&
                (this.state.objectiveEvidenceAMl.length == 0 && this.state.objectiveEvidenceAMins.length == 0) )    && 
                !this.state.objectiveEvidenceB   &&
                !this.state.objectiveEvidenceC) {    
                    errors.objectiveEvidence = AECGCValidationMessages.objectiveEvidence.required;  
                }
       
    
        if (!this.state.objectiveEvidenceANA &&
                this.state.objectiveEvidenceAMl.length === 0 && 
                this.state.objectiveEvidenceAMins.length > 0 &&
                digitsOnly(this.state.objectiveEvidenceAMins) &&
                digitsRange(this.state.objectiveEvidenceAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
                    errors.objectiveEvidenceAMl = AECGCValidationMessages.objectiveEvidence.mlRequired;  
                }
    
    
            if (!this.state.objectiveEvidenceANA &&
                this.state.objectiveEvidenceAMins.length === 0 && 
                this.state.objectiveEvidenceAMl.length > 0 &&
                twoDigitsOnly2DecimalPlaces(this.state.objectiveEvidenceAMl) &&
                digitsRange(this.state.objectiveEvidenceAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
                    errors.objectiveEvidenceAMins = AECGCValidationMessages.objectiveEvidence.minsRequired;  
                }    
    
    
                
            if (!this.state.objectiveEvidenceANA &&
                this.state.objectiveEvidenceAMl.length > 0  && 
                !twoDigitsOnly2DecimalPlaces(this.state.objectiveEvidenceAMl)) {
                errors.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
            } 
    
    
            if (!this.state.objectiveEvidenceANA &&
                this.state.objectiveEvidenceAMins.length > 0  && 
                !digitsOnly(this.state.objectiveEvidenceAMins)) {
                errors.objectiveEvidenceAMinsInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
            } 
    
    
        if (!this.state.objectiveEvidenceANA && 
                    this.state.objectiveEvidenceAMl.length > 0  && 
                    !digitsRange(this.state.objectiveEvidenceAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
                    errors.objectiveEvidenceAMlRange = AECGCValidationMessages.objectiveEvidence.mlRange; 
              }         
    
        if (!this.state.objectiveEvidenceANA && 
              this.state.objectiveEvidenceAMins.length > 0  && 
              !digitsRange(this.state.objectiveEvidenceAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
              errors.objectiveEvidenceAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;           
            } 
        
        if (this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId && 
            !this.state.histopathologyAYearPerformedNA &&
            this.state.histopathologyAYearPerformed === '' ) {
                errors.histopathologyAYearPerformed = AECGCValidationMessages.histopathology.yearRequired;           
                
            }    
    
        
        if (this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId &&         
            !this.state.histopathologyAYearPerformedNA &&
            this.state.histopathologyAYearPerformed.length > 0  && 
            !validYear(this.state.histopathologyAYearPerformed,AECGCFields.histopathologyYearPerformedMin)) {
            errors.histopathologyAYearPerformedRange = AECGCValidationMessages.histopathology.validYear;      
      } 
     
        this.setState({errors});       
            

        return errors

}

getVisitValues(){
    var visit = [       
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.ocularSymptomsA,
            controlId:this.state.ocularSymptomsA == ocularSymptoms.optOcularSymptomsA[0].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsA[0].controlId : 
                      this.state.ocularSymptomsA == ocularSymptoms.optOcularSymptomsA[1].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsA[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.ocularSymptomsB,
            controlId:this.state.ocularSymptomsB == ocularSymptoms.optOcularSymptomsB[0].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsB[0].controlId : 
                      this.state.ocularSymptomsB == ocularSymptoms.optOcularSymptomsB[1].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsB[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.ocularSymptomsC,
            controlId:this.state.ocularSymptomsC == ocularSymptoms.optOcularSymptomsC[0].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsC[0].controlId : 
                      this.state.ocularSymptomsC == ocularSymptoms.optOcularSymptomsC[1].controlValueId ? 
                            ocularSymptoms.optOcularSymptomsC[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
    
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.oralSymptomsA,
            controlId:this.state.oralSymptomsA == oralSymptoms.optOralSymptomsA[0].controlValueId ? 
                            oralSymptoms.optOralSymptomsA[0].controlId : 
                      this.state.oralSymptomsA == oralSymptoms.optOralSymptomsA[1].controlValueId ? 
                            oralSymptoms.optOralSymptomsA[1].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.oralSymptomsB,
            controlId:this.state.oralSymptomsB == oralSymptoms.optOralSymptomsB[0].controlValueId ? 
                            oralSymptoms.optOralSymptomsB[0].controlId : 
                      this.state.oralSymptomsB == oralSymptoms.optOralSymptomsB[1].controlValueId ? 
                            oralSymptoms.optOralSymptomsB[1].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.oralSymptomsC,
            controlId:this.state.oralSymptomsC == oralSymptoms.optOralSymptomsC[0].controlValueId ? 
                            oralSymptoms.optOralSymptomsC[0].controlId : 
                      this.state.oralSymptomsC == oralSymptoms.optOralSymptomsC[1].controlValueId ? 
                            oralSymptoms.optOralSymptomsC[1].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.ocularSignsObjectiveA,
            controlId:this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId ? 
                            ocularSignsObjective.optOcularSignsObjectiveA[0].controlId : 
                      this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId ? 
                            ocularSignsObjective.optOcularSignsObjectiveA[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.ocularSignsObjectiveB,
            controlId:this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[0].controlValueId ? 
                            ocularSignsObjective.optOcularSignsObjectiveB[0].controlId : 
                      this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[1].controlValueId ? 
                            ocularSignsObjective.optOcularSignsObjectiveB[1].controlId : 
                      this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[2].controlValueId ? 
                            ocularSignsObjective.optOcularSignsObjectiveB[2].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.objectiveEvidenceA,
            controlId:this.state.objectiveEvidenceA == objectiveEvidence.optObjectiveEvidenceA[0].controlValueId ? 
                            objectiveEvidence.optObjectiveEvidenceA[0].controlId : 
                      this.state.objectiveEvidenceA == objectiveEvidence.optObjectiveEvidenceA[1].controlValueId ? 
                            objectiveEvidence.optObjectiveEvidenceA[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.objectiveEvidenceB,
            controlId:this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[0].controlValueId ? 
                            objectiveEvidence.optObjectiveEvidenceB[0].controlId : 
                      this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[1].controlValueId ? 
                            objectiveEvidence.optObjectiveEvidenceB[1].controlId : 
                      this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[2].controlValueId ? 
                            objectiveEvidence.optObjectiveEvidenceB[2].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        // {
        //     visitHeaderId:this.props.visitHeaderId,
        //     controlValueId:this.state.objectiveEvidenceC,
        //     controlId:this.state.objectiveEvidenceC == objectiveEvidence.optObjectiveEvidenceC[0].controlValueId ? 
        //                     objectiveEvidence.optObjectiveEvidenceC[0].controlId : 
        //               this.state.objectiveEvidenceC == objectiveEvidence.optObjectiveEvidenceC[1].controlValueId ? 
        //                     objectiveEvidence.optObjectiveEvidenceC[1].controlId : 
        //               this.state.objectiveEvidenceC == objectiveEvidence.optObjectiveEvidenceC[2].controlValueId ? 
        //                     objectiveEvidence.optObjectiveEvidenceC[2].controlId :
        //               0,
        //     categoryId:   categories.americanEuropeanCGC.id             
        // },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.histopathologyA,
            controlId:this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId ? 
                            histopathology.optHistopathologyA[0].controlId : 
                      this.state.histopathologyA == histopathology.optHistopathologyA[1].controlValueId ? 
                            histopathology.optHistopathologyA[1].controlId : 
                      this.state.histopathologyA == histopathology.optHistopathologyA[2].controlValueId ? 
                            histopathology.optHistopathologyA[2].controlId :
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.autoAntibodiesA,
            controlId:this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[0].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesA[0].controlId : 
                      this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[1].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesA[1].controlId : 
                      this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[2].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesA[2].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.autoAntibodiesB,
            controlId:this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[0].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesB[0].controlId : 
                      this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[1].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesB[1].controlId : 
                      this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[2].controlValueId ? 
                            autoAntibodies.optAutoAntibodiesB[2].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        },
        {
            visitHeaderId:this.props.visitHeaderId,
            controlValueId:this.state.biopsyAnalysedAtUHB,
            controlId:this.state.biopsyAnalysedAtUHB == histopathology.optBiopsyAnalysedAtUHB[0].controlValueId ? 
                            histopathology.optBiopsyAnalysedAtUHB[0].controlId : 
                    this.state.biopsyAnalysedAtUHB == histopathology.optBiopsyAnalysedAtUHB[1].controlValueId ? 
                            histopathology.optBiopsyAnalysedAtUHB[1].controlId : 
                      0,
            categoryId:   categories.americanEuropeanCGC.id             
        }
    ]
    
return visit;    
}

getDetailValues(){
    
var detail = [];
if (this.state.ocularSignsObjectiveAR && this.state.ocularSignsObjectiveAR.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.ocularSignsObjectiveAR,
            controlId:ocularSignsObjective.txtOcularSignsObjectiveARight.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        },
    )
}


if (this.state.ocularSignsObjectiveAL && this.state.ocularSignsObjectiveAL.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.ocularSignsObjectiveAL,
            controlId:ocularSignsObjective.txtOcularSignsObjectiveALeft.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}

    if (this.state.ocularSignsObjectiveALNA ){    
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.ocularSignsObjectiveALNA,
            controlId:ocularSignsObjective.chkOcularSignsObjectiveALeftNA.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}

if (this.state.ocularSignsObjectiveARNA){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.ocularSignsObjectiveARNA,
            controlId:ocularSignsObjective.chkOcularSignsObjectiveARightNA.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}


if (this.state.objectiveEvidenceAMl && this.state.objectiveEvidenceAMl.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.objectiveEvidenceAMl,
            controlId:objectiveEvidence.txtObjectiveEvidenceAMl.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}

if (this.state.objectiveEvidenceAMins && this.state.objectiveEvidenceAMins.length > 0){
    detail.push(       
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.objectiveEvidenceAMins,
                controlId:objectiveEvidence.txtObjectiveEvidenceAMins.controlId, 
                categoryId:   categories.americanEuropeanCGC.id             
            }
    )
}


if (this.state.objectiveEvidenceANA){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.objectiveEvidenceANA,
            controlId:objectiveEvidence.chkObjectiveEvidenceANA.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}


if (this.state.histopathologyAYearPerformed && this.state.histopathologyAYearPerformed.length > 0){
    detail.push(       
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.histopathologyAYearPerformed,
            controlId:histopathology.txtHistopathologyAYearPerformed.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}

    if (this.state.histopathologyAYearPerformedNA){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.histopathologyAYearPerformedNA,
            controlId:histopathology.chkHistopathologyAYearPerformedNA.controlId, 
            categoryId:   categories.americanEuropeanCGC.id             
        }
    )
}

detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
        value : 
        meetsAECGCCriteria(
            (
                (this.state.ocularSymptomsA  ==  ocularSymptoms.optOcularSymptomsA[0].controlValueId ) ||
                (this.state.ocularSymptomsB  ==  ocularSymptoms.optOcularSymptomsB[0].controlValueId ) ||
                (this.state.ocularSymptomsC  ==  ocularSymptoms.optOcularSymptomsC[0].controlValueId )
            ),
            (
                (this.state.oralSymptomsA  ==  oralSymptoms.optOralSymptomsA[0].controlValueId ) ||
                (this.state.oralSymptomsB  ==  oralSymptoms.optOralSymptomsB[0].controlValueId ) ||
                (this.state.oralSymptomsC  ==  oralSymptoms.optOralSymptomsC[0].controlValueId )
            ),
            (
                (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId)  ||
                (this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[0].controlValueId)  
            )   
            , 
            (
                (this.state.objectiveEvidenceA ==  objectiveEvidence.optObjectiveEvidenceA[0].controlValueId) ||
                (this.state.objectiveEvidenceB ==  objectiveEvidence.optObjectiveEvidenceB[0].controlValueId)
                //|| (this.state.objectiveEvidenceC ==  objectiveEvidence.optObjectiveEvidenceC[0].controlValueId) 
            ), 
            (
                this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId
            ),
            (
                (this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId) ||
                (this.state.autoAntibodiesB  ==  autoAntibodies.optAutoAntibodiesB[0].controlValueId) 
            )
                ),



        controlId:patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria.controlId, 
        categoryId:   categories.diagnosis.id             
    }
)


detail.push(
    {
        visitHeaderId:this.props.visitHeaderId,
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


return detail

}

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



    this.props.handleSaveVisitHeader(visit, detail,categories.americanEuropeanCGC.id );
}
}

/*******COMPLETE**************/

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


    this.props.handleCompleteVisitHeader(visit, detail,categories.americanEuropeanCGC.id);
}
else {
    this.setState({
        visitCompleteModalOpen: false
    })
}
}





    componentWillReceiveProps(nextProps){
       // console.log('AECG FORM DID RECEIVE PROPS')
      this.setState({
              //  dateOfAttendance: nextProps.dateOfAttendance,
                ocularSymptomsA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsA,nextProps.visitResult.data.visits):'',
                ocularSymptomsB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsB,nextProps.visitResult.data.visits):'',
                ocularSymptomsC: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsC,nextProps.visitResult.data.visits):'',
                
                oralSymptomsA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsA,nextProps.visitResult.data.visits):'',
                oralSymptomsB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsB,nextProps.visitResult.data.visits):'',
                oralSymptomsC: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsC,nextProps.visitResult.data.visits):'',
                                                                                                                                                                                                         
                ocularSignsObjectiveA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,nextProps.visitResult.data.visits):'',    
                ocularSignsObjectiveAR:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveARight,nextProps.visitResult.data.details):'',
                ocularSignsObjectiveAL:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveALeft,nextProps.visitResult.data.details):'',              
               
                ocularSignsObjectiveARNA:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveARightNA,nextProps.visitResult.data.details):false,
                ocularSignsObjectiveALNA:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveALeftNA,nextProps.visitResult.data.details):false,           
             
               
                ocularSignsObjectiveB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,nextProps.visitResult.data.visits):'',    
 
                objectiveEvidenceA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,nextProps.visitResult.data.visits):'',    
                objectiveEvidenceAMl:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMl,nextProps.visitResult.data.details):'',
                objectiveEvidenceAMins:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMins,nextProps.visitResult.data.details):'',           
                objectiveEvidenceANA:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.chkObjectiveEvidenceANA,nextProps.visitResult.data.details):'',
                
              
                objectiveEvidenceB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceB,nextProps.visitResult.data.visits):'',    
//                objectiveEvidenceC: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceC,nextProps.visitResult.data.visits):'',    
                
                histopathologyA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA, nextProps.visitResult.data.visits):'',
                histopathologyAYearPerformed:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.txtHistopathologyAYearPerformed, nextProps.visitResult.data.details):'',
                histopathologyAYearPerformedNA:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.chkHistopathologyAYearPerformedNA, nextProps.visitResult.data.details):false,           

                autoAntibodiesA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,nextProps.visitResult.data.visits):'',
                autoAntibodiesB: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesB,nextProps.visitResult.data.visits):'',
         
                alternateDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,nextProps.visitResult.data.visits):'',

                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
              

                changed:false,
                ocularSignsModalOpen:false,
                ocularSignsObjectiveALRConfirmed:false,
                ocularSignsObjectiveALChanged:false,
                ocularSignsObjectiveARChanged:false,

                objectiveEvidenceModalOpen:false,
                objectiveEvidenceMinsConfirmed:false,
                objectiveEvidenceMinsChanged:false,
                errors:{} 
        })
      }

    componentDidMount () {
       
//console.log('AECG FORM DID MOUNT')
            this.setState({
               // dateOfAttendance: this.props.dateOfAttendance,
                ocularSymptomsA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsA,this.props.visitResult.data.visits):'',
                ocularSymptomsB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsB,this.props.visitResult.data.visits):'',
                ocularSymptomsC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSymptoms.optOcularSymptomsC,this.props.visitResult.data.visits):'',
                
                oralSymptomsA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsA,this.props.visitResult.data.visits):'',
                oralSymptomsB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsB,this.props.visitResult.data.visits):'',
                oralSymptomsC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, oralSymptoms.optOralSymptomsC,this.props.visitResult.data.visits):'',
                         
                ocularSignsObjectiveA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveA,this.props.visitResult.data.visits):'',
                ocularSignsObjectiveAR:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveARight,this.props.visitResult.data.details):'',
                ocularSignsObjectiveAL:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.txtOcularSignsObjectiveALeft,this.props.visitResult.data.details):'',
              
                ocularSignsObjectiveARNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveARightNA,this.props.visitResult.data.details):false,
                ocularSignsObjectiveALNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.chkOcularSignsObjectiveALeftNA,this.props.visitResult.data.details):false,           
             

                ocularSignsObjectiveB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, ocularSignsObjective.optOcularSignsObjectiveB,this.props.visitResult.data.visits):'',

                objectiveEvidenceA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceA,this.props.visitResult.data.visits):'',
                objectiveEvidenceAMl:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMl,this.props.visitResult.data.details):'',
                objectiveEvidenceAMins:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.txtObjectiveEvidenceAMins,this.props.visitResult.data.details):'',           
                objectiveEvidenceANA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.chkObjectiveEvidenceANA,this.props.visitResult.data.details):'',
                
              
                objectiveEvidenceB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceB,this.props.visitResult.data.visits):'',
             //   objectiveEvidenceC: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, objectiveEvidence.optObjectiveEvidenceC,this.props.visitResult.data.visits):'',
                
                histopathologyA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, histopathology.optHistopathologyA,this.props.visitResult.data.visits):'',
                histopathologyAYearPerformed:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.txtHistopathologyAYearPerformed,this.props.visitResult.data.details):'',
                histopathologyAYearPerformedNA:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? this.getDetailsControlValue(categories.americanEuropeanCGC.id, histopathology.chkHistopathologyAYearPerformedNA, this.props.visitResult.data.details):false,           
  
                autoAntibodiesA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesA,this.props.visitResult.data.visits):'',
                autoAntibodiesB: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.americanEuropeanCGC.id, autoAntibodies.optAutoAntibodiesB,this.props.visitResult.data.visits):'',
      
                alternateDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? this.getVisitOptionControlValue(categories.diagnosis.id, alternateDiagnosis.optAlternateDiagnosis,this.props.visitResult.data.visits):'',
                
                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
                              


                changed:false,
                ocularSignsModalOpen:false,
                ocularSignsObjectiveALRConfirmed:false,
                ocularSignsObjectiveALChanged:false,
                ocularSignsObjectiveARChanged:false,

                objectiveEvidenceModalOpen:false,
                objectiveEvidenceMinsConfirmed:false,
                objectiveEvidenceMinsChanged:false,
                errors:{}
            });
       }

      

  getVisitOptionControlValue(categoryId,visitSectionControls,savedVisitControlArray){




    var returnVal = 0;
    for (var ctrl of savedVisitControlArray) {   
        if (ctrl.categoryId == categoryId ){
            for (var visitCtrl of visitSectionControls) {   
                if (ctrl.controlId == visitCtrl.controlId)
                    returnVal = ctrl.controlValueId;
                break;
            }
        }
    }

        return returnVal 
  }



  getDetailsControlValue(categoryId,visitSectionControl,savedVisitControlArray){
        var returnVal = '';

        for (var ctrl of savedVisitControlArray) { 
          // console.log('start');
          // console.log(ctrl.categoryId);  
            if (ctrl.categoryId == categoryId ){
              // console.log('visitSectionControl');
              //  console.log(visitSectionControl);
             //  console.log(ctrl.controlId);
              //  console.log(visitSectionControl.controlId);
               // for (var visitCtrl of visitSectionControls) {   
                    if (ctrl.controlId == visitSectionControl.controlId)
                        {
                        returnVal = ctrl.value;
                        break;}
                //}
            }
        }
        //console.log('getVisitOptionControlValue');
        // console.log('end');
            return returnVal 
      }

renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading American-European Consensus Group Criteria"}>
       <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   


optOcularSymptomsA_onChange(e){
    console.log('optOcularSymptomsA_onChange' +  e.target.value)
    
    this.setState({
        ocularSymptomsA: e.target.value,
         changed:true,
     })

 }



 optOcularSymptomsB_onChange(e){
     this.setState({
        ocularSymptomsB: e.target.value,
         changed:true,
     })

 }


 optOcularSymptomsC_onChange(e){
    // console.log('optOcularSymptomsA_onChange' +  e.target.value)
     this.setState({
        ocularSymptomsC: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })

    //  meetsAECGCCriteria(
    //     (
    //         (this.state.ocularSymptomsA  ==  ocularSymptoms.optOcularSymptomsA[0].controlValueId ) ||
    //         (this.state.ocularSymptomsB  ==  ocularSymptoms.optOcularSymptomsB[0].controlValueId ) ||
    //         (e.target.value  ==  ocularSymptoms.optOcularSymptomsC[0].controlValueId )
    //     ),
    //     (
    //         (this.state.oralSymptomsA  ==  oralSymptoms.optOralSymptomsA[0].controlValueId ) ||
    //         (this.state.oralSymptomsB  ==  oralSymptoms.optOralSymptomsB[0].controlValueId ) ||
    //         (this.state.oralSymptomsC  ==  oralSymptoms.optOralSymptomsC[0].controlValueId )
    //     ),
        
    //         (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId) 
            
    //     , 
    //     (
    //         this.state.objectiveEvidenceA ==  objectiveEvidence.optObjectiveEvidenceA[0].controlValueId
    //     ), 
    //     (
    //         this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId
    //     ),
    //     (
    //         (this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId) ||
    //         (this.state.autoAntibodiesB  ==  autoAntibodies.optAutoAntibodiesB[0].controlValueId) 
    //     )
    //         )
 }


 optOralSymptomsA_onChange(e){
    // console.log('optOcularSymptomsA_onChange' +  e.target.value)
     this.setState({
        oralSymptomsA: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })

    //  meetsAECGCCriteria(
    //     (
    //         (this.state.ocularSymptomsA  ==  ocularSymptoms.optOcularSymptomsA[0].controlValueId ) ||
    //         (this.state.ocularSymptomsB  ==  ocularSymptoms.optOcularSymptomsB[0].controlValueId ) ||
    //         (this.state.ocularSymptomsC  ==  ocularSymptoms.optOcularSymptomsC[0].controlValueId )
    //     ),
    //     (
    //         (e.target.value  ==  oralSymptoms.optOralSymptomsA[0].controlValueId ) ||
    //         (this.state.oralSymptomsB  ==  oralSymptoms.optOralSymptomsB[0].controlValueId ) ||
    //         (this.state.oralSymptomsC  ==  oralSymptoms.optOralSymptomsC[0].controlValueId )
    //     ),
        
    //         (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId) 
            
    //     , 
    //     (
    //         this.state.objectiveEvidenceA ==  objectiveEvidence.optObjectiveEvidenceA[0].controlValueId
    //     ), 
    //     (
    //         this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId
    //     ),
    //     (
    //         (this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId) ||
    //         (this.state.autoAntibodiesB  ==  autoAntibodies.optAutoAntibodiesB[0].controlValueId) 
    //     )
    //         )
 }



 optOralSymptomsB_onChange(e){
    // console.log('optOcularSymptomsA_onChange' +  e.target.value)
     this.setState({
        oralSymptomsB: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })

    //  meetsAECGCCriteria(
    //     (
    //         (this.state.ocularSymptomsA  ==  ocularSymptoms.optOcularSymptomsA[0].controlValueId ) ||
    //         (this.state.ocularSymptomsB  ==  ocularSymptoms.optOcularSymptomsB[0].controlValueId ) ||
    //         (this.state.ocularSymptomsC  ==  ocularSymptoms.optOcularSymptomsC[0].controlValueId )
    //     ),
    //     (
    //         (this.state.oralSymptomsA  ==  oralSymptoms.optOralSymptomsA[0].controlValueId ) ||
    //         (e.target.value  ==  oralSymptoms.optOralSymptomsB[0].controlValueId ) ||
    //         (this.state.oralSymptomsC  ==  oralSymptoms.optOralSymptomsC[0].controlValueId )
    //     ),
        
    //         (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId) 
            
    //     , 
    //     (
    //         this.state.objectiveEvidenceA ==  objectiveEvidence.optObjectiveEvidenceA[0].controlValueId
    //     ), 
    //     (
    //         this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId
    //     ),
    //     (
    //         (this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId) ||
    //         (this.state.autoAntibodiesB  ==  autoAntibodies.optAutoAntibodiesB[0].controlValueId) 
    //     )
    //         )
 }


 optOralSymptomsC_onChange(e){
    // console.log('optOcularSymptomsA_onChange' +  e.target.value)
     this.setState({
        oralSymptomsC: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })

    //  meetsAECGCCriteria(
    //     (
    //         (this.state.ocularSymptomsA  ==  ocularSymptoms.optOcularSymptomsA[0].controlValueId ) ||
    //         (this.state.ocularSymptomsB  ==  ocularSymptoms.optOcularSymptomsB[0].controlValueId ) ||
    //         (this.state.ocularSymptomsC  ==  ocularSymptoms.optOcularSymptomsC[0].controlValueId )
    //     ),
    //     (
    //         (this.state.oralSymptomsA  ==  oralSymptoms.optOralSymptomsA[0].controlValueId ) ||
    //         (this.state.oralSymptomsB  ==  oralSymptoms.optOralSymptomsB[0].controlValueId ) ||
    //         (e.target.value ==  oralSymptoms.optOralSymptomsC[0].controlValueId )
    //     ),
        
    //         (this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId) 
            
    //     , 
    //     (
    //         this.state.objectiveEvidenceA ==  objectiveEvidence.optObjectiveEvidenceA[0].controlValueId
    //     ), 
    //     (
    //         this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId
    //     ),
    //     (
    //         (this.state.autoAntibodiesA  ==  autoAntibodies.optAutoAntibodiesA[0].controlValueId) ||
    //         (this.state.autoAntibodiesB  ==  autoAntibodies.optAutoAntibodiesB[0].controlValueId) 
    //     )
    //         )
 }


 
 




ocularSignsObjectiveAR_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }

        //console.log('ok')

        this.setState({
            ocularSignsObjectiveARNA:false
        })
}




ocularSignsObjectiveAL_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }

    this.setState({
        ocularSignsObjectiveALNA:false
    })
}

histopathologyAYearPerformed_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }

    this.setState({
        histopathologyAYearPerformedNA:false
    })
}
    

ocularSignsObjectiveARNA_onChange(e){
    // console.log('ocularSignsObjectiveARNA_onChange: main' +  e.target.checked)
//this.setState({preventBlur:true})
if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['ocularSignsObjectiveAR'];
    delete errorsClone['ocularSignsObjectiveARRange'];
    delete errorsClone['ocularSignsObjectiveARInvalidNumber'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        //ocularSignsObjectiveA:'',

        ocularSignsObjectiveA: this.state.ocularSignsObjectiveAL.length > 0 ? digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? 
                                ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,

        ocularSignsObjectiveAR:'',
        ocularSignsObjectiveARNA: !this.state.ocularSignsObjectiveARNA,
        changed:true,
     });
    }
    else {

    
     this.setState({
        ocularSignsObjectiveARNA: !this.state.ocularSignsObjectiveARNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }
 }

 
ocularSignsObjectiveALNA_onChange(e){
    // console.log('ocularSignsObjectiveALNA_onChange main' +  e.target.checked)

     
if (e.target.checked){
    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['ocularSignsObjectiveAL'];
    delete errorsClone['ocularSignsObjectiveALRange'];
    delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
    //copy clone back to errors in state
    this.setState({ 
        errors:errorsClone,
        //ocularSignsObjectiveA:'',
        ocularSignsObjectiveA: this.state.ocularSignsObjectiveAR.length > 0 ? digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? 
                                ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
        ocularSignsObjectiveAL:'',
        ocularSignsObjectiveALNA: !this.state.ocularSignsObjectiveALNA,
        changed:true,
     });

    }
    else{
     this.setState({
        ocularSignsObjectiveALNA: !this.state.ocularSignsObjectiveALNA,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
    }
 }


 ocularSignsObjectiveAR_onChange(e){

     //if (!!this.state.errors['ocularSignsObjectiveAR'] || !!this.state.errors['ocularSignsObjectiveARRange'] || !!this.state.errors['ocularSignsObjectiveAR2Decimal']){
        if (!!this.state.errors['ocularSignsObjectiveAR'] || !!this.state.errors['ocularSignsObjectiveARRange'] || !!this.state.errors['ocularSignsObjectiveARInvalidNumber']){            
     //One of the above error has occurred 
        // console.log('One of the above error has occurred');
       //clone object from state 
       let errorsClone = Object.assign({},this.state.errors);
       //remove field we just type into from errors.
       // delete errorsClone[e.target.name];
        //Delete the required field      
        delete errorsClone['ocularSignsObjectiveAR'];
        //Only delete range error if current value is ok
     //   if (e.target.value.length > 0  && digitsRange(e.target.value, 0, 40)) {

        if (e.target.value.length > 0) {  
            if (digitsOnly(e.target.value)){
                delete errorsClone['ocularSignsObjectiveARInvalidNumber'];
            }
            if (digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {  
            // console.log('Entered value is ok');
             delete errorsClone['ocularSignsObjectiveARRange'];
        }
    }
    else {
        delete errorsClone['ocularSignsObjectiveARInvalidNumber'];
        delete errorsClone['ocularSignsObjectiveARRange'];
    }
        
        // if (e.target.value.length > 0  && digitsOnly2DecimalPlaces(e.target.value)) {
        //  console.log('Entered value is ok');
        //  delete errorsClone['ocularSignsObjectiveAR2Decimal'];
        // }
        if (Object.keys(errorsClone).length === 0){

            this.setState({
                errors:errorsClone,
                ocularSignsObjectiveAR:e.target.value,
                ocularSignsObjectiveA: e.target.value.length > 0 ? 
                                        digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                       ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                           this.state.ocularSignsObjectiveAL.length > 0 ? 
                                               digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                               ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
              
              
                // ocularSignsObjectiveARNA:false,
                changed:true,
                ocularSignsObjectiveALRConfirmed:false,
               ocularSignsObjectiveARChanged:  true
               })

            
        }
        else {
            //copy clone back to errors in state
            this.setState({
                ocularSignsObjectiveA:null,
                //[e.target.name]: e.target.value,
                errors:errorsClone,
                ocularSignsObjectiveAR:e.target.value,
                // ocularSignsObjectiveARNA:false,
                changed:true,
                ocularSignsObjectiveALRConfirmed:false,
                ocularSignsObjectiveARChanged:  true
            });
        }
      
       }
        else {
            // console.log('!twoDigitsOnly(e.target.value)');
            // console.log('e.target.value: ' + e.target.value)
            // console.log(!twoDigitsOnly(e.target.value));
            // console.log(!twoDigitsOnly(e.target.value) ? 'not 2 digits' : '2 digits')
            // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
            //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
                if ((e.target.value.length > 0  && 
                    (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax) || !digitsOnly(e.target.value)))) {
                //no errors for this field existed before
              //  console.log('no errors for this field existed before')
             //   console.log('and user has eneterd invalid value')
                //and user has eneterd invalid value
                //clone errors and add to state
                let errorsClone = Object.assign({},this.state.errors);

                if (!digitsOnly(e.target.value)){
                    errorsClone.ocularSignsObjectiveARInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
                }
                else if (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)){
                    errorsClone.ocularSignsObjectiveARRange = AECGCValidationMessages.ocularSignsObjective.range;//'Right eye min: 0, max 40';
                }

              

                this.setState({
                            errors:errorsClone,
                            ocularSignsObjectiveA:null,
                            ocularSignsObjectiveAR:e.target.value,
                          //  ocularSignsObjectiveARNA:false,
                            changed:true,
                            ocularSignsObjectiveALRConfirmed:false,
                            ocularSignsObjectiveARChanged:  true
                        })
            } 
            else {
                //  console.log('no invalid values update state with no error');
                  this.setState({
                         ocularSignsObjectiveAR:e.target.value,
                         ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                                ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                                    this.state.ocularSignsObjectiveAL.length > 0 ? 
                                                        digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                        ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                         changed:true,
                         ocularSignsObjectiveALRConfirmed:false,
                        ocularSignsObjectiveARChanged:  true
                        })
                    }
            }
 }

 ocularSignsObjectiveAL_onChange(e){

    //console.log('ocularSignsObjectiveAL_onChange');
    
    
//         if (!!this.state.errors['ocularSignsObjectiveAL'] || !!this.state.errors['ocularSignsObjectiveALRange']  || !!this.state.errors['ocularSignsObjectiveAL2Decimal'] ){
            if (!!this.state.errors['ocularSignsObjectiveAL'] || !!this.state.errors['ocularSignsObjectiveALRange'] || !!this.state.errors['ocularSignsObjectiveALInvalidNumber']){
                
            //One of the above error has occurred 
            // console.log('One of the above error has occurred');
           //clone object from state 
           let errorsClone = Object.assign({},this.state.errors);
           //remove field we just type into from errors.
           // delete errorsClone[e.target.name];
            //Delete the required field      
            delete errorsClone['ocularSignsObjectiveAL'];
            //Only delete range error if current value is ok

            if (e.target.value.length > 0) {

                if (digitsOnly(e.target.value)){
                    delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
                }
             if (digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin,AECGCFields.ocularSignsObjectiveEyeMax)) {
                   // console.log('Entered value is ok');
                    delete errorsClone['ocularSignsObjectiveALRange'];
                   }
            }
            else {
                delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
                delete errorsClone['ocularSignsObjectiveALRange'];
            }

            // if (e.target.value.length > 0  && digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin,AECGCFields.ocularSignsObjectiveEyeMax)) {
            //  console.log('Entered value is ok');
            //  delete errorsClone['ocularSignsObjectiveALRange'];
            // }

            // if (e.target.value.length > 0  && digitsOnly(e.target.value)){
            //     delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
            // }

       
            if (Object.keys(errorsClone).length === 0){
                this.setState({
                    errors:errorsClone,
                    ocularSignsObjectiveAL:e.target.value,
                    ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                            ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                               this.state.ocularSignsObjectiveAR.length > 0 ? 
                                                   digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                   ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                    //ocularSignsObjectiveALNA:false,
                    changed:true,
                    ocularSignsObjectiveALRConfirmed:false,
                   ocularSignsObjectiveALChanged:  true
                   })
            }
            else {
                //copy clone back to errors in state
                this.setState({
                    //[e.target.name]: e.target.value,
                    errors:errorsClone,
                    ocularSignsObjectiveAL:e.target.value,
                    //ocularSignsObjectiveALNA:false,
                    ocularSignsObjectiveA:null,
                    changed:true,
                    ocularSignsObjectiveALRConfirmed:false,
                    ocularSignsObjectiveALChanged:  true
                });
            }
          
           }
            else {
    

                // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
                //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))){
                    if ((e.target.value.length > 0  && 
                        (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax) ||
                        !digitsOnly(e.target.value)))) {
                //no errors for this field existed before
                   // console.log('no errors for this field existed before')
                   // console.log('and user has eneterd invalid value')
                    //and user has eneterd invalid value
                    //clone errors and add to state
                    let errorsClone = Object.assign({},this.state.errors);

                    if (!digitsOnly(e.target.value)){
                        errorsClone.ocularSignsObjectiveALInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
                    }
                    else if (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)){
                    errorsClone.ocularSignsObjectiveALRange = AECGCValidationMessages.ocularSignsObjective.range; //'Left eye min: 0, max 40';
                    }
                   
                   
    
                    this.setState({
                                errors:errorsClone,
                                ocularSignsObjectiveAL:e.target.value,
                                ocularSignsObjectiveA:null,
                                changed:true,
                                ocularSignsObjectiveALRConfirmed:false,
                                ocularSignsObjectiveALChanged:  true
                            })
                } 
                else {
                    //  console.log('no invalid values update state with no error');
                      this.setState({
                             ocularSignsObjectiveAL:e.target.value,
                             ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                                     ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                                        this.state.ocularSignsObjectiveAR.length > 0 ? 
                                                            digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                            ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                             //ocularSignsObjectiveALNA:false,
                             changed:true,
                             ocularSignsObjectiveALRConfirmed:false,
                            ocularSignsObjectiveALChanged:  true
                            })
                        }
                }
}


ocularSignsObjectiveALR_onBlur(e){
//console.log('ocularSignsObjectiveALR_onBlur');

    //Do we have values in both input fields
//    if ((this.state.ocularSignsObjectiveAR != '' || this.state.ocularSignsObjectiveAR != '0') || 
//         (this.state.ocularSignsObjectiveAL != '' || this.state.ocularSignsObjectiveAL != '0')) { 


            if (this.state.ocularSignsObjectiveAR.length > 0 && this.state.ocularSignsObjectiveAL.length > 0 ) { 
//We dont have a problem with the range provided
//if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveAR2Decimal']) && !(!!this.state.errors['ocularSignsObjectiveALRange']) && !(!!this.state.errors['ocularSignsObjectiveAL2Decimal']) ){
    
if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveALRange']) && !(!!this.state.errors['ocularSignsObjectiveARInvalidNumber'])){
            //we haven't confirmed and L or R has changed
                if (!this.state.ocularSignsObjectiveALRConfirmed && (this.state.ocularSignsObjectiveALChanged || this.state.ocularSignsObjectiveARChanged)) { 
                  //  console.log('onblur')
                    this.setState({    
                        ocularSignsModalOpen:ocularSignsObjectiveValidation(this.state.ocularSignsObjectiveAL, this.state.ocularSignsObjectiveAR),
                        ocularSignsObjectiveALRConfirmed:true 
                    })
                }
            }
    }
 }



optOcularSignsObjectiveB_onChange(e){
    this.setState({
       ocularSignsObjectiveB: e.target.value,
        changed:true,
      //  metCriteria: this.patientMetCriteria()
    })
}



optObjectiveEvidenceA_onChange(e){
   // console.log('optObjectiveEvidenceA_onChange' +  e.target.value)
   

      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      
      delete errorsClone['objectiveEvidence'];
      delete errorsClone['objectiveEvidenceAMl'];
      delete errorsClone['objectiveEvidenceAMlRange'];
      delete errorsClone['objectiveEvidenceAMins'];
      delete errorsClone['objectiveEvidenceAMinsRange'];

      this.setState({ 
        errors:errorsClone,
        objectiveEvidenceAMl:'',
        objectiveEvidenceAMins:'',
        objectiveEvidenceA: e.target.value,
        changed:true
     });


}

objectiveEvidenceAMl_onKeyUp(e){
     // console.log('objectiveEvidenceAML_onKeyUp_aaaaaa')
      //  console.log(e.target.value);
       //  console.log('objectiveEvidenceAML_onKeyUp_aaaaa')

var val = e.target.value;
var decimalPos = val.indexOf('.')

if (decimalPos > 0){

    var decimalChars =  val.split(".")[1]

if (decimalChars.length > 2) {
    this.setState({ 
        objectiveEvidenceAMl:parseFloat(val).toFixed(2),
        changed:true
     });
    }
}

}

objectiveEvidenceAMl_onKeyPress(e){
    var charCode = e.keyCode || e.which; 
    var key = String.fromCharCode(charCode);

    // console.log('charCode');
    // console.log(charCode);
    // console.log('key');
    // console.log(key);
    // console.log(this.refs.objectiveEvidenceAMl);

    if (!isNumericPeriod(key)){
        e.preventDefault();   
    }

    let errorsClone = Object.assign({},this.state.errors);
    delete errorsClone['objectiveEvidence'];

    this.setState({
        errors:errorsClone,
        objectiveEvidenceANA:false
    })

}





objectiveEvidenceAMins_onKeyPress(e){
   // console.log('objectiveEvidenceAMins_onKeyPress')
    //console.log(e);
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }

    let errorsClone = Object.assign({},this.state.errors);
    delete errorsClone['objectiveEvidence'];
    this.setState({
        errors:errorsClone,
        objectiveEvidenceANA:false
    })

}



objectiveEvidenceAMl_onBlur(e){
    
 if (this.state.objectiveEvidenceAMl.length > 0) { 
    var mlNum = parseFloat(e.target.value);
    //console.log('objectiveEvidenceAMl_onBlur');
    //console.log(!(!!this.state.errors['objectiveEvidenceAMlRange']));
if (!(!!this.state.errors['objectiveEvidenceAMl']) && !(!!this.state.errors['objectiveEvidenceAMlRange'])) {
    if (!!this.state.errors['objectiveEvidenceAMlInvalidNumber']){
        //One of the above error has occurred 
      //  console.log(this.state.errors);
      //  console.log('objectiveEvidenceAMlInvalidNumber error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
       if (e.target.value.length > 0){

       

        if (twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2))) {
          //  console.log('Entered value is ok');
            delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
           }
       }
       else {
        delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
       }
           
       if (Object.keys(errorsClone).length === 0){
       // var mlNum = parseFloat(e.target.value);
        this.setState({
            objectiveEvidenceAMl:mlNum.toFixed(2),//e.target.value,
            changed:true,
            errors:errorsClone,
            objectiveEvidenceA: e.target.value.length > 0 &&
                                (this.state.objectiveEvidenceAMins && 
                                this.state.objectiveEvidenceAMins.length > 0 && 
                                this.state.objectiveEvidenceAMins > 0 && 
                                digitsRange(this.state.objectiveEvidenceAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) ? 
                                salivaryFlowRate(mlNum.toFixed(2),this.state.objectiveEvidenceAMins) ?
                                objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null

           })
       }
       else {
            //copy clone back to errors in state
            
        //var mlNum = parseFloat(e.target.value);
            this.setState({
                //[e.target.name]: e.target.value,
                errors:errorsClone,
                objectiveEvidenceAMl:mlNum.toFixed(2), //e.target.value,
                objectiveEvidenceA:null,
                changed:true
            });
       }


     
      }
       else {

           if (e.target.value.length > 0  && !twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2))) {
               //no errors for this field existed before
              // console.log('no errors for this field existed before')
             //  console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);   
            //delete errorsClone['objectEvidence'];

            // if (!digitsOnly(e.target.value)){
            //     errorsClone.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
            //     } else

            if (!twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2))){
                errorsClone.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;//'Ml: 2 numbers, optional 2 decimals ';
            }
          
            
       // var mlNum = parseFloat(e.target.value);

               this.setState({
                           errors:errorsClone,
                           objectiveEvidenceAMl:mlNum.toFixed(2), //e.target.value,
                           objectiveEvidenceA:null,
                           changed:true,
                       })
           } 
           else {
               //  console.log('no invalid values update state with no error');
                 
       // var mlNum = parseFloat(e.target.value);
                 this.setState({
                        objectiveEvidenceAMl:mlNum.toFixed(2), //e.target.value,
                        changed:true,
                        objectiveEvidenceA: e.target.value.length > 0 && 
                                            (this.state.objectiveEvidenceAMins && 
                                            this.state.objectiveEvidenceAMins.length > 0 &&
                                            this.state.objectiveEvidenceAMins > 0 &&
                                            digitsRange(this.state.objectiveEvidenceAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) ? 
                                            salivaryFlowRate(mlNum.toFixed(2),this.state.objectiveEvidenceAMins) ?
                                            objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                            objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,

                       })
                   }
           }
        }
    }
}

objectiveEvidenceAMl_onChange(e){
    if (!!this.state.errors['objectiveEvidenceAMl'] || 
        !!this.state.errors['objectiveEvidenceAMlRange'] ||
        !!this.state.errors['objectiveEvidenceAMlInvalidNumber']){
        //One of the above error has occurred 
       // console.log(this.state.errors);
       // console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
       delete errorsClone['objectiveEvidenceAMl'];
       delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
       //Only delete range error if current value is ok

       if (e.target.value.length > 0){

        if (digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
          //  console.log('Entered value is ok');
            delete errorsClone['objectiveEvidenceAMlRange'];
           }

       }
       else {
        delete errorsClone['objectiveEvidenceAMlRange'];
       }
      
     
       if (Object.keys(errorsClone).length === 0){
        this.setState({
            objectiveEvidenceAMl:e.target.value,
            changed:true,
            errors:errorsClone,
            objectiveEvidenceA: e.target.value.length > 0 && twoDigitsOnly2DecimalPlaces(e.target.value) &&
                                (this.state.objectiveEvidenceAMins && this.state.objectiveEvidenceAMins.length > 0 && this.state.objectiveEvidenceAMins > 0) ? 
                                salivaryFlowRate(e.target.value,this.state.objectiveEvidenceAMins) ?
                                objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null

           })

       }
       else {
            //copy clone back to errors in state
            this.setState({
                //[e.target.name]: e.target.value,
                errors:errorsClone,
                objectiveEvidenceAMl:e.target.value,
                objectiveEvidenceA:null,
                changed:true
            });
       }


     
      }
       else {

           if (e.target.value.length > 0  && 
            (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax))) {
               //no errors for this field existed before
              // console.log('no errors for this field existed before')
              // console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);   
            //delete errorsClone['objectEvidence'];

            // if (!digitsOnly(e.target.value)){
            //     errorsClone.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
            //     } else

           if (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)){
               errorsClone.objectiveEvidenceAMlRange = AECGCValidationMessages.objectiveEvidence.mlRange;//'Ml min 0.00, max 99';
            }
            

               this.setState({
                           errors:errorsClone,
                           objectiveEvidenceAMl:e.target.value,
                           objectiveEvidenceA:null,
                           changed:true,
                       })
           } 
           else {
                // console.log('no invalid values update state with no error');
                 this.setState({
                        objectiveEvidenceAMl:e.target.value,
                        changed:true,
                        objectiveEvidenceA: e.target.value.length > 0 && twoDigitsOnly2DecimalPlaces(e.target.value) &&
                                            (this.state.objectiveEvidenceAMins && this.state.objectiveEvidenceAMins.length > 0 && this.state.objectiveEvidenceAMins > 0) ? 
                                            salivaryFlowRate(e.target.value,this.state.objectiveEvidenceAMins) ?
                                            objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                            objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,

                       })
                   }
           }
}




objectiveEvidenceAMins_onBlur(e){
    
 if (this.state.objectiveEvidenceAMins.length > 0) { 
         
//do invalid number validation start

     if (!!this.state.errors['objectiveEvidenceAMinsInvalidNumber']){
         //One of the above error has occurred 
        // console.log('One of the above error has occurred');
       //clone object from state 
       let errorsClone = Object.assign({},this.state.errors);
       //remove field we just type into from errors.
        delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
        //Only delete range error if current value is ok
     if (e.target.value.length > 0){
 
         if (digitsOnly(e.target.value)){
             delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
         }
     }
     else {
         delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
     }
 
         if (Object.keys(errorsClone).length === 0){
             this.setState({
                 objectiveEvidenceAMins:e.target.value,
                     changed:true,
                     errors:errorsClone,
                     objectiveEvidenceA: (e.target.value.length > 0 && e.target.value > 0) &&
                                         (this.state.objectiveEvidenceAMl && 
                                          this.state.objectiveEvidenceAMl.length > 0 &&
                                          digitsRange(this.state.objectiveEvidenceAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) ? 
                                         salivaryFlowRate(this.state.objectiveEvidenceAMl,e.target.value) ?
                                         objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                         objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
                      objectiveEvidenceMinsChanged:true,
                      objectiveEvidenceMinsConfirmed:false
                 })
         }
         else {
                     //copy clone back to errors in state
                     this.setState({
                         //[e.target.name]: e.target.value,
                         errors:errorsClone,
                         objectiveEvidenceAMins:e.target.value,
                         objectiveEvidenceA:null,
                         changed:true,
                         objectiveEvidenceMinsChanged:true,
                         objectiveEvidenceMinsConfirmed:false
                     });
             }
         
     }
        else {
 
            if (e.target.value.length > 0 && 
              (!digitsOnly(e.target.value))) {
                //no errors for this field existed before
              //  console.log('no errors for this field existed before')
               // console.log('and user has eneterd invalid value')
                //and user has eneterd invalid value
                //clone errors and add to state
                let errorsClone = Object.assign({},this.state.errors);
              
 
                
 
                if (!digitsOnly(e.target.value)){
                 errorsClone.objectiveEvidenceAMinsInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
                 }
                
                //errorsClone.objectiveEvidenceAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Mins min: 0, max 60';
 
                this.setState({
                            errors:errorsClone,
                            objectiveEvidenceAMins:e.target.value,
                            objectiveEvidenceA:null,
                            changed:true,
                            objectiveEvidenceMinsChanged:true,
                            objectiveEvidenceMinsConfirmed:false
                        })
            } 
            else {
                //  console.log('no invalid values update state with no error');
                  this.setState({
                     objectiveEvidenceAMins:e.target.value,
                         changed:true,
                         objectiveEvidenceA: (e.target.value.length > 0 && e.target.value > 0) &&
                                             (this.state.objectiveEvidenceAMl && 
                                                this.state.objectiveEvidenceAMl.length > 0 &&
                                                digitsRange(this.state.objectiveEvidenceAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) ? 
                                             salivaryFlowRate(this.state.objectiveEvidenceAMl,e.target.value) ?
                                             objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                             objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
                                             objectiveEvidenceMinsChanged:true,
                                             objectiveEvidenceMinsConfirmed:false
 
                        })
                    }
            }
 

//do invalid number validation end
//console.log(this.state.errors)
/*
    if (!(!!this.state.errors['objectiveEvidenceAMinsRange']) &&
         !(!!this.state.errors['objectiveEvidenceAMinsInvalidNumber']) && 
            !(!!this.state.errors['objectiveEvidenceAMlInvalidNumber'])){
*/

    if (!(!!this.state.errors['objectiveEvidenceAMinsRange']) && 
        !(!!this.state.errors['objectiveEvidenceAMlRange']) &&
         digitsOnly(e.target.value) && 
            !(!!this.state.errors['objectiveEvidenceAMlInvalidNumber'])){
                //we haven't confirmed and L or R has changed
                    if (!this.state.objectiveEvidenceMinsConfirmed && this.state.objectiveEvidenceMinsChanged) { 
                       // console.log('onblur')
                        this.setState({    
                            objectiveEvidenceModalOpen:objectiveEvidenceValidation(this.state.objectiveEvidenceAMins),
                            objectiveEvidenceMinsConfirmed:true 
                        })
                    }
                }
        }
     }



objectiveEvidenceAMins_onChange(e){
   // console.log('objectiveEvidenceAMins_onChange');
   // console.log(this.state.errors)
    

    if (!!this.state.errors['objectiveEvidenceAMins'] || 
        !!this.state.errors['objectiveEvidenceAMinsRange'] ||
        !!this.state.errors['objectiveEvidenceAMinsInvalidNumber']){
        //One of the above error has occurred 
      //  console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
       delete errorsClone['objectiveEvidenceAMins'];
       delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
       //Only delete range error if current value is ok
    if (e.target.value.length > 0){

       

       if (digitsRange(e.target.value, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
         //   console.log('Entered value is ok');
            delete errorsClone['objectiveEvidenceAMinsRange'];
       }
    }
    else {
        delete errorsClone['objectiveEvidenceAMinsRange'];
    }


        if (Object.keys(errorsClone).length === 0){
            this.setState({
                objectiveEvidenceAMins:e.target.value,
                    changed:true,
                    errors:errorsClone,
                    objectiveEvidenceA: (e.target.value.length > 0 && e.target.value > 0) && digitsOnly(e.target.value) &&
                                        (this.state.objectiveEvidenceAMl && this.state.objectiveEvidenceAMl.length > 0) ? 
                                        salivaryFlowRate(this.state.objectiveEvidenceAMl,e.target.value) ?
                                        objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                        objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
                     objectiveEvidenceMinsChanged:true,
                     objectiveEvidenceMinsConfirmed:false
                })
        }
        else {
                    //copy clone back to errors in state
                    this.setState({
                        //[e.target.name]: e.target.value,
                        errors:errorsClone,
                        objectiveEvidenceAMins:e.target.value,
                        objectiveEvidenceA:null,
                        changed:true,
                        objectiveEvidenceMinsChanged:true,
                        objectiveEvidenceMinsConfirmed:false
                    });
            }
        
    }
       else {

           if (e.target.value.length > 0 && 
             (!digitsRange(e.target.value,AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax))) {
               //no errors for this field existed before
            //   console.log('no errors for this field existed before')
              // console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);
             

               if (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)){
                    errorsClone.objectiveEvidenceAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Right eye min: 0, max 40';
                }

               //errorsClone.objectiveEvidenceAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Mins min: 0, max 60';

               this.setState({
                           errors:errorsClone,
                           objectiveEvidenceAMins:e.target.value,
                           objectiveEvidenceA:null,
                           changed:true,
                           objectiveEvidenceMinsChanged:true,
                           objectiveEvidenceMinsConfirmed:false
                       })
           } 
           else {
                // console.log('no invalid values update state with no error');
                 this.setState({
                    objectiveEvidenceAMins:e.target.value,
                        changed:true,
                        objectiveEvidenceA: (e.target.value.length > 0 && e.target.value > 0) && digitsOnly(e.target.value) &&
                                            (this.state.objectiveEvidenceAMl && this.state.objectiveEvidenceAMl.length > 0) ? 
                                            salivaryFlowRate(this.state.objectiveEvidenceAMl,e.target.value) ?
                                            objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                            objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
                                            objectiveEvidenceMinsChanged:true,
                                            objectiveEvidenceMinsConfirmed:false

                       })
                   }
           }

    
    // this.setState({
    //    objectiveEvidenceAMins:e.target.value,
    //    changed:true
    // })
}




 
objectiveEvidenceANA_onChange(e){
    //console.log('objectiveEvidenceANA_onChange' +  e.target.checked)

    
if (e.target.checked){
   let errorsClone = Object.assign({},this.state.errors);
   //remove field we just type into from errors.
   delete errorsClone['objectiveEvidenceAMl'];
   delete errorsClone['objectiveEvidenceAMins'];
   delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
   delete errorsClone['objectiveEvidenceAMlRange'];
   delete errorsClone['objectiveEvidenceAMinsRange'];
   delete errorsClone['objectiveEvidence'];
   delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
   


   //copy clone back to errors in state
   this.setState({ 
       errors:errorsClone,
       objectiveEvidenceA:null,
       objectiveEvidenceAMl:'',
   objectiveEvidenceAMins:'',
       objectiveEvidenceANA: !this.state.objectiveEvidenceANA,
       changed:true,
    });

   }
   else{
    this.setState({
       objectiveEvidenceANA: !this.state.objectiveEvidenceANA,
        changed:true,
    })
   }
}

optObjectiveEvidenceB_onChange(e){
   

    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['objectiveEvidence'];
    delete errorsClone['objectiveEvidenceAMl'];
    delete errorsClone['objectiveEvidenceAMlRange'];
    delete errorsClone['objectiveEvidenceAMins'];
    delete errorsClone['objectiveEvidenceAMinsRange'];
    delete errorsClone['objectiveEvidence'];
    delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
    delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];
    

    this.setState({ 
      errors:errorsClone,
    
      objectiveEvidenceB: e.target.value,
      changed:true
   });

}

optObjectiveEvidenceC_onChange(e){
  

    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    delete errorsClone['objectiveEvidence'];
    delete errorsClone['objectiveEvidenceAMl'];
    delete errorsClone['objectiveEvidenceAMlRange'];
    delete errorsClone['objectiveEvidenceAMins'];
    delete errorsClone['objectiveEvidenceAMinsRange'];
    delete errorsClone['objectiveEvidence'];
    delete errorsClone['objectiveEvidenceAMlInvalidNumber'];
    delete errorsClone['objectiveEvidenceAMinsInvalidNumber'];

    this.setState({ 
      errors:errorsClone,
      objectiveEvidenceC: e.target.value,
      changed:true
   });

}



optHistopathologyA_onChange(e){

    if (e.target.value != histopathology.optHistopathologyA[0].controlValueId) {
        //clone object from state 
         let errorsClone = Object.assign({},this.state.errors);
         //remove field we just type into from errors.
         delete errorsClone['histopathologyAYearPerformed'];
         delete errorsClone['histopathologyAYearPerformedRange'];
        
         //copy clone back to errors in state
         this.setState({ 
             errors:errorsClone,
             histopathologyAYearPerformed:'',
             histopathologyAYearPerformedNA:null,
             biopsyAnalysedAtUHB:null,
             histopathologyA: e.target.value,
             changed:true
          });
      }
      else {
        this.setState({
            histopathologyAYearPerformed:'',
            histopathologyAYearPerformedNA:null,
            biopsyAnalysedAtUHB:null,
            histopathologyA: e.target.value,
            changed:true,
         })
      }
}



histopathologyAYearPerformed_onChange(e){


    // if (!!this.state.errors['histopathologyAYearPerformed'] || !!this.state.errors['histopathologyAYearPerformedRange']  ){
    //     //One of the above error has occurred 
    //     console.log('One of the above error has occurred');
    //   //clone object from state 
       let errorsClone = Object.assign({},this.state.errors);
    //   //remove field we just type into from errors.
    //    //Delete the required field      
        delete errorsClone['histopathologyAYearPerformed'];
        delete errorsClone['histopathologyAYearPerformedRange'];
    //    //Only delete range error if current value is ok
    //    if (e.target.value.length > 0  && validYear(e.target.value, AECGCFields.histopathologyYearPerformedMin)) {
    //     console.log('Entered value is ok');
    //     delete errorsClone['histopathologyAYearPerformedRange'];
    //    }
     
     //copy clone back to errors in state
       this.setState({
        //[e.target.name]: e.target.value,
           errors:errorsClone,
           histopathologyAYearPerformed:e.target.value,
           //histopathologyAYearPerformedNA: false,   
           changed:true
       });
    //   }
    //    else {

    //        if (e.target.value.length > 0  && !validYear(e.target.value,AECGCFields.histopathologyYearPerformedMin)) {
    //            //no errors for this field existed before
    //            console.log('no errors for this field existed before')
    //            console.log('and user has eneterd invalid value')
    //            //and user has eneterd invalid value
    //            //clone errors and add to state
    //            let errorsClone = Object.assign({},this.state.errors);
    //            errorsClone.histopathologyAYearPerformedRange = AECGCValidationMessages.histopathology.validYear//'Please enter a year greater than 1920';

    //            this.setState({
    //                        errors:errorsClone,
    //                        histopathologyAYearPerformed:e.target.value,
    //                        //histopathologyAYearPerformedNA: false,   
    //                        changed:true,
    //                    })
    //        } 
    //        else {
    //              console.log('no invalid values update state with no error');
    //              this.setState({
    //                     histopathologyAYearPerformed:e.target.value,
    //                     //histopathologyAYearPerformedNA: false,   
    //                     changed:true
    //                    })
    //                }
    //        }
}

histopathologyAYearPerformed_onBlur(e){
    
    
        if (!!this.state.errors['histopathologyAYearPerformed'] || !!this.state.errors['histopathologyAYearPerformedRange']  ){
            //One of the above error has occurred 
          //  console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
           //Delete the required field      
           delete errorsClone['histopathologyAYearPerformed'];
           //Only delete range error if current value is ok
           if (this.state.histopathologyAYearPerformed.length > 0  && validYear(this.state.histopathologyAYearPerformed, AECGCFields.histopathologyYearPerformedMin)) {
           // console.log('Entered value is ok');
            delete errorsClone['histopathologyAYearPerformedRange'];
           }
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
              // histopathologyAYearPerformed:e.target.value,
               //histopathologyAYearPerformedNA: false,   
               //changed:true
           });
          }
           else {
    
               if (this.state.histopathologyAYearPerformed.length > 0  && !validYear(this.state.histopathologyAYearPerformed,AECGCFields.histopathologyYearPerformedMin)) {
                   //no errors for this field existed before
                //   console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                   errorsClone.histopathologyAYearPerformedRange = AECGCValidationMessages.histopathology.validYear//'Please enter a year greater than 1920';
    
                   this.setState({
                               errors:errorsClone,
                               //histopathologyAYearPerformed:e.target.value,
                               //histopathologyAYearPerformedNA: false,   
                               //changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                     this.setState({
                            errors:errorsClone,
                            //histopathologyAYearPerformed:e.target.value,
                            //histopathologyAYearPerformedNA: false,   
                            //changed:true
                           })
                       }
               }
    }
    

 
histopathologyAYearPerformedNA_onChange(e){
  //  console.log('histopathologyAYearPerformedNA_onChange' +  e.target.checked)

    
if (e.target.checked){
   let errorsClone = Object.assign({},this.state.errors);
   //remove field we just type into from errors.
   delete errorsClone['histopathologyAYearPerformed'];
   delete errorsClone['histopathologyAYearPerformedRange'];
   //copy clone back to errors in state
   this.setState({ 
       errors:errorsClone,
       histopathologyAYearPerformed:'',
       histopathologyAYearPerformedNA: !this.state.histopathologyAYearPerformedNA,
       changed:true,
    });

   }
   else{
    this.setState({
        histopathologyAYearPerformedNA: !this.state.histopathologyAYearPerformedNA,
        changed:true,
      //  metCriteria: this.patientMetCriteria()
    })
   }
}



 
optAutoAntibodiesA_onChange(e){
   // console.log('optAutoAntibodiesA_onChange' +  e.target.value)
     this.setState({
        autoAntibodiesA: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
 }



 optAutoAntibodiesB_onChange(e){
  //   console.log('optAutoAntibodiesB_onChange' +  e.target.value)
     this.setState({
        autoAntibodiesB: e.target.value,
         changed:true,
       //  metCriteria: this.patientMetCriteria()
     })
 }

 ocularSignsModalClose(){
     this.setState({
        ocularSignsModalOpen:false
     })
 }

 ocularSignsConfirmed(ocularSignsObjectiveA,ocularSignsObjectiveR,ocularSignsObjectiveL, ocularSignsObjectiveARNA, ocularSignsObjectiveALNA){
     this.setState({
        ocularSignsObjectiveA:ocularSignsObjectiveA,
        ocularSignsObjectiveAR:ocularSignsObjectiveR,
        ocularSignsObjectiveAL:ocularSignsObjectiveL,
        ocularSignsObjectiveARNA:ocularSignsObjectiveARNA,
        ocularSignsObjectiveALNA:ocularSignsObjectiveALNA,
        ocularSignsModalOpen:false
     }
     )
 }


 
 objectiveEvidenceConfirmed(objectiveEvidenceA,objectiveEvidenceAMl, objectiveEvidenceAMins, objectiveEvidenceANA){
    this.setState({
        objectiveEvidenceA:objectiveEvidenceA,
        objectiveEvidenceAMl:objectiveEvidenceAMl,
        objectiveEvidenceAMins:objectiveEvidenceAMins,
        objectiveEvidenceANA:objectiveEvidenceANA,
       objectiveEvidenceModalOpen:false
    }
    )
}



objectiveEvidenceModalClose(){
    this.setState({
       objectiveEvidenceModalOpen:false
    })
}


optBiopsyAnalysedAtUHB_onChange(e){
    // console.log('optBiopsyAnalysedAtUHB_onChange: ' +  e.target.value)
     this.setState({
        biopsyAnalysedAtUHB: e.target.value,
         changed:true
     })
    }

renderAuditData(){

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
    className="btn btn-success btn-nav pull-right">
        <i className="fa fa-floppy-o mr-5" aria-hidden="true"></i><span>Save</span>
</button>
)
}


renderSavingButton(){
 return (
 <button 
    type="submit" 
    name="patientBaseline-save-btn"  
    id="patient-baseline-btn"
    disabled
    className="btn btn-success btn-nav mr-5 pull-right">
        <span>Saving</span>
        <Spinner characterStyle={{ color: '#FFFFFF' }}/>
</button>
 )
}



renderCompleteButton() {
    return (


        <button 
        type="submit" 
        name="patient-visit-complete-btn"  
        onClick={this.openVisitCompleteModal}
        id="patient-visit-complete-btn"
        className="btn btn-danger btn-nav pull-right mr-10">
            <i className="fa fa-thumbs-up mr-5" aria-hidden="true"></i><span>Complete Visit</span>
    </button>
        
    //     <div className="btn btn-danger complete-visit pull-right"  onClick={() => this.openVisitCompleteModal()}>
    //     <i className="fa fa-thumbs-up mr-5" aria-hidden="true"></i>Complete
    
    // </div>
    )
    }
    
    
    renderCompletingButton(){
     return (
       

<button 
    type="submit" 
    name="patient-visit-completing-btn"  
    id="patient-visit-completing-btn"
    disabled
    className="btn btn-danger btn-nav mr-5 pull-right mr-10">
        <span>Completing Visit</span>
        <Spinner characterStyle={{ color: '#FFFFFF' }}/>
</button>

    //      <div className="btn btn-danger complete-visit pull-right">Completing
    //         <Spinner characterStyle={{ color: '#FFFFFF' }}/>
    
    // </div>
     )
    }


    renderFieldset(){

     if (this.props.visitHeaderResult && 
        this.props.visitHeaderResult.data && 
        this.props.visitHeaderResult.data.completed) {
        return (
            
<div className="panel-body scrollbar-v-visit-content">
        <fieldset disabled="disabled">
            {
                this.renderAmericanEuropeanConsensusGroupCriteria()
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
                this.renderAmericanEuropeanConsensusGroupCriteria()
               }
               </fieldset>
               </div>
                )
            }


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


    isFormValid(){
        return Object.keys(this.state.errors).length === 0  
     }

renderExistingAECGCHeaderPanel(){
    return (
    <div className='panel panel-primary'>
    <div className="panel-heading">
        <div className="row">
            <div className="col-md-6">
            <h3 className="panel-title pull-left">American-European Consensus Group Criteria</h3>
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
nextCategoryName = {VISIT_CATEGORY_DIAGNOSIS}
showNextNav = 
{true}
showPrevNav = {
    false
}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
openVisitCompleteModal={this.openVisitCompleteModal}
/>
          
        </div>
            </div>
             
             </div>
                                    
            
            
            )
}

renderNewAECGCHeaderPanel(){
    
    return (
        <div className= "panel panel-primary">
    
        <div className="panel-heading">
                <h3 className="panel-title">American-European Consensus Group Criteria</h3>
                
            </div>
           
    
<div className="panel-body scrollbar-v-visit-content">
    {
        this.renderAmericanEuropeanConsensusGroupCriteria()
    }
    </div>
    
        <div className="panel-footer visit-well">
           
                    <div className="col-lg-10 col-md-6 col-sm-12"> 
                     
    
                            {/* {
                            this.state.createdDateTime ? this.renderAuditData():null
                            } */}
    
                     
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12"> 
    
    
    
<Flow  
token = {
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    this.props.visitHeaderResult.data.token
}
hasParentChanged = {
    this.state.changed
}
isComplete={false}
sendingRequest= {
    this.props.visitResult.sendingRequest
}
isNew={true }
nextCategoryName = {VISIT_CATEGORY_DIAGNOSIS}
showNextNav = {false}
showPrevNav = {false}
handleSaveVisitHeader ={this.handleSaveVisitHeader}
/>
            </div>
               
                 </div>
                 </div>
                                        
                
                
                )

    }
    


renderAmericanEuropeanConsensusGroupCriteria(){
    
    return (
        // <FadeIn>
        <div>
            <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">I. Ocular symptoms</div>              
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">

                            <FunkyRadioTwoOptions caption={"(a) Have you had daily, persistent, troublesome dry eyes for more than three months?"}
                                                optionName={"ocularSymptomsA"}
                                                optionOneId={"optOcularSymptomsAYes"}
                                                optionTwoId={"optOcularSymptomsANo"}
                                                optionOneHtmlFor={"optOcularSymptomsAYes"}
                                                optionTwoHtmlFor={"optOcularSymptomsANo"}
                                                    optionOneChecked={this.state.ocularSymptomsA == ocularSymptoms.optOcularSymptomsA[0].controlValueId}
                                                    optionOneDefaultValue={ocularSymptoms.optOcularSymptomsA[0].controlValueId}
                                                    optionOneOnClick={this.optOcularSymptomsA_onChange}
                                                    optionOneCaption={ocularSymptoms.optOcularSymptomsA[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.ocularSymptomsA == ocularSymptoms.optOcularSymptomsA[1].controlValueId}
                                                    optionTwoDefaultValue={ocularSymptoms.optOcularSymptomsA[1].controlValueId}
                                                    optionTwoOnClick={this.optOcularSymptomsA_onChange}
                                                    optionTwoCaption={ocularSymptoms.optOcularSymptomsA[1].controlValue}
                                                     />

                              <FunkyRadioTwoOptions caption={"(b) Do you have a recurrent sensation of sand or gravel in the eyes?"}
                              optionName={"ocularSymptomsB"}
                                                optionOneId={"optOcularSymptomsBYes"}
                                                optionTwoId={"optOcularSymptomsBNo"}
                                                optionThreeId={"optOcularSymptomsBNA"}
                                                optionOneHtmlFor={"optOcularSymptomsBYes"}
                                                optionTwoHtmlFor={"optOcularSymptomsBNo"}
                                                optionThreeHtmlFor={"optOcularSymptomsBNA"}
                                                    optionOneChecked={this.state.ocularSymptomsB == ocularSymptoms.optOcularSymptomsB[0].controlValueId}
                                                    optionOneDefaultValue={ocularSymptoms.optOcularSymptomsB[0].controlValueId}
                                                    optionOneOnClick={this.optOcularSymptomsB_onChange}
                                                    optionOneCaption={ocularSymptoms.optOcularSymptomsB[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.ocularSymptomsB == ocularSymptoms.optOcularSymptomsB[1].controlValueId}
                                                    optionTwoDefaultValue={ocularSymptoms.optOcularSymptomsB[1].controlValueId}
                                                    optionTwoOnClick={this.optOcularSymptomsB_onChange}
                                                    optionTwoCaption={ocularSymptoms.optOcularSymptomsB[1].controlValue}
                                                    
                                                 />

                            <FunkyRadioTwoOptions caption={"(c) Do you use tear substitutes more than three times a day?"}
                              optionName={"ocularSymptomsC"}
                                                optionOneId={"optOcularSymptomsCYes"}
                                                optionTwoId={"optOcularSymptomsCNo"}
                                                optionThreeId={"optOcularSymptomsCNA"}
                                                optionOneHtmlFor={"optOcularSymptomsCYes"}
                                                optionTwoHtmlFor={"optOcularSymptomsCNo"}
                                                optionThreeHtmlFor={"optOcularSymptomsCNA"}
                                                    optionOneChecked={this.state.ocularSymptomsC == ocularSymptoms.optOcularSymptomsC[0].controlValueId}
                                                    optionOneDefaultValue={ocularSymptoms.optOcularSymptomsC[0].controlValueId}
                                                    optionOneOnClick={this.optOcularSymptomsC_onChange}
                                                    optionOneCaption={ocularSymptoms.optOcularSymptomsC[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.ocularSymptomsC == ocularSymptoms.optOcularSymptomsC[1].controlValueId}
                                                    optionTwoDefaultValue={ocularSymptoms.optOcularSymptomsC[1].controlValueId}
                                                    optionTwoOnClick={this.optOcularSymptomsC_onChange}
                                                    optionTwoCaption={ocularSymptoms.optOcularSymptomsC[1].controlValue}
                                                     />

                           
                        </div>
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                </div>
            </div>
          
            <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">II. Oral symptoms</div>              
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">

                            <FunkyRadioTwoOptions caption={"(a) Have you had a daily feeling of dry mouth for more than three months?"}
                                                optionName={"oralSymptomsA"}
                                                optionOneId={"optOralSymptomsAYes"}
                                                optionTwoId={"optOralSymptomsANo"}
                                                optionOneHtmlFor={"optOralSymptomsAYes"}
                                                optionTwoHtmlFor={"optOralSymptomsANo"}
                                                    optionOneChecked={this.state.oralSymptomsA == oralSymptoms.optOralSymptomsA[0].controlValueId}
                                                    optionOneDefaultValue={oralSymptoms.optOralSymptomsA[0].controlValueId}
                                                    optionOneOnClick={this.optOralSymptomsA_onChange}
                                                    optionOneCaption={oralSymptoms.optOralSymptomsA[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.oralSymptomsA == oralSymptoms.optOralSymptomsA[1].controlValueId}
                                                    optionTwoDefaultValue={oralSymptoms.optOralSymptomsA[1].controlValueId}
                                                    optionTwoOnClick={this.optOralSymptomsA_onChange}
                                                    optionTwoCaption={oralSymptoms.optOralSymptomsA[1].controlValue}
                                                     />


                              <FunkyRadioTwoOptions caption={"(b) Have you ever had recurrent or persistently swollen salivary glands as an adult?"}
                                                optionName={"oralSymptomsB"}
                                                optionOneId={"optOralSymptomsBYes"}
                                                optionTwoId={"optOralSymptomsBNo"}
                                                optionOneHtmlFor={"optOralSymptomsBYes"}
                                                optionTwoHtmlFor={"optOralSymptomsBNo"}
                                                    optionOneChecked={this.state.oralSymptomsB == oralSymptoms.optOralSymptomsB[0].controlValueId}
                                                    optionOneDefaultValue={oralSymptoms.optOralSymptomsB[0].controlValueId}
                                                    optionOneOnClick={this.optOralSymptomsB_onChange}
                                                    optionOneCaption={oralSymptoms.optOralSymptomsB[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.oralSymptomsB == oralSymptoms.optOralSymptomsB[1].controlValueId}
                                                    optionTwoDefaultValue={oralSymptoms.optOralSymptomsB[1].controlValueId}
                                                    optionTwoOnClick={this.optOralSymptomsB_onChange}
                                                    optionTwoCaption={oralSymptoms.optOralSymptomsB[1].controlValue}
                                                     />

                            <FunkyRadioTwoOptions caption={"(c) Do you frequently drink liquids to aid in swallowing dry foods?"}
                              optionName={"oralSymptomsC"}
                                                optionOneId={"optOralSymptomsCYes"}
                                                optionTwoId={"optOralSymptomsCNo"}
                                                optionOneHtmlFor={"optOralSymptomsCYes"}
                                                optionTwoHtmlFor={"optOralSymptomsCNo"}
                                                    optionOneChecked={this.state.oralSymptomsC == oralSymptoms.optOralSymptomsC[0].controlValueId}
                                                    optionOneDefaultValue={oralSymptoms.optOralSymptomsC[0].controlValueId}
                                                    optionOneOnClick={this.optOralSymptomsC_onChange}
                                                    optionOneCaption={oralSymptoms.optOralSymptomsC[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.oralSymptomsC == oralSymptoms.optOralSymptomsC[1].controlValueId}
                                                    optionTwoDefaultValue={oralSymptoms.optOralSymptomsC[1].controlValueId}
                                                    optionTwoOnClick={this.optOralSymptomsC_onChange}
                                                    optionTwoCaption={oralSymptoms.optOralSymptomsC[1].controlValue}
                                                     />

                           
                        </div>
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                </div>
            </div>


                <div className="row">
                    <div className="col-md-12"> 
                                <div className="page-header">III. Ocular signs (objective)</div>              
                                    <div className="block block-inclusion-criteria-head no-pad">
                                        <div className="block-content-no-border">
                                        
                                     
                                           
                                            <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" 
                                                className ="control-label col-md-6 col-sm-12">
                                              

                                                (a) Schirmer’s I test (≤ 5mm over 5 min, without anaesthesia) Or
                                               
                                                </label>


               

                                               



                                                <div className={classnames('col-md-6 col-sm-12',
                                                                            {"positive-result": 
                                                                            this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId &&
                                                                                !!!this.state.errors.ocularSignsObjectiveAR && 
                                                                                !!!this.state.errors.ocularSignsObjectiveARRange && 
                                                                                !!!this.state.errors.ocularSignsObjectiveARInvalidNumber &&
                                                                                !!!this.state.errors.ocularSignsObjectiveAL && 
                                                                                !!!this.state.errors.ocularSignsObjectiveALRange && 
                                                                                !!!this.state.errors.ocularSignsObjectiveALInvalidNumber,
                                                                            "negative-result":
                                                                            this.state.ocularSignsObjectiveA == ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId &&
                                                                                !!!this.state.errors.ocularSignsObjectiveAR && 
                                                                                !!!this.state.errors.ocularSignsObjectiveARRange && 
                                                                                !!!this.state.errors.ocularSignsObjectiveARInvalidNumber &&
                                                                                !!!this.state.errors.ocularSignsObjectiveAL && 
                                                                                !!!this.state.errors.ocularSignsObjectiveALRange &&
                                                                                !!!this.state.errors.ocularSignsObjectiveALInvalidNumber
                                                                            }
                                                                         )
                                                                }>
                                                <div className={classnames('col-md-4 col-sm-12',{error:
                                                !!this.state.errors.ocularSignsObjectiveAR || 
                                                !!this.state.errors.ocularSignsObjectiveARRange ||
                                                !!this.state.errors.ocularSignsObjectiveARInvalidNumber })}>
                                
                                                

                                                    <InputGroupAddOnLR leftAddOn={"R"} rightAddOn={"mm"} >
                                                        <input  className="form-control" 
                                                        disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="ocularSignsObjectiveAR"
                                                                                name="ocularSignsObjectiveAR" 
                                                                                ref="ocularSignsObjectiveAR" 
                                                                                placeholder="00"
                                                                                value={this.state.ocularSignsObjectiveAR}
                                                                                onChange={this.ocularSignsObjectiveAR_onChange}
                                                                                onKeyPress={this.ocularSignsObjectiveAR_onKeyPress}
                                                                                onBlur={this.ocularSignsObjectiveALR_onBlur}
                                                                                onMouseDown={ (e) => e.target.focus()}
                                                                                type="number"
                                                                                maxLength="2"
                                                                                onInput={maxLengthCheck} 
                                                                                step="1" 
                                                                                min={AECGCFields.ocularSignsObjectiveEyeMin} 
                                                                                max={AECGCFields.ocularSignsObjectiveEyeMax}  />

                                                                               
                                                    </InputGroupAddOnLR>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveAR,hidden:!!!this.state.errors.ocularSignsObjectiveAR})}>{this.state.errors.ocularSignsObjectiveAR}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveARRange,hidden:!!!this.state.errors.ocularSignsObjectiveARRange })}>{this.state.errors.ocularSignsObjectiveARRange}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveARInvalidNumber,hidden:!!!this.state.errors.ocularSignsObjectiveARInvalidNumber})}>{this.state.errors.ocularSignsObjectiveARInvalidNumber}</span>
                
                                                </div>
                               
                                                <div className="col-md-2 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="ocularSignsObjectiveARNA"  id="ocularSignsObjectiveARNA" 
                                                            checked={this.state.ocularSignsObjectiveAR.length > 0 ? false :this.state.ocularSignsObjectiveARNA} 
                                                            onChange={this.ocularSignsObjectiveARNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="ocularSignsObjectiveARNA">N/A</label>
                                                    </div>
                                                </div>


                                                <div className={classnames('col-md-4 col-sm-12',{error:
                                                !!this.state.errors.ocularSignsObjectiveAL || 
                                                !!this.state.errors.ocularSignsObjectiveALRange ||
                                                !!this.state.errors.ocularSignsObjectiveALInvalidNumber
                                                })}>
                                
                                               
                                                
                                                 <InputGroupAddOnLR leftAddOn={"L"} rightAddOn={"mm"} >                                                  
                                                    <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                                    this.props.visitHeaderResult.data && 
                                                                    this.props.visitHeaderResult.data.completed ? true: false}
                                                        id="ocularSignsObjectiveAL"
                                                        name="ocularSignsObjectiveAL" 
                                                        ref="ocularSignsObjectiveAL" 
                                                        placeholder="00"
                                                        value={this.state.ocularSignsObjectiveAL}
                                                        onChange={this.ocularSignsObjectiveAL_onChange}
                                                        onKeyPress={this.ocularSignsObjectiveAL_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                        onBlur={this.ocularSignsObjectiveALR_onBlur}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                        type="number" step="1" 
                                                        maxLength="2"
                                                        onInput={maxLengthCheck}
                                                        min={AECGCFields.ocularSignsObjectiveEyeMin} 
                                                        max={AECGCFields.ocularSignsObjectiveEyeMax}/>
                                                        </InputGroupAddOnLR>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveAL,hidden:!!!this.state.errors.ocularSignsObjectiveAL})}>{this.state.errors.ocularSignsObjectiveAL}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveALRange,hidden:!!!this.state.errors.ocularSignsObjectiveALRange })}>{this.state.errors.ocularSignsObjectiveALRange}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveALInvalidNumber,hidden:!!!this.state.errors.ocularSignsObjectiveALInvalidNumber})}>{this.state.errors.ocularSignsObjectiveALInvalidNumber}</span>
                                                </div>

                                                 <div className="col-md-2 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="ocularSignsObjectiveALNA"  id="ocularSignsObjectiveALNA" 
                                                            checked={this.state.ocularSignsObjectiveAL.length > 0 ? false :this.state.ocularSignsObjectiveALNA} 
                                                            onChange={this.ocularSignsObjectiveALNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="ocularSignsObjectiveALNA">N/A</label>
                                                    </div>
                                                </div>

  

                                            </div>
                                         </div>


                                            <FunkyRadioThreeOptions caption={"(b) Lissamine green score or equivalent (≥4, van Bijsterveld’s scoring system or OSS ≥5)"}
                                        optionName={"ocularSignsObjectiveB"}
                                        optionOneId={"optOcularSignsObjectiveBYes"}
                                        optionTwoId={"optOcularSignsObjectiveBNo"}
                                        optionThreeId={"optOcularSignsObjectiveBNA"}
                                        optionOneHtmlFor={"optOcularSignsObjectiveBYes"}
                                        optionTwoHtmlFor={"optOcularSignsObjectiveBNo"}
                                        optionThreeHtmlFor={"optOcularSignsObjectiveBNA"}

                                            optionOneChecked={this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[0].controlValueId}
                                            optionOneDefaultValue={ocularSignsObjective.optOcularSignsObjectiveB[0].controlValueId}
                                            optionOneOnClick={this.optOcularSignsObjectiveB_onChange}
                                            optionOneCaption={ocularSignsObjective.optOcularSignsObjectiveB[0].controlValue}
                                            
                                            optionTwoChecked={this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[1].controlValueId}
                                            optionTwoDefaultValue={ocularSignsObjective.optOcularSignsObjectiveB[1].controlValueId}
                                            optionTwoOnClick={this.optOcularSignsObjectiveB_onChange}
                                            optionTwoCaption={ocularSignsObjective.optOcularSignsObjectiveB[1].controlValue}
                                            
                                            optionThreeChecked={this.state.ocularSignsObjectiveB == ocularSignsObjective.optOcularSignsObjectiveB[2].controlValueId}
                                            optionThreeDefaultValue={ocularSignsObjective.optOcularSignsObjectiveB[2].controlValueId}
                                            optionThreeOnClick={this.optOcularSignsObjectiveB_onChange}
                                            optionThreeCaption={ocularSignsObjective.optOcularSignsObjectiveB[2].controlValue} />


                                        </div>
                                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                                    </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12"> 
                                <div className="page-header">
                               
                             
                                    
                                    IV. Objective evidence of salivary gland involvement
                                    <span className={classnames('',{'ml-5 visible-inline error info':!!this.state.errors.objectiveEvidence,hidden:!!!this.state.errors.objectiveEvidence})}>{this.state.errors.objectiveEvidence}</span>
                                    </div>              
                                    <div className="block block-inclusion-criteria-head no-pad">
                                        <div className="block-content-no-border">

                                            <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" 
                                                className ="control-label col-md-6 col-sm-12">

                                     

                                                
                                                (a) Unstimulated salivary flow ≤1.5ml in 15 min</label>
                                
                                                
                                                

                                                <div className={classnames('col-md-6 col-sm-12',
                                                                            {"positive-result": 
                                                                            this.state.objectiveEvidenceA == objectiveEvidence.optObjectiveEvidenceA[0].controlValueId &&
                                                                                !!!this.state.errors.objectiveEvidenceAMl && 
                                                                                !!!this.state.errors.objectiveEvidenceAMlRange  &&
                                                                                !!!this.state.errors.objectiveEvidenceAMlInvalidNumber &&
                                                                                !!!this.state.errors.objectiveEvidenceAMins && 
                                                                                !!!this.state.errors.objectiveEvidenceAMinsRange &&
                                                                               !!!this.state.errors.objectiveEvidence &&
                                                                               !!!this.state.errors.objectiveEvidenceAMinsInvalidNumber,
                                                                            "negative-result":
                                                                            this.state.objectiveEvidenceA == objectiveEvidence.optObjectiveEvidenceA[1].controlValueId &&
                                                                            !!!this.state.errors.objectiveEvidenceAMl && 
                                                                            !!!this.state.errors.objectiveEvidenceAMlRange &&
                                                                            !!!this.state.errors.objectiveEvidenceAMlInvalidNumber &&
                                                                            !!!this.state.errors.objectiveEvidenceAMins && 
                                                                            !!!this.state.errors.objectiveEvidenceAMinsRange &&
                                                                            !!!this.state.errors.objectiveEvidence &&
                                                                            !!!this.state.errors.objectiveEvidenceAMinsInvalidNumber
                                                                            }
                                                                         )
                                                                }>


                                                <div className={classnames('col-md-4 col-sm-12',{error:
                                                !!this.state.errors.objectiveEvidenceAMl || 
                                                !!this.state.errors.objectiveEvidenceAMlRange || 
                                                !!this.state.errors.objectiveEvidenceAMlInvalidNumber})}>

                                                    <InputGroupAddOnR  rightAddOn={"ml"}>
                                                   
                                                    <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                        id="objectiveEvidenceAMl"
                                                        name="objectiveEvidenceAMl" 
                                                        ref="objectiveEvidenceAMl"
                                                        placeholder="00.00" 
                                                        value={this.state.objectiveEvidenceAMl}
                                                        onChange={this.objectiveEvidenceAMl_onChange}
                                                        onKeyPress={this.objectiveEvidenceAMl_onKeyPress}
                                                        onBlur={this.objectiveEvidenceAMl_onBlur}
                                                        onKeyUp={this.objectiveEvidenceAMl_onKeyUp}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                        type="number" 
                                                        maxLength="5"
                                                        onInput={this.maxLengthCheck_ml} 
                                                        step="0.01" 
                                                        min={AECGCFields.objectiveEvidenceMlMin} 
                                                        max={AECGCFields.objectiveEvidenceMlMax}
                                                    />
                                                   
                                                                 
                                                    </InputGroupAddOnR>

                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceAMl,hidden:!!!this.state.errors.objectiveEvidenceAMl})}>{this.state.errors.objectiveEvidenceAMl}</span>
                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceAMlRange,hidden:!!!this.state.errors.objectiveEvidenceAMlRange })}>{this.state.errors.objectiveEvidenceAMlRange}</span>
                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceAMlInvalidNumber,hidden:!!!this.state.errors.objectiveEvidenceAMlInvalidNumber })}>{this.state.errors.objectiveEvidenceAMlInvalidNumber}</span>
                                                
                                                </div>
                               
                                                <div className={classnames('col-md-4 col-sm-12',{error:!!this.state.errors.objectiveEvidenceAMins || !!this.state.errors.objectiveEvidenceAMinsRange || !!this.state.errors.objectiveEvidenceAMinsInvalidNumber})}>
                                                 <InputGroupAddOnR rightAddOn={"mins"}>

                                                 <input  className="form-control" 
                                                 disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                            id="inputObjectiveEvidenceAMins"
                                                            name="inputObjectiveEvidenceAMins" 
                                                            ref="inputObjectiveEvidenceAMins" 
                                                            placeholder="00"
                                                            value={this.state.objectiveEvidenceAMins}
                                                            onChange={this.objectiveEvidenceAMins_onChange}
                                                            onKeyPress={this.objectiveEvidenceAMins_onKeyPress}
                                                            onBlur={this.objectiveEvidenceAMins_onBlur}
                                                            onMouseDown={ (e) => e.target.focus() }
                                                            type="number" 
                                                            step="1"
                                                            maxLength="2"
                                                            onInput={maxLengthCheck}
                                                            min={AECGCFields.objectiveEvidenceMinsMin} max={AECGCFields.objectiveEvidenceMinsMax} />
                                                        </InputGroupAddOnR>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceAMins,hidden:!!!this.state.errors.objectiveEvidenceAMins})}>{this.state.errors.objectiveEvidenceAMins}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceAMinsRange,hidden:!!!this.state.errors.objectiveEvidenceAMinsRange })}>{this.state.errors.objectiveEvidenceAMinsRange}</span>
                                                    <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceAMinsInvalidNumber,hidden:!!!this.state.errors.objectiveEvidenceAMinsInvalidNumber})}>{this.state.errors.objectiveEvidenceAMinsInvalidNumber}</span>
                                                 </div>

                                                 <div className="col-md-4 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="objectiveEvidenceANA"  id="objectiveEvidenceANA" 
                                                            checked={this.state.objectiveEvidenceAMl.length > 0 || this.state.objectiveEvidenceAMins.length > 0 ? 
                                                                        false :this.state.objectiveEvidenceANA} 
                                                            onChange={this.objectiveEvidenceANA_onChange}/>
                                                            <label className="radio-inline" htmlFor="objectiveEvidenceANA">N/A</label>
                                                    </div>
                                                </div>
                                            </div>
                                           </div>
                                           


                                            <FunkyRadioThreeOptions caption={"(b) Abnormal parotid sialography"}
                                        optionName={"objectiveEvidenceB"}
                                        optionOneId={"optObjectiveEvidenceBYes"}
                                        optionTwoId={"optObjectiveEvidenceBNo"}
                                        optionThreeId={"optObjectiveEvidenceBNA"}
                                        optionOneHtmlFor={"optObjectiveEvidenceBYes"}
                                        optionTwoHtmlFor={"optObjectiveEvidenceBNo"}
                                        optionThreeHtmlFor={"optObjectiveEvidenceBNA"}

                                            optionOneChecked={this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[0].controlValueId}
                                            optionOneDefaultValue={objectiveEvidence.optObjectiveEvidenceB[0].controlValueId}
                                            optionOneOnClick={this.optObjectiveEvidenceB_onChange}
                                            optionOneCaption={objectiveEvidence.optObjectiveEvidenceB[0].controlValue}
                                            
                                            optionTwoChecked={this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[1].controlValueId}
                                            optionTwoDefaultValue={objectiveEvidence.optObjectiveEvidenceB[1].controlValueId}
                                            optionTwoOnClick={this.optObjectiveEvidenceB_onChange}
                                            optionTwoCaption={objectiveEvidence.optObjectiveEvidenceB[1].controlValue}
                                            
                                            optionThreeChecked={this.state.objectiveEvidenceB == objectiveEvidence.optObjectiveEvidenceB[2].controlValueId}
                                            optionThreeDefaultValue={objectiveEvidence.optObjectiveEvidenceB[2].controlValueId}
                                            optionThreeOnClick={this.optObjectiveEvidenceB_onChange}
                                            optionThreeCaption={objectiveEvidence.optObjectiveEvidenceB[2].controlValue} />

                                        </div>
                                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                                    </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12"> 
                                <div className="page-header">V. Histopathology</div>              
                                    <div className="block block-inclusion-criteria-head no-pad">
                                        <div className="block-content-no-border">

                                        
                                        <FunkyRadioThreeOptions caption={"Focus score ≥1 in minor salivary gland biopsy "}
                                        optionName={"histopathologyA"}
                                        optionOneId={"optHistopathologyAYes"}
                                        optionTwoId={"optHistopathologyANo"}
                                        optionThreeId={"optHistopathologyANA"}
                                        optionOneHtmlFor={"optHistopathologyAYes"}
                                        optionTwoHtmlFor={"optHistopathologyANo"}
                                        optionThreeHtmlFor={"optHistopathologyANA"}

                                            optionOneChecked={this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId}
                                            optionOneDefaultValue={histopathology.optHistopathologyA[0].controlValueId}
                                            optionOneOnClick={this.optHistopathologyA_onChange}
                                            optionOneCaption={histopathology.optHistopathologyA[0].controlValue}
                                            
                                            optionTwoChecked={this.state.histopathologyA == histopathology.optHistopathologyA[1].controlValueId}
                                            optionTwoDefaultValue={histopathology.optHistopathologyA[1].controlValueId}
                                            optionTwoOnClick={this.optHistopathologyA_onChange}
                                            optionTwoCaption={histopathology.optHistopathologyA[1].controlValue}
                                            
                                            optionThreeChecked={this.state.histopathologyA == histopathology.optHistopathologyA[2].controlValueId}
                                            optionThreeDefaultValue={histopathology.optHistopathologyA[2].controlValueId}
                                            optionThreeOnClick={this.optHistopathologyA_onChange}
                                            optionThreeCaption={histopathology.optHistopathologyA[2].controlValue} />


                                    { this.state.histopathologyA == histopathology.optHistopathologyA[0].controlValueId && 
                                        <FadeIn>
                                            <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" 
                                                className ="control-label col-md-offset-1 col-md-2 col-sm-12 text-right">Year performed:</label>
                                                <div className={classnames('col-md-2 col-sm-12',{error:!!this.state.errors.histopathologyAYearPerformed || !!this.state.errors.histopathologyAYearPerformedRange})}>
                                                   
                                                        <input  className="form-control" 
                                                                                disabled={this.props.visitHeaderResult && 
                                                                                this.props.visitHeaderResult.data && 
                                                                                this.props.visitHeaderResult.data.completed ? true: false}
                                                                                id="inputHistopathologyAYearPerformed"
                                                                                name="inputHistopathologyAYearPerformed" 
                                                                                ref="inputHistopathologyAYearPerformed" 
                                                                                value={this.state.histopathologyAYearPerformed}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                onChange={this.histopathologyAYearPerformed_onChange}
                                                                                onBlur={this.histopathologyAYearPerformed_onBlur}
                                                                                onKeyPress={this.histopathologyAYearPerformed_onKeyPress}
                                                                                placeholder="Year" />
                                                
                                                        <span className={classnames('',{'visible error info':this.state.errors.histopathologyAYearPerformed})}>{this.state.errors.histopathologyAYearPerformed}</span>
                                                        <span className={classnames('',{'visible error info':this.state.errors.histopathologyAYearPerformedRange})}>{this.state.errors.histopathologyAYearPerformedRange}</span>

                                                
                                                </div>
                               
                                                <div className="col-md-1 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="histopathologyAYearPerformedNA"  id="histopathologyAYearPerformedNA" 
                                                            defaultChecked={this.state.histopathologyAYearPerformed.length > 0 ? false :this.state.histopathologyAYearPerformedNA} 
                                                            onClick={this.histopathologyAYearPerformedNA_onChange}
                                                            />
                                                            <label className="radio-inline" htmlFor="histopathologyAYearPerformedNA">N/A</label>
                                                    </div>
                                                </div>

                                               

                                                   

                                                     <label htmlFor="attendedUHBpSSClinic" className ="control-label col-md-2 col-sm-12 text-right">{"Biopsy analysed at UHB?"}</label>
                                                        <div className="col-md-2 col-sm-12 funkyradio">
                                                            <div className="funkyradio-success">
                                                                    <input type="Radio" name={"biopsyAnalysedAtUHB"}  id={"optBiopsyAnalysedAtUHBYes"} 
                                                                    checked={this.state.biopsyAnalysedAtUHB == histopathology.optBiopsyAnalysedAtUHB[0].controlValueId} 
                                                                    defaultValue={histopathology.optBiopsyAnalysedAtUHB[0].controlValueId} 
                                                                    onChange={this.optBiopsyAnalysedAtUHB_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optBiopsyAnalysedAtUHBYes"}>{histopathology.optBiopsyAnalysedAtUHB[0].controlValue}</label>
                                                            </div>
                                                            <div className="funkyradio-danger">
                                                                    <input type="Radio" name={"biopsyAnalysedAtUHB"} id={"optBiopsyAnalysedAtUHBNo"} 
                                                                    checked={this.state.biopsyAnalysedAtUHB == histopathology.optBiopsyAnalysedAtUHB[1].controlValueId} 
                                                                    defaultValue={histopathology.optBiopsyAnalysedAtUHB[1].controlValueId} 
                                                                    onChange={this.optBiopsyAnalysedAtUHB_onChange}/>
                                                                    <label className="radio-inline" htmlFor={"optBiopsyAnalysedAtUHBNo"}>{histopathology.optBiopsyAnalysedAtUHB[1].controlValue}</label>
                                                            </div>
                                                        </div>

                                                    



                                            </div>
                                            </FadeIn>
                                        }








                                         </div>
                                         <hr className="patient-baseline-inclusion-criteria-hr"/>
                                    </div>
                    </div>
                </div>  

                <div className="row">
                <div className="col-md-12"> 
                <div className="page-header">VI. Autoantibodies</div>              
                    <div className="block block-inclusion-criteria-head no-pad">
                        <div className="block-content-no-border">

                            <FunkyRadioThreeOptions caption={"(a) Anti-Ro antibodies or"}
                                                optionName={"autoAntibodiesA"}
                                                optionOneId={"optAutoAnitibodiesAYes"}
                                                optionTwoId={"optAutoAnitibodiesANo"}
                                                optionThreeId={"optAutoAnitibodiesANA"}
                                                optionOneHtmlFor={"optAutoAnitibodiesAYes"}
                                                optionTwoHtmlFor={"optAutoAnitibodiesANo"}
                                                optionThreeHtmlFor={"optAutoAnitibodiesANA"}
                                                    optionOneChecked={this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[0].controlValueId}
                                                    optionOneDefaultValue={autoAntibodies.optAutoAntibodiesA[0].controlValueId}
                                                    optionOneOnClick={this.optAutoAntibodiesA_onChange}
                                                    optionOneCaption={autoAntibodies.optAutoAntibodiesA[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[1].controlValueId}
                                                    optionTwoDefaultValue={autoAntibodies.optAutoAntibodiesA[1].controlValueId}
                                                    optionTwoOnClick={this.optAutoAntibodiesA_onChange}
                                                    optionTwoCaption={autoAntibodies.optAutoAntibodiesA[1].controlValue}

                                                    optionThreeChecked={this.state.autoAntibodiesA == autoAntibodies.optAutoAntibodiesA[2].controlValueId}
                                                    optionThreeDefaultValue={autoAntibodies.optAutoAntibodiesA[2].controlValueId}
                                                    optionThreeOnClick={this.optAutoAntibodiesA_onChange}
                                                    optionThreeCaption={autoAntibodies.optAutoAntibodiesA[2].controlValue}

                                                    />

                              <FunkyRadioThreeOptions caption={"(b) Anti-La antibodies"}
                                                optionName={"autoAntibodiesB"}
                                                optionOneId={"optAutoAnitibodiesBYes"}
                                                optionTwoId={"optAutoAnitibodiesBNo"}
                                                optionThreeId={"optAutoAnitibodiesBNA"}
                                                optionOneHtmlFor={"optAutoAnitibodiesBYes"}
                                                optionTwoHtmlFor={"optAutoAnitibodiesBNo"}
                                                optionThreeHtmlFor={"optAutoAnitibodiesBNA"}

                                                    optionOneChecked={this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[0].controlValueId}
                                                    optionOneDefaultValue={autoAntibodies.optAutoAntibodiesB[0].controlValueId}
                                                    optionOneOnClick={this.optAutoAntibodiesB_onChange}
                                                    optionOneCaption={autoAntibodies.optAutoAntibodiesB[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[1].controlValueId}
                                                    optionTwoDefaultValue={autoAntibodies.optAutoAntibodiesB[1].controlValueId}
                                                    optionTwoOnClick={this.optAutoAntibodiesB_onChange}
                                                    optionTwoCaption={autoAntibodies.optAutoAntibodiesB[1].controlValue}
                                                    
                                                    optionThreeChecked={this.state.autoAntibodiesB == autoAntibodies.optAutoAntibodiesB[2].controlValueId}
                                                    optionThreeDefaultValue={autoAntibodies.optAutoAntibodiesB[2].controlValueId}
                                                    optionThreeOnClick={this.optAutoAntibodiesB_onChange}
                                                    optionThreeCaption={autoAntibodies.optAutoAntibodiesB[2].controlValue}
                                                    
                                                     />

                           

                           
                        </div>
                        <hr className="patient-baseline-inclusion-criteria-hr"/>
                    </div>
                </div>
            </div>
</div>
// </FadeIn>

           
       
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
                    this.renderExistingAECGCHeaderPanel():this.renderNewAECGCHeaderPanel()
                  }

                  <OcularSignsModal 
                                            ocularSignsModalOpen={this.state.ocularSignsModalOpen} 
                                            contentLabel={"Options"} 
                                            ocularSignsObjectiveA={this.state.ocularSignsObjectiveA} 
                                            ocularSignsObjectiveAR={this.state.ocularSignsObjectiveAR} 
                                            ocularSignsObjectiveAL={this.state.ocularSignsObjectiveAL}
                                            ocularSignsObjectiveARNA={this.state.ocularSignsObjectiveARNA} 
                                            ocularSignsObjectiveALNA={this.state.ocularSignsObjectiveALNA}
                                            ocularSignsModalClose={this.ocularSignsModalClose}
                                            ocularSignsConfirmed={this.ocularSignsConfirmed}/>

                                            
<ObjectiveEvidenceModal 
objectiveEvidenceModalOpen={this.state.objectiveEvidenceModalOpen} 
                                            contentLabel={"Options"} 
                                            objectiveEvidenceA={this.state.objectiveEvidenceA} 
                                            objectiveEvidenceAMl={this.state.objectiveEvidenceAMl} 
                                            objectiveEvidenceAMins={this.state.objectiveEvidenceAMins}
                                            objectiveEvidenceANA={this.state.objectiveEvidenceANA} 
                                            objectiveEvidenceModalClose={this.objectiveEvidenceModalClose}
                                            objectiveEvidenceConfirmed={this.objectiveEvidenceConfirmed}
/>



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

 export default AmericanEuropeanCGCForm;

