import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Redirect } from 'react-router-dom';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import AlertSuccess from '../../components/generic/alert-success';
import AlertDanger from '../../components/generic/alert-danger';
import {getPatientBaseline,patientBaselineClear,savePatientBaseline,getSavedPatientBaseline} from '../../actions/baseline';
import {getPatientState,patientStateClear} from '../../actions/patient-state';
import { getVisitControlValues, visitControlValuesClear} from '../../actions/visit-control-values';
import {visitCategoriesClear,getVisitCategories } from '../../actions/visit-categories'
import {visitHeaderClear,getVisitHeader} from '../../actions/visit-header';
import {getVisitHeaders} from '../../actions/visit-headers';
import {visitClear, getVisit} from '../../actions/visit'; 

import PatientBaselineForm from '../../components/patient/patient-baseline-form';
import {ALERTS} from '../../constants/information/messages';
import DatePicker from 'react-datepicker';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import NewAttendanceModal from '../../components/visit/modals/new-attendance-modal'; 
import {paths} from '../../constants/paths/environment';
import {CATEGORY_BASE} from '../../constants/paths/first-category';

class PatientBaseline extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patientBaselineGlobalError:'',
            patientBaselinePostParams:null,
            patientBaselineSaved:null,
            isNewAttendanceModelOpen:false,
            token:null
        };
        this.getPatientBaseline = this.getPatientBaseline.bind(this);
       this.handleGetPatientBaselineGlobalError = this.handleGetPatientBaselineGlobalError.bind(this);
       this.handleSavePatientBaseline = this.handleSavePatientBaseline.bind(this);
       this.saveMessage = this.saveMessage.bind(this);
       this.errorMessage = this.errorMessage.bind(this);
       this.attendanceModalClose = this.attendanceModalClose.bind(this);
       this.addNewAttendance = this.addNewAttendance.bind(this);
       this.confirmAttendanceDate = this.confirmAttendanceDate.bind(this);

       this.getVisitData = this.getVisitData.bind(this);

       this.redirectToFollowUp = this.redirectToFollowUp.bind(this);
    }

    addNewAttendance(){

        console.log('addNewAttendance')

         this.setState({
           isNewAttendanceModelOpen:this.props.patientStateResult && 
                                    this.props.patientStateResult.data && 
                                    this.props.patientStateResult.data.hasVisits ? false :true,
         })
     }

    attendanceModalClose(){
        this.setState({
            isNewAttendanceModelOpen:false
        })
    }

    confirmAttendanceDate(date, initialVisit, newVisit, visitHeaderId){

        var visitHeaderParams = {
                     token: this.props.match.params.token,
                     dateOfVisit:  date.format("YYYY-MM-DD"),
        }
         if (!initialVisit && newVisit){
           console.log('!initialVisit && newVisit start')
            // console.log(visitHeaderParams)
            // console.log(visitHeaderId)
             this.props.getVisitHeader(visitHeaderParams)
             .then(vh=>this.getVisit(vh,visitHeaderId, newVisit))
             .catch(this.handleGetVisitHeaderGlobalError)
            console.log('!initialVisit && newVisit end')
        }
         else {
        this.props.getVisitHeader(visitHeaderParams).catch(this.handleGetVisitHeaderGlobalError)
         }
         
         this.setState({
             isNewAttendanceModelOpen:false,
             redirectToVisit:true,
             initialVisit:initialVisit, newVisit:newVisit
         })
    } 



    
    getVisit(visitHeader, visitHeaderId, newVisit){
       
          var visitGetParams = {
              visitHeaderId:  visitHeaderId,
              token: visitHeader.token,
              newVisit:newVisit,
              dateOfVisit: visitHeader.dateOfVisit
          }
        
          var visitHeaderParams = {
              token: visitHeader.token,
              dateOfVisit:  visitHeader.dateOfVisit
              }


this.props.getVisit(visitGetParams)
.then(v=>this.getVisitData(v,newVisit,visitHeader))
      }



      getVisitData(v, newVisit,visitHeader){
       // console.log('visit123 START');
   // console.log(v);
   // console.log('visit123 END');
    
    var visitHeaderParams = {
        token: visitHeader.token,
        dateOfVisit:  v.dateOfVisit,
        visitId: v.visitId
        }
    
        var visitCategoriesGetParams = {
            visitHeaderId:  v.visitHeaderId,
            token: v.token,
            newVisit:newVisit
        }
    
        var visitKeyValueGetParams = {
            visitHeaderId: v.visitHeaderId,
            categoryId:5,
            sectionId: 1,
            token: v.token
        }
    
        var visitControlValueGetParams = {
            visitHeaderId: v.visitHeaderId,
            token: v.token
        }
    
    
            
        this.props.getVisitHeader(visitHeaderParams)
        //.then(v=>this.props.getVisitCategories(visitCategoriesGetParams))
        .then(vh=>this.redirectToFollowUp(vh))
    //.then(vc=>this.props.getVisitControlValues(visitControlValueGetParams))
    
    
    
    
    }




    redirectToFollowUp(vh){
       console.log('redirect To FollowUp')
       // console.log('sajid start')
       // console.log(this.props.visitHeaderResult)
       // console.log('sajid end')
        
        
        var visitCategoriesGetParams = {
            visitHeaderId:  vh.visitHeaderId,
            token: vh.token,
            newVisit:false
        }
        
        
        var visitHeadersGetParams = {
            token: vh.token}
                      
        
        
        
        
        this.props.getVisitCategories(visitCategoriesGetParams)
        .then (svh => this.props.getVisitHeaders(visitHeadersGetParams))
        .then(vc=>(this.setState({
            redirectToVisit:true, 
            initialVisit:this.props.visitHeaderResult.data.initialVisit, 
            newVisit:this.props.visitHeaderResult.data.newVisit
        })))
           
        }

        

    componentDidMount () {
        this.props.visitClear();        
        this.props.visitHeaderClear();
        this.props.visitCategoriesClear();
        this.props.patientBaselineClear(); 
        
        if(this.props.match.params.token){
                this.getPatientBaseline(this.props.match.params.token);
            }
    }

    componentWillUnmount(){
        this.props.patientBaselineClear(); 
    }

       
    handleGetPatientBaselineGlobalError(error){        
        this.setState({
            patientBaselineGlobalError:error.message,
        })

        this.errorMessage();
    }

    getPatientBaseline(token){    
        var patientBaselineGetParams = {
                token: token
        }
            
 
        this.props.getPatientBaseline(patientBaselineGetParams)
        .catch(this.handleGetPatientBaselineGlobalError)
    }


    handleSavePatientBaseline(token,patientBaseline){
        //Console.log('handleSavePatientBaseline');

            var patientBaselinePostParams = {
                token: token,
                patientBaseline: patientBaseline
            }
           
            var patientStateGetParams = {
                token: token
            }

           if (this.props.patientStateResult && this.props.patientStateResult.data && this.props.patientStateResult.data.baselineExists) {
               
                this.props.savePatientBaseline(patientBaselinePostParams)
                .then(a=>this.props.getSavedPatientBaseline(patientBaselinePostParams))
                .then(b=> this.props.getPatientState(patientStateGetParams))
                .then(s=> this.saveMessage())
                .catch(this.handleGetPatientBaselineGlobalError)
            }
            else {
                this.props.savePatientBaseline(patientBaselinePostParams)
                .then(a=>this.props.getSavedPatientBaseline(patientBaselinePostParams))
                .then(b=> this.props.getPatientState(patientStateGetParams))
                .then(s=> this.saveMessage())
                .then(a=> this.addNewAttendance())
                .catch(this.handleGetPatientBaselineGlobalError)
            }
        }


        saveMessage(){
            NotificationManager.success( ALERTS.baselineSaveSuccess.message, ALERTS.baselineSaveSuccess.heading,2000);
        }
        
        errorMessage (){
            NotificationManager.error( this.state.patientBaselineGlobalError, ALERTS.baselineSaveError.heading,5000);
        }

    render (){
        {

            if (this.props.visitHeaderResult &&
                this.props.visitHeaderResult.requestRecieved && 
                this.props.visitHeaderResult.data && this.props.visitHeaderResult.data.token && 
                (this.props.visitHeaderResult.data.initialVisit || (!this.props.visitHeaderResult.data.newVisit &&  !!this.props.visitHeaderResult.data.visitHeaderId)  ) &&
               // this.props.visitHeaderResult.data.visitHeaderId == 0 && 
                !this.props.visitHeaderResult.data.isDuplicate && !this.props.visitHeaderResult.data.isInvalid &&
                this.state.redirectToVisit )  
            return (<Redirect to={{
                pathname: paths.visitLink + this.props.visitHeaderResult.data.token + CATEGORY_BASE,
                state: {visitHeaderResult :this.props.visitHeaderResult.data}
            }}/>)
else {
            return (
            <div>



            <div className={classnames('',{loading:this.props.patientBaselineResult.sendingRequest && !this.props.patientBaselineResult.requestRecieved  })}></div>
               

            <PatientBaselineForm 
                    patientDetails={this.props.patientDetailsResult} 
                    patientBaseline={this.props.patientBaselineResult} 
                    handleSavePatientBaseline={this.handleSavePatientBaseline}
                    />

            <NewAttendanceModal  
                    isAttendanceModalOpen={this.state.isNewAttendanceModelOpen} 
                    attendanceModalClose={this.attendanceModalClose}
                    confirmAttendanceDate={this.confirmAttendanceDate}
                    token={this.props.match.params.token}
                    contentLabel={"Options"} />

            <NotificationContainer/>
                    </div>
                    )
                }
        }
    }
}

function mapStateToProps(state) {
    return {
        patientBaselineResult: state.patientBaselineResult,
        patientDetailsResult: state.patientDetailsResult,
        patientStateResult: state.patientStateResult,
        visitHeaderResult : state.visitHeaderResult,
        visitCategoriesResult : state.visitCategoriesResult,
        visitControlValuesResult : state.visitControlValuesResult,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getPatientBaseline: getPatientBaseline,
                                patientBaselineClear:patientBaselineClear,
                                savePatientBaseline:savePatientBaseline,
                                getSavedPatientBaseline:getSavedPatientBaseline, 
                                getPatientState:getPatientState,
                                patientStateClear:patientStateClear,
                                getVisitHeader:getVisitHeader,
                                getVisitHeaders: getVisitHeaders,
                                visitCategoriesClear:visitCategoriesClear,
                                visitHeaderClear:visitHeaderClear,
                                getVisit: getVisit,
                                visitClear:visitClear,
                                getVisitControlValues:getVisitControlValues, 
                                getVisitCategories: getVisitCategories
                            }, dispatch);
}




 export default connect(mapStateToProps,matchDispatchToProps)(PatientBaseline);
