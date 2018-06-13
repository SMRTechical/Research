import React from 'react';
import { NavLink } from 'react-router-dom'
import {RadioFunky} from './radio-funky'

export default function RadioOptions3({funkyRadioClass, groupName, labelText, ref, id, defaultChecked, defaultValue, onClick}){
    return(
        <label htmlFor={groupName} className ="control-label col-md-9">{labelText}</label>
                                <div className="col-md-3 funkyradio">
                                    <RadioFunky funkyRadioClass={funkyRadioClass} groupName={groupName} ref={ref} />
                                    <div className="funkyradio-success">
                                            <input type="Radio" name={groupName} ref={ref} id={id} defaultChecked={defaultChecked} defaultValue={defaultValue} onClick={()=>onClick}/>
                                            <label className="radio-inline " htmlFor={id}>Yes</label>
                                    </div>
                                    <div className="funkyradio-danger">
                                            <input type="Radio" name={groupName} ref={ref}  id={id} defaultChecked={defaultChecked} defaultValue={defaultValue} onClick={this.attendedUHBpSSClinic_onChange}/>
                                            <label className="radio-inline" htmlFor={id}>No</label>
                                    </div>
                                    <div className="funkyradio-default">
                                            <input type="Radio" name={groupName} ref={ref}  id={id} defaultChecked={defaultChecked} defaultValue={defaultValue} onClick={this.attendedUHBpSSClinic_onChange}/>
                                            <label className="radio-inline" htmlFor={id}>N/A</label>
                                    </div>
                                </div>

    );
}