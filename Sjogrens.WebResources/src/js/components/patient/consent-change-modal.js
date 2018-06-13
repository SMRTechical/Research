import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PanelConsentSuccess from '../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../components/generic/panel-consent-remove';
import PanelNoConsent from '../../components/generic/panel-no-consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import ModalDefault from '../../components/generic/modal-default';
import {CONSENT} from '../../constants/styles/modal';
import {consentCtrls} from '../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import AuditData from '../../components/generic/audit-data';

class ConsentChangeModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            token: this.props.consent  ? this.props.consent.token :'',
            consentGiven: this.props.consent ? this.props.consent.consentGiven :false,
            consentGivenDate: this.props.consent ? this.props.consent.consentGivenDate :null,
            consentWithdrawFutureParticipation: this.props.consent ? this.props.consent.consentWithdrawFutureParticipation :0,
            consentWithdrawFutureParticipationRemoveData: this.props.consent ? this.props.consent.consentWithdrawFutureParticipationRemoveData :0,
            consentWithdrawnDate: this.props.consent  ? this.props.consent.consentWithdrawnDate :null,

            createdUser: this.props.consent  ? this.props.consent.createdUser :null,
            createdDateTime: this.props.consent  ? this.props.consent.createdDateTime :'',
            lastUpdatedUser: this.props.consent  ? this.props.consent.lastUpdatedUser :'',
            lastUpdatedDateTime: this.props.consent  ? this.props.consent.lastUpdatedDateTime :'',

          //  consentModalOpen: false,
           isDirty:false
        };

       // this.renderConsent = this.renderConsent.bind(this);
       // this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
    //    this.renderConsentSuccess = this.renderConsentSuccess.bind(this);
    //    this.renderConsentDanger = this.renderConsentDanger.bind(this);
     //   this.handleConsentChange = this.handleConsentChange.bind(this);
     //   this.renderNoConsent = this.renderNoConsent.bind(this);
        this.closeConsentModal = this.closeConsentModal.bind(this);
        this.afterOpenConsentModal = this.afterOpenConsentModal.bind(this);
        this.handleConsentWithdrawn = this.handleConsentWithdrawn.bind(this);
        this.handleSaveConsent = this.handleSaveConsent.bind(this);  
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
       // this.validateConsentForm = this.validateConsentForm.bind(this);
    }




    handleSaveConsent(e){
        e.preventDefault();
        var consentPostParams = {
            token:this.state.token,
            consentGiven: this.state.consentGiven,
            //consentGivenDate: null,
            consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
            consentWithdrawFutureParticipationRemoveData : this.state.consentWithdrawFutureParticipationRemoveData
        }

        this.props.handleSaveConsent(consentPostParams);

       }


    componentWillReceiveProps(nextProps){

      this.setState({
                consentGiven: nextProps.consent  ? nextProps.consent.consentGiven :false,
                consentGivenDate: nextProps.consent ? nextProps.consent.consentGivenDate :null,
                ConsentWithdrawFutureParticipation: nextProps.consent  ? nextProps.consent.consentWithdrawFutureParticipation :0,
                ConsentWithdrawFutureParticipationRemoveData: nextProps.consent  ? nextProps.consent.consentWithdrawFutureParticipationRemoveData :0,
                consentWithdrawnDate: nextProps.consent  ? nextProps.consent.consentWithdrawnDate :null,

                createdUser: nextProps.consent  ? nextProps.consent.createdUser :null,
                createdDateTime: nextProps.consent  ? nextProps.consent.createdDateTime :'',
                lastUpdatedUser: nextProps.consent  ? nextProps.consent.lastUpdatedUser :'',
                lastUpdatedDateTime: nextProps.consent  ? nextProps.consent.lastUpdatedDateTime :'',

                isDirty:false

        })
      }



      componentDidMount () {
            this.setState({
                consentGiven: this.props.consent ? this.props.consent.consentGiven :false,
                consentGivenDate: this.props.consent ? this.props.consent.consentGivenDate :null,
                ConsentWithdrawFutureParticipation: this.props.consent ? this.props.consent.ConsentWithdrawFutureParticipation :0,
                ConsentWithdrawFutureParticipationRemoveData: this.props.consent  ? this.props.consent.ConsentWithdrawFutureParticipationRemoveData :0,
                consentWithdrawnDate: this.props.consent ? this.props.consent.consentWithdrawnDate :null,

                createdUser: this.props.consent  ? this.props.consent.createdUser :null,
                createdDateTime: this.props.consent  ? this.props.consent.createdDateTime :'',
                lastUpdatedUser: this.props.consent  ? this.props.consent.lastUpdatedUser :'',
                lastUpdatedDateTime: this.props.consent  ? this.props.consent.lastUpdatedDateTime :'',
                isDirty:false
            });
       }

    
  
handleConsentGiven(e){
    


                   var consentGiven = e.target.checked;//!e.target.checked ? e.target.checked : !e.target.checked
                   var isDirty = this.props.consent ?    
                                       this.props.consent.consentGiven == consentGiven ? 
                                           false : true 
                                       :true 



        this.setState({
            consentGiven: consentGiven, //!e.target.checked ? this.validateConsentForm() ? !e.target.checked : e.target.checked:e.target.checked,
            consentGivenDate: null,
            isDirty: isDirty,//this.validateConsentForm() ? this.props.consent.data.consentGiven == consentGiven ? false : true :false,
            consentWithdrawFutureParticipation: null,
            consentWithdrawFutureParticipationRemoveData : null,
            consentWithdrawnDate:null
        })
}



handleConsentWithdrawn(e){

   
                  var isDirty =  this.props.consent ?
                                    this.props.consent.consentWithdrawFutureParticipation == e.target.value || this.props.consent.consentWithdrawFutureParticipationRemoveData == e.target.value ? 
                                        false : true 
                                :true


    this.setState({
       consentGiven:false,
        consentGivenDate:null,
        isDirty:isDirty,
        consentWithdrawFutureParticipation: e.target.value  == consentCtrls.consetWithdrawOptions[0].controlValueId ? e.target.value: 0,
        consentWithdrawFutureParticipationRemoveData :e.target.value  == consentCtrls.consetWithdrawOptions[1].controlValueId ? e.target.value: 0,
        consentWithdrawnDate:null
    })


}



closeConsentModal(){
    this.setState({
        token: this.props.consent  ? this.props.consent.token :'',
        consentGiven: this.props.consent ? this.props.consent.consentGiven :false,
        consentGivenDate: this.props.consent ? this.props.consent.consentGivenDate :null,
        consentWithdrawFutureParticipation: this.props.consent ? this.props.consent.consentWithdrawFutureParticipation :null,
        consentWithdrawFutureParticipationRemoveData: this.props.consent ? this.props.consent.consentWithdrawFutureParticipationRemoveData :null,
        consentWithdrawnDate: this.props.consent  ? this.props.consent.consentWithdrawnDate :null,
        isDirty:false
    })  
    this.props.closeConsentModal();
}

afterOpenConsentModal(){
   // var p = ''
    //use this to clear any error
    this.props.afterOpenConsentModal();
}

        
render (){
    return(
       
<ModalDefault isOpen={this.props.consentModalOpen}  onRequestClose={this.props.closeConsentModal} onAfterOpen={this.props.afterOpenConsentModal} style={CONSENT} contentLabel={this.props.contentLabel}>
            <div  className={classnames('panel',{'panel-primary': !this.state.isDirty,'panel-success':this.state.consentGiven && this.state.isDirty, 'panel-danger': !this.state.consentGiven && this.state.isDirty})}>
                <div className="panel-heading">
                    <button type="button" className="close" onClick={this.closeConsentModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    {/* { this.props.consent && this.props.consent.consentGiven ?
                    <h4>                        
                        Withdraw Consent </h4> : <h4>Give Consent</h4>
                    } */}
                    <h4>Patient Consent</h4>
                </div>
                <div className="panel-body">
                     <form className="form" role="form">
                    {
                        this.state.isDirty && this.state.consentWithdrawFutureParticipationRemoveData == consentCtrls.consetWithdrawOptions[1].controlValueId && <div className="alert alert-danger"> <i className="fa fa-times-circle-o fa-2 mr-10" aria-hidden="true"></i>Warning: All patient data will be removed from this study!</div>
                    }

                     <div className="form-group row">
                                    <label className="col-md-10 col-sm-12 col-form-label">{consentCtrls.consentGivenOptions.description}</label>
                                    <div className="col-md-1 col-sm-12">
                                        <input type="checkbox" name="consentGiven" ref="chkConsentGiven" id="chkConsentGiven" 
                                           checked={this.state.consentGiven} 
                                            className="form-control" 
                                            onChange={this.handleConsentGiven}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-10 col-sm-12 col-form-label">{consentCtrls.consetWithdrawOptions[0].description}</label>
                                    <div className="col-md-1 col-sm-12">
                                        <input type="radio" name="withdrawConsent" ref="optConsentWithdrawFutureParticipation" id="optConsentWithdrawFutureParticipation" 
                                            value={consentCtrls.consetWithdrawOptions[0].controlValueId}
                                           checked={this.state.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[0].controlValueId} 
                                            className="form-control" 
                                            onChange={this.handleConsentWithdrawn}/>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label className="col-md-10 col-sm-12 col-form-label">{consentCtrls.consetWithdrawOptions[1].description}</label>
                                    <div className="col-md-1 col-sm-12">
                                        <input type="radio" name="withdrawConsent" ref="optConsentWithdrawFutureParticipationRemoveData" id="optConsentWithdrawFutureParticipationRemoveData"
                                            value={consentCtrls.consetWithdrawOptions[1].controlValueId}
                                            checked={this.state.consentWithdrawFutureParticipationRemoveData == consentCtrls.consetWithdrawOptions[1].controlValueId}
                                            className="form-control" 
                                            onChange={this.handleConsentWithdrawn}/>
                                    </div>
                                </div> */}
                        </form>

                       
                </div>
                <div className="panel-footer">
                  
                    <button id="patientConsentCancel" type="button" className="btn btn-primary mr-3" 
                    onClick={this.closeConsentModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>
                    <button id="patientConsentConfirm"   disabled={!this.state.isDirty}
                    type="button" className="btn btn-danger"
                    onClick={this.handleSaveConsent}>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
                    </button>
                    <div className="mt-10">
                    <AuditData createdBy={this.state.createdUser} createdDate={this.state.createdDateTime}  lastUpdatedBy={this.state.lastUpdatedUser} lastUpdatedDate={this.state.lastUpdatedDateTime}/>
                
                        </div>
                </div>

                
                    
            </div>
            </ModalDefault>

                )
    }
}



 export default ConsentChangeModal;
