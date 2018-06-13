import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'

import {paths} from '../../constants/paths/environment';
import {categories} from '../../config/categories';
import FadeIn from '../../components/animation/fade-in';
import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../Factory/reg-ex';

import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../Factory/calculations';
import {getVisitOptionControlValue, getDetailsControlValue} from '../../Factory/visit';
import {immunomodulatory} from '../../config/controls/current-medications';
import {trim, left, right} from 'trim';
import Moment from 'moment';
import {Spinner} from 'belle';
import ReactTooltip from 'react-tooltip';

class CurrentMedicationsOtherAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errors:{},
            };        

            this.handleAddToggle = this.handleAddToggle.bind(this);
            this.handleAddToggleSave = this.handleAddToggleSave.bind(this);
            this.save = this.save.bind(this);
            this.renderForm = this.renderForm.bind(this);
            this.newTreatment_OnChange = this.newTreatment_OnChange.bind(this); 
            this.newTreatmentDose_OnChange = this.newTreatmentDose_OnChange.bind(this);       
            this.isAlphaNumericSpace_onKeyPress = this.isAlphaNumericSpace_onKeyPress.bind(this);   
        }


        isAlphaNumericSpace_onKeyPress(e){
console.log('isAlphaNumericSpace_onKeyPress')
console.log(e.charCode)
if (e.charCode === 13 /* Enter */) {
                e.preventDefault();
              }
              else {

            if (!isAlphanumericSpace(e.key)){
                e.preventDefault();   
            }
        }
          }


    handleAddToggle(){
      //  console.log('handleAddToggle')
        
        
        this.props.handleAddToggle();
    }
    handleAddToggleSave(){
       
        if (this.refs.newTreatment.value.length === 0 && this.refs.newTreatmentDose.value.length === 0) {
            let errorsClone = Object.assign({},this.state.errors);
            delete errorsClone['newTreatment'];
            this.props.handleAddToggle();            
        }
        else {
            this.save();
        }
    }

    newTreatment_OnChange(e)
    {
        if (!!this.state.errors["newTreatment"])
        {
            let errorsClone = Object.assign({},this.state.errors);
            if (e.target.value.length > 0) { 
                delete errorsClone['newTreatment'];
                this.setState({
                    errors:errorsClone
                })
                this.save()
            }
        }
        else{
            this.save()
        }   
    }

    newTreatmentDose_OnChange(e)
    {
        //console.log('newTreatmentDose_OnChange')
        if (!!this.state.errors["newTreatmentDose"])
        {
           // console.log('newTreatmentDose_OnChange2')
            let errorsClone = Object.assign({},this.state.errors);
            if (e.target.value.length > 0) { 
                delete errorsClone['newTreatmentDose'];
                this.setState({
                    errors:errorsClone
                })
                this.save()
            }
        }
        else {
            this.save()
        }   
    }

    save(){
        let errors ={}

        for(var i = 0; i < this.props.otherITs.length; i++) {
            if (this.props.otherITs[i].key != undefined) {
                if(this.props.otherITs[i].key.toUpperCase() === this.refs.newTreatment.value.toUpperCase() ) {
                    errors.newTreatment = "Therapy already exists"
                }
            }
        }

        if (this.refs.newTreatment.value.length === 0) {
            errors.newTreatment = "Therapy required"
        }

        if (this.refs.newTreatmentDose.value.length === 0) {
            errors.newTreatmentDose = "Dose required"
        }

        this.setState({errors}); 

        const isValid = Object.keys(errors).length === 0    
           
        if (isValid)
         {
                this.props.save(this.refs.newTreatment.value, this.refs.newTreatmentDose.value)
                this.refs.newTreatment.value = '';
                this.refs.newTreatmentDose.value = ''
        }
    }

renderForm(){
    
    return (
        <div>
              
              {
                                !this.props.add ?
                                <span>
                                    <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" 
                                    data-tip="React-tooltip" data-for="add-other-therapy-tooltip"
                                    onClick={() => this.handleAddToggle()}></i>
                                    <span className="current-medications-other-treatment-add text-primary">{'Add other therapy'}</span>
                                </span>:
                                <span>
                                    <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" 
                                    data-tip="React-tooltip" data-for="save-other-therapy-tooltip"
                                    onClick={() => this.handleAddToggleSave()}></i>
                                    <span className="current-medications-other-treatment-add text-primary">{'Add other therapy'}</span>
                                </span>
                            
                            }
                       
                        {
                            this.props.add &&
                            <div>
                               <div className="block current-medications-dose-container no-pad">
                                   <div className="block-content-no-border">
                                        <div className="input-group">
                                            <div className="current-medications-dose">
                                                <form className="form-inline" >
                                                    <div className={classnames('form-group mr-5',{error:!!this.state.errors.newTreatment })}>
                                                        <input type="text" className="form-control" maxLength="50"
                                                            disabled={this.props.visitHeaderResult && 
                                                            this.props.visitHeaderResult.data && 
                                                            this.props.visitHeaderResult.data.completed ? true: false}
                                                        ref="newTreatment" 
                                                        id="newTreatment" 
                                                        placeholder="Therapy"
                                                        onChange={this.newTreatment_OnChange}
                                                        onMouseDown={ (e) => e.target.focus() }
                                                        ></input>
                                                        <span className={classnames('',{'visible error info':!!this.state.errors.newTreatment,hidden:!!!this.state.errors.newTreatment})}>{this.state.errors.newTreatment}</span>
                                                    </div>
                                                    <div className={classnames('form-group mr-5',{error:!!this.state.errors.newTreatmentDose })}>
                                                        <select className="form-control" ref="newTreatmentDose" id="newTreatmentDose" onChange={this.newTreatmentDose_OnChange}>
                                                        <option value=""  >Please Select</option>
                                                            <option value={this.props.doses[0].controlValueId}>{this.props.doses[0].controlValue}</option>
                                                            <option value={this.props.doses[1].controlValueId}>{this.props.doses[1].controlValue}</option>
                                                            <option value={this.props.doses[2].controlValueId}>{this.props.doses[2].controlValue}</option>
                                                            <option value={this.props.doses[3].controlValueId}>{this.props.doses[3].controlValue}</option>
                                                            <option value={this.props.doses[4].controlValueId}>{this.props.doses[4].controlValue}</option>
                                                            <option value={this.props.doses[5].controlValueId}>{this.props.doses[5].controlValue}</option>
                                                        </select>
                                                        <span className={classnames('',{'visible error info':!!this.state.errors.newTreatmentDose,hidden:!!!this.state.errors.newTreatmentDose})}>{this.state.errors.newTreatmentDose}</span>
                                                    </div>
                                                </form> 
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                        }

            
                        <ReactTooltip id='add-other-therapy-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Add other therapy and dose</span>
            </ReactTooltip>  
                      
            <ReactTooltip id='save-other-therapy-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Save other therapy and dose</span>
            </ReactTooltip>  

                </div>
           
    )
}
    
    render (){
        {
            return(
                <div>
                 {
                     this.renderForm()
                 }

            </div>
            );
        }
}
}

 export default CurrentMedicationsOtherAdd;

