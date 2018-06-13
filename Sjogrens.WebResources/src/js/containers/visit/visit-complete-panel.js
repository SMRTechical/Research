import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside'
import {NavLink, Link, Route, Switch,Redirect } from 'react-router-dom';
import ModalDefault from '../../components/generic/modal-default';
import PanelDanger from '../../components/generic/panel-danger';
import PanelSuccess from '../../components/generic/panel-success';
import AlertSuccess from '../../components/generic/alert-success';
import AlertDanger from '../../components/generic/alert-danger';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import VisitCategories from './visit-categories';
//import {isVisitHeaderDuplicate,visitHeaderDuplicateClear} from '../../actions/visit-header-duplicate';
import {getVisitCategories, visitCategoriesClear} from '../../actions/visit-categories';
import {getVisitHeader, visitHeaderClear, saveVisitHeader,getSavedVisitHeader} from '../../actions/visit-header';
import {getVisitHeaders} from '../../actions/visit-headers';
import {saveVisit, getVisit, getSavedVisit,visitClear} from '../../actions/visit';
import {ALERTS} from '../../constants/information/messages';
import {paths} from '../../constants/paths/environment';
import {CATEGORY_BASE} from '../../constants/paths/first-category';
import {getPatientState,patientStateClear} from '../../actions/patient-state';
import {VISITCOMPLETE} from '../../constants/styles/modal';
import {Spinner} from 'belle';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat,handleUTCDateTimeFormat} from '../../factory/date-functions';
import CompletedData from '../../components/generic/completed-data';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class VisitCompletePanel extends React.Component{
    constructor(props) {
        super(props);   
        this.state = {
            token: null,
            visitHeaderId:null,
            completed:null,
            newVisit:null,
            dateOfVisit:null,
            initialVisit:null,
            cdeaId:null,
            visitId:null,
            visitCompleteGlobalError:'',
            visitHeaderPostParams:null,
            initialLoad:true,
            visitCompleteModalOpen: false,
            visitCompletedSaved:false
        };
        
        this.renderCompleteButton = this.renderCompleteButton.bind(this);
        this.renderCompletingButton = this.renderCompletingButton.bind(this);
        this.renderVisitSuccess= this.renderVisitSuccess.bind(this);
        this.renderVisitDanger = this.renderVisitDanger.bind(this);

        this.closeVisitCompleteModal = this.closeVisitCompleteModal.bind(this);
        this.afterOpenVisitCompleteModal = this.afterOpenVisitCompleteModal.bind(this);
        this.openVisitCompleteModal = this.openVisitCompleteModal.bind(this);
        this.handleSaveVisitComplete = this.handleSaveVisitComplete.bind(this);
        this.renderCompletedData = this.renderCompletedData.bind(this);

        this.saveMessage = this.saveMessage.bind(this);
        this.errorMessage  = this.errorMessage .bind(this);
        
    }


    handleGetVisitCompleteGlobalError(error){        
        this.setState({
            visitCompleteGlobalError:error.message,
        })

        this.errorMessage();


    }

    saveMessage(){
        NotificationManager.success( ALERTS.visitCompleteSaveSuccess.message, ALERTS.visitCompleteSaveSuccess.heading,2000);
    }
    
    errorMessage (){
        NotificationManager.error( this.state.visitCompleteGlobalError, ALERTS.visitCompleteSaveError.heading,5000);
    }
    

renderCompletedData(){
    // {
    //     console.log('this.props.visitHeaderResult')
    // }
    // {
    //     console.log(this.props.visitHeaderResult.data)
    // }
        return (
            <CompletedData  completedBy={this.props.visitHeaderResult.data.lastUpdatedUser} completedDate={this.props.visitHeaderResult.data.lastUpdatedDateTime}/>
            
        )
    }


    handleSaveVisitComplete(e){
        e.preventDefault();

        this.setState({
            visitCompleteModalOpen:false
        })


        var visitHeaderPostParams = {
            token: this.props.visitHeaderResult.data.token,
            dateOfVisit: this.props.visitHeaderResult.data.dateOfVisit,
            completed:true
        }

        var patientStateGetParams = {
            token: this.props.visitHeaderResult.data.token
        }
        
        var visitCategoriesGetParams = {
            visitHeaderId:  this.props.visitHeaderResult.data.visitHeaderId,
            token:  this.props.visitHeaderResult.data.token,
            newVisit:false
        }
        
        var visitHeadersGetParams = {
            token: this.props.visitHeaderResult.data.token
    }
       

        this.props.saveVisitHeader(visitHeaderPostParams)
        .then(vh=> this.props.getSavedVisitHeader(visitHeaderPostParams))
        .then (svh => this.props.getVisitHeaders(visitHeadersGetParams))
         .then(vhs=> this.props.getPatientState(patientStateGetParams))
         .then(ps=> this.props.getVisitCategories(visitCategoriesGetParams))
         .then(vc=>  this.saveMessage())
         .catch(this.handleGetVisitCompleteGlobalError)

        // console.log('handleSaveVisitComplete : this.props.visitHeaderResult.data')        
        // console.log(this.props.visitHeaderResult.data)

this.setState({
    visitCompletedSaved:true
})

       }


       componentDidUpdate(prevProps, prevState) {
        
     
         //to prevent this component from doing a redirect 2nd time keep this in.
         if (this.state.visitCompletedSaved &&
                this.props.visitHeaderResult && 
                this.props.visitHeaderResult.data 
                && this.props.visitHeaderResult.data.completed) {
            //  console.log('visitCompletedSaved componentDidUpdate')
            //  console.log(this.props.visitHeaderResult)
        //      this.props.visitClear();       
        //   this.props.visitHeaderClear();
        //   this.props.visitCategoriesClear();
          this.setState({
            visitCompletedSaved:false
          })
       }
    }


    closeVisitCompleteModal(){
        this.setState({
            visitCompleteModalOpen:false,
        })  
    }
    
openVisitCompleteModal(){
    this.setState({
        visitCompleteModalOpen:true
    })
}


    afterOpenVisitCompleteModal(){
        var p = ''
        //use this to clear any error
    }

renderCompleteButton() {
    return (
        <div className="alert alert-danger text-center complete-visit">
             Open
    </div>
    )
    }
    
    
    renderCompletingButton(){
     return (
         <div className="alert alert-danger text-center complete-visit">
            <Spinner characterStyle={{ color: '#FFFFFF' }}/>
    </div>
     )
    }
    

    renderVisitSuccess(){

        return (
                this.props.visitCategoriesResult && 
                this.props.visitCategoriesResult.data && 
                this.props.visitCategoriesResult.data.length > 0 ? 
                <PanelDanger title={"Visit Status"}>
                   

                    {
                           this.props.visitHeaderResult.sendingRequest ? 
                           this.renderCompletingButton() :
                           this.renderCompleteButton()
               
                                      }

                </PanelDanger> 
                :null
                )
    }

    renderVisitDanger(){
        
                return (
                        this.props.visitCategoriesResult && 
                        this.props.visitCategoriesResult.data && 
                        this.props.visitCategoriesResult.data.length > 0 ? 

                        <div className="panel panel-success">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Visit Status</h3>
                                </div>
                                <div className="panel-body">
                                <div className="alert alert-success text-center completed-visit">
                                    Completed 
                            </div>
                                </div>

                                <div className="panel-footer">
                                    <div className="row patientdetails-well">
                                    <div className="col-sm-12"> 
                 

                        {
                            this.props.visitHeaderResult && 
                            this.props.visitHeaderResult.data && 
                            this.props.visitHeaderResult.data.lastUpdatedUser && 
                            this.props.visitHeaderResult.data.lastUpdatedDateTime ? this.renderCompletedData():null
                        }

                 
                </div>
                                    </div>
                                </div>

                    </div>

                       
                        :null
                        )
            }
        

            


    render (){

    // console.log('Render this.state.visitCompletedSaved')
    // console.log(this.state.visitCompletedSaved)

    // console.log('Render this.props.visitHeaderResult')
    // console.log(this.props.visitHeaderResult)



if (this.state.visitCompletedSaved && 
    this.props.visitHeaderResult && 
    this.props.visitHeaderResult.requestRecieved && 
    this.props.visitHeaderResult.data && 
    !!this.props.visitHeaderResult.data.token){
//   {
//       console.log('REDIRECT REDIRECT START')
      
//   }
// {
//     console.log(paths.visitLink + this.props.visitHeaderResult.data.token + CATEGORY_BASE)
// }
// {
//     console.log('REDIRECT REDIRECT END')
    
// }

    return(
        <div>
             <Redirect to={paths.visitLink + this.props.visitHeaderResult.data.token + CATEGORY_BASE} />
        </div>
    ) 
}
else {
        return(
<div>
            <div className="complete-visit-container">
                {  
                    this.props.patientStateResult && this.props.patientStateResult.data && 
                    this.props.patientStateResult.data.baselineExists  && 
                    this.props.patientStateResult.data.hasVisits && 
                    this.props.visitHeaderResult && this.props.visitHeaderResult.data &&
                    !this.props.visitHeaderResult.data.newVisit ?
                    !this.props.visitHeaderResult.data.completed ? 
                    this.renderVisitSuccess() : this.renderVisitDanger() :null
                }



     </div>
     <ModalDefault isOpen={this.state.visitCompleteModalOpen}  onRequestClose={this.closeVisitCompleteModal} onAfterOpen={this.afterOpenVisitCompleteModal} style={VISITCOMPLETE} contentLabel={"Complete Visit"}>
            <div  className='panel panel-danger'>
                <div className="panel-heading">
                    <button type="button" className="close" onClick={this.closeVisitCompleteModal}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>                   
                    <h4>Complete Visit</h4>
                </div>
                <div className="panel-body">
                     <form className="form" role="form">
 
                        <div className="alert alert-danger complete-visit-warning-message">
                            <i className="fa fa-exclamation-triangle fa-2 mr-10" aria-hidden="true"></i>
                            Warning: Visit data will no longer be editable</div>
 
          
                           
                          
                        </form>
                </div>
                <div className="panel-footer">
                    <button id="visitCompleteCancel" type="button" className="btn btn-primary mr-3" 
                    onClick={this.closeVisitCompleteModal}><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel</button>
                    <button id="visitCompleteConfirm"  
                    type="button" className="btn btn-danger"
                    onClick={this.handleSaveVisitComplete}>
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Confirm
                    </button>
                </div>
            </div>
            </ModalDefault>


            
<NotificationContainer/>  
        </div>
        );
    }
    }
}


function mapStateToProps(state) {
    return {
        patientBaselineResult: state.patientBaselineResult,
        patientStateResult: state.patientStateResult,
        visitHeaderResult : state.visitHeaderResult,
        visitHeadersResult: state.visitHeadersResult,
        visitCategoriesResult : state.visitCategoriesResult,


        
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
                                visitCategoriesClear:visitCategoriesClear, 
                                getVisitCategories: getVisitCategories,
                                saveVisitHeader:saveVisitHeader,
                                getSavedVisitHeader:getSavedVisitHeader,
                                getVisitHeaders: getVisitHeaders,
                                saveVisit:saveVisit, 
                                getVisit: getVisit, 
                                getSavedVisit: getSavedVisit,
                                getPatientState:getPatientState
                            
                            }, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps,null, {
    pure: false
  })(VisitCompletePanel);


