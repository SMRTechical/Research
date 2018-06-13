import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside'
import {NavLink, Link, Route, Switch,Redirect } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';
import AlertSuccess from '../../components/generic/alert-success';
import AlertDanger from '../../components/generic/alert-danger';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import VisitLinks from './visit-links';

import VisitCategories from './visit-categories';
//import {isVisitHeaderDuplicate,visitHeaderDuplicateClear} from '../../actions/visit-header-duplicate';
import {getVisitHeader, visitHeaderClear,newAttendanceHeaderClear} from '../../actions/visit-header';
import {getVisitHeaders} from '../../actions/visit-headers';

import { getVisitControlValues, visitControlValuesClear} from '../../actions/visit-control-values';
import {visitCategoriesClear,getVisitCategories } from '../../actions/visit-categories'
import {saveVisit, getVisit, getSavedVisit,visitClear} from '../../actions/visit'; 
import {ALERTS} from '../../constants/information/messages';
import {paths} from '../../constants/paths/environment';
import {CATEGORY_BASE} from '../../constants/paths/first-category';

import {getPatientState,patientStateClear} from '../../actions/patient-state';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions';
import ReactTooltip from 'react-tooltip'
import NewAttendanceModal from '../../components/visit/modals/new-attendance-modal';
import FadeIn from '../../components/animation/fade-in';

const styles ={
    transition: 'all 1s ease-out'
}

class VisitHistory extends React.Component{
    constructor(props) {
        super(props);   
        this.state = {
            token: this.props.token,
            dateOfVisit:null,// moment(),
            isCalendarOpen:false,
            redirectToVisit:false,
            visitHistoryGlobalError:'',
            showVisitDates:true,
            opacity:0,
            scale:1,
            initialVisit:false, newVisit:false,
            isNewAttendanceModelOpen:false
        };



        this.highlightWithRanges = [
            { "react-datepicker__day--highlighted-allowed-visit-dates": [
              moment().subtract(4, "days"),
              moment().subtract(3, "days"),
              moment().subtract(2, "days"),
              moment().subtract(1, "days"),
              moment() ]
            }]

        this.includeDates = [moment(), 
                moment().subtract(1, "days"),
                moment().subtract(2, "days"), 
                moment().subtract(3, "days"),
                moment().subtract(4, "days")]

        this.renderHistory = this.renderHistory.bind(this);
      //  this.handleAddNewVisit = this.handleAddNewVisit.bind(this);
        this.openAddNewVisit = this.openAddNewVisit.bind(this);
        this.closeAddNewVisit = this.closeAddNewVisit.bind(this);
        this.isIncludedDate = this.isIncludedDate.bind(this);
        this.onClickOutsideCalendar = this.onClickOutsideCalendar.bind(this);        
      //  this.getVisitHeader = this.getVisitHeader.bind(this);
        this.handleGetVisitHistoryGlobalError = this.handleGetVisitHistoryGlobalError.bind(this);
        this.handleShowVisitDates = this.handleShowVisitDates.bind(this);
        this.renderHeadersDropdownList = this.renderHeadersDropdownList.bind(this);
        this.renderHeaderListItems = this.renderHeaderListItems.bind(this);

        this.renderVisitDropdownList = this.renderVisitDropdownList.bind(this);        
       this.renderVisitDropdownListItems = this.renderVisitDropdownListItems.bind(this);

        this.getVisitHeaders = this.getVisitHeaders.bind(this);

        this.onShowHide = this.onShowHide.bind(this);
        this.onScale = this.onScale.bind(this);
        this.handleDropDownHeadersClick = this.handleDropDownHeadersClick.bind(this);

        this.addNewAttendance = this.addNewAttendance.bind(this);
        this.attendanceModalClose = this.attendanceModalClose.bind(this);
        this.confirmAttendanceDate = this.confirmAttendanceDate.bind(this);

        this.getVisitData = this.getVisitData.bind(this);
        this.hasOpenVisit = this.hasOpenVisit.bind(this);
    }

    handleDropDownHeadersClick () {
        this.refs.dropdown.hide();
      }

onShowHide(){
    this.setState({
        opacity:this.state.opacity == 0 ? 1 :0
    })
}

onScale() {
    this.setState({
        scale:this.state.scale > 1 ? 1 : 1.3
    })
}
  
        
handleShowVisitDates(){
    this.setState({
        showVisitDates:!this.state.showVisitDates
    })
}


handleGetVisitHistoryGlobalError(error){        
    this.setState({
        visitHistoryGlobalError:error.message,
    })
  }

componentDidUpdate(prevProps, prevState) {
 
    if (this.state.redirectToVisit && 
        this.props.visitHeaderResult &&
        this.props.visitHeaderResult.data){
            this.setState({redirectToVisit:false})

       if(this.props.visitHeaderResult.data.initialVisit){


       // console.log('visit history componentDidUpdate Initial')
        this.props.visitClear();        
      
    this.props.visitHeaderClear();
    this.props.visitCategoriesClear();

     
  }
  else if (this.props.visitHeaderResult.data.newVisit){


//     console.log('visit history componentDidUpdate newVisit')

//     this.props.visitClear();        
    
//   this.props.visitHeaderClear();
//   this.props.visitCategoriesClear();

      //this.setState({redirectToVisit:false})
  }
}
}

    confirmAttendanceDate(date,initialVisit, newVisit, visitHeaderId){
     //  console.log('confirmAttendanceDate')
        
      //  console.log(initialVisit)
//console.log(newVisit)
    // this.setState({
    //     initialVisit:initialVisit, newVisit:newVisit, redirectToVisit:false
    // })

/*visitHeaderId is previous headerId */
  
        var visitHeaderParams = {
            token: this.props.token,
            dateOfVisit:  date.format("YYYY-MM-DD")
            }

        if (!initialVisit && newVisit){
            //console.log('!initialVisit && newVisit start')
           // console.log(visitHeaderParams)
           // console.log(visitHeaderId)
            this.props.getVisitHeader(visitHeaderParams)
            .then(vh=>this.getVisit(vh,visitHeaderId, newVisit))
            .catch(this.handleGetVisitHeaderGlobalError)
           // console.log('!initialVisit && newVisit end')
        }
        else {
          //  console.log('222222222222')
            this.props.getVisitHeader(visitHeaderParams).catch(this.handleGetVisitHeaderGlobalError)
        }

        this.setState({
            isNewAttendanceModelOpen:false,
            redirectToVisit:true,
            initialVisit:initialVisit, newVisit:newVisit
        })
    }


    getVisit(visitHeader, visitHeaderId, newVisit){
          //visitHeeader will be new visitHeader
          //visitHeaderId = prev VisitHeaderId
          //newVisit = true

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
//.then(vh=>this.props.getVisitHeader(visitHeaderParams))
.then(v=>this.getVisitData(v,newVisit,visitHeader))



        }


getVisitData(v, newVisit,visitHeader){
   // console.log('visit123 START');
//console.log(v);
//console.log('visit123 END');

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
//console.log('redirect To FollowUp')
//console.log('sajid start')
//console.log(this.props.visitHeaderResult)
//console.log('sajid end')


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

     
    componentWillReceiveProps(nextProps) {
 
    }

    componentDidMount() {      
       if(this.props.token){
            this.getVisitHeaders(this.props.token);
          }
    }
    
    getVisitHeaders(token){    
        var visitHeadersGetParams = {
                token: token
        }

        this.props.getVisitHeaders(visitHeadersGetParams)
        .catch(this.handleGetVisitHeaderGlobalError)

        }


      addNewAttendance(e){
         e && e.preventDefault();
          this.setState({
            isNewAttendanceModelOpen:true
          })
      }

      

attendanceModalClose(){
    this.setState({
        isNewAttendanceModelOpen:false
    })
}

      

      
    openAddNewVisit (e) {
        e && e.preventDefault()
        this.setState({isCalendarOpen: true})
    }

    closeAddNewVisit () {
        this.setState({isCalendarOpen: false})
    }

    onClickOutsideCalendar(){
        this.props.visitHeaderClear();
        this.closeAddNewVisit();
    }

    isIncludedDate(date) {
        return this.includeDates.indexOf(date)
      }

      renderHeaderListItems(visitHeader, i){
       
        return ( 
           <div>
        <NavLink onClick={this.handleDropDownHeadersClick}
            key={i}
            className={classnames('list-group-item list-group-item-action list-group-item-visitHeader',{'list-group-item-primary': visitHeader.completed,'list-group-item-info':!visitHeader.completed})}
            activeClassName="active" to={paths.visitLink + visitHeader.token + CATEGORY_BASE}>
             <span className="badge badge-default badge-pill mr-5">{visitHeader.visitId}</span>{handleDateFormat(visitHeader.dateOfVisit)}
         </NavLink>
         </div>
        )
    }

    renderHeadersDropdownList(){
        
                return  (
                    <Dropdown className="account-dropdown list-group" ref="dropdown">
                    <DropdownTrigger>
                      
                      <a className="account-dropdown__name btn btn-primary btn-sq-xs mr-5"  data-tip="React-tooltip" data-for="attendance-dates-tooltip">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                        </a>
                    </DropdownTrigger>
                    <DropdownContent>
                            {this.props.visitHeadersResult.data.map((visitHeader, i)=> {
                                     return (  this.renderHeaderListItems(visitHeader,i))
                                })} 
                       
     </DropdownContent>

     <ReactTooltip id='attendance-dates-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Attendance Dates</span>
            </ReactTooltip> 
      </Dropdown>

     

                )
                        
            }

            renderVisitDropdownList(){
                
                        return  (
                            <div className="attendance-history-menu-item"> 
                            <Dropdown className="account-dropdown list-group" ref="dropdown">
                            <DropdownTrigger>                     
                              <a className="account-dropdown__name list-group-item-action list-group-item-visitHeader list-group-item-info" aria-hidden="true" data-tip="React-tooltip" data-for="attendance-dates-tooltip">
                                  <i className="fa fa-calendar btn btn-primary btn-sq-xs-attendance-menu mr-5" aria-hidden="true"></i><span>Visit Dates</span>
                                </a>
                            </DropdownTrigger>
                            <DropdownContent>
                                    {this.props.visitHeadersResult.data.map((visitHeader, i)=> {
                                             return (  this.renderVisitDropdownListItems(visitHeader, i))
                                        })} 
                               
             </DropdownContent>
        
             <ReactTooltip id='attendance-dates-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                                   <span>View patients visit dates</span>
                    </ReactTooltip> 
              </Dropdown>
              </div>
             
        
                        )
                                
                    }
           


                    renderVisitDropdownListItems(visitHeader, i){
                      
if (visitHeader.completed) {
    return ( 
        <div className="visit-dates-menu-item">
     <NavLink onClick={this.handleDropDownHeadersClick}
         key={i}
         className='visit-dates-list-group-item list-group-item-action list-group-item-visitHeader visit-dates-list-group-item-info'
         activeClassName="active" to={paths.visitLink + visitHeader.token + CATEGORY_BASE}>
         
         
             <i className="fa fa-check mr-5"></i><span>{handleDateFormat(visitHeader.dateOfVisit)}</span>
         
          
      </NavLink>
      </div>
     )
}
else {
    return ( 
        <div className="visit-dates-menu-item">
     <NavLink onClick={this.handleDropDownHeadersClick}
         key={i}
         className='visit-dates-list-group-item list-group-item-action list-group-item-visitHeader visit-dates-list-group-item-info'
         activeClassName="active" to={paths.visitLink + visitHeader.token + CATEGORY_BASE}>
        
          <span className="fa-empty"></span>{handleDateFormat(visitHeader.dateOfVisit)}
      </NavLink>
      </div>
     )
}

                      
                    }


hasOpenVisit(){
var openVisit = false;

var visitHeaders = this.props.visitHeadersResult && this.props.visitHeadersResult.data ? this.props.visitHeadersResult.data : null;

if (visitHeaders) {
    for (let visitHeader of visitHeaders) {
        if (!visitHeader.completed){
            openVisit = true 
        }
      }
}

return openVisit

}


    renderHistory(){
        return (
            <div className="attendance-history-container">
                <PanelDefault title={"Visit History"}>
                <div className="list-group">  
                {
                    ((this.props.patientBaselineResult && 
                        this.props.patientBaselineResult.requestRecieved && 
                        this.props.patientBaselineResult.data &&
                        !this.hasOpenVisit()) || 
                        (this.props.visitHeaderResult && 
                        this.props.visitHeaderResult.requestRecieved && 
                        this.props.visitHeaderResult.data &&
                        !this.hasOpenVisit())
                        ) ?
                    <div className="attendance-history-menu-item"> 
                        <a className="list-group-item list-group-item-action list-group-item-visitHeader list-group-item-info" onClick={this.addNewAttendance} data-tip="React-tooltip" data-for="new-attendance-tooltip">
                            <i className="fa fa-plus btn btn-primary btn-sq-xs-attendance-menu mr-5" aria-hidden="true"></i><span>Add Visit</span>
                        </a>
                    </div>:null}

                    <div className="attendance-history-menu-item"> 
                        <NavLink className="list-group-item list-group-item-action list-group-item-visitHeader list-group-item-info" activeClassName="active" to={paths.patientLink  + this.props.token + '/baseline'} aria-hidden="true" data-tip="React-tooltip" data-for="baseline-tooltip">
                                <i className="fa fa-clipboard btn btn-primary btn-sq-xs-attendance-menu mr-5" aria-hidden="true"></i><span>Inclusion Criteria</span>
                        </NavLink>
                    </div>
                   
{/*                     
                    {this.props.visitHeadersResult && 
                    this.props.visitHeadersResult.requestRecieved && 
                    this.props.visitHeadersResult.data &&
                    this.props.visitHeadersResult.data.length > 0 ?  
                    <div className="attendance-history-menu-item"> 
                        <NavLink className="list-group-item list-group-item-action list-group-item-visitHeader list-group-item-info" activeClassName="active" to={paths.patientLink + this.props.token + '/summary'} aria-hidden="true" data-tip="React-tooltip" data-for="summary-tooltip">
                        <i className="fa fa-pie-chart btn btn-primary btn-sq-xs-attendance-menu mr-5" aria-hidden="true"></i><span>Summary</span>
                        </NavLink>
                    </div>:null} */}

                    {
                    this.props.visitHeadersResult && 
                    this.props.visitHeadersResult.requestRecieved && 
                    this.props.visitHeadersResult.data &&
                    this.props.visitHeadersResult.data.length > 0 ?
                   this.renderVisitDropdownList()
                    :null}

                </div>
           
                    
                </PanelDefault>

                <ReactTooltip id='new-attendance-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Add a new visit</span>
            </ReactTooltip>   
            <ReactTooltip id='baseline-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Go to patients baseline</span>
            </ReactTooltip>   
            <ReactTooltip id='summary-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Go to patients summary details</span>
            </ReactTooltip>  
            
            
          
            
            
                </div>
                )
    }

    render (){
{
    console.log('has Open Visit:' + this.hasOpenVisit())
}

        return(

            <div>
                {  
                    this.renderHistory() 
                }
{
    ReactTooltip.rebuild() 
}



                {
                    this.props.visitHeaderResult &&
                    this.props.visitHeaderResult.requestRecieved && 
                    this.props.visitHeaderResult.data && this.props.visitHeaderResult.data.token && 
                    (this.props.visitHeaderResult.data.initialVisit || (!this.props.visitHeaderResult.data.newVisit &&  !!this.props.visitHeaderResult.data.visitHeaderId)  ) &&
                   // this.props.visitHeaderResult.data.visitHeaderId == 0 && 
                    !this.props.visitHeaderResult.data.isDuplicate && !this.props.visitHeaderResult.data.isInvalid &&
                    this.state.redirectToVisit ? 
                    <Redirect to={{
                        pathname: paths.visitLink + this.props.visitHeaderResult.data.token + CATEGORY_BASE,
                        state: {visitHeaderResult :this.props.visitHeaderResult.data}
                    }}/>:null
                }
              


                <NewAttendanceModal  isAttendanceModalOpen={this.state.isNewAttendanceModelOpen} 
                                        attendanceModalClose={this.attendanceModalClose}
                                        confirmAttendanceDate={this.confirmAttendanceDate}
                                        token={this.props.token}
                                            contentLabel={"Options"} 
                                            
/>

        </div>





        );
    }
}


function mapStateToProps(state) {
    return {
        patientBaselineResult: state.patientBaselineResult,
        patientStateResult: state.patientStateResult,
        visitHeaderResult : state.visitHeaderResult,
        visitHeadersResult: state.visitHeadersResult,
        visitCategoriesResult : state.visitCategoriesResult,
        visitControlValuesResult : state.visitControlValuesResult,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
                                visitCategoriesClear:visitCategoriesClear, 
                                getVisitHeader:getVisitHeader, 
                                visitHeaderClear:visitHeaderClear,
                                visitClear:visitClear,
                                getVisitHeaders: getVisitHeaders,
                                newAttendanceHeaderClear:newAttendanceHeaderClear, 
                                getVisit: getVisit,
                                getVisitCategories: getVisitCategories,  
                                getVisitControlValues:  getVisitControlValues, 
                            }, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps,null, {
    pure: false
  })(VisitHistory);

