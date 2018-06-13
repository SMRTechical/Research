import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PatientsSearchForm from './patients-search-form';
import PatientsFoundList from '../../components/patient_search/patients-found-list';

class PatientsSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
           errorFindPatient:'',
           patientSearchHeaders: [
            {headerText:'Hospital Number'},
            {headerText:'NHS Number'},
            {headerText:'First Name'},
            {headerText:'Last Name'},
            {headerText:'Date of Birth'},
            {headerText:'Postcode'},
            {headerText:'Organisation Code'}
        ]
        };    

    this.handleFindPatientError = this.handleFindPatientError.bind(this);
    this.handleGetPatient = this.handleGetPatient.bind(this);
    }

    handleFindPatientError(error){
        this.setState({
            errorFindPatient:error.message
        })
      }

    handleGetPatient(token){
            this.props.getPatient(token);
    }

    render (){
        return(
            <div>
                <PanelDefault title={"Search Sjogrens@QEHB"}>
                    <PatientsSearchForm />
                </PanelDefault>
                  { this.props.patientFindResult.requestRecieved && this.props.patientFindResult.data ?
                    <PatientsFoundList patientSearchHeaders={this.state.patientSearchHeaders} patients={this.props.patientFindResult} getPatient={this.handleGetPatient} />
                  :null
                  }    
                

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        patientFindResult: state.patientFindResult
    };
}

export default connect(mapStateToProps,null)(PatientsSearch);
