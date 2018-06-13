import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../../components/generic/panel-default';
import PanelConsentSuccess from '../../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../../components/generic/panel-consent-remove';
import PanelNoConsent from '../../../components/generic/panel-no-consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../../factory/date-functions'
import {paths} from '../../../constants/paths/environment';
import ModalDefault from '../../../components/generic/modal-default';
import {OCULARSIGNSOBJECTIVE} from '../../../constants/styles/modal';
import {OBJECTIVEEVIDENCE} from '../../../constants/styles/modal';
import {consentCtrls} from '../../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import InputGroupAddOnLR from '../../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../../components/generic/input/input-group-add-on-r';
// import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../../Factory/reg-ex';
// import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {isAlpha, isAlphanumericSpace, isAlphanumeric, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../../config/controls/american-european-cgc';
import {AECGC} from '../../../constants/styles/input';
import ReactTooltip from 'react-tooltip';
import {AECGCValidationMessages} from '../../../constants/information/messages';
import {AECGCFields} from '../../../constants/information/field-length'; 
import {trim, left, right} from 'trim';
import {ocularSignsObjectiveValidation, objectiveEvidenceValidation, meetsAECGCCriteria, maxLengthCheck,addZeroes} from '../../../components/visit/modules/functions';


class ObjectiveEvidenceModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            objectiveEvidenceConfirmA: this.props.objectiveEvidenceA ? this.props.objectiveEvidenceA:'',
            objectiveEvidenceConfirmAMl:  this.props.objectiveEvidenceAMl ? this.props.objectiveEvidenceAMl :'',
            objectiveEvidenceConfirmAMins:  this.props.objectiveEvidenceAMins ? this.props.objectiveEvidenceAMins :'',
            objectiveEvidenceConfirmANA:this.props.objectiveEvidenceANA ? this.props.objectiveEvidenceANA :false,

            isConfirmed:false,
            isValid:false,
            errors:{}
        };

        this.modalClose = this.modalClose.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.handleConfirmed = this.handleConfirmed.bind(this);

        this.optObjectiveEvidenceConfirmA_onChange = this.optObjectiveEvidenceConfirmA_onChange.bind(this);
        this.objectiveEvidenceConfirmAMl_onChange = this.objectiveEvidenceConfirmAMl_onChange.bind(this);
        this.objectiveEvidenceConfirmAMins_onChange = this.objectiveEvidenceConfirmAMins_onChange.bind(this);
        this.objectiveEvidenceConfirmANA_onChange = this.objectiveEvidenceConfirmANA_onChange.bind(this);

        this.objectiveEvidenceConfirmAMl_onKeyPress = this.objectiveEvidenceConfirmAMl_onKeyPress.bind(this);
        this.objectiveEvidenceConfirmAMins_onKeyPress = this.objectiveEvidenceConfirmAMins_onKeyPress.bind(this);
        this.objectiveEvidenceConfirmAMl_onBlur = this.objectiveEvidenceConfirmAMl_onBlur.bind(this);

        this.maxLengthCheckConfirm_ml = this.maxLengthCheckConfirm_ml.bind(this);
    }



    maxLengthCheckConfirm_ml(object) {
        if ((object.target.value.length > object.target.maxLength) ||  (!twoDigitsOnly2DecimalPlaces(object.target.value)))
            {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
            }
    }

    handleConfirmed(){
        
    let errors = {};
    
       
    
    if(!this.state.objectiveEvidenceConfirmA && (!this.state.objectiveEvidenceConfirmANA &&
        (this.state.objectiveEvidenceConfirmAMl.length == 0 && this.state.objectiveEvidenceConfirmAMins.length == 0) )) {
            errors.objectiveEvidenceConfirm = AECGCValidationMessages.objectiveEvidence.required;  
        }


    if (!this.state.objectiveEvidenceConfirmANA &&
        this.state.objectiveEvidenceConfirmAMl.length === 0 && 
        this.state.objectiveEvidenceConfirmAMins.length > 0 &&
        digitsOnly(this.state.objectiveEvidenceConfirmAMins) &&
        digitsRange(this.state.objectiveEvidenceConfirmAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
        errors.objectiveEvidenceConfirmAMl = AECGCValidationMessages.objectiveEvidence.mlRequired;  
        }


    if (!this.state.objectiveEvidenceConfirmANA &&
        this.state.objectiveEvidenceConfirmAMins.length === 0 && 
        this.state.objectiveEvidenceConfirmAMl.length > 0 &&
        twoDigitsOnly2DecimalPlaces(this.state.objectiveEvidenceConfirmAMl) &&
        digitsRange(this.state.objectiveEvidenceConfirmAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
        errors.objectiveEvidenceConfirmAMins = AECGCValidationMessages.objectiveEvidence.minsRequired;  
}    



if (!this.state.objectiveEvidenceConfirmANA &&
    this.state.objectiveEvidenceConfirmAMl.length > 0  && 
    !twoDigitsOnly2DecimalPlaces(this.state.objectiveEvidenceConfirmAMl)) {
    errors.objectiveEvidenceConfirmAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.mlInvalid;
} 


if (!this.state.objectiveEvidenceConfirmANA &&
    this.state.objectiveEvidenceConfirmAMins.length > 0  && 
    !digitsOnly(this.state.objectiveEvidenceConfirmAMins)) {
    errors.objectiveEvidenceConfirmAMinsInvalidNumber = AECGCValidationMessages.objectiveEvidence.minsInvalid;
} 




if (!this.state.objectiveEvidenceConfirmANA && 
            this.state.objectiveEvidenceConfirmAMl.length > 0  && 
            !digitsRange(this.state.objectiveEvidenceConfirmAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
            errors.objectiveEvidenceConfirmAMlRange = AECGCValidationMessages.objectiveEvidence.mlRange; 
      }         

if (!this.state.objectiveEvidenceConfirmANA && 
      this.state.objectiveEvidenceConfirmAMins.length > 0  && 
      !digitsRange(this.state.objectiveEvidenceConfirmAMins, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
      errors.objectiveEvidenceConfirmAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;           
    } 

     

        this.setState({errors});      
    
        const isValid = Object.keys(errors).length === 0   
    
        if (isValid)
        {
              this.props.objectiveEvidenceConfirmed(this.state.objectiveEvidenceConfirmA,this.state.objectiveEvidenceConfirmAMl, this.state.objectiveEvidenceConfirmAMins, this.state.objectiveEvidenceConfirmANA)
        }
       }


    componentWillReceiveProps(nextProps){
      this.setState({
                objectiveEvidenceConfirmA:  nextProps.objectiveEvidenceA ? nextProps.objectiveEvidenceA:'',
                objectiveEvidenceConfirmAMl:  nextProps.objectiveEvidenceAMl ? nextProps.objectiveEvidenceAMl :'',
                objectiveEvidenceConfirmAMins:  nextProps.objectiveEvidenceAMins ? nextProps.objectiveEvidenceAMins :'',
                objectiveEvidenceConfirmANA: nextProps.objectiveEvidenceANA ? nextProps.objectiveEvidenceANA :false,
    
                isConfirmed:false,
                isValid:false
            })
      }



      componentDidMount () {
            this.setState({        
                objectiveEvidenceConfirmA: this.props.objectiveEvidenceA ? this.props.objectiveEvidenceA:'',
                objectiveEvidenceConfirmAMl:  this.props.objectiveEvidenceAMl ? this.props.objectiveEvidenceAMl :'',
                objectiveEvidenceConfirmAMins:  this.props.objectiveEvidenceAMins ? this.props.objectiveEvidenceAMins :'',
                objectiveEvidenceConfirmANA:this.props.objectiveEvidenceANA ? this.props.objectiveEvidenceANA :false,
                isConfirmed:false,
                isValid:false
            });
       }




modalClose(){
    
    
    
        this.props.objectiveEvidenceModalClose();
    //}
}

afterOpenModal(){
   // var p = ''
    //use this to clear any error
   // this.props.afterOpenConsentModal();
}




optObjectiveEvidenceConfirmA_onChange(e){

    let errorsClone = Object.assign({},this.state.errors);
    //remove field we just type into from errors.
    
    delete errorsClone['objectiveEvidenceConfirm'];
    delete errorsClone['objectiveEvidenceConfirmAMl'];
    delete errorsClone['objectiveEvidenceConfirmAMlRange'];
    delete errorsClone['objectiveEvidenceConfirmAMins'];
    delete errorsClone['objectiveEvidenceConfirmAMinsRange'];

    this.setState({ 
      errors:errorsClone,
      objectiveEvidenceConfirmAMl:'',
      objectiveEvidenceConfirmAMins:'',
      objectiveEvidenceConfirmA: e.target.value,
      changed:true
   });
}

/* start */

objectiveEvidenceConfirmAMl_onBlur(e){
       
 if (this.state.objectiveEvidenceConfirmAMl.trim().length > 0) { 
    var mlNum = parseFloat(e.target.value);
    
        if (!!this.state.errors['objectiveEvidenceConfirmAMlInvalidNumber']){
            //One of the above error has occurred 
          //  console.log(this.state.errors);
           // console.log('objectiveEvidenceAMlInvalidNumber error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
         
           if (e.target.value.length > 0){
    
    
            if (twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2))) {
               // console.log('Entered value is ok');
                delete errorsClone['objectiveEvidenceConfirmAMlInvalidNumber'];
               }
           }
           else {
            delete errorsClone['objectiveEvidenceConfirmAMlInvalidNumber'];
           }
          
         
           if (Object.keys(errorsClone).length === 0){
            this.setState({
                objectiveEvidenceConfirmAMl:mlNum.toFixed(2),//e.target.value,
                changed:true,
                errors:errorsClone,
                objectiveEvidenceA: e.target.value.trim().length > 0 && 
                                    (this.state.objectiveEvidenceConfirmAMins && this.state.objectiveEvidenceConfirmAMins.length > 0 && this.state.objectiveEvidenceConfirmAMins > 0) ? 
                                    salivaryFlowRate(mlNum.toFixed(2),this.state.objectiveEvidenceConfirmAMins) ?
                                    objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                    objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null
               })
           }
           else {
                //copy clone back to errors in state
                this.setState({
                    //[e.target.name]: e.target.value,
                    errors:errorsClone,
                    objectiveEvidenceConfirmAMl:mlNum.toFixed(2),//e.target.value,
                    objectiveEvidenceConfirmA:null,
                    changed:true
                });
           }
    
    
         
          }
           else {
    
               if (e.target.value.length > 0  && 
                (!twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2)))) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                  // console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);   
                //delete errorsClone['objectEvidence'];
    
                // if (!digitsOnly(e.target.value)){
                //     errorsClone.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
                //     } else
    
                if (!twoDigitsOnly2DecimalPlaces(mlNum.toFixed(2))){
                    errorsClone.objectiveEvidenceConfirmAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.mlInvalid;//'Ml: 2 numbers, optional 2 decimals ';
                }
              
    
                   this.setState({
                               errors:errorsClone,
                               objectiveEvidenceConfirmAMl:mlNum.toFixed(2),//e.target.value,
                               objectiveEvidenceConfirmA:null,
                               changed:true,
                           })
               } 
               else {
                    // console.log('no invalid values update state with no error');
                     this.setState({
                            objectiveEvidenceConfirmAMl:mlNum.toFixed(2),//e.target.value,
                            changed:true,
                            objectiveEvidenceConfirmA: e.target.value.trim().length > 0 && 
                                                (this.state.objectiveEvidenceConfirmAMins && this.state.objectiveEvidenceConfirmAMins.length > 0 && this.state.objectiveEvidenceConfirmAMins > 0) ? 
                                                salivaryFlowRate(mlNum.toFixed(2),this.state.objectiveEvidenceConfirmAMins) ?
                                                objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
    
                           })
                       }
               }
            }
    }


/* end */

objectiveEvidenceConfirmAMl_onChange(e){
    
        if (!!this.state.errors['objectiveEvidenceConfirmAMl'] || 
            !!this.state.errors['objectiveEvidenceConfirmAMlRange'] || 
            !!this.state.errors['objectiveEvidenceConfirmAMlInvalidNumber']){
            //One of the above error has occurred 
         //   console.log(this.state.errors);
          //  console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['objectiveEvidenceConfirmAMl'];
           delete errorsClone['objectiveEvidenceConfirmAMlInvalidNumber'];
           //Only delete range error if current value is ok
    
           if (e.target.value.length > 0){
    
        
            if (digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) {
               // console.log('Entered value is ok');
                delete errorsClone['objectiveEvidenceConfirmAMlRange'];
               }
    
           }
           else {
            delete errorsClone['objectiveEvidenceConfirmAMlRange'];
           }
          
         
           if (Object.keys(errorsClone).length === 0){
            this.setState({
                objectiveEvidenceConfirmAMl:e.target.value,
                changed:true,
                errors:errorsClone,
                objectiveEvidenceA: e.target.value.trim().length > 0 && twoDigitsOnly2DecimalPlaces(e.target.value) &&
                                    (this.state.objectiveEvidenceConfirmAMins && this.state.objectiveEvidenceConfirmAMins.length > 0 && this.state.objectiveEvidenceConfirmAMins > 0) ? 
                                    salivaryFlowRate(e.target.value,this.state.objectiveEvidenceConfirmAMins) ?
                                    objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                    objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null
    
               })
    
           }
           else {
                //copy clone back to errors in state
                this.setState({
                    //[e.target.name]: e.target.value,
                    errors:errorsClone,
                    objectiveEvidenceConfirmAMl:e.target.value,
                    objectiveEvidenceConfirmA:null,
                    changed:true
                });
           }
    
    
         
          }
           else {
    
               if (e.target.value.length > 0  && 
                (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax))) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                 //  console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);   
                //delete errorsClone['objectEvidence'];
    
                // if (!digitsOnly(e.target.value)){
                //     errorsClone.objectiveEvidenceAMlInvalidNumber = AECGCValidationMessages.objectiveEvidence.invalid;
                //     } else
    
               if (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)){
                   errorsClone.objectiveEvidenceConfirmAMlRange = AECGCValidationMessages.objectiveEvidence.mlRange;//'Ml min 0.00, max 99';
                }
                
    
                   this.setState({
                               errors:errorsClone,
                               objectiveEvidenceConfirmAMl:e.target.value,
                               objectiveEvidenceConfirmA:null,
                               changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                     this.setState({
                            objectiveEvidenceConfirmAMl:e.target.value,
                            changed:true,
                            objectiveEvidenceConfirmA: e.target.value.trim().length > 0 && twoDigitsOnly2DecimalPlaces(e.target.value) &&
                                                (this.state.objectiveEvidenceConfirmAMins && this.state.objectiveEvidenceConfirmAMins.length > 0 && this.state.objectiveEvidenceConfirmAMins > 0) ? 
                                                salivaryFlowRate(e.target.value,this.state.objectiveEvidenceConfirmAMins) ?
                                                objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null,
    
                           })
                       }
               }
    }



objectiveEvidenceConfirmAMins_onChange(e){

    if (!!this.state.errors['objectiveEvidenceConfirmAMins'] || 
        !!this.state.errors['objectiveEvidenceConfirmAMinsRange']  ||
        !!this.state.errors['objectiveEvidenceConfirmAMinsInvalidNumber']){
        //One of the above error has occurred 
        //console.log('One of the above error has occurred');
      //clone object from state 
      let errorsClone = Object.assign({},this.state.errors);
      //remove field we just type into from errors.
      // delete errorsClone[e.target.name];
       //Delete the required field      
       delete errorsClone['objectiveEvidenceConfirmAMins'];
       delete errorsClone['objectiveEvidenceConfirmAMinsInvalidNumber'];
       //Only delete range error if current value is ok
       if (e.target.value.length > 0) {

        if (digitsRange(e.target.value, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) {
          //  console.log('Entered value is ok');
            delete errorsClone['objectiveEvidenceConfirmAMinsRange'];
            }
       }
       else {
        delete errorsClone['objectiveEvidenceConfirmAMinsRange'];
       }
  
        if (Object.keys(errorsClone).length === 0){
            this.setState({
                objectiveEvidenceConfirmAMins:e.target.value,
                    changed:true,
                    errors:errorsClone,
                    objectiveEvidenceConfirmA: (e.target.value.trim().length > 0 && e.target.value > 0 ) && digitsOnly(e.target.value) && 
                                                (this.state.objectiveEvidenceConfirmAMl && this.state.objectiveEvidenceConfirmAMl.length > 0) ? 
                                                salivaryFlowRate(this.state.objectiveEvidenceConfirmAMl,e.target.value) ?
                                                objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null
                })
        }
        else {
                    //copy clone back to errors in state
                    this.setState({
                        //[e.target.name]: e.target.value,
                        errors:errorsClone,
                        objectiveEvidenceConfirmAMins:e.target.value,
                        objectiveEvidenceConfirmA:null,
                        changed:true
                    });
            }
        
    }
       else {

           if (e.target.value.length > 0  && 
            (!digitsRange(e.target.value,AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax))) {
               //no errors for this field existed before
              // console.log('no errors for this field existed before')
             //  console.log('and user has eneterd invalid value')
               //and user has eneterd invalid value
               //clone errors and add to state
               let errorsClone = Object.assign({},this.state.errors);
             
               if (!digitsRange(e.target.value, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)){
                    errorsClone.objectiveEvidenceConfirmAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Right eye min: 0, max 40';
                }

              // errorsClone.objectiveEvidenceConfirmAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Mins min: 0, max 60';

               this.setState({
                           errors:errorsClone,
                           objectiveEvidenceConfirmAMins:e.target.value,
                           objectiveEvidenceConfirmA:null,
                           changed:true,
                       })
           } 
           else {
               //  console.log('no invalid values update state with no error');
                 this.setState({
                    objectiveEvidenceConfirmAMins:e.target.value,
                        changed:true,
                        objectiveEvidenceConfirmA: (e.target.value.trim().length > 0 && e.target.value > 0) && digitsOnly(e.target.value) && 
                                                    (this.state.objectiveEvidenceConfirmAMl && this.state.objectiveEvidenceConfirmAMl.length > 0) ? 
                                                    salivaryFlowRate(this.state.objectiveEvidenceConfirmAMl,e.target.value) ?
                                                    objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                    objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null

                       })
                   }
           }
}




objectiveEvidenceConfirmAMins_onBlur(e){
    
    
 if (this.state.objectiveEvidenceAMins.trim().length > 0) { 

        if ( !!this.state.errors['objectiveEvidenceConfirmAMinsInvalidNumber']){
            //One of the above error has occurred 
          // console.log('One of the above error has occurred');
          //clone object from state 
          let errorsClone = Object.assign({},this.state.errors);
          //remove field we just type into from errors.
          // delete errorsClone[e.target.name];
           //Delete the required field      
           delete errorsClone['objectiveEvidenceConfirmAMins'];
           //Only delete range error if current value is ok
           if (e.target.value.length > 0) {
    
            if (digitsOnly(e.target.value)){
                delete errorsClone['objectiveEvidenceConfirmAMinsInvalidNumber'];
            }
    
           }
           else {
            delete errorsClone['objectiveEvidenceConfirmAMinsInvalidNumber'];
           }
      
            if (Object.keys(errorsClone).length === 0){
                this.setState({
                    objectiveEvidenceConfirmAMins:e.target.value,
                        changed:true,
                        errors:errorsClone,
                        objectiveEvidenceConfirmA: (e.target.value.trim().length > 0 && e.target.value > 0 ) &&
                                                    (this.state.objectiveEvidenceConfirmAMl && 
                                                    this.state.objectiveEvidenceConfirmAMl.length > 0  &&
                                                    digitsRange(this.state.objectiveEvidenceConfirmAMl, AECGCFields.objectiveEvidenceMlMin, AECGCFields.objectiveEvidenceMlMax)) ? 
                                                    salivaryFlowRate(this.state.objectiveEvidenceConfirmAMl,e.target.value) ?
                                                    objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                    objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null
                    })
            }
            else {
                        //copy clone back to errors in state
                        this.setState({
                            //[e.target.name]: e.target.value,
                            errors:errorsClone,
                            objectiveEvidenceConfirmAMins:e.target.value,
                            objectiveEvidenceConfirmA:null,
                            changed:true
                        });
                }
            
        }
           else {
    
               if (e.target.value.length > 0  && 
                (!digitsOnly(e.target.value))) {
                   //no errors for this field existed before
                 //  console.log('no errors for this field existed before')
                 //  console.log('and user has eneterd invalid value')
                   //and user has eneterd invalid value
                   //clone errors and add to state
                   let errorsClone = Object.assign({},this.state.errors);
                 
                   if (!digitsOnly(e.target.value)){
                    errorsClone.objectiveEvidenceConfirmAMinsInvalidNumber = AECGCValidationMessages.objectiveEvidence.minsInvalid;
                    }
    
                  // errorsClone.objectiveEvidenceConfirmAMinsRange = AECGCValidationMessages.objectiveEvidence.minsRange;//'Mins min: 0, max 60';
    
                   this.setState({
                               errors:errorsClone,
                               objectiveEvidenceConfirmAMins:e.target.value,
                               objectiveEvidenceConfirmA:null,
                               changed:true,
                           })
               } 
               else {
                   //  console.log('no invalid values update state with no error');
                     this.setState({
                        objectiveEvidenceConfirmAMins:e.target.value,
                            changed:true,
                            objectiveEvidenceConfirmA: (e.target.value.trim().length > 0 && e.target.value > 0) && 
                                                        (this.state.objectiveEvidenceConfirmAMl && 
                                                        this.state.objectiveEvidenceConfirmAMl.length > 0 &&
                                                        digitsRange(this.state.objectiveEvidenceAMl, AECGCFields.objectiveEvidenceMinsMin, AECGCFields.objectiveEvidenceMinsMax)) ?  
                                                        salivaryFlowRate(this.state.objectiveEvidenceConfirmAMl,e.target.value) ?
                                                        objectiveEvidence.optObjectiveEvidenceA[0].controlValueId:
                                                        objectiveEvidence.optObjectiveEvidenceA[1].controlValueId:null
    
                           })
                       }
               }
    
        }
    }

objectiveEvidenceConfirmANA_onChange(e){

    
    if (e.target.checked){
        let errorsClone = Object.assign({},this.state.errors);
        //remove field we just type into from errors.
        delete errorsClone['objectiveEvidenceConfirmAMl'];
        delete errorsClone['objectiveEvidenceConfirmAMins'];
        delete errorsClone['objectiveEvidenceConfirmAMlRange'];
        delete errorsClone['objectiveEvidenceConfirmAMinsRange'];
        delete errorsClone['objectiveEvidenceConfirm'];
        delete errorsClone['objectiveEvidenceConfirmAMlInvalidNumber'];
        delete errorsClone['objectiveEvidenceConfirmAMinsInvalidNumber'];
        
     
     
        //copy clone back to errors in state
        this.setState({ 
            errors:errorsClone,
           // objectiveEvidenceA:'',
            objectiveEvidenceConfirmA: null,
            objectiveEvidenceConfirmAMl:'',
        objectiveEvidenceConfirmAMins:'',
            objectiveEvidenceConfirmANA: !this.state.objectiveEvidenceConfirmANA,
            changed:true,
         });
     
        }
        else{
         this.setState({
            objectiveEvidenceConfirmANA: !this.state.objectiveEvidenceConfirmANA,
             changed:true,
           //  metCriteria: this.patientMetCriteria()
         })
        }
}

objectiveEvidenceConfirmAMl_onKeyPress(e){
    var charCode = e.keyCode || e.which; 
    var key = String.fromCharCode(charCode);

   // console.log('charCode');
   // console.log(charCode);
   // console.log('key');
   // console.log(key);

    if (!isNumericPeriod(key)){
        e.preventDefault();   
    }

    let errorsClone = Object.assign({},this.state.errors);
    delete errorsClone['objectiveEvidenceConfirm'];

    this.setState({
        errors:errorsClone,
        objectiveEvidenceConfirmANA:false
    })

}


objectiveEvidenceConfirmAMins_onKeyPress(e){
    if (!digitsOnly(e.key)){
        e.preventDefault();   
    }

    let errorsClone = Object.assign({},this.state.errors);
    delete errorsClone['objectiveEvidenceConfirm'];
    this.setState({
        errors:errorsClone,
        objectiveEvidenceConfirmANA:false
    })
}
 





render (){
    return(
       
<ModalDefault isOpen={this.props.objectiveEvidenceModalOpen}  style={OBJECTIVEEVIDENCE} contentLabel={this.props.contentLabel}>
                <div  className={classnames('panel',{'panel-warning': this.state.isValid,'panel-danger': !this.state.isValid})}>
                    <div className="panel-heading">
                    <h4>Confirmation Required</h4>
                </div>
                <div className="panel-body">
                     <form className="form" role="form">
                     <div className="alert alert-danger">Length of salivary flow assessment outside range of 5-15 mins. Please confirm that value entered is correct.</div>                 
                     


                     <div className="form-group row">
                     <div className="col-md-1">
                    
                     


                    </div>

                     <div className={classnames('col-md-10 col-sm-12 pl-0',
                     {"positive-result": 
                     this.state.objectiveEvidenceConfirmA == objectiveEvidence.optObjectiveEvidenceA[0].controlValueId &&
                         !!!this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber && 
                         !!!this.state.errors.objectiveEvidenceConfirmAMl && 
                         !!!this.state.errors.objectiveEvidenceConfirmAMlRange &&
                         !!!this.state.errors.objectiveEvidenceConfirmAMins && 
                         !!!this.state.errors.objectiveEvidenceConfirmAMinsRange &&
                        !!!this.state.errors.objectiveEvidenceConfirm &&
                        !!!this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber,
                     "negative-result":
                     this.state.objectiveEvidenceConfirmA == objectiveEvidence.optObjectiveEvidenceA[1].controlValueId &&
                     !!!this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber && 
                     !!!this.state.errors.objectiveEvidenceConfirmAMl && 
                     !!!this.state.errors.objectiveEvidenceConfirmAMlRange &&
                     !!!this.state.errors.objectiveEvidenceConfirmAMins && 
                     !!!this.state.errors.objectiveEvidenceConfirmAMinsRange &&
                    !!!this.state.errors.objectiveEvidenceConfirm&&
                    !!!this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber
                     }
                  )
         }>


<div className={classnames('col-md-4 col-sm-12',{error:
!!this.state.errors.objectiveEvidenceConfirmAMl ||
!!this.state.errors.objectiveEvidenceConfirmAMlRange || 
!!this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber })}>

                                                    <InputGroupAddOnR  rightAddOn={"ml"}>
                                                            <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                            id="objectiveEvidenceConfirmAMl"
                                                            name="objectiveEvidenceConfirmAMl" 
                                                            ref="objectiveEvidenceConfirmAMl" 
                                                            placeholder="00.00"
                                                            value={this.state.objectiveEvidenceConfirmAMl}
                                                            onChange={this.objectiveEvidenceConfirmAMl_onChange}
                                                            onKeyPress={this.objectiveEvidenceConfirmAMl_onKeyPress}
                                                            onBlur={this.objectiveEvidenceConfirmAMl_onBlur}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                            type="number" 
                                                            maxLength="5"
                                                            onInput={this.maxLengthCheckConfirm_ml} 
                                                            step="0.01" 
                                                            min={AECGCFields.objectiveEvidenceMlMin} 
                                                            max={AECGCFields.objectiveEvidenceMlMax} />       
                                                    </InputGroupAddOnR>

                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceConfirmAMl,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMl})}>{this.state.errors.objectiveEvidenceConfirmAMl}</span>
                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceConfirmAMlRange,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMlRange })}>{this.state.errors.objectiveEvidenceConfirmAMlRange}</span>
                                                    <span className={classnames('',{'visible-inline error info':!!this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber })}>{this.state.errors.objectiveEvidenceConfirmAMlInvalidNumber}</span>
                                                
                                                </div>







                                                <div className={classnames('col-md-4 col-sm-12',{error:
!!this.state.errors.objectiveEvidenceConfirmAMins ||
!!this.state.errors.objectiveEvidenceConfirmAMinsRange || 
!!this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber })}>

                                                <InputGroupAddOnR rightAddOn={"mins"}>
                                                            <input  className="form-control mr-3" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                            id="inputObjectiveEvidenceConfirmAMins"
                                                            name="inputObjectiveEvidenceConfirmAMins" 
                                                            ref="inputObjectiveEvidenceConfirmAMins" 
                                                            placeholder="00"
                                                            value={this.state.objectiveEvidenceConfirmAMins}
                                                            onChange={this.objectiveEvidenceConfirmAMins_onChange}
                                                            onKeyPress={this.objectiveEvidenceConfirmAMins_onKeyPress}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                            type="number" 
                                                            step="1" 
                                                            maxLength="2"
                                                            onInput={maxLengthCheck}
                                                            min={AECGCFields.objectiveEvidenceMinsMin} 
                                                            max={AECGCFields.objectiveEvidenceMinsMax} />
                                                       </InputGroupAddOnR>

                                                    <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceConfirmAMins,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMins})}>{this.state.errors.objectiveEvidenceConfirmAMins}</span>
                                                   <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceConfirmAMinsRange,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMinsRange })}>{this.state.errors.objectiveEvidenceConfirmAMinsRange}</span>
                                                   <span className={classnames('',{'visible error info':!!this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber,hidden:!!!this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber})}>{this.state.errors.objectiveEvidenceConfirmAMinsInvalidNumber}</span>

                                                </div>

                                                <div className="col-md-4 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="checkbox" name="objectiveEvidenceConfirmANA"  id="objectiveEvidenceConfirmANA" 
                                                            checked={this.state.objectiveEvidenceConfirmAMl.length > 0 || this.state.objectiveEvidenceConfirmAMins.length > 0 ? 
                                                                        false :this.state.objectiveEvidenceConfirmANA} 
                                                            onChange={this.objectiveEvidenceConfirmANA_onChange}/>
                                                            <label className="radio-inline" htmlFor="objectiveEvidenceConfirmANA">N/A</label>
                                                    </div>
                                                </div>




</div>

                        </div>

                     </form>
                </div>
                <div className="panel-footer">
                    <button id="ocularSignsConfirm"  
                    type="button" className="btn btn-danger"
                    onClick={this.handleConfirmed}>
                    <i className="fa fa-check" aria-hidden="true"></i>&nbsp;Confirm
                    </button>
                </div>
            </div>
            </ModalDefault>

                )
    }
}



 export default ObjectiveEvidenceModal;
