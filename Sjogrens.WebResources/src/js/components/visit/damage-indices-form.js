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
import {DamageIndices} from '../../config/controls/damage-indices';
import {categories} from '../../config/categories';
//import FunkyRadioThreeOptionsVertical from '../../components/generic/radio/funky-radio-three-options-vertical';
//import FunkyRadioThreeOptionsVerticalNoCaption from '../../components/generic/radio/funky-radio-three-options-vertical-no-caption';
import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import {ocularSignsObjectiveValidation} from '../../components/visit/modules/functions'

import { meetsAECGCCriteria, meets2016ACRECCriteria, maxLengthCheck,addZeroes} from '../../components/visit/modules/functions';
//import NumericInput from 'react-numeric-input';
import {isAlpha, isAlphanumericSpace, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod,digits1to9Only} from '../../Factory/reg-ex';


import {patientHasPhysiciansDiagnosis, patientMeetsAECGCriteria, alternateDiagnosis,patientMeets2016ACRECCriteria} from '../../config/controls/diagnosis';

//import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
//import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import {DamageIndicesValidationMessages} from '../../constants/information/messages';


import {DamageIndicesFieldLength} from '../../constants/information/field-length';

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

import FunkyRadioTwoOptionsDamageIndices from '../../components/generic/radio/damage-indices/funky-radio-two-options-damage-indices';
import {getVisitOptionControlValue, getDetailsControlValue,getDetailsControlValue_V2,getCategoryControls,getControlValues,getVisitOptionControlValue_V2} from '../../Factory/visit';


class DamageIndicesForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
            
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && 
                        this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ?
                         getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
            
            cornealScarring:
                    this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                            getControlValues(DamageIndices.rbtCornealScarring.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,
            
          
            chronicBlepharitis:
                        this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                    this.props.visitResult.data.visits):null,
          
            tearDuctSurgery:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,

             tearDuctSurgeryPlugged:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,   

            tearDuctSurgeryCauterised:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,  

            tearDuctSurgeryBoth:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,  
                                    
            tearDuctSurgeryAll4TubesBlocked:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,  

            tearDuctSurgeryLowerTubeInOneorBothEyes:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,  
          

           schirmersA:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersA.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,              
        
          schirmersB:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersB.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,       


        tearFilmBreakUpTime:     this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,this.props.visitResult.data.details) ? 
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,this.props.visitResult.data.details):null:null,
                                      
        otherEyeConditions:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,
                                            getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                            this.props.visitResult.data.visits):null, 
            

          lissamineGreenDyeScore:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,
                                            getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                            this.props.visitResult.data.visits):null, 


          otherEyeConditions_PleaseSpecify:  this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherEyeConditions_PleaseSpecify,this.props.visitResult.data.details) :'',
                                      
        dentalCaries:
                    this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                            getControlValues(DamageIndices.rbtDentalCaries.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,

         lossOfTeeth:
                    this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                            getControlValues(DamageIndices.rbtLossOfTeeth.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,



        
         unrestrictedSalivaryFlowA:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,              
     
       unrestrictedSalivaryFlowB:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,    
                                       
         deformingOrErosiveArthritis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 


           cranialNeuropathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        
            peripheralNeuropathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

            mononeuritisMultiplex:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

            otherCentralNervousSystemInvolvement:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 



           pleuralFibrosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

           pulmonaryHypertension:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        

             pulmonaryFibrosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        
            significantIrreversible:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

                
            cardiomyopathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCardiomyopathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

        
         chronicPancreatitis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

         gfr50:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtGFR50.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,       
        
        proteinuriaOrEquivalent:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,           
                                       
        renalTubularAcidosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,                                        


        requiringTreatment:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRequiringTreatment.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,
                                        
        nephrocalcinosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,

      endStageRenalDisease:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,


    lymphoma:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtLymphoma.controlId,
                                            getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                            this.props.visitResult.data.visits):null, 


    lymphoma_PleaseSpecify:  this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtLymphoma_PleaseSpecify,this.props.visitResult.data.details) :'',



    otherMalignancy:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtOtherMalignancy.controlId,
                                            getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                            this.props.visitResult.data.visits):null, 


    otherMalignancy_PleaseSpecify:  this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherMalignancy_PleaseSpecify,this.props.visitResult.data.details) :'',



    macroglobulinaemia:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,

    myeloma:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMyeloma.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,


          
            ocularOpen: false,
            oralOpen: false,
            musculoskeletalOpen:false,
            neuropsychiatricOpen:false,
            cardiopulmonaryOpen:false,
            giHepatobiliaryOpen:false,
            renalOpen:false,
            malignancyOpen:false,
            isComplete: this.props.visitHeaderResult && this.props.visitHeaderResult.data &&  this.props.visitHeaderResult.data.completed ?  this.props.visitHeaderResult.data.completed : false,
            
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

            this.ocular_Toggle = this.ocular_Toggle.bind(this);
            this.oral_Toggle = this.oral_Toggle.bind(this);
            this.musculoskeletal_Toggle = this.musculoskeletal_Toggle.bind(this);
            this.neuropsychiatric_Toggle = this.neuropsychiatric_Toggle.bind(this);
            this.cardiopulmonary_Toggle = this.cardiopulmonary_Toggle.bind(this);
            this.giHepatobiliary_Toggle = this.giHepatobiliary_Toggle.bind(this);
            this.renal_Toggle = this.renal_Toggle.bind(this);
            this.malignancy_Toggle = this.malignancy_Toggle.bind(this);

            
            this.getOcularCount = this.getOcularCount.bind(this);
            this.getOralCount = this.getOralCount.bind(this);
            this.getMusculoskeletalCount = this.getMusculoskeletalCount.bind(this);
            this.getNeuropsychiatricCount = this.getNeuropsychiatricCount.bind(this);
            this.getCardioPulmonaryCount = this.getCardioPulmonaryCount.bind(this);
            this.getGiHepatobiliaryCount = this.getGiHepatobiliaryCount.bind(this);
            this.getRenalCount = this.getRenalCount.bind(this);
            this.getMalignancyCount = this.getMalignancyCount.bind(this);

            this.cornealScarring_onChange = this.cornealScarring_onChange.bind(this); 
            this.chronicBlepharitis_onChange = this.chronicBlepharitis_onChange.bind(this); 
            this.tearDuctSurgery_onChange = this.tearDuctSurgery_onChange.bind(this); 
            this.tearDuctSurgeryPlugged_onChange = this.tearDuctSurgeryPlugged_onChange.bind(this); 
            this.tearDuctSurgeryCauterised_onChange = this.tearDuctSurgeryCauterised_onChange.bind(this); 
            this.tearDuctSurgeryBoth_onChange = this.tearDuctSurgeryBoth_onChange.bind(this); 
            this.tearDuctSurgeryAll4TubesBlocked_onChange = this.tearDuctSurgeryAll4TubesBlocked_onChange.bind(this); 
            this.tearDuctSurgeryLowerTubeInOneorBothEyes_onChange = this.tearDuctSurgeryLowerTubeInOneorBothEyes_onChange.bind(this); 
            this.schirmersA_onChange = this.schirmersA_onChange.bind(this); 
            this.schirmersB_onChange = this.schirmersB_onChange.bind(this); 
            this.ocularTearFilmBreakUpTime_onChange = this.ocularTearFilmBreakUpTime_onChange.bind(this);
            this.ocularTearFilmBreakUpTime_onBlur = this.ocularTearFilmBreakUpTime_onBlur.bind(this);
            this.ocularTearFilmBreakUpTime_onKeyPress = this.ocularTearFilmBreakUpTime_onKeyPress.bind(this);
            this.otherEyeConditions_onChange = this.otherEyeConditions_onChange.bind(this); 
            this.lissamineGreenDyeScore_onChange = this.lissamineGreenDyeScore_onChange.bind(this); 
            this.otherEyeConditionsPleaseSpecify_onChange = this.otherEyeConditionsPleaseSpecify_onChange.bind(this);
            this.dentalCaries_onChange = this.dentalCaries_onChange.bind(this); 
            this.lossOfTeeth_onChange = this.lossOfTeeth_onChange.bind(this); 
            this.unrestrictedSalivaryFlowA_onChange = this.unrestrictedSalivaryFlowA_onChange.bind(this); 
            this.unrestrictedSalivaryFlowB_onChange = this.unrestrictedSalivaryFlowB_onChange.bind(this); 
            this.deformingOrErosiveArthritis_onChange = this.deformingOrErosiveArthritis_onChange.bind(this); 

            this.cranialNeuropathy_onChange = this.cranialNeuropathy_onChange.bind(this); 
            this.peripheralNeuropathy_onChange = this.peripheralNeuropathy_onChange.bind(this); 
            this.mononeuritisMultiplex_onChange = this.mononeuritisMultiplex_onChange.bind(this); 
            this.otherCentralNervousSystemInvolvement_onChange = this.otherCentralNervousSystemInvolvement_onChange.bind(this); 

            this.plueralFibrosis_onChange = this.plueralFibrosis_onChange.bind(this); 
            this.pulmonaryHypertension_onChange = this.pulmonaryHypertension_onChange.bind(this); 
            this.pulmonaryFibrosis_onChange = this.pulmonaryFibrosis_onChange.bind(this); 
            this.significantIrreversible_onChange = this.significantIrreversible_onChange.bind(this); 
            this.cardiomyopathy_onChange = this.cardiomyopathy_onChange.bind(this); 
            this.chronicPancreatitis_onChange = this.chronicPancreatitis_onChange.bind(this); 

            this.gfr50_onChange = this.gfr50_onChange.bind(this); 
            this.proteinuriaOrEquivalent_onChange = this.proteinuriaOrEquivalent_onChange.bind(this); 
            this.renalTubularAcidosis_onChange = this.renalTubularAcidosis_onChange.bind(this); 
            this.requiringTreatment_onChange = this.requiringTreatment_onChange.bind(this); 
            this.nephrocalcinosis_onChange = this.nephrocalcinosis_onChange.bind(this); 
            this.endStageRenalDisease_onChange = this.endStageRenalDisease_onChange.bind(this); 

            this.lymphoma_onChange = this.lymphoma_onChange.bind(this); 
            this.lymphomaPleaseSpecify_onChange = this.lymphomaPleaseSpecify_onChange.bind(this);
            this.otherMalignancy_onChange = this.otherMalignancy_onChange.bind(this); 
            this.otherMalignancyPleaseSpecify_onChange = this.otherMalignancyPleaseSpecify_onChange.bind(this);
            this.macroglobulinaemia_onChange = this.macroglobulinaemia_onChange.bind(this); 
            this.myeloma_onChange = this.myeloma_onChange.bind(this); 
            

    }

    getOcularCount() {
        if (this.state.cornealScarring != undefined || this.state.chronicBlepharitis != undefined || 
            this.state.tearDuctSurgery != undefined || this.state.schirmersA != undefined || this.state.schirmersB != undefined ||
        this.state.otherEyeConditions != undefined || this.state.tearFilmBreakUpTime != undefined || this.state.lissamineGreenDyeScore != undefined){
            return true
        }
        else {
            return false
            }
    }


    getOralCount() {
        if (this.state.dentalCaries != undefined || this.state.lossOfTeeth != undefined ||
        this.state.unrestrictedSalivaryFlowA != undefined  || this.state.unrestrictedSalivaryFlowB != undefined){
            return true
        }
        else {
            return false
            }
    }

    getMusculoskeletalCount() {
        if (this.state.deformingOrErosiveArthritis != undefined){
            return true
        }
        else {
            return false
            }
    }

    getNeuropsychiatricCount() {
        if (this.state.cranialNeuropathy != undefined || this.state.peripheralNeuropathy != undefined ||
        this.state.mononeuritisMultiplex != undefined  || this.state.otherCentralNervousSystemInvolvement != undefined){
            return true
        }
        else {
            return false
            }
    }


    getCardioPulmonaryCount () {
        if (this.state.pleuralFibrosis != undefined || this.state.pulmonaryHypertension != undefined ||
        this.state.pulmonaryFibrosis != undefined  || this.state.significantIrreversible  != undefined
        || this.state.cardiomyopathy  != undefined){
            return true
        }
        else {
            return false
            }
    }


    getGiHepatobiliaryCount () {
        if (this.state.chronicPancreatitis != undefined){
            return true
        }
        else {
            return false
            }
    }

    getRenalCount () {
        if (this.state.gfr50 != undefined || this.state.proteinuriaOrEquivalent != undefined ||
        this.state.renalTubularAcidosis != undefined  || this.state.requiringTreatment  != undefined
        || this.state.nephrocalcinosis  != undefined  || this.state.endStageRenalDisease  != undefined){
            return true
        }
        else {
            return false
            }
    }


    getMalignancyCount() {
        if (this.state.lymphoma != undefined || this.state.otherMalignancy != undefined || 
            this.state.macroglobulinaemia != undefined || this.state.myeloma != undefined){
            return true
        }
        else {
            return false
            }
    }

    cornealScarring_onChange(e){
        if (this.state.cornealScarring == e.target.value) {
            this.setState({
                cornealScarring:null,
                changed:true
            })
        }
        else {
            this.setState({
                cornealScarring:e.target.value,
                changed:true
            })
        }
    }

    chronicBlepharitis_onChange(e){
        if (this.state.chronicBlepharitis == e.target.value) {
            this.setState({
                chronicBlepharitis:null,
                changed:true
            })
        }
        else {
            this.setState({
                chronicBlepharitis:e.target.value,
                changed:true
            })
        }
    }

    tearDuctSurgery_onChange(e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["tearDuctSurgery"]){
             delete errorsClone['tearDuctSurgery'];
        }

        if (this.state.tearDuctSurgery == e.target.value) {
            this.setState({
                tearDuctSurgery:null,
                tearDuctSurgeryPlugged:null,
                tearDuctSurgeryCauterised:null,
                tearDuctSurgeryBoth:null,
                tearDuctSurgeryAll4TubesBlocked:null,
                tearDuctSurgeryLowerTubeInOneorBothEyes:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            if (e.target.value == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[1].controlValueId){
                this.setState({
                    tearDuctSurgery:e.target.value,
                    tearDuctSurgeryPlugged:null,
                    tearDuctSurgeryCauterised:null,
                    tearDuctSurgeryBoth:null,
                    tearDuctSurgeryAll4TubesBlocked:null,
                    tearDuctSurgeryLowerTubeInOneorBothEyes:null,
                    errors:errorsClone,
                    changed:true
                })
            }else{
                this.setState({
                    tearDuctSurgery:e.target.value,
                    errors:errorsClone,
                    changed:true
                })
            }
        }
    }


    tearDuctSurgeryPlugged_onChange(e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["tearDuctSurgery"]){
             delete errorsClone['tearDuctSurgery'];
        }
        if (this.state.tearDuctSurgeryPlugged == e.target.value) {
            this.setState({
                tearDuctSurgeryPlugged:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                tearDuctSurgeryPlugged:e.target.value,
                tearDuctSurgeryCauterised:null,
                tearDuctSurgeryBoth:null,
                errors:errorsClone,
                changed:true
            })
        }
    }

    tearDuctSurgeryCauterised_onChange (e){
         let errorsClone = Object.assign({},this.state.errors);
    if (!!this.state.errors["tearDuctSurgery"]){
         delete errorsClone['tearDuctSurgery'];
    }
        if (this.state.tearDuctSurgeryCauterised == e.target.value) {
            this.setState({
                tearDuctSurgeryCauterised:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                tearDuctSurgeryCauterised:e.target.value,
                tearDuctSurgeryPlugged:null,
                tearDuctSurgeryBoth:null,
                errors:errorsClone,
                changed:true
            })
        }
    }

    tearDuctSurgeryBoth_onChange (e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["tearDuctSurgery"]){
            delete errorsClone['tearDuctSurgery'];
       }
        if (this.state.tearDuctSurgeryBoth == e.target.value) {
            this.setState({
                tearDuctSurgeryBoth:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                tearDuctSurgeryBoth:e.target.value,
                tearDuctSurgeryCauterised:null,
                tearDuctSurgeryPlugged:null,
                errors:errorsClone,
                changed:true
            })
        }
    }

    tearDuctSurgeryAll4TubesBlocked_onChange (e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["tearDuctSurgery"]){
            delete errorsClone['tearDuctSurgery'];
       }
        if (this.state.tearDuctSurgeryAll4TubesBlocked == e.target.value) {
            this.setState({
                tearDuctSurgeryAll4TubesBlocked:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                tearDuctSurgeryAll4TubesBlocked:e.target.value,
                tearDuctSurgeryLowerTubeInOneorBothEyes:null,
                errors:errorsClone,
                changed:true
            })
        }
    }


    tearDuctSurgeryLowerTubeInOneorBothEyes_onChange (e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["tearDuctSurgery"]){
            delete errorsClone['tearDuctSurgery'];
       }
        if (this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == e.target.value) {
            this.setState({
                tearDuctSurgeryLowerTubeInOneorBothEyes:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                tearDuctSurgeryLowerTubeInOneorBothEyes:e.target.value,
                tearDuctSurgeryAll4TubesBlocked:null,
                errors:errorsClone,
                changed:true
            })
        }
    }



    schirmersA_onChange(e){
        if (this.state.schirmersA == e.target.value) {
            this.setState({
                schirmersA:null,
                changed:true
            })
        }
        else {
            this.setState({
                schirmersA:e.target.value,
                changed:true
            })
        }
    }

    schirmersB_onChange(e){
        if (this.state.schirmersB == e.target.value) {
            this.setState({
                schirmersB:null,
                changed:true
            })
        }
        else {
            this.setState({
                schirmersB:e.target.value,
                changed:true
            })
        }
    }


    otherEyeConditions_onChange(e){

        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["otherEyeConditions_PleaseSpecify"]){
             delete errorsClone['otherEyeConditions_PleaseSpecify'];
        }

        if (this.state.otherEyeConditions == e.target.value) {
            this.setState({
                otherEyeConditions:null,
                otherEyeConditions_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                otherEyeConditions:e.target.value,
                otherEyeConditions_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
    }


    lissamineGreenDyeScore_onChange(e){
        if (this.state.lissamineGreenDyeScore == e.target.value) {
            this.setState({
                lissamineGreenDyeScore:null,
                changed:true
            })
        }
        else {
            this.setState({
                lissamineGreenDyeScore:e.target.value,
                changed:true
            })
        }
    }


    dentalCaries_onChange(e){
        if (this.state.dentalCaries == e.target.value) {
            this.setState({
                dentalCaries:null,
                changed:true
            })
        }
        else {
            this.setState({
                dentalCaries:e.target.value,
                changed:true
            })
        }
    }

    lossOfTeeth_onChange(e){
        if (this.state.lossOfTeeth == e.target.value) {
            this.setState({
                lossOfTeeth:null,
                changed:true
            })
        }
        else {
            this.setState({
                lossOfTeeth:e.target.value,
                changed:true
            })
        }
    }

    otherEyeConditionsPleaseSpecify_onChange(e){
        //console.log('otherAlternateDiagnosis_onChange');
    
    
        if (!!this.state.errors['otherEyeConditions_PleaseSpecify']){
            //One of the above error has occurred 
           // console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['otherEyeConditions_PleaseSpecify'];
           
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               otherEyeConditions_PleaseSpecify:e.target.value,
              // ocularSignsObjectiveARNA:false,
               changed:true
           });
          }
           else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                        otherEyeConditions_PleaseSpecify:e.target.value,
                            changed:true
                           })
               }
    }
    


    unrestrictedSalivaryFlowA_onChange(e){
        if (this.state.unrestrictedSalivaryFlowA == e.target.value) {
            this.setState({
                unrestrictedSalivaryFlowA:null,
                changed:true
            })
        }
        else {
            this.setState({
                unrestrictedSalivaryFlowA:e.target.value,
                changed:true
            })
        }
    }

    unrestrictedSalivaryFlowB_onChange(e){
        if (this.state.unrestrictedSalivaryFlowB == e.target.value) {
            this.setState({
                unrestrictedSalivaryFlowB:null,
                changed:true
            })
        }
        else {
            this.setState({
                unrestrictedSalivaryFlowB:e.target.value,
                changed:true
            })
        }
    }


    deformingOrErosiveArthritis_onChange(e){
        if (this.state.deformingOrErosiveArthritis == e.target.value) {
            this.setState({
                deformingOrErosiveArthritis:null,
                changed:true
            })
        }
        else {
            this.setState({
                deformingOrErosiveArthritis:e.target.value,
                changed:true
            })
        }
    }


    cranialNeuropathy_onChange(e){
        if (this.state.cranialNeuropathy == e.target.value) {
            this.setState({
                cranialNeuropathy:null,
                changed:true
            })
        }
        else {
            this.setState({
                cranialNeuropathy:e.target.value,
                changed:true
            })
        }
    }

    peripheralNeuropathy_onChange(e){
        if (this.state.peripheralNeuropathy == e.target.value) {
            this.setState({
                peripheralNeuropathy:null,
                changed:true
            })
        }
        else {
            this.setState({
                peripheralNeuropathy:e.target.value,
                changed:true
            })
        }
    }


    mononeuritisMultiplex_onChange(e){
        if (this.state.mononeuritisMultiplex == e.target.value) {
            this.setState({
                mononeuritisMultiplex:null,
                changed:true
            })
        }
        else {
            this.setState({
                mononeuritisMultiplex:e.target.value,
                changed:true
            })
        }
    }

    otherCentralNervousSystemInvolvement_onChange(e){
        if (this.state.otherCentralNervousSystemInvolvement == e.target.value) {
            this.setState({
                otherCentralNervousSystemInvolvement:null,
                changed:true
            })
        }
        else {
            this.setState({
                otherCentralNervousSystemInvolvement:e.target.value,
                changed:true
            })
        }
    }



    plueralFibrosis_onChange(e){
        if (this.state.pleuralFibrosis == e.target.value) {
            this.setState({
                pleuralFibrosis:null,
                changed:true
            })
        }
        else {
            this.setState({
                pleuralFibrosis:e.target.value,
                changed:true
            })
        }
    }


    pulmonaryHypertension_onChange(e){
        if (this.state.pulmonaryHypertension == e.target.value) {
            this.setState({
                pulmonaryHypertension:null,
                changed:true
            })
        }
        else {
            this.setState({
                pulmonaryHypertension:e.target.value,
                changed:true
            })
        }
    }

    pulmonaryFibrosis_onChange(e){
        if (this.state.pulmonaryFibrosis == e.target.value) {
            this.setState({
                pulmonaryFibrosis:null,
                changed:true
            })
        }
        else {
            this.setState({
                pulmonaryFibrosis:e.target.value,
                changed:true
            })
        }
    }

    significantIrreversible_onChange(e){
        if (this.state.significantIrreversible == e.target.value) {
            this.setState({
                significantIrreversible:null,
                changed:true
            })
        }
        else {
            this.setState({
                significantIrreversible:e.target.value,
                changed:true
            })
        }
    }

    cardiomyopathy_onChange(e){
        if (this.state.cardiomyopathy == e.target.value) {
            this.setState({
                cardiomyopathy:null,
                changed:true
            })
        }
        else {
            this.setState({
                cardiomyopathy:e.target.value,
                changed:true
            })
        }
    }


    chronicPancreatitis_onChange(e){
        if (this.state.chronicPancreatitis == e.target.value) {
            this.setState({
                chronicPancreatitis:null,
                changed:true
            })
        }
        else {
            this.setState({
                chronicPancreatitis:e.target.value,
                changed:true
            })
        }
    }


    gfr50_onChange(e){
        if (this.state.gfr50 == e.target.value) {
            this.setState({
                gfr50:null,
                changed:true
            })
        }
        else {
            this.setState({
                gfr50:e.target.value,
                changed:true
            })
        }
    }

    proteinuriaOrEquivalent_onChange(e){
        if (this.state.proteinuriaOrEquivalent == e.target.value) {
            this.setState({
                proteinuriaOrEquivalent:null,
                changed:true
            })
        }
        else {
            this.setState({
                proteinuriaOrEquivalent:e.target.value,
                changed:true
            })
        }
    }

    renalTubularAcidosis_onChange(e){

        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["renalTubularAcidosis"]){
             delete errorsClone['renalTubularAcidosis'];
        }


        if (this.state.renalTubularAcidosis == e.target.value) {
            this.setState({
                renalTubularAcidosis:null,
                requiringTreatment:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            if (e.target.value == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[1].controlValueId){
            this.setState({
                renalTubularAcidosis:e.target.value,
                requiringTreatment:null,
                errors:errorsClone,
                changed:true
            })
        }
        else{
            this.setState({
                renalTubularAcidosis:e.target.value,
                errors:errorsClone,
                changed:true
            })
        }
        }
    }

    requiringTreatment_onChange(e){

        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["renalTubularAcidosis"]){
             delete errorsClone['renalTubularAcidosis'];
        }

        if (this.state.requiringTreatment == e.target.value) {
            this.setState({
                requiringTreatment:null,
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                requiringTreatment:e.target.value,
                errors:errorsClone,
                changed:true
            })
        }
    }

    nephrocalcinosis_onChange(e){
        if (this.state.nephrocalcinosis == e.target.value) {
            this.setState({
                nephrocalcinosis:null,
                changed:true
            })
        }
        else {
            this.setState({
                nephrocalcinosis:e.target.value,
                changed:true
            })
        }
    }

    endStageRenalDisease_onChange(e){
        if (this.state.endStageRenalDisease == e.target.value) {
            this.setState({
                endStageRenalDisease:null,
                changed:true
            })
        }
        else {
            this.setState({
                endStageRenalDisease:e.target.value,
                changed:true
            })
        }
    }


    lymphoma_onChange (e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["lymphoma_PleaseSpecify"]){
            delete errorsClone['lymphoma_PleaseSpecify'];
       }
        if (this.state.lymphoma == e.target.value) {
            this.setState({
                lymphoma:null,
                lymphoma_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                lymphoma:e.target.value,
                lymphoma_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
    }


    lymphomaPleaseSpecify_onChange(e){
        //console.log('otherAlternateDiagnosis_onChange');
    
    
        if (!!this.state.errors['lymphoma_PleaseSpecify']){
            //One of the above error has occurred 
           // console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['lymphoma_PleaseSpecify'];
           
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               lymphoma_PleaseSpecify:e.target.value,
              // ocularSignsObjectiveARNA:false,
               changed:true
           });
          }
           else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                        lymphoma_PleaseSpecify:e.target.value,
                            changed:true
                           })
               }
    }



    otherMalignancy_onChange (e){
        let errorsClone = Object.assign({},this.state.errors);
        if (!!this.state.errors["otherMalignancy_PleaseSpecify"]){
            delete errorsClone["otherMalignancy_PleaseSpecify"];
       }
        if (this.state.otherMalignancy == e.target.value) {
            this.setState({
                otherMalignancy:null,
                otherMalignancy_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
        else {
            this.setState({
                otherMalignancy:e.target.value,
                otherMalignancy_PleaseSpecify:'',
                errors:errorsClone,
                changed:true
            })
        }
    }


    otherMalignancyPleaseSpecify_onChange(e){
        if (!!this.state.errors['otherMalignancy_PleaseSpecify']){
            //One of the above error has occurred 
           // console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['otherMalignancy_PleaseSpecify'];
           
         
         //copy clone back to errors in state
           this.setState({
            //[e.target.name]: e.target.value,
               errors:errorsClone,
               otherMalignancy_PleaseSpecify:e.target.value,
              // ocularSignsObjectiveARNA:false,
               changed:true
           });
          }
           else {
                    // console.log('no invalid values update state with no error');
                    //no invalid values update state with no error
                     this.setState({
                        otherMalignancy_PleaseSpecify:e.target.value,
                            changed:true
                           })
               }
    }


    macroglobulinaemia_onChange(e){
        if (this.state.macroglobulinaemia == e.target.value) {
            this.setState({
                macroglobulinaemia:null,
                changed:true
            })
        }
        else {
            this.setState({
                macroglobulinaemia:e.target.value,
                changed:true
            })
        }
    }

    myeloma_onChange(e){
        if (this.state.myeloma == e.target.value) {
            this.setState({
                myeloma:null,
                changed:true
            })
        }
        else {
            this.setState({
                myeloma:e.target.value,
                changed:true
            })
        }
    }

    ocular_Toggle(){
        this.setState({
            ocularOpen:!this.state.ocularOpen
        })
    }

    oral_Toggle() {
        this.setState({
            oralOpen:!this.state.oralOpen
        })
    }

    musculoskeletal_Toggle() {
        this.setState({
            musculoskeletalOpen:!this.state.musculoskeletalOpen
        })
    }

    neuropsychiatric_Toggle() {
        this.setState({
            neuropsychiatricOpen:!this.state.neuropsychiatricOpen
        })
    }

    cardiopulmonary_Toggle() {
        this.setState({
            cardiopulmonaryOpen:!this.state.cardiopulmonaryOpen
        })
    }


    giHepatobiliary_Toggle() {
        this.setState({
            giHepatobiliaryOpen:!this.state.giHepatobiliaryOpen
        })
    }

    renal_Toggle() {
        this.setState({
            renalOpen:!this.state.renalOpen
        })
    }


    malignancy_Toggle() {
        this.setState({
            malignancyOpen:!this.state.malignancyOpen
        })
    }



    ocularTearFilmBreakUpTime_onChange(e){
                    this.setState({
                        tearFilmBreakUpTime:e.target.value == '' ? null : e.target.value,
                        changed:true,
                    });            
         }
        
        



ocularTearFilmBreakUpTime_onBlur(e){
    this.setState({
        tearFilmBreakUpTime:e.target.value,
        changed:true,
    });    
}





ocularTearFilmBreakUpTime_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }
}
        
        



    validateVisit(){
        let errors = {};
      

            if ( this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValueId &&               
                    this.state.tearDuctSurgeryPlugged == undefined &&
                    this.state.tearDuctSurgeryCauterised == undefined &&
                    this.state.tearDuctSurgeryBoth == undefined &&
                    this.state.tearDuctSurgeryAll4TubesBlocked == undefined &&
                    this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == undefined
                ){
                    errors.tearDuctSurgery = DamageIndicesValidationMessages.tearDuctSurgery.alternateRequired;
            }
      

            if ( this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValueId &&               
                this.state.otherEyeConditions_PleaseSpecify.length == 0
            ){
                errors.otherEyeConditions_PleaseSpecify = DamageIndicesValidationMessages.otherEyeConditionsPleaseSpecify.otherEyeConditionsRequired
        }



        if ( this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValueId &&               
            this.state.requiringTreatment == undefined 
        ){
            errors.renalTubularAcidosis = DamageIndicesValidationMessages.renalTubularAcidosis.required
    }




    if ( this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValueId &&               
        this.state.lymphoma_PleaseSpecify.length == 0
    ){
        errors.lymphoma_PleaseSpecify = DamageIndicesValidationMessages.lymphomaPleaseSpecify.lymphomaPleaseSpecifyRequired
}

if ( this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValueId &&               
    this.state.otherMalignancy_PleaseSpecify.length == 0
){
    errors.otherMalignancy_PleaseSpecify = DamageIndicesValidationMessages.otherMalignancyPleaseSpecify.otherMalignancyPleaseSpecifyRequired
}

       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []

        if (this.state.cornealScarring){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.cornealScarring,
                    controlId:
                    this.state.cornealScarring == getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtCornealScarring.controlId ,this.state.visitControls)[0].controlId:
                    this.state.cornealScarring == getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtCornealScarring.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }

        if (this.state.chronicBlepharitis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.chronicBlepharitis,
                    controlId:
                    this.state.chronicBlepharitis == getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtChronicBlepharitis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.chronicBlepharitis == getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtChronicBlepharitis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }

        if (this.state.tearDuctSurgery){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgery,
                    controlId:
                    this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }

        if (this.state.tearDuctSurgeryPlugged){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgeryPlugged,
                    controlId:
                    this.state.tearDuctSurgeryPlugged == getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgeryPlugged == getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }

        if (this.state.tearDuctSurgeryCauterised){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgeryCauterised,
                    controlId:
                    this.state.tearDuctSurgeryCauterised == getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgeryCauterised == getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
                }
            )
        }


        if (this.state.tearDuctSurgeryBoth){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgeryBoth,
                    controlId:
                    this.state.tearDuctSurgeryBoth == getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgeryBoth == getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.tearDuctSurgeryAll4TubesBlocked){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgeryAll4TubesBlocked,
                    controlId:
                    this.state.tearDuctSurgeryAll4TubesBlocked == getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgeryAll4TubesBlocked == getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        
        if (this.state.tearDuctSurgeryLowerTubeInOneorBothEyes){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearDuctSurgeryLowerTubeInOneorBothEyes,
                    controlId:
                    this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId ,this.state.visitControls)[0].controlId:
                    this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.schirmersA){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.schirmersA,
                    controlId:
                    this.state.schirmersA == getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtListSchirmersA.controlId ,this.state.visitControls)[0].controlId:
                    this.state.schirmersA == getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtListSchirmersA.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.schirmersB){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.schirmersB,
                    controlId:
                    this.state.schirmersB == getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtListSchirmersB.controlId ,this.state.visitControls)[0].controlId:
                    this.state.schirmersB == getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtListSchirmersB.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }


        if (this.state.otherEyeConditions){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.otherEyeConditions,
                    controlId:
                    this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherEyeConditions.controlId ,this.state.visitControls)[0].controlId:
                    this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherEyeConditions.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.lissamineGreenDyeScore){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.lissamineGreenDyeScore,
                    controlId:
                    this.state.lissamineGreenDyeScore == getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId ,this.state.visitControls)[0].controlId:
                    this.state.lissamineGreenDyeScore == getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }


        if (this.state.dentalCaries){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.dentalCaries,
                    controlId:
                    this.state.dentalCaries == getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtDentalCaries.controlId ,this.state.visitControls)[0].controlId:
                    this.state.dentalCaries == getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtDentalCaries.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }

        if (this.state.lossOfTeeth){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.lossOfTeeth,
                    controlId:
                    this.state.lossOfTeeth == getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtLossOfTeeth.controlId ,this.state.visitControls)[0].controlId:
                    this.state.lossOfTeeth == getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtLossOfTeeth.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id   
        
                }
            )
        }


        
        if (this.state.unrestrictedSalivaryFlowA){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.unrestrictedSalivaryFlowA,
                    controlId:
                    this.state.unrestrictedSalivaryFlowA == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId ,this.state.visitControls)[0].controlId:
                    this.state.unrestrictedSalivaryFlowA == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.unrestrictedSalivaryFlowB){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.unrestrictedSalivaryFlowB,
                    controlId:
                    this.state.unrestrictedSalivaryFlowB == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId ,this.state.visitControls)[0].controlId:
                    this.state.unrestrictedSalivaryFlowB == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.deformingOrErosiveArthritis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.deformingOrErosiveArthritis,
                    controlId:
                    this.state.deformingOrErosiveArthritis == getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.deformingOrErosiveArthritis == getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }


        if (this.state.cranialNeuropathy){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.cranialNeuropathy,
                    controlId:
                    this.state.cranialNeuropathy == getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtCranialNeuropathy.controlId ,this.state.visitControls)[0].controlId:
                    this.state.cranialNeuropathy == getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtCranialNeuropathy.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.peripheralNeuropathy){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.peripheralNeuropathy,
                    controlId:
                    this.state.peripheralNeuropathy == getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId ,this.state.visitControls)[0].controlId:
                    this.state.peripheralNeuropathy == getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.mononeuritisMultiplex){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.mononeuritisMultiplex,
                    controlId:
                    this.state.mononeuritisMultiplex == getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId ,this.state.visitControls)[0].controlId:
                    this.state.mononeuritisMultiplex == getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.otherCentralNervousSystemInvolvement){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.otherCentralNervousSystemInvolvement,
                    controlId:
                    this.state.otherCentralNervousSystemInvolvement == getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId ,this.state.visitControls)[0].controlId:
                    this.state.otherCentralNervousSystemInvolvement == getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.pleuralFibrosis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.pleuralFibrosis,
                    controlId:
                    this.state.pleuralFibrosis == getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtPleuralFibrosis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.pleuralFibrosis == getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtPleuralFibrosis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.pulmonaryHypertension){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.pulmonaryHypertension,
                    controlId:
                    this.state.pulmonaryHypertension == getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId ,this.state.visitControls)[0].controlId:
                    this.state.pulmonaryHypertension == getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        
        if (this.state.pulmonaryFibrosis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.pulmonaryFibrosis,
                    controlId:
                    this.state.pulmonaryFibrosis == getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.pulmonaryFibrosis == getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.significantIrreversible){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.significantIrreversible,
                    controlId:
                    this.state.significantIrreversible == getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtSignificantIrreversible.controlId ,this.state.visitControls)[0].controlId:
                    this.state.significantIrreversible == getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtSignificantIrreversible.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.cardiomyopathy){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.cardiomyopathy,
                    controlId:
                    this.state.cardiomyopathy == getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtCardiomyopathy.controlId ,this.state.visitControls)[0].controlId:
                    this.state.cardiomyopathy == getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtCardiomyopathy.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.chronicPancreatitis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.chronicPancreatitis,
                    controlId:
                    this.state.chronicPancreatitis == getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtChronicPancreatitis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.chronicPancreatitis == getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtChronicPancreatitis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.gfr50){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.gfr50,
                    controlId:
                    this.state.gfr50 == getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtGFR50.controlId ,this.state.visitControls)[0].controlId:
                    this.state.gfr50 == getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtGFR50.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.proteinuriaOrEquivalent){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.proteinuriaOrEquivalent,
                    controlId:
                    this.state.proteinuriaOrEquivalent == getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId ,this.state.visitControls)[0].controlId:
                    this.state.proteinuriaOrEquivalent == getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.renalTubularAcidosis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.renalTubularAcidosis,
                    controlId:
                    this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.requiringTreatment){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.requiringTreatment,
                    controlId:
                    this.state.requiringTreatment == getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtRequiringTreatment.controlId ,this.state.visitControls)[0].controlId:
                    this.state.requiringTreatment == getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtRequiringTreatment.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.nephrocalcinosis){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.nephrocalcinosis,
                    controlId:
                    this.state.nephrocalcinosis == getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtNephrocalcinosis.controlId ,this.state.visitControls)[0].controlId:
                    this.state.nephrocalcinosis == getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtNephrocalcinosis.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.endStageRenalDisease){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.endStageRenalDisease,
                    controlId:
                    this.state.endStageRenalDisease == getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId ,this.state.visitControls)[0].controlId:
                    this.state.endStageRenalDisease == getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }


        
        if (this.state.lymphoma){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.lymphoma,
                    controlId:
                    this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtLymphoma.controlId ,this.state.visitControls)[0].controlId:
                    this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtLymphoma.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.otherMalignancy){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.otherMalignancy,
                    controlId:
                    this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherMalignancy.controlId ,this.state.visitControls)[0].controlId:
                    this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtOtherMalignancy.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.macroglobulinaemia){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.macroglobulinaemia,
                    controlId:
                    this.state.macroglobulinaemia == getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId ,this.state.visitControls)[0].controlId:
                    this.state.macroglobulinaemia == getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

        if (this.state.myeloma){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.myeloma,
                    controlId:
                    this.state.myeloma == getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(DamageIndices.rbtMyeloma.controlId ,this.state.visitControls)[0].controlId:
                    this.state.myeloma == getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(DamageIndices.rbtMyeloma.controlId ,this.state.visitControls)[1].controlId :
                    0,
                    categoryId:   categories.damageIndices.id
                }
            )
        }

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
    //}

    if (this.state.tearFilmBreakUpTime != undefined){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.tearFilmBreakUpTime,
                controlId:DamageIndices.txtTearFilmBreakUpTime.controlId, 
                categoryId:   categories.damageIndices.id   
            }
        )
    }

    if (this.state.otherEyeConditions_PleaseSpecify &&
        this.state.otherEyeConditions_PleaseSpecify.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.otherEyeConditions_PleaseSpecify,
                controlId:DamageIndices.txtOtherEyeConditions_PleaseSpecify.controlId, 
                categoryId:   categories.damageIndices.id   
            }
        )
    }

    if (this.state.lymphoma_PleaseSpecify &&
        this.state.lymphoma_PleaseSpecify.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.lymphoma_PleaseSpecify,
                controlId:DamageIndices.txtLymphoma_PleaseSpecify.controlId, 
                categoryId:   categories.damageIndices.id   
            }
        )
    }
    if (this.state.otherMalignancy_PleaseSpecify &&
        this.state.otherMalignancy_PleaseSpecify.length > 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.otherMalignancy_PleaseSpecify,
                controlId:DamageIndices.txtOtherMalignancy_PleaseSpecify.controlId, 
                categoryId:   categories.damageIndices.id   
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
    this.props.handleSaveVisitHeader(visit, detail, categories.damageIndices.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.damageIndices.id);
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
                patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
            
                isComplete: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data &&  nextProps.visitHeaderResult.data.completed ?  nextProps.visitHeaderResult.data.completed : false,
               
                visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues &&
                 nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
                
                cornealScarring:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                                    getControlValues(DamageIndices.rbtCornealScarring.controlId,
                                                        getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                                        nextProps.visitResult.data.visits):null,


                  chronicBlepharitis:
                        nextProps.visitResult && 
                        nextProps.visitResult.data && 
                        nextProps.visitResult.data.visits && 
                        nextProps.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                    nextProps.visitResult.data.visits):null,


                tearDuctSurgery:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                        getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,
                                        getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                           nextProps.visitResult.data.visits):null,



                tearDuctSurgeryPlugged:
                            nextProps.visitResult && 
                            nextProps.visitResult.data && 
                            nextProps.visitResult.data.visits && 
                            nextProps.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,
                                getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                   nextProps.visitResult.data.visits):null,


                tearDuctSurgeryCauterised:
                                                nextProps.visitResult && 
                                                nextProps.visitResult.data && 
                                                nextProps.visitResult.data.visits && 
                                                nextProps.visitResult.data.visits.length > 0 ? 
                                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                                    getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,
                                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                                    nextProps.visitResult.data.visits):null, 


                tearDuctSurgeryBoth:
                                            nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.visits && 
                                            nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                                getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,
                                                getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                                nextProps.visitResult.data.visits):null,


                tearDuctSurgeryAll4TubesBlocked:
                                   nextProps.visitResult && 
                                   nextProps.visitResult.data && 
                                   nextProps.visitResult.data.visits && 
                                   nextProps.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,
                                       getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                          nextProps.visitResult.data.visits):null, 


             tearDuctSurgeryLowerTubeInOneorBothEyes:
                                   nextProps.visitResult && 
                                   nextProps.visitResult.data && 
                                   nextProps.visitResult.data.visits && 
                                   nextProps.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,
                                       getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                          nextProps.visitResult.data.visits):null,  

        schirmersA:
                                   nextProps.visitResult && 
                                   nextProps.visitResult.data && 
                                   nextProps.visitResult.data.visits && 
                                   nextProps.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersA.controlId,
                                       getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                          nextProps.visitResult.data.visits):null,              
        
          schirmersB:
                                   nextProps.visitResult && 
                                   nextProps.visitResult.data && 
                                   nextProps.visitResult.data.visits && 
                                   nextProps.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersB.controlId,
                                       getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                          nextProps.visitResult.data.visits):null,


   tearFilmBreakUpTime:     nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.details && 
                                    nextProps.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,nextProps.visitResult.data.details) ? 
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,nextProps.visitResult.data.details):null:null,
                                      
        otherEyeConditions:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,
                                            getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null, 
            

          lissamineGreenDyeScore:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,
                                            getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null, 


        otherEyeConditions_PleaseSpecify:  nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.details && 
                                            nextProps.visitResult.data.details.length > 0 ?
                                                getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherEyeConditions_PleaseSpecify,nextProps.visitResult.data.details) ? 
                                                getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherEyeConditions_PleaseSpecify,nextProps.visitResult.data.details):null:null,
                              
                                            
        dentalCarries:
                            nextProps.visitResult && 
                            nextProps.visitResult.data && 
                            nextProps.visitResult.data.visits && 
                            nextProps.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtDentalCaries.controlId,
                                        getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                        nextProps.visitResult.data.visits):null,


        lossOfTeeth:
                    nextProps.visitResult && 
                    nextProps.visitResult.data && 
                    nextProps.visitResult.data.visits && 
                    nextProps.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                            getControlValues(DamageIndices.rbtLossOfTeeth.controlId,
                                getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                nextProps.visitResult.data.visits):null,


    unrestrictedSalivaryFlowA:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,              
     
       unrestrictedSalivaryFlowB:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,    

  deformingOrErosiveArthritis:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,  
   
            cranialNeuropathy:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 
        
            peripheralNeuropathy:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 

            mononeuritisMultiplex:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 

            otherCentralNervousSystemInvolvement:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 


           pleuralFibrosis:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 

           pulmonaryHypertension:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 
        

             pulmonaryFibrosis:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 
        
            significantIrreversible:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 

                
            cardiomyopathy:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCardiomyopathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null, 

            chronicPancreatitis:
                                       nextProps.visitResult && 
                                       nextProps.visitResult.data && 
                                       nextProps.visitResult.data.visits && 
                                       nextProps.visitResult.data.visits.length > 0 ? 
                                       getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                           getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,
                                           getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                              nextProps.visitResult.data.visits):null,

          gfr50:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtGFR50.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,       
        
        proteinuriaOrEquivalent:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,           
                                       
        renalTubularAcidosis:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,                                        


        requiringTreatment:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRequiringTreatment.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,
                                        
        nephrocalcinosis:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,

      endStageRenalDisease:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,     
                                       
        
    
     lymphoma:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtLymphoma.controlId,
                                            getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null, 


      lymphoma_PleaseSpecify:  nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.details && 
                                    nextProps.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtLymphoma_PleaseSpecify,nextProps.visitResult.data.details) :'',



    otherMalignancy:
                                    nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtOtherMalignancy.controlId,
                                            getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null, 


      otherMalignancy_PleaseSpecify:  nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.details && 
                                    nextProps.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherMalignancy_PleaseSpecify,nextProps.visitResult.data.details) :'',



    macroglobulinaemia:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,

    myeloma:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMyeloma.controlId,
                                    getCategoryControls(categories.damageIndices.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                       nextProps.visitResult.data.visits):null,                                   




                // ocularOpen: false,
                // oralOpen: false,
                // musculoskeletalOpen:false,
                // neuropsychiatricOpen:false,
                // cardiopulmonaryOpen:false,
                // giHepatobiliaryOpen:false,
                // renalOpen:false,
                // malignancyOpen:false,
                



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
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
              
                isComplete: this.props.visitHeaderResult && this.props.visitHeaderResult.data &&  this.props.visitHeaderResult.data.completed ?  
                this.props.visitHeaderResult.data.completed : false,        
                

                visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && 
                                this.props.visitControlValuesResult.data.visitControlValues && 
                                this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? 
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
                
                cornealScarring:
                    this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                            getControlValues(DamageIndices.rbtCornealScarring.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,

                chronicBlepharitis:
                        this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                    this.props.visitResult.data.visits):null,
                
                tearDuctSurgery:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,


                tearDuctSurgeryPlugged:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,


                tearDuctSurgeryCauterised:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null, 

                  tearDuctSurgeryBoth:
                            this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,
                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                   this.props.visitResult.data.visits):null,  
                                   
                                   
                tearDuctSurgeryAll4TubesBlocked:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null, 


                tearDuctSurgeryLowerTubeInOneorBothEyes:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,  

                schirmersA:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersA.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,              
        
                schirmersB:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtListSchirmersB.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,


            tearFilmBreakUpTime:     this.props.visitResult && 
                                          this.props.visitResult.data && 
                                          this.props.visitResult.data.details && 
                                          this.props.visitResult.data.details.length > 0 ?
                                              getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,this.props.visitResult.data.details) ? 
                                              getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtTearFilmBreakUpTime,this.props.visitResult.data.details):null:null,
                                            
              otherEyeConditions:
                                          this.props.visitResult && 
                                          this.props.visitResult.data && 
                                          this.props.visitResult.data.visits && 
                                          this.props.visitResult.data.visits.length > 0 ? 
                                                  getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                                  getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,
                                                  getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                  this.props.visitResult.data.visits):null, 
                  
      
                lissamineGreenDyeScore:
                                          this.props.visitResult && 
                                          this.props.visitResult.data && 
                                          this.props.visitResult.data.visits && 
                                          this.props.visitResult.data.visits.length > 0 ? 
                                                  getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                                  getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,
                                                  getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                  this.props.visitResult.data.visits):null, 

               otherEyeConditions_PleaseSpecify:  this.props.visitResult && 
                                                  this.props.visitResult.data && 
                                                  this.props.visitResult.data.details && 
                                                  this.props.visitResult.data.details.length > 0 ?
                                                      getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherEyeConditions_PleaseSpecify,this.props.visitResult.data.details) ? 
                                                      getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherEyeConditions_PleaseSpecify,this.props.visitResult.data.details):null:null,

            
                dentalCarries:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtDentalCaries.controlId,
                                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,

                lossOfTeeth:
                                    this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                            getControlValues(DamageIndices.rbtLossOfTeeth.controlId,
                                                getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,


    unrestrictedSalivaryFlowA:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,              
     
       unrestrictedSalivaryFlowB:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,    


      deformingOrErosiveArthritis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,  
            

            cranialNeuropathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        
            peripheralNeuropathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

            mononeuritisMultiplex:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

            otherCentralNervousSystemInvolvement:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

           pleuralFibrosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

           pulmonaryHypertension:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        

             pulmonaryFibrosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 
        
            significantIrreversible:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

                
            cardiomyopathy:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtCardiomyopathy.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null, 

    
 chronicPancreatitis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,


 gfr50:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtGFR50.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,       
        
        proteinuriaOrEquivalent:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,           
                                       
        renalTubularAcidosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,                                        


        requiringTreatment:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtRequiringTreatment.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,
                                        
        nephrocalcinosis:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,

      endStageRenalDisease:
                                this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                    getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,
                                    getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                       this.props.visitResult.data.visits):null,


                                       lymphoma:
                                       this.props.visitResult && 
                                       this.props.visitResult.data && 
                                       this.props.visitResult.data.visits && 
                                       this.props.visitResult.data.visits.length > 0 ? 
                                               getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                               getControlValues(DamageIndices.rbtLymphoma.controlId,
                                               getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                               this.props.visitResult.data.visits):null, 
   
   
         lymphoma_PleaseSpecify:  this.props.visitResult && 
                                       this.props.visitResult.data && 
                                       this.props.visitResult.data.details && 
                                       this.props.visitResult.data.details.length > 0 ?
                                           getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtLymphoma_PleaseSpecify,this.props.visitResult.data.details) :'',
   
   
   
       otherMalignancy:
                                       this.props.visitResult && 
                                       this.props.visitResult.data && 
                                       this.props.visitResult.data.visits && 
                                       this.props.visitResult.data.visits.length > 0 ? 
                                               getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                               getControlValues(DamageIndices.rbtOtherMalignancy.controlId,
                                               getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                               this.props.visitResult.data.visits):null, 
   
   
         otherMalignancy_PleaseSpecify:  this.props.visitResult && 
                                       this.props.visitResult.data && 
                                       this.props.visitResult.data.details && 
                                       this.props.visitResult.data.details.length > 0 ?
                                           getDetailsControlValue_V2(categories.damageIndices.id, DamageIndices.txtOtherMalignancy_PleaseSpecify,this.props.visitResult.data.details) :'',
   
   
   
       macroglobulinaemia:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,
   
       myeloma:
                                   this.props.visitResult && 
                                   this.props.visitResult.data && 
                                   this.props.visitResult.data.visits && 
                                   this.props.visitResult.data.visits.length > 0 ? 
                                   getVisitOptionControlValue_V2(categories.damageIndices.id, 
                                       getControlValues(DamageIndices.rbtMyeloma.controlId,
                                       getCategoryControls(categories.damageIndices.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                          this.props.visitResult.data.visits):null,                                   



                ocularOpen: false,
                oralOpen: false,
                musculoskeletalOpen:false,
                neuropsychiatricOpen:false,
                cardiopulmonaryOpen:false,
                giHepatobiliaryOpen:false,
                renalOpen:false,
                malignancyOpen:false,


                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
               
                changed:false,
            });
       }

      

       componentDidUpdate(prevProps, prevState) {
       
        if (!prevState.ocularOpen && prevState.isComplete) {
                this.setState({
                    ocularOpen: true
                })
        }

        if (!prevState.oralOpen &&  prevState.isComplete) {
                this.setState({
                    oralOpen: true
                })
        }
        
        if (!prevState.musculoskeletalOpen && prevState.isComplete) {
                this.setState({
                    musculoskeletalOpen: true
                })
        }


        if (!prevState.neuropsychiatricOpen && prevState.isComplete) {
                this.setState({
                    neuropsychiatricOpen: true
                })
        }

        if (!prevState.cardiopulmonaryOpen && prevState.isComplete) {
                this.setState({
                    cardiopulmonaryOpen: true
                })
        }

        if (!prevState.giHepatobiliaryOpen && prevState.isComplete) {
                this.setState({
                    giHepatobiliaryOpen: true
                })
        }

        if (!prevState.renalOpen &&  prevState.isComplete) {
                this.setState({
                    renalOpen: true
                })
        }

        if (!prevState.malignancyOpen &&  prevState.isComplete) {
                this.setState({
                    malignancyOpen: true
                })
        }
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
            <h3 className="panel-title pull-left">Damage Indices</h3>
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
nextCategoryName = {VISIT_CATEGORY_PASTMEDICALHISTORY}
prevCategoryName = {VISIT_CATEGORY_ACTIVITYSCORE}
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
                <h3 className="panel-title">Damage Indices</h3>
                
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
nextCategoryName = {VISIT_CATEGORY_PASTMEDICALHISTORY}
prevCategoryName = {VISIT_CATEGORY_ACTIVITYSCORE}
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
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.ocularOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.ocular_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.ocular_Toggle()}></i>:
                                null
                        } 
                                    Ocular  {
                                        this.getOcularCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.ocularOpen &&
                                        <FadeIn>
                                        <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    
                                                <FunkyRadioTwoOptionsDamageIndices caption={"1. Corneal scarring"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optCornealScarringYes"}
                                                    optionTwoId={"optCornealScarringNo"}
                                                    optionOneHtmlFor={"optCornealScarringYes"}
                                                    optionTwoHtmlFor={"optCornealScarringNo"}

                                                    optionOneChecked={this.state.cornealScarring == getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.cornealScarring_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.cornealScarring == getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.cornealScarring_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtCornealScarring.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                    <FunkyRadioTwoOptionsDamageIndices caption={"2. Chronic blepharitis <strong>SSDDI only</strong>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optChronicBlepharitisYes"}
                                                    optionTwoId={"optChronicBlepharitisNo"}
                                                    optionOneHtmlFor={"optChronicBlepharitisYes"}
                                                    optionTwoHtmlFor={"optChronicBlepharitisNo"}

                                                    optionOneChecked={this.state.chronicBlepharitis == getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.chronicBlepharitis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.chronicBlepharitis == getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.chronicBlepharitis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtChronicBlepharitis.controlId,this.state.visitControls)[1].controlValue} /> 


                                                    <FunkyRadioTwoOptionsDamageIndices caption={"3. Tear duct surgery (plug or cauterised)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optTearDuctSurgeryYes"}
                                                    optionTwoId={"optTearDuctSurgeryNo"}
                                                    optionOneHtmlFor={"optTearDuctSurgeryYes"}
                                                    optionTwoHtmlFor={"optTearDuctSurgeryNo"}

                                                    optionOneChecked={this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.tearDuctSurgery_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.tearDuctSurgery_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[1].controlValue} /> 

                                                   
                                                    { this.state.tearDuctSurgery == getControlValues(DamageIndices.rbtTearDuctSurgery.controlId,this.state.visitControls)[0].controlValueId &&
                                                        <FadeIn>
                                                            <div className="block block-inclusion-criteria-head no-pad">
                                                                <div className="row">
                                                            <label className ="control-label col-md-2 col-sm-12">Please select</label>
                                                            <span className={classnames('col-md-8 col-sm-12',{'visible error info pl-0':this.state.errors.tearDuctSurgery})}><span>{this.state.errors.tearDuctSurgery}</span></span>

                                                                </div>
                                                                <div className="row">
                                                                <div className="col-md-offset-2">
                                                                
                                                                <FunkyRadioTwoOptionsDamageIndices caption={"plugged"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optTearDuctSurgeryPluggedYes"}
                                                                    optionTwoId={"optTearDuctSurgeryPluggedNo"}
                                                                    optionOneHtmlFor={"optTearDuctSurgeryPluggedYes"}
                                                                    optionTwoHtmlFor={"optTearDuctSurgeryPluggedNo"}

                                                                    optionOneChecked={this.state.tearDuctSurgeryPlugged == getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.tearDuctSurgeryPlugged_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.tearDuctSurgeryPlugged == getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.tearDuctSurgeryPlugged_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Plugged.controlId,this.state.visitControls)[1].controlValue} /> 


                                                                    <FunkyRadioTwoOptionsDamageIndices caption={"cauterised"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optTearDuctSurgeryCauterisedYes"}
                                                                    optionTwoId={"optTearDuctSurgeryCauterisedNo"}
                                                                    optionOneHtmlFor={"optTearDuctSurgeryCauterisedYes"}
                                                                    optionTwoHtmlFor={"optTearDuctSurgeryCauterisedNo"}

                                                                    optionOneChecked={this.state.tearDuctSurgeryCauterised == getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.tearDuctSurgeryCauterised_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.tearDuctSurgeryCauterised == getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.tearDuctSurgeryCauterised_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Cauterised.controlId,this.state.visitControls)[1].controlValue} /> 


                                                                    <FunkyRadioTwoOptionsDamageIndices caption={"both"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optTearDuctSurgeryBothYes"}
                                                                    optionTwoId={"optTearDuctSurgeryBothNo"}
                                                                    optionOneHtmlFor={"optTearDuctSurgeryBothYes"}
                                                                    optionTwoHtmlFor={"optTearDuctSurgeryBothNo"}

                                                                    optionOneChecked={this.state.tearDuctSurgeryBoth == getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.tearDuctSurgeryBoth_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.tearDuctSurgeryBoth == getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.tearDuctSurgeryBoth_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_Both.controlId,this.state.visitControls)[1].controlValue} /> 


                                                                    <FunkyRadioTwoOptionsDamageIndices caption={"all 4 tubes blocked"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optTearDuctSurgeryAll4TubesYes"}
                                                                    optionTwoId={"optTearDuctSurgeryAll4TubesNo"}
                                                                    optionOneHtmlFor={"optTearDuctSurgeryAll4TubesYes"}
                                                                    optionTwoHtmlFor={"optTearDuctSurgeryAll4TubesNo"}

                                                                    optionOneChecked={this.state.tearDuctSurgeryAll4TubesBlocked == getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.tearDuctSurgeryAll4TubesBlocked_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.tearDuctSurgeryAll4TubesBlocked == getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.tearDuctSurgeryAll4TubesBlocked_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_All4TubesBlocked.controlId,this.state.visitControls)[1].controlValue} /> 


                                                                    
                                                                    <FunkyRadioTwoOptionsDamageIndices caption={"lower tube in one or both eyes"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optTearDuctSurgeryLowerTubeInOneOrBothEyesYes"}
                                                                    optionTwoId={"optTearDuctSurgeryLowerTubeInOneOrBothEyesNo"}
                                                                    optionOneHtmlFor={"optTearDuctSurgeryLowerTubeInOneOrBothEyesYes"}
                                                                    optionTwoHtmlFor={"optTearDuctSurgeryLowerTubeInOneOrBothEyesNo"}

                                                                    optionOneChecked={this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.tearDuctSurgeryLowerTubeInOneorBothEyes_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.tearDuctSurgeryLowerTubeInOneorBothEyes == getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.tearDuctSurgeryLowerTubeInOneorBothEyes_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtTearDuctSurgery_LowerTubeInOneOrBothEyes.controlId,this.state.visitControls)[1].controlValue} /> 

                                                                </div>
                                                                </div>
                                                            </div>
                                                        </FadeIn>
                                                    }



                                                    <FunkyRadioTwoOptionsDamageIndices caption={"<div class=\"col-md-2 pl-0\">4. Schirmers: </div><div class=\"col-md-offset-3\">(a) <5 mm in 5 mins</div>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optSchirmersAYes"}
                                                    optionTwoId={"optSchirmersANo"}
                                                    optionOneHtmlFor={"optSchirmersAYes"}
                                                    optionTwoHtmlFor={"optSchirmersANo"}

                                                    optionOneChecked={this.state.schirmersA == getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.schirmersA_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.schirmersA == getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.schirmersA_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtListSchirmersA.controlId,this.state.visitControls)[1].controlValue} /> 

                                                    <FunkyRadioTwoOptionsDamageIndices caption={"<div class=\"col-md-2 pl-0\"> </div><div class=\"col-md-offset-3\">(b) 0 mm in 5 mins</div>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optSchirmersBYes"}
                                                    optionTwoId={"optSchirmersBNo"}
                                                    optionOneHtmlFor={"optSchirmersBYes"}
                                                    optionTwoHtmlFor={"optSchirmersBNo"}

                                                    optionOneChecked={this.state.schirmersB == getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.schirmersB_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.schirmersB == getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.schirmersB_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtListSchirmersB.controlId,this.state.visitControls)[1].controlValue} /> 


                                                    <FunkyRadioTwoOptionsDamageIndices caption={"5. Other eye conditions (e.g. cataract, glaucoma, diabetes, macular degeneration etc.)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optOtherEyeyConditionsYes"}
                                                    optionTwoId={"optOtherEyeyConditionsNo"}
                                                    optionOneHtmlFor={"optOtherEyeyConditionsYes"}
                                                    optionTwoHtmlFor={"optOtherEyeyConditionsNo"}

                                                    optionOneChecked={this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.otherEyeConditions_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.otherEyeConditions_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[1].controlValue} /> 



                                                    {
                                                (  this.state.otherEyeConditions == getControlValues(DamageIndices.rbtOtherEyeConditions.controlId,this.state.visitControls)[0].controlValueId )  &&
                                              <FadeIn>
                                                <div className="form-group row">
                                                <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                    <label className ="control-label col-md-3 col-sm-12">Please specify</label>
                                                    <div className={classnames('col-md-9 col-sm-12',{error:!!this.state.errors.otherEyeConditions_PleaseSpecify})}>
                                                            <textarea rows="6" cols="60" maxLength="200" 
                                                            value={this.state.otherEyeConditions_PleaseSpecify}
                                                            onChange={this.otherEyeConditionsPleaseSpecify_onChange}></textarea>
                                                            <span className={classnames('',{'visible error info':!!this.state.errors.otherEyeConditions_PleaseSpecify,hidden:!!!this.state.errors.otherEyeConditions_PleaseSpecify})}>{this.state.errors.otherEyeConditions_PleaseSpecify}</span>                      
                                                    </div>
                                                </div>
                                            </div>

                                       
                       




</FadeIn>

}




                                                    <div className="form-group row">
                                                        <div className="col-lg-8 col-md-4 col-sm-12" dangerouslySetInnerHTML={{ __html: "6. Tear film break-up time (if known)" }}></div>
                                                        <div className="col-lg-2 col-md-8 col-sm-12">
                                                            <InputGroupAddOnR  rightAddOn={"sec"}>
                                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                                    id="ocularTearFilmBreakUpTime"
                                                                                    name="ocularTearFilmBreakUpTime" 
                                                                                    ref="ocularTearFilmBreakUpTime" 
                                                                                    placeholder="000"
                                                                                    value={this.state.tearFilmBreakUpTime != undefined ? this.state.tearFilmBreakUpTime : ''}
                                                                                    onChange={this.ocularTearFilmBreakUpTime_onChange}
                                                                                    onKeyPress={this.ocularTearFilmBreakUpTime_onKeyPress}
                                                                                    onBlur={this.ocularTearFilmBreakUpTime_onBlur}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                                    type="number"
                                                                                    maxLength="3"
                                                                                    onInput={maxLengthCheck} 
                                                                                    step="1" 
                                                                                    min={DamageIndicesFieldLength.ocularTearFilmBreakUpTimeMin} 
                                                                                    max={DamageIndicesFieldLength.ocularTearFilmBreakUpTimeMax}  />
                                                                                    </InputGroupAddOnR>
                                                        </div>
                                                    </div>


                                                    <FunkyRadioTwoOptionsDamageIndices caption={"7. Positive ocular staining (>=4 according to van Bijsteveld ot >= 5 Ocular Staining Score)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optPositiveOcularStatiningYes"}
                                                    optionTwoId={"optPositiveOcularStatiningNo"}
                                                    optionOneHtmlFor={"optPositiveOcularStatiningYes"}
                                                    optionTwoHtmlFor={"optPositiveOcularStatiningNo"}

                                                    optionOneChecked={this.state.lissamineGreenDyeScore == getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.lissamineGreenDyeScore_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.lissamineGreenDyeScore == getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.lissamineGreenDyeScore_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtListLissamineGreenDyeScore.controlId,this.state.visitControls)[1].controlValue} /> 



                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>

            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.oralOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.oral_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.oral_Toggle()}></i>:
                                null
                        } 
                                    Oral{
                                        this.getOralCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.oralOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    

                                                <FunkyRadioTwoOptionsDamageIndices caption={"8. Dental Caries"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optDentalCariesYes"}
                                                    optionTwoId={"optDentalCariesNo"}
                                                    optionOneHtmlFor={"optDentalCariesYes"}
                                                    optionTwoHtmlFor={"optDentalCariesNo"}

                                                    optionOneChecked={this.state.dentalCaries == getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.dentalCaries_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.dentalCaries == getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.dentalCaries_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtDentalCaries.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"9. Loss of teeth"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optLossOfTeethYes"}
                                                    optionTwoId={"optLossOfTeethNo"}
                                                    optionOneHtmlFor={"optLossOfTeethYes"}
                                                    optionTwoHtmlFor={"optLossOfTeethNo"}

                                                    optionOneChecked={this.state.lossOfTeeth == getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.lossOfTeeth_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.lossOfTeeth == getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.lossOfTeeth_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtLossOfTeeth.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 




                                                        <FunkyRadioTwoOptionsDamageIndices caption={"<div class=\"col-md-4 pl-0\">10. Unrestricted Salivary Flow : </div><div class=\"col-md-offset-3\">(a) 1.5 ml/15mins</div>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optUnrestrictedSalivaryFlowAYes"}
                                                    optionTwoId={"optUnrestrictedSalivaryFlowANo"}
                                                    optionOneHtmlFor={"optUnrestrictedSalivaryFlowAYes"}
                                                    optionTwoHtmlFor={"optUnrestrictedSalivaryFlowANo"}

                                                    optionOneChecked={this.state.unrestrictedSalivaryFlowA == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.unrestrictedSalivaryFlowA_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.unrestrictedSalivaryFlowA == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.unrestrictedSalivaryFlowA_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowA.controlId,this.state.visitControls)[1].controlValue} /> 

                                                    <FunkyRadioTwoOptionsDamageIndices caption={"<div class=\"col-md-4 pl-0\"> </div><div class=\"col-md-offset-3\">(b) 0 ml/15mins</div>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optUnrestrictedSalivaryFlowBYes"}
                                                    optionTwoId={"optUnrestrictedSalivaryFlowBNo"}
                                                    optionOneHtmlFor={"optUnrestrictedSalivaryFlowBYes"}
                                                    optionTwoHtmlFor={"optUnrestrictedSalivaryFlowBNo"}

                                                    optionOneChecked={this.state.unrestrictedSalivaryFlowB == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.unrestrictedSalivaryFlowB_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.unrestrictedSalivaryFlowB == getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.unrestrictedSalivaryFlowB_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtListUnrestrictedSalivaryFlowB.controlId,this.state.visitControls)[1].controlValue} /> 






                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>
            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.musculoskeletalOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.musculoskeletal_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.musculoskeletal_Toggle()}></i>:
                                null
                        } 
                                    Musculoskeletal {
                                        this.getMusculoskeletalCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.musculoskeletalOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    
                                                <FunkyRadioTwoOptionsDamageIndices caption={"11. Deforming or erosive arthritis"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optDeformingOrErosiveArthritisYes"}
                                                    optionTwoId={"optDeformingOrErosiveArthritisNo"}
                                                    optionOneHtmlFor={"optDeformingOrErosiveArthritisYes"}
                                                    optionTwoHtmlFor={"optDeformingOrErosiveArthritisNo"}

                                                    optionOneChecked={this.state.deformingOrErosiveArthritis == getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.deformingOrErosiveArthritis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.deformingOrErosiveArthritis == getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.deformingOrErosiveArthritis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtDeformingOrErosiveArthritis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>

            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.neuropsychiatricOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.neuropsychiatric_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.neuropsychiatric_Toggle()}></i>:
                                null
                        } 
                                     Neuropsychiatric{
                                        this.getNeuropsychiatricCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.neuropsychiatricOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                   
                                                <FunkyRadioTwoOptionsDamageIndices caption={"12. Cranial neuropathy"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optCranialNeuropathyYes"}
                                                    optionTwoId={"optCranialNeuropathyNo"}
                                                    optionOneHtmlFor={"optCranialNeuropathyYes"}
                                                    optionTwoHtmlFor={"optCranialNeuropathyNo"}

                                                    optionOneChecked={this.state.cranialNeuropathy == getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.cranialNeuropathy_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.cranialNeuropathy == getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.cranialNeuropathy_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtCranialNeuropathy.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"13. Peripheral neuropathy"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optPeripheralNeuropathyYes"}
                                                    optionTwoId={"optPeripheralNeuropathyNo"}
                                                    optionOneHtmlFor={"optPeripheralNeuropathyYes"}
                                                    optionTwoHtmlFor={"optPeripheralNeuropathyNo"}

                                                    optionOneChecked={this.state.peripheralNeuropathy == getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.peripheralNeuropathy_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.peripheralNeuropathy == getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.peripheralNeuropathy_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtPeripheralNeuropathy.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"14. Mononeuritis multiplex"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optMononeuritisMultiplexYes"}
                                                    optionTwoId={"optMononeuritisMultiplexNo"}
                                                    optionOneHtmlFor={"optMononeuritisMultiplexYes"}
                                                    optionTwoHtmlFor={"optMononeuritisMultiplexNo"}

                                                    optionOneChecked={this.state.mononeuritisMultiplex == getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.mononeuritisMultiplex_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.mononeuritisMultiplex == getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.mononeuritisMultiplex_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtMononeuritisMultiplex.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"15. Other central nervous system involvement"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optOtherCentralNervousSystemInvolvementYes"}
                                                    optionTwoId={"optOtherCentralNervousSystemInvolvementNo"}
                                                    optionOneHtmlFor={"optOtherCentralNervousSystemInvolvementYes"}
                                                    optionTwoHtmlFor={"optOtherCentralNervousSystemInvolvementNo"}

                                                    optionOneChecked={this.state.otherCentralNervousSystemInvolvement == getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.otherCentralNervousSystemInvolvement_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.otherCentralNervousSystemInvolvement == getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.otherCentralNervousSystemInvolvement_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtOtherCentralNervousSystemInvolvement.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>

            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.cardiopulmonaryOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.cardiopulmonary_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.cardiopulmonary_Toggle()}></i>:
                                null
                        } 
                                    Cardio-Pulmonary{
                                        this.getCardioPulmonaryCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.cardiopulmonaryOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    
                                                <FunkyRadioTwoOptionsDamageIndices caption={"16. Pleural fibrosis (radiograph)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optPleuralFibrosisYes"}
                                                    optionTwoId={"optPleuralFibrosisNo"}
                                                    optionOneHtmlFor={"optPleuralFibrosisYes"}
                                                    optionTwoHtmlFor={"optPleuralFibrosisNo"}

                                                    optionOneChecked={this.state.pleuralFibrosis == getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.plueralFibrosis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.pleuralFibrosis == getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.plueralFibrosis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtPleuralFibrosis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                <FunkyRadioTwoOptionsDamageIndices caption={"17. Pulmonary hypertension"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optPulmonaryHypertensionYes"}
                                                    optionTwoId={"optPulmonaryHypertensionNo"}
                                                    optionOneHtmlFor={"optPulmonaryHypertensionYes"}
                                                    optionTwoHtmlFor={"optPulmonaryHypertensionNo"}

                                                    optionOneChecked={this.state.pulmonaryHypertension == getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.pulmonaryHypertension_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.pulmonaryHypertension == getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.pulmonaryHypertension_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtPulmonaryHypertension.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"18. Pulmonary fibrosis (radiograph)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optPulmonaryFibrosisYes"}
                                                    optionTwoId={"optPulmonaryFibrosisNo"}
                                                    optionOneHtmlFor={"optPulmonaryFibrosisYes"}
                                                    optionTwoHtmlFor={"optPulmonaryFibrosisNo"}

                                                    optionOneChecked={this.state.pulmonaryFibrosis == getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.pulmonaryFibrosis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.pulmonaryFibrosis == getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.pulmonaryFibrosis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtPulmonaryFibrosis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                        <FunkyRadioTwoOptionsDamageIndices caption={"19. Significant irreversible functional damage confirmed by spirometry <strong>(SSDDI)</strong>"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optSignificantIrreversibleYes"}
                                                    optionTwoId={"optSignificantIrreversibleNo"}
                                                    optionOneHtmlFor={"optSignificantIrreversibleYes"}
                                                    optionTwoHtmlFor={"optSignificantIrreversibleNo"}

                                                    optionOneChecked={this.state.significantIrreversible == getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.significantIrreversible_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.significantIrreversible == getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.significantIrreversible_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtSignificantIrreversible.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 



                                                        <FunkyRadioTwoOptionsDamageIndices caption={"20. Cardiomyopathy (ventricular dysfunction)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optCardiomyopathyYes"}
                                                    optionTwoId={"optCardiomyopathyNo"}
                                                    optionOneHtmlFor={"optCardiomyopathyYes"}
                                                    optionTwoHtmlFor={"optCardiomyopathyNo"}

                                                    optionOneChecked={this.state.cardiomyopathy == getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.cardiomyopathy_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.cardiomyopathy == getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.cardiomyopathy_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtCardiomyopathy.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>


            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.giHepatobiliaryOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.giHepatobiliary_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.giHepatobiliary_Toggle()}></i>:
                                null
                        } 
                                    GI/Hepatobiliary {
                                        this.getGiHepatobiliaryCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.giHepatobiliaryOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    
                                                <FunkyRadioTwoOptionsDamageIndices caption={"21. Chronic pancreatitis"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optChronicPancreatitisYes"}
                                                    optionTwoId={"optChronicPancreatitisNo"}
                                                    optionOneHtmlFor={"optChronicPancreatitisYes"}
                                                    optionTwoHtmlFor={"optChronicPancreatitisNo"}

                                                    optionOneChecked={this.state.chronicPancreatitis == getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.chronicPancreatitis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.chronicPancreatitis == getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.chronicPancreatitis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtChronicPancreatitis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>


            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.renalOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.renal_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.renal_Toggle()}></i>:
                                null
                        } 
                                    Renal{
                                        this.getRenalCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.renalOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                   
                                                <FunkyRadioTwoOptionsDamageIndices caption={"22. GFR<50%"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optGFR50Yes"}
                                                    optionTwoId={"optGFR50No"}
                                                    optionOneHtmlFor={"optGFR50Yes"}
                                                    optionTwoHtmlFor={"optGFR50No"}

                                                    optionOneChecked={this.state.gfr50 == getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.gfr50_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.gfr50 == getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.gfr50_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtGFR50.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                        <FunkyRadioTwoOptionsDamageIndices caption={"23. Proteinuria > 3.5g/24hours or equivalent"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optProteinuriaOrEquivalentYes"}
                                                    optionTwoId={"optProteinuriaOrEquivalentNo"}
                                                    optionOneHtmlFor={"optProteinuriaOrEquivalentYes"}
                                                    optionTwoHtmlFor={"optProteinuriaOrEquivalentNo"}

                                                    optionOneChecked={this.state.proteinuriaOrEquivalent == getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.proteinuriaOrEquivalent_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.proteinuriaOrEquivalent == getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.proteinuriaOrEquivalent_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtProteinuriaOrEquivalent.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                        <FunkyRadioTwoOptionsDamageIndices caption={"24. Renal tubular acidosis"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optRenalTubularAcidosisYes"}
                                                    optionTwoId={"optRenalTubularAcidosisNo"}
                                                    optionOneHtmlFor={"optRenalTubularAcidosisYes"}
                                                    optionTwoHtmlFor={"optRenalTubularAcidosisNo"}

                                                    optionOneChecked={this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.renalTubularAcidosis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.renalTubularAcidosis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <span className={classnames('col-md-offset-6 col-md-6 col-sm-12',{'visible error info':this.state.errors.renalTubularAcidosis})}><span>{this.state.errors.renalTubularAcidosis}</span></span>


                                                        { this.state.renalTubularAcidosis == getControlValues(DamageIndices.rbtRenalTubularAcidosis.controlId,this.state.visitControls)[0].controlValueId &&
                                                        <FadeIn>
                                                            <div className="block block-inclusion-criteria-head no-pad">
                                                                <div className="col-md-offset-2">
                                                       
                                                                <FunkyRadioTwoOptionsDamageIndices caption={"24a. Requiring treatment?"}
                                                                    captionClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                                    optionOneId={"optRequiringTreatmentYes"}
                                                                    optionTwoId={"optRequiringTreatmentNo"}
                                                                    optionOneHtmlFor={"optRequiringTreatmentYes"}
                                                                    optionTwoHtmlFor={"optRequiringTreatmentNo"}

                                                                    optionOneChecked={this.state.requiringTreatment == getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[0].controlValueId}
                                                                    optionOneOnClick={this.requiringTreatment_onChange}
                                                                    optionOneCaption={getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[0].controlValue}
                                                                    
                                                                    optionTwoChecked={this.state.requiringTreatment == getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[1].controlValueId}
                                                                    optionTwoOnClick={this.requiringTreatment_onChange}
                                                                    optionTwoCaption={getControlValues(DamageIndices.rbtRequiringTreatment.controlId,this.state.visitControls)[1].controlValue} /> 

                                                                </div>
                                                            </div>
                                                        </FadeIn>
                                                    }

                                                    <FunkyRadioTwoOptionsDamageIndices caption={"25. Nephrocalcinosis"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optNephrocalcinosisYes"}
                                                    optionTwoId={"optNephrocalcinosisNo"}
                                                    optionOneHtmlFor={"optNephrocalcinosisYes"}
                                                    optionTwoHtmlFor={"optNephrocalcinosisNo"}

                                                    optionOneChecked={this.state.nephrocalcinosis == getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.nephrocalcinosis_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.nephrocalcinosis == getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.nephrocalcinosis_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtNephrocalcinosis.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 

                                                        <FunkyRadioTwoOptionsDamageIndices caption={"26. End stage renal disease (regardless of dialysis or transplant)"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optEndStageRenalDiseaseYes"}
                                                    optionTwoId={"optEndStageRenalDiseaseNo"}
                                                    optionOneHtmlFor={"optEndStageRenalDiseaseYes"}
                                                    optionTwoHtmlFor={"optEndStageRenalDiseaseNo"}

                                                    optionOneChecked={this.state.endStageRenalDisease == getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.endStageRenalDisease_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.endStageRenalDisease == getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.endStageRenalDisease_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtEndStageRenalDisease.controlId,this.state.visitControls)[1].controlValue}
                                                        /> 


                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
                </div>
            </div>

            <div className="row">
                 <div className="col-md-12">
                     <div className="page-header">
                        { 
                            !this.state.isComplete ? !this.state.malignancyOpen ?       
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.malignancy_Toggle()}></i>:
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.malignancy_Toggle()}></i>:
                                null
                        } 
                                    Malignancy {
                                        this.getMalignancyCount() ? <i className="pl-10 fa fa-check text-primary" aria-hidden="true"></i>:null
                                    }</div>
                                    { this.state.malignancyOpen &&
                                        <FadeIn>
                                            <div className="block block-inclusion-criteria-head no-pad">
                                                <div className="block-content-no-border">
                                                    
                                                <FunkyRadioTwoOptionsDamageIndices caption={"27. Lymphoma"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optLymphomaYes"}
                                                    optionTwoId={"optLymphomaNo"}
                                                    optionOneHtmlFor={"optLymphomaYes"}
                                                    optionTwoHtmlFor={"optLymphomaNo"}

                                                    optionOneChecked={this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.lymphoma_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.lymphoma_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[1].controlValue} /> 



                                                    {
                                                (  this.state.lymphoma == getControlValues(DamageIndices.rbtLymphoma.controlId,this.state.visitControls)[0].controlValueId )  &&
                                              <FadeIn>
                                                <div className="form-group row">
                                                <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                    <label className ="control-label col-md-3 col-sm-12">Please specify</label>
                                                    <div className={classnames('col-md-9 col-sm-12',{error:!!this.state.errors.lymphoma_PleaseSpecify})}>
                                                            <textarea rows="6" cols="60" maxLength="200" 
                                                            value={this.state.lymphoma_PleaseSpecify}
                                                            onChange={this.lymphomaPleaseSpecify_onChange}></textarea>
                                                            <span className={classnames('',{'visible error info':!!this.state.errors.lymphoma_PleaseSpecify,hidden:!!!this.state.errors.lymphoma_PleaseSpecify})}>{this.state.errors.lymphoma_PleaseSpecify}</span>                      
                                                    </div>
                                                </div>
                                            </div>
                                                </FadeIn>
                                                 }


                                                 <FunkyRadioTwoOptionsDamageIndices caption={"28. Other malignancy"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optOtherMalignancyYes"}
                                                    optionTwoId={"optOtherMalignancyNo"}
                                                    optionOneHtmlFor={"optOtherMalignancyYes"}
                                                    optionTwoHtmlFor={"optOtherMalignancyNo"}

                                                    optionOneChecked={this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.otherMalignancy_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.otherMalignancy_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[1].controlValue} /> 



                                                    {
                                                (  this.state.otherMalignancy == getControlValues(DamageIndices.rbtOtherMalignancy.controlId,this.state.visitControls)[0].controlValueId )  &&
                                              <FadeIn>
                                                <div className="form-group row">
                                                <div className="col-md-offset-6 col-md-6 col-sm-12">
                                                    <label className ="control-label col-md-3 col-sm-12">Please specify</label>
                                                    <div className={classnames('col-md-9 col-sm-12',{error:!!this.state.errors.otherMalignancy_PleaseSpecify})}>
                                                            <textarea rows="6" cols="60" maxLength="200" 
                                                            value={this.state.otherMalignancy_PleaseSpecify}
                                                            onChange={this.otherMalignancyPleaseSpecify_onChange}></textarea>
                                                            <span className={classnames('',{'visible error info':!!this.state.errors.otherMalignancy_PleaseSpecify,hidden:!!!this.state.errors.otherMalignancy_PleaseSpecify})}>{this.state.errors.otherMalignancy_PleaseSpecify}</span>                      
                                                    </div>
                                                </div>
                                            </div>
                                                </FadeIn>
                                                 }




                                                 <FunkyRadioTwoOptionsDamageIndices caption={"29. Macroglobulinaemia"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optMacroglobulinaemiaYes"}
                                                    optionTwoId={"optMacroglobulinaemiaNo"}
                                                    optionOneHtmlFor={"optMacroglobulinaemiaYes"}
                                                    optionTwoHtmlFor={"optMacroglobulinaemiaNo"}

                                                    optionOneChecked={this.state.macroglobulinaemia == getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.macroglobulinaemia_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.macroglobulinaemia == getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.macroglobulinaemia_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtMacroglobulinaemia.controlId,this.state.visitControls)[1].controlValue} /> 



                                                    <FunkyRadioTwoOptionsDamageIndices caption={"30. Myeloma"}
                                                    captionClass={"col-lg-8 col-md-4 col-sm-12"}
                                                    optionsClass={"col-lg-4 col-md-8 col-sm-12"}
                                                    optionOneId={"optMyelomaYes"}
                                                    optionTwoId={"optMyelomaNo"}
                                                    optionOneHtmlFor={"optMyelomaYes"}
                                                    optionTwoHtmlFor={"optMyelomaNo"}

                                                    optionOneChecked={this.state.myeloma == getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.myeloma_onChange}
                                                    optionOneCaption={getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.myeloma == getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.myeloma_onChange}
                                                    optionTwoCaption={getControlValues(DamageIndices.rbtMyeloma.controlId,this.state.visitControls)[1].controlValue} /> 




                                                </div>
                                            </div>
                                        </FadeIn>
                                    }
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

 export default DamageIndicesForm;

