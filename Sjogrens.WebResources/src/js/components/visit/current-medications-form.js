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
import {currentMedications} from '../../config/lookup/current-medications';

import {immunomodulatory} from '../../config/controls/current-medications';
import {categories} from '../../config/categories';


import {CurrentMedicationsValidationMessages} from '../../constants/information/messages';
import FunkyCheckboxTwoOptions from '../../components/generic/checkbox/funky-checkbox-two-options';

import FadeIn from '../../components/animation/fade-in';
import OcularSignsModal from '../../components/visit/modals/ocular-signs-modal'
import {ocularSignsObjectiveValidation} from '../../components/visit/modules/functions'
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import OnLeavePrompt from '../../components/generic/on-leave-prompt';
import ModalDefault from '../../components/generic/modal-default';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import Flow from '../../components/visit/navigation/flow';
import CurrentMedicationsDose from './current-medications-dose';
import CurrentMedicationsSymptomatic from './current-medications-symptomatic'
import CurrentMedicationsOtherAdd from './current-medications-other-add'
import CurrentMedicationsOther from './current-medications-other';


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

class CurrentMedicationsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',
            patientMeets2016ACRECCriteria: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,this.props.visitResult.data.details):'',         

        
            pulseIVCorticosteroids: this.props.visitResult && 
                                    this.props.visitResult.data && 
                                    this.props.visitResult.data.visits && 
                                    this.props.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue(categories.currentMedications.id, 
                                                                    immunomodulatory.ddlPulseIVCorticosteroids,
                                                                    this.props.visitResult.data.visits):null,
                                                                    
            
            corticosteroids: this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue(categories.currentMedications.id, 
                                                                immunomodulatory.ddlCorticosteroids,
                                                                this.props.visitResult.data.visits):null,
                                                                
                    
            hydroxychloroquine: this.props.visitResult && 
                                this.props.visitResult.data && 
                                this.props.visitResult.data.visits && 
                                this.props.visitResult.data.visits.length > 0 ? 
                                getVisitOptionControlValue(categories.currentMedications.id, 
                                                                immunomodulatory.ddlHydroxychloroquine,
                                                                this.props.visitResult.data.visits):null,
                                                                

            azathioprine:this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlAzathioprine,
                                                            this.props.visitResult.data.visits):null,
            mycophenolate:this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlMycophenolate,
                                                            this.props.visitResult.data.visits):null,
            methotrexate:this.props.visitResult && 
                         this.props.visitResult.data && 
                         this.props.visitResult.data.visits && 
                         this.props.visitResult.data.visits.length > 0 ? 
                         getVisitOptionControlValue(categories.currentMedications.id, 
                                            immunomodulatory.ddlMethotrexate,
                                            this.props.visitResult.data.visits):null,
            leflunomide:this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue(categories.currentMedications.id, 
                                        immunomodulatory.ddlLeflunomide,
                                        this.props.visitResult.data.visits):null,
            cyclophosphamide:this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue(categories.currentMedications.id, 
                                            immunomodulatory.ddlCyclophosphamide,
                                            this.props.visitResult.data.visits):null,
            iVIg:this.props.visitResult && 
                 this.props.visitResult.data && 
                 this.props.visitResult.data.visits && 
                 this.props.visitResult.data.visits.length > 0 ? 
                 getVisitOptionControlValue(categories.currentMedications.id, 
                                    immunomodulatory.ddlIVIg,
                                    this.props.visitResult.data.visits):null,
            etanercept:this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue(categories.currentMedications.id, 
                                        immunomodulatory.ddlEtanercept,
                                        this.props.visitResult.data.visits):null,
            infliximab:this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue(categories.currentMedications.id, 
                                        immunomodulatory.ddlInfliximab,
                                        this.props.visitResult.data.visits):null,
            rituximab:this.props.visitResult && 
                    this.props.visitResult.data && 
                    this.props.visitResult.data.visits && 
                    this.props.visitResult.data.visits.length > 0 ? 
                    getVisitOptionControlValue(categories.currentMedications.id, 
                                    immunomodulatory.ddlRituximab,
                                    this.props.visitResult.data.visits):null,
            // other:this.props.visitResult && 
            //         this.props.visitResult.data && 
            //         this.props.visitResult.data.visits && 
            //         this.props.visitResult.data.visits.length > 0 ? 
            //         getVisitOptionControlValue(categories.currentMedications.id, 
            //                         immunomodulatory.ddlOther,
            //                         this.props.visitResult.data.visits):null,

           

            pulseIVCorticosteroidsOpen:false,
            corticosteroidsOpen:false,
            hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,

          //  otherOpen:false,
            
            


            pilocarpine: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlPilocarpine,
                                                            this.props.visitResult.data.visits):null,

            
         

            tearSubstitute: this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                          immunomodulatory.ddlTearSubstitute,
                                                          this.props.visitResult.data.visits):null,

            salivaSubstitute: this.props.visitResult && 
                        this.props.visitResult.data && 
                        this.props.visitResult.data.visits && 
                        this.props.visitResult.data.visits.length > 0 ? 
                       getVisitOptionControlValue(categories.currentMedications.id, 
                                                          immunomodulatory.ddlSalivaSubstitute,
                                                         this.props.visitResult.data.visits):null,

                                                         
            antiDepressants: this.props.visitResult && 
                            this.props.visitResult.data && 
                            this.props.visitResult.data.visits && 
                            this.props.visitResult.data.visits.length > 0 ? 
                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlAntiDepressants,
                                                            this.props.visitResult.data.visits):null,
                                                                           

            pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,

            otherITs: this.props.visitKeyValuesResult && 
                        this.props.visitKeyValuesResult.data && 
                        this.props.visitKeyValuesResult.data.visitKeyValues ? 
                        this.props.visitKeyValuesResult.data.visitKeyValues : [],
                      // this.props.handleGetVisitKeyValues(this.props.visitHeaderResult.data, categories.currentMedications.id,1) :[],

           // otherITs:[],
            
            addOtherIT:false,
            otherEditIndex:null,


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
            this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
            this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
            this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
            this.validateVisit = this.validateVisit.bind(this);
            this.getVisitValues = this.getVisitValues.bind(this);
            this.getDetailValues = this.getDetailValues.bind(this);
            this.renderFieldset = this.renderFieldset.bind(this);
            this.isFormValid = this.isFormValid.bind(this);
            /*Every visit should have end */
            this.handlePulseIVCorticosteroidsToggle = this.handlePulseIVCorticosteroidsToggle.bind(this);
            this.handlePulseIVCorticosteroidsChange = this.handlePulseIVCorticosteroidsChange.bind(this);
            this.handleCorticosteroidsToggle = this.handleCorticosteroidsToggle.bind(this);
            this.handleCorticosteroidsChange = this.handleCorticosteroidsChange.bind(this);

            this.handleHydroxychloroquineToggle = this.handleHydroxychloroquineToggle.bind(this);
            this.handleHydroxychloroquineChange = this.handleHydroxychloroquineChange.bind(this);

            this.handleAzathioprineToggle = this.handleAzathioprineToggle.bind(this);
            this.handleAzathioprineChange = this.handleAzathioprineChange.bind(this);

            this.handleMycophenolateToggle = this.handleMycophenolateToggle.bind(this);
            this.handleMycophenolateChange = this.handleMycophenolateChange.bind(this);

            this.handleMethotrexateToggle = this.handleMethotrexateToggle.bind(this);
            this.handleMethotrexateChange = this.handleMethotrexateChange.bind(this);

            this.handleLeflunomideToggle = this.handleLeflunomideToggle.bind(this);
            this.handleLeflunomideChange = this.handleLeflunomideChange.bind(this);
            
            this.handleCyclophosphamideToggle = this.handleCyclophosphamideToggle.bind(this);
            this.handleCyclophosphamideChange = this.handleCyclophosphamideChange.bind(this);

            this.handleIVIgToggle = this.handleIVIgToggle.bind(this);
            this.handleIVIgChange = this.handleIVIgChange.bind(this);

            this.handleEtanerceptToggle = this.handleEtanerceptToggle.bind(this);
            this.handleEtanerceptChange = this.handleEtanerceptChange.bind(this);
            
            this.handleInfliximabToggle = this.handleInfliximabToggle.bind(this);
            this.handleInfliximabChange = this.handleInfliximabChange.bind(this);

            this.handleRituximabToggle = this.handleRituximabToggle.bind(this);
            this.handleRituximabChange = this.handleRituximabChange.bind(this);

            // this.handleOtherToggle = this.handleOtherToggle.bind(this);
            // this.handleOtherChange = this.handleOtherChange.bind(this);

            this.handlePilocarpineToggle = this.handlePilocarpineToggle.bind(this);
            this.handlePilocarpineChange = this.handlePilocarpineChange.bind(this);

            this.handleTearSubstituteToggle = this.handleTearSubstituteToggle.bind(this);
            this.handleTearSubstituteChange = this.handleTearSubstituteChange.bind(this);

            this.handleSalivaSubstituteToggle = this.handleSalivaSubstituteToggle.bind(this);
            this.handleSalivaSubstituteChange = this.handleSalivaSubstituteChange.bind(this);

            this.handleAntiDepressantsToggle = this.handleAntiDepressantsToggle.bind(this);
            this.handleAntiDepressantsChange = this.handleAntiDepressantsChange.bind(this);

            this.handleAddOtherITToggle = this.handleAddOtherITToggle.bind(this);
            this.handleSaveOtherIT = this.handleSaveOtherIT.bind(this);
            this.handleRemoveOtherIT = this.handleRemoveOtherIT.bind(this);
            this.handleUpdateOtherIT = this.handleUpdateOtherIT.bind(this);
            this.handleUpdateOnChangeOtherIT = this.handleUpdateOnChangeOtherIT.bind(this);
            this.buildOtherITList = this.buildOtherITList.bind(this);
            this.handleOtherITToggle = this.handleOtherITToggle.bind(this);
    }


    handleOtherITToggle(editIndex){
        this.setState({
            addOtherIT: false,
            otherEditIndex:editIndex,

            pulseIVCorticosteroidsOpen:false,
            corticosteroidsOpen:false,
            hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,



 pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,
        })
    }

    handleAddOtherITToggle(){
        this.setState((prevState, props)=>({
            addOtherIT: !prevState.addOtherIT,

            pulseIVCorticosteroidsOpen:false,
            corticosteroidsOpen:false,
            hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,


 pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,
        }))
    }


    handleSaveOtherIT(otherIT,otherITDose){
            var tempOtherITs = this.state.otherITs;
            var tempOtherIT ={
                key:otherIT,
                value:otherITDose
            }

            tempOtherITs.push(tempOtherIT);

            this.setState((prevState, props)=>({
                    otherITs: tempOtherITs,
                    addOtherIT: !prevState.addOtherIT,
                    changed:true
                }))

        }
    
        handleRemoveOtherIT(index){
            var tempOtherITs = this.state.otherITs;
            tempOtherITs.splice(index,1);
            this.setState((prevState, props)=>({
                otherITs: tempOtherITs,
                changed : true
            }))
        }
    
        handleUpdateOtherIT(otherIT,otherITDose, index){

            var tempOtherIT ={
                key:otherIT,
                value:otherITDose
            }

            var tempOtherITs = this.state.otherITs;
            tempOtherITs[index] = tempOtherIT;
    
            this.setState((prevState, props)=>({
                otherITs: tempOtherITs,
                changed : true,
                otherEditIndex:null,
            }))
        }


        handleUpdateOnChangeOtherIT(otherIT,otherITDose, index){
  
              var tempOtherIT ={
                  key:otherIT,
                  value:otherITDose
              }
  
              var tempOtherITs = this.state.otherITs;
              tempOtherITs[index] = tempOtherIT;
      
              this.setState((prevState, props)=>({
                  otherITs: tempOtherITs,
                  changed : true,
                  otherEditIndex:index,
              }))
          }

        buildOtherITList(otherIT, i){
            return (
                <div className="block block-inclusion-criteria-head no-pad">
                <div className="block-content-no-border row">
                <FadeIn>
                <CurrentMedicationsOther
                    isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                            handleOtherITToggle={this.handleOtherITToggle}
                            editIndex={this.state.otherEditIndex}
                             key={i} 
                             index={i} 
                             update={this.handleUpdateOtherIT} 
                             remove={this.handleRemoveOtherIT}
                             onChange={this.handleUpdateOnChangeOtherIT}
                             doses={immunomodulatory.ddlOther}
                            otherITs={this.state.otherITs}>
                         {otherIT}
                     </CurrentMedicationsOther>
                </FadeIn>
                </div>
                </div>
                    );
        }

    handlePulseIVCorticosteroidsToggle(){
        this.setState((prevState,props) => ({
            pulseIVCorticosteroidsOpen: !prevState.pulseIVCorticosteroidsOpen,
            addOtherIT :false,
            otherEditIndex:null,
           // pulseIVCorticosteroidsOpen:false,
            corticosteroidsOpen:false,
            hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,

            pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,
        }))
    }


    handlePulseIVCorticosteroidsChange(controlValueId){
        if (controlValueId){
        this.setState((prevState,props) => ({
            pulseIVCorticosteroids: controlValueId,
            pulseIVCorticosteroidsOpen: !prevState.pulseIVCorticosteroidsOpen,
            changed: prevState.pulseIVCorticosteroids != controlValueId,
        }))
    }
    else {
        this.setState((prevState,props) => ({
            pulseIVCorticosteroids: null,
            pulseIVCorticosteroidsOpen: false,
            changed:true
        }))
    }
    }

    handleCorticosteroidsToggle(){
        this.setState((prevState,props) => ({
            corticosteroidsOpen: !prevState.corticosteroidsOpen,
            addOtherIT :false,
            otherEditIndex:null,

            pulseIVCorticosteroidsOpen:false,
            //corticosteroidsOpen:false,
            hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,

            pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,
        }))
    }


    handleCorticosteroidsChange(controlValueId){
        if (controlValueId){
        this.setState((prevState,props) => ({
            corticosteroids: controlValueId,
            corticosteroidsOpen: !prevState.corticosteroidsOpen,
            changed: prevState.pulseIVCorticosteroids != controlValueId,
        }))
      }
      else {
        this.setState((prevState,props) => ({
            corticosteroids: null,
            hydroxychloroquineOpen: false,
            changed:true
        }))
      }
    }

    //
    handleHydroxychloroquineToggle(){
        this.setState((prevState,props) => ({
            hydroxychloroquineOpen: !prevState.hydroxychloroquineOpen,
            addOtherIT :false,
            otherEditIndex:null,

            pulseIVCorticosteroidsOpen:false,
            corticosteroidsOpen:false,
            //hydroxychloroquineOpen:false,
            azathioprineOpen:false,
            mycophenolateOpen:false,
            methotrexateOpen:false,
            leflunomideOpen:false,
            cyclophosphamideOpen:false,
            iVIgOpen:false,
            etanerceptOpen:false,
            infliximabOpen:false,
            rituximabOpen:false,

            pilocarpineOpen:false,
            tearSubstituteOpen:false,
            salivaSubstituteOpen:false,
            antiDepressantsOpen:false,
        }))
    }


    handleHydroxychloroquineChange(controlValueId){
        if (controlValueId){
        this.setState((prevState,props) => ({
            hydroxychloroquine: controlValueId,
            hydroxychloroquineOpen: !prevState.hydroxychloroquineOpen,
            changed: prevState.hydroxychloroquine != controlValueId
        }))
      }
      else {
        this.setState((prevState,props) => ({
            hydroxychloroquine: null,
            hydroxychloroquineOpen: false,
            changed:true
        }))
      }
    }
//
handleAzathioprineToggle(){
    this.setState((prevState,props) => ({
        azathioprineOpen: !prevState.azathioprineOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
       // azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}


handleAzathioprineChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        azathioprine: controlValueId,
        azathioprineOpen: !prevState.azathioprineOpen,
        changed: prevState.azathioprine != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        azathioprine: null,
        azathioprineOpen: false,
        changed:true
    }))
  }
}
//

handleMycophenolateToggle(){
    this.setState((prevState,props) => ({
        mycophenolateOpen: !prevState.mycophenolateOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        //mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}


handleMycophenolateChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        mycophenolate: controlValueId,
        mycophenolateOpen: !prevState.mycophenolateOpen,
        changed: prevState.mycophenolate != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        mycophenolate: null,
        mycophenolateOpen: false,
        changed:true
    }))
  }
}
//
handleMethotrexateToggle(){
    this.setState((prevState,props) => ({
        methotrexateOpen: !prevState.methotrexateOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
       // methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleMethotrexateChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        methotrexate: controlValueId,
        methotrexateOpen: !prevState.methotrexateOpen,
        changed: prevState.methotrexate != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        methotrexate: null,
        methotrexateOpen: false,
        changed:true
    }))
  }
}
//

handleLeflunomideToggle(){
    this.setState((prevState,props) => ({
        leflunomideOpen: !prevState.leflunomideOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        //leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleLeflunomideChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        leflunomide: controlValueId,
        leflunomideOpen: !prevState.leflunomideOpen,
        changed: prevState.leflunomide != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        leflunomide: null,
        leflunomideOpen: false,
        changed:true
    }))
  }
}
//

handleCyclophosphamideToggle(){
    this.setState((prevState,props) => ({
        cyclophosphamideOpen: !prevState.cyclophosphamideOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        //cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleCyclophosphamideChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        cyclophosphamide: controlValueId, 
        cyclophosphamideOpen: !prevState.cyclophosphamideOpen,
        changed: prevState.cyclophosphamide != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        cyclophosphamide: null,
        cyclophosphamideOpen: false,
        changed:true
    }))
  }
}

//

handleIVIgToggle(){
    this.setState((prevState,props) => ({
        iVIgOpen: !prevState.iVIgOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        //iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleIVIgChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        iVIg: controlValueId,
        iVIgOpen: !prevState.iVIgOpen,
        changed:  prevState.iVIg != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        iVIg: null,
        iVIgOpen: false,
        changed:true
    }))
  }
}

//
handleEtanerceptToggle(){
    this.setState((prevState,props) => ({
        etanerceptOpen: !prevState.etanerceptOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        //etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleEtanerceptChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        etanercept: controlValueId,
        etanerceptOpen: !prevState.etanerceptOpen,
        changed: prevState.etanercept != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        etanercept: null,
        etanerceptOpen: false,
        changed:true
    }))
  }
}
//

handleInfliximabToggle(){
    this.setState((prevState,props) => ({
        infliximabOpen: !prevState.infliximabOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        //infliximabOpen:false,
        rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleInfliximabChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        infliximab: controlValueId,
        infliximabOpen: !prevState.infliximabOpen,
        changed:  prevState.infliximab != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        infliximab: null,
        infliximabOpen: false,
        changed:true
    }))
  }
}

//
handleRituximabToggle(){
    this.setState((prevState,props) => ({
        rituximabOpen: !prevState.rituximabOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        //rituximabOpen:false,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,
    }))
}

handleRituximabChange(controlValueId){
    if (controlValueId){
    this.setState((prevState,props) => ({
        rituximab: controlValueId,
        rituximabOpen: !prevState.rituximabOpen,
        changed: prevState.rituximab != controlValueId
    }))
  }
  else {
    this.setState((prevState,props) => ({
        rituximab: null,
        rituximabOpen: false,
        changed:true
    }))
  }
}

//

// //
// handleOtherToggle(){
//     this.setState({
//         otherOpen: !this.state.otherOpen
//     })
// }

// handleOtherChange(controlValueId){
//     if (controlValueId){
//     this.setState({
//         other: controlValueId
//     })
//   }
//   else {
//     this.setState({
//         other: null
//     })
//   }
// }

//


handlePilocarpineToggle(){
    this.setState((prevState,props) => ({
        pilocarpineOpen: !prevState.pilocarpineOpen,
        addOtherIT :false,
        otherEditIndex:null,

       // pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,
    }))
}


handlePilocarpineChange(controlValueId){

    if (controlValueId){
        this.setState((prevState,props) => ({
            pilocarpine: controlValueId,
            pilocarpineOpen: !prevState.pilocarpineOpen,
            changed: prevState.pilocarpine != controlValueId
        }))
}
else {
    this.setState((prevState,props) => ({
        pilocarpine: null,
        pilocarpineOpen: false,
        changed:true
    }))
}
}






handleTearSubstituteToggle(){
    this.setState((prevState,props) => ({
        tearSubstituteOpen: !prevState.tearSubstituteOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pilocarpineOpen:false,
       // tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        antiDepressantsOpen:false,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false
    }))
}


handleTearSubstituteChange(controlValueId){
    if (controlValueId){
        this.setState((prevState,props) => ({
        tearSubstitute: controlValueId,
        tearSubstituteOpen: !prevState.tearSubstituteOpen,
        changed: prevState.tearSubstitute != controlValueId
    }))
}
else {
    this.setState((prevState,props) => ({
        tearSubstitute: null,
        tearSubstituteOpen: false,
        changed:true
    }))
}
}



handleSalivaSubstituteToggle(){
    this.setState((prevState,props) => ({
        salivaSubstituteOpen: !prevState.salivaSubstituteOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        //salivaSubstituteOpen:false,
        antiDepressantsOpen:false,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,
    }))
}


handleSalivaSubstituteChange(controlValueId){
    if (controlValueId){
        this.setState((prevState,props) => ({
            salivaSubstitute: controlValueId,
            salivaSubstituteOpen: !prevState.salivaSubstituteOpen,
            changed: prevState.salivaSubstitute != controlValueId
    }))
}
else {
    this.setState((prevState,props) => ({
        salivaSubstitute: null,
        salivaSubstituteOpen: false,
        changed:true
    }))
}
}



handleAntiDepressantsToggle(){
    this.setState((prevState,props) => ({
        antiDepressantsOpen: !prevState.antiDepressantsOpen,
        addOtherIT :false,
        otherEditIndex:null,

        pilocarpineOpen:false,
        tearSubstituteOpen:false,
        salivaSubstituteOpen:false,
        //antiDepressantsOpen:false,

        pulseIVCorticosteroidsOpen:false,
        corticosteroidsOpen:false,
        hydroxychloroquineOpen:false,
        azathioprineOpen:false,
        mycophenolateOpen:false,
        methotrexateOpen:false,
        leflunomideOpen:false,
        cyclophosphamideOpen:false,
        iVIgOpen:false,
        etanerceptOpen:false,
        infliximabOpen:false,
        rituximabOpen:false,
    }))
}


handleAntiDepressantsChange(controlValueId){
    if (controlValueId){
        this.setState((prevState,props) => ({
        antiDepressants: controlValueId,
        antiDepressantsOpen: !prevState.antiDepressantsOpen,
        changed: prevState.antiDepressants != controlValueId
    }))
}
else {
    this.setState((prevState,props) => ({
        antiDepressants: null,
        antiDepressantsOpen: false,
        changed:true
    }))
}
}


//


    validateVisit(){
        let errors = {};
      
       

        return errors
    }


    getVisitValues(){
        var visit = []

     

        if (this.state.pulseIVCorticosteroids){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.pulseIVCorticosteroids,
                    controlId:this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[0].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[0].controlId : 
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[1].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[1].controlId : 
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[2].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[2].controlId : 
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[3].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[3].controlId : 
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[4].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[4].controlId :  
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[5].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[5].controlId : 
                    this.state.pulseIVCorticosteroids == immunomodulatory.ddlPulseIVCorticosteroids[6].controlValueId ? 
                    immunomodulatory.ddlPulseIVCorticosteroids[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }


        if (this.state.corticosteroids){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.corticosteroids,
                    controlId:this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[0].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[0].controlId : 
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[1].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[1].controlId : 
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[2].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[2].controlId : 
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[3].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[3].controlId : 
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[4].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[4].controlId :  
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[5].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[5].controlId : 
                    this.state.corticosteroids == immunomodulatory.ddlCorticosteroids[6].controlValueId ? 
                    immunomodulatory.ddlCorticosteroids[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.hydroxychloroquine){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.hydroxychloroquine,
                    controlId:this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[0].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[0].controlId : 
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[1].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[1].controlId : 
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[2].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[2].controlId : 
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[3].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[3].controlId : 
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[4].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[4].controlId :  
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[5].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[5].controlId : 
                    this.state.hydroxychloroquine == immunomodulatory.ddlHydroxychloroquine[6].controlValueId ? 
                    immunomodulatory.ddlHydroxychloroquine[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.azathioprine){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.azathioprine,
                    controlId:this.state.azathioprine == immunomodulatory.ddlAzathioprine[0].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[0].controlId : 
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[1].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[1].controlId : 
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[2].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[2].controlId : 
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[3].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[3].controlId : 
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[4].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[4].controlId :  
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[5].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[5].controlId : 
                    this.state.azathioprine == immunomodulatory.ddlAzathioprine[6].controlValueId ? 
                    immunomodulatory.ddlAzathioprine[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }


        if (this.state.mycophenolate){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.mycophenolate,
                    controlId:this.state.mycophenolate == immunomodulatory.ddlMycophenolate[0].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[0].controlId : 
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[1].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[1].controlId : 
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[2].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[2].controlId : 
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[3].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[3].controlId : 
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[4].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[4].controlId :  
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[5].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[5].controlId : 
                    this.state.mycophenolate == immunomodulatory.ddlMycophenolate[6].controlValueId ? 
                    immunomodulatory.ddlMycophenolate[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.methotrexate){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.methotrexate,
                    controlId:this.state.methotrexate == immunomodulatory.ddlMethotrexate[0].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[0].controlId : 
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[1].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[1].controlId : 
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[2].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[2].controlId : 
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[3].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[3].controlId : 
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[4].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[4].controlId :  
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[5].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[5].controlId : 
                    this.state.methotrexate == immunomodulatory.ddlMethotrexate[6].controlValueId ? 
                    immunomodulatory.ddlMethotrexate[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }


        if (this.state.leflunomide){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.leflunomide,
                    controlId:this.state.leflunomide == immunomodulatory.ddlLeflunomide[0].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[0].controlId : 
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[1].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[1].controlId : 
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[2].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[2].controlId : 
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[3].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[3].controlId : 
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[4].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[4].controlId :  
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[5].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[5].controlId : 
                    this.state.leflunomide == immunomodulatory.ddlLeflunomide[6].controlValueId ? 
                    immunomodulatory.ddlLeflunomide[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.cyclophosphamide){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.cyclophosphamide,
                    controlId:this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[0].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[0].controlId : 
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[1].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[1].controlId : 
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[2].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[2].controlId : 
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[3].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[3].controlId : 
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[4].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[4].controlId :  
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[5].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[5].controlId : 
                    this.state.cyclophosphamide == immunomodulatory.ddlCyclophosphamide[6].controlValueId ? 
                    immunomodulatory.ddlCyclophosphamide[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.iVIg){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.iVIg,
                    controlId:this.state.iVIg == immunomodulatory.ddlIVIg[0].controlValueId ? 
                    immunomodulatory.ddlIVIg[0].controlId : 
                    this.state.iVIg == immunomodulatory.ddlIVIg[1].controlValueId ? 
                    immunomodulatory.ddlIVIg[1].controlId : 
                    this.state.iVIg == immunomodulatory.ddlIVIg[2].controlValueId ? 
                    immunomodulatory.ddlIVIg[2].controlId : 
                    this.state.iVIg == immunomodulatory.ddlIVIg[3].controlValueId ? 
                    immunomodulatory.ddlIVIg[3].controlId : 
                    this.state.iVIg == immunomodulatory.ddlIVIg[4].controlValueId ? 
                    immunomodulatory.ddlIVIg[4].controlId :  
                    this.state.iVIg == immunomodulatory.ddlIVIg[5].controlValueId ? 
                    immunomodulatory.ddlIVIg[5].controlId : 
                    this.state.iVIg == immunomodulatory.ddlIVIg[6].controlValueId ? 
                    immunomodulatory.ddlIVIg[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }


        if (this.state.etanercept){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.etanercept,
                    controlId:this.state.etanercept == immunomodulatory.ddlEtanercept[0].controlValueId ? 
                    immunomodulatory.ddlEtanercept[0].controlId : 
                    this.state.etanercept == immunomodulatory.ddlEtanercept[1].controlValueId ? 
                    immunomodulatory.ddlEtanercept[1].controlId : 
                    this.state.etanercept == immunomodulatory.ddlEtanercept[2].controlValueId ? 
                    immunomodulatory.ddlEtanercept[2].controlId : 
                    this.state.etanercept == immunomodulatory.ddlEtanercept[3].controlValueId ? 
                    immunomodulatory.ddlEtanercept[3].controlId : 
                    this.state.etanercept == immunomodulatory.ddlEtanercept[4].controlValueId ? 
                    immunomodulatory.ddlEtanercept[4].controlId :  
                    this.state.etanercept == immunomodulatory.ddlEtanercept[5].controlValueId ? 
                    immunomodulatory.ddlEtanercept[5].controlId : 
                    this.state.etanercept == immunomodulatory.ddlEtanercept[6].controlValueId ? 
                    immunomodulatory.ddlEtanercept[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.infliximab){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.infliximab,
                    controlId:this.state.infliximab == immunomodulatory.ddlInfliximab[0].controlValueId ? 
                    immunomodulatory.ddlInfliximab[0].controlId : 
                    this.state.infliximab == immunomodulatory.ddlInfliximab[1].controlValueId ? 
                    immunomodulatory.ddlInfliximab[1].controlId : 
                    this.state.infliximab == immunomodulatory.ddlInfliximab[2].controlValueId ? 
                    immunomodulatory.ddlInfliximab[2].controlId : 
                    this.state.infliximab == immunomodulatory.ddlInfliximab[3].controlValueId ? 
                    immunomodulatory.ddlInfliximab[3].controlId : 
                    this.state.infliximab == immunomodulatory.ddlInfliximab[4].controlValueId ? 
                    immunomodulatory.ddlInfliximab[4].controlId :  
                    this.state.infliximab == immunomodulatory.ddlInfliximab[5].controlValueId ? 
                    immunomodulatory.ddlInfliximab[5].controlId : 
                    this.state.infliximab == immunomodulatory.ddlInfliximab[6].controlValueId ? 
                    immunomodulatory.ddlInfliximab[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.rituximab){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.rituximab,
                    controlId:this.state.rituximab == immunomodulatory.ddlRituximab[0].controlValueId ? 
                    immunomodulatory.ddlRituximab[0].controlId : 
                    this.state.rituximab == immunomodulatory.ddlRituximab[1].controlValueId ? 
                    immunomodulatory.ddlRituximab[1].controlId : 
                    this.state.rituximab == immunomodulatory.ddlRituximab[2].controlValueId ? 
                    immunomodulatory.ddlRituximab[2].controlId : 
                    this.state.rituximab == immunomodulatory.ddlRituximab[3].controlValueId ? 
                    immunomodulatory.ddlRituximab[3].controlId : 
                    this.state.rituximab == immunomodulatory.ddlRituximab[4].controlValueId ? 
                    immunomodulatory.ddlRituximab[4].controlId :  
                    this.state.rituximab == immunomodulatory.ddlRituximab[5].controlValueId ? 
                    immunomodulatory.ddlRituximab[5].controlId : 
                    this.state.rituximab == immunomodulatory.ddlRituximab[6].controlValueId ? 
                    immunomodulatory.ddlRituximab[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.other){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.other,
                    controlId:this.state.other == immunomodulatory.ddlOther[0].controlValueId ? 
                    immunomodulatory.ddlOther[0].controlId : 
                    this.state.other == immunomodulatory.ddlOther[1].controlValueId ? 
                    immunomodulatory.ddlOther[1].controlId : 
                    this.state.other == immunomodulatory.ddlOther[2].controlValueId ? 
                    immunomodulatory.ddlOther[2].controlId : 
                    this.state.other == immunomodulatory.ddlOther[3].controlValueId ? 
                    immunomodulatory.ddlOther[3].controlId : 
                    this.state.other == immunomodulatory.ddlOther[4].controlValueId ? 
                    immunomodulatory.ddlOther[4].controlId :  
                    this.state.other == immunomodulatory.ddlOther[5].controlValueId ? 
                    immunomodulatory.ddlOther[5].controlId : 
                    this.state.other == immunomodulatory.ddlOther[6].controlValueId ? 
                    immunomodulatory.ddlOther[6].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }
/////

//if (this.state.symptomaticTreatmentsYes && !this.state.symptomaticTreatmentsNo){

        if (this.state.pilocarpine){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.pilocarpine,
                    controlId:this.state.pilocarpine == immunomodulatory.ddlPilocarpine[0].controlValueId ? 
                    immunomodulatory.ddlPilocarpine[0].controlId : 
                    this.state.pilocarpine == immunomodulatory.ddlPilocarpine[1].controlValueId ? 
                    immunomodulatory.ddlPilocarpine[1].controlId : 
                    this.state.pilocarpine == immunomodulatory.ddlPilocarpine[2].controlValueId ? 
                    immunomodulatory.ddlPilocarpine[2].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

     


        if (this.state.tearSubstitute){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.tearSubstitute,
                    controlId:this.state.tearSubstitute == immunomodulatory.ddlTearSubstitute[0].controlValueId ? 
                    immunomodulatory.ddlTearSubstitute[0].controlId : 
                    this.state.tearSubstitute == immunomodulatory.ddlTearSubstitute[1].controlValueId ? 
                    immunomodulatory.ddlTearSubstitute[1].controlId : 
                    this.state.tearSubstitute == immunomodulatory.ddlTearSubstitute[2].controlValueId ? 
                    immunomodulatory.ddlTearSubstitute[2].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }

        if (this.state.salivaSubstitute){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.salivaSubstitute,
                    controlId:this.state.salivaSubstitute == immunomodulatory.ddlSalivaSubstitute[0].controlValueId ? 
                    immunomodulatory.ddlSalivaSubstitute[0].controlId : 
                    this.state.salivaSubstitute == immunomodulatory.ddlSalivaSubstitute[1].controlValueId ? 
                    immunomodulatory.ddlSalivaSubstitute[1].controlId : 
                    this.state.salivaSubstitute == immunomodulatory.ddlSalivaSubstitute[2].controlValueId ? 
                    immunomodulatory.ddlSalivaSubstitute[2].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }


        if (this.state.antiDepressants){
            visit.push(
                {
                    visitHeaderId:this.props.visitHeaderId,
                    controlValueId:this.state.antiDepressants,
                    controlId:this.state.antiDepressants == immunomodulatory.ddlAntiDepressants[0].controlValueId ? 
                    immunomodulatory.ddlAntiDepressants[0].controlId : 
                    this.state.antiDepressants == immunomodulatory.ddlAntiDepressants[1].controlValueId ? 
                    immunomodulatory.ddlAntiDepressants[1].controlId : 
                    this.state.antiDepressants == immunomodulatory.ddlAntiDepressants[2].controlValueId ? 
                    immunomodulatory.ddlAntiDepressants[2].controlId : 
              0,
                    categoryId:   categories.currentMedications.id   
        
                }
            )
        }
   // }
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
   /// }
    

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
            var otherImmunomodulatoryTreatments = [];
            
            visit = this.getVisitValues();
            detail = this.getDetailValues();

//console.log('V701580')
//console.log(detail);

            for(var i = visit.length; i--;){
                    if (visit[i].controlId === 0 || visit[i].controlValueId === 0 ) visit.splice(i, 1);
            }

            for(var i = detail.length; i--;){
                    if (detail[i].controlId === 0 || detail[i].value === '') detail.splice(i, 1);
            }

                this.props.handleSaveVisitHeader(visit, detail,categories.currentMedications.id);

       // if (Object.keys(this.state.otherITs).length > 0) {
                otherImmunomodulatoryTreatments = this.state.otherITs;
                this.props.handleSaveVisitKeyValues(otherImmunomodulatoryTreatments, categories.currentMedications.id, currentMedications.categorySections[0].sectionId)                
           // } 

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

        this.props.handleCompleteVisitHeader(visit, detail,categories.currentMedications.id);

        if (Object.keys(this.state.otherITs).length > 0) {
            otherImmunomodulatoryTreatments = this.state.otherITs;
            this.props.handleSaveVisitKeyValues(otherImmunomodulatoryTreatments, categories.currentMedications.id, currentMedications.categorySections[0].sectionId)                
        } 
    }
    else {
        this.setState({
            visitCompleteModalOpen: false
        })
    }
}
/*Every visit shold have this --end */


    componentWillReceiveProps(nextProps){
       

      //  console.log('sajid will receiev props')
       // console.log(nextProps)
        // if (
        //     (nextProps.visitHeaderResult &&  nextProps.visitHeaderResult.data && !nextProps.visitKeyValuesResult ) ||
        //     (next.visitHeaderResult &&  
        //         this.props.visitHeaderResult.data &&  
        //         this.props.visitKeyValuesResult && 
        //         !this.props.visitKeyValuesResult.data) || 
        //     (this.props.visitHeaderResult &&  
        //         this.props.visitHeaderResult.data &&  
        //         this.props.visitKeyValuesResult && 
        //         this.props.visitKeyValuesResult.data &&
        //         !this.props.visitKeyValuesResult.data.visitKeyValues) 
        // ) { 
        //     this.props.handleGetVisitKeyValues(this.props.visitHeaderResult.data, categories.currentMedications.id,1)
        // }

      this.setState({
                patientMeetsAECGCGCA: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,nextProps.visitResult.data.details):'',
                patientHasPhysiciansDiagnosis: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.visits && nextProps.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis ,nextProps.visitResult.data.visits):'',
                
                patientMeets2016ACRECCriteria: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeets2016ACRECCriteria.chkPatientMeets2016ACRECCriteria,nextProps.visitResult.data.details):'',         
                

                pulseIVCorticosteroids: nextProps.visitResult && 
                nextProps.visitResult.data && 
                nextProps.visitResult.data.visits && 
                nextProps.visitResult.data.visits.length > 0 ? 
                getVisitOptionControlValue(categories.currentMedications.id, 
                                                immunomodulatory.ddlPulseIVCorticosteroids,
                                                nextProps.visitResult.data.visits):null,



                corticosteroids: nextProps.visitResult && 
                                 nextProps.visitResult.data && 
                                 nextProps.visitResult.data.visits && 
                                 nextProps.visitResult.data.visits.length > 0 ? 
                                 getVisitOptionControlValue(categories.currentMedications.id, 
                                                              immunomodulatory.ddlCorticosteroids,
                                                              nextProps.visitResult.data.visits):null,
                                                                                
                                    
              hydroxychloroquine: nextProps.visitResult && 
                                                nextProps.visitResult.data && 
                                                nextProps.visitResult.data.visits && 
                                                nextProps.visitResult.data.visits.length > 0 ? 
                                                getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                immunomodulatory.ddlHydroxychloroquine,
                                                                                nextProps.visitResult.data.visits):null,
                                                                                
                
              azathioprine:nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.visits && 
                                            nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                                            immunomodulatory.ddlAzathioprine,
                                                                            nextProps.visitResult.data.visits):null,
             mycophenolate:nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.visits && 
                                            nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                                            immunomodulatory.ddlMycophenolate,
                                                                            nextProps.visitResult.data.visits):null,
               methotrexate:nextProps.visitResult && 
                                         nextProps.visitResult.data && 
                                         nextProps.visitResult.data.visits && 
                                         nextProps.visitResult.data.visits.length > 0 ? 
                                         getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlMethotrexate,
                                                            nextProps.visitResult.data.visits):null,
              leflunomide:nextProps.visitResult && 
                                        nextProps.visitResult.data && 
                                        nextProps.visitResult.data.visits && 
                                        nextProps.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                        immunomodulatory.ddlLeflunomide,
                                                        nextProps.visitResult.data.visits):null,
              cyclophosphamide:nextProps.visitResult && 
                                            nextProps.visitResult.data && 
                                            nextProps.visitResult.data.visits && 
                                            nextProps.visitResult.data.visits.length > 0 ? 
                                            getVisitOptionControlValue(categories.currentMedications.id, 
                                                            immunomodulatory.ddlCyclophosphamide,
                                                            nextProps.visitResult.data.visits):null,
              iVIg:nextProps.visitResult && 
                                 nextProps.visitResult.data && 
                                 nextProps.visitResult.data.visits && 
                                 nextProps.visitResult.data.visits.length > 0 ? 
                                 getVisitOptionControlValue(categories.currentMedications.id, 
                                                    immunomodulatory.ddlIVIg,
                                                    nextProps.visitResult.data.visits):null,
              etanercept:nextProps.visitResult && 
                                        nextProps.visitResult.data && 
                                        nextProps.visitResult.data.visits && 
                                        nextProps.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                        immunomodulatory.ddlEtanercept,
                                                        nextProps.visitResult.data.visits):null,
              infliximab:nextProps.visitResult && 
                                        nextProps.visitResult.data && 
                                        nextProps.visitResult.data.visits && 
                                        nextProps.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                        immunomodulatory.ddlInfliximab,
                                                        nextProps.visitResult.data.visits):null,
              rituximab:nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue(categories.currentMedications.id, 
                                                    immunomodulatory.ddlRituximab,
                                                    nextProps.visitResult.data.visits):null,
             other:nextProps.visitResult && 
                                    nextProps.visitResult.data && 
                                    nextProps.visitResult.data.visits && 
                                    nextProps.visitResult.data.visits.length > 0 ? 
                                    getVisitOptionControlValue(categories.currentMedications.id, 
                                                    immunomodulatory.ddlOther,
                                                    nextProps.visitResult.data.visits):null,




            // symptomaticTreatmentsYes:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.currentMedications.id, immunomodulatory.chkSymptomaticTreatmentsYes,nextProps.visitResult.data.details):null,           
            // symptomaticTreatmentsNo:nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.details && nextProps.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.currentMedications.id, immunomodulatory.chkSymptomaticTreatmentsNo,nextProps.visitResult.data.details):null,           
                                              
            otherITs: 
                        nextProps.visitKeyValuesResult && 
                        nextProps.visitKeyValuesResult.data && 
                        nextProps.visitKeyValuesResult.data.visitKeyValues ? 
                        nextProps.visitKeyValuesResult.data.visitKeyValues :[], 
                       //nextProps.handleGetVisitKeyValues(nextProps.visitHeaderResult.data, categories.currentMedications.id,1)
                       //:[],


            // otherITs: (nextProps.visitHeaderResult &&  nextProps.visitHeaderResult.data && !nextProps.visitKeyValuesResult ) ||
            //             (nextProps.visitHeaderResult &&  
            //                 nextProps.visitHeaderResult.data &&  
            //                 nextProps.visitKeyValuesResult && 
            //                 !nextProps.visitKeyValuesResult.data) || 
            //                 (nextProps.visitHeaderResult &&  
            //                     nextProps.visitHeaderResult.data &&  
            //                     nextProps.visitKeyValuesResult && 
            //                     nextProps.visitKeyValuesResult.data &&
            //                             !nextProps.visitKeyValuesResult.data.visitKeyValues)? 
            //                             nextProps.handleGetVisitKeyValues(nextProps.visitHeaderResult.data, categories.currentMedications.id,1) :[],



            pilocarpine: nextProps.visitResult && 
                         nextProps.visitResult.data && 
                         nextProps.visitResult.data.visits && 
                          nextProps.visitResult.data.visits.length > 0 ? 
                          getVisitOptionControlValue(categories.currentMedications.id, 
                                                     immunomodulatory.ddlPilocarpine,
                                                    nextProps.visitResult.data.visits):null,
                        
                                    
                        
                                    tearSubstitute: nextProps.visitResult && 
                                                nextProps.visitResult.data && 
                                                nextProps.visitResult.data.visits && 
                                                nextProps.visitResult.data.visits.length > 0 ? 
                                                getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                  immunomodulatory.ddlTearSubstitute,
                                                                                  nextProps.visitResult.data.visits):null,
                        
                                    salivaSubstitute: nextProps.visitResult && 
                                                nextProps.visitResult.data && 
                                                nextProps.visitResult.data.visits && 
                                                nextProps.visitResult.data.visits.length > 0 ? 
                                               getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                  immunomodulatory.ddlSalivaSubstitute,
                                                                                 nextProps.visitResult.data.visits):null,
                        
                                                                                 
                                    antiDepressants: nextProps.visitResult && 
                                                    nextProps.visitResult.data && 
                                                    nextProps.visitResult.data.visits && 
                                                    nextProps.visitResult.data.visits.length > 0 ? 
                                                    getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                    immunomodulatory.ddlAntiDepressants,
                                                                                    nextProps.visitResult.data.visits):null,
                                                                                                   
                        
                                   
               
                                                            

                createdUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdUser,
                createdDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.createdDatetime,
                lastUpdatedUser: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: nextProps.visitResult && nextProps.visitResult.data && nextProps.visitResult.data.lastUpdatedDatetime,
             

                changed:false,
                
        })

      }


      componentWillUnmount() {
        //  console.log('CMF-UNMOUNTED')
        this.props.handleClearVisitKeyValues()
          }

    componentDidMount () {
//console.log('sajid did mounty')

       if (
            (this.props.visitHeaderResult &&  this.props.visitHeaderResult.data && !this.props.visitKeyValuesResult ) ||
            (this.props.visitHeaderResult &&  
                this.props.visitHeaderResult.data &&  
                this.props.visitKeyValuesResult && 
                !this.props.visitKeyValuesResult.data) || 
            (this.props.visitHeaderResult &&  
                this.props.visitHeaderResult.data &&  
                this.props.visitKeyValuesResult && 
                this.props.visitKeyValuesResult.data &&
                !this.props.visitKeyValuesResult.data.visitKeyValues) 
        ) { 
            this.props.handleGetVisitKeyValues(this.props.visitHeaderResult.data, categories.currentMedications.id,1)
        }

        // {
        //     console.log()
        // }
            this.setState({
                patientMeetsAECGCGCA: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getDetailsControlValue(categories.diagnosis.id, patientMeetsAECGCriteria.chkPatientMeetsAECGCriteria,this.props.visitResult.data.details):'',            
                patientHasPhysiciansDiagnosis: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.visits && this.props.visitResult.data.visits.length > 0 ? getVisitOptionControlValue(categories.diagnosis.id, patientHasPhysiciansDiagnosis.optPatientHasPhysiciansDiagnosis,this.props.visitResult.data.visits):'',
               
                pulseIVCorticosteroids: this.props.visitResult && 
                                        this.props.visitResult.data && 
                                        this.props.visitResult.data.visits && 
                                        this.props.visitResult.data.visits.length > 0 ? 
                                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                                        immunomodulatory.ddlPulseIVCorticosteroids,
                                                                        this.props.visitResult.data.visits):null,








               corticosteroids: this.props.visitResult && 
                               this.props.visitResult.data && 
                              this.props.visitResult.data.visits && 
                               this.props.visitResult.data.visits.length > 0 ? 
                              getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                       immunomodulatory.ddlCorticosteroids,
                                                                                                                       this.props.visitResult.data.visits):null,
                                                                                                                       
                                                                           
                                                     hydroxychloroquine: this.props.visitResult && 
                                                                                       this.props.visitResult.data && 
                                                                                       this.props.visitResult.data.visits && 
                                                                                       this.props.visitResult.data.visits.length > 0 ? 
                                                                                       getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                       immunomodulatory.ddlHydroxychloroquine,
                                                                                                                       this.props.visitResult.data.visits):null,
                                                                                                                       
                                                       
                                                     azathioprine:this.props.visitResult && 
                                                                                   this.props.visitResult.data && 
                                                                                   this.props.visitResult.data.visits && 
                                                                                   this.props.visitResult.data.visits.length > 0 ? 
                                                                                   getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                   immunomodulatory.ddlAzathioprine,
                                                                                                                   this.props.visitResult.data.visits):null,
                                                    mycophenolate:this.props.visitResult && 
                                                                                   this.props.visitResult.data && 
                                                                                   this.props.visitResult.data.visits && 
                                                                                   this.props.visitResult.data.visits.length > 0 ? 
                                                                                   getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                   immunomodulatory.ddlMycophenolate,
                                                                                                                   this.props.visitResult.data.visits):null,
                                                      methotrexate:this.props.visitResult && 
                                                                                this.props.visitResult.data && 
                                                                                this.props.visitResult.data.visits && 
                                                                                this.props.visitResult.data.visits.length > 0 ? 
                                                                                getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                   immunomodulatory.ddlMethotrexate,
                                                                                                   this.props.visitResult.data.visits):null,
                                                     leflunomide:this.props.visitResult && 
                                                                               this.props.visitResult.data && 
                                                                               this.props.visitResult.data.visits && 
                                                                               this.props.visitResult.data.visits.length > 0 ? 
                                                                               getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                               immunomodulatory.ddlLeflunomide,
                                                                                               this.props.visitResult.data.visits):null,
                                                     cyclophosphamide:this.props.visitResult && 
                                                                                   this.props.visitResult.data && 
                                                                                   this.props.visitResult.data.visits && 
                                                                                   this.props.visitResult.data.visits.length > 0 ? 
                                                                                   getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                   immunomodulatory.ddlCyclophosphamide,
                                                                                                   this.props.visitResult.data.visits):null,
                                                     iVIg:this.props.visitResult && 
                                                                        this.props.visitResult.data && 
                                                                        this.props.visitResult.data.visits && 
                                                                        this.props.visitResult.data.visits.length > 0 ? 
                                                                        getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                           immunomodulatory.ddlIVIg,
                                                                                           this.props.visitResult.data.visits):null,
                                                     etanercept:this.props.visitResult && 
                                                                               this.props.visitResult.data && 
                                                                               this.props.visitResult.data.visits && 
                                                                               this.props.visitResult.data.visits.length > 0 ? 
                                                                               getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                               immunomodulatory.ddlEtanercept,
                                                                                               this.props.visitResult.data.visits):null,
                                                     infliximab:this.props.visitResult && 
                                                                               this.props.visitResult.data && 
                                                                               this.props.visitResult.data.visits && 
                                                                               this.props.visitResult.data.visits.length > 0 ? 
                                                                               getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                               immunomodulatory.ddlInfliximab,
                                                                                               this.props.visitResult.data.visits):null,
                                                     rituximab:this.props.visitResult && 
                                                                           this.props.visitResult.data && 
                                                                           this.props.visitResult.data.visits && 
                                                                           this.props.visitResult.data.visits.length > 0 ? 
                                                                           getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                           immunomodulatory.ddlRituximab,
                                                                                           this.props.visitResult.data.visits):null,
                                                    other:this.props.visitResult && 
                                                                           this.props.visitResult.data && 
                                                                           this.props.visitResult.data.visits && 
                                                                           this.props.visitResult.data.visits.length > 0 ? 
                                                                           getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                           immunomodulatory.ddlOther,
                                                                                           this.props.visitResult.data.visits):null,
                                       
                                       



                                                                                           pulseIVCorticosteroidsOpen:false,
                                                                                           corticosteroidsOpen:false,
                                                                                           hydroxychloroquineOpen:false,
                                                                                           azathioprineOpen:false,
                                                                                           mycophenolateOpen:false,
                                                                                           methotrexateOpen:false,
                                                                                           leflunomideOpen:false,
                                                                                           cyclophosphamideOpen:false,
                                                                                           iVIgOpen:false,
                                                                                           etanerceptOpen:false,
                                                                                           infliximabOpen:false,
                                                                                           rituximabOpen:false,
                                                                                           //otherOpen:false,



                    // symptomaticTreatmentsYes:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.currentMedications.id, immunomodulatory.chkSymptomaticTreatmentsYes,this.props.visitResult.data.details):null,           
                    // symptomaticTreatmentsNo:this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.details && this.props.visitResult.data.details.length > 0 ? getDetailsControlValue(categories.currentMedications.id, immunomodulatory.chkSymptomaticTreatmentsNo,this.props.visitResult.data.details):null,           
                                                                                     


                    pilocarpine: this.props.visitResult && 
                                 this.props.visitResult.data && 
                                 this.props.visitResult.data.visits && 
                                 this.props.visitResult.data.visits.length > 0 ? 
                                 getVisitOptionControlValue(categories.currentMedications.id, 
                                                           immunomodulatory.ddlPilocarpine,
                                                           this.props.visitResult.data.visits):null,
                                                               
                                                                           
                                                                         
                                                                           tearSubstitute: this.props.visitResult && 
                                                                                       this.props.visitResult.data && 
                                                                                       this.props.visitResult.data.visits && 
                                                                                       this.props.visitResult.data.visits.length > 0 ? 
                                                                                       getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                         immunomodulatory.ddlTearSubstitute,
                                                                                                                         this.props.visitResult.data.visits):null,
                                                               
                                                                           salivaSubstitute: this.props.visitResult && 
                                                                                       this.props.visitResult.data && 
                                                                                       this.props.visitResult.data.visits && 
                                                                                       this.props.visitResult.data.visits.length > 0 ? 
                                                                                      getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                         immunomodulatory.ddlSalivaSubstitute,
                                                                                                                        this.props.visitResult.data.visits):null,
                                                               
                                                                                                                        
                                                                           antiDepressants: this.props.visitResult && 
                                                                                           this.props.visitResult.data && 
                                                                                           this.props.visitResult.data.visits && 
                                                                                           this.props.visitResult.data.visits.length > 0 ? 
                                                                                           getVisitOptionControlValue(categories.currentMedications.id, 
                                                                                                                           immunomodulatory.ddlAntiDepressants,
                                                                                                                           this.props.visitResult.data.visits):null,
                                                                                                                                          
                                                               
                                                                           pilocarpineOpen:false,
                                                                           tearSubstituteOpen:false,
                                                                           salivaSubstituteOpen:false,
                                                                           antiDepressantsOpen:false,





otherITs: this.props.visitKeyValuesResult && 
          this.props.visitKeyValuesResult.data && 
          this.props.visitKeyValuesResult.data.visitKeyValues ? 
          this.props.visitKeyValuesResult.data.visitKeyValues : [],


// otherITs: nextProps.visitHeaderResult && 
// nextProps.visitHeaderResult.data &&
// nextProps.visitKeyValuesResult && 
// nextProps.visitKeyValuesResult.data && 
// nextProps.visitKeyValuesResult.data.visitKeyValues ? 
// nextProps.visitKeyValuesResult.data.visitKeyValues : 
// nextProps.handleGetVisitKeyValues(nextProps.visitHeaderResult.data, categories.currentMedications.id,1),


 //    if (
    //         (this.props.visitHeaderResult &&  this.props.visitHeaderResult.data && !this.props.visitKeyValuesResult ) ||
    //         (this.props.visitHeaderResult &&  
    //             this.props.visitHeaderResult.data &&  
    //             this.props.visitKeyValuesResult && 
    //             !this.props.visitKeyValuesResult.data) || 
    //         (this.props.visitHeaderResult &&  
    //             this.props.visitHeaderResult.data &&  
    //             this.props.visitKeyValuesResult && 
    //             this.props.visitKeyValuesResult.data &&
    //             !this.props.visitKeyValuesResult.data.visitKeyValues) 
    //     ) { 
    //         this.props.handleGetVisitKeyValues(this.props.visitHeaderResult.data, categories.currentMedications.id,1)
    //     }


        //   otherITs: (this.props.visitHeaderResult &&  this.props.visitHeaderResult.data && !this.props.visitKeyValuesResult ) ||
        //             (this.props.visitHeaderResult &&  
        //                 this.props.visitHeaderResult.data &&  
        //                  this.props.visitKeyValuesResult && 
        //                  !this.props.visitKeyValuesResult.data) || 
        //                  (this.props.visitHeaderResult &&  
        //                                  this.props.visitHeaderResult.data &&  
        //                                  this.props.visitKeyValuesResult && 
        //                               this.props.visitKeyValuesResult.data &&
        //                                !this.props.visitKeyValuesResult.data.visitKeyValues)? 
        //                                this.props.handleGetVisitKeyValues(this.props.visitHeaderResult.data, categories.currentMedications.id,1) :this.props.visitKeyValuesResult.data.visitKeyValues,

                createdUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdUser,
                createdDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.createdDatetime,
                lastUpdatedUser: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedUser,
                lastUpdatedDateTime: this.props.visitResult && this.props.visitResult.data && this.props.visitResult.data.lastUpdatedDatetime,
               
                changed:false,
            });
       }

      


renderLoadingMessage(){
    return (
        <PanelDefault title={"... Loading Current Medications"}>
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
            <h3 className="panel-title pull-left">Current Medications</h3>
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
nextCategoryName = {VISIT_CATEGORY_ESSPRI}
prevCategoryName = {VISIT_CATEGORY_DIAGNOSIS}
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
                <h3 className="panel-title">Current Medications</h3>
                
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
nextCategoryName = {VISIT_CATEGORY_ESSDAI}
prevCategoryName = {VISIT_CATEGORY_DIAGNOSIS}

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
                <div className="page-header col-lg-4 col-md-4 col-sm-12 mb-5">Has your patient received any of the following therapy?</div>  
                </div>
                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">

                <FadeIn>
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.pulseIVCorticosteroidsOpen}
                        treatmentName={immunomodulatory.treatments[0]}
                        handleToggle={this.handlePulseIVCorticosteroidsToggle}
                        handleChange={this.handlePulseIVCorticosteroidsChange}
                        selectedDose={this.state.pulseIVCorticosteroids > 0 ? this.state.pulseIVCorticosteroids :null }
                        doses={immunomodulatory.ddlPulseIVCorticosteroids}/>
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.corticosteroidsOpen}
                        treatmentName={immunomodulatory.treatments[1]}
                        handleToggle={this.handleCorticosteroidsToggle}
                        handleChange={this.handleCorticosteroidsChange}
                        selectedDose={this.state.corticosteroids > 0 ? this.state.corticosteroids : null} 
                        doses={immunomodulatory.ddlCorticosteroids}/>
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.hydroxychloroquineOpen}
                        treatmentName={immunomodulatory.treatments[2]}
                        handleToggle={this.handleHydroxychloroquineToggle}
                        handleChange={this.handleHydroxychloroquineChange}
                        selectedDose={this.state.hydroxychloroquine > 0 ? this.state.hydroxychloroquine : null} 
                        doses={immunomodulatory.ddlHydroxychloroquine}/>
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.azathioprineOpen}
                        treatmentName={immunomodulatory.treatments[3]}
                        handleToggle={this.handleAzathioprineToggle}
                        handleChange={this.handleAzathioprineChange}
                        selectedDose={this.state.azathioprine > 0 ? this.state.azathioprine : null} 
                        doses={immunomodulatory.ddlAzathioprine}/>
                      
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.mycophenolateOpen}
                        treatmentName={immunomodulatory.treatments[4]}
                        handleToggle={this.handleMycophenolateToggle}
                        handleChange={this.handleMycophenolateChange}
                        selectedDose={this.state.mycophenolate > 0 ? this.state.mycophenolate : null} 
                        doses={immunomodulatory.ddlMycophenolate}/>
                    <CurrentMedicationsDose 
                         isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.methotrexateOpen}
                        treatmentName={immunomodulatory.treatments[5]}
                        handleToggle={this.handleMethotrexateToggle}
                        handleChange={this.handleMethotrexateChange}
                        selectedDose={this.state.methotrexate > 0 ? this.state.methotrexate : null} 
                        doses={immunomodulatory.ddlMethotrexate}/>

                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.leflunomideOpen}
                        treatmentName={immunomodulatory.treatments[6]}
                        handleToggle={this.handleLeflunomideToggle}
                        handleChange={this.handleLeflunomideChange}
                        selectedDose={this.state.leflunomide > 0 ? this.state.leflunomide : null} 
                        doses={immunomodulatory.ddlLeflunomide}/>  

                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.cyclophosphamideOpen}
                        treatmentName={immunomodulatory.treatments[7]}
                        handleToggle={this.handleCyclophosphamideToggle}
                        handleChange={this.handleCyclophosphamideChange}
                        selectedDose={this.state.cyclophosphamide > 0 ? this.state.cyclophosphamide : null} 
                        doses={immunomodulatory.ddlCyclophosphamide}/>  
                    
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.iVIgOpen}
                        treatmentName={immunomodulatory.treatments[8]}
                        handleToggle={this.handleIVIgToggle}
                        handleChange={this.handleIVIgChange}
                        selectedDose={this.state.iVIg > 0 ? this.state.iVIg : null} 
                        doses={immunomodulatory.ddlIVIg}/>
                

                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.etanerceptOpen}
                        treatmentName={immunomodulatory.treatments[9]}
                        handleToggle={this.handleEtanerceptToggle}
                        handleChange={this.handleEtanerceptChange}
                        selectedDose={this.state.etanercept > 0 ? this.state.etanercept : null} 
                        doses={immunomodulatory.ddlEtanercept}/>
                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.infliximabOpen}
                        treatmentName={immunomodulatory.treatments[10]}
                        handleToggle={this.handleInfliximabToggle}
                        handleChange={this.handleInfliximabChange}
                        selectedDose={this.state.infliximab > 0 ? this.state.infliximab : null} 
                        doses={immunomodulatory.ddlInfliximab}/>

                    <CurrentMedicationsDose 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.rituximabOpen}
                        treatmentName={immunomodulatory.treatments[11]}
                        handleToggle={this.handleRituximabToggle}
                        handleChange={this.handleRituximabChange}
                        selectedDose={this.state.rituximab > 0 ? this.state.rituximab : null} 
                        doses={immunomodulatory.ddlRituximab}/>
            </FadeIn>
            </div>
            </div>
{
    this.state.otherITs.map(this.buildOtherITList)
}
{
this.props.visitHeaderResult && 
    this.props.visitHeaderResult.data && 
    !this.props.visitHeaderResult.data.completed &&

    <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
<FadeIn>
    <CurrentMedicationsOtherAdd
                add={this.state.addOtherIT}
                handleAddToggle={this.handleAddOtherITToggle}
                save={this.handleSaveOtherIT}
                doses={immunomodulatory.ddlOther}
                otherITs={this.state.otherITs}
    />
</FadeIn>
</div>
</div>
}
                      </div>
                      </div>
                       <div className="row mt-5">
                       <div className="col-md-12"> 
                       <div className="form-group row">
                <div className="page-header col-lg-5 col-md-5 col-sm-12 mb-5">Has your patient received any of the following Symptomatic therapy?</div>  
                </div>
                        
                <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                <FadeIn>
                  <CurrentMedicationsSymptomatic 
                  isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.pilocarpineOpen}
                        treatmentName={immunomodulatory.symptomaticTreatments[0]}
                        handleToggle={this.handlePilocarpineToggle}
                        handleChange={this.handlePilocarpineChange}
                        selectedDose={this.state.pilocarpine > 0 ? this.state.pilocarpine : null} 
                        doses={immunomodulatory.ddlPilocarpine}/>

                      

                        <CurrentMedicationsSymptomatic 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.tearSubstituteOpen}
                        treatmentName={immunomodulatory.symptomaticTreatments[1]}
                        handleToggle={this.handleTearSubstituteToggle}
                        handleChange={this.handleTearSubstituteChange}
                        selectedDose={this.state.tearSubstitute > 0 ? this.state.tearSubstitute : null} 
                        doses={immunomodulatory.ddlTearSubstitute}/>

                        <CurrentMedicationsSymptomatic 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.salivaSubstituteOpen}
                        treatmentName={immunomodulatory.symptomaticTreatments[2]}
                        handleToggle={this.handleSalivaSubstituteToggle}
                        handleChange={this.handleSalivaSubstituteChange}
                        selectedDose={this.state.salivaSubstitute > 0 ? this.state.salivaSubstitute : null} 
                        doses={immunomodulatory.ddlSalivaSubstitute}/>


                        <CurrentMedicationsSymptomatic 
                        isComplete={ this.props.visitHeaderResult && 
                                 this.props.visitHeaderResult.data && 
                                 this.props.visitHeaderResult.data.completed ? 
                                 this.props.visitHeaderResult.data.completed :
                                 false}
                        treatmentDoseOpen={this.state.antiDepressantsOpen}
                        treatmentName={immunomodulatory.symptomaticTreatments[3]}
                        handleToggle={this.handleAntiDepressantsToggle}
                        handleChange={this.handleAntiDepressantsChange}
                        selectedDose={this.state.antiDepressants > 0 ? this.state.antiDepressants : null} 
                        doses={immunomodulatory.ddlAntiDepressants}/>

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

 export default CurrentMedicationsForm;

