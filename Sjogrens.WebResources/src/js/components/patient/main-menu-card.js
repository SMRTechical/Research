import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';
import {paths} from '../../constants/paths/environment';
class MainMenuCard extends React.Component{
    constructor(props) {
        super(props);       
    }

    componentWillReceiveProps(nextProps){

      //  console.log('top 1 nav compo')
      //  console.log(nextProps.token)

    }


    render (){
        return(
            <div>
                <PanelDefault title={"Main Menu"}>
                <div className="list-group"> 
               <NavLink className="list-group-item" activeClassName="active" to={paths.patientLink  + this.props.token + '/baseline'}>Baseline</NavLink>
               <NavLink className="list-group-item" activeClassName="active" to={paths.patientLink + this.props.token + '/summary'}>Summary</NavLink>
                                                </div>
                 </PanelDefault>
        </div>
        );
    }
}

export default MainMenuCard;

