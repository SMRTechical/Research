import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {patientsSearchClear} from '../../actions/index';
import classnames from 'classnames'
import { NavLink, Link, Route } from 'react-router-dom'
import AddPatient from '../../components/patient_search/add-patient';
import AddSpinePatient from '../../components/patient_search/add-spine-patient';
import PatientsSearch from './patients-search';
import {paths} from '../../constants/paths/environment';
import SlideOnEnter from '../../components/animation/slide-on-enter';

export class PatientSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExternal:false
        }
         this.handleGetPatient = this.handleGetPatient.bind(this);
         this.handleGetSpinePatient = this.handleGetSpinePatient.bind(this);
    }

    componentDidMount () {
        this.props.patientsSearchClear(); 
       }

    componentWillUnmount(){
        this.props.patientsSearchClear(); 
       }
          
    handleGetPatient(token){
        this.props.handleGetPatient(token);
    }

    handleGetSpinePatient(token){
        this.props.handleGetPatient(token);
    }

    render() {
    return ( 
            <div>
                <div className="container-fluid">
                    <div className="row">
                    
                        <div className="col-md-3">
                        <AddPatient handleGetPatient={this.handleGetPatient}/>
                        </div>
                       
                    
                   


                    </div>
{this.state.isExternal &&
<div className="row">
<div className="col-md-5">
                                <AddSpinePatient handleGetSpinePatient={this.handleGetSpinePatient}/>
                         </div>   
</div>
}
<div className="row">
<div className="col-md-12 col-sm-12">
                    <PatientsSearch  getPatient={this.handleGetPatient}  />
                    </div>
</div>


                </div>
            </div>
        );
    }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({patientsSearchClear:patientsSearchClear}, dispatch);
}

export default connect(null,matchDispatchToProps)(PatientSearch);
