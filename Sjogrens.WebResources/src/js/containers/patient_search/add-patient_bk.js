import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// //import Dialog from 'react-bootstrap-dialog'
// import Modal from 'react-modal';
import PanelDefault from '../../components/generic/panel-default';
import ModalDefault from '../../components/generic/modal-default';
import PatientDetailsConfirm from '../../components/patient_search/patient-details-confirm';
import AddPatientForm from './add-patient-form'
import {patientSearchCancel, mitPatientSave,mitPatientClear, patientSearchClear,patientsSearchClear} from '../../actions/index';
import {ADD_PATIENT} from '../../constants/styles/modal'


class AddPatient_bk extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mitPatientSaveError:'',
           patientAddSearchParams:null,
           consentGiven:this.props.patientAddResult.data ? this.props.patientAddResult.data.consentGiven:false
        };
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.mitPatientSave = this.mitPatientSave.bind(this);    
    this.confirmPatient = this.confirmPatient.bind(this);
    this.handleMitPatientSaveError = this.handleMitPatientSaveError.bind(this);
    this.handleConsentGiven = this.handleConsentGiven.bind(this);
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextProps.patientMITResult.requestRecieved){
            var token = nextProps.patientMITResult.data.token;
            this.props.getPatient(token)
        }


        // if (nextProps.patientAddResult.requestRecieved){
        //     this.setState({
        //         consentGiven:nextProps.patientAddResult.data.consentGiven
        //     })
        // }
    }

      componentWillUnmount(){
        this.props.patientSearchClear();
        this.props.mitPatientClear();
      }

  

    handleMitPatientSaveError(error){
        this.setState({
            mitPatientSaveError:error.message
        })
      }
  

    closeModal() {
        this.props.patientSearchCancel()
    }

    afterOpenModal() {
        this.setState({
            mitPatientSaveError:null
        })
      }

    mitPatientSave(e){
        e.preventDefault();
        console.log('mitPatientSave')
        var patientAddSearchParams ={
            pasId:  this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.pasId :'',
            consentGiven: this.state.consentGiven
        }      
       // console.log(patientAddSearchParams) 
        //async save patient, then clear store for patient befor save
        this.props.mitPatientSave(patientAddSearchParams)
        .catch(this.handleMitPatientSaveError);
       //clear the confirm patient
       //have we got the saved patient, with token?
      if (!this.props.patientMITResult.requestRecieved){
          //not, so set the local state, to cause re-render and componentWillUpdate to re-run
          this.setState ({
            patientAddSearchParams:patientAddSearchParams
          })
      }
      else {
          //yes we have saved patient with token. so get patient details
           this.props.getPatient(this.props.patientMITResult.data.token)
       }
     }

    confirmPatient(e){
        e.preventDefault(); 
        this.props.getPatient(this.props.patientAddResult.data.token);

    }

handleConsentGiven(value){
  // console.log('add-patient.js: ' + value)
this.setState({
    consentGiven:value
})
}

    render (){
        var patient = {
            pasId: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.pasId :'',
            nhsNumber: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.nhsNumber :'',
            firstName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.firstName :'',
            lastName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.lastName :'',
            postCode: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.postCode :'',
            gender: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.gender :'',
            dateOfBirth: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.dateOfBirth :'',
            exists: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.exists :null,
            consentGiven:this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.consentGiven :false,
        }

        

        return(
            <div>
                <PanelDefault title={"Add Patient"}>
                <AddPatientForm />
                </PanelDefault>
                <ModalDefault isOpen={ this.props.patientAddResult.requestRecieved}  onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal} style={ADD_PATIENT} contentLabel={"Add Patient"}>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <button type="button" className="close" onClick={this.closeModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4>
                                {
                                    patient && patient.exists ? "Existing Patient" : "Import Patient"
                                }
                                </h4>
                        </div>
                        <div className="panel-body">
                        {!!this.state.mitPatientSaveError && <div className="error"><span>{this.state.mitPatientSaveError}</span></div>}

                            <div className="alert alert-info">
                                <i className="fa fa-info-circle fa-3 mr-3" aria-hidden="true"></i>
                                {
                                    patient && patient.exists ? 
                                    "Patient " + patient.pasId + " already exists. Would you like to continue?" :
                                    "Please confirm patient details and patient consent."        
                                }
                            </div>
                        <PatientDetailsConfirm patient={patient} handleConsentGiven={this.handleConsentGiven}/>
                        </div>
                        <div className="panel-footer">
                            <button type="button" className="btn btn-warning mr-3" 
                            onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>

                            <button id="patientImportConfirm" disabled={!this.state.consentGiven}
                            type="button" 
                            onClick={ patient && patient.exists ? this.confirmPatient : this.mitPatientSave}
                            className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
                            </button>
                        </div>
                    </div>
                </ModalDefault>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        patientAddResult: state.patientAddResult,
        patientMITResult:state.patientMITResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({patientSearchCancel: patientSearchCancel, mitPatientSave:mitPatientSave, mitPatientClear:mitPatientClear, patientSearchClear:patientSearchClear,patientsSearchClear:patientsSearchClear}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddPatient_bk);


