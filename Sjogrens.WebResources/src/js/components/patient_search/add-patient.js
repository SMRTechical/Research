import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import ModalDefault from '../../components/generic/modal-default';
import AddPatientForm from '../../containers/patient_search/add-patient-form'
import {patientSearchCancel, mitPatientSave,mitPatientClear, patientSearchClear,patientsSearchClear} from '../../actions/index';
import {ADD_PATIENT} from '../../constants/styles/modal'


class AddPatient extends React.Component{
    constructor(props) {
        super(props);
    this.handleGetPatient = this.handleGetPatient.bind(this);
    }


    handleGetPatient(token){
        this.props.handleGetPatient(token);
    }


    render (){
       

        

        return(
            <div>
                <PanelDefault title={"Import New Patient"}>
                <AddPatientForm handleGetPatient={this.handleGetPatient}/>
                </PanelDefault>
              
        </div>
        );
    }
}


export default AddPatient;


