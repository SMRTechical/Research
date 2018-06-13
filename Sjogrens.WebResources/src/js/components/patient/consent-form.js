import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import PanelConsentSuccess from '../../components/generic/panel-consent-success';
import PanelConsentSuccessBasic from '../../components/generic/panel-consent-success-basic';
import PanelConsentRemove from '../../components/generic/panel-consent-remove';
import PanelConsentRemoveDataRemove from '../../components/generic/panel-consent-remove-data-remove';
import PanelNoConsent from '../../components/generic/panel-no-consent';
import PanelQuestionConsent from '../../components/generic/panel-question-consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions'
import {paths} from '../../constants/paths/environment';
import ModalDefault from '../../components/generic/modal-default';
import {CONSENT} from '../../constants/styles/modal';
import {consentCtrls} from '../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import ConsentChangeModal from './consent-change-modal';
import AuditData2Col from '../../components/generic/audit-data-2-col';
import ReactTooltip from 'react-tooltip'

class ConsentForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.consent && this.props.consent.data ? this.props.consent.data.token :'',
            consentGiven: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGiven :false,
            consentGivenDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGivenDate :null,
            consentWithdrawFutureParticipation: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawFutureParticipation :null,
            consentWithdrawFutureParticipationRemoveData: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawFutureParticipationRemoveData :null,
            consentWithdrawnDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawnDate :null,
            createdUser: this.props.consent  ? this.props.consent.createdUser :null,
            createdDateTime: this.props.consent  ? this.props.consent.createdDateTime :'',
            lastUpdatedUser: this.props.consent  ? this.props.consent.lastUpdatedUser :'',
            lastUpdatedDateTime: this.props.consent  ? this.props.consent.lastUpdatedDateTime :'',

            consentModalOpen: false,
         //  isDirty:false
        };

        this.renderConsent = this.renderConsent.bind(this);
        this.renderLoadingMessage = this.renderLoadingMessage.bind(this);
        this.renderConsentSuccessBasic = this.renderConsentSuccessBasic.bind(this);
        this.renderConsentDangerBasic = this.renderConsentDangerBasic.bind(this);
        this.renderNoConsentBasic = this.renderNoConsentBasic.bind(this);
        this.renderQuestionConsentBasic = this.renderQuestionConsentBasic.bind(this);
        this.renderConsentSuccess = this.renderConsentSuccess.bind(this);
        this.renderConsentDanger = this.renderConsentDanger.bind(this);
        this.handleConsentChange = this.handleConsentChange.bind(this);    
        this.renderNoConsent = this.renderNoConsent.bind(this);
        this.renderQuestionConsent = this.renderQuestionConsent.bind(this);
        
        this.closeConsentModal = this.closeConsentModal.bind(this);
         this.afterOpenConsentModal = this.afterOpenConsentModal.bind(this);
        // this.handleConsentWithdrawn = this.handleConsentWithdrawn.bind(this);
        this.handleSaveConsent = this.handleSaveConsent.bind(this);  
        //this.handleConsentGiven = this.handleConsentGiven.bind(this);
        //this.validateConsentForm = this.validateConsentForm.bind(this);
    }




    handleSaveConsent(consentPostParams){

       //e.preventDefault();
        // var consentPostParams = {
        //     token:this.state.token,
        //     consentGiven: false,
        //     consentGivenDate: null,
        //     consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
        //     consentWithdrawFutureParticipationRemoveData : this.state.consentWithdrawFutureParticipationRemoveData
        // }

        //consentPostParams.token = this.state.token;

        this.setState({
            consentModalOpen:false,
            // consentWithdrawFutureParticipation: this.state.consentWithdrawFutureParticipation,
            // consentWithdrawFutureParticipationRemoveData: this.state.consentWithdrawFutureParticipationRemoveData
        })

//console.log('hi');
       // console.log( consentPostParams);
        this.props.handleSaveConsent(consentPostParams);

       }

    componentWillReceiveProps(nextProps){
      this.setState({
                consentGiven: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentGiven :false,
                consentGivenDate: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentGivenDate :null,
                ConsentWithdrawFutureParticipation: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawFutureParticipation :0,
                ConsentWithdrawFutureParticipationRemoveData: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawFutureParticipationRemoveData :0,
                consentWithdrawnDate: nextProps.consent && nextProps.consent.data ? nextProps.consent.data.consentWithdrawnDate :null,
                createdUser: nextProps.consent  ? nextProps.consent.createdUser :null,
                createdDateTime: nextProps.consent  ? nextProps.consent.createdDateTime :'',
                lastUpdatedUser: nextProps.consent  ? nextProps.consent.lastUpdatedUser :'',
                lastUpdatedDateTime: nextProps.consent  ? nextProps.consent.lastUpdatedDateTime :'',
        })
      }

    componentDidMount () {
            this.setState({
                consentGiven: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGiven :false,
                consentGivenDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentGivenDate :null,
                ConsentWithdrawFutureParticipation: this.props.consent && this.props.consent.data ? this.props.consent.data.ConsentWithdrawFutureParticipation :0,
                ConsentWithdrawFutureParticipationRemoveData: this.props.consent && this.props.consent.data ? this.props.consent.data.ConsentWithdrawFutureParticipationRemoveData :0,
                consentWithdrawnDate: this.props.consent && this.props.consent.data ? this.props.consent.data.consentWithdrawnDate :null,
                createdUser: this.props.consent  ? this.props.consent.createdUser :null,
                createdDateTime: this.props.consent  ? this.props.consent.createdDateTime :'',
                lastUpdatedUser: this.props.consent  ? this.props.consent.lastUpdatedUser :'',
                lastUpdatedDateTime: this.props.consent  ? this.props.consent.lastUpdatedDateTime :'',
            });
       }

  

renderLoadingMessage(){
    return (
        <PanelDefault title={"...Loading Consent"}>
       {/* <div><img src={paths.loader} alt="...Loading Consent"/></div> */}
        </PanelDefault>
    )
}
   
handleConsentChange(){
this.setState({
    consentModalOpen:true
})
}






closeConsentModal(){
    this.setState({
        consentModalOpen:false
    })  
}


afterOpenConsentModal(){
     var p = ''
     //use this to clear any error
    // this.props.afterOpenConsentModal();
 }
 


 renderConsentSuccessBasic(consent){
    return (
        <div>


<div className="panel panel-success panel-consent" onClick={() => this.handleConsentChange()}>
            <div className="panel-heading text-left">
                <h3 className="panel-title"><i className="fa fa-check-circle fa-2 mr-10" aria-hidden="true"></i>Consent given on:&nbsp;{handleDateTimeFormat(consent.consentGivenDate)}</h3>
                
               
            </div>
         </div>

        
            <ConsentChangeModal consent={consent} 
                                consentModalOpen={this.state.consentModalOpen}  
                                closeConsentModal={this.closeConsentModal} 
                                onAfterOpen={this.afterOpenConsentModal} 
                                contentLabel={"Consent Options"} 
                                handleSaveConsent = {this.handleSaveConsent}/>
           
        </div>
    )
}

renderConsentSuccess(consent){
    return (
        <div>
            <PanelConsentSuccess title={"Consent Given On:"} consentChange={this.handleConsentChange}>
                <div className="consent-container"><i className="fa fa-check-circle fa-14 fa-consent-success"  aria-hidden="true"></i><span className="consent-message">{handleDateTimeFormat(consent.consentGivenDate)}</span></div>
                <a data-tip="React-tooltip" data-for="consent-tooltip"> <i className="fa fa-history" aria-hidden="true"></i></a>
                <ReactTooltip id='consent-tooltip' place="left" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                                <AuditData2Col createdBy={consent.createdUser} createdDate={consent.createdDateTime}  lastUpdatedBy={consent.lastUpdatedUser} lastUpdatedDate={consent.lastUpdatedDateTime}/>
                </ReactTooltip>           
            </PanelConsentSuccess>
            <ConsentChangeModal consent={consent} 
                                consentModalOpen={this.state.consentModalOpen}  
                                closeConsentModal={this.closeConsentModal} 
                                onAfterOpen={this.afterOpenConsentModal} 
                                contentLabel={"Consent Options"} 
                                handleSaveConsent = {this.handleSaveConsent}/>
           
        </div>
    )
}


renderConsentDangerBasic(consent){
    return (
        <div>

<div className="panel panel-danger panel-consent"  onClick={() => this.handleConsentChange()}>
                    <div className="panel-heading text-left">
                        <h3 className="panel-title"><i className="fa fa-exclamation-triangle fa-2 mr-10" aria-hidden="true"></i>Consent withdrawn on:&nbsp;{handleDateTimeFormat(consent.consentWithdrawnDate)}</h3>

                    </div>
                </div>
            <ConsentChangeModal consent={consent} 
                                consentModalOpen={this.state.consentModalOpen}  
                                closeConsentModal={this.closeConsentModal} 
                                onAfterOpen={this.afterOpenConsentModal} 
                                contentLabel={"Consent Options"} 
                                handleSaveConsent = {this.handleSaveConsent}/>


       
      
         </div>
    )
}

renderConsentDanger(consent){
    return (
        <div>
        <PanelConsentRemove title={"Consent Withdrawn On:"} consentChange={this.handleConsentChange}>
            <div className="consent-container"><i className="fa fa-times-circle-o fa-14 fa-consent-danger"  aria-hidden="true"></i><span className="consent-message">{handleDateTimeFormat(consent.consentWithdrawnDate)}</span></div>
            <a data-tip="React-tooltip" data-for="consent-tooltip"> <i className="fa fa-history" aria-hidden="true"></i></a>
            <ReactTooltip id='consent-tooltip' place="left" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                            <AuditData2Col createdBy={consent.createdUser} createdDate={consent.createdDateTime}  lastUpdatedBy={consent.lastUpdatedUser} lastUpdatedDate={consent.lastUpdatedDateTime}/>
            </ReactTooltip>   
        </PanelConsentRemove>
         <ConsentChangeModal consent={consent} 
                            consentModalOpen={this.state.consentModalOpen}  
                            closeConsentModal={this.closeConsentModal} 
                            onAfterOpen={this.afterOpenConsentModal} 
                            contentLabel={"Consent Options"} 
                            handleSaveConsent = {this.handleSaveConsent}/>
         </div>
    )
}



renderConsentRemovedDataBasic(consent){
    return (
        <div>

<div className="panel panel-danger panel-consent"  onClick={() => this.handleConsentChange()}>
                    <div className="panel-heading text-left">
                        <h3 className="panel-title"><i className="fa fa-times-circle-o fa-2 mr-10" aria-hidden="true"></i>{handleDateTimeFormat(consent.consentWithdrawnDate)}</h3>
                          
                    </div>
                </div>
            <ConsentChangeModal consent={consent} 
                                consentModalOpen={this.state.consentModalOpen}  
                                closeConsentModal={this.closeConsentModal} 
                                onAfterOpen={this.afterOpenConsentModal} 
                                contentLabel={"Consent Options"} 
                                handleSaveConsent = {this.handleSaveConsent}/>


       
      
         </div>
    )
}

renderConsentRemovedData(consent){
    return (
        <div>
        <PanelConsentRemoveDataRemove title={"Consent Withdrawn On:"} consentChange={this.handleConsentChange}>
            <div className="consent-container"><i className="fa fa-trash-o fa-14 fa-consent-danger"  aria-hidden="true"></i><span className="consent-message">{handleDateTimeFormat(consent.consentWithdrawnDate)}<br /> Data removed</span></div>
            <a data-tip="React-tooltip" data-for="consent-tooltip"> <i className="fa fa-history" aria-hidden="true"></i></a>
            <ReactTooltip id='consent-tooltip' place="left" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                            <AuditData2Col createdBy={consent.createdUser} createdDate={consent.createdDateTime}  lastUpdatedBy={consent.lastUpdatedUser} lastUpdatedDate={consent.lastUpdatedDateTime}/>
            </ReactTooltip>   
        </PanelConsentRemoveDataRemove>
         <ConsentChangeModal consent={consent} 
                            consentModalOpen={this.state.consentModalOpen}  
                            closeConsentModal={this.closeConsentModal} 
                            onAfterOpen={this.afterOpenConsentModal} 
                            contentLabel={"Consent Options"} 
                            handleSaveConsent = {this.handleSaveConsent}/>
         </div>
    )
}


renderNoConsentBasic(consent){
    return (
        <div>
        <div className="panel panel-danger panel-consent"  onClick={() => this.handleConsentChange()}>
        <div className="panel-heading text-left">
            <h3 className="panel-title">
            <i className="fa fa-ban fa-2 mr-10" aria-hidden="true"></i>No Consent Exists</h3>
        </div>
    </div>
    <ConsentChangeModal consent={consent} 
                            consentModalOpen={this.state.consentModalOpen}  
                            closeConsentModal={this.closeConsentModal} 
                            onAfterOpen={this.afterOpenConsentModal} 
                            contentLabel={"Consent"} 
                            handleSaveConsent = {this.handleSaveConsent}/>
    </div>
    )
}

renderNoConsent(consent){
    return (
        <div>
        <PanelNoConsent title="No Consent Exists" consentChange={this.handleConsentChange}>
             <div><i className="fa fa-ban fa-16 ban" aria-hidden="true"></i></div>
        </PanelNoConsent>
        <ConsentChangeModal consent={consent} 
                            consentModalOpen={this.state.consentModalOpen}  
                            closeConsentModal={this.closeConsentModal} 
                            onAfterOpen={this.afterOpenConsentModal} 
                            contentLabel={"Consent"} 
                            handleSaveConsent = {this.handleSaveConsent}/>
        </div>
    )
}




renderQuestionConsentBasic(consent){
    return (
        <div>

<div className="panel panel-danger panel-consent" onClick={() => this.handleConsentChange()}>
            <div className="panel-heading text-left">
                <h3 className="panel-title">
                <i className="fa fa-question fa-2 mr-10" aria-hidden="true"></i>{this.props.title}</h3>
            </div>
           
        </div>

      
         <ConsentChangeModal consent={consent} 
         consentModalOpen={this.state.consentModalOpen}  
         closeConsentModal={this.closeConsentModal} 
         onAfterOpen={this.afterOpenConsentModal} 
         contentLabel={"Consent"} 
         handleSaveConsent = {this.handleSaveConsent}/>
        </div>
    )
}

renderQuestionConsent(consent){
    return (
        <div>
        <PanelQuestionConsent title="Consent Unknown" consentChange={this.handleConsentChange}>
             <div><i className="fa fa-question fa-16 ban" aria-hidden="true"></i></div>
        </PanelQuestionConsent>
         <ConsentChangeModal consent={consent} 
         consentModalOpen={this.state.consentModalOpen}  
         closeConsentModal={this.closeConsentModal} 
         onAfterOpen={this.afterOpenConsentModal} 
         contentLabel={"Consent"} 
         handleSaveConsent = {this.handleSaveConsent}/>
        </div>
    )
}


renderConsent(consent){
    //console.log(consent);
   
                   {
                       if (consent) {
                            if(consent.consentGiven && consent.consentGivenDate != null){ 
                                return  this.renderConsentSuccessBasic(consent)
                            }
                            else if (consent.consentWithdrawFutureParticipation == consentCtrls.consetWithdrawOptions[0].controlValueId && consent.consentWithdrawnDate != null ) { 
                                    return this.renderConsentDangerBasic(consent)
                                }
                                else if (consent.consentWithdrawFutureParticipationRemoveData == consentCtrls.consetWithdrawOptions[1].controlValueId && consent.consentWithdrawnDate != null ) { 
                                    return this.renderConsentRemovedDataBasic(consent)
                                }
                                else 
                                    return this.renderQuestionConsentBasic(consent)
                        
                    }
                    else 
                     return this.renderNoConsentBasic(consent)
                       // return this.renderLoadingMessage()    
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



 export default ConsentForm;
