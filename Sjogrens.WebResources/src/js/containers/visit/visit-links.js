import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside'
import {NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';
import DatePicker from 'react-datepicker';
import {getVisitHeaders} from '../../actions/visit-headers';
import {paths} from '../../constants/paths/environment';
import {CATEGORY_BASE} from '../../constants/paths/first-category';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions';
import ReactTooltip from 'react-tooltip';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class VisitLinks extends React.Component{
    constructor(props) {
        super(props);   
        this.state = {
            visitHeadersGlobalError:''
        };

        this.renderHeaderListItems = this.renderHeaderListItems.bind(this);
        this.renderHeaderButtons = this.renderHeaderButtons.bind(this);
        this.renderHeadersList = this.renderHeadersList.bind(this);
        // this.renderHeadersDropdownList = this.renderHeadersDropdownList.bind(this);
        this.getVisitHeaders = this.getVisitHeaders.bind(this);
        this.handleGetVisitHeaderGlobalError = this.handleGetVisitHeaderGlobalError.bind(this);
       
       
    }

componentDidUpdate(){
    ReactTooltip.rebuild()
}

    componentDidMount () {
        if(this.props.token){
            this.getVisitHeaders(this.props.token);
          }
       }



       getVisitHeaders(token){    
        var visitHeadersGetParams = {
                token: token
        }
          //  console.log('visit-links - getVisitHeaders')
        this.props.getVisitHeaders(visitHeadersGetParams).catch(this.handleGetVisitHeadersGlobalError)
        }


       handleGetVisitHeaderGlobalError(error){        
        this.setState({
            visitHeadersGlobalError:error.message,
        })
      }

renderHeaderListItems(visitHeader, i){
    return ( 
       <div>


    <NavLink 
        key={i}
        className={classnames('list-group-item list-group-item-action list-group-item-visitHeader',{'list-group-item-success': visitHeader.completed,'list-group-item-info':!visitHeader.completed})}
        activeClassName="active" to={paths.visitLink + visitHeader.token + CATEGORY_BASE}>
         <span className="badge badge-default badge-pill mr-5">{visitHeader.visitId}</span>{handleDateFormat(visitHeader.dateOfVisit)}
     </NavLink>
     </div>
    )
}

renderHeaderButtons(visitHeader, i){
    
    return ( 
        <div className="col-sm-6 col-md-4 col-lg-3" >
            
    <NavLink 
        data-tip="React-tooltip" 
        data-for={"attendance-tooltip"+ visitHeader.visitId} 
        key={i}
        className={classnames('btn btn-block btn-attendance',{'btn-attendance-success': visitHeader.completed,'btn-attendance-info':!visitHeader.completed})}
        activeClassName="btn-attendance-active" to={paths.visitLink + visitHeader.token + CATEGORY_BASE}> 
        <span className="text-center">{visitHeader.visitId}</span>
       
     </NavLink>

     
     
    <ReactTooltip id={'attendance-tooltip' + visitHeader.visitId} place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
     <form className="form-inline">
         <div className="form-group"> 
                                    <label htmlFor="attendanceDateText" className ="control-label col-sm-12 col-md-8">Date of Attendance:</label>
                                    <label htmlFor="attendanceDateDate" className ="control-label col-sm-12 col-md-4">{handleDateFormat(visitHeader.dateOfVisit)}</label>
                                    </div>
        </form>
    </ReactTooltip>  
     </div>
    )
}

    renderHeadersList(){



        if (this.props.showVisitDates){

        return  (
        <div className="list-group" style={this.props.style}> 
                    {this.props.visitHeadersResult.data.map((visitHeader, i)=> {
                return (  this.renderHeaderListItems(visitHeader, i))
               })} 
               </div>
        )
    }
    else {
        return  (
            <div className="row attendance-button-container"> 
            
                        {this.props.visitHeadersResult.data.map((visitHeader, i)=> {
                    return (  this.renderHeaderButtons(visitHeader, i))
                   })}                              
                   </div>
        )
    }
                
    }


    

    render (){
        return(
            <div className="attendance-history">
                {
                    this.props.visitHeadersResult.data && this.props.visitHeadersResult.data.length > 0 ?
                    this.props.style.opacity > 0 ? this.renderHeadersList() : null :null
                }
        </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        visitHeadersResult: state.visitHeadersResult
       
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getVisitHeaders: getVisitHeaders}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps)(VisitLinks);

