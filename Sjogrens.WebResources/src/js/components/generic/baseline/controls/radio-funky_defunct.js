import React from 'react';
import { NavLink } from 'react-router-dom'

export default function RadioFunky({funkyRadioClass, groupName, ref, id, defaultChecked, defaultValue, onClick}){
    return(
                                    <div className={funkyRadioClass}>
                                            <input type="Radio" name={groupName} ref={ref} id={id} defaultChecked={defaultChecked} defaultValue={defaultValue} onClick={()=>onClick}/>
                                            <label className="radio-inline " htmlFor={id}>Yes</label>
                                    </div>
    );
}