import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class PanelConsentSuccess extends React.Component{
constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(){
        
        this.props.consentChange();
    }

render (){
    return(
        <div className="panel panel-success panel-consent" onClick={() => this.handleOnClick()}>
            <div className="panel-heading text-center">
                <h3 className="panel-title"><i className="fa fa-check-circle fa-2 mr-10" aria-hidden="true"></i>{this.props.title}</h3>
            </div>
            <div className="panel-body text-center">
                {this.props.children}
            </div>
        </div>
        );
    }
}


export default PanelConsentSuccess;


