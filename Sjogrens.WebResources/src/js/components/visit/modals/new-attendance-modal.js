import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, Route } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../../components/generic/panel-default';
import PanelConsentSuccess from '../../../components/generic/panel-consent-success';
import PanelConsentRemove from '../../../components/generic/panel-consent-remove';
import PanelNoConsent from '../../../components/generic/panel-no-consent';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../../factory/date-functions'
import {paths} from '../../../constants/paths/environment';
import ModalDefault from '../../../components/generic/modal-default';
import {OCULARSIGNSOBJECTIVE} from '../../../constants/styles/modal';
import {NEWATTENDANCE} from '../../../constants/styles/modal';
import {consentCtrls} from '../../../config/controls/consent';
import moment from 'moment';
import classnames from 'classnames';
import InputGroupAddOnLR from '../../../components/generic/input/input-group-add-on-lr';
import InputGroupAddOnR from '../../../components/generic/input/input-group-add-on-r';
// import {isAlpha, isAlphanumericSpace, isAlphanumeric,  validYear, digitsOnly2DecimalPlaces} from '../../../Factory/reg-ex';
// import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {isAlpha, isAlphanumericSpace, isAlphanumeric, digitsOnly, validYear, digitsOnly2DecimalPlaces,twoDigitsOnly2DecimalPlaces,isNumericPeriod} from '../../../Factory/reg-ex';
import {digitsRange,digitsLessThan, salivaryFlowRate} from '../../../Factory/calculations';
import {ocularSymptoms,oralSymptoms,ocularSignsObjective, objectiveEvidence, histopathology, autoAntibodies} from '../../../config/controls/american-european-cgc';
import {AECGC} from '../../../constants/styles/input';
import ReactTooltip from 'react-tooltip';
import {AECGCValidationMessages} from '../../../constants/information/messages';
import {AECGCFields} from '../../../constants/information/field-length'; 
import {trim, left, right} from 'trim';
import {ocularSignsObjectiveValidation, objectiveEvidenceValidation, meetsAECGCCriteria, maxLengthCheck,addZeroes} from '../../../components/visit/modules/functions';

import {getNewAttendanceHeader, newAttendanceHeaderClear,getVisitHeader, visitHeaderClear} from '../../../actions/visit-header';
import InfiniteCalendar from 'react-infinite-calendar';
import {ALERTS} from '../../../constants/information/messages';
import AlertDanger from '../../../components/generic/alert-danger';

const locale = {
    headerFormat: 'ddd, Mo MMM YYYY',
  };

class NewAttendanceModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            today: moment(),
             maxDate: moment(),
             minDate: moment().subtract(1, 'year'),
            attendanceDate:null,
            init:true,

            visitHeaderId: this.props.visitHeaderResult && this.props.visitHeaderResult.data && !!this.props.visitHeaderResult.data.visitHeaderId ? 
                            this.props.visitHeaderResult.data.visitHeaderId:
                            this.props.visitHeadersResult && this.props.visitHeadersResult.data && this.props.visitHeadersResult.data.length > 0 && 
                            this.props.visitHeadersResult.data[0] ? 
                            this.props.visitHeadersResult.data[0].visitHeaderId:null,
            completed: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.completed:null,
            newVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.newVisit:null,
            initialVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.initialVisit:null,
            dateOfVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.dateOfVisit:null,
            token:this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.token:null,

            visitId: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.visitId:null,
          

        };

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.handleAttendanceModalClose = this.handleAttendanceModalClose.bind(this);
        this.handleConfirmAttendanceDate = this.handleConfirmAttendanceDate.bind(this);
        this.getNewAttendanceHeader = this.getNewAttendanceHeader.bind(this);
        this.handleAddNewVisit = this.handleAddNewVisit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }




    componentDidMount () {
        //console.log('new attendance modeal did mount')
        this.setState({
           // visitHeaderId: this.props.visitHeaderResult && this.props.visitHeaderResult.data ? this.props.visitHeaderResult.data.visitHeaderId:null,
           
           visitHeaderId: this.props.visitHeaderResult && this.props.visitHeaderResult.data && !!this.props.visitHeaderResult.data.visitHeaderId ? 
                            this.props.visitHeaderResult.data.visitHeaderId:
                            this.props.visitHeadersResult && this.props.visitHeadersResult.data && this.props.visitHeadersResult.data.length > 0 && 
                            this.props.visitHeadersResult.data[0] ? 
                            this.props.visitHeadersResult.data[0].visitHeaderId:null,
           completed: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.completed:null,
            newVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.newVisit:null,
            initialVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.initialVisit:null,
            dateOfVisit: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.dateOfVisit:null,
            token:this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.token:null,
          
            visitId: this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.data ? this.props.newAttendanceHeaderResult.data.visitId:null,
            
        })}


        componentWillReceiveProps(nextProps){
          //  console.log('new attendance modeal did receive next props')
                  this.setState({

                  //  visitHeaderId: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data ? nextProps.visitHeaderResult.data.visitHeaderId:null,
                  
                  visitHeaderId: nextProps.visitHeaderResult && nextProps.visitHeaderResult.data && !!nextProps.visitHeaderResult.data.visitHeaderId ? 
                                    nextProps.visitHeaderResult.data.visitHeaderId:
                                    nextProps.visitHeadersResult && nextProps.visitHeadersResult.data && nextProps.visitHeadersResult.data.length > 0 && 
                                    nextProps.visitHeadersResult.data[0] ? 
                                    nextProps.visitHeadersResult.data[0].visitHeaderId:null,
                  
                  
                  completed: nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.completed:null,
                    newVisit: nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.newVisit:null,
                    initialVisit: nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.initialVisit:null,
                    dateOfVisit: nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.dateOfVisit:null,
                    token:nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.token:null,                 
                    visitId: nextProps.newAttendanceHeaderResult && nextProps.newAttendanceHeaderResult.data ? nextProps.newAttendanceHeaderResult.data.visitId:null,
                    
                  })}

    afterOpenModal(){
        // var p = ''
         //use this to clear any error
        // this.props.afterOpenConsentModal();
     }
     

handleAttendanceModalClose(){
    this.props.newAttendanceHeaderClear();
        this.props.attendanceModalClose();
}




handleConfirmAttendanceDate(){
// console.log('this.state.attendanceDate');
// console.log(this.state.attendanceDate);
    this.props.newAttendanceHeaderClear();

  if (!this.state.attendanceDate || this.state.attendanceDate == undefined)
    {

//       console.log('today datye is selected--------------------------------------')
// console.log(this.state.initialVisit);
// console.log(this.state.newVisit);
// console.log(this.state.completed);
// console.log(this.props.token);
// console.log(this.state.visitId);
// console.log(this.state.visitHeaderId);

        var visitHeaderParams = {
            token: this.props.token,
            dateOfVisit:  this.state.today.format("YYYY-MM-DD")
        }
  
  
        this.props.getNewAttendanceHeader(visitHeaderParams)
        .then(vh=>this.handleRedirect(vh,this.state.today))
        .catch(this.handleGetVisitHeaderGlobalError)
  
    }
  else{
    //  console.log(' attendance date is selected **************************************')
    //  console.log(this.state.initialVisit);
    //  console.log(this.state.newVisit);
    //  console.log(this.state.completed);
    //  console.log(this.state.visitId);
    //  console.log(this.state.visitHeaderId);
      
    var momentDate   = moment(this.state.attendanceDate, 'YYYY-MM-DD', true);
  this.props.confirmAttendanceDate(momentDate, this.state.initialVisit, this.state.newVisit, this.state.visitHeaderId);
  }
    }

handleRedirect(visitHeader,attDate){

//console.log('handleRedirect new-attendance-modal')
//console.log(visitHeader)

this.setState({
    initialVisit:visitHeader.initialVisit,
    newVisit:visitHeader.newVisit,
    visitHeaderId: visitHeader.visitHeaderId
})

    //console.log('handling redirectxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    //console.log(visitHeader);
    if (visitHeader.isDuplicate || visitHeader.isInvalid){
    }
    else {
        this.props.newAttendanceHeaderClear();
        var momentDate   = moment(attDate, 'YYYY-MM-DD', true);
        var visitHeaderParams = {
            token: this.props.token,
            dateOfVisit:  momentDate
        }

    this.props.confirmAttendanceDate(momentDate, this.state.initialVisit, this.state.newVisit, this.state.visitHeaderId)

    }
}


handleAddNewVisit(date) {
//console.log('handleAddNewVisit')
    this.props.visitHeaderClear
    this.setState({
        attendanceDate:date,
    })
    this.getNewAttendanceHeader(date);


   
  }

getNewAttendanceHeader(attDate){
    
    var momentDate   = moment(attDate, "YYYY-MM-DD", true);
      var visitHeaderParams = {
          token: this.props.token,
          dateOfVisit:  momentDate.format("YYYY-MM-DD")
      }

    
      this.props.getNewAttendanceHeader(visitHeaderParams).catch(this.handleGetVisitHeaderGlobalError)
  }


render (){
    return(
       
<ModalDefault isOpen={this.props.isAttendanceModalOpen}  style={NEWATTENDANCE} contentLabel={this.props.contentLabel}>
                {/* <div  className={classnames('panel panel-primary',{'panel-success': this.props.visitHeaderResult.requestRecieved && this.props.visitHeaderResult.data && this.props.visitHeaderResult.data.isDuplicate,'panel-danger': this.props.visitHeaderResult.requestRecieved && this.props.visitHeaderResult.data && !this.props.visitHeaderResult.data.isDuplicate})}>
                   */}
                  
                   <div  className="panel panel-primary">
                    <div className="panel-heading">
                    <button type="button" className="close" onClick={this.handleAttendanceModalClose}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4>Date of Visit</h4>
                    
                </div>
                <div className="panel-body">
                     <form className="form" role="form">

                     {
                    (this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.requestRecieved && this.props.newAttendanceHeaderResult.data && this.props.newAttendanceHeaderResult.data.isDuplicate ) && 
                                            <AlertDanger dismissable={false} heading={ALERTS.visitHeaderDuplicate.heading} message={ALERTS.visitHeaderDuplicate.message }/>  
                                    }
                                    {
                    (this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.requestRecieved && this.props.newAttendanceHeaderResult.data && this.props.newAttendanceHeaderResult.data.isInvalid ) && 
                                            <AlertDanger dismissable={false} heading={ALERTS.visitHeaderInvalid.heading} message={ALERTS.visitHeaderInvalid.message }/>  
                                    }
                     


                     <div className="form-group row">
                     <div className="col-md-12">
                    <InfiniteCalendar
                    displayOptions={{
                        layout: 'portrait',
                        showOverlay: false,
                        shouldHeaderAnimate: false
                    }}
                        width={400}
                        height={300}
                        max={new Date(this.state.maxDate)}
                        min={new Date(this.state.minDate)}
                        maxDate={new Date(this.state.maxDate)}
                        minDate={new Date(this.state.minDate)}
                        layout='landscape'
                        onSelect={this.handleAddNewVisit}
                        overscanMonthCount={4}
                    />
                    </div>


</div>


                     </form>
                </div>
                <div className="panel-footer">
                <button id="newAttendanceCancel"  
                    type="button" className="btn btn-warning mr-3"
                    onClick={this.handleAttendanceModalClose}>
                    <i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel
                    </button>
                   

                    {/* <button id="newAttendanceConfirm" disabled={
                                                this.props.newAttendanceHeaderResult && ( this.props.newAttendanceHeaderResult.status == "" ||  this.props.newAttendanceHeaderResult.status == "Pending") ||
                                                this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.requestRecieved && this.props.newAttendanceHeaderResult.data && (this.props.newAttendanceHeaderResult.data.isDuplicate || this.props.newAttendanceHeaderResult.data.isInvalid)}
                         type="button" 
            onClick={this.handleConfirmAttendanceDate}

            className="btn btn-success"><i className="fa fa-check" aria-hidden="true"></i>&nbsp;Confirm
            </button> */}


            <button id="newAttendanceConfirm" disabled={this.props.newAttendanceHeaderResult && this.props.newAttendanceHeaderResult.requestRecieved && this.props.newAttendanceHeaderResult.data && (this.props.newAttendanceHeaderResult.data.isDuplicate || this.props.newAttendanceHeaderResult.data.isInvalid)}
                         type="button" 
            onClick={this.handleConfirmAttendanceDate}

            className="btn btn-success"><i className="fa fa-check" aria-hidden="true"></i>&nbsp;Confirm
            </button>

                </div>
            </div>
            </ModalDefault>

                )
    }
}



// export default NewAttendanceModal;



function mapStateToProps(state) {
   
    return {
        newAttendanceHeaderResult : state.newAttendanceHeaderResult,
        visitHeaderResult : state.visitHeaderResult,
        visitHeadersResult : state.visitHeadersResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getNewAttendanceHeader:getNewAttendanceHeader,newAttendanceHeaderClear:newAttendanceHeaderClear,getVisitHeader:getVisitHeader, visitHeaderClear:visitHeaderClear}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps)(NewAttendanceModal);