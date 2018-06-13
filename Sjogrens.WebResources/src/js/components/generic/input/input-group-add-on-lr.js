import React from 'react';
//import AddPatientForm from '../../containers/add-patient-form'
class InputGroupAddOnLR extends React.Component{
constructor(props) {
        super(props);
    }

render (){
    return(
                            <div className="input-group" > 
                                    <span className="input-group-addon">{this.props.leftAddOn}</span>
                                    {this.props.children}
                                <span className="input-group-addon">{this.props.rightAddOn}</span>
                            </div>
    );
}
}


export default InputGroupAddOnLR;


