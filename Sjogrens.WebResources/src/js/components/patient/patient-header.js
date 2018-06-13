import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PanelConsentSuccess from '../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../components/generic/panel-consent-remove';
// import ConsentForm from './consent-form'

import PatientDetails from '../../containers/patient/patient-details';

import Consent from '../../containers/patient/consent';

import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'

import {paths} from '../../constants/paths/environment';


class PatientHeader extends React.Component{
    constructor(props) {
        super(props);
        
        
    }


    
  


        
    render (){
        {
            return (
                
                        <div className="row"> 
                            <div className="col-md-8 zIndex-1">
                                <PatientDetails token={this.props.token}/> 
                            </div>
                            <div className="col-md-4">
                                <Consent token={this.props.token}/>
                            </div>
                        </div>
                      
                    )
        }
    }
}



 export default PatientHeader;
