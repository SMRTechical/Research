import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class InputGroupAddOnL extends React.Component{
constructor(props) {
        super(props);
    }

render (){
    return(
                            <div className="input-group"> 
                                    <span className="input-group-addon">{this.props.leftAddOn}</span>
                                    {this.props.children}
                            </div>
    );
}
}


export default InputGroupAddOnL;


