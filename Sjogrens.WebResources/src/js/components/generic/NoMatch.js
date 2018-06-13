
import React,{Component} from 'react';

import classnames from 'classnames';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import PanelDefault from '../generic/panel-default';
import {paths} from '../../constants/paths/environment';

export default function NoMatch ({location}){
    
return (
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title text-center">Ooops page not found!</h3>
                        </div>
                        <div className="panel-body text-center alert alert-warning" style={{height:'400px'}}>
                       
                       The page <code className="code-no-match text-center">{location.pathname}</code> you are looking for can't be found.
                       <div><img src={paths.pageNotFound} alt="Page Not Found"/></div>
                      <div className="clearfix"></div>
                        </div>
                    </div>
)
}