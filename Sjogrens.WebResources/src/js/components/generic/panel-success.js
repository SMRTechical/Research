import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class PanelSuccess extends React.Component{
constructor(props) {
        super(props);
    }

render (){
    return(
          <div className="panel panel-success">
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


export default PanelSuccess;


