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
import {getTotalWeighting} from '../../components/visit/modules/functions';

import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../config/controls/american-european-cgc';

import {paths} from '../../constants/paths/environment';


import {ESSDAI} from '../../config/controls/essdai';


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
import FunkyRadioThreeOptionsESSDAI from '../../components/generic/radio/essdai/funky-radio-three-options-essdai';
import FunkyRadioFourOptionsESSDAI from '../../components/generic/radio/essdai/funky-radio-four-options-essdai';
import {ESSDAISTATICFIELDS} from '../../config/static/essdai';
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

class ESSDAIForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         

         
            createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
            createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
            lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
            lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
         
            
            totalWeighting: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtTotalWeighting,this.props.visitResult.data.details):null,         
            visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          



           constitutionalDomainSelectedWeighting :
           this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
           getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtConstitutionalDomainSelectedWeighting,this.props.visitResult.data.details):null,    
           

          

            constitutionalDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,

            constitutionalDomainOpen :false,


            lymphadenopathyDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtLymphadenopathyDomainSelectedWeighting,this.props.visitResult.data.details):null,    
           

          
            lymphadenopathyDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,

            lymphadenopathyDomainOpen :false,



            glandularDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtGlandularDomainSelectedWeighting,this.props.visitResult.data.details):null,    
           

           
            glandularDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListGlandularDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            glandularDomainOpen :false,


            articularDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtArticularDomainSelectedWeighting,this.props.visitResult.data.details):null,    
        

            articularDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListArticularDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,

            articularDomainOpen :false,
                                    

            cutaneousDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCutaneousDomainSelectedWeighting,this.props.visitResult.data.details):null,

            

            cutaneousDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,

            cutaneousDomainOpen :false,

            respiratoryDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRespiratoryDomainSelectedWeighting,this.props.visitResult.data.details):null,

           

            respiratoryDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            respiratoryDomainOpen :false,

            muscularDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtMuscularDomainSelectedWeighting,this.props.visitResult.data.details):null,

           

            muscularDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListMuscularDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            muscularDomainOpen :false,

            peripheralNervousSystemDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtPeripheralNervousSystemDomainSelectedWeighting,this.props.visitResult.data.details):null,

            

            peripheralNervousSystemDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            peripheralNervousSystemDomainOpen :false,

            centralNervousSystemDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCentralNervousSystemDomainSelectedWeighting,this.props.visitResult.data.details):null,
           
                
            centralNervousSystemDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            centralNervousSystemDomainOpen :false,

            haematologicalDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtHaematologicalDomainSelectedWeighting,this.props.visitResult.data.details):null,

            
            
            haematologicalDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            haematologicalDomainOpen :false,

            biologicalDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtBiologicalDomainSelectedWeighting,this.props.visitResult.data.details):null,
            
        
            biologicalDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            biologicalDomainOpen :false,


            renalDomainSelectedWeighting :
            this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? 
            getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRenalDomainSelectedWeighting,this.props.visitResult.data.details):null,

    
            renalDomain:
                this.props.visitResult && 
                this.props.visitResult.data && 
                this.props.visitResult.data.visits && 
                this.props.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue_V2(categories.eSSDAI.id, 
                        getControlValues(ESSDAI.rbtListRenalDomain.controlId,
                            getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                            this.props.visitResult.data.visits):null,
            renalDomainOpen :false,

            changed:false,
            errors:{},
            /*Every visit should have start */
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
            /*Every visit should have end*/
          };        

            this.constitutionalDomain_onChange = this.constitutionalDomain_onChange.bind(this);        
            this.constitutionalDomain_Toggle = this.constitutionalDomain_Toggle.bind(this);

            this.lymphadenopathyDomain_onChange = this.lymphadenopathyDomain_onChange.bind(this);        
            this.lymphadenopathyDomain_Toggle = this.lymphadenopathyDomain_Toggle.bind(this)

            this.glandularDomain_onChange = this.glandularDomain_onChange.bind(this);        
            this.glandularDomain_Toggle = this.glandularDomain_Toggle.bind(this);

            this.articularDomain_onChange = this.articularDomain_onChange.bind(this);        
            this.articularDomain_Toggle = this.articularDomain_Toggle.bind(this);

            this.cutaneousDomain_onChange = this.cutaneousDomain_onChange.bind(this);        
            this.cutaneousDomain_Toggle = this.cutaneousDomain_Toggle.bind(this);

            this.respiratoryDomain_onChange = this.respiratoryDomain_onChange.bind(this);        
            this.respiratoryDomain_Toggle = this.respiratoryDomain_Toggle.bind(this);

            this.muscularDomain_onChange = this.muscularDomain_onChange.bind(this);        
            this.muscularDomain_Toggle = this.muscularDomain_Toggle.bind(this);

            this.peripheralNervousSystemDomain_onChange = this.peripheralNervousSystemDomain_onChange.bind(this);        
            this.peripheralNervousSystemDomain_Toggle = this.peripheralNervousSystemDomain_Toggle.bind(this);
                                    
            this.centralNervousSystemDomain_onChange = this.centralNervousSystemDomain_onChange.bind(this);        
            this.centralNervousSystemDomain_Toggle = this.centralNervousSystemDomain_Toggle.bind(this);

            this.haematologicalDomain_onChange = this.haematologicalDomain_onChange.bind(this);        
            this.haematologicalDomain_Toggle = this.haematologicalDomain_Toggle.bind(this);

            this.biologicalDomain_onChange = this.biologicalDomain_onChange.bind(this);        
            this.biologicalDomain_Toggle = this.biologicalDomain_Toggle.bind(this);

            this.renalDomain_onChange = this.renalDomain_onChange.bind(this);        
            this.renalDomain_Toggle = this.renalDomain_Toggle.bind(this);
            

            this.renderCurrentESSDAIScore = this.renderCurrentESSDAIScore.bind(this);
            this.renderWeightingDetails = this.renderWeightingDetails.bind(this);
            this.renderWeightingScore = this.renderWeightingScore.bind(this);

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

    }

        // this.setState((prevState, props)=>({
        //     constitutionalDomain:e.target.value,
        //     changed:prevState.constitutionalDomain != e.target.value,
        // }))



    constitutionalDomain_Toggle(){
        this.setState({
            constitutionalDomainOpen:!this.state.constitutionalDomainOpen
        })
    }

    constitutionalDomain_onChange(e){
       


        if (this.state.constitutionalDomain == e.target.value) {

            this.setState({
                constitutionalDomain:null,
                changed:true,
                constitutionalDomainSelectedWeighting : null,//parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting)),
                totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.articularDomain == undefined &&
                                this.state.cutaneousDomain == undefined &&
                                this.state.respiratoryDomain == undefined &&
                                this.state.muscularDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.haematologicalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.constitutionalDomainSelectedWeighting != undefined) ?
                parseInt(this.state.totalWeighting) - parseInt(this.state.constitutionalDomainSelectedWeighting) : null
            })
        }
        else {
            this.setState({
                constitutionalDomain: e.target.value,
                changed:this.state.constitutionalDomain != e.target.value,
                constitutionalDomainSelectedWeighting : parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting)),
                totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                    this.state.constitutionalDomainSelectedWeighting && parseInt(this.state.constitutionalDomainSelectedWeighting) >= 0 ? 
                                        (parseInt(this.state.totalWeighting) - parseInt(this.state.constitutionalDomainSelectedWeighting)) + parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting)) :
                                        parseInt(this.state.totalWeighting) + parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting)) : 
                                        parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting))
            })
    }
    }

    lymphadenopathyDomain_Toggle(){
        this.setState({
            lymphadenopathyDomainOpen:!this.state.lymphadenopathyDomainOpen
        })
    }

    lymphadenopathyDomain_onChange(e){

        if (this.state.lymphadenopathyDomain == e.target.value) {

            this.setState({
                lymphadenopathyDomain:null,
                changed:true,
                lymphadenopathyDomainSelectedWeighting :  null,
                totalWeighting:  (this.state.constitutionalDomain == undefined &&
                                    this.state.glandularDomain == undefined &&
                                    this.state.articularDomain == undefined &&
                                    this.state.cutaneousDomain == undefined &&
                                    this.state.respiratoryDomain == undefined &&
                                    this.state.muscularDomain == undefined && 
                                    this.state.peripheralNervousSystemDomain == undefined &&
                                    this.state.centralNervousSystemDomain == undefined &&
                                    this.state.haematologicalDomain == undefined &&
                                    this.state.biologicalDomain == undefined &&
                                    this.state.renalDomain == undefined ) ? null:
                                    (this.state.totalWeighting != undefined && this.state.lymphadenopathyDomainSelectedWeighting != undefined) ?
                                     parseInt(this.state.totalWeighting) - parseInt(this.state.lymphadenopathyDomainSelectedWeighting) : null

            })

        }
        else {
                this.setState({
                    lymphadenopathyDomain:e.target.value,
                    changed:this.state.lymphadenopathyDomain != e.target.value,
                    lymphadenopathyDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting)),
                    totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                        this.state.lymphadenopathyDomainSelectedWeighting && parseInt(this.state.lymphadenopathyDomainSelectedWeighting) >= 0 ? 
                                            ( parseInt(this.state.totalWeighting) -  parseInt(this.state.lymphadenopathyDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting)) :
                                            parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting)) : 
                                            parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting))
                })
            }
    }



glandularDomain_Toggle(){
    this.setState({
        glandularDomainOpen:!this.state.glandularDomainOpen
    })
}

glandularDomain_onChange(e){

    if (this.state.glandularDomain == e.target.value){
        this.setState({
            glandularDomain:null,
            changed:true,
            glandularDomainSelectedWeighting :  null,
            totalWeighting: (this.state.constitutionalDomain == undefined &&
                            this.state.lymphadenopathyDomain == undefined &&
                            this.state.articularDomain == undefined &&
                            this.state.cutaneousDomain == undefined &&
                            this.state.respiratoryDomain == undefined &&
                            this.state.muscularDomain == undefined && 
                            this.state.peripheralNervousSystemDomain == undefined &&
                            this.state.centralNervousSystemDomain == undefined &&
                            this.state.haematologicalDomain == undefined &&
                            this.state.biologicalDomain == undefined &&
                            this.state.renalDomain == undefined ) ? null:
                            (this.state.totalWeighting != undefined && this.state.glandularDomainSelectedWeighting != undefined) ?
                             parseInt(this.state.totalWeighting) - parseInt(this.state.glandularDomainSelectedWeighting) : null       
        })
    }
else {
    this.setState({
        glandularDomain:e.target.value,
        changed:this.state.glandularDomain != e.target.value,
        glandularDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting)),
        totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                            this.state.glandularDomainSelectedWeighting && parseInt(this.state.glandularDomainSelectedWeighting) >= 0? 
                                ( parseInt(this.state.totalWeighting) - parseInt(this.state.glandularDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting)) :
                                parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting)) : 
                                parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting))
    })
}
}



articularDomain_Toggle(){
    this.setState({
        articularDomainOpen:!this.state.articularDomainOpen
    })
}

articularDomain_onChange(e){
    if (this.state.articularDomain == e.target.value) {
        this.setState({
            articularDomain:null,
            changed:true,
            articularDomainSelectedWeighting :  null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.constitutionalDomain == undefined &&
                                this.state.cutaneousDomain == undefined &&
                                this.state.respiratoryDomain == undefined &&
                                this.state.muscularDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.haematologicalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.articularDomainSelectedWeighting != undefined) ?
                                 parseInt(this.state.totalWeighting) - parseInt(this.state.articularDomainSelectedWeighting) : null                              
        })
    }
    else {
        this.setState({
            articularDomain:e.target.value,
            changed:this.state.articularDomain != e.target.value,
            articularDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.articularDomainSelectedWeighting && parseInt(this.state.articularDomainSelectedWeighting) >= 0 ? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.articularDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting))
        })
    }

}

cutaneousDomain_Toggle(){
    this.setState({
        cutaneousDomainOpen:!this.state.cutaneousDomainOpen
    })
}

cutaneousDomain_onChange(e){
  
    if (this.state.cutaneousDomain == e.target.value ){
        this.setState({
            cutaneousDomain:null,
            changed:true,
            cutaneousDomainSelectedWeighting :  null,
            totalWeighting: 
                            (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.articularDomain == undefined &&
                                this.state.constitutionalDomain == undefined &&
                                this.state.respiratoryDomain == undefined &&
                                this.state.muscularDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.haematologicalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.cutaneousDomainSelectedWeighting != undefined) ?
                                 parseInt(this.state.totalWeighting) - parseInt(this.state.cutaneousDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            cutaneousDomain:e.target.value,
            changed:this.state.cutaneousDomain != e.target.value,
            cutaneousDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.cutaneousDomainSelectedWeighting && parseInt(this.state.cutaneousDomainSelectedWeighting) >= 0? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.cutaneousDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting))
        })
    }

}

respiratoryDomain_Toggle(){
    this.setState({
        respiratoryDomainOpen:!this.state.respiratoryDomainOpen
    })
}

respiratoryDomain_onChange(e){
    if (this.state.respiratoryDomain == e.target.value) {
        this.setState({
            respiratoryDomain:null,
            changed:true,
            respiratoryDomainSelectedWeighting :  null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.articularDomain == undefined &&
                                this.state.cutaneousDomain == undefined &&
                                this.state.constitutionalDomain == undefined &&
                                this.state.muscularDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.haematologicalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.respiratoryDomainSelectedWeighting != undefined) ?
                                 parseInt(this.state.totalWeighting) - parseInt(this.state.respiratoryDomainSelectedWeighting) : null
                            
        })
    }
    else {
        this.setState({
            respiratoryDomain:e.target.value,
            changed:this.state.respiratoryDomain != e.target.value,
            respiratoryDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.respiratoryDomainSelectedWeighting && parseInt(this.state.respiratoryDomainSelectedWeighting) >= 0? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.respiratoryDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting)):
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting))
        })
    }
}

muscularDomain_Toggle(){
    this.setState({
        muscularDomainOpen:!this.state.muscularDomainOpen
    })
}

muscularDomain_onChange(e){
    if (this.state.muscularDomain == e.target.value){
        this.setState({
            muscularDomain:null,
            changed:true,
            muscularDomainSelectedWeighting :  null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.articularDomain == undefined &&
                                this.state.cutaneousDomain == undefined &&
                                this.state.respiratoryDomain == undefined &&
                                this.state.constitutionalDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.haematologicalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.muscularDomainSelectedWeighting != undefined) ?
                                 parseInt(this.state.totalWeighting) - parseInt(this.state.muscularDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            muscularDomain:e.target.value,
            changed:this.state.muscularDomain != e.target.value,
            muscularDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.muscularDomainSelectedWeighting && parseInt(this.state.muscularDomainSelectedWeighting) >= 0 ? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.muscularDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting))
        })
    }
    
}

peripheralNervousSystemDomain_Toggle(){
    this.setState({
        peripheralNervousSystemDomainOpen:!this.state.peripheralNervousSystemDomainOpen
    })
}

peripheralNervousSystemDomain_onChange(e){
    if (this.state.peripheralNervousSystemDomain == e.target.value){
        this.setState({
            peripheralNervousSystemDomain:null,
            changed:true,
            peripheralNervousSystemDomainSelectedWeighting :  null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                            this.state.glandularDomain == undefined &&
                            this.state.articularDomain == undefined &&
                            this.state.cutaneousDomain == undefined &&
                            this.state.respiratoryDomain == undefined &&
                            this.state.muscularDomain == undefined && 
                            this.state.constitutionalDomain == undefined &&
                            this.state.centralNervousSystemDomain == undefined &&
                            this.state.haematologicalDomain == undefined &&
                            this.state.biologicalDomain == undefined &&
                            this.state.renalDomain == undefined ) ? null:
                            (this.state.totalWeighting != undefined && this.state.peripheralNervousSystemDomainSelectedWeighting != undefined) ?
                             parseInt(this.state.totalWeighting) - parseInt(this.state.peripheralNervousSystemDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            peripheralNervousSystemDomain:e.target.value,
            changed:this.state.peripheralNervousSystemDomain != e.target.value,
            peripheralNervousSystemDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.peripheralNervousSystemDomainSelectedWeighting && parseInt(this.state.peripheralNervousSystemDomainSelectedWeighting) >= 0 ? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.peripheralNervousSystemDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting))
        })
    }

}



centralNervousSystemDomain_Toggle(){
    this.setState({
        centralNervousSystemDomainOpen:!this.state.centralNervousSystemDomainOpen
    })
}

centralNervousSystemDomain_onChange(e){
   // console.log('centralNervousSystemDomain_onChange')    
   // console.log(e.target.value)
   // console.log(this.state.centralNervousSystemDomain == e.target.value)
    if (this.state.centralNervousSystemDomain == e.target.value){

        this.setState({
            centralNervousSystemDomain:null,
            changed:true,
            centralNervousSystemDomainSelectedWeighting : null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                            this.state.glandularDomain == undefined &&
                            this.state.articularDomain == undefined &&
                            this.state.cutaneousDomain == undefined &&
                            this.state.respiratoryDomain == undefined &&
                            this.state.muscularDomain == undefined && 
                            this.state.peripheralNervousSystemDomain == undefined &&
                            this.state.constitutionalDomain == undefined &&
                            this.state.haematologicalDomain == undefined &&
                            this.state.biologicalDomain == undefined &&
                            this.state.renalDomain == undefined ) ? null:
                            (this.state.totalWeighting != undefined && this.state.centralNervousSystemDomainSelectedWeighting != undefined) ?
                             parseInt(this.state.totalWeighting) - parseInt(this.state.centralNervousSystemDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            centralNervousSystemDomain:e.target.value,
            changed:this.state.centralNervousSystemDomain != e.target.value,
            centralNervousSystemDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.centralNervousSystemDomainSelectedWeighting && parseInt(this.state.centralNervousSystemDomainSelectedWeighting) >= 0? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.centralNervousSystemDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting))
        })
    }

}

haematologicalDomain_Toggle(){
    this.setState({
        haematologicalDomainOpen:!this.state.haematologicalDomainOpen
    })
}

haematologicalDomain_onChange(e){
    if (this.state.haematologicalDomain == e.target.value) {
        this.setState({
            haematologicalDomain:null,
            changed:true,
            haematologicalDomainSelectedWeighting : null,
            totalWeighting:  
                            (this.state.lymphadenopathyDomain == undefined &&
                                this.state.glandularDomain == undefined &&
                                this.state.articularDomain == undefined &&
                                this.state.cutaneousDomain == undefined &&
                                this.state.respiratoryDomain == undefined &&
                                this.state.muscularDomain == undefined && 
                                this.state.peripheralNervousSystemDomain == undefined &&
                                this.state.centralNervousSystemDomain == undefined &&
                                this.state.constitutionalDomain == undefined &&
                                this.state.biologicalDomain == undefined &&
                                this.state.renalDomain == undefined ) ? null:
                                (this.state.totalWeighting != undefined && this.state.haematologicalDomainSelectedWeighting != undefined) ?
                                 parseInt(this.state.totalWeighting) - parseInt(this.state.haematologicalDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            haematologicalDomain:e.target.value,
            changed:this.state.haematologicalDomain != e.target.value,
            haematologicalDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.haematologicalDomainSelectedWeighting && parseInt(this.state.haematologicalDomainSelectedWeighting) >= 0? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.haematologicalDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting))
        })
    }

}

biologicalDomain_Toggle(){
    this.setState({
        biologicalDomainOpen:!this.state.biologicalDomainOpen
    })
}

biologicalDomain_onChange(e){
    if (this.state.biologicalDomain == e.target.value){
        this.setState({
            biologicalDomain:null,
            changed:true,
            biologicalDomainSelectedWeighting : null,
            totalWeighting: (this.state.lymphadenopathyDomain == undefined &&
                            this.state.glandularDomain == undefined &&
                            this.state.articularDomain == undefined &&
                            this.state.cutaneousDomain == undefined &&
                            this.state.respiratoryDomain == undefined &&
                            this.state.muscularDomain == undefined && 
                            this.state.peripheralNervousSystemDomain == undefined &&
                            this.state.centralNervousSystemDomain == undefined &&
                            this.state.haematologicalDomain == undefined &&
                            this.state.constitutionalDomain == undefined &&
                            this.state.renalDomain == undefined ) ? null:
                            (this.state.totalWeighting != undefined && this.state.biologicalDomainSelectedWeighting != undefined) ?
                             parseInt(this.state.totalWeighting) - parseInt(this.state.biologicalDomainSelectedWeighting) : null
        })
    }
    else {
        this.setState({
            biologicalDomain:e.target.value ,
            changed:this.state.biologicalDomain != e.target.value,
            biologicalDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.biologicalDomainSelectedWeighting  && parseInt(this.state.biologicalDomainSelectedWeighting) >= 0 ? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.biologicalDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting))
        })
    }

}

renalDomain_Toggle(){
    this.setState({
        renalDomainOpen:!this.state.renalDomainOpen
    })
}

renalDomain_onChange(e){
    if (this.state.renalDomain == e.target.value) {
        this.setState({
            renalDomain:null,
            changed:true,
            renalDomainSelectedWeighting :  null,
            totalWeighting:  (this.state.lymphadenopathyDomain == undefined &&
                            this.state.glandularDomain == undefined &&
                            this.state.articularDomain == undefined &&
                            this.state.cutaneousDomain == undefined &&
                            this.state.respiratoryDomain == undefined &&
                            this.state.muscularDomain == undefined && 
                            this.state.peripheralNervousSystemDomain == undefined &&
                            this.state.centralNervousSystemDomain == undefined &&
                            this.state.haematologicalDomain == undefined &&
                            this.state.biologicalDomain == undefined &&
                            this.state.constitutionalDomain == undefined ) ? null:
                            (this.state.totalWeighting != undefined && this.state.renalDomainSelectedWeighting != undefined) ?
                             parseInt(this.state.totalWeighting) - parseInt(this.state.renalDomainSelectedWeighting) : null

                           
        })
    }
    else {
        this.setState({
            renalDomain:e.target.value,
            changed:this.state.renalDomain != e.target.value,
            renalDomainSelectedWeighting :  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting)),
            totalWeighting: this.state.totalWeighting && parseInt(this.state.totalWeighting) >= 0?
                                this.state.renalDomainSelectedWeighting && parseInt(this.state.renalDomainSelectedWeighting) >= 0? 
                                    ( parseInt(this.state.totalWeighting) - parseInt(this.state.renalDomainSelectedWeighting)) +  parseInt(getTotalWeighting(e.target.value, ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting)) :
                                    parseInt(this.state.totalWeighting) +  parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting)) : 
                                    parseInt(getTotalWeighting(e.target.value,  ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting))
        })
    }

}





    

   
    validateVisit(){
        let errors = {};
      
            
      
       this.setState({errors});  

        return errors
    }


    getVisitValues(){
        var visit = []


        if (this.state.constitutionalDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.constitutionalDomain,
                    controlId:
                    this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[2].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
        
                }
            )
        }


        if (this.state.lymphadenopathyDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.lymphadenopathyDomain,
                    controlId:
                    this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[2].controlId :
                    this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
        
                }
            )
        }
      
        if (this.state.glandularDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.glandularDomain,
                    controlId:
                    this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[2].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }


        if (this.state.articularDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.articularDomain,
                    controlId:
                    this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[2].controlId :
                    this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
        
                }
            )
        }


        if (this.state.cutaneousDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.cutaneousDomain,
                    controlId:
                    this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
        
                }
            )
        }


        if (this.state.respiratoryDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.respiratoryDomain,
                    controlId:
                    this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }

        if (this.state.muscularDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.muscularDomain,
                    controlId:
                    this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }

        if (this.state.peripheralNervousSystemDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.peripheralNervousSystemDomain,
                    controlId:
                    this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }


        if (this.state.centralNervousSystemDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.centralNervousSystemDomain,
                    controlId:
                    this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }


        if (this.state.haematologicalDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.haematologicalDomain,
                    controlId:
                    this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }

        if (this.state.biologicalDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.biologicalDomain,
                    controlId:
                    this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
                }
            )
        }

        if (this.state.renalDomain){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.renalDomain,
                    controlId:
                    this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[0].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[0].controlId:
                    this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[1].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[1].controlId :    
                    this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[2].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[2].controlId :   
                    this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[3].controlValueId ? 
                        getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[3].controlId :
                    0,
                    categoryId:   categories.eSSDAI.id   
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
   // }

   if (this.state.totalWeighting || parseInt(this.state.totalWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.totalWeighting,
            controlId:ESSDAI.txtTotalWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
   }

    if (this.state.constitutionalDomainSelectedWeighting || parseInt(this.state.constitutionalDomainSelectedWeighting) >= 0){
        detail.push(
            {
                visitHeaderId:this.props.visitHeaderId,
                value:this.state.constitutionalDomainSelectedWeighting,
                controlId:ESSDAI.txtConstitutionalDomainSelectedWeighting.controlId, 
                categoryId:   categories.eSSDAI.id   
    
            }
        )
 }
/* start */
 if (this.state.lymphadenopathyDomainSelectedWeighting || parseInt(this.state.lymphadenopathyDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.lymphadenopathyDomainSelectedWeighting,
            controlId:ESSDAI.txtLymphadenopathyDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}

if (this.state.glandularDomainSelectedWeighting || parseInt(this.state.glandularDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.glandularDomainSelectedWeighting,
            controlId:ESSDAI.txtGlandularDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
if (this.state.articularDomainSelectedWeighting || parseInt(this.state.articularDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.articularDomainSelectedWeighting,
            controlId:ESSDAI.txtArticularDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}

if (this.state.cutaneousDomainSelectedWeighting || parseInt(this.state.cutaneousDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.cutaneousDomainSelectedWeighting,
            controlId:ESSDAI.txtCutaneousDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
if (this.state.respiratoryDomainSelectedWeighting || parseInt(this.state.respiratoryDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.respiratoryDomainSelectedWeighting,
            controlId:ESSDAI.txtRespiratoryDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
if (this.state.muscularDomainSelectedWeighting || parseInt(this.state.muscularDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.muscularDomainSelectedWeighting,
            controlId:ESSDAI.txtMuscularDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}

if (this.state.peripheralNervousSystemDomainSelectedWeighting || parseInt(this.state.peripheralNervousSystemDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.peripheralNervousSystemDomainSelectedWeighting,
            controlId:ESSDAI.txtPeripheralNervousSystemDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}


if (this.state.centralNervousSystemDomainSelectedWeighting || parseInt(this.state.centralNervousSystemDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.centralNervousSystemDomainSelectedWeighting,
            controlId:ESSDAI.txtCentralNervousSystemDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}

if (this.state.haematologicalDomainSelectedWeighting || parseInt(this.state.haematologicalDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.haematologicalDomainSelectedWeighting,
            controlId:ESSDAI.txtHaematologicalDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
if (this.state.biologicalDomainSelectedWeighting || parseInt(this.state.biologicalDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.biologicalDomainSelectedWeighting,
            controlId:ESSDAI.txtBiologicalDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
    
if (this.state.renalDomainSelectedWeighting || parseInt(this.state.renalDomainSelectedWeighting) >= 0){
    detail.push(
        {
            visitHeaderId:this.props.visitHeaderId,
            value:this.state.renalDomainSelectedWeighting,
            controlId:ESSDAI.txtRenalDomainSelectedWeighting.controlId, 
            categoryId:   categories.eSSDAI.id   

        }
    )
}
//console.log('detail')
//console.log(detail)
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
    this.props.handleSaveVisitHeader(visit, detail,categories.eSSDAI.id);
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

        this.props.handleCompleteVisitHeader(visit, detail,categories.eSSDAI.id);
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
                

                // totalWeighting: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtTotalWeighting,nextProps.visitResult.data.details):null,         
                

                // visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues && nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          
                

                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
             


/*start */

totalWeighting: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtTotalWeighting,nextProps.visitResult.data.details):null,         
visitControls: nextProps.visitControlValuesResult && nextProps.visitControlValuesResult.data && nextProps.visitControlValuesResult.data.visitControlValues && nextProps.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues) : null,          




constitutionalDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtConstitutionalDomainSelectedWeighting,nextProps.visitResult.data.details):null,    

/*
constitutionalDomainSelectedWeighting:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getTotalWeighting(
        getVisitOptionControlValue(categories.eSSDAI.id,
                getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,
                    getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                        nextProps.visitResult.data.visits)
        , ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting) :null,
*/

constitutionalDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,

constitutionalDomainOpen :false,


lymphadenopathyDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtLymphadenopathyDomainSelectedWeighting,nextProps.visitResult.data.details):null,    


// lymphadenopathyDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting) :null,

lymphadenopathyDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,

lymphadenopathyDomainOpen :false,


glandularDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtGlandularDomainSelectedWeighting,nextProps.visitResult.data.details):null,    


// glandularDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListGlandularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting) :null,

glandularDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListGlandularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
glandularDomainOpen :false,

articularDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtArticularDomainSelectedWeighting,nextProps.visitResult.data.details):null,    


// articularDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListArticularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting) :null,


articularDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListArticularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,

articularDomainOpen :false,
      

cutaneousDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCutaneousDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// cutaneousDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting) :null,


cutaneousDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,

cutaneousDomainOpen :false,

respiratoryDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRespiratoryDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// respiratoryDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting) :null,


respiratoryDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
respiratoryDomainOpen :false,


muscularDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtMuscularDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// muscularDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListMuscularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting) :null,

muscularDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListMuscularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
muscularDomainOpen :false,

peripheralNervousSystemDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtPeripheralNervousSystemDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// peripheralNervousSystemDomainSelectedWeighting:
// nextProps.visitResult && 
// nextProps.visitResult.data && 
// nextProps.visitResult.data.visits && 
// nextProps.visitResult.data.visits.length > 0 ? 
// getTotalWeighting(
//     getVisitOptionControlValue(categories.eSSDAI.id,
//             getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,
//                 getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                     nextProps.visitResult.data.visits)
//     , ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting) :null,


peripheralNervousSystemDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
peripheralNervousSystemDomainOpen :false,


centralNervousSystemDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCentralNervousSystemDomainSelectedWeighting,nextProps.visitResult.data.details):null,


// centralNervousSystemDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting) :null,

    
centralNervousSystemDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
centralNervousSystemDomainOpen :false,


haematologicalDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtHaematologicalDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// haematologicalDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting) :null,


haematologicalDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
haematologicalDomainOpen :false,


biologicalDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtBiologicalDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// biologicalDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting) :null,


biologicalDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
biologicalDomainOpen :false,


renalDomainSelectedWeighting :
nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRenalDomainSelectedWeighting,nextProps.visitResult.data.details):null,

// renalDomainSelectedWeighting:
//     nextProps.visitResult && 
//     nextProps.visitResult.data && 
//     nextProps.visitResult.data.visits && 
//     nextProps.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListRenalDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
//                         nextProps.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting) :null,


renalDomain:
    nextProps.visitResult && 
    nextProps.visitResult.data && 
    nextProps.visitResult.data.visits && 
    nextProps.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListRenalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, nextProps.visitControlValuesResult.data.visitControlValues)),
                nextProps.visitResult.data.visits):null,
renalDomainOpen :false,

/*end */




                changed:false,
                
        })

       


      }




    componentDidMount () {
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',            
                patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',
             
                patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         
                

                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,




/*start */

totalWeighting: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtTotalWeighting,this.props.visitResult.data.details):null,         
visitControls: this.props.visitControlValuesResult && this.props.visitControlValuesResult.data && this.props.visitControlValuesResult.data.visitControlValues && this.props.visitControlValuesResult.data.visitControlValues.length > 0 ? getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues) : null,          

constitutionalDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtConstitutionalDomainSelectedWeighting,this.props.visitResult.data.details):null,    


/*
constitutionalDomainSelectedWeighting:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getTotalWeighting(
        getVisitOptionControlValue(categories.eSSDAI.id,
                getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,
                    getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                        this.props.visitResult.data.visits)
        , ESSDAISTATICFIELDS.constitutionalDomain.weightingArray,ESSDAISTATICFIELDS.constitutionalDomain.weighting) :null,
*/

constitutionalDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,

constitutionalDomainOpen :false,



lymphadenopathyDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtLymphadenopathyDomainSelectedWeighting,this.props.visitResult.data.details):null,    


// lymphadenopathyDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingArray,ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting) :null,

lymphadenopathyDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,

lymphadenopathyDomainOpen :false,


glandularDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtGlandularDomainSelectedWeighting,this.props.visitResult.data.details):null,    



// glandularDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListGlandularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.glandularDomain.weightingArray,ESSDAISTATICFIELDS.glandularDomain.weighting) :null,

glandularDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListGlandularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
glandularDomainOpen :false,

articularDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtArticularDomainSelectedWeighting,this.props.visitResult.data.details):null,    


// articularDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListArticularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.articularDomain.weightingArray,ESSDAISTATICFIELDS.articularDomain.weighting) :null,


articularDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListArticularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,

articularDomainOpen :false,
      

cutaneousDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCutaneousDomainSelectedWeighting,this.props.visitResult.data.details):null,


// cutaneousDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.cutaneousDomain.weightingArray,ESSDAISTATICFIELDS.cutaneousDomain.weighting) :null,


cutaneousDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,

cutaneousDomainOpen :false,



respiratoryDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRespiratoryDomainSelectedWeighting,this.props.visitResult.data.details):null,



// respiratoryDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.respiratoryDomain.weightingArray,ESSDAISTATICFIELDS.respiratoryDomain.weighting) :null,


respiratoryDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
respiratoryDomainOpen :false,


muscularDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtMuscularDomainSelectedWeighting,this.props.visitResult.data.details):null,

// muscularDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListMuscularDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.muscularDomain.weightingArray,ESSDAISTATICFIELDS.muscularDomain.weighting) :null,

muscularDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListMuscularDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
muscularDomainOpen :false,

peripheralNervousSystemDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtPeripheralNervousSystemDomainSelectedWeighting,this.props.visitResult.data.details):null,

// peripheralNervousSystemDomainSelectedWeighting:
// this.props.visitResult && 
// this.props.visitResult.data && 
// this.props.visitResult.data.visits && 
// this.props.visitResult.data.visits.length > 0 ? 
// getTotalWeighting(
//     getVisitOptionControlValue(categories.eSSDAI.id,
//             getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,
//                 getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                     this.props.visitResult.data.visits)
//     , ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting) :null,


peripheralNervousSystemDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
peripheralNervousSystemDomainOpen :false,

centralNervousSystemDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtCentralNervousSystemDomainSelectedWeighting,this.props.visitResult.data.details):null,

// centralNervousSystemDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingArray,ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting) :null,

    
centralNervousSystemDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
centralNervousSystemDomainOpen :false,

haematologicalDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtHaematologicalDomainSelectedWeighting,this.props.visitResult.data.details):null,


// haematologicalDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.haematologicalDomain.weightingArray,ESSDAISTATICFIELDS.haematologicalDomain.weighting) :null,


haematologicalDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
haematologicalDomainOpen :false,


biologicalDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtBiologicalDomainSelectedWeighting,this.props.visitResult.data.details):null,

// biologicalDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.biologicalDomain.weightingArray,ESSDAISTATICFIELDS.biologicalDomain.weighting) :null,


biologicalDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
biologicalDomainOpen :false,



renalDomainSelectedWeighting :
this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? 
getDetailsControlValue(categories.eSSDAI.id, ESSDAI.txtRenalDomainSelectedWeighting,this.props.visitResult.data.details):null,

// renalDomainSelectedWeighting:
//     this.props.visitResult && 
//     this.props.visitResult.data && 
//     this.props.visitResult.data.visits && 
//     this.props.visitResult.data.visits.length > 0 ? 
//     getTotalWeighting(
//         getVisitOptionControlValue(categories.eSSDAI.id,
//                 getControlValues(ESSDAI.rbtListRenalDomain.controlId,
//                     getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
//                         this.props.visitResult.data.visits)
//         , ESSDAISTATICFIELDS.renalDomain.weightingArray,ESSDAISTATICFIELDS.renalDomain.weighting) :null,


renalDomain:
    this.props.visitResult && 
    this.props.visitResult.data && 
    this.props.visitResult.data.visits && 
    this.props.visitResult.data.visits.length > 0 ? 
    getVisitOptionControlValue_V2(categories.eSSDAI.id, 
            getControlValues(ESSDAI.rbtListRenalDomain.controlId,
                getCategoryControls(categories.eSSDAI.id, this.props.visitControlValuesResult.data.visitControlValues)),
                this.props.visitResult.data.visits):null,
renalDomainOpen :false,

/*end */



               
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
            <h3 className="panel-title pull-left">ESSDAI</h3>
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
nextCategoryName = {VISIT_CATEGORY_ACTIVITYSCORE}
prevCategoryName = {VISIT_CATEGORY_ESSPRI}
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
                <h3 className="panel-title">ESSDAI</h3>
                
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
    
renderCurrentESSDAIScore(){
    return (
        <div className="row">
            <div className="col-md-offset-9 col-md-2">
                <div className={classnames('alert',{"alert-danger":  
                                    parseInt(this.state.totalWeighting) >= 14,
                                    "alert-warning":
                                    parseInt(this.state.totalWeighting) >=5 && parseInt(this.state.totalWeighting) <= 14,
                                    "alert-success":
                                    parseInt(this.state.totalWeighting) >= 0 && parseInt(this.state.totalWeighting) < 5
                                    }
                                )}>
                                <span className="mr-5">Current ESSDAI Score:</span><strong>{this.state.totalWeighting}</strong>
                </div>
            </div>
        </div>
    )
}


renderEmptyESSDAIScore(){
    return (
        <div className="row">
            <div className="col-md-offset-9 col-md-2">
                <div className='alert alert-info'>
                    {
                        this.props.visitResult && 
                                                                 this.props.visitResult.data && 
                                                                 this.props.visitResult.requestRecieved ? 
                                <span className="mr-5">No ESSDAI Score</span> : <span className="mr-5">Saving...</span>
                    }
                </div>
            </div>
        </div>
    )
}

renderWeightingDetails(weightingDetail){
    return  weightingDetail.map((detail) => {
       return (
            <div className="row row-bordered">
                <div className="col-md-3">
                <strong>{detail.heading}</strong>
                </div>
                <div className="col-md-8"  dangerouslySetInnerHTML={ { __html: detail.description} } >
                </div>
                <div className="col-md-1">
                    <span className="mr-5">Score:</span>
                    <span>
                {detail.weightingValue}
                </span>
                </div>
            </div>
       ) 
    });
}

renderWeightingScore(calculatedWeighting){
    return (
        <span className="ml-5">
        <span className="weighting-header mr-5">Score:</span><span><strong>{calculatedWeighting}</strong></span>        
        </span>
    )
}

renderForm(){


    return (


       <div>
            { 
                
                (this.state.totalWeighting || parseInt(this.state.totalWeighting) >= 0 ) ? 
                    this.renderCurrentESSDAIScore()
                    :this.renderEmptyESSDAIScore()
            }
            <FadeIn>
            <div className="row">
                <div className="col-md-12">
                        <FunkyRadioThreeOptionsESSDAI caption={ESSDAISTATICFIELDS.constitutionalDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneId={"optConstitutionalDomainNoActivity"}
                                                optionTwoId={"optConstitutionalDomainLowActivity"}
                                                optionThreeId={"optConstitutionalDomainModerateActivity"}
                                                optionOneHtmlFor={"optConstitutionalDomainNoActivity"}
                                                optionTwoHtmlFor={"optConstitutionalDomainLowActivity"}
                                                optionThreeHtmlFor={"optConstitutionalDomainModerateActivity"}

                                                    optionOneChecked={this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.constitutionalDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.constitutionalDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.constitutionalDomain == getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.constitutionalDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListConstitutionalDomain.controlId,this.state.visitControls)[2].controlValue}
                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.constitutionalDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.constitutionalDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.constitutionalDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.constitutionalDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.constitutionalDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.constitutionalDomain.weightingDetail.details} 
                                                    renderWeightingScore={this.renderWeightingScore}
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div>            

                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.lymphadenopathyDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                               optionOneId={"optLymphadenopathyDomainNoActivity"}
                                                optionTwoId={"optLymphadenopathyDomainLowActivity"}
                                                optionThreeId={"optLymphadenopathyDomainModerateActivity"}
                                                optionFourId={"optLymphadenopathyDomainHighActivity"}
                                                optionOneHtmlFor={"optLymphadenopathyDomainNoActivity"}
                                                optionTwoHtmlFor={"optLymphadenopathyDomainLowActivity"}
                                                optionThreeHtmlFor={"optLymphadenopathyDomainModerateActivity"}
                                                optionFourHtmlFor={"optLymphadenopathyDomainHighActivity"}

                                                    optionOneChecked={this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.lymphadenopathyDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.lymphadenopathyDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.lymphadenopathyDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.lymphadenopathyDomain == getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.lymphadenopathyDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListLymphadenopathyDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.lymphadenopathyDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.lymphadenopathyDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.lymphadenopathyDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.lymphadenopathyDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.lymphadenopathyDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div>      

                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioThreeOptionsESSDAI caption={ESSDAISTATICFIELDS.glandularDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneId={"optGlandularDomainNoActivity"}
                                                optionTwoId={"optGlandularDomainLowActivity"}
                                                optionThreeId={"optGlandularDomainModerateActivity"}
                                                optionOneHtmlFor={"optGlandularDomainNoActivity"}
                                                optionTwoHtmlFor={"optGlandularDomainLowActivity"}
                                                optionThreeHtmlFor={"optGlandularDomainModerateActivity"}

                                                    optionOneChecked={this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.glandularDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.glandularDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.glandularDomain == getControlValues(ESSDAI.rbtListGlandularDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.glandularDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListGlandularDomain.controlId,this.state.visitControls)[2].controlValue}
                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.glandularDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.glandularDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.glandularDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.glandularDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.glandularDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.glandularDomain.weightingDetail.details} 
                                                    renderWeightingScore={this.renderWeightingScore}
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div>     

                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.articularDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optArticularDomainNoActivity"}
                                                optionTwoId={"optArticularDomainLowActivity"}
                                                optionThreeId={"optArticularDomainModerateActivity"}
                                                optionFourId={"optArticularDomainHighActivity"}
                                                optionOneHtmlFor={"optArticularDomainNoActivity"}
                                                optionTwoHtmlFor={"optArticularDomainLowActivity"}
                                                optionThreeHtmlFor={"optArticularDomainModerateActivity"}
                                                optionFourHtmlFor={"optArticularDomainHighActivity"}

                                                    optionOneChecked={this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.articularDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.articularDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.articularDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.articularDomain == getControlValues(ESSDAI.rbtListArticularDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.articularDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListArticularDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.articularDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.articularDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.articularDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.articularDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.articularDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.articularDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 
                
                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.cutaneousDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optCutaneousDomainNoActivity"}
                                                optionTwoId={"optCutaneousDomainLowActivity"}
                                                optionThreeId={"optCutaneousDomainModerateActivity"}
                                                optionFourId={"optCutaneousDomainHighActivity"}
                                                optionOneHtmlFor={"optCutaneousDomainNoActivity"}
                                                optionTwoHtmlFor={"optCutaneousDomainLowActivity"}
                                                optionThreeHtmlFor={"optCutaneousDomainModerateActivity"}
                                                optionFourHtmlFor={"optCutaneousDomainHighActivity"}

                                                    optionOneChecked={this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.cutaneousDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.cutaneousDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.cutaneousDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.cutaneousDomain == getControlValues(ESSDAI.rbtListCutaneousDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.cutaneousDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListCutaneousDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.cutaneousDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.cutaneousDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.cutaneousDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.cutaneousDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.cutaneousDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.cutaneousDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 


                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.respiratoryDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optRespiratoryDomainNoActivity"}
                                                optionTwoId={"optRespiratoryDomainLowActivity"}
                                                optionThreeId={"optRespiratoryDomainModerateActivity"}
                                                optionFourId={"optRespiratoryDomainHighActivity"}
                                                optionOneHtmlFor={"optRespiratoryDomainNoActivity"}
                                                optionTwoHtmlFor={"optRespiratoryDomainLowActivity"}
                                                optionThreeHtmlFor={"optRespiratoryDomainModerateActivity"}
                                                optionFourHtmlFor={"optRespiratoryDomainHighActivity"}

                                                    optionOneChecked={this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.respiratoryDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.respiratoryDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.respiratoryDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.respiratoryDomain == getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.respiratoryDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListRespiratoryDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.respiratoryDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.respiratoryDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.respiratoryDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.respiratoryDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.respiratoryDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.respiratoryDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 

                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.muscularDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optMuscularDomainNoActivity"}
                                                optionTwoId={"optMuscularDomainLowActivity"}
                                                optionThreeId={"optMuscularDomainModerateActivity"}
                                                optionFourId={"optMuscularDomainHighActivity"}
                                                optionOneHtmlFor={"optMuscularDomainNoActivity"}
                                                optionTwoHtmlFor={"optMuscularDomainLowActivity"}
                                                optionThreeHtmlFor={"optMuscularDomainModerateActivity"}
                                                optionFourHtmlFor={"optMuscularDomainHighActivity"}

                                                    optionOneChecked={this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.muscularDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.muscularDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.muscularDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.muscularDomain == getControlValues(ESSDAI.rbtListMuscularDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.muscularDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListMuscularDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.muscularDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.muscularDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.muscularDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.muscularDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.muscularDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.muscularDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 


                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.peripheralNervousSystemDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optPeripheralNervousSystemDomainNoActivity"}
                                                optionTwoId={"optPeripheralNervousSystemDomainLowActivity"}
                                                optionThreeId={"optPeripheralNervousSystemDomainModerateActivity"}
                                                optionFourId={"optPeripheralNervousSystemDomainHighActivity"}
                                                optionOneHtmlFor={"optPeripheralNervousSystemDomainNoActivity"}
                                                optionTwoHtmlFor={"optPeripheralNervousSystemDomainLowActivity"}
                                                optionThreeHtmlFor={"optPeripheralNervousSystemDomainModerateActivity"}
                                                optionFourHtmlFor={"optPeripheralNervousSystemDomainHighActivity"}

                                                    optionOneChecked={this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.peripheralNervousSystemDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.peripheralNervousSystemDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.peripheralNervousSystemDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.peripheralNervousSystemDomain == getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.peripheralNervousSystemDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListPeripheralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.peripheralNervousSystemDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.peripheralNervousSystemDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.peripheralNervousSystemDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.peripheralNervousSystemDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 


                <div className="row">
                <div className="col-md-12">
                <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.centralNervousSystemDomain.caption}
                captionClass={"col-md-3 page-header"}
                optionsClass={"col-md-6"}
                optionOneDisabled={false}
                optionTwoDisabled={true}
                optionThreeDisabled={false}
                optionFourDisabled={false}

                optionOneId={"optCentralNervousSystemDomainNoActivity"}
                optionTwoId={"optCentralNervousSystemDomainLowActivity"}
                optionThreeId={"optCentralNervousSystemDomainModerateActivity"}
                optionFourId={"optCentralNervousSystemDomainHighActivity"}

                optionOneHtmlFor={"optCentralNervousSystemDomainNoActivity"}
                optionTwoHtmlFor={"optCentralNervousSystemDomainLowActivity"}
                optionThreeHtmlFor={"optCentralNervousSystemDomainModerateActivity"}
                optionFourHtmlFor={"optCentralNervousSystemDomainHighActivity"}
                

                    optionOneChecked={this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId}
                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValueId}
                    optionOneOnClick={this.centralNervousSystemDomain_onChange}
                    optionOneCaption={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[0].controlValue}
                    

                    optionTwoChecked={this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId}
                    optionTwoDefaultValue={ getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValueId}
                    optionTwoOnClick={this.centralNervousSystemDomain_onChange}
                    optionTwoCaption={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[1].controlValue}
                    

                    optionThreeChecked={this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValueId}
                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValueId}
                    optionThreeOnClick={this.centralNervousSystemDomain_onChange}
                    optionThreeCaption={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[2].controlValue}

                    optionFourChecked={this.state.centralNervousSystemDomain == getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId, this.state.visitControls)[3].controlValueId}
                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValueId}
                    optionFourOnClick={this.centralNervousSystemDomain_onChange}
                    optionFourCaption={getControlValues(ESSDAI.rbtListCentralNervousSystemDomain.controlId,this.state.visitControls)[3].controlValue}

                  
                    isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                    isOpen={this.state.centralNervousSystemDomainOpen}
                    showToggle={true}
                    toggle={this.centralNervousSystemDomain_Toggle}
                    weighting={ESSDAISTATICFIELDS.centralNervousSystemDomain.weighting}
                    weightingClass={"col-md-2"}
                    calculatedWeighting={this.state.centralNervousSystemDomainSelectedWeighting}
                    renderWeightingDetails={this.renderWeightingDetails}
                    weightingHeading={ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingDetail.heading} 
                    weightingDetails={ESSDAISTATICFIELDS.centralNervousSystemDomain.weightingDetail.details}
                    renderWeightingScore={this.renderWeightingScore} 
                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 


                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.haematologicalDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optHaematologicalDomainNoActivity"}
                                                optionTwoId={"optHaematologicalDomainLowActivity"}
                                                optionThreeId={"optHaematologicalDomainModerateActivity"}
                                                optionFourId={"optHaematologicalDomainHighActivity"}
                                                optionOneHtmlFor={"optHaematologicalDomainNoActivity"}
                                                optionTwoHtmlFor={"optHaematologicalDomainLowActivity"}
                                                optionThreeHtmlFor={"optHaematologicalDomainModerateActivity"}
                                                optionFourHtmlFor={"optHaematologicalDomainHighActivity"}

                                                    optionOneChecked={this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.haematologicalDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.haematologicalDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.haematologicalDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.haematologicalDomain == getControlValues(ESSDAI.rbtListHaematologyDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.haematologicalDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListHaematologyDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.haematologicalDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.haematologicalDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.haematologicalDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.haematologicalDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.haematologicalDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.haematologicalDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 


                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioThreeOptionsESSDAI caption={ESSDAISTATICFIELDS.biologicalDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneId={"optBiologicalDomainNoActivity"}
                                                optionTwoId={"optBiologicalDomainLowActivity"}
                                                optionThreeId={"optBiologicalDomainModerateActivity"}
                                                optionFourId={"optBiologicalDomainHighActivity"}
                                                optionOneHtmlFor={"optBiologicalDomainNoActivity"}
                                                optionTwoHtmlFor={"optBiologicalDomainLowActivity"}
                                                optionThreeHtmlFor={"optBiologicalDomainModerateActivity"}

                                                    optionOneChecked={this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.biologicalDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.biologicalDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.biologicalDomain == getControlValues(ESSDAI.rbtListBiologicalDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.biologicalDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListBiologicalDomain.controlId,this.state.visitControls)[2].controlValue}

                                                  
                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.biologicalDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.biologicalDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.biologicalDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.biologicalDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.biologicalDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.biologicalDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

                        </div>
                </div> 



                <div className="row">
                <div className="col-md-12">
                        <FunkyRadioFourOptionsESSDAI caption={ESSDAISTATICFIELDS.renalDomain.caption}
                                                captionClass={"col-md-3 page-header"}
                                                optionsClass={"col-md-6"}
                                                optionOneDisabled={false}
                                                optionTwoDisabled={false}
                                                optionThreeDisabled={false}
                                                optionFourDisabled={false}
                                                optionOneId={"optRenalDomainNoActivity"}
                                                optionTwoId={"optRenalDomainLowActivity"}
                                                optionThreeId={"optRenalDomainModerateActivity"}
                                                optionFourId={"optRenalDomainHighActivity"}
                                                optionOneHtmlFor={"optRenalDomainNoActivity"}
                                                optionTwoHtmlFor={"optRenalDomainLowActivity"}
                                                optionThreeHtmlFor={"optRenalDomainModerateActivity"}
                                                optionFourHtmlFor={"optRenalDomainHighActivity"}

                                                    optionOneChecked={this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneDefaultValue={ getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[0].controlValueId}
                                                    optionOneOnClick={this.renalDomain_onChange}
                                                    optionOneCaption={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[0].controlValue}
                                                    
                                                    optionTwoChecked={this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoDefaultValue={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[1].controlValueId}
                                                    optionTwoOnClick={this.renalDomain_onChange}
                                                    optionTwoCaption={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[1].controlValue}

                                                    optionThreeChecked={this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId, this.state.visitControls)[2].controlValueId}
                                                    optionThreeDefaultValue={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[2].controlValueId}
                                                    optionThreeOnClick={this.renalDomain_onChange}
                                                    optionThreeCaption={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[2].controlValue}

                                                    optionFourChecked={this.state.renalDomain == getControlValues(ESSDAI.rbtListRenalDomain.controlId, this.state.visitControls)[3].controlValueId}
                                                    optionFourDefaultValue={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[3].controlValueId}
                                                    optionFourOnClick={this.renalDomain_onChange}
                                                    optionFourCaption={getControlValues(ESSDAI.rbtListRenalDomain.controlId,this.state.visitControls)[3].controlValue}

                                                    isComplete={ this.props.visitHeaderResult && 
                                                                 this.props.visitHeaderResult.data && 
                                                                 this.props.visitHeaderResult.data.completed ? 
                                                                 this.props.visitHeaderResult.data.completed :
                                                                 false}
                                                    isOpen={this.state.renalDomainOpen}
                                                    showToggle={true}
                                                    toggle={this.renalDomain_Toggle}
                                                    weighting={ESSDAISTATICFIELDS.renalDomain.weighting}
                                                    weightingClass={"col-md-2"}
                                                    calculatedWeighting={this.state.renalDomainSelectedWeighting}
                                                    renderWeightingDetails={this.renderWeightingDetails}
                                                    weightingHeading={ESSDAISTATICFIELDS.renalDomain.weightingDetail.heading} 
                                                    weightingDetails={ESSDAISTATICFIELDS.renalDomain.weightingDetail.details}
                                                    renderWeightingScore={this.renderWeightingScore} 
                                                    detailClass={"col-md-8 ESSDAI-container"}/>

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

 export default ESSDAIForm;

