import React from 'react';

export default function FunkyRadioOneOption({caption,
                                                optionName,
                                                optionOneId,
                                                optionOneHtmlFor,
                                                optionOneChecked, optionOneDefaultValue, optionOneOnClick, optionOneCaption}){
    return(
                <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-8 col-md-4 col-sm-12">{caption}</label>
                                                <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                    <div className="funkyradio-success">
                                                            <input type="Radio" name={optionName}  id={optionOneId} 
                                                            checked={optionOneChecked} 
                                                            defaultValue={optionOneDefaultValue} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}