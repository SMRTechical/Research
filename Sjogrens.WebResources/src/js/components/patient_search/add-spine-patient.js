import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import ModalDefault from '../../components/generic/modal-default';
import AddSpinePatientForm from '../../containers/patient_search/add-spine-patient-form'
import {patientSearchCancel, mitPatientSave,mitPatientClear, patientSearchClear,patientsSearchClear} from '../../actions/index';
import {ADD_PATIENT} from '../../constants/styles/modal'


class AddSpinePatient extends React.Component{
    constructor(props) {
        super(props);
    this.handleGetSpinePatient = this.handleGetSpinePatient.bind(this);
    }


    handleGetSpinePatient(token){
        this.props.handleGetSpinePatient(token);
    }


    render (){
       

        

        return(
            <div>
                <PanelDefault title={"Add Patient from external Trust"}>
                    <AddSpinePatientForm handleGetSpinePatient={this.handleGetSpinePatient}/>
                </PanelDefault>
        </div>
        );
    }
}


export default AddSpinePatient;


