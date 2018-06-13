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
import VisitCategories from './visit-categories';
//import {isVisitHeaderDuplicate,visitHeaderDuplicateClear} from '../../actions/visit-header-duplicate';
import {getVisitCategories, visitCategoriesClear} from '../../actions/visit-categories';
import {ALERTS} from '../../constants/information/messages';
import {paths} from '../../constants/paths/environment';
import {getPatientState,patientStateClear} from '../../actions/patient-state';

class VisitCategoriesContainer extends React.Component{
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
            AECGCGlobalError:'',
            visitHeaderPostParams:null,
            initialLoad:true
        };      
    }

    






    
    

    

    renderCategories(){

        console.log('this.visitHeaderResult.data.newVisit == undefined')     
        this.props.visitHeaderResult &&
        this.props.visitHeaderResult.data?
        console.log(this.props.visitHeaderResult.data.newVisit == undefined): null
        console.log('this.visitHeaderResult.data.newVisit')
         
        this.props.visitHeaderResult &&
        this.props.visitHeaderResult.data?
        console.log(this.props.visitHeaderResult.data.newVisit): null
        
        return (
            this.props.visitHeaderResult &&
            this.props.visitHeaderResult.data &&
            this.props.visitHeaderResult.data.newVisit != undefined && !this.props.visitHeaderResult.data.newVisit &&
                this.props.visitCategoriesResult && 
                this.props.visitCategoriesResult.data && 
                this.props.visitCategoriesResult.data.length > 0 ? 
               




<div className='panel panel-primary'>
                        <div className="panel-heading">
                            <h3 className="panel-title">Visit Categories</h3>
                        </div>
                        <div className="panel-body">
                        <VisitCategories token={this.props.token}/>    
                        </div>
                    </div>




                :null
                )
    }

    render (){

        

        return(

            <div className="categories-container">
          
{
                this.renderCategories() 
}
               
              
        </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        patientBaselineResult: state.patientBaselineResult,
        patientStateResult: state.patientStateResult,
        visitHeaderResult : state.visitHeaderResult,
        visitCategoriesResult : state.visitCategoriesResult,


        
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
                                visitCategoriesClear:visitCategoriesClear, 
                                getVisitCategories: getVisitCategories,
                            }, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps,null, {
    pure: false
  })(VisitCategoriesContainer);


