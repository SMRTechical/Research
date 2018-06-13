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

class ConsentFormBk extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.consent && this.props.consent.data ? this.props.consent.data.token :'',
            consentGiven: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGiven :'',
            consentGivenDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGivenDate :'',
            consentWithdrawFutureParticipation: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawFutureParticipation :'',
            consentWithdrawFutureParticipationRemoveData: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawFutureParticipationRemoveData :'',
            consentWithdrawnDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawnDate :'',
            consentModalOpen: false,
            isDirty:false
        };

        this.renderConsent = this.renderConsent.bind(this);
        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
        this.renderConsentSuccess = this.renderConsentSuccess.bind(this);
        this.renderConsentDanger = this.renderConsentDanger.bind(this);
        this.handleConsentChange = this.handleConsentChange.bind(this);
        this.renderNoConsent = this.renderNoConsent.bind(this);
        this.closeConsentModal = this.closeConsentModal.bind(this);
        this.afterOpenConsentModal = this.afterOpenConsentModal.bind(this);
        this.handleConsentWithdrawn = this.handleConsentWithdrawn.bind(this);
        this.handleSaveConsent = this.handleSaveConsent.bind(this);  
        this.handleConsentGiven = this.handleConsentGiven.bind(this);
        this.validateConsentForm = this.validateConsentForm.bind(this);
    }




    handleSaveConsent(e){
        e.preventDefault();
        var consentPostParams = {
            token:this.state.token,
            consentGiven: false,
            consentGivenDate: null,
            consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
            consentWithdrawFutureParticipationRemoveData : this.state.consentWithdrawFutureParticipationRemoveData
        }

        this.setState({
            consentModalOpen:false,
            consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
            consentWithdrawFutureParticipationRemoveData: this.state.consentWithdrawFutureParticipationRemoveData
        })


      //  console.log('handleSaveConsent:Form' + consentPostParams);
        this.props.handleSaveConsent(consentPostParams);

       }



//        shouldComponentUpdate(nextProps, nextState){
//            console.log('shouldComponentUpdate start')
//            console.log(nextState);
//            console.log('shouldComponentUpdate end')

// if ((nextState.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[0].controlValueId ||  
//     nextState.consentWithdrawFutureParticipationRemoveData == consentCtrls.consetWithdrawOptions[1].controlValueId) && nextState.consentWithdrawnDate == null )
// {
//     return false;
// }else if ( nextState.consentGiven && nextState.consentGivenDate == null){
//     return false
// }
// else {
//     return true
// }           



      // }

    componentWillReceiveProps(nextProps){
      this.setState({
                consentGiven: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentGiven :'',
                consentGivenDate: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentGivenDate :'',
                ConsentWithdrawFutureParticipation: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawFutureParticipation :'',
                ConsentWithdrawFutureParticipationRemoveData: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawFutureParticipationRemoveData :'',
                consentWithdrawnDate: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawnDate :''
        })
      }

    componentDidMount () {
            this.setState({
                consentGiven: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGiven :'',
                consentGivenDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGivenDate :'',
                ConsentWithdrawFutureParticipation: this.props.consent && this.props.consent.data ? this.props.consent.data.ConsentWithdrawFutureParticipation :'',
                ConsentWithdrawFutureParticipationRemoveData: this.props.consent && this.props.consent.data ? this.props.consent.data.ConsentWithdrawFutureParticipationRemoveData :'',
                consentWithdrawnDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawnDate :''
            });
       }

  

renderLoadingMessage(){
    return (
        <PanelDefault title={"...Loading Consent"}>
       <div><img src={paths.loader} alt="Download"/></div>
        </PanelDefault>
    )
}
   
handleConsentChange(){
this.setState({
    consentModalOpen:true
})
   // this.props.updateConsent(consentGiven);
}

handleConsentGiven(e){
   // console.log('e.target.checked: ' + e.target.checked);
   // console.log('this.props.consent.data.consentGiven: ' + this.props.consent.data.consentGiven);
    

//console.log('consentGiven test:' + !e.target.checked ? this.validateConsentForm() ? !e.target.checked : e.target.checked:e.target.checked)

var consentGiven = !e.target.checked ? this.validateConsentForm() ? !e.target.checked : e.target.checked:e.target.checked
var isDirty = this.validateConsentForm() ? this.props.consent.data.consentGiven == consentGiven ? false : true :false
    this.setState({
        consentGiven: consentGiven, //!e.target.checked ? this.validateConsentForm() ? !e.target.checked : e.target.checked:e.target.checked,
        consentGivenDate: null,
        isDirty: isDirty,//this.validateConsentForm() ? this.props.consent.data.consentGiven == consentGiven ? false : true :false,
        consentWithdrawFutureParticipation: null,
        consentWithdrawFutureParticipationRemoveData : null,
        consentWithdrawnDate:null
    })

   // console.log('consnet date:' + this.state.consentGiven)
   // console.log('isDirty:' + this.state.isDirty)
}

validateConsentForm(){
    return this.state.consentGiven || (!this.state.consentGiven  && (this.state.consentWithdrawFutureParticipation || this.state.consentWithdrawFutureParticipationRemoveData))
}

handleConsentWithdrawn(e){
    // console.log('consent WITHDRAWN Given: ' + e.target.checked);
    // console.log('consent WITHDRAWN Given: ' + e.target.defaultValue);
    // console.log('consent WITHDRAWN Given: ' + e.target.value);
    

    this.setState({
       consentGiven:false,
     consentGivenDate:null,
        isDirty:true,
        consentWithdrawFutureParticipation: e.target.value  == consentCtrls.consetWithdrawOptions[0].controlValueId ? e.target.value: null,
        consentWithdrawFutureParticipationRemoveData :e.target.value  == consentCtrls.consetWithdrawOptions[1].controlValueId ? e.target.value: null,
        consentWithdrawnDate:null
    })

//console.log('consentWithdrawFutureParticipation:' + this.state.consentWithdrawFutureParticipation)
//console.log('consentWithdrawFutureParticipationRemoveData:' + this.state.consentWithdrawFutureParticipationRemoveData)

}


// handleConsentWithdrawn(e){
//   //  this.props.handleConsentGiven(e.target.checked)
// }


closeConsentModal(){
    this.setState({
        consentModalOpen:false,
        isDirty:false,
        consentWithdrawFutureParticipation:null,
        consentWithdrawFutureParticipationRemoveData:null
    })  
}

afterOpenConsentModal(){
    var p = ''
    //use this to clear any error
}

renderConsentSuccess(consent){
    return (
        <div>
            <PanelConsentSuccess title="Consent Given On:" consentChange={this.handleConsentChange}>
                <div className="consent-container"><i className="fa fa-check-circle fa-30 fa-consent-success"  aria-hidden="true"></i><span className="consent-message">{handleDateTimeFormat(consent.consentGivenDate)}</span></div>
            </PanelConsentSuccess>
            <ModalDefault isOpen={this.state.consentModalOpen}  onRequestClose={this.closeConsentModal} onAfterOpen={this.afterOpenConsentModal} style={CONSENT} contentLabel={"Withdraw Consent"}>
            <div  className={classnames('panel',{'panel-primary': !this.state.isDirty,'panel-success':this.state.consentGiven && this.state.isDirty, 'panel-danger': !this.state.consentGiven && this.state.isDirty})}>
                <div className="panel-heading">
                    <button type="button" className="close" onClick={this.closeConsentModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    { consent.consentGiven ?
                    <h4>                        
                        Withdraw Consent </h4> : <h4>Give Consent</h4>
                    }
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
                                <div className="form-group row">
                                    <label className="col-md-10 col-sm-12 col-form-label">{consentCtrls.consetWithdrawOptions[1].description}</label>
                                    <div className="col-md-1 col-sm-12">
                                        <input type="radio" name="withdrawConsent" ref="optConsentWithdrawFutureParticipationRemoveData" id="optConsentWithdrawFutureParticipationRemoveData"
                                            value={consentCtrls.consetWithdrawOptions[1].controlValueId}
                                            checked={this.state.consentWithdrawFutureParticipationRemoveData == consentCtrls.consetWithdrawOptions[1].controlValueId}
                                            className="form-control" 
                                            onChange={this.handleConsentWithdrawn}/>
                                    </div>
                                </div>
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
                </div>
            </div>
            </ModalDefault>
        </div>
    )
}

renderConsentDanger(title, message){
    return (
        <PanelConsentRemove title={title} consentChange={this.handleConsentChange}>
            <div className="consent-container"><i className="fa fa-times-circle-o fa-30 fa-consent-danger"  aria-hidden="true"></i><span className="consent-message">{message}</span></div>
        </PanelConsentRemove>
    )
}

renderNoConsent(title){
    return (
        <PanelNoConsent title={title}>
             <div><i className="fa fa-ban fa-30 ban" aria-hidden="true"></i></div>
        </PanelNoConsent>
    )
}



renderConsent(consent){
  //  console.log('redraw');
    // console.log(this.props.consent.data.consentWithdrawFutureParticipation);
    // console.log(this.state.consentWithdrawFutureParticipation);
    // console.log(this.state.consentWithdrawnDate);
    // console.log(consentCtrls.consetWithdrawOptions[0].controlValueId);
                   {
                      if(consent.consentGiven && consent.consentGivenDate){ 
                          return  this.renderConsentSuccess(consent)
                      }
                      else if (consent.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[0].controlValueId && consent.consentWithdrawnDate != null ) { 
                            return this.renderConsentDanger("Consent Withdrawn On:", handleDateTimeFormat(consent.consentWithdrawnDate))
                        }
                        else 
                            return this.renderNoConsent("No Consent Found")
                        
                    }    
}
    


        
    render (){
        {
                  if(this.props.consent.requestRecieved){
                        return this.renderConsent(this.props.consent.data)
                    }
                    else {
                        return this.renderLoadingMessage()
                    }
        }
    }
}



 export default ConsentFormBk;
