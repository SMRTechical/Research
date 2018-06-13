
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import PanelDefault from '../generic/panel-default';
// import PatientDetails from '../../containers/patient/patient-details';
import PatientBaseline from '../../containers/patient/patient-baseline';
import SummaryDetails from '../../containers/patient/summary-details';
import VisitBase from '../../containers/visit/visit-base';
// import Diagnosis from '../../containers/visit/diagnosis';
//import InvestigationsRequested from '../../containers/visit/investigations-requested';
//import ResearchBloods from '../../containers/visit/research-bloods';
import MainMenuCard from './main-menu-card';
import VisitHistory from '../../containers/visit/visit-history';
import VisitCategoriesContainer from '../../containers/visit/visit-categories-container';
import VisitCompletePanel from '../../containers/visit/visit-complete-panel';
import MainMenu from '../../containers/patient/main-menu';
import {paths} from '../../constants/paths/environment';
import PatientHeader from '../../components/patient/patient-header';
import TicTacToe from '../../games/tic-tac-toe';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactCountdownClock from 'react-countdown-clock';
import {StickyContainer, Sticky} from 'react-sticky';
import react404 from 'react-404';
import FadeIn from '../../components/animation/fade-in';
import NoMatch from '../../components/generic/NoMatch';

const styles={
    position: 'fixed',
    bottom: 10,
    right: 10,
    cursor: 'pointer',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s'
  }



export class Patient extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
 //console.log('patient didi mount')
        if (!this.props.patientStateResult || !this.props.patientStateResult.data){
       
          //  console.log('get paptient result')
       
            var patientStateGetParams = {
            token: this.props.match.params.token
    }

 

       this.props.getPatientState(patientStateGetParams)
}

    }

    render() {


    return ( 
                
                <div >
                   

                    <div className="row">

                                        <div className="col-md-2 col-sm-12">
                                            
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                    <VisitHistory token={this.props.match.params.token}/>
                                                  
                                                    <VisitCategoriesContainer token={this.props.match.params.token}/>
                                                  
                                                 
                                                    </div>
                                                </div> 
                                        </div>

<div className='col-sm-12, col-md-10'>
                                                                                  
                                                                                    <FadeIn>
                            <PatientHeader token={this.props.match.params.token}/>
                            </FadeIn>
                                            <Switch>
                                                {/* <Route exact path={paths.patient} component={PatientBaseline}/>*/}
                                                <Route exact path={paths.baseline} component={PatientBaseline}/>
                                                <Route exact path={paths.summary} component={SummaryDetails}/> 
                                                <Route exact path={paths.visit} component={VisitBase}/>
                                                <Route exact path={paths.visitAmericanEuropeanCGC} component={VisitBase}/>
                                                <Route exact path={paths.visitDiagnosis} component={VisitBase}/>
                                                <Route exact path={paths.visitCurrentMedications} component={VisitBase}/>
                                                <Route exact path={paths.visitESSPRI} component={VisitBase}/>
                                                <Route exact path={paths.visitESSDAI} component={VisitBase}/>
                                                <Route exact path={paths.visitActivityScore} component={VisitBase}/>
                                                <Route exact path={paths.visitDamageIndices} component={VisitBase}/>
                                                <Route exact path={paths.visitPastMedicalHistory} component={VisitBase}/>
                                                <Route exact path={paths.visitInvestigationsRequested} component={VisitBase}/>
                                                <Route exact path={paths.visitUltrasoundResults} component={VisitBase}/>
                                                <Route exact path={paths.visitSalivaryFlow} component={VisitBase}/>
                                                <Route exact path={paths.visitRoutineBloods} component={VisitBase}/>
                                                <Route exact path={paths.visitResearchBloods} component={VisitBase}/>
                                                <Route exact path={paths.visitOtherResearchBiomaterials} component={VisitBase}/>
                                                <Route exact path={paths.visitClinicalOralDrynessScore} component={VisitBase}/>
                                                <Route exact path={paths.visitOcularSurfaceStainingScore} component={VisitBase}/>
                                                <Route exact path={paths.visitFatFreeMass} component={VisitBase}/>
                                                <Route component={NoMatch}/>
                                                {/* <Route render={function(){
                                                        return <p>Patient Not Found</p>
                                                    }}/> */}
                                            </Switch>
                                       
                                            
                                        </div>
                    </div>


                    <ScrollToTop showUnder={160} style={{...styles}}>
                    <i className="fa fa-arrow-circle-up fa-6 scroll-up" aria-hidden="true"></i>
</ScrollToTop>

                </div>
               
        );
    }
    
    
};



function mapStateToProps(state) {
    return {
        patientStateResult: state.patientStateResult
      };
}

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({getVisitHeader:getVisitHeader, visitHeaderClear:visitHeaderClear,visitClear:visitClear}, dispatch);
// }

 export default connect(mapStateToProps,null)(Patient);

//export default Patient;
