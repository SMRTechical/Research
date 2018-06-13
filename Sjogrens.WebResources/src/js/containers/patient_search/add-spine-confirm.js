import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import ModalDefault from '../../components/generic/modal-default';
import SpineDetailsConfirm from '../../components/patient_search/spine-details-confirm';
import {spineSearchCancel, spineSave,spineClear, spineSearchClear} from '../../actions/spine';
import {consentUpdateWithToken, consentUpdate, getConsent} from '../../actions/consent';



import {ADD_SPINE_PATIENT} from '../../constants/styles/modal'


class AddSpineConfirm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            consentAge:18,
            spineSaveError:'',
            patientAddWithAuditParams:null,
            pasId: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.pasId :'',
            firstName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.firstName :'',
            lastName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.lastName :'',
            middleName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.middleName :'',
            nhsNumber: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.nhsNumber :'',
            gender: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.gender :'',
            genderDescription:   this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.genderDescription :'',
            address1: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address1 :'',
            address2: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address2 :'',
            address3: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address3 :'',
            address4: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address4 :'',
            address5: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address5 :'',
            postCode: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.postCode :'',
            gpPracticeName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.gpPracticeName :'',

            
            errors: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.errors : '',

            organisationCode: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.organisationCode :'',
            dateOfBirth: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.dateOfBirth :'',
            age: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.age :'',
            exists: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.exists :null,
            consentGiven:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:this.props.spineAddResult ? this.props.spineAddResult.requestRecieved :false,
            
        };
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.spineSave = this.spineSave.bind(this);    
        this.confirmSpine = this.confirmSpine.bind(this);
        this.handleSpineSaveError = this.handleSpineSaveError.bind(this);
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
        this.renderHeaderMessageAgeOk = this.renderHeaderMessageAgeOk.bind(this);
        this.renderHeaderMessageUnderAge = this.renderHeaderMessageUnderAge.bind(this);
        this.renderFooterWritable = this.renderFooterWritable.bind(this);
        this.renderFooterReadOnly = this.renderFooterReadOnly.bind(this);
        this.isConsentable = this.isConsentable.bind(this);
        this.renderWithdrawnParticipationMessage = this.renderWithdrawnParticipationMessage.bind(this);
        this.renderExistingPatientHeader = this.renderExistingPatientHeader.bind(this);
        this.renderNewPatientHeader = this.renderNewPatientHeader.bind(this);
        this.updateConsentAndRedirect = this.updateConsentAndRedirect.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            pasId: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.pasId :'',
            firstName: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.firstName :'',
            lastName: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.lastName :'',
            middleName: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.middleName :'',
            nhsNumber: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.nhsNumber :'',
            gender: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.gender :'',
            genderDescription:   nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.genderDescription :'',
            address1: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.address1 :'',
            address2: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.address2 :'',
            address3: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.address3 :'',
            address4: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.address4 :'',
            address5: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.address5 :'',
            postCode: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.postCode :'',
            gpPracticeName: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.gpPracticeName :'',
            errors: nextProps.spineAddResult  && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.errors : '',
            
          organisationCode: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.organisationCode :'',
          dateOfBirth: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.dateOfBirth :'',
          age: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.age :'',
          exists: nextProps.spineAddResult && nextProps.spineAddResult.data ? nextProps.spineAddResult.data.exists :null,
            consentGiven:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:nextProps.consentResult && nextProps.consentResult.data ? nextProps.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:nextProps.spineAddResult ? nextProps.spineAddResult.requestRecieved :false,
        })
    }
  
    componentDidMount () {
        this.setState({   
            pasId: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.pasId :'',
            firstName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.firstName :'',
            lastName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.lastName :'',
            middleName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.middleName :'',
            nhsNumber: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.nhsNumber :'',
            gender: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.gender :'',
            genderDescription:   this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.genderDescription :'',
            address1: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address1 :'',
            address2: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address2 :'',
            address3: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address3 :'',
            address4: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address4 :'',
            address5: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.address5 :'',
            postCode: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.postCode :'',
            gpPracticeName: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.gpPracticeName :'',
            errors: this.props.spineAddResult && this.props.spineAddResult.data ?  this.props.spineAddResult.data.errors : '',

            organisationCode: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.organisationCode :'',
            age: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.age :'',
            dateOfBirth: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.dateOfBirth :'',
            exists: this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.exists :null,
            consentGiven:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentGiven :false,
            consentWithdrawFutureParticipation:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipation :false,
            consentWithdrawFutureParticipationRemoveData:this.props.consentResult && this.props.consentResult.data ? this.props.consentResult.data.consentWithdrawFutureParticipationRemoveData :false,
            requestRecieved:this.props.spineAddResult ? this.props.spineAddResult.requestRecieved :false,
            
        });
    }





    componentWillUpdate(nextProps, nextState) {
        // if (nextProps.spineResult.requestRecieved){
        //     var token = nextProps.spineResult.data.token;
        //     this.props.getPatient(token)
        // }
    }

    componentWillUnmount(){
        this.props.spineSearchClear();
        this.props.spineClear();
      }

    handleSpineSaveError(error){
        this.setState({
            spineSaveError:error.message
        })
      }
  
    closeModal() {
        this.props.spineSearchCancel()
    }

    afterOpenModal() {
        this.setState({
            spineSaveError:null
        })
      }

    spineSave(e){
        e.preventDefault();
        var patientAddWithAuditParams ={
            pasId:  this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.pasId :'',
            nhsNumber:  this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.nhsNumber :'',
            dateOfBirth:  this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.dateOfBirth :'',
            exists:this.props.spineAddResult && this.props.spineAddResult.data ? this.props.spineAddResult.data.dateOfBirth :'',
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



  //  console.log('add-spine-confiorm');
    //console.log(consentPostParams);
        //async save patient, then clear store for patient befor save
        this.props.spineSave(patientAddWithAuditParams)
      //  .then(p=>this.props.consentUpdateWithToken(p.token,consentPostParams))
      .then(p=>this.updateConsentAndRedirect(p.token,consentPostParams))  
      .catch(this.handleSpineSaveError);
       //clear the confirm patient
       //have we got the saved patient, with token?
        // if (!this.props.spineResult.requestRecieved){
        //   //not, so set the local state, to cause re-render and componentWillUpdate to re-run
        //   this.setState ({
        //     patientAddWithAuditParams:patientAddWithAuditParams
        //   })
        // }
        // else {
        //   //yes we have saved patient with token. so get patient details
        //    this.props.getSpinePatient(this.props.spineResult.data.token)
        // }
     }




     updateConsentAndRedirect(token, consentPostParams){
       // console.log('updateConsentAndRedirect');
       // console.log(token);
            if (token){
                consentPostParams.token  = token
        
        
                var consentGetParams = {
                   token: token
               }
        
        
            //   consentUpdate(consentPostParams)).then(p=> dispatch(getConsent(consentGetParams))
        
            this.props.consentUpdate(consentPostParams)
            .then(cu=>this.props.getConsent(consentGetParams))
          //  .then(this.props.getConsent(consentGetParams))
            .then(cg=>this.props.getSpinePatient(cg.token))
        }
        }
        
        



    confirmSpine(e){
        e.preventDefault(); 
        this.props.getSpinePatient(this.props.spineAddResult.data.token);
    }

    handleConsentGiven(value){
        this.setState({
            consentGiven:value
        })
    }


renderExistingPatientHeader(){
    return (
        <div className="alert alert-warning">
        <i className="fa fa-info-circle fa-3 mr-3" aria-hidden="true"></i>
        Patient exists. Would you like to continue? 
        </div>
    )
}

    renderWithdrawnParticipationMessage(){
        return (
            <div className="alert alert-danger">
            <div><i className="fa fa-exclamation-triangle fa-3 mr-3" aria-hidden="true"></i>Patient has withdrawn from all future participation.</div>
            <div className="text-center">Would you like to continue?</div>
        </div>
        )
    }

    renderNewPatientHeader(){
        return (
            <div className="alert alert-info">
            <i className="fa fa-info-circle fa-3 mr-3" aria-hidden="true"></i>
            Please confirm patient details and patient consent 
            </div>
        )
    }

    renderHeaderMessageAgeOk(){
        return (
            <div>
            {
               this.state.exists ? this.state.consentGiven ?
               this.renderExistingPatientHeader():
               this.renderWithdrawnParticipationMessage() :
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


formatErrors(error){
    var error_array = error.split(',');
   // console.log(error_array);
return (    
<ul className="list-group">
    {error_array.map((err,i)=><li className="list-group-item" key={i}>{err}</li>)}
</ul>
)
}

    renderErrors(){
        return (
            <div className="alert alert-warning">
            {
                
                    <div>{this.state.errors}</div>
                      
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
            onClick={ exists ? this.confirmSpine : this.spineSave}
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
            pasId: this.state.pasId ? this.state.pasId :'' ,
            nhsNumber: this.state.nhsNumber ? this.state.nhsNumber : '',
            firstName: this.state.firstName ? this.state.firstName : '',
            middleName: this.state.middleName ? this.state.middleName : '',
            lastName: this.state.lastName ? this.state.lastName : '',
            gender: this.state.gender ? this.state.gender : '',
            genderDescription:  this.state.genderDescription ? this.state.genderDescription : '',
            address1: this.state.address1 ? this.state.address1 : '',
            address2: this.state.address2 ? this.state.address2 : '',
            address3: this.state.address3 ? this.state.address3 : '',
            address4: this.state.address4 ? this.state.address4 : '',
            address5: this.state.address5 ? this.state.address5 : '',
            postCode: this.state.postCode ?  this.state.postCode : '',
            gpPracticeName: this.state.gpPracticeName ?  this.state.gpPracticeName : '',
            organisationCode: this.state.organisationCode ? this.state.organisationCode : '' ,
            dateOfBirth: this.state.dateOfBirth ? this.state.dateOfBirth : '',
            age: this.state.age ? this.state.age : '',
            exists: this.state.exists ? this.state.exists : false,
            consentGiven:this.state.consentGiven ? this.state.consentGiven : false
        }



        return(
            <div>
              
                <ModalDefault isOpen={ this.state.requestRecieved}  onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal} style={ADD_SPINE_PATIENT} contentLabel={"Add Patient"}>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <button type="button" className="close" onClick={this.closeModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4>
                                {
                                    this.state.exists ? "Existing Patient" : "Import Patient"
                                }
                                </h4>
                        </div>
                            <div className="panel-body">
                                {!!this.state.spineSaveError && <div className="error"><span>{this.state.spineSaveError}</span></div>}
                                    {
                                        this.isConsentable() ? this.renderHeaderMessageAgeOk() :this.renderHeaderMessageUnderAge()
                                    }

                                    {
                                        this.state.errors ? this.renderErrors():null
                                    }
                                
                                <SpineDetailsConfirm spine={patient} handleConsentGiven={this.handleConsentGiven} consentable={this.isConsentable()}/>
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
        spineResult:state.spineResult,
        consentResult:state.consentResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({spineSearchCancel: spineSearchCancel, spineSave:spineSave, spineClear:spineClear, spineSearchClear:spineSearchClear,consentUpdateWithToken:consentUpdateWithToken, consentUpdate:consentUpdate, getConsent:getConsent}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddSpineConfirm);


