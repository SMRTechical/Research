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
import ReactTooltip from 'react-tooltip'

class PastMedicalHistoryFamilyMembers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           
            };        

            this.handleToggle = this.handleToggle.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.renderResult = this.renderResult.bind(this);
            this.buildOption = this.buildOption.bind(this);

    }

 buildOption(id, value){
     
        if (this.props.selectedValue){
            if (this.props.selectedValue.toString().indexOf(id) > -1){
                return (
                    <div className="current-medications-dose"><i className="mr-5 fa fa-check" aria-hidden="true" onClick={() => this.handleChange(id)}></i>
                    <span  onClick={() => this.handleChange(id)}>{value}</span></div>
                )
            }
            else {
                return (
                    <div className="current-medications-dose"><i className="mr-5" aria-hidden="true" onClick={() => this.handleChange(id)}>-</i>
                    <span  onClick={() => this.handleChange(id)}>{value}</span></div>
                )
                }
        }
        else {
            return (
                        <div className="current-medications-dose"><i className="mr-5" aria-hidden="true" onClick={() => this.handleChange(id)}>-</i>
                        <span  onClick={() => this.handleChange(id)}>{value}</span></div>
                    )
        }


 }

    handleToggle(){
        if (!this.props.isComplete) {
            this.props.handleToggle();   
        } 
    }

    handleChange(values){
        this.props.handleChange(values);
    }

renderResult(){
    var result = '';
const {options} = this.props
if (!!this.props.selectedValue){

    var fms = this.props.selectedValue.toString()
    var familyMembersValueArray  = []
if (fms.indexOf(',') > -1) {
    var familyMembersKeyArray = fms.split(',');
    
    for(var i = 0; i < familyMembersKeyArray.length; i++)
        {
           var name = this.props.options.find(
            function (fm) {
                return fm.controlValueId == familyMembersKeyArray[i]
            }
            //fm=>fm.controlValueId === familyMembersKeyArray[i]
            
            )
            if (name) {
                 familyMembersValueArray.push(name.controlValue)
            } 
        }


        familyMembersValueArray.sort(function(a,b){
/*
    If it returns zero, then a and b won’t be swapped (sorted as they are equal).
    It it returns less than zero, then a will be placed before b in the list.
    Otherwise, a will be placed after b in the list.
*/
            if (a == options[0].controlValue && b != options[0].controlValue ) 
                return -1
            else if (a != options[0].controlValue && b == options[0].controlValue ) 
                    return 1 
            else {
                if (a == options[1].controlValue && b != options[1].controlValue ) 
                    return -1
                else if (a != options[1].controlValue && b == options[1].controlValue ) 
                        return 1 
                else if (a == options[2].controlValue && b != options[2].controlValue ) 
                    return -1
                else if (a != options[2].controlValue && b == options[2].controlValue ) 
                        return 1 
                else if (a == options[3].controlValue && b != options[3].controlValue ) 
                    return -1
                else if (a != options[3].controlValue && b == options[3].controlValue ) 
                        return 1 
                else if (a == options[4].controlValue && b != options[4].controlValue ) 
                    return -1
                else if (a != options[4].controlValue && b == options[4].controlValue ) 
                        return 1 
                else if (a == options[5].controlValue && b != options[5].controlValue ) 
                    return -1
                else if (a != options[5].controlValue && b == options[5].controlValue ) 
                        return 1 
            }
        })

        result = familyMembersValueArray.join(", ")
}
else {
    var name = this.props.options.find(
        function (fm) {
            return fm.controlValueId == fms
        }
        //fm=>fm.controlValueId === familyMembersKeyArray[i]
        
        )
        if (name) {
             familyMembersValueArray.push(name.controlValue)
        } 

        result = familyMembersValueArray[0]


    }
}

   

if (!!result) {

if (result.indexOf(options[0].controlValue) > -1 && options[0].controlValue == 'Patient'){
    var patientSpan = "<span class='past-medical-history-patient'>" + options[0].controlValue + "</span>"
   result = result.indexOf(',') > -1 ? result =  result.replace(options[0].controlValue + ', ',patientSpan): result.replace(options[0].controlValue,patientSpan)
}
else {
    var patientSpan = "<span class='past-medical-history-patient'></span>"
    result = patientSpan + result;
}

    return (
        <span>
        <span className="ml-10 mb-0 current-medications-dose-selected text-success past-medical-history-selected-family-members"><i className="fa fa-arrow-right mr-5" aria-hidden="true"></i>
        <span dangerouslySetInnerHTML={{__html: result}}></span></span>
        { !this.props.open && !this.props.isComplete &&
        <div className="current-medications-dose-remove-inline">
                                    <i className="fa fa-trash ml-5 text-danger"
                                     onClick={() => this.handleChange()} aria-hidden="true"></i>
                                    </div>
        }

                                     
    </span>


    )
}
else {
    return null
}



}

renderForm(){
    
    return (
        <div>
              
                            {  !this.props.isComplete ?
                                ! this.props.open  ?
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10"
                                data-tip="React-tooltip" data-for="add-dose-tooltip" aria-hidden="true" onClick={() => this.handleToggle()}></i> :
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.handleToggle()}></i> :null
                            }
                        <span className="past-medical-history-name">{this.props.caption}</span> { this.renderResult()}
{ this.props.open &&
                        <div className="block current-medications-dose-container no-pad">
                         <div className="block-content-no-border">
                             {
                                 this.buildOption(this.props.options[0].controlValueId,this.props.options[0].controlValue)
                             }
                             {
                                (this.props.options.length >= 2) ? this.buildOption(this.props.options[1].controlValueId,this.props.options[1].controlValue): null
                             }
                             {
                                (this.props.options.length >= 3) ? this.buildOption(this.props.options[2].controlValueId,this.props.options[2].controlValue):null
                             }
                             {
                                (this.props.options.length >= 4) ? this.buildOption(this.props.options[3].controlValueId,this.props.options[3].controlValue):null
                             }
                             {
                                (this.props.options.length >= 5) ? this.buildOption(this.props.options[4].controlValueId,this.props.options[4].controlValue):null
                             }
                             {
                                (this.props.options.length >= 6) ?  this.buildOption(this.props.options[5].controlValueId,this.props.options[5].controlValue):null
                             }
                       

                           


                        </div>

                        </div>
                       
}
                       
<ReactTooltip id='add-dose-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Add family members</span>
            </ReactTooltip> 
               
                      
                </div>
           
    )
}
    
    render (){
        {
            return this.renderForm()

        }
}
}

 export default PastMedicalHistoryFamilyMembers;

