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
import {ocularSignsObjectiveValidation, objectiveEvidenceValidation, meetsAECGCCriteria, maxLengthCheck} from '../../../components/visit/modules/functions';
import {paths} from '../../../constants/paths/environment';
import ModalDefault from '../../../components/generic/modal-default';
import {OCULARSIGNSOBJECTIVE} from '../../../constants/styles/modal';
import {consentCtrls} from '../../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import InputGroupAddOnLR from '../../../components/generic/input/input-group-add-on-lr';
// import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../../Factory/reg-ex';
// import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,twoDigitsOnly, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../../config/controls/american-european-cgc';
import {AECGC} from '../../../constants/styles/input';
import ReactTooltip from 'react-tooltip';
import {AECGCValidationMessages} from '../../../constants/information/messages';
import {AECGCFields} from '../../../constants/information/field-length'; 
import DynamicNumber from 'react-dynamic-number';

class OcularSignsModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ocularSignsObjectiveConfirmA: this.props.ocularSignsObjectiveA ? this.props.ocularSignsObjectiveA:'',
            ocularSignsObjectiveConfirmAR:  this.props.ocularSignsObjectiveAR ? this.props.ocularSignsObjectiveAR :'',
            ocularSignsObjectiveConfirmAL:  this.props.ocularSignsObjectiveAL ? this.props.ocularSignsObjectiveAL :'',
            ocularSignsObjectiveConfirmARNA:this.props.ocularSignsObjectiveARNA ? this.props.ocularSignsObjectiveARNA :false,
            ocularSignsObjectiveConfirmALNA:this.props.ocularSignsObjectiveALNA ? this.props.ocularSignsObjectiveALNA :false,
            isConfirmed:false,
            isValid:false,
            errors:{}
        };

        this.ocularSignsModalClose = this.ocularSignsModalClose.bind(this);
        this.afterOpenOcularSignsModal = this.afterOpenOcularSignsModal.bind(this);
        this.handleOcularSignsConfirmed = this.handleOcularSignsConfirmed.bind(this);

        this.ocularSignsObjectiveConfirmAR_onChange = this.ocularSignsObjectiveConfirmAR_onChange.bind(this);
        this.ocularSignsObjectiveConfirmARNA_onChange = this.ocularSignsObjectiveConfirmARNA_onChange.bind(this);
        this.ocularSignsObjectiveConfirmAL_onChange = this.ocularSignsObjectiveConfirmAL_onChange.bind(this);
        this.ocularSignsObjectiveConfirmALNA_onChange = this.ocularSignsObjectiveConfirmALNA_onChange.bind(this);
        this.ocularSignsObjectiveConfirmAR_onKeyPress = this.ocularSignsObjectiveConfirmAR_onKeyPress.bind(this);
        this.ocularSignsObjectiveConfirmAL_onKeyPress = this.ocularSignsObjectiveConfirmAL_onKeyPress.bind(this);

        
        this.ocularSignsObjectiveConfirmAR_onKeyUp = this.ocularSignsObjectiveConfirmAR_onKeyUp.bind(this);
        this.ocularSignsObjectiveConfirmAL_onKeyUp = this.ocularSignsObjectiveConfirmAL_onKeyUp.bind(this);

    }




    handleOcularSignsConfirmed(){
        
    let errors = {};
    
        // if(!this.state.ocularSignsObjectiveARNA && this.state.ocularSignsObjectiveAR === '') {
        //         errors.ocularSignsObjectiveAR = 'Ocular signs objective right eye required';
        // }
    
        // if(!this.state.ocularSignsObjectiveALNA && this.state.ocularSignsObjectiveAL === '') {
        //         errors.ocularSignsObjectiveAL = 'Ocular signs objective left eye required';
        // }
    
        // if(!this.state.ocularSignsObjectiveARNA &&
        //     this.state.ocularSignsObjectiveAR.length > 0  && 
        //     !digitsRange(this.state.ocularSignsObjectiveAR, 0, 40)) {
        //         errors.ocularSignsObjectiveARRange = 'Ocular signs objective right eye min: 0, max 40';
        // } 
    
        // if(!this.state.ocularSignsObjectiveALNA &&
        //     this.state.ocularSignsObjectiveAL.length > 0  && 
        //     !digitsRange(this.state.ocularSignsObjectiveAL, 0, 40)) {
        //         errors.ocularSignsObjectiveALRange = 'Ocular signs objective left eye min: 0, max 40';
        // } 
    

        // if (!this.state.ocularSignsObjectiveConfirmARNA && 
        //     this.state.ocularSignsObjectiveConfirmAR.length === 0 && 
        //     this.state.ocularSignsObjectiveConfirmAL.length > 0 ) {
        //     errors.ocularSignsObjectiveConfirmAR = AECGCValidationMessages.ocularSignsObjective.rightEyeRequired;//'Right eye required';
        //     }
        
            if( !this.state.ocularSignsObjectiveConfirmARNA && 
                this.state.ocularSignsObjectiveConfirmAR.length == 0 &&  
                this.state.ocularSignsObjectiveConfirmAL.length > 0
                && digitsOnly(this.state.ocularSignsObjectiveConfirmAL)
                && digitsRange(this.state.ocularSignsObjectiveConfirmAL, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
                    errors.ocularSignsObjectiveConfirmAR = AECGCValidationMessages.ocularSignsObjective.rightEyeRequired; 
                }


        // if (!this.state.ocularSignsObjectiveConfirmALNA && 
        //     this.state.ocularSignsObjectiveConfirmAL.length === 0 && this.state.ocularSignsObjectiveConfirmAR.length > 0 ) {
        //     errors.ocularSignsObjectiveConfirmAL = AECGCValidationMessages.ocularSignsObjective.leftEyeRequired;  //'Left eye required';
            
        //     }


            if (!this.state.ocularSignsObjectiveConfirmALNA && 
                this.state.ocularSignsObjectiveConfirmAL.length == 0 && 
                this.state.ocularSignsObjectiveConfirmAR.length > 0 
                && digitsOnly(this.state.ocularSignsObjectiveConfirmAR)
                && digitsRange(this.state.ocularSignsObjectiveConfirmAR, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
                    errors.ocularSignsObjectiveConfirmAL = AECGCValidationMessages.ocularSignsObjective.leftEyeRequired; 
                }



            if (!this.state.ocularSignsObjectiveConfirmARNA &&
                    this.state.ocularSignsObjectiveConfirmAR.length > 0  && 
                    !digitsOnly(this.state.ocularSignsObjectiveConfirmAR)) {
                   errors.ocularSignsObjectiveConfirmARInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
                } 
            
            if (!this.state.ocularSignsObjectiveConfirmALNA &&
                    this.state.ocularSignsObjectiveConfirmAL.length > 0  && 
                    !digitsOnly(this.state.ocularSignsObjectiveConfirmAL)) {
                   errors.ocularSignsObjectiveConfirmALInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
              } 

    
        if (!this.state.ocularSignsObjectiveConfirmARNA &&
            this.state.ocularSignsObjectiveConfirmAR.length > 0  && 
            !digitsRange(this.state.ocularSignsObjectiveConfirmAR, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
            errors.ocularSignsObjectiveConfirmARRange =  AECGCValidationMessages.ocularSignsObjective.range;//'Right eye min: 0, max 40';
           
        } 
    
        if (!this.state.ocularSignsObjectiveConfirmALNA &&
            this.state.ocularSignsObjectiveConfirmAL.length > 0  && 
            !digitsRange(this.state.ocularSignsObjectiveConfirmAL, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
                    errors.ocularSignsObjectiveConfirmALRange =  AECGCValidationMessages.ocularSignsObjective.range; //'Left eye min: 0, max 40';
        } 

        this.setState({errors});      
    
        const isValid = Object.keys(errors).length === 0   
    
        if (isValid)
        {
            this.props.ocularSignsConfirmed(this.state.ocularSignsObjectiveConfirmA, this.state.ocularSignsObjectiveConfirmAR, this.state.ocularSignsObjectiveConfirmAL,this.state.ocularSignsObjectiveConfirmARNA, this.state.ocularSignsObjectiveConfirmALNA)
        }
       }


    componentWillReceiveProps(nextProps){
      this.setState({
                ocularSignsObjectiveConfirmA: nextProps.ocularSignsObjectiveA ? nextProps.ocularSignsObjectiveA :'',
                ocularSignsObjectiveConfirmAR:  nextProps.ocularSignsObjectiveAR ? nextProps.ocularSignsObjectiveAR :'',
                ocularSignsObjectiveConfirmAL:  nextProps.ocularSignsObjectiveAL ? nextProps.ocularSignsObjectiveAL :'',
                ocularSignsObjectiveConfirmARNA:nextProps.ocularSignsObjectiveARNA ? nextProps.ocularSignsObjectiveARNA :false,
                ocularSignsObjectiveConfirmALNA:nextProps.ocularSignsObjectiveALNA ? nextProps.ocularSignsObjectiveALNA :false,
                isConfirmed:false,
                isValid:false
            })
      }



      componentDidMount () {
            this.setState({
                ocularSignsObjectiveConfirmA: this.props.ocularSignsObjectiveA ? this.props.ocularSignsObjectiveA:'',
                ocularSignsObjectiveConfirmAR:  this.props.ocularSignsObjectiveAR ? this.props.ocularSignsObjectiveAR :'',
                ocularSignsObjectiveConfirmAL:  this.props.ocularSignsObjectiveAL ? this.props.ocularSignsObjectiveAL :'',
                ocularSignsObjectiveConfirmARNA:this.props.ocularSignsObjectiveARNA ? this.props.ocularSignsObjectiveARNA :false,
                ocularSignsObjectiveConfirmALNA:this.props.ocularSignsObjectiveALNA ? this.props.ocularSignsObjectiveALNA :false,
                isConfirmed:false,
                isValid:false
            });
       }




ocularSignsModalClose(){
    
    
    // let errors = {};

    // if(!this.state.ocularSignsObjectiveARNA && 
    //    (this.state.ocularSignsObjectiveAR === '' || this.state.ocularSignsObjectiveAR === '0')) {
    //         errors.ocularSignsObjectiveAR = 'Ocular signs objective right eye required';
    // }

    // if(!this.state.ocularSignsObjectiveALNA && 
    //     this.state.ocularSignsObjectiveAL === '' || this.state.ocularSignsObjectiveAL === '0') {
    //         errors.ocularSignsObjectiveAL = 'Ocular signs objective left eye required';
    // }

    // if(!this.state.ocularSignsObjectiveARNA &&
    //     this.state.ocularSignsObjectiveAR.length > 0  && 
    //     !digitsRange(this.state.ocularSignsObjectiveAR, 0, 40)) {
    //         errors.ocularSignsObjectiveARRange = 'Ocular signs objective right eye min: 0, max 40';
    // } 

    // if(!this.state.ocularSignsObjectiveALNA &&
    //     this.state.ocularSignsObjectiveAL.length > 0  && 
    //     !digitsRange(this.state.ocularSignsObjectiveAL, 0, 40)) {
    //         errors.ocularSignsObjectiveALRange = 'Ocular signs objective left eye min: 0, max 40';
    // } 

    // this.setState({errors});      

    // const isValid = Object.keys(errors).length === 0   

    // if (isValid)
    // {
        this.props.ocularSignsModalClose();
    //}
}

afterOpenOcularSignsModal(){
   // var p = ''
    //use this to clear any error
   // this.props.afterOpenConsentModal();
}



ocularSignsObjectiveConfirmAR_onKeyPress(e){
    //if (!digitsOnly2DecimalPlaces(e.key)){
    if (!digitsOnly(e.key)){  
      e.preventDefault();   
    }

    this.setState({
        ocularSignsObjectiveConfirmARNA:false
    })
}


ocularSignsObjectiveConfirmAL_onKeyPress(e){
if (!digitsOnly(e.key)){
    e.preventDefault();   
}



this.setState({
    ocularSignsObjectiveConfirmALNA:false
})
}




ocularSignsObjectiveConfirmAR_onKeyUp(e){


    if (!digitsOnly(this.refs.ocularSignsObjectiveConfirmAR.value)){
              this.setState({
                  ocularSignsObjectiveConfirmARNA:false,
                  //ocularSignsObjectiveConfirmAR:'',
                  ocularSignsObjectiveConfirmA:
                                              this.state.ocularSignsObjectiveConfirmAL.trim().length > 0 ? 
                                                  digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                  ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
  
              })
            
          }
  else {
          this.setState({
              ocularSignsObjectiveConfirmARNA:false
          })
      }
  }
  
  
  
  ocularSignsObjectiveConfirmAL_onKeyUp(e){
      
            if (!digitsOnly(this.refs.ocularSignsObjectiveConfirmAL.value)){
                this.setState({
                    ocularSignsObjectiveConfirmALNA:false,
                   // ocularSignsObjectiveConfirmAL:'',
                    ocularSignsObjectiveConfirmA: this.state.ocularSignsObjectiveConfirmAR.trim().length > 0 ? 
                                                    digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                    ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
    
                })
              
            }
    else {
            this.setState({
                ocularSignsObjectiveConfirmALNA:false
            })
        }
    }



ocularSignsObjectiveConfirmARNA_onChange(e){

if (e.target.checked){
let errorsClone = Object.assign({},this.state.errors);
//remove field we just type into from errors.
delete errorsClone['ocularSignsObjectiveConfirmAR'];
delete errorsClone['ocularSignsObjectiveConfirmARRange'];
delete errorsClone['ocularSignsObjectiveConfirmARInvalidNumber'];
//copy clone back to errors in state
this.setState({ 
    errors:errorsClone,
    //ocularSignsObjectiveA:'',

    ocularSignsObjectiveConfirmA: this.state.ocularSignsObjectiveConfirmAL.trim().length > 0 ? digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                            ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,

    ocularSignsObjectiveConfirmAR:'',
    ocularSignsObjectiveConfirmARNA: !this.state.ocularSignsObjectiveConfirmARNA,
    //changed:true,
 });
}
else {


 this.setState({
    ocularSignsObjectiveConfirmARNA: !this.state.ocularSignsObjectiveConfirmARNA,
     //changed:true,
   //  metCriteria: this.patientMetCriteria()
 })
}
}


ocularSignsObjectiveConfirmALNA_onChange(e){

 
if (e.target.checked){
let errorsClone = Object.assign({},this.state.errors);
//remove field we just type into from errors.
delete errorsClone['ocularSignsObjectiveConfirmAL'];
delete errorsClone['ocularSignsObjectiveConfirmALRange'];
delete errorsClone['ocularSignsObjectiveConfirmALInvalidNumber'];
//copy clone back to errors in state
this.setState({ 
    errors:errorsClone,
    //ocularSignsObjectiveA:'',
    ocularSignsObjectiveConfirmA: this.state.ocularSignsObjectiveConfirmAR.trim().length > 0 ? digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? 
                            ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                            ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
    ocularSignsObjectiveConfirmAL:'',
    ocularSignsObjectiveConfirmALNA: !this.state.ocularSignsObjectiveConfirmALNA,
    //changed:true,
 });

}
else{
 this.setState({
    ocularSignsObjectiveConfirmALNA: !this.state.ocularSignsObjectiveConfirmALNA,
     //changed:true,
   //  metCriteria: this.patientMetCriteria()
 })
}
}

ocularSignsObjectiveConfirmAR_onChange(e){

 //if (!!this.state.errors['ocularSignsObjectiveAR'] || !!this.state.errors['ocularSignsObjectiveARRange'] || !!this.state.errors['ocularSignsObjectiveAR2Decimal']){
    if (!!this.state.errors['ocularSignsObjectiveConfirmAR'] || 
        !!this.state.errors['ocularSignsObjectiveConfirmARRange'] || 
        !!this.state.errors['ocularSignsObjectiveConfirmARInvalidNumber']){            
 //One of the above error has occurred 
     //console.log('One of the above error has occurred');
   //clone object from state 
   let errorsClone = Object.assign({},this.state.errors);
   //remove field we just type into from errors.
   // delete errorsClone[e.target.name];
    //Delete the required field      
    delete errorsClone['ocularSignsObjectiveConfirmAR'];
    //Only delete range error if current value is ok

    if (e.target.value.length > 0) {
        if (digitsOnly(e.target.value)){
                delete errorsClone['ocularSignsObjectiveConfirmARInvalidNumber'];
        }
     if (digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin,AECGCFields.ocularSignsObjectiveEyeMax)) {
               // console.log('Entered value is ok');
                delete errorsClone['ocularSignsObjectiveConfirmARRange'];
            }
    }
    else {
        delete errorsClone['ocularSignsObjectiveConfirmARInvalidNumber'];
        delete errorsClone['ocularSignsObjectiveConfirmARRange'];
    }


    if (Object.keys(errorsClone).length === 0){
        this.setState({
            ocularSignsObjectiveConfirmAR:e.target.value,
            ocularSignsObjectiveConfirmA: e.target.value.trim().length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                   ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                       this.state.ocularSignsObjectiveConfirmAL.trim().length > 0 ? 
                                           digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                           ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                                           errors:errorsClone,
           })
       }
    else{
        //copy clone back to errors in state
        this.setState({
            errors:errorsClone,
            ocularSignsObjectiveConfirmAR:e.target.value,
            ocularSignsObjectiveConfirmA:null
        });
    }



  
   }
    else {


        // if ((e.target.value.length > 0  && !digitsRange(e.target.value, 0, 40)) || 
        //     (e.target.value.length > 0  && !digitsOnly2DecimalPlaces(e.target.value))) {
            if ((e.target.value.length > 0  && 
                (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax) ||
                !digitsOnly(e.target.value)))) {
            //no errors for this field existed before
          //  console.log('no errors for this field existed before')
          //  console.log('and user has eneterd invalid value')
            //and user has eneterd invalid value
            //clone errors and add to state
            let errorsClone = Object.assign({},this.state.errors);

            if (!digitsOnly(e.target.value)){
                errorsClone.ocularSignsObjectiveConfirmARInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
            }
            else if (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)){
                errorsClone.ocularSignsObjectiveConfirmARRange =  AECGCValidationMessages.ocularSignsObjective.range; //'Right eye min: 0, max 40';
            }
           

            this.setState({
                        errors:errorsClone,
                        ocularSignsObjectiveConfirmAR:e.target.value,
                        ocularSignsObjectiveConfirmA:null
                    })
        } 
        else {
            //  console.log('no invalid values update state with no error');
             //no invalid values update state with no error
              this.setState({
                     ocularSignsObjectiveConfirmAR:e.target.value,
                     ocularSignsObjectiveConfirmA: e.target.value.trim().length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                            ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                                this.state.ocularSignsObjectiveConfirmAL.trim().length > 0 ? 
                                                    digitsLessThan(this.state.ocularSignsObjectiveConfirmAL,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                    ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                    })
                }
        }
}

ocularSignsObjectiveConfirmAL_onChange(e){
  
//console.log('ocularSignsObjectiveConfirmAL_onChange');


//         if (!!this.state.errors['ocularSignsObjectiveAL'] || !!this.state.errors['ocularSignsObjectiveALRange']  || !!this.state.errors['ocularSignsObjectiveAL2Decimal'] ){
        if (!!this.state.errors['ocularSignsObjectiveConfirmAL'] || 
            !!this.state.errors['ocularSignsObjectiveConfirmALRange'] || 
            !!this.state.errors['ocularSignsObjectiveConfirmALInvalidNumber']){
            
        //One of the above error has occurred 
        // console.log('One of the above error has occurred');
       //clone object from state 
       let errorsClone = Object.assign({},this.state.errors);
       //remove field we just type into from errors.
       // delete errorsClone[e.target.name];
        //Delete the required field      
        delete errorsClone['ocularSignsObjectiveConfirmAL'];
        //Only delete range error if current value is ok

        if (e.target.value.length > 0) {
            if (digitsOnly(e.target.value)){
                delete errorsClone['ocularSignsObjectiveConfirmALInvalidNumber'];
            }
          if (digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)) {
           // console.log('Entered value is ok');
            delete errorsClone['ocularSignsObjectiveConfirmALRange'];
            }
        }
        else {
            delete errorsClone['ocularSignsObjectiveConfirmALInvalidNumber'];
            delete errorsClone['ocularSignsObjectiveConfirmALRange'];
        }

        if (Object.keys(errorsClone).length === 0){
            this.setState({
                ocularSignsObjectiveConfirmAL:e.target.value,
                ocularSignsObjectiveConfirmA: e.target.value.trim().length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                        ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                           this.state.ocularSignsObjectiveConfirmAR.trim().length > 0 ? 
                                               digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                               ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null,
                                               errors:errorsClone
               })
        }
        else{
            //copy clone back to errors in state
            this.setState({
                //[e.target.name]: e.target.value,
                errors:errorsClone,
                ocularSignsObjectiveConfirmAL:e.target.value,
                ocularSignsObjectiveConfirmA:null
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
                    errorsClone.ocularSignsObjectiveConfirmALInvalidNumber = AECGCValidationMessages.ocularSignsObjective.invalid;
                }
                else if (!digitsRange(e.target.value, AECGCFields.ocularSignsObjectiveEyeMin, AECGCFields.ocularSignsObjectiveEyeMax)){
                errorsClone.ocularSignsObjectiveConfirmALRange = AECGCValidationMessages.ocularSignsObjective.range;//'Left eye min: 0, max 40';
                }

                

                this.setState({
                            errors:errorsClone,
                            ocularSignsObjectiveConfirmAL:e.target.value,
                            ocularSignsObjectiveConfirmA:null
                        })
            } 
            else {
                 // console.log('no invalid values update state with no error');
                 //no invalid values update state with no error
                  this.setState({
                         ocularSignsObjectiveConfirmAL:e.target.value,
                         ocularSignsObjectiveConfirmA: e.target.value.trim().length > 0 ? digitsLessThan(e.target.value,AECGCFields.ocularSignsObjectiveANegativeMin) || digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ?
                                                 ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId:
                                                    this.state.ocularSignsObjectiveConfirmAR.trim().length > 0 ? 
                                                        digitsLessThan(this.state.ocularSignsObjectiveConfirmAR,AECGCFields.ocularSignsObjectiveANegativeMin) ? ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId:
                                                        ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId :null
                        })
                    }
            }
    }
    

// ocularSignsObjectiveALR_onBlur(e){


// //Do we have values in both input fields
// //    if ((this.state.ocularSignsObjectiveAR != '' || this.state.ocularSignsObjectiveAR != '0') || 
// //         (this.state.ocularSignsObjectiveAL != '' || this.state.ocularSignsObjectiveAL != '0')) { 


//         if (this.state.ocularSignsObjectiveAR.trim().length > 0 && this.state.ocularSignsObjectiveAL.trim().length > 0 ) { 
// //We dont have a problem with the range provided
// //if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveAR2Decimal']) && !(!!this.state.errors['ocularSignsObjectiveALRange']) && !(!!this.state.errors['ocularSignsObjectiveAL2Decimal']) ){

// if (!(!!this.state.errors['ocularSignsObjectiveARRange']) && !(!!this.state.errors['ocularSignsObjectiveALRange'])){
//         //we haven't confirmed and L or R has changed
//             if (!this.state.ocularSignsObjectiveALRConfirmed && (this.state.ocularSignsObjectiveALChanged || this.state.ocularSignsObjectiveARChanged)) { 
//                 console.log('onblur')
//                 this.setState({    
//                     ocularSignsModalOpen:ocularSignsObjectiveValidation(this.state.ocularSignsObjectiveAL, this.state.ocularSignsObjectiveAR),
//                     ocularSignsObjectiveALRConfirmed:true 
//                 })
//             }
//         }
// }
// }


render (){
    return(
       
<ModalDefault isOpen={this.props.ocularSignsModalOpen}  style={OCULARSIGNSOBJECTIVE} contentLabel={this.props.contentLabel}>
                <div  className={classnames('panel',{'panel-warning': this.state.isValid,'panel-danger': !this.state.isValid})}>
                    <div className="panel-heading">
                    <h4>Confirmation Required</h4>
                </div>
                <div className="panel-body">
                     <form className="form" role="form">
                     <div className="alert alert-danger">The difference between right and left is greater than 10.  Please confirm if this is correct.</div>                 
                    


                     <div className="form-group row">
                    

                     <div className={classnames('col-md-offset-1 col-md-10 col-sm-12 pl-0',
                     {"positive-result": 
                     this.state.ocularSignsObjectiveConfirmA == ocularSignsObjective.optOcularSignsObjectiveA[0].controlValueId &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmAR && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmARRange && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmAL && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmALRange &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber,
                     "negative-result":
                     this.state.ocularSignsObjectiveConfirmA == ocularSignsObjective.optOcularSignsObjectiveA[1].controlValueId &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmAR && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmARRange && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmAL && 
                         !!!this.state.errors.ocularSignsObjectiveConfirmALRange &&
                         !!!this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber
                     }
                  )
         }>
{/* 
<div className='col-md-4 col-sm-12'> */}



<div className={classnames('col-md-4 col-sm-12',{error:
!!this.state.errors.ocularSignsObjectiveConfirmAR || 
!!this.state.errors.ocularSignsObjectiveConfirmARRange || 
!!this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber})}>

<InputGroupAddOnLR leftAddOn={"R"} rightAddOn={"mm"} styles={AECGC.OCULAR_SIGNS_OBJ_LR}>
 <input  className="form-control" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                         id="ocularSignsObjectiveConfirmAR"
                         name="ocularSignsObjectiveConfirmAR" 
                         ref="ocularSignsObjectiveConfirmAR" 
                         placeholder="00"
                         value={this.state.ocularSignsObjectiveConfirmAR}
                         onChange={this.ocularSignsObjectiveConfirmAR_onChange}
                         onKeyPress={this.ocularSignsObjectiveConfirmAR_onKeyPress}
                         onKeyUp={this.ocularSignsObjectiveConfirmAR_onKeyUp}
                                                        onMouseDown={ (e) => e.target.focus() }
                         type="number" 
                         step="1" 
                         maxLength="2"
                        onInput={maxLengthCheck} 
                         min={AECGCFields.ocularSignsObjectiveEyeMin} max={AECGCFields.ocularSignsObjectiveEyeMax} />

                        
</InputGroupAddOnLR>
<span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmAR,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmAR})}>{this.state.errors.ocularSignsObjectiveConfirmAR}</span>
<span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmARRange,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmARRange })}>{this.state.errors.ocularSignsObjectiveConfirmARRange}</span>
<span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber})}>{this.state.errors.ocularSignsObjectiveConfirmARInvalidNumber}</span>

</div>

<div className="col-md-2 col-sm-12 funkyradio">
<div className="funkyradio-default">
     <input type="checkbox" name="ocularSignsObjectiveConfirmARNA"  id="ocularSignsObjectiveConfirmARNA" 
     checked={this.state.ocularSignsObjectiveConfirmAR.length > 0 ? false :this.state.ocularSignsObjectiveConfirmARNA} 
     onChange={this.ocularSignsObjectiveConfirmARNA_onChange}/>
     <label className="radio-inline" htmlFor="ocularSignsObjectiveConfirmARNA">N/A</label>
</div>
</div>





<div className={classnames('col-md-4 col-sm-12',{error:
!!this.state.errors.ocularSignsObjectiveConfirmAL || 
!!this.state.errors.ocularSignsObjectiveConfirmALRange || 
!!this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber})}>

{/* <div className='col-md-4 col-sm-12'>  */}


<InputGroupAddOnLR leftAddOn={"L"} rightAddOn={"mm"} styles={AECGC.OCULAR_SIGNS_OBJ_LR}>                                                  
        <input  className="form-control mr-3" 
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                        id="ocularSignsObjectiveConfirmAL"
                                        name="ocularSignsObjectiveConfirmAL" 
                                        ref="ocularSignsObjectiveConfirmAL" 
                                        placeholder="00"
                                        value={this.state.ocularSignsObjectiveConfirmAL}
                                        onChange={this.ocularSignsObjectiveConfirmAL_onChange}
                                        onKeyPress={this.ocularSignsObjectiveConfirmAL_onKeyPress}
                                        onKeyUp={this.ocularSignsObjectiveConfirmAL_onKeyUp}
                                                        onMouseDown={ (e) => e.target.focus() }
                                        type="number" 
                                        step="1" 
                                        maxLength="2"
                                        onInput={maxLengthCheck}
                                        min={AECGCFields.ocularSignsObjectiveEyeMin} max={AECGCFields.ocularSignsObjectiveEyeMax}/>
 </InputGroupAddOnLR>
 <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmAL,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmAL})}>{this.state.errors.ocularSignsObjectiveConfirmAL}</span>
 <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmALRange,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmALRange})}>{this.state.errors.ocularSignsObjectiveConfirmALRange}</span>
 <span className={classnames('',{'visible error info':!!this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber,hidden:!!!this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber})}>{this.state.errors.ocularSignsObjectiveConfirmALInvalidNumber}</span>

</div>

<div className="col-md-2 col-sm-12 funkyradio">
<div className="funkyradio-default">
     <input type="checkbox" name="ocularSignsObjectiveConfirmALNA"  id="ocularSignsObjectiveConfirmALNA" 
     checked={this.state.ocularSignsObjectiveConfirmAL.length > 0 ? false :this.state.ocularSignsObjectiveConfirmALNA} 
     onChange={this.ocularSignsObjectiveConfirmALNA_onChange}/>
     <label className="radio-inline" htmlFor="ocularSignsObjectiveConfirmALNA">N/A</label>
</div>
</div>



</div>

                        </div>

                     </form>
                </div>
                <div className="panel-footer">
                    <button id="ocularSignsConfirm"  
                    type="button" className="btn btn-danger"
                    onClick={this.handleOcularSignsConfirmed}>
                    <i className="fa fa-check" aria-hidden="true"></i>&nbsp;Confirm
                    </button>
                </div>
            </div>
            </ModalDefault>

                )
    }
}



 export default OcularSignsModal;
