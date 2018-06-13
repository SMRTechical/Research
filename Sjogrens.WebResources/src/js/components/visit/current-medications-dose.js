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

class CurrentMedicationsDose extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           
            };        

            this.handleToggle = this.handleToggle.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.renderResult = this.renderResult.bind(this);

    }


    handleToggle(){
        if (!this.props.isComplete) {
            this.props.handleToggle();   
        } 
    }


    handleChange(controlValueId){
        this.props.handleChange(controlValueId);
    }



renderResult(){
    var result = null;
    switch (this.props.selectedDose) {
        case this.props.doses[0].controlValueId :
           {
            result = this.props.doses[0].controlValue;
               break;
           }
           case this.props.doses[1].controlValueId :
           {
            result = this.props.doses[1].controlValue;
               break;
           }
           case this.props.doses[2].controlValueId :
           {
            result = this.props.doses[2].controlValue;
               break;
           }
           case this.props.doses[3].controlValueId :
           {
            result = this.props.doses[3].controlValue;
               break;
           }
           case this.props.doses[4].controlValueId :
           {
            result = this.props.doses[4].controlValue;
               break;
           }
           case this.props.doses[5].controlValueId :
           {
            result = this.props.doses[5].controlValue;
               break;
           }
        //    case this.props.doses[6].controlValueId :
        //    {
        //     result = this.props.doses[6].controlValue;
        //        break;
        //    }
    }


if (result) {
    return (
        <span>
        <span className="ml-10 mb-0 current-medications-dose-selected text-success current-medications-treatment-dose-name"><i className="fa fa-arrow-right mr-5" aria-hidden="true"></i>
        {result}</span>
        { !this.props.treatmentDoseOpen && !this.props.isComplete &&
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
                                ! this.props.treatmentDoseOpen  ?
                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10"
                                data-tip="React-tooltip" data-for="add-dose-tooltip" aria-hidden="true" onClick={() => this.handleToggle()}></i> :
                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.handleToggle()}></i> :null
                            }
                        <span className="current-medications-treatment-name">{this.props.treatmentName}</span> { this.renderResult()}
{ this.props.treatmentDoseOpen &&
                        <div className="block current-medications-dose-container no-pad">
                         <div className="block-content-no-border">
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[0].controlValueId)}>{this.props.doses[0].controlValue}</span></div>
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[1].controlValueId)}>{this.props.doses[1].controlValue}</span></div>
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[2].controlValueId)}>{this.props.doses[2].controlValue}</span></div>
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[3].controlValueId)}>{this.props.doses[3].controlValue}</span></div>
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[4].controlValueId)}>{this.props.doses[4].controlValue}</span></div>
                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
<span  onClick={() => this.handleChange(this.props.doses[5].controlValueId)}>{this.props.doses[5].controlValue}</span></div>
                           


                        </div>

                        </div>
                       
}
                       
<ReactTooltip id='add-dose-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Add dose</span>
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

 export default CurrentMedicationsDose;

