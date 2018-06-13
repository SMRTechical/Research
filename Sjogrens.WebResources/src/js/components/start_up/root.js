import classnames from 'classnames'
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Redirect } from 'react-router-dom';
import PatientSearch from '../../containers/patient_search/patient-search';
import Patient from '../patient/patient';
import {paths} from '../../constants/paths/environment';
import {CATEGORY_BASE} from '../../constants/paths/first-category';
import {getPatientState,patientStateClear} from '../../actions/patient-state';
export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           // loading:false,
            redirectToBaseline:false,
            redirectToVisit:false,
         token:''

        };
         //this.handleStartLoading = this.handleStartLoading.bind(this);
         //this.handleEndLoading = this.handleEndLoading.bind(this);
         this.handleGetPatient = this.handleGetPatient.bind(this);
    }


    
    handleGetPatient(token){
//console.log('Root: handleGetPatient')
        var patientStateGetParams = {
            token: token
    }
        this.props.getPatientState(patientStateGetParams)
        .then(ps=> this.handleRedirect(token))

      
    }

handleRedirect(token){
  // console.log('handleRedirect')
    //console.log(this.props.patientStateResult.data.baselineExists)
    if (!this.props.patientStateResult.data.baselineExists){
        this.setState({
            redirectToBaseline:true,
            redirectToVisit:false,
            token:token
        })
    }
    else if (this.props.patientStateResult.data.baselineExists && !this.props.patientStateResult.data.hasVisits){
        this.setState({
            redirectToBaseline:true,
            redirectToVisit:false,
            token:token
        })
    }
    else {
        this.setState({
            redirectToBaseline:false,
            redirectToVisit:true,
            token:token
        })
    }
}

    // handleStartLoading(){
    //     this.setState({
    //         loading:true,
    //       })
    // }

    // handleEndLoading(){
    //     this.setState({
    //         loading:false,
    //       })
    //         }
            

    render() {
    return ( 
        <div>
        
         {
         
                   
                     this.state.redirectToBaseline ?
    <Redirect to={paths.patientLink + this.state.token + '/baseline'} />: this.state.redirectToVisit ?
    <Redirect to={{
                        pathname: paths.visitLink + this.props.patientStateResult.data.token + CATEGORY_BASE,
                        state: {initialLoad:true}
                        }} /> :
                     <PatientSearch handleGetPatient={this.handleGetPatient}/>

         
         }
     </div>
    );
}
};



function mapStateToProps(state) {
    return {
        patientStateResult: state.patientStateResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPatientState:getPatientState,patientStateClear:patientStateClear}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps)(Root);

//export default Root;