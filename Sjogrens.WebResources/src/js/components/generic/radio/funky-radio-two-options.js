import React from 'react';

export default function FunkyRadioTwoOptions({caption,
                                                optionName,
                                                optionOneId,
                                                optionTwoId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionOneChecked, optionOneDefaultValue, optionOneOnClick, optionOneCaption,
                                                optionTwoChecked, optionTwoDefaultValue, optionTwoOnClick, optionTwoCaption}){
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
                                                    <div className="funkyradio-danger">
                                                            <input type="Radio" name={optionName} id={optionTwoId} 
                                                            checked={optionTwoChecked} 
                                                            defaultValue={optionTwoDefaultValue} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}