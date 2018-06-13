import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Root from './root';
import AdminRoot from '../admin/admin-root';
import Patient from '../patient/patient';
import {paths} from '../../constants/paths/environment';
import NoMatch from '../../components/generic/NoMatch';

export class App extends React.Component {
    render() {
    return ( 
    <div>
        <Switch>
            <Route exact path={paths.index} component={Root}/>
            <Route  path={paths.admin} component={AdminRoot}/>
            <Route  path={paths.patient} component={Patient} onEnter={() => setTimeout(function () { window.scrollTo(0, 0);}, 100)}/>
            <Route  path={paths.visit} component={Patient} onEnter={() => setTimeout(function () { window.scrollTo(0, 0);}, 100) }/>
            <Route  path={paths.visitAmericanEuropeanCGC} component={Patient} onEnter={() => setTimeout(function () { window.scrollTo(0, 0);}, 100) }/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
    );
}
};