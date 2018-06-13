import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
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
import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import SalivaryFlowModal from '../../components/visit/modals/salivary-flow-modal'
import {ocularSignsObjectiveValidation, meetsAECGCCriteria, meets2016ACRECCriteria, maxLengthCheck,addZeroes} from '../../components/visit/modules/functions';
//import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';

import {isAlpha, isAlphanumericSpace, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,threeDigitsOnly1DecimalPlaces,time24Hour,isNumericPeriod} from '../../Factory/reg-ex';

//import {isAlpha, isAlphanumericSpace, isAlphanumeric, twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';


//import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import {AECGC} from '../../constants/styles/input';
import {AECGCValidationMessages} from '../../constants/information/messages';
import {AECGCFields} from '../../constants/information/field-length';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import {SalivaryFlow} from '../../config/controls/salivary-flow';



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

import {SalivaryFlowFieldLength} from '../../constants/information/field-length';

import {getVisitOptionControlValue, getDetailsControlValue,getDetailsControlValue_V2,getCategoryControls,getControlValues,getVisitOptionControlValue_V2} from '../../Factory/visit';
import TimeInput from 'react-time-input';

class SalivaryFlowForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
              
            visitControls: this.props.visitControlValuesResult && 
                            this.props.visitControlValuesResult.data && 
                            this.props.visitControlValuesResult.data.visitControlValues && 
                            this.props.visitControlValuesResult.data.visitControlValues.length > 0 ?
                            getCategoryControls(categories.salivaryFlow.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          

             

            //  ocularSignsObjectiveA: this.props.visitResult && 
            //                         this.props.visitResult.data && 
            //                         this.props.visitResult.data.visits && 
            //                         this.props.visitResult.data.visits.length > 0 ? 
            //                         getVisitOptionControlValue_V2(categories.americanEuropeanCGC.id, 
            //                                                             ocularSignsObjective.optOcularSignsObjectiveA,this.props.visitResult.data.visits):'',



            unstimulatedSalivaryFlowVolume: this.props.visitResult && 
                                           this.props.visitResult.data && 
                                                        this.props.visitResult.data.details && 
                                                        this.props.visitResult.data.details.length > 0 ?
                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,this.props.visitResult.data.details) ? 
                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,this.props.visitResult.data.details):'':'',

            unstimulatedSalivaryFlowTime: this.props.visitResult && 
                                            this.props.visitResult.data && 
                                            this.props.visitResult.data.details && 
                                            this.props.visitResult.data.details.length > 0 ?
                                                     getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,this.props.visitResult.data.details) ? 
                                                     getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,this.props.visitResult.data.details):undefined:undefined,
     
            stimulatedSalivaryFlowVolume: this.props.visitResult && 
                                                     this.props.visitResult.data && 
                                                     this.props.visitResult.data.details && 
                                                     this.props.visitResult.data.details.length > 0 ?
                                                          getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,this.props.visitResult.data.details) ? 
                                                          getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,this.props.visitResult.data.details):'':'',
          
            stimulatedSalivaryFlowTime: this.props.visitResult && 
                                                      this.props.visitResult.data && 
                                                      this.props.visitResult.data.details && 
                                                      this.props.visitResult.data.details.length > 0 ?
                                                               getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,this.props.visitResult.data.details) ? 
                                                               getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,this.props.visitResult.data.details):undefined:undefined,
          

            ocularSignsModalOpen:false,
            ocularSignsObjectiveALRConfirmed:false,
            ocularSignsObjectiveALChanged:false,
            ocularSignsObjectiveARChanged:false,


            ocularSignsObjectiveAR: this.props.visitResult && 
                                            this.props.visitResult.data && 
                                            this.props.visitResult.data.details && 
                                            this.props.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,this.props.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,this.props.visitResult.data.details):'':'',

            ocularSignsObjectiveAL: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,this.props.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,this.props.visitResult.data.details):'':'',    

            ocularSignsObjectiveARNA: this.props.visitResult && 
                                            this.props.visitResult.data && 
                                            this.props.visitResult.data.details && 
                                            this.props.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,this.props.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,this.props.visitResult.data.details):false:false,

            ocularSignsObjectiveALNA: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,this.props.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,this.props.visitResult.data.details):false:false,    



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

          this.lastVal = '';
          this.isValid = this.isValid.bind(this);
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

            this.unstimulatedSalivaryFlowVolume_onChange = this.unstimulatedSalivaryFlowVolume_onChange.bind(this)
            this.unstimulatedSalivaryFlowVolume_onBlur = this.unstimulatedSalivaryFlowVolume_onBlur.bind(this)
            this.unstimulatedSalivaryFlowVolume_onKeyPress = this.unstimulatedSalivaryFlowVolume_onKeyPress.bind(this)
            this.unstimulatedSalivaryFlowTime_onChange = this.unstimulatedSalivaryFlowTime_onChange.bind(this)
         //   this.unstimulatedSalivaryFlowTime_onBlur = this.unstimulatedSalivaryFlowTime_onBlur.bind(this)
         //   this.unstimulatedSalivaryFlowTime_onKeyPress = this.unstimulatedSalivaryFlowTime_onKeyPress.bind(this)

            this.stimulatedSalivaryFlowVolume_onChange = this.stimulatedSalivaryFlowVolume_onChange.bind(this)
            //this.stimulatedSalivaryFlowVolume_onBlur = this.stimulatedSalivaryFlowVolume_onBlur.bind(this)
            this.stimulatedSalivaryFlowVolume_onKeyPress = this.stimulatedSalivaryFlowVolume_onKeyPress.bind(this)
            this.stimulatedSalivaryFlowTime_onChange = this.stimulatedSalivaryFlowTime_onChange.bind(this)
         //   this.stimulatedSalivaryFlowTime_onBlur = this.stimulatedSalivaryFlowTime_onBlur.bind(this)


            this.ocularSignsObjectiveAR_onChange = this.ocularSignsObjectiveAR_onChange.bind(this);
            this.ocularSignsObjectiveARNA_onChange = this.ocularSignsObjectiveARNA_onChange.bind(this);
            this.ocularSignsObjectiveAL_onChange = this.ocularSignsObjectiveAL_onChange.bind(this);
            this.ocularSignsObjectiveALNA_onChange = this.ocularSignsObjectiveALNA_onChange.bind(this);

            this.ocularSignsObjectiveALR_onBlur = this.ocularSignsObjectiveALR_onBlur.bind(this);
            this.ocularSignsObjectiveAR_onKeyPress = this.ocularSignsObjectiveAR_onKeyPress.bind(this);
            this.ocularSignsObjectiveAL_onKeyPress = this.ocularSignsObjectiveAL_onKeyPress.bind(this);

            this.ocularSignsModalClose = this.ocularSignsModalClose.bind(this);
            this.ocularSignsConfirmed = this.ocularSignsConfirmed.bind(this);

            this.maxLengthCheck_ml = this.maxLengthCheck_ml.bind(this);
            //this.validate24hour = this.validate24hour.bind(this);    
    }


/*sCHIRMERS START */


ocularSignsModalClose(){
    this.setState({
       ocularSignsModalOpen:false
    })
}

ocularSignsConfirmed(ocularSignsObjectiveR,ocularSignsObjectiveL, ocularSignsObjectiveARNA, ocularSignsObjectiveALNA){
    this.setState({
       //ocularSignsObjectiveA:ocularSignsObjectiveA,
       ocularSignsObjectiveAR:ocularSignsObjectiveR,
       ocularSignsObjectiveAL:ocularSignsObjectiveL,
       ocularSignsObjectiveARNA:ocularSignsObjectiveARNA,
       ocularSignsObjectiveALNA:ocularSignsObjectiveALNA,
       ocularSignsModalOpen:false
    }
    )
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
        

        // ocularSignsObjectiveA: this.state.ocularSignsObjectiveAL.length > 0 ? 
        //                         digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? 
        //                         ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
        //                         ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,

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
        // ocularSignsObjectiveA: this.state.ocularSignsObjectiveAR.length > 0 ? digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? 
        //                         ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
        //                         ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
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
             console.log('One of the above error has occurred');
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
                console.log('Entered value is ok');
                 delete errorsClone['ocularSignsObjectiveARRange'];
            }
        }
        else {
            delete errorsClone['ocularSignsObjectiveARInvalidNumber'];
            delete errorsClone['ocularSignsObjectiveARRange'];
        }
            
            // if (e.target.value.length > 0  && digitsOnly2DecimalPlaces(e.target.value)) {
              console.log('Entered value is ok');
            //  delete errorsClone['ocularSignsObjectiveAR2Decimal'];
            // }
            if (Object.keys(errorsClone).length === 0){
    
                this.setState({
                    errors:errorsClone,
                    ocularSignsObjectiveAR:e.target.value,
                    // ocularSignsObjectiveA: e.target.value.length > 0 ? 
                    //                         digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                    //                        ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                    //                            this.state.ocularSignsObjectiveAL.length > 0 ? 
                    //                                digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                    //                                ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                  
                  
                    // ocularSignsObjectiveARNA:false,
                    changed:true,
                    ocularSignsObjectiveALRConfirmed:false,
                   ocularSignsObjectiveARChanged:  true
                   })
    
                
            }
            else {
                //copy clone back to errors in state
                this.setState({
                  //  ocularSignsObjectiveA:null,
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
                 console.log('e.target.value: ' + e.target.value)
                // console.log(!twoDigitsOnly(e.target.value));
                // console.log(!twoDigitsOnly(e.target.value) ? 'not 2 digits' : '2 digits')
                // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
                //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
                    if ((e.target.value.length > 0  && 
                        (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax) || !digitsOnly(e.target.value)))) {
                    //no errors for this field existed before
                    console.log('no errors for this field existed before')
                    console.log('and user has eneterd invalid value')
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
                             //   ocularSignsObjectiveA:null,
                                ocularSignsObjectiveAR:e.target.value,
                              //  ocularSignsObjectiveARNA:false,
                                changed:true,
                                ocularSignsObjectiveALRConfirmed:false,
                                ocularSignsObjectiveARChanged:  true
                            })
                } 
                else {
                      console.log('no invalid values update state with no error');
                      this.setState({
                             ocularSignsObjectiveAR:e.target.value,
                            //  ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                            //                         ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                            //                             this.state.ocularSignsObjectiveAL.length > 0 ? 
                            //                                 digitsLessThan(this.state.ocularSignsObjectiveAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                            //                                 ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                             changed:true,
                             ocularSignsObjectiveALRConfirmed:false,
                            ocularSignsObjectiveARChanged:  true
                            })
                        }
                }
     }
    
     ocularSignsObjectiveAL_onChange(e){
    
        console.log('ocularSignsObjectiveAL_onChange');
        
        
    //         if (!!this.state.errors['ocularSignsObjectiveAL'] || !!this.state.errors['ocularSignsObjectiveALRange']  || !!this.state.errors['ocularSignsObjectiveAL2Decimal'] ){
                if (!!this.state.errors['ocularSignsObjectiveAL'] || !!this.state.errors['ocularSignsObjectiveALRange'] || !!this.state.errors['ocularSignsObjectiveALInvalidNumber']){
                    
                //One of the above error has occurred 
                 console.log('One of the above error has occurred');
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
                        console.log('Entered value is ok');
                        delete errorsClone['ocularSignsObjectiveALRange'];
                       }
                }
                else {
                    delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
                    delete errorsClone['ocularSignsObjectiveALRange'];
                }
    
                // if (e.target.value.length > 0  && digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin,AECGCFields.ocularSignsObjectiveEyeMax)) {
            ///  console.log('Entered value is ok');
                //  delete errorsClone['ocularSignsObjectiveALRange'];
                // }
    
                // if (e.target.value.length > 0  && digitsOnly(e.target.value)){
                //     delete errorsClone['ocularSignsObjectiveALInvalidNumber'];
                // }
    
           
                if (Object.keys(errorsClone).length === 0){
                    this.setState({
                        errors:errorsClone,
                        ocularSignsObjectiveAL:e.target.value,
                        // ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                        //                         ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                        //                            this.state.ocularSignsObjectiveAR.length > 0 ? 
                        //                                digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                        //                                ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
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
                       // ocularSignsObjectiveA:null,
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
                       console.log('no errors for this field existed before')
                     console.log('and user has eneterd invalid value')
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
                                  //  ocularSignsObjectiveA:null,
                                    changed:true,
                                    ocularSignsObjectiveALRConfirmed:false,
                                    ocularSignsObjectiveALChanged:  true
                                })
                    } 
                    else {
                          console.log('no invalid values update state with no error');
                          this.setState({
                                 ocularSignsObjectiveAL:e.target.value,
                                //  ocularSignsObjectiveA: e.target.value.length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                //                          ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                //                             this.state.ocularSignsObjectiveAR.length > 0 ? 
                                //                                 digitsLessThan(this.state.ocularSignsObjectiveAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                //                                 ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                                 changed:true,
                                 ocularSignsObjectiveALRConfirmed:false,
                                ocularSignsObjectiveALChanged:  true
                                })
                            }
                    }
    }
    
    
    ocularSignsObjectiveALR_onBlur(e){
    console.log('ocularSignsObjectiveALR_onBlur START');
    
        //Do we have values in both input fields
    //    if ((this.state.ocularSignsObjectiveAR != '' || this.state.ocularSignsObjectiveAR != '0') || 
    //         (this.state.ocularSignsObjectiveAL != '' || this.state.ocularSignsObjectiveAL != '0')) { 
    
    console.log(this.state.ocularSignsObjectiveAR)
    console.log(this.state.ocularSignsObjectiveAL)

    console.log('ocularSignsObjectiveALR_onBlur END');
    

                if (this.state.ocularSignsObjectiveAR.length > 0 && this.state.ocularSignsObjectiveAL.length > 0 ) { 
    //We dont have a problem with the range provided
    //if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveAR2Decimal']) && !(!!this.state.errors['ocularSignsObjectiveALRange']) && !(!!this.state.errors['ocularSignsObjectiveAL2Decimal']) ){
        
    if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveALRange']) && !(!!this.state.errors['ocularSignsObjectiveARInvalidNumber'])){
                //we haven't confirmed and L or R has changed
                    if (!this.state.ocularSignsObjectiveALRConfirmed && (this.state.ocularSignsObjectiveALChanged || this.state.ocularSignsObjectiveARChanged)) { 
                       console.log('onblur')
                        this.setState({    
                            ocularSignsModalOpen:ocularSignsObjectiveValidation(this.state.ocularSignsObjectiveAL, this.state.ocularSignsObjectiveAR),
                            ocularSignsObjectiveALRConfirmed:true 
                        })
                    }
                }
        }
     }
    

/*SCHIRMERS END */

maxLengthCheck_ml(object) {
    // console.log('maxLengthCheck_ml');
    if ((object.target.value.length > object.target.maxLength) ||  (!twoDigitsOnly2DecimalPlaces(object.target.value)))
        {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
}




    unstimulatedSalivaryFlowVolume_onChange(e){
        this.setState({
            unstimulatedSalivaryFlowVolume:e.target.value,
            changed:true,
        });                
    }

    unstimulatedSalivaryFlowVolume_onBlur(e){
        this.setState({
            unstimulatedSalivaryFlowVolume:e.target.value,
            changed:true,
            });    
    }

    unstimulatedSalivaryFlowVolume_onKeyPress(e){
        var charCode = e.keyCode || e.which; 
        var key = String.fromCharCode(charCode);

        if (!isNumericPeriod(key)){
            e.preventDefault();   
        }
    }
    

    // unstimulatedSalivaryFlowTime_onKeyPress(e){
    //     var charCode = e.keyCode || e.which; 
    //     var key = String.fromCharCode(charCode);

    //     if (!time24Hour(key)){
    //         e.preventDefault();   
    //     }
    // }


    isValid (val) {
        var letterArr = val.split(':').join('').split(''),
            regexp = /^\d{0,2}?\:?\d{0,2}$/,
            valArr = [];

        var [hoursStr, minutesStr] = val.split(':')

        if (!regexp.test(val)) {
            return false
        }

        const hours = Number(hoursStr)
        const minutes = Number(minutesStr)

        const isValidHour = (hour) => Number.isInteger(hours) && hours >= 0 && hours < 24
        const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes)
        if (!isValidHour(hours) || !isValidMinutes(minutes)) {
            return false
        }

        if (minutes< 10 && Number(minutesStr[0]) > 5) {
            return false
        }

        if (valArr.indexOf(':')) {
            valArr = val.split(':');
        } else {
            valArr.push(val);
        }

        // check mm and HH
        if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
            return false
        }

        if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
            return false
        }

        return true;
}


    unstimulatedSalivaryFlowTime_onChange(e){
        var  val = e.target.value;
        
        if (this.isValid(val)) {
            
                        if (val.length === 2 && this.lastVal.length !== 3 && val.indexOf(':') === -1) {
                            val = val + ':';
                        }
            
                        if (val.length === 2 && this.lastVal.length === 3) {
                            val = val.slice(0, 1);
                        }
            
                        if (val.length > 5) {
                            e.preventDefault
                            return;
                        }
            
          

                        this.lastVal = val;
            
                      
                        //if (val.length === 5) {
                            this.setState({
                                unstimulatedSalivaryFlowTime:val,
                                changed:true,
                            });
                       // }
            }

       
                      
    }

    // unstimulatedSalivaryFlowTime_onBlur(e){
    //     this.setState({
    //         unstimulatedSalivaryFlowTime:e.target.value,
    //         changed:true,
    //         });    
    // }




    stimulatedSalivaryFlowVolume_onChange(e){
        this.setState({
            stimulatedSalivaryFlowVolume:e.target.value,
            changed:true,
        });                
    }

    stimulatedSalivaryFlowVolume_onBlur(e){
        this.setState({
            stimulatedSalivaryFlowVolume:e.target.value,
            changed:true,
            });    
    }

    stimulatedSalivaryFlowVolume_onKeyPress(e){
        var charCode = e.keyCode || e.which; 
        var key = String.fromCharCode(charCode);

        if (!isNumericPeriod(key)){
            e.preventDefault();   
        }
    }
    
    stimulatedSalivaryFlowTime_onChange(e){


        var  val = e.target.value;
        
        if (this.isValid(val)) {
            
                        if (val.length === 2 && this.lastVal.length !== 3 && val.indexOf(':') === -1) {
                            val = val + ':';
                        }
            
                        if (val.length === 2 && this.lastVal.length === 3) {
                            val = val.slice(0, 1);
                        }
            
                        if (val.length > 5) {
                            e.preventDefault
                            return;
                        }
            
                        this.lastVal = val;
            
                        //if (val.length === 5) {
                            this.setState({
                                stimulatedSalivaryFlowTime:val,
                                changed:true,
                            });
                       // }
            }
  
    }

    // stimulatedSalivaryFlowTime_onBlur(e){
    //     this.setState({
    //         stimulatedSalivaryFlowTime:e.target.value,
    //         changed:true,
    //         });    
    // }





    validateVisit(){
        let errors = {};
                        
        // if ( this.state.unstimulatedSalivaryFlowTime.length > 0  && 
        //     !time24Hour(this.state.unstimulatedSalivaryFlowTime)) {
        //     errors.unstimulatedSalivaryFlowTime = 'Please provide valid 24 hour time';  
        // } 


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

    if (this.state.unstimulatedSalivaryFlowVolume){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.unstimulatedSalivaryFlowVolume,
                controlId:SalivaryFlow.txtUnstimulatedSalivaryFlowVolume.controlId, 
                categoryId:   categories.salivaryFlow.id   
            }
        )
    }
    
    if (this.state.unstimulatedSalivaryFlowTime){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.unstimulatedSalivaryFlowTime,
                controlId:SalivaryFlow.txtUnstimulatedSalivaryFlowTime.controlId, 
                categoryId:   categories.salivaryFlow.id   
            }
        )
    }

    if (this.state.stimulatedSalivaryFlowVolume){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.stimulatedSalivaryFlowVolume,
                controlId:SalivaryFlow.txtStimulatedSalivaryFlowVolume.controlId, 
                categoryId:   categories.salivaryFlow.id   
            }
        )
    }
    
    if (this.state.stimulatedSalivaryFlowTime){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.stimulatedSalivaryFlowTime,
                controlId:SalivaryFlow.txtStimulatedSalivaryFlowTime.controlId, 
                categoryId:   categories.salivaryFlow.id   
            }
        )
    }
    

    if (this.state.ocularSignsObjectiveAR && this.state.ocularSignsObjectiveAR.length > 0){
        console.log('this.state.ocularSignsObjectiveAR')
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.ocularSignsObjectiveAR,
                controlId:SalivaryFlow.txtSchirmersTestRightEye.controlId, 
                categoryId:   categories.salivaryFlow.id            
            },
        )
    }
    
    
    if (this.state.ocularSignsObjectiveAL && this.state.ocularSignsObjectiveAL.length > 0){
        console.log('this.state.ocularSignsObjectiveAL')
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.ocularSignsObjectiveAL,
                controlId:SalivaryFlow.txtSchirmersTestLeftEye.controlId, 
                categoryId:   categories.salivaryFlow.id            
            }
        )
    }
    
        if (this.state.ocularSignsObjectiveALNA ){    
            console.log('this.state.ocularSignsObjectiveALNA')
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.ocularSignsObjectiveALNA,
                controlId:SalivaryFlow.chkSchirmersTestLeftEye.controlId, 
                categoryId:   categories.salivaryFlow.id            
            }
        )
    }
    
    if (this.state.ocularSignsObjectiveARNA){
        console.log('this.state.ocularSignsObjectiveARNA')
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.ocularSignsObjectiveARNA,
                controlId:SalivaryFlow.chkSchirmersTestRightEye.controlId, 
                categoryId:   categories.salivaryFlow.id            
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

console.log('detail')
console.log(detail)
    this.props.handleSaveVisitHeader(visit, detail, categories.salivaryFlow.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.salivaryFlow.id);
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
        



        unstimulatedSalivaryFlowVolume: nextProps.visitResult && 
        nextProps.visitResult.data && 
                     nextProps.visitResult.data.details && 
                     nextProps.visitResult.data.details.length > 0 ?
             getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,nextProps.visitResult.data.details) ? 
             getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,nextProps.visitResult.data.details):'':'',

unstimulatedSalivaryFlowTime: nextProps.visitResult && 
         nextProps.visitResult.data && 
         nextProps.visitResult.data.details && 
         nextProps.visitResult.data.details.length > 0 ?
                  getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,nextProps.visitResult.data.details) ? 
                  getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,nextProps.visitResult.data.details):undefined:undefined,

stimulatedSalivaryFlowVolume: nextProps.visitResult && 
                  nextProps.visitResult.data && 
                  nextProps.visitResult.data.details && 
                  nextProps.visitResult.data.details.length > 0 ?
                       getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,nextProps.visitResult.data.details) ? 
                       getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,nextProps.visitResult.data.details):'':'',

stimulatedSalivaryFlowTime: nextProps.visitResult && 
                   nextProps.visitResult.data && 
                   nextProps.visitResult.data.details && 
                   nextProps.visitResult.data.details.length > 0 ?
                            getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,nextProps.visitResult.data.details) ? 
                            getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,nextProps.visitResult.data.details):undefined:undefined,



 

             ocularSignsObjectiveAR: nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.details && 
                                            nextProps.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,nextProps.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,nextProps.visitResult.data.details):'':'',

            ocularSignsObjectiveAL: nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.details && 
                                    nextProps.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,nextProps.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,nextProps.visitResult.data.details):'':'',    

            ocularSignsObjectiveARNA: nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.details && 
                                            nextProps.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,nextProps.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,nextProps.visitResult.data.details):false:false,

            ocularSignsObjectiveALNA: nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.details && 
                                    nextProps.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,nextProps.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,nextProps.visitResult.data.details):false:false,    


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
              
                

                unstimulatedSalivaryFlowVolume: this.props.visitResult && 
                this.props.visitResult.data && 
                             this.props.visitResult.data.details && 
                             this.props.visitResult.data.details.length > 0 ?
                     getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,this.props.visitResult.data.details) ? 
                     getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowVolume,this.props.visitResult.data.details):'':'',


                unstimulatedSalivaryFlowTime: this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.details && 
                                this.props.visitResult.data.details.length > 0 ?
                                        getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,this.props.visitResult.data.details) ? 
                                        getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtUnstimulatedSalivaryFlowTime,this.props.visitResult.data.details):undefined:undefined,


                stimulatedSalivaryFlowVolume: this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.details && 
                                        this.props.visitResult.data.details.length > 0 ?
                                            getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,this.props.visitResult.data.details) ? 
                                            getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowVolume,this.props.visitResult.data.details):'':'',


                stimulatedSalivaryFlowTime: this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.details && 
                                        this.props.visitResult.data.details.length > 0 ?
                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,this.props.visitResult.data.details) ? 
                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtStimulatedSalivaryFlowTime,this.props.visitResult.data.details):undefined:undefined,


         


           ocularSignsObjectiveAR: this.props.visitResult && 
                                            this.props.visitResult.data && 
                                            this.props.visitResult.data.details && 
                                            this.props.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,this.props.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestRightEye,this.props.visitResult.data.details):'':'',

            ocularSignsObjectiveAL: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,this.props.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.txtSchirmersTestLeftEye,this.props.visitResult.data.details):'':'',    

            ocularSignsObjectiveARNA: this.props.visitResult && 
                                            this.props.visitResult.data && 
                                            this.props.visitResult.data.details && 
                                            this.props.visitResult.data.details.length > 0 ?
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,this.props.visitResult.data.details) ? 
                                                                    getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestRightEye,this.props.visitResult.data.details):false:false,

            ocularSignsObjectiveALNA: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.details && 
                                    this.props.visitResult.data.details.length > 0 ?
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,this.props.visitResult.data.details) ? 
                                                                getDetailsControlValue_V2(categories.salivaryFlow.id, SalivaryFlow.chkSchirmersTestLeftEye,this.props.visitResult.data.details):false:false,    






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
            <h3 className="panel-title pull-left">Salivary Flow and Schirmer's</h3>
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
nextCategoryName = {VISIT_CATEGORY_CLINICALORALDRYNESSSCORE}
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
                <h3 className="panel-title">Salivary Flow and Schirmer's</h3>
                
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

nextCategoryName = {VISIT_CATEGORY_CLINICALORALDRYNESSSCORE}
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
    

renderForm(){
    
    return (
        <div>
            <FadeIn>
            <div className="row">
                <div className="col-md-12"> 
                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5">Unstimulated whole salivary flow rate in 5 min</div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                    <div className="block-content-no-border row">
                        
                        <div className="col-lg-2 col-md-2 col-sm-12"> 
                                        <InputGroupAddOnLR leftAddOn={"Volume"} rightAddOn={"ml"} >   
                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                            id="unstimulatedVolumeMl"
                                                            name="unstimulatedVolumeMl" 
                                                            ref="unstimulatedVolumeMl" 
                                                            placeholder="00.00"
                                                            value={this.state.unstimulatedSalivaryFlowVolume}
                                                            onChange={this.unstimulatedSalivaryFlowVolume_onChange}
                                                            onKeyPress={this.unstimulatedSalivaryFlowVolume_onKeyPress}
                                                            onBlur={this.unstimulatedSalivaryFlowVolume_onBlur}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                            type="number"
                                                            maxLength="5"
                                                            onInput={this.maxLengthCheck_ml} 
                                                            step="0.01" 
                                                            min={SalivaryFlowFieldLength.unstimulatedSalivaryFlowMin} 
                                                            max={SalivaryFlowFieldLength.unstimulatedSalivaryFlowMax}  />
                                                            </InputGroupAddOnLR>
                        </div>
                        
                        {/* <div className="col-lg-2 col-md-2 col-sm-12">  */}
                        <div className={classnames('col-lg-2 col-md-3 col-sm-12',{error:!!this.state.errors.unstimulatedSalivaryFlowTime })}>
                                        <InputGroupAddOnLR leftAddOn={"Time"} rightAddOn={"24 hour"} > 
                                        <input  className="form-control time-control" 
                                                                                    disabled={this.props.visitHeaderResult && 
                                                                                    this.props.visitHeaderResult.data && 
                                                                                    this.props.visitHeaderResult.data.completed ? true: false}
                                                                                    placeholder="00:00"
                                                                                            value={this.state.unstimulatedSalivaryFlowTime}
                                                                                            id="unstimulatedtime"
                                                                                            name="unstimulatedtime"
                                                                                            ref="unstimulatedtime"
                                                                                            onChange={this.unstimulatedSalivaryFlowTime_onChange}
                                                                                             onMouseDown={ (e) => e.target.focus() }
                                                        
                                                            
                                                            

                                                        
                                                                                        />
                                                                                    </InputGroupAddOnLR>
                                                                                    <span className={classnames('',{'visible error info':!!this.state.errors.unstimulatedSalivaryFlowTime,hidden:!!!this.state.errors.unstimulatedSalivaryFlowTime})}>{this.state.errors.unstimulatedSalivaryFlowTime}</span>  
                        </div>                    
                    </div>
                </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5">Stimulated whole salivary flow rate in 5 min</div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                    <div className="block-content-no-border row">
                        
                        <div className="col-lg-2 col-md-2 col-sm-12"> 
                                        <InputGroupAddOnLR leftAddOn={"Volume"} rightAddOn={"ml"} >   
                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                            id="stimulatedVolumeMl"
                                                            name="stimulatedVolumeMl" 
                                                            ref="stimulatedVolumeMl" 
                                                            placeholder="00.00"
                                                            value={this.state.stimulatedSalivaryFlowVolume}
                                                            onChange={this.stimulatedSalivaryFlowVolume_onChange}
                                                            onKeyPress={this.stimulatedSalivaryFlowVolume_onKeyPress}
                                                            onBlur={this.stimulatedSalivaryFlowVolume_onBlur}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                            type="number"
                                                            maxLength="5"
                                                            onInput={this.maxLengthCheck_ml} 
                                                            step="0.01" 
                                                            min={SalivaryFlowFieldLength.stimulatedSalivaryFlowMin} 
                                                            max={SalivaryFlowFieldLength.stimulatedSalivaryFlowMax}  />
                                                            </InputGroupAddOnLR>
                        </div>
                        
                        <div className="col-lg-2 col-md-3 col-sm-12"> 
                                         <InputGroupAddOnLR leftAddOn={"Time"} rightAddOn={"24 hour"} > 
                                                                  

                                                                                        <input
                                                                                disabled={this.props.visitHeaderResult && 
                                                                                                this.props.visitHeaderResult.data && 
                                                                                                this.props.visitHeaderResult.data.completed ? true: false}
                                                                                             placeholder="00:00"
                                                                                            value={this.state.stimulatedSalivaryFlowTime}
                                                                                            id="stimulatedtime"
                                                                                            name="stimulatedtime"
                                                                                            ref="stimulatedtime"
                                                                                            className='form-control time-control'
                                                                                            onChange={this.stimulatedSalivaryFlowTime_onChange}
                                                                                            onMouseDown={ (e) => e.target.focus() }
                                                                                        /> 


                                                                                       
                                                                                      
    

                                                                                     </InputGroupAddOnLR> 
                        </div>                    
                    </div>
                </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
                <div className="form-group row">
                <div className="page-header col-lg-12 col-md-12 col-sm-12 mb-5"  dangerouslySetInnerHTML={{ __html: "Schirmer's Test (<=5mm over 5 min, without anaesthesia)" }}></div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                    <div className="block-content-no-border row">


                  
                                                <div className={classnames('col-md-2 col-sm-12',{error:
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
                                                        onMouseDown={ (e) => e.target.focus() }
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
                               
                                                <div className="col-md-1 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="ocularSignsObjectiveARNA"  id="ocularSignsObjectiveARNA" 
                                                            checked={this.state.ocularSignsObjectiveAR.length > 0 ? false :this.state.ocularSignsObjectiveARNA} 
                                                            onChange={this.ocularSignsObjectiveARNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="ocularSignsObjectiveARNA">N/A</label>
                                                    </div>
                                                </div>


                                                <div className={classnames('col-md-2 col-sm-12',{error:
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

                                                 <div className="col-md-1 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="ocularSignsObjectiveALNA"  id="ocularSignsObjectiveALNA" 
                                                            checked={this.state.ocularSignsObjectiveAL.length > 0 ? false :this.state.ocularSignsObjectiveALNA} 
                                                            onChange={this.ocularSignsObjectiveALNA_onChange}/>
                                                            <label className="radio-inline" htmlFor="ocularSignsObjectiveALNA">N/A</label>
                                                    </div>
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


                  <SalivaryFlowModal 
                                            ocularSignsModalOpen={this.state.ocularSignsModalOpen} 
                                            contentLabel={"Options"}  
                                            ocularSignsObjectiveAR={this.state.ocularSignsObjectiveAR} 
                                            ocularSignsObjectiveAL={this.state.ocularSignsObjectiveAL}
                                            ocularSignsObjectiveARNA={this.state.ocularSignsObjectiveARNA} 
                                            ocularSignsObjectiveALNA={this.state.ocularSignsObjectiveALNA}
                                            ocularSignsModalClose={this.ocularSignsModalClose}
                                            ocularSignsConfirmed={this.ocularSignsConfirmed}/>



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

 export default SalivaryFlowForm;

