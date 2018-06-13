
import React from 'react';
import classnames from 'classnames';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../generic/panel-default';
// import PatientDetails from '../../containers/patient/patient-details';
import PatientBaseline from '../../containers/patient/patient-baseline';
import SummaryDetails from '../../containers/patient/summary-details';
import AmericanEuropeanCGC from '../../containers/visit/american-european-cgc';
import MainMenuCard from './main-menu-card';
import VisitHistory from '../../containers/visit/visit-history';
import MainMenu from '../../containers/patient/main-menu';
import {paths} from '../../constants/paths/environment';


import PatientHeader from '../../components/patient/patient-header';

export class PatientOLD extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

    return ( 
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            {/* <PatientDetails token={this.props.match.params.token}/> */}
                            <PatientHeader token={this.props.match.params.token}/>
                        </div>
                    </div>

                    <div className="row">
                                        <div className="col-md-2 col-sm-12">
                                           
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                    <VisitHistory token={this.props.match.params.token}/>
                                                    </div>
                                                </div> 
                                            
                                        </div>
                                        <div className="col-md-10 col-sm-12">                                            
                                            <Switch>
                                                {/* <Route exact path={paths.patient} component={PatientBaseline}/>*/}
                                                <Route exact path={paths.baseline} component={PatientBaseline}/>
                                                <Route exact path={paths.summary} component={SummaryDetails}/> 
                                                <Route exact path={paths.visitAmericanEuropeanCGC} component={AmericanEuropeanCGC}/>
                                                <Route exact path={paths.visitNew} component={AmericanEuropeanCGC}/>
                                                <Route render={function(){
                                                        return <p>Patient Not Found</p>
                                                    }}/>
                                            </Switch>
                                        </div>
                    </div>
                </div>
            </div>
        );
   
    }
};



export default PatientOLD;
