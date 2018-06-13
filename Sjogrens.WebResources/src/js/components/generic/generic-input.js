import React from 'react';
class GenericInput extends React.Component {
    
      render () {
        return (
            // <input  className={this.props.className} 
            //                                         id={this.props.id}
            //                                         name={this.props.name} 
            //                                         ref={this.props.ref} 
            //                                         value={this.props.value}
            //                                         onChange={this.props.onChange}
            //                                         placeholder={this.props.placeholder} /> 


<input  className="form-control mr-3" 
                                                    id="inputAddPatientDateOfBirth"
                                                    name="inputAddPatientDateOfBirth" 
                                                    ref="inputAddPatientDateOfBirth" 
                                                    placeholder="Date of Birth" />

        )
      }
    }

    export default GenericInput

    