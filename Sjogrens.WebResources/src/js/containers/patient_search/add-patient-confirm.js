import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import ModalDefault from '../../components/generic/modal-default';
import PatientDetailsConfirm from '../../components/patient_search/patient-details-confirm';
import {patientSearchCancel, mitPatientSave,mitPatientClear, patientSearchClear,patientsSearchClear} from '../../actions/index';
import {consentUpdateWithToken,consentUpdate, getConsent,consentClear} from '../../actions/consent';
import {consentCtrls} from '../../config/controls/consent';


import {ADD_PATIENT} from '../../constants/styles/modal'


class AddPatientConfirm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            consentAge:18,
            mitPatientSaveError:'',
            patientAddSearchParams:null,
            pasId: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.pasId :'',
            nhsNumber: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.nhsNumber :'',
            firstName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.firstName :'',
            lastName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.lastName :'',
            postCode: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.postCode :'',
            gender: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.gender :'',
            dateOfBirth: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.dateOfBirth :'',
            age: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.age :'',
            exists: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.exists :null,
            consentGiven:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:this.props.patientAddResult ? this.props.patientAddResult.requestRecieved :false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.mitPatientSave = this.mitPatientSave.bind(this);    
        this.confirmPatient = this.confirmPatient.bind(this);
        this.handleMitPatientSaveError = this.handleMitPatientSaveError.bind(this);
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
        this.renderHeaderMessageAgeOk = this.renderHeaderMessageAgeOk.bind(this);
        this.renderHeaderMessageUnderAge = this.renderHeaderMessageUnderAge.bind(this);
        this.renderFooterWritable = this.renderFooterWritable.bind(this);
        this.renderFooterReadOnly = this.renderFooterReadOnly.bind(this);
        this.isConsentable = this.isConsentable.bind(this);
        this.renderWithdrawnParticipationMessage = this.renderWithdrawnParticipationMessage.bind(this);
        this.renderExistingPatientHeader = this.renderExistingPatientHeader.bind(this);
        this.renderNewPatientHeader = this.renderNewPatientHeader.bind(this);
        this.renderNoConsent = this.renderNoConsent.bind(this);
        this.updateConsentAndRedirect = this.updateConsentAndRedirect.bind(this);
    }


    componentWillReceiveProps(nextProps){
     
        this.setState({
            pasId: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.pasId :'',
            nhsNumber: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.nhsNumber :'',
            firstName: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.firstName :'',
            lastName: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.lastName :'',
            postCode: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.postCode :'',
            gender: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.gender :'',
            dateOfBirth: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.dateOfBirth :'',
            age: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.age :'',
            exists: nextProps.patientAddResult && nextProps.patientAddResult.data ? nextProps.patientAddResult.data.exists :null,
            consentGiven:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:nextProps.patientAddResult ? nextProps.patientAddResult.requestRecieved :false
        })
    }
  
    componentDidMount () {
{
   // console.log(' consentGiven:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false');
  //      console.log(this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false)
}
        this.setState({   
            pasId: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.pasId :'',
            nhsNumber: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.nhsNumber :'',
            firstName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.firstName :'',
            lastName: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.lastName :'',
            postCode: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.postCode :'',
            gender: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.gender :'',
            dateOfBirth: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.dateOfBirth :'',
            age: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.age :'',
            exists: this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.exists :null,
            consentGiven:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:this.props.patientAddResult ? this.props.patientAddResult.requestRecieved :false,
        });
    }


    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.patientMITResult.requestRecieved){
        //     var token = nextProps.patientMITResult.data.token;
        //     this.props.getPatient(token)
        // }
    }

    componentWillUnmount(){
    //    console.log('confirm unmounted')
        this.props.patientSearchClear();
        this.props.mitPatientClear();
        this.props.consentClear();
      }

    handleMitPatientSaveError(error){
        this.setState({
            mitPatientSaveError:error.message
        })
      }
  
    closeModal() {
        this.props.patientSearchCancel()
       // console.log('confirm unmounted')
        this.props.patientSearchClear();
        this.props.mitPatientClear();
        this.props.consentClear();
    }

    afterOpenModal() {
        this.setState({
            mitPatientSaveError:null
        })
      }

    mitPatientSave(e){
        e.preventDefault();
        var patientAddSearchParams ={
            pasId:  this.props.patientAddResult && this.props.patientAddResult.data ? this.props.patientAddResult.data.pasId :''
        }    
        

      //      console.log('this.state.consentGiven: ' + this.state.consentGiven)

      var consentPostParams = {
        consentGiven: this.state.consentGiven,
        consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
        consentWithdrawFutureParticipationRemoveData : this.state.consentWithdrawFutureParticipationRemoveData
    }


    var consentGetParams = {
        token: consentPostParams.token
    }



    console.log('mitPatientSave');
    console.log(consentPostParams);
        //async save patient, then clear store for patient befor save
        this.props.mitPatientSave(patientAddSearchParams)
        .then(p=>this.updateConsentAndRedirect(p.token,consentPostParams))
    //     .then(p=>this.props.consentUpdateWithToken(p.token,consentPostParams))
    //    .then(c=>this.props.getPatient(c.token))
        .catch(this.handleMitPatientSaveError);
       //clear the confirm patient
       //have we got the saved patient, with token?
        // if (!this.props.patientMITResult.requestRecieved){
        //   //not, so set the local state, to cause re-render and componentWillUpdate to re-run
        //   this.setState ({
        //     patientAddSearchParams:patientAddSearchParams
        //   })
        // }
        // else {
        //   //yes we have saved patient with token. so get patient details
        //    this.props.getPatient(this.props.patientMITResult.data.token)
        // }
     }


updateConsentAndRedirect(token, consentPostParams){
console.log('updateConsentAndRedirect');
//console.log(token);
    if (token){
        consentPostParams.token  = token


        var consentGetParams = {
           token: token
       }


    //   consentUpdate(consentPostParams)).then(p=> dispatch(getConsent(consentGetParams))

    this.props.consentUpdate(consentPostParams)
    .then(cu=>this.props.getConsent(consentGetParams))
  //  .then(this.props.getConsent(consentGetParams))
    .then(cg=>this.props.getPatient(cg.token))
}
}



    confirmPatient(e){
        console.log('confirmPatient')
        e.preventDefault(); 
        this.props.getPatient(this.props.patientAddResult.data.token);
    }


    handleConsentGiven(value){
        //console.log('containers/patient-search/add-patient-confirm')
        this.setState({
            consentGiven:value
        })
    }


renderExistingPatientHeader(){
    return (
        <div className="alert alert-info">
        <i className="fa fa-info-circle fa-3 mr-3" aria-hidden="true"></i>
        Patient exists. Would you like to continue? 
        </div>
    )
}

    renderWithdrawnParticipationMessage(){
        return (
            <div className="alert alert-warning">
            <div><i className="fa fa-exclamation-triangle fa-3 mr-3" aria-hidden="true"></i>Patient has withdrawn from all future participation.</div>
            <div className="text-center">Would you like to continue?</div>
        </div>
        )
    }

    renderWithdrawnParticipationMessageRemoveData(){
        return (
            <div className="alert alert-danger">
            <div><i className="fa fa-exclamation-triangle fa-3 mr-3" aria-hidden="true"></i>Patient has withdrawn consent and requested their data to be removed.</div>
            <div className="text-center">Would you like to continue?</div>
        </div>
        )
    }

    renderNoConsent(){
        return (
            <div className="alert alert-warning">
            <div><i className="fa fa-exclamation-triangle fa-3 mr-3" aria-hidden="true"></i>Patient exists within system with no consent.</div>
            <div className="text-center">Would you like to continue?</div>
        </div>
        )
    }

    renderNewPatientHeader(){
        return (
            <div className="alert alert-success">
            <i className="fa fa-check fa-3 mr-3" aria-hidden="true"></i>
            Please confirm patient details and patient consent 
            </div>
        )
    }

    renderHeaderMessageAgeOk(){
        return (
            <div>
            {
               this.state.exists ? 
                //this.state.consentGiven ?
                this.renderExistingPatientHeader():
                //this.state.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[0].controlValueId ?     
                //this.renderWithdrawnParticipationMessage() :
                //this.state.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[1].controlValueId ? 
                //this.renderWithdrawnParticipationMessageRemoveData(): 
                //this.renderNoConsent():
                   this.renderNewPatientHeader()       
            }
            </div>
        )
    }


    renderHeaderMessageUnderAge(){
        return (
            <div className="alert alert-danger">
            <i className="fa fa-exclamation-triangle fa-3 mr-3" aria-hidden="true"></i>
            {
                "This Patient is under age so cannot be imported into Sjogrens."       
            }
            </div>
        )
    }


    renderFooterWritable(exists){
        return (
            <div className="panel-footer">
            <button type="button" className="btn btn-warning mr-3" 
            onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>

            <button id="patientImportConfirm" disabled={!this.state.consentGiven && !exists}
            type="button" 
            onClick={ exists ? this.confirmPatient : this.mitPatientSave}
            className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
            </button>
        </div>
        )
    }


    renderFooterReadOnly(){
        return (
            <div className="panel-footer">
            <button type="button" className="btn btn-warning mr-3" 
            onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>
        </div>
        )
    }


    isConsentable(){
        return this.state.exists ? true : Number.parseInt(this.state.age, 10) >= Number.parseInt(this.state.consentAge, 10);
    }

    render (){
        var patient = {
            pasId: this.state.pasId,
            nhsNumber: this.state.nhsNumber,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            postCode: this.state.postCode,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            age: this.state.age,
            exists: this.state.exists,
            consentGiven:this.state.consentGiven
        }



        return(
            <div>
              
                <ModalDefault isOpen={ this.state.requestRecieved}  onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal} style={ADD_PATIENT} contentLabel={"Add Patient"}>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <button type="button" className="close" onClick={this.closeModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4>
                                {
                                    this.state.exists ? "Existing Patient Details" : "Import Patient Details"
                                }
                                </h4>
                        </div>
                            <div className="panel-body">
                                {!!this.state.mitPatientSaveError && <div className="error"><span>{this.state.mitPatientSaveError}</span></div>}
                                    {
                                        this.isConsentable() ? this.renderHeaderMessageAgeOk() :this.renderHeaderMessageUnderAge()
                                    }
                                
                                <PatientDetailsConfirm patient={patient} handleConsentGiven={this.handleConsentGiven} consentable={this.isConsentable()} />
                            </div>
                            {
                                this.isConsentable() ? this.renderFooterWritable(patient.exists) : this.renderFooterReadOnly()
                            }
                    </div>
                </ModalDefault>
        </div>
        );
    }
}

function mapStateToProps(state) {
     return {
        patientMITResult:state.patientMITResult,
        consentResult:state.consentResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({patientSearchCancel: patientSearchCancel, mitPatientSave:mitPatientSave, mitPatientClear:mitPatientClear, patientSearchClear:patientSearchClear,patientsSearchClear:patientsSearchClear,consentUpdateWithToken:consentUpdateWithToken, consentUpdate:consentUpdate, getConsent:getConsent, consentClear:consentClear}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddPatientConfirm);


