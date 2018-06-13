import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';

class FollowUpNav extends React.Component{
    constructor(props) {
        super(props);       
    }

    render (){
        return(
            <div>
                <PanelDefault title={"Follow Up History"}>
                <div className="list-group">
                                                <NavLink className="list-group-item" activeClassName="active" to="/Home/Index/patient/160/visit/new">
                                                <i className="fa fa-plus-circle text-primary" aria-hidden="true"></i>&nbsp;New</NavLink>
                                                <NavLink className="list-group-item" activeClassName="active" to="/Home/Index/patient/visit/1">
                                                <i className="fa fa-repeat text-success" aria-hidden="true"></i>&nbsp; 01/01/2010 <span className="badge badge-success badge-pill">1</span></NavLink>
                                                <NavLink className="list-group-item" activeClassName="active" to="/Home/Index/patient/visit/2">
                                                <i className="fa fa-repeat text-success" aria-hidden="true"></i>&nbsp; 01/01/2011 <span className="badge badge-success badge-pill">2</span></NavLink>
                                                <NavLink className="list-group-item" activeClassName="active" to="/Home/Index/patient/visit/3">
                                                <i className="fa fa-check text-warning" aria-hidden="true"></i>&nbsp; 01/01/2012 <span className="badge badge-warning badge-pill">3</span></NavLink>
                                            </div>
                 </PanelDefault>
        </div>
        );
    }
}

export default FollowUpNav;
