import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import ReactTooltip from 'react-tooltip'
import classnames from 'classnames'
 class CurrentMedicationsOther extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            editMode: false,
            isDirty:false,
            errors:{},
        }

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.remove = this.remove.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.treatment_OnChange = this.treatment_OnChange.bind(this);
    }



   

    treatment_OnChange(e){

        if (!!this.state.errors["currentTreatment"])
            {
                let errorsClone = Object.assign({},this.state.errors);
                if (e.target.value.length > 0 ) { 
                    delete errorsClone['currentTreatment'];

                for(var i = 0; i < this.props.otherITs.length; i++) {
                        if (this.props.otherITs[i].key != undefined) {
                            if(this.props.otherITs[i].key === e.target.value ) {
                                errorsClone.currentTreatment = "Therapy already exists"
                            }
                        }
                    }

                 
                    this.setState({
                        errors:errorsClone,
                        isDirty:true
                    })

                   
                    const isValid = Object.keys(errorsClone).length === 0    
                    if (isValid){
                        this.props.onChange(e.target.value, this.props.children.value,this.props.index)
                    }
                }
                else {
                    this.setState(
                        {
                            isDirty:false
                        }
                    )                    
                }
            }  
            else { 
                    
                    let errorsClone = Object.assign({},this.state.errors);

                    for(var i = 0; i < this.props.otherITs.length; i++) {
                        if (this.props.otherITs[i].key != undefined) {
                            if(this.props.otherITs[i].key === e.target.value ) {
                                errorsClone.currentTreatment = "Therapy already exists"
                                this.props.otherITs.splice(this.props.index, 1);
                            }
                        }
                    }

                 
                    this.setState({
                        errors:errorsClone,
                        isDirty:true
                    })


                    const isValid = Object.keys(errorsClone).length === 0    
                    if (isValid){
                        this.props.onChange(e.target.value, this.props.children.value,this.props.index)
                    }
                }
        }

 

    renderResult(selectedDose){
        var result = null;
        if (selectedDose == this.props.doses[0].controlValueId) {
            result = this.props.doses[0].controlValue;
        }
        else if (selectedDose == this.props.doses[1].controlValueId) {
            result = this.props.doses[1].controlValue;
        } 
        else if (selectedDose == this.props.doses[2].controlValueId) {
            result = this.props.doses[2].controlValue;
        }
        else if (selectedDose == this.props.doses[3].controlValueId) {
            result = this.props.doses[3].controlValue;
        }
        else if (selectedDose == this.props.doses[4].controlValueId) {
            result = this.props.doses[4].controlValue;
        }
        else if (selectedDose == this.props.doses[5].controlValueId) {
            result = this.props.doses[5].controlValue;
        }
        
    
    
    if (result) {
        return (
            <span>
            <span className="ml-15 mb-0 current-medications-dose-selected text-success current-medications-treatment-dose-name">
                <i className="fa fa-arrow-right mr-5" aria-hidden="true"></i>
            {result}</span>
            {
                !this.state.editMode &&  !this.props.isComplete &&
                <div className="current-medications-dose-remove-inline">
                                                <i className="fa fa-trash ml-5 text-danger" onClick={() => this.remove()} aria-hidden="true"></i>
                                                </div>
                
            }
           </span>
        )
    }
    else {
        return null
    }
}
    edit(){
        if (!this.props.isComplete) {
            this.setState({
                editMode:true
            })
        this.props.handleOtherITToggle(this.props.index)
    }
    }
    
     save(treatment, doseId){
        let errors ={}

        if (this.refs.currentTreatment.value.length === 0) {
            errors.currentTreatment = "Therapy required"
        }
       
        this.setState({errors}); 
        
                const isValid = Object.keys(errors).length === 0    
                   
                if (isValid)
                 {
        this.props.update(treatment, doseId,this.props.index)
        
         this.setState({
            isDirty:false,
            editMode:false
        })
    }
    }
    cancel(){
       this.setState({
           editMode:false
       })
    }

    remove(){

        this.props.remove(this.props.index);
        this.setState({
            editMode:false
        })
     }
 
     renderNormal(){
     
         return ( 
                <div> {!this.props.isComplete  &&
                   <i className="fa fa-plus-circle text-primary fa-pointer mr-10" 
                   data-tip="React-tooltip" data-for="edit-other-therapy-tooltip"
                   aria-hidden="true" onClick={() => this.edit()}></i> }
                   <span className="current-medications-treatment-name">{this.props.children.key}</span>
                  
                    { this.renderResult(this.props.children.value)}



                    <ReactTooltip id='edit-other-therapy-tooltip' place="top" type="info" effect="float" className='tooltip-theme' aria-haspopup='true' role='example'>
                           <span>Edit therapy and dose</span>
            </ReactTooltip> 
                </div>
         )
     }
 
     renderForm(){
     return ( 
        
                <div>
                            <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => this.save(this.refs.currentTreatment.value, this.props.children.value)}></i>
                            <div className={classnames('current-medications-treatment-name mr-5',{error:!!this.state.errors.currentTreatment })}>

                                <input ref="currentTreatment" maxLength="50" className="form-control" type="text" defaultValue={this.props.children.key} onChange={this.treatment_OnChange} 
                                                        onMouseDown={ (e) => e.target.focus() }> </input>
                                <span className={classnames('',{'visible error info':!!this.state.errors.currentTreatment,hidden:!!!this.state.errors.currentTreatment})}>{this.state.errors.currentTreatment}</span>
                                </div>
                               
                            { this.renderResult(this.props.children.value)}
                    
                            <div className="block current-medications-dose-container no-pad">
                                        <div className="block-content-no-border">
                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value, this.props.doses[0].controlValueId)}>{this.props.doses[0].controlValue}</span></div>
                                                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value, this.props.doses[1].controlValueId)}>{this.props.doses[1].controlValue}</span></div>
                                                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value,this.props.doses[2].controlValueId)}>{this.props.doses[2].controlValue}</span></div>
                                                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value, this.props.doses[3].controlValueId)}>{this.props.doses[3].controlValue}</span></div>
                                                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value, this.props.doses[4].controlValueId)}>{this.props.doses[4].controlValue}</span></div>
                                                                            <div className="current-medications-dose"><i className="mr-5" aria-hidden="true">-</i>
                                                <span  onClick={() => this.save(this.refs.currentTreatment.value, this.props.doses[5].controlValueId)}>{this.props.doses[5].controlValue}</span></div>
                                        

                                                {/* <div className="current-medications-dose-remove" >
                                                <i className="fa fa-trash mr-5 text-danger" aria-hidden="true"></i>
                                                <span className="text-danger" onClick={() => this.remove()}>{'Delete'}</span></div> */}
                                        
                                        </div>
                            </div>                    
                    </div>
       
         );
     }
 
 
     render() {
         if(this.state.editMode && this.props.index == this.props.editIndex && !this.props.isComplete ){
             return this.renderForm()
         }
         else {
             return this.renderNormal()
         }
     }
};


export default CurrentMedicationsOther;