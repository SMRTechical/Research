import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class PanelQuestionConsent extends React.Component{
constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        
    }

    handleOnClick(){
        // console.log('consent Given: true');
         this.props.consentChange();
     }

render (){
    return(
        <div className="panel panel-danger panel-consent" onClick={() => this.handleOnClick()}>
            <div className="panel-heading text-center">
                <h3 className="panel-title">
                <i className="fa fa-question fa-2 mr-10" aria-hidden="true"></i>{this.props.title}</h3>
            </div>
            <div className="panel-body text-center">
                {this.props.children}
            </div>
        </div>
        );
    }
}


export default PanelQuestionConsent;


