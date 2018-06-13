import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import onClickOutside from 'react-onclickoutside'
import {NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';
import DatePicker from 'react-datepicker';
import {getVisitCategories} from '../../actions/visit-categories';
import {paths} from '../../constants/paths/environment';
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat} from '../../factory/date-functions';
import ReactTooltip from 'react-tooltip'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FadeIn from '../../components/animation/fade-in';

class VisitCategories extends React.Component{
    constructor(props) {
        super(props);   
        this.state = {
            visitCategoriesGlobalError:''
        };

        this.renderCategoryListItems = this.renderCategoryListItems.bind(this);
        this.renderCategoriesList = this.renderCategoriesList.bind(this);
       
    }


  
  






    componentWillReceiveProps(nextProps){

            }
        

    componentDidMount () {
    
          
       }



  

renderCategoryListItems(visitCategory, i){


    return ( 
       

    <div className="categories"> 
    <NavLink 
           
        key={i}
        className='list-group-item list-group-item-action list-group-item-visitHeader list-group-item-info'
        activeClassName="active" 
        to={paths.visitLink + visitCategory.token + '/' + visitCategory.name }>
         {visitCategory.linkText}
     </NavLink>
     </div>
    )
}

    renderCategoriesList(){
        return  (
        <div className="list-group">  
             <FadeIn>
            {this.props.visitCategoriesResult.data.map((visitCategory,i)=> {
            if (visitCategory.visitCategory){
                return (  this.renderCategoryListItems(visitCategory,i))
                }
             })
               
            }

           

            
            </FadeIn>              
        </div>
        )       
    }

    render (){
        return(
                
                    this.props.visitCategoriesResult.data && this.props.visitCategoriesResult.data.length > 0 ?
                    this.renderCategoriesList() : null
                
        );
    }
}


function mapStateToProps(state) {
    return {
        visitCategoriesResult: state.visitCategoriesResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getVisitCategories: getVisitCategories}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps,null, {
    pure: false
  })(VisitCategories);

