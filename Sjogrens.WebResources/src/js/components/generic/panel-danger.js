import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class PanelDanger extends React.Component{
constructor(props) {
        super(props);
       // this.handleOnClick = this.handleOnClick.bind(this);
    }

    // handleOnClick(){
    //     // console.log('consent Given: true');
    //      this.props.consentChange();
    //  }

render (){
    return(
          <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">{this.props.title}</h3>
                        </div>
                        <div className="panel-body">
                          {this.props.children}
                        </div>
                    </div>
    );


}
}


export default PanelDanger;


