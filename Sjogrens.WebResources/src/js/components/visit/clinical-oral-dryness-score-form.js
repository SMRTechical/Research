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


import {CODS} from '../../config/controls/cods';
import FunkyRadioTwoOptionsCODS from '../../components/generic/radio/cods/funky-radio-two-options-cods';  
import {CODSFieldLength} from '../../constants/information/field-length';
import {CODSValidationMessages} from '../../constants/information/messages';

class ClinicalOralDrynessScoreForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
           
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
          
            totalScore: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.cODS.id, CODS.txtTotalScore,this.props.visitResult.data.details):null,         
          

            numberOfTeethPresent: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethPresent,this.props.visitResult.data.details):'',         
            
            numberOfTeethWithIncisionalCaries: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithIncisionalCaries,this.props.visitResult.data.details):'',         
            
            numberOfTeethWithCervicalOrRootCaries: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithCervicalOrRootCaries,this.props.visitResult.data.details):'',         
            


            mirrorSticksToBuccalMucosaSelectedScore :  this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                       getDetailsControlValue(categories.cODS.id, CODS.txtMirrorStickstoBuccalMucosaSelectedScore,this.props.visitResult.data.details):null,    
           
            mirrorSticksToBuccalMucosa: this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.visits && 
                                        this.props.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue_V2(categories.cODS.id, 
                                                getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,
                                                    getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                    this.props.visitResult.data.visits):null,
            
            mirrorSticksToTongueSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.cODS.id, CODS.txtMirrorSticksToTongueSelectedScore,this.props.visitResult.data.details):null,    

            mirrorSticksToTongue: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,
                                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,

            frothySalivaSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.cODS.id, CODS.txtFrothySalivaSelectedScore,this.props.visitResult.data.details):null,    

            frothySaliva: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListFrothySaliva.controlId,
                                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,


            noSalivaPoolingInFloorOfMouthSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                        getDetailsControlValue(categories.cODS.id, CODS.txtNoSalivaPoolingInFloorOfMouthSelectedScore,this.props.visitResult.data.details):null,    

            noSalivaPoolingInFloorOfMouth: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,
                                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,        


            tongueShowsLossOfPapillaeSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.cODS.id, CODS.txtTongueShowsLossOfPapillaeSelectedScore,this.props.visitResult.data.details):null,    

            tongueShowsLossOfPapillae: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.cODS.id, 
                                    getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,
                                        getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                        this.props.visitResult.data.visits):null,        



            alteredSmoothGinGivalArchitectureSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                        getDetailsControlValue(categories.cODS.id, CODS.txtAlteredSmoothGinGivalArchitectureSelectedScore,this.props.visitResult.data.details):null,    

            alteredSmoothGinGivalArchitecture: this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.cODS.id, 
                            getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,
                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,      


        glassyAppearanceOfOtherOralMucosaSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                getDetailsControlValue(categories.cODS.id, CODS.txtGlassyAppearanceOfOtherOralMucosaSelectedScore,this.props.visitResult.data.details):null,    

        glassyAppearanceOfOtherOralMucosa: this.props.visitResult && 
            this.props.visitResult.data && 
            this.props.visitResult.data.visits && 
            this.props.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.cODS.id, 
                    getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,
                        getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                        this.props.visitResult.data.visits):null,      


        tongueLobulatedFissuredSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                                getDetailsControlValue(categories.cODS.id, CODS.txtTongueLobulatedFissuredSelectedScore,this.props.visitResult.data.details):null,    

        tongueLobulatedFissured: this.props.visitResult && 
                 this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.cODS.id, 
                getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,
                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,    

                activeOrRecentlyRestoredCervicalCariesSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                getDetailsControlValue(categories.cODS.id, CODS.txtActiveOrRecentlyRestoredCervicalCariesSelectedScore,this.props.visitResult.data.details):null,    

                activeOrRecentlyRestoredCervicalCaries: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,
getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,    



debrisOnPalateSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.cODS.id, CODS.txtDebrisOnPalateSelectedScore,this.props.visitResult.data.details):null,    

            debrisOnPalate: this.props.visitResult && 
            this.props.visitResult.data && 
            this.props.visitResult.data.visits && 
            this.props.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.cODS.id, 
            getControlValues(CODS.rbtListDebrisOnPalate.controlId,
            getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
            this.props.visitResult.data.visits):null,    




                salivaryGlandTenderness: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.cODS.id, 
                                    getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,
                                        getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
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

            this.mirrorSticksToBuccalMucosa_onChange = this.mirrorSticksToBuccalMucosa_onChange.bind(this);
            this.mirrorSticksToTongue_onChange = this.mirrorSticksToTongue_onChange.bind(this);
            this.frothySaliva_onChange = this.frothySaliva_onChange.bind(this);
            this.noSalivaPoolingInFloorOfMouth_onChange = this.noSalivaPoolingInFloorOfMouth_onChange.bind(this);
            this.tongueShowsLossOfPapillae_onChange = this.tongueShowsLossOfPapillae_onChange.bind(this);
            this.alteredSmoothGinGivalArchitecture_onChange = this.alteredSmoothGinGivalArchitecture_onChange.bind(this);
            this.glassyAppearanceOfOtherOralMucosa_onChange = this.glassyAppearanceOfOtherOralMucosa_onChange.bind(this);
            this.tongueLobulatedFissured_onChange = this.tongueLobulatedFissured_onChange.bind(this);
            this.activeOrRecentlyRestoredCervicalCaries_onChange = this.activeOrRecentlyRestoredCervicalCaries_onChange.bind(this);
            this.debrisOnPalate_onChange = this.debrisOnPalate_onChange.bind(this);
            this.calculateTotal = this.calculateTotal.bind(this);
            this.calculateTotal2 = this.calculateTotal2.bind(this);
            this.calculateTotalValueChanged = this.calculateTotalValueChanged.bind(this);


            this.numberOfTeethPresent_onChange = this.numberOfTeethPresent_onChange.bind(this);
            this.numberOfTeethPresent_onKeyPress = this.numberOfTeethPresent_onKeyPress.bind(this);
            
            this.numberOfTeethWithIncisionalCaries_onChange = this.numberOfTeethWithIncisionalCaries_onChange.bind(this);
            this.numberOfTeethWithIncisionalCaries_onKeyPress = this.numberOfTeethWithIncisionalCaries_onKeyPress.bind(this);

            this.numberOfTeethWithCervicalOrRootCaries_onChange = this.numberOfTeethWithCervicalOrRootCaries_onChange.bind(this);
            this.numberOfTeethWithCervicalOrRootCaries_onKeyPress = this.numberOfTeethWithCervicalOrRootCaries_onKeyPress.bind(this);

            this.salivaryGlandTenderness_onChange = this.salivaryGlandTenderness_onChange.bind(this)

    }


    validateVisit(){
        let errors = {};
      
            
      
       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = [];


        if (this.state.mirrorSticksToBuccalMucosa){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.mirrorSticksToBuccalMucosa,
                    controlId:
                    this.state.mirrorSticksToBuccalMucosa == getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[0].controlId:
                    this.state.mirrorSticksToBuccalMucosa == getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }

        if (this.state.mirrorSticksToTongue){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.mirrorSticksToTongue,
                    controlId:
                    this.state.mirrorSticksToTongue == getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[0].controlId:
                    this.state.mirrorSticksToTongue == getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }

        if (this.state.frothySaliva){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.frothySaliva,
                    controlId:
                    this.state.frothySaliva == getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[0].controlId:
                    this.state.frothySaliva == getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.noSalivaPoolingInFloorOfMouth){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.noSalivaPoolingInFloorOfMouth,
                    controlId:
                    this.state.noSalivaPoolingInFloorOfMouth == getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[0].controlId:
                    this.state.noSalivaPoolingInFloorOfMouth == getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }

        if (this.state.tongueShowsLossOfPapillae){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tongueShowsLossOfPapillae,
                    controlId:
                    this.state.tongueShowsLossOfPapillae == getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[0].controlId:
                    this.state.tongueShowsLossOfPapillae == getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.alteredSmoothGinGivalArchitecture){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.alteredSmoothGinGivalArchitecture,
                    controlId:
                    this.state.alteredSmoothGinGivalArchitecture == getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[0].controlId:
                    this.state.alteredSmoothGinGivalArchitecture == getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.glassyAppearanceOfOtherOralMucosa){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.glassyAppearanceOfOtherOralMucosa,
                    controlId:
                    this.state.glassyAppearanceOfOtherOralMucosa == getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[0].controlId:
                    this.state.glassyAppearanceOfOtherOralMucosa == getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.tongueLobulatedFissured){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tongueLobulatedFissured,
                    controlId:
                    this.state.tongueLobulatedFissured == getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[0].controlId:
                    this.state.tongueLobulatedFissured == getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.activeOrRecentlyRestoredCervicalCaries){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.activeOrRecentlyRestoredCervicalCaries,
                    controlId:
                    this.state.activeOrRecentlyRestoredCervicalCaries == getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[0].controlId:
                    this.state.activeOrRecentlyRestoredCervicalCaries == getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }

        if (this.state.debrisOnPalate){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.debrisOnPalate,
                    controlId:
                    this.state.debrisOnPalate == getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[0].controlId:
                    this.state.debrisOnPalate == getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
                }
            )
        }


        if (this.state.salivaryGlandTenderness){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.salivaryGlandTenderness,
                    controlId:
                    this.state.salivaryGlandTenderness == getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[0].controlValueId ? 
                    getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[0].controlId:
                    this.state.salivaryGlandTenderness == getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[1].controlValueId ? 
                    getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[1].controlId:
                    0,
                    categoryId:   categories.cODS.id   
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

    if (this.state.totalScore || parseInt(this.state.totalScore) >= 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.totalScore,
                controlId:CODS.txtTotalScore.controlId, 
                categoryId:   categories.cODS.id   
            }
        )
       }

       if (this.state.mirrorSticksToBuccalMucosaSelectedScore || parseInt(this.state.mirrorSticksToBuccalMucosaSelectedScore) >= 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.mirrorSticksToBuccalMucosaSelectedScore,
                controlId:CODS.txtMirrorStickstoBuccalMucosaSelectedScore.controlId, 
                categoryId:   categories.cODS.id   
            }
        )
 }

 if (this.state.mirrorSticksToTongueSelectedScore || parseInt(this.state.mirrorSticksToTongueSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.mirrorSticksToTongueSelectedScore,
            controlId:CODS.txtMirrorSticksToTongueSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}
    

if (this.state.frothySalivaSelectedScore || parseInt(this.state.frothySalivaSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.frothySalivaSelectedScore,
            controlId:CODS.txtFrothySalivaSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}
 
if (this.state.noSalivaPoolingInFloorOfMouthSelectedScore || parseInt(this.state.noSalivaPoolingInFloorOfMouthSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.noSalivaPoolingInFloorOfMouthSelectedScore,
            controlId:CODS.txtNoSalivaPoolingInFloorOfMouthSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}

if (this.state.tongueShowsLossOfPapillaeSelectedScore || parseInt(this.state.tongueShowsLossOfPapillaeSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.tongueShowsLossOfPapillaeSelectedScore,
            controlId:CODS.txtTongueShowsLossOfPapillaeSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}


if (this.state.alteredSmoothGinGivalArchitectureSelectedScore || parseInt(this.state.alteredSmoothGinGivalArchitectureSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.alteredSmoothGinGivalArchitectureSelectedScore,
            controlId:CODS.txtAlteredSmoothGinGivalArchitectureSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}

if (this.state.glassyAppearanceOfOtherOralMucosaSelectedScore || parseInt(this.state.glassyAppearanceOfOtherOralMucosaSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.glassyAppearanceOfOtherOralMucosaSelectedScore,
            controlId:CODS.txtGlassyAppearanceOfOtherOralMucosaSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}

if (this.state.tongueLobulatedFissuredSelectedScore || parseInt(this.state.tongueLobulatedFissuredSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.tongueLobulatedFissuredSelectedScore,
            controlId:CODS.txtTongueLobulatedFissuredSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}

if (this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore || parseInt(this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore,
            controlId:CODS.txtActiveOrRecentlyRestoredCervicalCariesSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}



if (this.state.debrisOnPalateSelectedScore || parseInt(this.state.debrisOnPalateSelectedScore) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.debrisOnPalateSelectedScore,
            controlId:CODS.txtDebrisOnPalateSelectedScore.controlId, 
            categoryId:   categories.cODS.id   
        }
    )
}




if (this.state.numberOfTeethPresent && this.state.numberOfTeethPresent.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.numberOfTeethPresent,
            controlId:CODS.txtNumberOfTeethPresent.controlId, 
            categoryId:   categories.cODS.id            
        },
    )
}



if (this.state.numberOfTeethWithIncisionalCaries && this.state.numberOfTeethWithIncisionalCaries.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.numberOfTeethWithIncisionalCaries,
            controlId:CODS.txtNumberOfTeethWithIncisionalCaries.controlId, 
            categoryId:   categories.cODS.id            
        },
    )
}

if (this.state.numberOfTeethWithCervicalOrRootCaries && this.state.numberOfTeethWithCervicalOrRootCaries.length > 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.numberOfTeethWithCervicalOrRootCaries,
            controlId:CODS.txtNumberOfTeethWithCervicalOrRootCaries.controlId, 
            categoryId:   categories.cODS.id            
        },
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
    this.props.handleSaveVisitHeader(visit, detail, categories.cODS.id);
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

        this.props.handleCompleteVisitHeader(visit, detail, categories.cODS.id);
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
        
        
    
        visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues && nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
        totalScore: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.cODS.id, CODS.txtTotalScore,nextProps.visitResult.data.details):null,         
     
     
        numberOfTeethPresent: nextProps.visitResult && nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethPresent,nextProps.visitResult.data.details):'',         
        numberOfTeethWithIncisionalCaries: nextProps.visitResult && nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithIncisionalCaries,nextProps.visitResult.data.details):'',         
        
        numberOfTeethWithCervicalOrRootCaries: nextProps.visitResult && nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithCervicalOrRootCaries,nextProps.visitResult.data.details):'',         
        
     
        mirrorSticksToBuccalMucosaSelectedScore :
                                                        nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                                        getDetailsControlValue(categories.cODS.id, CODS.txtMirrorStickstoBuccalMucosaSelectedScore,nextProps.visitResult.data.details):null,    
       
        mirrorSticksToBuccalMucosa:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.cODS.id, 
                                        getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,
                                            getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null,
        
        mirrorSticksToTongueSelectedScore :
                                            nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                            getDetailsControlValue(categories.cODS.id, CODS.txtMirrorSticksToTongueSelectedScore,nextProps.visitResult.data.details):null,    

        mirrorSticksToTongue:
                                nextProps.visitResult && 
                                nextProps.visitResult.data && 
                                nextProps.visitResult.data.visits && 
                                nextProps.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue_V2(categories.cODS.id, 
                                        getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,
                                            getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                            nextProps.visitResult.data.visits):null,



        frothySalivaSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                    getDetailsControlValue(categories.cODS.id, CODS.txtFrothySalivaSelectedScore,nextProps.visitResult.data.details):null,    

        frothySaliva: nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListFrothySaliva.controlId,
                                                getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                                nextProps.visitResult.data.visits):null,

         noSalivaPoolingInFloorOfMouthSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                                        getDetailsControlValue(categories.cODS.id, CODS.txtNoSalivaPoolingInFloorOfMouthSelectedScore,nextProps.visitResult.data.details):null,    

        noSalivaPoolingInFloorOfMouth: nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,
                                                getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                                nextProps.visitResult.data.visits):null,        


        tongueShowsLossOfPapillaeSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.cODS.id, CODS.txtTongueShowsLossOfPapillaeSelectedScore,nextProps.visitResult.data.details):null,    

        tongueShowsLossOfPapillae: nextProps.visitResult && 
                            nextProps.visitResult.data && 
                            nextProps.visitResult.data.visits && 
                            nextProps.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.cODS.id, 
                                    getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,
                                        getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                        nextProps.visitResult.data.visits):null,   
                                        
                                        

        alteredSmoothGinGivalArchitectureSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                        getDetailsControlValue(categories.cODS.id, CODS.txtAlteredSmoothGinGivalArchitectureSelectedScore,nextProps.visitResult.data.details):null,    

            alteredSmoothGinGivalArchitecture: nextProps.visitResult && 
                    nextProps.visitResult.data && 
                    nextProps.visitResult.data.visits && 
                    nextProps.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.cODS.id, 
                            getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,
                                getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                                nextProps.visitResult.data.visits):null,   



        glassyAppearanceOfOtherOralMucosaSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                                getDetailsControlValue(categories.cODS.id, CODS.txtGlassyAppearanceOfOtherOralMucosaSelectedScore,nextProps.visitResult.data.details):null,    

        glassyAppearanceOfOtherOralMucosa: nextProps.visitResult && 
            nextProps.visitResult.data && 
            nextProps.visitResult.data.visits && 
            nextProps.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.cODS.id, 
                    getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,
                        getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                        nextProps.visitResult.data.visits):null, 


                        tongueLobulatedFissuredSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
                        getDetailsControlValue(categories.cODS.id, CODS.txtTongueLobulatedFissuredSelectedScore,nextProps.visitResult.data.details):null,    

tongueLobulatedFissured: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,
getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null, 


activeOrRecentlyRestoredCervicalCariesSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.cODS.id, CODS.txtActiveOrRecentlyRestoredCervicalCariesSelectedScore,nextProps.visitResult.data.details):null,    

activeOrRecentlyRestoredCervicalCaries: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,
getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null, 



debrisOnPalateSelectedScore : nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.cODS.id, CODS.txtDebrisOnPalateSelectedScore,nextProps.visitResult.data.details):null,    

debrisOnPalate: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListDebrisOnPalate.controlId,
getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
nextProps.visitResult.data.visits):null, 



salivaryGlandTenderness: nextProps.visitResult && 
nextProps.visitResult.data && 
nextProps.visitResult.data.visits && 
nextProps.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
        getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,
            getCategoryControls(categories.cODS.id, nextProps.visitControlValuesResult.data.visitControlValues)),
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
                //  patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
              

                visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          
               
                numberOfTeethPresent: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethPresent,this.props.visitResult.data.details):'',                        
                numberOfTeethWithIncisionalCaries: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithIncisionalCaries,this.props.visitResult.data.details):'',         
                numberOfTeethWithCervicalOrRootCaries: this.props.visitResult && this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.cODS.id, CODS.txtNumberOfTeethWithCervicalOrRootCaries,this.props.visitResult.data.details):'',         
                
                totalScore: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue_V2(categories.cODS.id, CODS.txtTotalScore,this.props.visitResult.data.details):null,         
                mirrorSticksToBuccalMucosaSelectedScore :
                                                                this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                                getDetailsControlValue(categories.cODS.id, CODS.txtMirrorStickstoBuccalMucosaSelectedScore,this.props.visitResult.data.details):null,    
               
                mirrorSticksToBuccalMucosa:
                                        this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.visits && 
                                        this.props.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue_V2(categories.cODS.id, 
                                                getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,
                                                    getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                    this.props.visitResult.data.visits):null,
                
                mirrorSticksToTongueSelectedScore :
                                                    this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                    getDetailsControlValue(categories.cODS.id, CODS.txtMirrorSticksToTongueSelectedScore,this.props.visitResult.data.details):null,    
    
                mirrorSticksToTongue:
                                        this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.visits && 
                                        this.props.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue_V2(categories.cODS.id, 
                                                getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,
                                                    getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                    this.props.visitResult.data.visits):null,


            frothySalivaSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                getDetailsControlValue(categories.cODS.id, CODS.txtFrothySalivaSelectedScore,this.props.visitResult.data.details):null,    

            frothySaliva: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListFrothySaliva.controlId,
                                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,


            noSalivaPoolingInFloorOfMouthSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                                        getDetailsControlValue(categories.cODS.id, CODS.txtNoSalivaPoolingInFloorOfMouthSelectedScore,this.props.visitResult.data.details):null,    

            noSalivaPoolingInFloorOfMouth: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue_V2(categories.cODS.id, 
                                            getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,
                                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                                this.props.visitResult.data.visits):null,        


            tongueShowsLossOfPapillaeSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                       getDetailsControlValue(categories.cODS.id, CODS.txtTongueShowsLossOfPapillaeSelectedScore,this.props.visitResult.data.details):null,    

            tongueShowsLossOfPapillae: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue_V2(categories.cODS.id, 
                                    getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,
                                        getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                        this.props.visitResult.data.visits):null,        

            alteredSmoothGinGivalArchitectureSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                        getDetailsControlValue(categories.cODS.id, CODS.txtAlteredSmoothGinGivalArchitectureSelectedScore,this.props.visitResult.data.details):null,    

            alteredSmoothGinGivalArchitecture: this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue_V2(categories.cODS.id, 
                            getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,
                                getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                                this.props.visitResult.data.visits):null,   



        glassyAppearanceOfOtherOralMucosaSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                                getDetailsControlValue(categories.cODS.id, CODS.txtGlassyAppearanceOfOtherOralMucosaSelectedScore,this.props.visitResult.data.details):null,    

        glassyAppearanceOfOtherOralMucosa: this.props.visitResult && 
            this.props.visitResult.data && 
            this.props.visitResult.data.visits && 
            this.props.visitResult.data.visits.length > 0 ? 
            getVisitOptionControlValue_V2(categories.cODS.id, 
                    getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,
                        getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
                        this.props.visitResult.data.visits):null, 


                        tongueLobulatedFissuredSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
                        getDetailsControlValue(categories.cODS.id, CODS.txtTongueLobulatedFissuredSelectedScore,this.props.visitResult.data.details):null,    

tongueLobulatedFissured: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,
getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null, 


activeOrRecentlyRestoredCervicalCariesSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.cODS.id, CODS.txtActiveOrRecentlyRestoredCervicalCariesSelectedScore,this.props.visitResult.data.details):null,    

activeOrRecentlyRestoredCervicalCaries: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,
getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null, 



debrisOnPalateSelectedScore : this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.cODS.id, CODS.txtDebrisOnPalateSelectedScore,this.props.visitResult.data.details):null,    

debrisOnPalate: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
getControlValues(CODS.rbtListDebrisOnPalate.controlId,
getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
this.props.visitResult.data.visits):null,    

salivaryGlandTenderness: this.props.visitResult && 
this.props.visitResult.data && 
this.props.visitResult.data.visits && 
this.props.visitResult.data.visits.length > 0 ? 
getVisitOptionControlValue_V2(categories.cODS.id, 
        getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,
            getCategoryControls(categories.cODS.id, this.props.visitControlValuesResult.data.visitControlValues)),
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
            <h3 className="panel-title pull-left">Clinical Oral Dryness Score</h3>
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
nextCategoryName = {VISIT_CATEGORY_OCULARSURFACESTAININGSCORE}
prevCategoryName = {VISIT_CATEGORY_SALIVARYFLOW}
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
                <h3 className="panel-title">Clinical Oral Dryness Score</h3>
                
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

nextCategoryName = {VISIT_CATEGORY_OCULARSURFACESTAININGSCORE}
prevCategoryName = {VISIT_CATEGORY_SALIVARYFLOW}
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
    


    renderCODSScore(){
        return (
            <div className="row">
                <div className="page-header col-md-9">
                  Osailan SM, et al. Clinical assessment of oral dryness: development of a scoring system related to salivary flow and mucosal wetness. Oral Surg Oral Med Oral Med Pathol Oral Radiol, 2012;114:597-603. 
        </div>
                <div className="col-md-2">
                    <div className='alert alert-info'>
                                    <span className="mr-5">Score:</span><strong>{this.state.totalScore}</strong>
                    </div>
                </div>
            </div>
        )
    }
    
    
    renderEmptyCODSScore(){
        return (
            <div className="row">
            <div className="page-header col-md-9">
                  Osailan SM, et al. Clinical assessment of oral dryness: development of a scoring system related to salivary flow and mucosal wetness. Oral Surg Oral Med Oral Med Pathol Oral Radiol, 2012;114:597-603. 
            </div>

                <div className="col-md-2">
                    <div className='alert alert-info'>
                        {
                            this.props.visitResult && 
                                                                     this.props.visitResult.data && 
                                                                     this.props.visitResult.requestRecieved ? 
                                    <span className="mr-5">No Score</span> : <span className="mr-5">Saving...</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
    
    mirrorSticksToBuccalMucosa_onChange(e){
        console.log('e.target')
        
        console.log(e.target)
        console.log(e.target.checked)

        if (this.state.mirrorSticksToBuccalMucosa == e.target.value){
            this.setState({
                mirrorSticksToBuccalMucosa:null,
                changed:true,
                mirrorSticksToBuccalMucosaSelectedScore :  null,
                   
                totalScore: (this.state.mirrorSticksToTongue == undefined && 
                             this.state.frothySaliva == undefined && 
                             this.state.noSalivaPoolingInFloorOfMouth == undefined &&
                             this.state.tongueShowsLossOfPapillae == undefined && 
                             this.state.alteredSmoothGinGivalArchitecture == undefined &&
                             this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                             this.state.tongueLobulatedFissured == undefined &&
                             this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                             this.state.debrisOnPalate == undefined) ? null:
                        (this.state.totalScore != undefined && this.state.mirrorSticksToBuccalMucosaSelectedScore != undefined) ?
                         this.calculateTotal2(this.state.totalScore,this.state.mirrorSticksToBuccalMucosaSelectedScore,e.target.value, e.target.checked): null
            })
        }
    else {
        this.setState({
            mirrorSticksToBuccalMucosa:e.target.value,
            changed:this.state.mirrorSticksToBuccalMucosa != e.target.value,
            mirrorSticksToBuccalMucosaSelectedScore :  parseInt(getCODSTotalScore(e.target.value)),
           totalScore : this.calculateTotal2(this.state.totalScore,this.state.mirrorSticksToBuccalMucosaSelectedScore,e.target.value, e.target.checked)
        })
    }
    }


    mirrorSticksToTongue_onChange(e){
        
 
         if (this.state.mirrorSticksToTongue == e.target.value){
             this.setState({
                 mirrorSticksToTongue:null,
                 changed:true,
                 mirrorSticksToTongueSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                             this.state.frothySaliva == undefined && 
                             this.state.noSalivaPoolingInFloorOfMouth == undefined &&
                             this.state.tongueShowsLossOfPapillae == undefined && 
                             this.state.alteredSmoothGinGivalArchitecture == undefined &&
                             this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                             this.state.tongueLobulatedFissured == undefined &&
                             this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                             this.state.debrisOnPalate == undefined) ? null:
                                                 (this.state.totalScore != undefined && this.state.mirrorSticksToTongueSelectedScore != undefined) ?
                                                  this.calculateTotal2(this.state.totalScore,this.state.mirrorSticksToTongueSelectedScore,e.target.value, e.target.checked): null
             })
         }
     else {
         this.setState({
             mirrorSticksToTongue:e.target.value,
             changed:this.state.mirrorSticksToTongue != e.target.value,
             mirrorSticksToTongueSelectedScore :  parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.mirrorSticksToTongueSelectedScore,e.target.value, e.target.checked)
         })
     }
     }
 

     frothySaliva_onChange(e){
        
 
         if (this.state.frothySaliva == e.target.value){
             this.setState({
                frothySaliva:null,
                 changed:true,
                 frothySalivaSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                             this.state.mirrorSticksToTongue == undefined && 
                             this.state.noSalivaPoolingInFloorOfMouth == undefined &&
                             this.state.tongueShowsLossOfPapillae == undefined && 
                             this.state.alteredSmoothGinGivalArchitecture == undefined &&
                             this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                             this.state.tongueLobulatedFissured == undefined &&
                             this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                             this.state.debrisOnPalate == undefined) ? null:
                                 (this.state.totalScore != undefined && this.state.frothySalivaSelectedScore != undefined) ?
                                 this.calculateTotal2(this.state.totalScore,this.state.frothySalivaSelectedScore,e.target.value, e.target.checked): null
             })
         }
     else {
         this.setState({
            frothySaliva:e.target.value,
             changed:this.state.frothySaliva != e.target.value,
             frothySalivaSelectedScore :  parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.frothySalivaSelectedScore,e.target.value, e.target.checked)
         })
     }
     }
 

     noSalivaPoolingInFloorOfMouth_onChange(e){
        
 
         if (this.state.noSalivaPoolingInFloorOfMouth == e.target.value){
             this.setState({
                noSalivaPoolingInFloorOfMouth:null,
                 changed:true,
                 noSalivaPoolingInFloorOfMouthSelectedScore :  null,
               
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                             this.state.mirrorSticksToTongue == undefined && 
                             this.state.frothySaliva == undefined &&
                             this.state.tongueShowsLossOfPapillae == undefined && 
                             this.state.alteredSmoothGinGivalArchitecture == undefined &&
                             this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                             this.state.tongueLobulatedFissured == undefined &&
                             this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                             this.state.debrisOnPalate == undefined) ? null:
                                 (this.state.totalScore != undefined && this.state.noSalivaPoolingInFloorOfMouthSelectedScore != undefined) ?
                                 this.calculateTotal2(this.state.totalScore,this.state.noSalivaPoolingInFloorOfMouthSelectedScore,e.target.value, e.target.checked): null 
             })
         }
     else {
         this.setState({
             noSalivaPoolingInFloorOfMouth:e.target.value,
             changed:this.state.noSalivaPoolingInFloorOfMouth != e.target.value,
             noSalivaPoolingInFloorOfMouthSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.noSalivaPoolingInFloorOfMouthSelectedScore,e.target.value, e.target.checked)
         })
     }
     }

     tongueShowsLossOfPapillae_onChange(e){
        if (this.state.tongueShowsLossOfPapillae == e.target.value){
             this.setState({
                tongueShowsLossOfPapillae:null,
                 changed:true,
                 tongueShowsLossOfPapillaeSelectedScore :  null,  
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.alteredSmoothGinGivalArchitecture == undefined &&
                            this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                            this.state.tongueLobulatedFissured == undefined &&
                            this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                            this.state.debrisOnPalate == undefined) ? null:
                            (this.state.totalScore != undefined && this.state.tongueShowsLossOfPapillaeSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.tongueShowsLossOfPapillaeSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            tongueShowsLossOfPapillae:e.target.value,
             changed:this.state.tongueShowsLossOfPapillae != e.target.value,
             tongueShowsLossOfPapillaeSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.tongueShowsLossOfPapillaeSelectedScore,e.target.value, e.target.checked)
         })
     }
     }



     alteredSmoothGinGivalArchitecture_onChange(e){
        if (this.state.alteredSmoothGinGivalArchitecture == e.target.value){
             this.setState({
                alteredSmoothGinGivalArchitecture:null,
                 changed:true,
                 alteredSmoothGinGivalArchitectureSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.tongueShowsLossOfPapillae == undefined &&
                            this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                            this.state.tongueLobulatedFissured == undefined &&
                            this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                            this.state.debrisOnPalate == undefined) ? null:
                            (this.state.totalScore != undefined && this.state.alteredSmoothGinGivalArchitectureSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.alteredSmoothGinGivalArchitectureSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            alteredSmoothGinGivalArchitecture:e.target.value,
             changed:this.state.alteredSmoothGinGivalArchitecture != e.target.value,
             alteredSmoothGinGivalArchitectureSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.alteredSmoothGinGivalArchitectureSelectedScore,e.target.value, e.target.checked)
         })
     }
     }




     glassyAppearanceOfOtherOralMucosa_onChange(e){
        if (this.state.glassyAppearanceOfOtherOralMucosa == e.target.value){
             this.setState({
                glassyAppearanceOfOtherOralMucosa:null,
                 changed:true,
                 glassyAppearanceOfOtherOralMucosaSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.tongueShowsLossOfPapillae == undefined &&
                            this.state.alteredSmoothGinGivalArchitecture == undefined &&
                            this.state.tongueLobulatedFissured == undefined &&
                            this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                            this.state.debrisOnPalate == undefined) ? null:
                            (this.state.totalScore != undefined && this.state.glassyAppearanceOfOtherOralMucosaSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.glassyAppearanceOfOtherOralMucosaSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            glassyAppearanceOfOtherOralMucosa:e.target.value,
             changed:this.state.glassyAppearanceOfOtherOralMucosa != e.target.value,
             glassyAppearanceOfOtherOralMucosaSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.glassyAppearanceOfOtherOralMucosaSelectedScore,e.target.value, e.target.checked)
         })
     }
     }



     tongueLobulatedFissured_onChange  (e){
        if (this.state.tongueLobulatedFissured == e.target.value){
             this.setState({
                tongueLobulatedFissured:null,
                 changed:true,
                 tongueLobulatedFissuredSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.tongueShowsLossOfPapillae == undefined &&
                            this.state.alteredSmoothGinGivalArchitecture == undefined &&
                            this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                            this.state.activeOrRecentlyRestoredCervicalCaries == undefined && 
                            this.state.debrisOnPalate == undefined) ? null:
                            (this.state.totalScore != undefined && this.state.tongueLobulatedFissuredSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.tongueLobulatedFissuredSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            tongueLobulatedFissured:e.target.value,
             changed:this.state.tongueLobulatedFissured != e.target.value,
             tongueLobulatedFissuredSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.tongueLobulatedFissuredSelectedScore,e.target.value, e.target.checked)
         })
     }
     }



     
     activeOrRecentlyRestoredCervicalCaries_onChange  (e){
        if (this.state.activeOrRecentlyRestoredCervicalCaries == e.target.value){
             this.setState({
                activeOrRecentlyRestoredCervicalCaries:null,
                 changed:true,
                 activeOrRecentlyRestoredCervicalCariesSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.tongueShowsLossOfPapillae == undefined &&
                            this.state.alteredSmoothGinGivalArchitecture == undefined &&
                            this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                            this.state.tongueLobulatedFissured == undefined && 
                            this.state.debrisOnPalate == undefined) ? null:
                            (this.state.totalScore != undefined && this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            activeOrRecentlyRestoredCervicalCaries:e.target.value,
             changed:this.state.activeOrRecentlyRestoredCervicalCaries != e.target.value,
             activeOrRecentlyRestoredCervicalCariesSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.activeOrRecentlyRestoredCervicalCariesSelectedScore,e.target.value, e.target.checked)
         })
     }
     }



 
     debrisOnPalate_onChange  (e){
        if (this.state.debrisOnPalate == e.target.value){
             this.setState({
                debrisOnPalate:null,
                 changed:true,
                 debrisOnPalateSelectedScore :  null,
                totalScore: (this.state.mirrorSticksToBuccalMucosa == undefined && 
                            this.state.mirrorSticksToTongue == undefined && 
                            this.state.frothySaliva == undefined &&
                            this.state.noSalivaPoolingInFloorOfMouth == undefined && 
                            this.state.tongueShowsLossOfPapillae == undefined &&
                            this.state.alteredSmoothGinGivalArchitecture == undefined &&
                            this.state.glassyAppearanceOfOtherOralMucosa == undefined &&
                            this.state.tongueLobulatedFissured == undefined && 
                            this.state.activeOrRecentlyRestoredCervicalCaries) ? null:
                            (this.state.totalScore != undefined && this.state.debrisOnPalateSelectedScore != undefined) ?
                            this.calculateTotal2(this.state.totalScore,this.state.debrisOnPalateSelectedScore,e.target.value, e.target.checked): null     
             })
         }
     else {
         this.setState({
            debrisOnPalate:e.target.value,
             changed:this.state.debrisOnPalate != e.target.value,
             debrisOnPalateSelectedScore : parseInt(getCODSTotalScore(e.target.value)),
             totalScore : this.calculateTotal2(this.state.totalScore,this.state.debrisOnPalateSelectedScore,e.target.value, e.target.checked)
         })
     }
     }



     salivaryGlandTenderness_onChange (e){

        if (this.state.salivaryGlandTenderness == e.target.value){
            this.setState({
                salivaryGlandTenderness:null,
                changed:true,

            })
        }
    else {
        this.setState({
            salivaryGlandTenderness:e.target.value,
            changed:this.state.salivaryGlandTenderness != e.target.value,
           
        })
    }
    }

    
calculateTotalValueChanged(totalScore,selectedScore){
    var returnVal = 0;
    if (totalScore && parseInt(totalScore) >= 0 ){
        if (selectedScore ) {
            if ( parseInt(this.state.totalScore) - parseInt(this.state.selectedScore) <= 0) {
                returnVal = 0;
            }
            else {
                returnVal = parseInt(this.state.totalScore) - parseInt(this.state.selectedScore);
            }
        }
    }

    return parseInt(returnVal)
}



calculateTotal2(totalScore,selectedScore, targetValue, checked){
    var returnVal = 0;
    
    var selectedValue = parseInt(targetValue) % 10

   


if (selectedValue == 1){
    if (checked){
        if (totalScore == undefined || totalScore == null){totalScore = 0}
        returnVal = parseInt(totalScore)  + 1
    }
    else {
        if (parseInt(totalScore)  - 1 > 0) {
        returnVal = parseInt(totalScore)  - 1
        }
        else {
            return null
        }
    }
}
else {
    if (checked && selectedScore && parseInt(selectedScore) === 1){
        if (parseInt(totalScore)  - 1 > 0) {
          returnVal = parseInt(totalScore)  - 1
        }
        else {
            return null
        }
    }
    else {
        if (totalScore != undefined){
        returnVal = parseInt(totalScore)
        }
        else {
            return null
        }
    }
}

 return parseInt(returnVal) >= 0 ? returnVal : 0;
 }

calculateTotal(totalScore,selectedScore, targetValue){
   var returnVal = 0;
    if (totalScore && parseInt(totalScore) >= 0 ){
        if (selectedScore && parseInt(selectedScore) >= 0) {
            if (parseInt(totalScore) - parseInt(selectedScore) <= 0) {
                returnVal = 0;
            }
            else {
                returnVal = parseInt(totalScore) /*- parseInt(selectedScore))*/ +  parseInt(getCODSTotalScore(targetValue)) ;
            }
        }
        else{
            returnVal = parseInt(totalScore) +  parseInt(getCODSTotalScore(targetValue));
        }
    }
    else {
       
        returnVal = parseInt(getCODSTotalScore(targetValue));
    }

return parseInt(returnVal) >= 0 ? returnVal : 0;
}


numberOfTeethPresent_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }
}

numberOfTeethPresent_onChange(e){
    
            if (!!this.state.errors['numberOfTeethPresent'] || !!this.state.errors['numberOfTeethPresentRange'] || !!this.state.errors['numberOfTeethPresentInvalidNumber']){            
         //One of the above error has occurred 
             console.log('One of the above error has occurred');
           //clone object from state 
           let errorsClone = Object.assign({},this.state.errors);
           //remove field we just type into from errors.
           // delete errorsClone[e.target.name];
            //Delete the required field      
            delete errorsClone['numberOfTeethPresent'];
            //Only delete range error if current value is ok
         //   if (e.target.value.length > 0  && digitsRange(e.target.value, 0, 40)) {
    
            if (e.target.value.length > 0) {  
                if (digitsOnly(e.target.value)){
                    delete errorsClone['numberOfTeethPresentInvalidNumber'];
                }
                if (digitsRange(e.target.value, CODSFieldLength.numberOfTeethPresentMin, CODSFieldLength.numberOfTeethPresentMax)) {  
                console.log('Entered value is ok');
                 delete errorsClone['numberOfTeethPresentRange'];
            }
        }
        else {
            delete errorsClone['numberOfTeethPresentInvalidNumber'];
            delete errorsClone['numberOfTeethPresentRange'];
        }
            
            // if (e.target.value.length > 0  && digitsOnly2DecimalPlaces(e.target.value)) {
              console.log('Entered value is ok');
            //  delete errorsClone['ocularSignsObjectiveAR2Decimal'];
            // }
            if (Object.keys(errorsClone).length === 0){
    
                this.setState({
                    errors:errorsClone,
                    numberOfTeethPresent:e.target.value,
                    changed:true,
                   })
    
                
            }
            else {
                //copy clone back to errors in state
                this.setState({
                    errors:errorsClone,
                    numberOfTeethPresent:e.target.value,
                    changed:true,
                });
            }
          
           }
            else {
               
                // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
                //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
                    if ((e.target.value.length > 0  && 
                        (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethPresentMin, CODSFieldLength.numberOfTeethPresentMax) || !digitsOnly(e.target.value)))) {
                    //no errors for this field existed before
                    console.log('no errors for this field existed before')
                    console.log('and user has eneterd invalid value')
                    //and user has eneterd invalid value
                    //clone errors and add to state
                    let errorsClone = Object.assign({},this.state.errors);
    
                    if (!digitsOnly(e.target.value)){
                        errorsClone.numberOfTeethPresentInvalidNumber = CODSValidationMessages.numberOfTeethPresent.invalid;
                    }
                    else if (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethPresentMin, CODSFieldLength.numberOfTeethPresentMax)){
                        errorsClone.numberOfTeethPresentRange = CODSValidationMessages.numberOfTeethPresent.range;
                    }
    
                  
    
                    this.setState({
                                errors:errorsClone,
                                numberOfTeethPresent:e.target.value,
                                changed:true
                            })
                } 
                else {
                      console.log('no invalid values update state with no error');
                      this.setState({
                             numberOfTeethPresent:e.target.value,
                              changed:true,
                            })
                        }
                }
     }



     
     numberOfTeethWithCervicalOrRootCaries_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }
}

numberOfTeethWithCervicalOrRootCaries_onChange(e){
    
            if (!!this.state.errors['numberOfTeethWithCervicalOrRootCaries'] || !!this.state.errors['numberOfTeethWithCervicalOrRootCariesRange'] || !!this.state.errors['numberOfTeethWithCervicalOrRootCariesInvalidNumber']){            
         //One of the above error has occurred 
             console.log('One of the above error has occurred');
           //clone object from state 
           let errorsClone = Object.assign({},this.state.errors);
           //remove field we just type into from errors.
           // delete errorsClone[e.target.name];
            //Delete the required field      
            delete errorsClone['numberOfTeethWithCervicalOrRootCaries'];
            //Only delete range error if current value is ok
         //   if (e.target.value.length > 0  && digitsRange(e.target.value, 0, 40)) {
    
            if (e.target.value.length > 0) {  
                if (digitsOnly(e.target.value)){
                    delete errorsClone['numberOfTeethWithCervicalOrRootCariesInvalidNumber'];
                }
                if (digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax)) {  
                console.log('Entered value is ok');
                 delete errorsClone['numberOfTeethWithCervicalOrRootCaries'];
            }
        }
        else {
            delete errorsClone['numberOfTeethWithCervicalOrRootCariesInvalidNumber'];
            delete errorsClone['numberOfTeethWithCervicalOrRootCariesRange'];
        }
            
            // if (e.target.value.length > 0  && digitsOnly2DecimalPlaces(e.target.value)) {
              console.log('Entered value is ok');
            //  delete errorsClone['ocularSignsObjectiveAR2Decimal'];
            // }
            if (Object.keys(errorsClone).length === 0){
    
                this.setState({
                    errors:errorsClone,
                    numberOfTeethWithCervicalOrRootCaries:e.target.value,
                    changed:true,
                   })
    
                
            }
            else {
                //copy clone back to errors in state
                this.setState({
                    errors:errorsClone,
                    numberOfTeethWithCervicalOrRootCaries:e.target.value,
                    changed:true,
                });
            }
          
           }
            else {
               
                // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
                //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
                    if ((e.target.value.length > 0  && 
                        (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax) || !digitsOnly(e.target.value)))) {
                    //no errors for this field existed before
                    console.log('no errors for this field existed before')
                    console.log('and user has eneterd invalid value')
                    //and user has eneterd invalid value
                    //clone errors and add to state
                    let errorsClone = Object.assign({},this.state.errors);
    
                    if (!digitsOnly(e.target.value)){
                        errorsClone.numberOfTeethWithCervicalOrRootCariesInvalidNumber = CODSValidationMessages.numberOfTeethWithCervicalOrRootCaries.invalid;
                    }
                    else if (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax)){
                        errorsClone.numberOfTeethWithCervicalOrRootCariesRange = CODSValidationMessages.numberOfTeethWithCervicalOrRootCaries.range;
                    }
    
                  
    
                    this.setState({
                                errors:errorsClone,
                                numberOfTeethWithCervicalOrRootCaries:e.target.value,
                                changed:true
                            })
                } 
                else {
                      console.log('no invalid values update state with no error');
                      this.setState({
                        numberOfTeethWithCervicalOrRootCaries:e.target.value,
                              changed:true,
                            })
                        }
                }
     }




     numberOfTeethWithIncisionalCaries_onKeyPress(e){
        if (!digitsOnly(e.key)){
            e.preventDefault();   
        }
    }
    
    numberOfTeethWithIncisionalCaries_onChange(e){
        
                if (!!this.state.errors['numberOfTeethWithIncisionalCaries'] || !!this.state.errors['numberOfTeethWithIncisionalCariesRange'] || !!this.state.errors['numberOfTeethWithIncisionalCariesInvalidNumber']){            
             //One of the above error has occurred 
                 console.log('One of the above error has occurred');
               //clone object from state 
               let errorsClone = Object.assign({},this.state.errors);
               //remove field we just type into from errors.
               // delete errorsClone[e.target.name];
                //Delete the required field      
                delete errorsClone['numberOfTeethWithIncisionalCaries'];
                //Only delete range error if current value is ok
             //   if (e.target.value.length > 0  && digitsRange(e.target.value, 0, 40)) {
        
                if (e.target.value.length > 0) {  
                    if (digitsOnly(e.target.value)){
                        delete errorsClone['numberOfTeethWithIncisionalCariesInvalidNumber'];
                    }
                    if (digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax)) {  
                    console.log('Entered value is ok');
                     delete errorsClone['numberOfTeethWithIncisionalCariesRange'];
                }
            }
            else {
                delete errorsClone['numberOfTeethWithIncisionalCariesInvalidNumber'];
                delete errorsClone['numberOfTeethWithIncisionalCariesRange'];
            }
                
                // if (e.target.value.length > 0  && digitsOnly2DecimalPlaces(e.target.value)) {
                  console.log('Entered value is ok');
                //  delete errorsClone['ocularSignsObjectiveAR2Decimal'];
                // }
                if (Object.keys(errorsClone).length === 0){
        
                    this.setState({
                        errors:errorsClone,
                        numberOfTeethWithIncisionalCaries:e.target.value,
                        changed:true,
                       })
        
                    
                }
                else {
                    //copy clone back to errors in state
                    this.setState({
                        errors:errorsClone,
                        numberOfTeethWithIncisionalCaries:e.target.value,
                        changed:true,
                    });
                }
              
               }
                else {
                   
                    // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
                    //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
                        if ((e.target.value.length > 0  && 
                            (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax) || !digitsOnly(e.target.value)))) {
                        //no errors for this field existed before
                        console.log('no errors for this field existed before')
                        console.log('and user has eneterd invalid value')
                        //and user has eneterd invalid value
                        //clone errors and add to state
                        let errorsClone = Object.assign({},this.state.errors);
        
                        if (!digitsOnly(e.target.value)){
                            errorsClone.numberOfTeethWithIncisionalCariesInvalidNumber = CODSValidationMessages.numberOfTeethWithIncisionalCaries.invalid;
                        }
                        else if (!digitsRange(e.target.value, CODSFieldLength.numberOfTeethWithIncisionalCariesMin, CODSFieldLength.numberOfTeethWithIncisionalCariesMax)){
                            errorsClone.numberOfTeethWithIncisionalCariesRange = CODSValidationMessages.numberOfTeethWithIncisionalCaries.range;
                        }
        
                      
        
                        this.setState({
                                    errors:errorsClone,
                                    numberOfTeethWithIncisionalCaries:e.target.value,
                                    changed:true
                                })
                    } 
                    else {
                          console.log('no invalid values update state with no error');
                          this.setState({
                                 numberOfTeethWithIncisionalCaries:e.target.value,
                                  changed:true,
                                })
                            }
                    }
         }
    


renderForm(){

    return (
        <div>

{ 
                
                (this.state.totalScore || parseInt(this.state.totalScore) >= 0 ) ? 
                    this.renderCODSScore()
                    :this.renderEmptyCODSScore()
            }


            <div className="row">
                <div className="col-md-12"> 
              

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"1. Mirror sticks to buccal mucosa"}
                                                optionName={"mirrorstickstobuccalmucosa"}
                                                optionOneId={"optMirrorstickstobuccalmucosYes"}
                                                optionTwoId={"optMirrorstickstobuccalmucosNo"}
                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}
                                                optionOneHtmlFor={"optMirrorstickstobuccalmucosYes"}
                                                optionTwoHtmlFor={"optMirrorstickstobuccalmucosNo"}
                                                    optionOneChecked={this.state.mirrorSticksToBuccalMucosa == getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.mirrorSticksToBuccalMucosa_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.mirrorSticksToBuccalMucosa == getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.mirrorSticksToBuccalMucosa_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListMirrorStickstoBuccalMucosa.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"2. Mirror sticks to tongue"}
                                                optionName={"mirrorstickstotongue"}
                                                optionOneId={"optMirrorstickstotongueYes"}
                                                optionTwoId={"optMirrorstickstotongueNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optMirrorstickstotongueYes"}
                                                optionTwoHtmlFor={"optMirrorstickstotongueNo"}
                                                    optionOneChecked={this.state.mirrorSticksToTongue == getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.mirrorSticksToTongue_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.mirrorSticksToTongue == getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.mirrorSticksToTongue_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListMirrorSticksToTongue.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"3. Frothy saliva"}
                                                optionName={"frothySaliva"}
                                                optionOneId={"optFrothySalivaYes"}
                                                optionTwoId={"optFrothySalivaNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optFrothySalivaYes"}
                                                optionTwoHtmlFor={"optFrothySalivaNo"}
                                                    optionOneChecked={this.state.frothySaliva == getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.frothySaliva_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.frothySaliva == getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.frothySaliva_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListFrothySaliva.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"4. No saliva pooling in floor of mouth"}
                                                optionName={"noSalivaPoolingInFloorOfMouth"}
                                                optionOneId={"optNoSalivaPoolingInFloorOfMouthYes"}
                                                optionTwoId={"optNoSalivaPoolingInFloorOfMouthNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optNoSalivaPoolingInFloorOfMouthYes"}
                                                optionTwoHtmlFor={"optNoSalivaPoolingInFloorOfMouthNo"}
                                                    optionOneChecked={this.state.noSalivaPoolingInFloorOfMouth == getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.noSalivaPoolingInFloorOfMouth_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.noSalivaPoolingInFloorOfMouth == getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.noSalivaPoolingInFloorOfMouth_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListNoSalivaPoolingInFloorOfMouth.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"5. Tongue shows loss of papillae"}
                                                optionName={"tongueShowsLossOfPapillae"}
                                                optionOneId={"optTongueShowsLossOfPapillaeYes"}
                                                optionTwoId={"optTongueShowsLossOfPapillaeNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optTongueShowsLossOfPapillaeYes"}
                                                optionTwoHtmlFor={"optTongueShowsLossOfPapillaeNo"}
                                                    optionOneChecked={this.state.tongueShowsLossOfPapillae == getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.tongueShowsLossOfPapillae_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.tongueShowsLossOfPapillae == getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.tongueShowsLossOfPapillae_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListTongueShowsLossOfPapillae.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>

                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"6. Altered/smooth gingival architecture"}
                                                optionName={"alteredSmoothGinGivalArchitecture"}
                                                optionOneId={"optAlteredSmoothGinGivalArchitectureYes"}
                                                optionTwoId={"optalteredSmoothGinGivalArchitectureNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optAlteredSmoothGinGivalArchitectureYes"}
                                                optionTwoHtmlFor={"optalteredSmoothGinGivalArchitectureNo"}
                                                    optionOneChecked={this.state.alteredSmoothGinGivalArchitecture == getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.alteredSmoothGinGivalArchitecture_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.alteredSmoothGinGivalArchitecture == getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.alteredSmoothGinGivalArchitecture_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListAlteredSmoothGinGivalArchitecture.controlId,this.state.visitControls)[1].controlValue}
                                                     />


                                    </FadeIn>

                                </div>
                </div>

                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"7. Glassy appearance of other oral mucosa, especially palate"}
                                                optionName={"glassyAppearanceOfOtherOralMucosa"}
                                                optionOneId={"optGlassyAppearanceOfOtherOralMucosaYes"}
                                                optionTwoId={"optGlassyAppearanceOfOtherOralMucosaNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optGlassyAppearanceOfOtherOralMucosaYes"}
                                                optionTwoHtmlFor={"optGlassyAppearanceOfOtherOralMucosaNo"}
                                                    optionOneChecked={this.state.glassyAppearanceOfOtherOralMucosa == getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.glassyAppearanceOfOtherOralMucosa_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.glassyAppearanceOfOtherOralMucosa == getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.glassyAppearanceOfOtherOralMucosa_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListGlassyAppearanceOfOtherOralMucosa.controlId,this.state.visitControls)[1].controlValue}
                                                     />
                                    </FadeIn>
                                </div>
                </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"8. Tongue lobulated/fissured"}
                                                optionName={"tongueLobulatedFissured"}
                                                optionOneId={"optTongueLobulatedFissuredYes"}
                                                optionTwoId={"optTongueLobulatedFissuredNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optTongueLobulatedFissuredYes"}
                                                optionTwoHtmlFor={"optTongueLobulatedFissuredNo"}
                                                    optionOneChecked={this.state.tongueLobulatedFissured == getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.tongueLobulatedFissured_onChange  }
                                                    optionOneCaption={getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.tongueLobulatedFissured == getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.tongueLobulatedFissured_onChange  }
                                                    optionTwoCaption={getControlValues(CODS.rbtListTongueLobulatedFissured.controlId,this.state.visitControls)[1].controlValue}
                                                     />
                                    </FadeIn>
                                </div>
                </div>
                </div>
                </div>

                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"9. Active or recently restored (last 6 months) cervical caries (>2 teeth)"}
                                                optionName={"activeOrRecentlyRestoredCervicalCaries"}
                                                optionOneId={"optActiveOrRecentlyRestoredCervicalCariesYes"}
                                                optionTwoId={"optActiveOrRecentlyRestoredCervicalCariesNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optActiveOrRecentlyRestoredCervicalCariesYes"}
                                                optionTwoHtmlFor={"optActiveOrRecentlyRestoredCervicalCariesNo"}
                                                    optionOneChecked={this.state.activeOrRecentlyRestoredCervicalCaries == getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.activeOrRecentlyRestoredCervicalCaries_onChange  }
                                                    optionOneCaption={getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.activeOrRecentlyRestoredCervicalCaries == getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.activeOrRecentlyRestoredCervicalCaries_onChange  }
                                                    optionTwoCaption={getControlValues(CODS.rbtListActiveOrRecentlyRestoredCervicalCaries.controlId,this.state.visitControls)[1].controlValue}
                                                     />
                                    </FadeIn>
                                </div>
                </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"10. Debris on palate (excluding under dentures)"}
                                                optionName={"debrisOnPalate"}
                                                optionOneId={"optDebrisOnPalateYes"}
                                                optionTwoId={"optDebrisOnPalateNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optDebrisOnPalateYes"}
                                                optionTwoHtmlFor={"optDebrisOnPalateNo"}
                                                    optionOneChecked={this.state.debrisOnPalate == getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.debrisOnPalate_onChange  }
                                                    optionOneCaption={getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.debrisOnPalate == getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.debrisOnPalate_onChange  }
                                                    optionTwoCaption={getControlValues(CODS.rbtListDebrisOnPalate.controlId,this.state.visitControls)[1].controlValue}
                                                     />
                                    </FadeIn>
                                </div>
                </div>
                </div>
                </div>



                <div className="row">
                <div className="col-md-12"> 
                        <div className="block block-inclusion-criteria-head no-pad">
                                    <div className="block-content-no-border row">
                                        <FadeIn>
                                        <div className="form-group row">
                                            <label htmlFor="numberOfTeethPresent" className ="control-label col-lg-8 col-md-4 col-sm-12">Number of teeth present</label>
                                            <div className={classnames('col-lg-2 col-md-4 col-sm-12',{error:
                                                !!this.state.errors.numberOfTeethPresent || 
                                                !!this.state.errors.numberOfTeethPresentRange ||
                                                !!this.state.errors.numberOfTeethPresentInvalidNumber })}>

                                                    <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                            id="numberOfTeethPresent"
                                                                            name="numberOfTeethPresent" 
                                                                            ref="numberOfTeethPresent" 
                                                                            placeholder="00"
                                                                            value={this.state.numberOfTeethPresent}
                                                                            onChange={this.numberOfTeethPresent_onChange}
                                                                            onKeyPress={this.numberOfTeethPresent_onKeyPress}
                                                                             onMouseDown={ (e) => e.target.focus() }
                                                                            type="number" step="1" 
                                                                            maxLength="2"
                                                                            onInput={maxLengthCheck}
                                                                            min={CODSFieldLength.numberOfTeethPresentMin} 
                                                                            max={CODSFieldLength.numberOfTeethPresentMax}/>
                                                </div>
                                                </div>
                                        </FadeIn>
                                    </div>
                    </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
                        <div className="block block-inclusion-criteria-head no-pad">
                                    <div className="block-content-no-border row">
                                        <FadeIn>
                                        <div className="form-group row">
                                            <label htmlFor="numberOfTeethPresent" className ="control-label col-lg-8 col-md-4 col-sm-12">Number of teeth with incisional caries</label>
                                            <div className={classnames('col-lg-2 col-md-4 col-sm-12',{error:
                                                !!this.state.errors.numberOfTeethWithIncisionalCaries || 
                                                !!this.state.errors.numberOfTeethWithIncisionalCariesRange ||
                                                !!this.state.errors.numberOfTeethWithIncisionalCariesInvalidNumber })}>

                                                    <input  className="form-control" 
                                                                            disabled={this.props.visitHeaderResult && 
                                                                            this.props.visitHeaderResult.data && 
                                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                            id="numberOfTeethWithIncisionalCaries"
                                                                            name="numberOfTeethWithIncisionalCaries" 
                                                                            ref="numberOfTeethWithIncisionalCaries" 
                                                                            placeholder="00"
                                                                            value={this.state.numberOfTeethWithIncisionalCaries}
                                                                            onChange={this.numberOfTeethWithIncisionalCaries_onChange}
                                                                            onKeyPress={this.numberOfTeethWithIncisionalCaries_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                            type="number" step="1" 
                                                                            maxLength="2"
                                                                            onInput={maxLengthCheck}
                                                                            min={CODSFieldLength.numberOfTeethWithIncisionalCariesMin} 
                                                                            max={CODSFieldLength.numberOfTeethWithIncisionalCariesMax}/>
                                                </div>
                                                </div>
                                        </FadeIn>
                                    </div>
                    </div>
                </div>
                </div>


                <div className="row">
                <div className="col-md-12"> 
                        <div className="block block-inclusion-criteria-head no-pad">
                                    <div className="block-content-no-border row">
                                        <FadeIn>
                                        <div className="form-group row">
                                            <label htmlFor="numberOfTeethPresent" className ="control-label col-lg-8 col-md-4 col-sm-12">Number of teeth with cervical or root caries (including recurrent caries)</label>
                                            <div className={classnames('col-lg-2 col-md-4 col-sm-12',{error:
                                                !!this.state.errors.numberOfTeethWithCervicalOrRootCaries || 
                                                !!this.state.errors.numberOfTeethWithCervicalOrRootCariesRange ||
                                                !!this.state.errors.numberOfTeethWithCervicalOrRootCariesInvalidNumber })}>

                                                    <input  className="form-control" 
                                                                            disabled={this.props.visitHeaderResult && 
                                                                            this.props.visitHeaderResult.data && 
                                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                                            id="numberOfTeethWithCervicalOrRootCaries"
                                                                            name="numberOfTeethWithCervicalOrRootCaries" 
                                                                            ref="numberOfTeethWithCervicalOrRootCaries" 
                                                                            placeholder="00"
                                                                            value={this.state.numberOfTeethWithCervicalOrRootCaries}
                                                                            onChange={this.numberOfTeethWithCervicalOrRootCaries_onChange}
                                                                            onKeyPress={this.numberOfTeethWithCervicalOrRootCaries_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                                            type="number" step="1" 
                                                                            maxLength="2"
                                                                            onInput={maxLengthCheck}
                                                                            min={CODSFieldLength.numberOfTeethWithWithCervicalOrRootCariesMin} 
                                                                            max={CODSFieldLength.numberOfTeethWithWithCervicalOrRootCariesMax}/>
                                                </div>
                                                </div>
                                        </FadeIn>
                                    </div>
                    </div>
                </div>
                </div>





                <div className="row">
                <div className="col-md-12"> 
               

                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                <FadeIn>

                                <FunkyRadioTwoOptionsCODS caption={"Salivary gland tenderness"}
                                                optionName={"salivaryGlandTenderness"}
                                                optionOneId={"optSalivaryGlandTendernessYes"}
                                                optionTwoId={"optSalivaryGlandTendernessNo"}

                                                optionOneClass={"danger"}
                                                optionTwoClass={"success"}

                                                optionOneHtmlFor={"optSalivaryGlandTendernessYes"}
                                                optionTwoHtmlFor={"optSalivaryGlandTendernessNo"}
                                                    optionOneChecked={this.state.salivaryGlandTenderness == getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.salivaryGlandTenderness_onChange}
                                                    optionOneCaption={getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.salivaryGlandTenderness == getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.salivaryGlandTenderness_onChange}
                                                    optionTwoCaption={getControlValues(CODS.rbtListSalivaryGlandTenderness.controlId,this.state.visitControls)[1].controlValue}
                                                     />
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

 export default ClinicalOralDrynessScoreForm;

