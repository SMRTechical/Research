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
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue,getCategoryControls,getControlValues,getVisitOptionControlValue_V2} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import {pastMedicalHistory} from '../../config/controls/past-medical-history';
import PastMedicalHistoryFamilyMembers from './past-medical-history-family-members';
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

class PastMedicalHistoryForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
          //  patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
          patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
          
          visitControls: this.props.visitControlValuesResult && 
                            this.props.visitControlValuesResult.data && 
                                this.props.visitControlValuesResult.data.visitControlValues && 
                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues) 
                                        : null,          

        ddlIschaemicHeartDiseaseOptions : 
                                            this.props.visitControlValuesResult && 
                                            this.props.visitControlValuesResult.data && 
                                                this.props.visitControlValuesResult.data.visitControlValues && 
                                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlIscaemicHeartDisease.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

        ischaemicHeartDisease :
                              this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlIscaemicHeartDisease,this.props.visitResult.data.details):null,    
                                      
        ischaemicHeartDiseaseOpen:false,

        ddlSjogrensSyndromeOptions : this.props.visitControlValuesResult && 
                                        this.props.visitControlValuesResult.data && 
                                            this.props.visitControlValuesResult.data.visitControlValues && 
                                               this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                 getControlValues(pastMedicalHistory.ddlSjogrensSyndrome.controlId,
                                                    getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

        sjogrensSyndrome :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSjogrensSyndrome,this.props.visitResult.data.details):null,    
                                                                                            
        sjogrensSyndromeOpen:false,


        ddlPrimaryBiliaryCirrhosisOptions : this.props.visitControlValuesResult && 
                                                this.props.visitControlValuesResult.data && 
                                                    this.props.visitControlValuesResult.data.visitControlValues && 
                                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlPrimaryBiliaryCirrhosis.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

        primaryBiliaryCirrhosis : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPrimaryBiliaryCirrhosis,this.props.visitResult.data.details):null,    
                                                                            
        primaryBiliaryCirrhosisOpen:false,

        ddlMSOptions : this.props.visitControlValuesResult && 
                        this.props.visitControlValuesResult.data && 
                            this.props.visitControlValuesResult.data.visitControlValues && 
                            this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlMS.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

        mS : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMS,this.props.visitResult.data.details):null,    
                                            
        mSOpen:false,

        ddlSLEOptions : this.props.visitControlValuesResult && 
                            this.props.visitControlValuesResult.data && 
                                this.props.visitControlValuesResult.data.visitControlValues && 
                                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                    getControlValues(pastMedicalHistory.ddlSLE.controlId,
                                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

        sLE : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSLE,this.props.visitResult.data.details):null,    
                                    
        sLEOpen:false,


        ddlSLEOptions : this.props.visitControlValuesResult && 
        this.props.visitControlValuesResult.data && 
            this.props.visitControlValuesResult.data.visitControlValues && 
            this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                getControlValues(pastMedicalHistory.ddlSLE.controlId,
                    getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            sLE : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSLE,this.props.visitResult.data.details):null,    
                            
            sLEOpen:false,


            ddlOtherConnectiveTissueDiseaseOptions : this.props.visitControlValuesResult && 
                                                            this.props.visitControlValuesResult.data && 
                                                                this.props.visitControlValuesResult.data.visitControlValues && 
                                                                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                                    getControlValues(pastMedicalHistory.ddlOtherConnectiveTissueDisease.controlId,
                                                                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
            otherConnectiveTissueDisease : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOtherConnectiveTissueDisease,this.props.visitResult.data.details):null,    
                                
            otherConnectiveTissueDiseaseOpen:false,


            ddlRheumatoidArthritisOptions : this.props.visitControlValuesResult && 
                                                this.props.visitControlValuesResult.data && 
                                                    this.props.visitControlValuesResult.data.visitControlValues && 
                                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlRheumatoidArthrititis.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            rheumatoidArthritis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlRheumatoidArthrititis,this.props.visitResult.data.details):null,    

            rheumatoidArthritisOpen:false,


            ddlInflammatoryBowelDiseaseOptions : this.props.visitControlValuesResult && 
                                                    this.props.visitControlValuesResult.data && 
                                                        this.props.visitControlValuesResult.data.visitControlValues && 
                                                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                            getControlValues(pastMedicalHistory.ddlInflammatoryBowelDisease.controlId,
                                                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            inflammatoryBowelDisease: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlInflammatoryBowelDisease,this.props.visitResult.data.details):null,    

            inflammatoryBowelDiseaseOpen:false,

           
            ddlType1DiabetesMellitusOptions : this.props.visitControlValuesResult && 
                                            this.props.visitControlValuesResult.data && 
                                                this.props.visitControlValuesResult.data.visitControlValues && 
                                                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                    getControlValues(pastMedicalHistory.ddlType1DiabetesMellitus.controlId,
                                                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            type1DiabetesMellitus: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType1DiabetesMellitus,this.props.visitResult.data.details):null,    

            type1DiabetesMellitusOpen:false,


            ddlType2DiabetesMellitusOptions : this.props.visitControlValuesResult && 
                                                this.props.visitControlValuesResult.data && 
                                                    this.props.visitControlValuesResult.data.visitControlValues && 
                                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlType2DiabetesMellitus.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            type2DiabetesMellitus: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType2DiabetesMellitus,this.props.visitResult.data.details):null,    

            type2DiabetesMellitusOpen:false,




            ddlPsoriasisOptions : this.props.visitControlValuesResult && 
                                    this.props.visitControlValuesResult.data && 
                                        this.props.visitControlValuesResult.data.visitControlValues && 
                                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                            getControlValues(pastMedicalHistory.ddlPsoriasis.controlId,
                                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

             psoriasis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPsoriasis,this.props.visitResult.data.details):null,    

                    psoriasisOpen:false,


            ddlHypothyroidismOptions : this.props.visitControlValuesResult && 
                                    this.props.visitControlValuesResult.data && 
                                        this.props.visitControlValuesResult.data.visitControlValues && 
                                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                            getControlValues(pastMedicalHistory.ddlHypothyroidism.controlId,
                                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            hypothyroidism: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlHypothyroidism,this.props.visitResult.data.details):null,    

            hypothyroidismOpen:false,



            ddlVitiligoOptions : this.props.visitControlValuesResult && 
                                    this.props.visitControlValuesResult.data && 
                                        this.props.visitControlValuesResult.data.visitControlValues && 
                                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                            getControlValues(pastMedicalHistory.ddlVitiligo.controlId,
                                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            vitiligo: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlVitiligo,this.props.visitResult.data.details):null,    

            vitiligoOpen:false,


            ddlCoeliacDiseaseOptions : this.props.visitControlValuesResult && 
            this.props.visitControlValuesResult.data && 
                this.props.visitControlValuesResult.data.visitControlValues && 
                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlCoeliacDisease.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            coeliacDisease: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlCoeliacDisease,this.props.visitResult.data.details):null,    

            coeliacDiseaseOpen:false,

            ddlOsteoarthritisOptions : this.props.visitControlValuesResult && 
            this.props.visitControlValuesResult.data && 
                this.props.visitControlValuesResult.data.visitControlValues && 
                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlOsteoarthritis.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            osteoarthritis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOsteoarthritis,this.props.visitResult.data.details):null,    

            osteoarthritisOpen:false,


            
            ddlChronicRecurrentCystitisOptions : this.props.visitControlValuesResult && 
            this.props.visitControlValuesResult.data && 
                this.props.visitControlValuesResult.data.visitControlValues && 
                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlChronicRecurrentCystitis.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            chronicRecurrentCystitis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlChronicRecurrentCystitis,this.props.visitResult.data.details):null,    

            chronicRecurrentCystitisOpen:false,


            ddlPhysicianDiagnosisOptions : this.props.visitControlValuesResult && 
            this.props.visitControlValuesResult.data && 
                this.props.visitControlValuesResult.data.visitControlValues && 
                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlPhysicianDiagnosis.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            physicianDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPhysicianDiagnosis,this.props.visitResult.data.details):null,    

            physicianDiagnosisOpen:false,


            ddlMeets1990ACRCriteriaOptions : this.props.visitControlValuesResult && 
            this.props.visitControlValuesResult.data && 
                this.props.visitControlValuesResult.data.visitControlValues && 
                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlMeets1990ACRCriteria.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

            meets1990ACRCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMeets1990ACRCriteria,this.props.visitResult.data.details):null,    

            meets1990ACRCriteriaOpen:false,


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


            this.handleIschaemicHeartDiseaseToggle = this.handleIschaemicHeartDiseaseToggle.bind(this);
            this.handleIschaemicHeartDiseaseChange = this.handleIschaemicHeartDiseaseChange.bind(this);

            this.handleSjogrensSyndromeToggle = this.handleSjogrensSyndromeToggle.bind(this);
            this.handleSjogrensSyndromeChange = this.handleSjogrensSyndromeChange.bind(this);

            this.handlePrimaryBiliaryCirrhosisToggle = this.handlePrimaryBiliaryCirrhosisToggle.bind(this);
            this.handlePrimaryBiliaryCirrhosisChange = this.handlePrimaryBiliaryCirrhosisChange.bind(this);

            this.handleMSToggle = this.handleMSToggle.bind(this);
            this.handleMSChange = this.handleMSChange.bind(this);

            this.handleSLEToggle = this.handleSLEToggle.bind(this);
            this.handleSLEChange = this.handleSLEChange.bind(this);

            this.handleOtherConnectiveTissueDiseaseToggle = this.handleOtherConnectiveTissueDiseaseToggle.bind(this);
            this.handleOtherConnectiveTissueDiseaseChange = this.handleOtherConnectiveTissueDiseaseChange.bind(this);

            this.handleRheumatoidArthritisToggle = this.handleRheumatoidArthritisToggle.bind(this);
            this.handleRheumatoidArthritisChange = this.handleRheumatoidArthritisChange.bind(this);

            this.handleInflammatoryBowelDiseaseToggle = this.handleInflammatoryBowelDiseaseToggle.bind(this);
            this.handleInflammatoryBowelDiseaseChange = this.handleInflammatoryBowelDiseaseChange.bind(this);

            this.handleType1DiabetesMellitusToggle = this.handleType1DiabetesMellitusToggle.bind(this);
            this.handleType1DiabetesMellitusChange = this.handleType1DiabetesMellitusChange.bind(this);

            this.handleType2DiabetesMellitusToggle = this.handleType2DiabetesMellitusToggle.bind(this);
            this.handleType2DiabetesMellitusChange = this.handleType2DiabetesMellitusChange.bind(this);

            this.handlePsoriasisToggle = this.handlePsoriasisToggle.bind(this);
            this.handlePsoriasisChange = this.handlePsoriasisChange.bind(this);

            this.handleHypothyroidismToggle = this.handleHypothyroidismToggle.bind(this);
            this.handleHypothyroidismChange = this.handleHypothyroidismChange.bind(this);

            this.handleVitiligoToggle = this.handleVitiligoToggle.bind(this);
            this.handleVitiligoChange = this.handleVitiligoChange.bind(this);

            this.handleCoeliacDiseaseToggle = this.handleCoeliacDiseaseToggle.bind(this);
            this.handleCoeliacDiseaseChange = this.handleCoeliacDiseaseChange.bind(this);

            this.handleOsteoarthritisToggle = this.handleOsteoarthritisToggle.bind(this);
            this.handleOsteoarthritisChange = this.handleOsteoarthritisChange.bind(this);

            this.handleChronicRecurrentCystitisToggle = this.handleChronicRecurrentCystitisToggle.bind(this);
            this.handleChronicRecurrentCystitisChange = this.handleChronicRecurrentCystitisChange.bind(this);

            this.handlePhysicianDiagnosisToggle = this.handlePhysicianDiagnosisToggle.bind(this);
            this.handlePhysicianDiagnosisChange = this.handlePhysicianDiagnosisChange.bind(this);

            this.handleMeets1990ACRCriteriaToggle = this.handleMeets1990ACRCriteriaToggle.bind(this);
            this.handleMeets1990ACRCriteriaChange = this.handleMeets1990ACRCriteriaChange.bind(this);
            
    }



    handleIschaemicHeartDiseaseToggle(){
        this.setState((prevState,props) => ({
            ischaemicHeartDiseaseOpen: !prevState.ischaemicHeartDiseaseOpen
        }))
    }


    handleIschaemicHeartDiseaseChange(values){
        if (!!values){
            if (!!this.state.ischaemicHeartDisease){
                if (this.state.ischaemicHeartDisease.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    ischaemicHeartDisease: prevState.ischaemicHeartDisease + ', '  + values,
                                    changed: prevState.ischaemicHeartDisease != values,
                                }))
                }
                else {
                    //remove
                    var updatedIschaemicHeartDisease  = this.state.ischaemicHeartDisease.toString().indexOf(values + ',') > -1 ?
                        this.state.ischaemicHeartDisease.toString().replace(values + ',','') :
                        this.state.ischaemicHeartDisease.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        ischaemicHeartDisease: updatedIschaemicHeartDisease,
                        changed: prevState.ischaemicHeartDisease != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    ischaemicHeartDisease: values,
                    changed: prevState.ischaemicHeartDisease != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            ischaemicHeartDisease: null,
            ischaemicHeartDiseaseOpen: false,
            changed:true
        }))
    }
    }


    handleSjogrensSyndromeToggle(){
        this.setState((prevState,props) => ({
            sjogrensSyndromeOpen: !prevState.sjogrensSyndromeOpen
        }))
    }


    handleSjogrensSyndromeChange(values){
        if (!!values){
            if (!!this.state.sjogrensSyndrome){
                if (this.state.sjogrensSyndrome.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    sjogrensSyndrome: prevState.sjogrensSyndrome + ', '  + values,
                                    changed: prevState.sjogrensSyndrome != values,
                                }))
                }
                else {
                    //remove
                    var updatedSjogrensSyndrome  = this.state.sjogrensSyndrome.toString().indexOf(values + ',') > -1 ?
                        this.state.sjogrensSyndrome.toString().replace(values + ',','') :
                        this.state.sjogrensSyndrome.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        sjogrensSyndrome: updatedSjogrensSyndrome,
                        changed: prevState.sjogrensSyndrome != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    sjogrensSyndrome: values,
                    changed: prevState.sjogrensSyndrome != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            sjogrensSyndrome: null,
            sjogrensSyndromeOpen: false,
            changed:true
        }))
    }
    }




    handlePrimaryBiliaryCirrhosisToggle(){
        this.setState((prevState,props) => ({
            primaryBiliaryCirrhosisOpen: !prevState.primaryBiliaryCirrhosisOpen
        }))
    }


    handlePrimaryBiliaryCirrhosisChange(values){
        if (!!values){
            if (!!this.state.primaryBiliaryCirrhosis){
                if (this.state.primaryBiliaryCirrhosis.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    primaryBiliaryCirrhosis: prevState.primaryBiliaryCirrhosis + ', '  + values,
                                    changed: prevState.primaryBiliaryCirrhosis != values,
                                }))
                }
                else {
                    //remove
                    var updatedPrimaryBiliaryCirrhosis  = this.state.primaryBiliaryCirrhosis.toString().indexOf(values + ',') > -1 ?
                        this.state.primaryBiliaryCirrhosis.toString().replace(values + ',','') :
                        this.state.primaryBiliaryCirrhosis.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        primaryBiliaryCirrhosis: updatedPrimaryBiliaryCirrhosis,
                        changed: prevState.primaryBiliaryCirrhosis != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    primaryBiliaryCirrhosis: values,
                    changed: prevState.primaryBiliaryCirrhosis != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            primaryBiliaryCirrhosis: null,
            primaryBiliaryCirrhosisOpen: false,
            changed:true
        }))
    }
    }



    handleMSToggle(){
        this.setState((prevState,props) => ({
            mSOpen: !prevState.mSOpen
        }))
    }


    handleMSChange(values){
        if (!!values){
            if (!!this.state.mS){
                if (this.state.mS.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    mS: prevState.mS + ', '  + values,
                                    changed: prevState.mS != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.mS.toString().indexOf(values + ',') > -1 ?
                        this.state.mS.toString().replace(values + ',','') :
                        this.state.mS.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        mS: updated,
                        changed: prevState.mS != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    mS: values,
                    changed: prevState.mS != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            mS: null,
            mSOpen: false,
            changed:true
        }))
    }
    }



    handleSLEToggle(){
        this.setState((prevState,props) => ({
            sLEOpen: !prevState.sLEOpen
        }))
    }


    handleSLEChange(values){
        if (!!values){
            if (!!this.state.sLE){
                if (this.state.sLE.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    sLE: prevState.sLE + ', '  + values,
                                    changed: prevState.sLE != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.sLE.toString().indexOf(values + ',') > -1 ?
                        this.state.sLE.toString().replace(values + ',','') :
                        this.state.sLE.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        sLE: updated,
                        changed: prevState.sLE != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    sLE: values,
                    changed: prevState.sLE != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            sLE: null,
            sLEOpen: false,
            changed:true
        }))
    }
    }




    handleOtherConnectiveTissueDiseaseToggle (){
        this.setState((prevState,props) => ({
            otherConnectiveTissueDiseaseOpen: !prevState.otherConnectiveTissueDiseaseOpen
        }))
    }


    handleOtherConnectiveTissueDiseaseChange(values){
        if (!!values){
            if (!!this.state.otherConnectiveTissueDisease){
                if (this.state.otherConnectiveTissueDisease.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    otherConnectiveTissueDisease: prevState.otherConnectiveTissueDisease + ', '  + values,
                                    changed: prevState.otherConnectiveTissueDisease != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.otherConnectiveTissueDisease.toString().indexOf(values + ',') > -1 ?
                        this.state.otherConnectiveTissueDisease.toString().replace(values + ',','') :
                        this.state.otherConnectiveTissueDisease.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        otherConnectiveTissueDisease: updated,
                        changed: prevState.otherConnectiveTissueDisease != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    otherConnectiveTissueDisease: values,
                    changed: prevState.otherConnectiveTissueDisease != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            otherConnectiveTissueDisease: null,
            otherConnectiveTissueDisease: false,
            changed:true
        }))
    }
    }




    handleRheumatoidArthritisToggle(){
        this.setState((prevState,props) => ({
            rheumatoidArthritisOpen: !prevState.rheumatoidArthritisOpen
        }))
    }


    handleRheumatoidArthritisChange(values){
        if (!!values){
            if (!!this.state.rheumatoidArthritis){
                if (this.state.rheumatoidArthritis.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    rheumatoidArthritis: prevState.rheumatoidArthritis + ', '  + values,
                                    changed: prevState.rheumatoidArthritis != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.rheumatoidArthritis.toString().indexOf(values + ',') > -1 ?
                        this.state.rheumatoidArthritis.toString().replace(values + ',','') :
                        this.state.rheumatoidArthritis.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        rheumatoidArthritis: updated,
                        changed: prevState.rheumatoidArthritis != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    rheumatoidArthritis: values,
                    changed: prevState.rheumatoidArthritis != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            rheumatoidArthritis: null,
            rheumatoidArthritisOpen: false,
            changed:true
        }))
    }
    }



    handleInflammatoryBowelDiseaseToggle(){
       // console.log('handleInflammatoryBowelDiseaseToggle')
        this.setState((prevState,props) => ({
            inflammatoryBowelDiseaseOpen: !prevState.inflammatoryBowelDiseaseOpen
        }))
    }


    handleInflammatoryBowelDiseaseChange(values){
        if (!!values){
            if (!!this.state.inflammatoryBowelDisease){
                if (this.state.inflammatoryBowelDisease.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    inflammatoryBowelDisease: prevState.inflammatoryBowelDisease + ', '  + values,
                                    changed: prevState.inflammatoryBowelDisease != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.inflammatoryBowelDisease.toString().indexOf(values + ',') > -1 ?
                        this.state.inflammatoryBowelDisease.toString().replace(values + ',','') :
                        this.state.inflammatoryBowelDisease.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        inflammatoryBowelDisease: updated,
                        changed: prevState.inflammatoryBowelDisease != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    inflammatoryBowelDisease: values,
                    changed: prevState.inflammatoryBowelDisease != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            inflammatoryBowelDisease: null,
            inflammatoryBowelDiseaseOpen: false,
            changed:true
        }))
    }
    }







    handleType1DiabetesMellitusToggle(){
        this.setState((prevState,props) => ({
            type1DiabetesMellitusOpen: !prevState.type1DiabetesMellitusOpen
        }))
    }


    handleType1DiabetesMellitusChange(values){
        if (!!values){
            if (!!this.state.type1DiabetesMellitus){
                if (this.state.type1DiabetesMellitus.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    type1DiabetesMellitus: prevState.type1DiabetesMellitus + ', '  + values,
                                    changed: prevState.type1DiabetesMellitus != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.type1DiabetesMellitus.toString().indexOf(values + ',') > -1 ?
                        this.state.type1DiabetesMellitus.toString().replace(values + ',','') :
                        this.state.type1DiabetesMellitus.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        type1DiabetesMellitus: updated,
                        changed: prevState.type1DiabetesMellitus != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    type1DiabetesMellitus: values,
                    changed: prevState.type1DiabetesMellitus != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            type1DiabetesMellitus: null,
            type1DiabetesMellitusOpen: false,
            changed:true
        }))
    }
    }


    handleType2DiabetesMellitusToggle(){
        this.setState((prevState,props) => ({
            type2DiabetesMellitusOpen: !prevState.type2DiabetesMellitusOpen
        }))
    }


    handleType2DiabetesMellitusChange(values){
        if (!!values){
            if (!!this.state.type2DiabetesMellitus){
                if (this.state.type2DiabetesMellitus.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    type2DiabetesMellitus: prevState.type2DiabetesMellitus + ', '  + values,
                                    changed: prevState.type2DiabetesMellitus != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.type2DiabetesMellitus.toString().indexOf(values + ',') > -1 ?
                        this.state.type2DiabetesMellitus.toString().replace(values + ',','') :
                        this.state.type2DiabetesMellitus.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        type2DiabetesMellitus: updated,
                        changed: prevState.type2DiabetesMellitus != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    type2DiabetesMellitus: values,
                    changed: prevState.type2DiabetesMellitus != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            type2DiabetesMellitus: null,
            type2DiabetesMellitusOpen: false,
            changed:true
        }))
    }
    }



    handlePsoriasisToggle(){
        this.setState((prevState,props) => ({
            psoriasisOpen: !prevState.psoriasisOpen
        }))
    }


    handlePsoriasisChange(values){
        if (!!values){
            if (!!this.state.psoriasis){
                if (this.state.psoriasis.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    psoriasis: prevState.psoriasis + ', '  + values,
                                    changed: prevState.psoriasis != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.psoriasis.toString().indexOf(values + ',') > -1 ?
                        this.state.psoriasis.toString().replace(values + ',','') :
                        this.state.psoriasis.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        psoriasis: updated,
                        changed: prevState.psoriasis != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    psoriasis: values,
                    changed: prevState.psoriasis != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            psoriasis: null,
            psoriasisOpen: false,
            changed:true
        }))
    }
    }



    
    handleHypothyroidismToggle(){
        this.setState((prevState,props) => ({
            hypothyroidismOpen: !prevState.hypothyroidismOpen
        }))
    }


    handleHypothyroidismChange(values){
        if (!!values){
            if (!!this.state.hypothyroidism){
                if (this.state.hypothyroidism.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    hypothyroidism: prevState.hypothyroidism + ', '  + values,
                                    changed: prevState.hypothyroidism != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.hypothyroidism.toString().indexOf(values + ',') > -1 ?
                        this.state.hypothyroidism.toString().replace(values + ',','') :
                        this.state.hypothyroidism.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        hypothyroidism: updated,
                        changed: prevState.hypothyroidism != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    hypothyroidism: values,
                    changed: prevState.hypothyroidism != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            hypothyroidism: null,
            hypothyroidismOpen: false,
            changed:true
        }))
    }
    }




    
    handleVitiligoToggle(){
        this.setState((prevState,props) => ({
            vitiligoOpen: !prevState.vitiligoOpen
        }))
    }


    handleVitiligoChange(values){
        if (!!values){
            if (!!this.state.vitiligo){
                if (this.state.vitiligo.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    vitiligo: prevState.vitiligo + ', '  + values,
                                    changed: prevState.vitiligo != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.vitiligo.toString().indexOf(values + ',') > -1 ?
                        this.state.vitiligo.toString().replace(values + ',','') :
                        this.state.vitiligo.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        vitiligo: updated,
                        changed: prevState.vitiligo != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    vitiligo: values,
                    changed: prevState.vitiligo != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            vitiligo: null,
            vitiligOpen: false,
            changed:true
        }))
    }
    }



    
    handleCoeliacDiseaseToggle(){
        this.setState((prevState,props) => ({
            coeliacDiseaseOpen: !prevState.coeliacDiseaseOpen
        }))
    }


    handleCoeliacDiseaseChange(values){
        if (!!values){
            if (!!this.state.coeliacDisease){
                if (this.state.coeliacDisease.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    coeliacDisease: prevState.coeliacDisease + ', '  + values,
                                    changed: prevState.coeliacDisease != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.coeliacDisease.toString().indexOf(values + ',') > -1 ?
                        this.state.coeliacDisease.toString().replace(values + ',','') :
                        this.state.coeliacDisease.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        coeliacDisease: updated,
                        changed: prevState.coeliacDisease != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    coeliacDisease: values,
                    changed: prevState.coeliacDisease != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            coeliacDisease: null,
            coeliacDiseaseOpen: false,
            changed:true
        }))
    }
    }





    handleOsteoarthritisToggle(){
        this.setState((prevState,props) => ({
            osteoarthritisOpen: !prevState.osteoarthritisOpen
        }))
    }


    handleOsteoarthritisChange(values){
        if (!!values){
            if (!!this.state.osteoarthritis){
                if (this.state.osteoarthritis.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    osteoarthritis: prevState.osteoarthritis + ', '  + values,
                                    changed: prevState.osteoarthritis != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.osteoarthritis.toString().indexOf(values + ',') > -1 ?
                        this.state.osteoarthritis.toString().replace(values + ',','') :
                        this.state.osteoarthritis.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        osteoarthritis: updated,
                        changed: prevState.osteoarthritis != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    osteoarthritis: values,
                    changed: prevState.osteoarthritis != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            osteoarthritis: null,
            osteoarthritisOpen: false,
            changed:true
        }))
    }
    }





    handleChronicRecurrentCystitisToggle(){
        this.setState((prevState,props) => ({
            chronicRecurrentCystitisOpen: !prevState.chronicRecurrentCystitisOpen
        }))
    }


    handleChronicRecurrentCystitisChange(values){
        if (!!values){
            if (!!this.state.chronicRecurrentCystitis){
                if (this.state.chronicRecurrentCystitis.toString().indexOf(values) == -1){
                //if it does already exist
                                this.setState((prevState,props) => ({
                                    chronicRecurrentCystitis: prevState.chronicRecurrentCystitis + ', '  + values,
                                    changed: prevState.chronicRecurrentCystitis != values,
                                }))
                }
                else {
                    //remove
                    var updated  = this.state.chronicRecurrentCystitis.toString().indexOf(values + ',') > -1 ?
                        this.state.chronicRecurrentCystitis.toString().replace(values + ',','') :
                        this.state.chronicRecurrentCystitis.toString().replace(values,'')
                    

                    this.setState((prevState,props) => ({
                        chronicRecurrentCystitis: updated,
                        changed: prevState.chronicRecurrentCystitis != values,
                    }))
                }
            }
            else {               
                this.setState((prevState,props) => ({
                    chronicRecurrentCystitis: values,
                    changed: prevState.chronicRecurrentCystitis != values,
                }))
            }
    }
    else {
        this.setState((prevState,props) => ({
            chronicRecurrentCystitis: null,
            chronicRecurrentCystitisOpen: false,
            changed:true
        }))
    }
    }

////

handlePhysicianDiagnosisToggle(){
    this.setState((prevState,props) => ({
        physicianDiagnosisOpen: !prevState.physicianDiagnosisOpen
    }))
}


handlePhysicianDiagnosisChange(values){
    if (!!values){
        if (!!this.state.physicianDiagnosis){
            if (this.state.physicianDiagnosis.toString().indexOf(values) == -1){
            //if it does already exist
                            this.setState((prevState,props) => ({
                                physicianDiagnosis: prevState.physicianDiagnosis + ', '  + values,
                                changed: prevState.physicianDiagnosis != values,
                            }))
            }
            else {
                //remove
                var updated  = this.state.physicianDiagnosis.toString().indexOf(values + ',') > -1 ?
                    this.state.physicianDiagnosis.toString().replace(values + ',','') :
                    this.state.physicianDiagnosis.toString().replace(values,'')
                

                this.setState((prevState,props) => ({
                    physicianDiagnosis: updated,
                    changed: prevState.physicianDiagnosis != values,
                }))
            }
        }
        else {               
            this.setState((prevState,props) => ({
                physicianDiagnosis: values,
                changed: prevState.physicianDiagnosis != values,
            }))
        }
}
else {
    this.setState((prevState,props) => ({
        physicianDiagnosis: null,
        physicianDiagnosisOpen: false,
        changed:true
    }))
}
}


////


handleMeets1990ACRCriteriaToggle(){
    this.setState((prevState,props) => ({
        meets1990ACRCriteriaOpen: !prevState.meets1990ACRCriteriaOpen
    }))
}


handleMeets1990ACRCriteriaChange(values){
    if (!!values){
        if (!!this.state.meets1990ACRCriteria){
            if (this.state.meets1990ACRCriteria.toString().indexOf(values) == -1){
            //if it does already exist
                            this.setState((prevState,props) => ({
                                meets1990ACRCriteria: prevState.meets1990ACRCriteria + ', '  + values,
                                changed: prevState.meets1990ACRCriteria != values,
                            }))
            }
            else {
                //remove
                var updated  = this.state.meets1990ACRCriteria.toString().indexOf(values + ',') > -1 ?
                    this.state.meets1990ACRCriteria.toString().replace(values + ',','') :
                    this.state.meets1990ACRCriteria.toString().replace(values,'')
                

                this.setState((prevState,props) => ({
                    meets1990ACRCriteria: updated,
                    changed: prevState.meets1990ACRCriteria != values,
                }))
            }
        }
        else {               
            this.setState((prevState,props) => ({
                meets1990ACRCriteria: values,
                changed: prevState.meets1990ACRCriteria != values,
            }))
        }
}
else {
    this.setState((prevState,props) => ({
        meets1990ACRCriteria: null,
        meets1990ACRCriteriaOpen: false,
        changed:true
    }))
}
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
   // }
    

   // if (this.state.patientMeets2016ACRECCriteria){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.patientMeets2016ACRECCriteria,
                controlId:patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria.controlId, 
                categoryId:   categories.diagnosis.id   
    
            }
        )
  //  }
  if (this.state.ischaemicHeartDisease){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.ischaemicHeartDisease,
            controlId:pastMedicalHistory.ddlIscaemicHeartDisease.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.sjogrensSyndrome){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.sjogrensSyndrome,
            controlId:pastMedicalHistory.ddlSjogrensSyndrome.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }



  if (this.state.primaryBiliaryCirrhosis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.primaryBiliaryCirrhosis,
            controlId:pastMedicalHistory.ddlPrimaryBiliaryCirrhosis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  
  if (this.state.mS){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.mS,
            controlId:pastMedicalHistory.ddlMS.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.sLE){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.sLE,
            controlId:pastMedicalHistory.ddlSLE.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  
  if (this.state.otherConnectiveTissueDisease){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.otherConnectiveTissueDisease,
            controlId:pastMedicalHistory.ddlOtherConnectiveTissueDisease.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  if (this.state.rheumatoidArthritis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.rheumatoidArthritis,
            controlId:pastMedicalHistory.ddlRheumatoidArthrititis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  if (this.state.inflammatoryBowelDisease){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.inflammatoryBowelDisease,
            controlId:pastMedicalHistory.ddlInflammatoryBowelDisease.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.type1DiabetesMellitus){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.type1DiabetesMellitus,
            controlId:pastMedicalHistory.ddlType1DiabetesMellitus.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  if (this.state.type2DiabetesMellitus){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.type2DiabetesMellitus,
            controlId:pastMedicalHistory.ddlType2DiabetesMellitus.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.psoriasis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.psoriasis,
            controlId:pastMedicalHistory.ddlPsoriasis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.hypothyroidism){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.hypothyroidism,
            controlId:pastMedicalHistory.ddlHypothyroidism.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  
  if (this.state.vitiligo){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.vitiligo,
            controlId:pastMedicalHistory.ddlVitiligo.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  
  if (this.state.coeliacDisease){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.coeliacDisease,
            controlId:pastMedicalHistory.ddlCoeliacDisease.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  if (this.state.osteoarthritis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.osteoarthritis,
            controlId:pastMedicalHistory.ddlOsteoarthritis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }


  if (this.state.chronicRecurrentCystitis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.chronicRecurrentCystitis,
            controlId:pastMedicalHistory.ddlChronicRecurrentCystitis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.physicianDiagnosis){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.physicianDiagnosis,
            controlId:pastMedicalHistory.ddlPhysicianDiagnosis.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
        }
    )
  }

  if (this.state.meets1990ACRCriteria){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.meets1990ACRCriteria,
            controlId:pastMedicalHistory.ddlMeets1990ACRCriteria.controlId, 
            categoryId:   categories.pastMedicalHistory.id   
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
    this.props.handleSaveVisitHeader(visit, detail, categories.pastMedicalHistory.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.pastMedicalHistory.id);
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
        
        visitControls: nextProps.visitControlValuesResult && 
                          nextProps.visitControlValuesResult.data && 
                              nextProps.visitControlValuesResult.data.visitControlValues && 
                                  nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                      getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues) 
                                      : null,          

        ddlIschaemicHeartDiseaseOptions : 
                                          nextProps.visitControlValuesResult && 
                                          nextProps.visitControlValuesResult.data && 
                                              nextProps.visitControlValuesResult.data.visitControlValues && 
                                                  nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                      getControlValues(pastMedicalHistory.ddlIscaemicHeartDisease.controlId,
                                                          getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
        
        ischaemicHeartDisease : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlIscaemicHeartDisease,nextProps.visitResult.data.details):null,    

        ischaemicHeartDiseaseOpen:false,

        ddlSjogrensSyndromeOptions : nextProps.visitControlValuesResult && 
                                        nextProps.visitControlValuesResult.data && 
                                            nextProps.visitControlValuesResult.data.visitControlValues && 
                                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                getControlValues(pastMedicalHistory.ddlSjogrensSyndrome.controlId,
                                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

        sjogrensSyndrome : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSjogrensSyndrome,nextProps.visitResult.data.details):null,    
                                                                    
        sjogrensSyndromeOpen:false,

        ddlPrimaryBiliaryCirrhosisOptions : nextProps.visitControlValuesResult && 
                                                nextProps.visitControlValuesResult.data && 
                                                    nextProps.visitControlValuesResult.data.visitControlValues && 
                                                    nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlPrimaryBiliaryCirrhosis.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

        primaryBiliaryCirrhosis : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPrimaryBiliaryCirrhosis,nextProps.visitResult.data.details):null,    
                                                
        primaryBiliaryCirrhosisOpen:false,

        ddlMSOptions : nextProps.visitControlValuesResult && 
        nextProps.visitControlValuesResult.data && 
            nextProps.visitControlValuesResult.data.visitControlValues && 
            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                getControlValues(pastMedicalHistory.ddlMS.controlId,
                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

        mS : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMS,nextProps.visitResult.data.details):null,    
                                            
        mSOpen:false,

        ddlSLEOptions : nextProps.visitControlValuesResult && 
                            nextProps.visitControlValuesResult.data && 
                                nextProps.visitControlValuesResult.data.visitControlValues && 
                                nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                    getControlValues(pastMedicalHistory.ddlSLE.controlId,
                                        getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

        sLE : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSLE,nextProps.visitResult.data.details):null,    
                        
        sLEOpen:false,



        ddlOtherConnectiveTissueDiseaseOptions : nextProps.visitControlValuesResult && 
        nextProps.visitControlValuesResult.data && 
            nextProps.visitControlValuesResult.data.visitControlValues && 
            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                getControlValues(pastMedicalHistory.ddlOtherConnectiveTissueDisease.controlId,
                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

            otherConnectiveTissueDisease : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOtherConnectiveTissueDisease,nextProps.visitResult.data.details):null,    

            otherConnectiveTissueDiseaseOpen:false,



            ddlRheumatoidArthritisOptions : nextProps.visitControlValuesResult && 
            nextProps.visitControlValuesResult.data && 
                nextProps.visitControlValuesResult.data.visitControlValues && 
                nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlRheumatoidArthrititis.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

            rheumatoidArthritis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlRheumatoidArthrititis,nextProps.visitResult.data.details):null,    

            rheumatoidArthritisOpen:false,


            ddlInflammatoryBowelDiseaseOptions : nextProps.visitControlValuesResult && 
            nextProps.visitControlValuesResult.data && 
                nextProps.visitControlValuesResult.data.visitControlValues && 
                nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                    getControlValues(pastMedicalHistory.ddlInflammatoryBowelDisease.controlId,
                        getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

                inflammatoryBowelDisease: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlInflammatoryBowelDisease,nextProps.visitResult.data.details):null,    

                inflammatoryBowelDiseaseOpen:false,



                ddlType1DiabetesMellitusOptions : nextProps.visitControlValuesResult && 
                                                    nextProps.visitControlValuesResult.data && 
                                                        nextProps.visitControlValuesResult.data.visitControlValues && 
                                                        nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                            getControlValues(pastMedicalHistory.ddlType1DiabetesMellitus.controlId,
                                                                getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

                type1DiabetesMellitus: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType1DiabetesMellitus,nextProps.visitResult.data.details):null,    

                type1DiabetesMellitusOpen:false,


                ddlType2DiabetesMellitusOptions : nextProps.visitControlValuesResult && 
                                                    nextProps.visitControlValuesResult.data && 
                                                        nextProps.visitControlValuesResult.data.visitControlValues && 
                                                        nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                            getControlValues(pastMedicalHistory.ddlType2DiabetesMellitus.controlId,
                                                                getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

                type2DiabetesMellitus: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType2DiabetesMellitus,nextProps.visitResult.data.details):null,    

                type2DiabetesMellitusOpen:false,




                ddlPsoriasisOptions : nextProps.visitControlValuesResult && 
                nextProps.visitControlValuesResult.data && 
                    nextProps.visitControlValuesResult.data.visitControlValues && 
                    nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlPsoriasis.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
    
                            psoriasis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPsoriasis,nextProps.visitResult.data.details):null,    
    
                        psoriasisOpen:false,


                        ddlHypothyroidismOptions : nextProps.visitControlValuesResult && 
                                                        nextProps.visitControlValuesResult.data && 
                                                            nextProps.visitControlValuesResult.data.visitControlValues && 
                                                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                                getControlValues(pastMedicalHistory.ddlHypothyroidism.controlId,
                                                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

                        hypothyroidism: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlHypothyroidism,nextProps.visitResult.data.details):null,    

                        hypothyroidismOpen:false,

                        ddlVitiligoOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlVitiligo.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,

                        vitiligo: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlVitiligo,nextProps.visitResult.data.details):null,    

                        vitiligoOpen:false,



                        ddlCoeliacDiseaseOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlCoeliacDisease.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
            
                        coeliacDisease: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlCoeliacDisease,nextProps.visitResult.data.details):null,    
            
                        coeliacDiseaseOpen:false,



                        ddlOsteoarthritisOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlOsteoarthritis.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
            
                        osteoarthritis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOsteoarthritis,nextProps.visitResult.data.details):null,    
            
                        osteoarthritisOpen:false,


                        ddlChronicRecurrentCystitisOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlChronicRecurrentCystitis.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
            
                        chronicRecurrentCystitis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlChronicRecurrentCystitis,nextProps.visitResult.data.details):null,    
            
                        chronicRecurrentCystitisOpen:false,


                       


                        ddlPhysicianDiagnosisOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlPhysicianDiagnosis.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
            
                        physicianDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPhysicianDiagnosis,nextProps.visitResult.data.details):null,    
            
                        physicianDiagnosisOpen:false,
            
             ddlMeets1990ACRCriteriaOptions : nextProps.visitControlValuesResult && 
                        nextProps.visitControlValuesResult.data && 
                            nextProps.visitControlValuesResult.data.visitControlValues && 
                            nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getControlValues(pastMedicalHistory.ddlMeets1990ACRCriteria.controlId,
                                    getCategoryControls(categories.pastMedicalHistory.id, nextProps.visitControlValuesResult.data.visitControlValues)):null,
            
                        meets1990ACRCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? 
                                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMeets1990ACRCriteria,nextProps.visitResult.data.details):null,    
            
                        meets1990ACRCriteriaOpen:false,






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
                
                visitControls: this.props.visitControlValuesResult && 
                                  this.props.visitControlValuesResult.data && 
                                      this.props.visitControlValuesResult.data.visitControlValues && 
                                          this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                              getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues) 
                                              : null,          
      
                ddlIschaemicHeartDiseaseOptions : 
                                                  this.props.visitControlValuesResult && 
                                                  this.props.visitControlValuesResult.data && 
                                                      this.props.visitControlValuesResult.data.visitControlValues && 
                                                          this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                              getControlValues(pastMedicalHistory.ddlIscaemicHeartDisease.controlId,
                                                                  getCategoryControls(categories.pastMedicalHistory.id, 
                                                                                        this.props.visitControlValuesResult.data.visitControlValues)):null,
      
                ischaemicHeartDisease :
                                        this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlIscaemicHeartDisease,this.props.visitResult.data.details):null,    

          
                ischaemicHeartDiseaseOpen:false,


                ddlSjogrensSyndromeOptions : this.props.visitControlValuesResult && 
                                                this.props.visitControlValuesResult.data && 
                                                    this.props.visitControlValuesResult.data.visitControlValues && 
                                                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                                        getControlValues(pastMedicalHistory.ddlSjogrensSyndrome.controlId,
                                                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                sjogrensSyndrome : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSjogrensSyndrome,this.props.visitResult.data.details):null,    
                                                                                        
                sjogrensSyndromeOpen:false,


                ddlPrimaryBiliaryCirrhosisOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlPrimaryBiliaryCirrhosis.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                primaryBiliaryCirrhosis : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPrimaryBiliaryCirrhosis,this.props.visitResult.data.details):null,    
                                                            
                primaryBiliaryCirrhosisOpen:false,


                ddlMSOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlMS.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
        
                mS : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMS,this.props.visitResult.data.details):null,    
                                                    
                mSOpen:false,

                ddlSLEOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlSLE.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                sLE : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlSLE,this.props.visitResult.data.details):null,    
                        
                sLEOpen:false,


                ddlOtherConnectiveTissueDiseaseOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlOtherConnectiveTissueDisease.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                    otherConnectiveTissueDisease : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOtherConnectiveTissueDisease,this.props.visitResult.data.details):null,    

                    otherConnectiveTissueDiseaseOpen:false,

                    ddlRheumatoidArthritisOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlRheumatoidArthrititis.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                    rheumatoidArthritis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlRheumatoidArthrititis,this.props.visitResult.data.details):null,    

                    rheumatoidArthritisOpen:false,

                    ddlInflammatoryBowelDiseaseOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlInflammatoryBowelDisease.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                    inflammatoryBowelDisease: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlInflammatoryBowelDisease,this.props.visitResult.data.details):null,    

                    inflammatoryBowelDiseaseOpen:false,



                    ddlType1DiabetesMellitusOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlType1DiabetesMellitus.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
        
                    type1DiabetesMellitus: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType1DiabetesMellitus,this.props.visitResult.data.details):null,    
        
                    type1DiabetesMellitusOpen:false,
        


                    ddlType2DiabetesMellitusOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlType2DiabetesMellitus.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                    type2DiabetesMellitus: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                    getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlType2DiabetesMellitus,this.props.visitResult.data.details):null,    

                    type2DiabetesMellitusOpen:false,



                    ddlPsoriasisOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlPsoriasis.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
        
                                psoriasis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                            getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPsoriasis,this.props.visitResult.data.details):null,    
        
                            psoriasisOpen:false,


                            ddlHypothyroidismOptions : this.props.visitControlValuesResult && 
                            this.props.visitControlValuesResult.data && 
                                this.props.visitControlValuesResult.data.visitControlValues && 
                                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                    getControlValues(pastMedicalHistory.ddlHypothyroidism.controlId,
                                        getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                hypothyroidism: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                        getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlHypothyroidism,this.props.visitResult.data.details):null,    

                hypothyroidismOpen:false,


                    ddlVitiligoOptions : this.props.visitControlValuesResult && 
                    this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && 
                        this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                            getControlValues(pastMedicalHistory.ddlVitiligo.controlId,
                                getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,

                vitiligo: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlVitiligo,this.props.visitResult.data.details):null,    

                vitiligoOpen:false,



                ddlCoeliacDiseaseOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlCoeliacDisease.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
                coeliacDisease: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlCoeliacDisease,this.props.visitResult.data.details):null,    
    
                coeliacDiseaseOpen:false,


                ddlOsteoarthritisOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlOsteoarthritis.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
                osteoarthritis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlOsteoarthritis,this.props.visitResult.data.details):null,    
    
                osteoarthritisOpen:false,


                ddlChronicRecurrentCystitisOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlChronicRecurrentCystitis.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
                chronicRecurrentCystitis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlChronicRecurrentCystitis,this.props.visitResult.data.details):null,    
    
                chronicRecurrentCystitisOpen:false,



                ddlPhysicianDiagnosisOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlPhysicianDiagnosis.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
                physicianDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlPhysicianDiagnosis,this.props.visitResult.data.details):null,    
    
                physicianDiagnosisOpen:false,
    
     ddlMeets1990ACRCriteriaOptions : this.props.visitControlValuesResult && 
                this.props.visitControlValuesResult.data && 
                    this.props.visitControlValuesResult.data.visitControlValues && 
                    this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                        getControlValues(pastMedicalHistory.ddlMeets1990ACRCriteria.controlId,
                            getCategoryControls(categories.pastMedicalHistory.id, this.props.visitControlValuesResult.data.visitControlValues)):null,
    
                meets1990ACRCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
                                getDetailsControlValue(categories.pastMedicalHistory.id, pastMedicalHistory.ddlMeets1990ACRCriteria,this.props.visitResult.data.details):null,    
    
                meets1990ACRCriteriaOpen:false,


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
            <h3 className="panel-title pull-left">Past Medical / Family History</h3>
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
nextCategoryName = {VISIT_CATEGORY_SALIVARYFLOW}
prevCategoryName = {VISIT_CATEGORY_DAMAGEINDICES}
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
                <h3 className="panel-title">Past Medical / Family History</h3>
                
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
nextCategoryName = {VISIT_CATEGORY_SALIVARYFLOW}
prevCategoryName = {VISIT_CATEGORY_DAMAGEINDICES}
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
                

                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5">Please select past medical history for the patient and/or patient's family members.</div>  
                </div>

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
<FadeIn>
                <PastMedicalHistoryFamilyMembers
                isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        open={this.state.ischaemicHeartDiseaseOpen}
                        caption={pastMedicalHistory.diseases[0]}
                        handleToggle={this.handleIschaemicHeartDiseaseToggle}
                        handleChange={this.handleIschaemicHeartDiseaseChange}
                        selectedValue={!!this.state.ischaemicHeartDisease ? this.state.ischaemicHeartDisease :null }
                        options={this.state.ddlIschaemicHeartDiseaseOptions}/>


                        <PastMedicalHistoryFamilyMembers
                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.sjogrensSyndromeOpen}
                                    caption={pastMedicalHistory.diseases[1]}
                                    handleToggle={this.handleSjogrensSyndromeToggle}
                                    handleChange={this.handleSjogrensSyndromeChange}
                                    selectedValue={!!this.state.sjogrensSyndrome ? this.state.sjogrensSyndrome :null }
                                    options={this.state.ddlSjogrensSyndromeOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.primaryBiliaryCirrhosisOpen}
                                    caption={pastMedicalHistory.diseases[2]}
                                    handleToggle={this.handlePrimaryBiliaryCirrhosisToggle}
                                    handleChange={this.handlePrimaryBiliaryCirrhosisChange}
                                    selectedValue={!!this.state.primaryBiliaryCirrhosis ? this.state.primaryBiliaryCirrhosis :null }
                                    options={this.state.ddlPrimaryBiliaryCirrhosisOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.mSOpen}
                                    caption={pastMedicalHistory.diseases[3]}
                                    handleToggle={this.handleMSToggle}
                                    handleChange={this.handleMSChange}
                                    selectedValue={!!this.state.mS ? this.state.mS :null }
                                    options={this.state.ddlMSOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.sLEOpen}
                                    caption={pastMedicalHistory.diseases[4]}
                                    handleToggle={this.handleSLEToggle}
                                    handleChange={this.handleSLEChange}
                                    selectedValue={!!this.state.sLE ? this.state.sLE :null }
                                    options={this.state.ddlSLEOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.otherConnectiveTissueDiseaseOpen}
                                    caption={pastMedicalHistory.diseases[5]}
                                    handleToggle={this.handleOtherConnectiveTissueDiseaseToggle}
                                    handleChange={this.handleOtherConnectiveTissueDiseaseChange}
                                    selectedValue={!!this.state.otherConnectiveTissueDisease ? this.state.otherConnectiveTissueDisease :null }
                                    options={this.state.ddlOtherConnectiveTissueDiseaseOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.rheumatoidArthritisOpen}
                                    caption={pastMedicalHistory.diseases[6]}
                                    handleToggle={this.handleRheumatoidArthritisToggle}
                                    handleChange={this.handleRheumatoidArthritisChange}
                                    selectedValue={!!this.state.rheumatoidArthritis ? this.state.rheumatoidArthritis :null }
                                    options={this.state.ddlRheumatoidArthritisOptions}/>

                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.inflammatoryBowelDiseaseOpen}
                                    caption={pastMedicalHistory.diseases[7]}
                                    handleToggle={this.handleInflammatoryBowelDiseaseToggle}
                                    handleChange={this.handleInflammatoryBowelDiseaseChange}
                                    selectedValue={!!this.state.inflammatoryBowelDisease ? this.state.inflammatoryBowelDisease :null }
                                    options={this.state.ddlInflammatoryBowelDiseaseOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.type1DiabetesMellitusOpen}
                                    caption={pastMedicalHistory.diseases[8]}
                                    handleToggle={this.handleType1DiabetesMellitusToggle}
                                    handleChange={this.handleType1DiabetesMellitusChange}
                                    selectedValue={!!this.state.type1DiabetesMellitus ? this.state.type1DiabetesMellitus :null }
                                    options={this.state.ddlType1DiabetesMellitusOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.type2DiabetesMellitusOpen}
                                    caption={pastMedicalHistory.diseases[9]}
                                    handleToggle={this.handleType2DiabetesMellitusToggle}
                                    handleChange={this.handleType2DiabetesMellitusChange}
                                    selectedValue={!!this.state.type2DiabetesMellitus ? this.state.type2DiabetesMellitus :null }
                                    options={this.state.ddlType2DiabetesMellitusOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.psoriasisOpen}
                                    caption={pastMedicalHistory.diseases[10]}
                                    handleToggle={this.handlePsoriasisToggle}
                                    handleChange={this.handlePsoriasisChange}
                                    selectedValue={!!this.state.psoriasis ? this.state.psoriasis :null }
                                    options={this.state.ddlPsoriasisOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.hypothyroidismOpen}
                                    caption={pastMedicalHistory.diseases[11]}
                                    handleToggle={this.handleHypothyroidismToggle}
                                    handleChange={this.handleHypothyroidismChange}
                                    selectedValue={!!this.state.hypothyroidism ? this.state.hypothyroidism :null }
                                    options={this.state.ddlHypothyroidismOptions}/>


                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.vitiligoOpen}
                                    caption={pastMedicalHistory.diseases[12]}
                                    handleToggle={this.handleVitiligoToggle}
                                    handleChange={this.handleVitiligoChange}
                                    selectedValue={!!this.state.vitiligo ? this.state.vitiligo :null }
                                    options={this.state.ddlVitiligoOptions}/>

                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.coeliacDiseaseOpen}
                                    caption={pastMedicalHistory.diseases[13]}
                                    handleToggle={this.handleCoeliacDiseaseToggle}
                                    handleChange={this.handleCoeliacDiseaseChange}
                                    selectedValue={!!this.state.coeliacDisease ? this.state.coeliacDisease :null }
                                    options={this.state.ddlCoeliacDiseaseOptions}/>

                                    <PastMedicalHistoryFamilyMembers
                                    isComplete={ this.props.visitHeaderResult && 
                                    this.props.visitHeaderResult.data && 
                                    this.props.visitHeaderResult.data.completed ? 
                                    this.props.visitHeaderResult.data.completed :
                                    false}
                            open={this.state.chronicRecurrentCystitisOpen}
                            caption={pastMedicalHistory.diseases[15]}
                            handleToggle={this.handleChronicRecurrentCystitisToggle}
                            handleChange={this.handleChronicRecurrentCystitisChange}
                            selectedValue={!!this.state.chronicRecurrentCystitis ? this.state.chronicRecurrentCystitis :null }
                            options={this.state.ddlChronicRecurrentCystitisOptions}/>

                                    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.osteoarthritisOpen}
                                    caption={pastMedicalHistory.diseases[14]}
                                    handleToggle={this.handleOsteoarthritisToggle}
                                    handleChange={this.handleOsteoarthritisChange}
                                    selectedValue={!!this.state.osteoarthritis ? this.state.osteoarthritis :null }
                                    options={this.state.ddlOsteoarthritisOptions}/>


<ul className="past-medical-history-ul"><span className="past-medical-history-name">Fibromyalgia</span>
    <li>
    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.physicianDiagnosisOpen}
                                    caption={pastMedicalHistory.diseases[16]}
                                    handleToggle={this.handlePhysicianDiagnosisToggle}
                                    handleChange={this.handlePhysicianDiagnosisChange}
                                    selectedValue={!!this.state.physicianDiagnosis ? this.state.physicianDiagnosis :null }
                                    options={this.state.ddlPhysicianDiagnosisOptions}/>
    </li>
    <li>
    <PastMedicalHistoryFamilyMembers
                                            isComplete={ this.props.visitHeaderResult && 
                                            this.props.visitHeaderResult.data && 
                                            this.props.visitHeaderResult.data.completed ? 
                                            this.props.visitHeaderResult.data.completed :
                                            false}
                                    open={this.state.meets1990ACRCriteriaOpen}
                                    caption={pastMedicalHistory.diseases[17]}
                                    handleToggle={this.handleMeets1990ACRCriteriaToggle}
                                    handleChange={this.handleMeets1990ACRCriteriaChange}
                                    selectedValue={!!this.state.meets1990ACRCriteria ? this.state.meets1990ACRCriteria :null }
                                    options={this.state.ddlMeets1990ACRCriteriaOptions}/>
        </li>
    </ul>



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

 export default PastMedicalHistoryForm;

