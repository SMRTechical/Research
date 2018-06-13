import React from 'react';

export default function FunkyRadioTwoOptionsCODS({caption,
                                                optionName,
                                                optionOneId,
                                                optionTwoId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionOneClass,
                                                optionTwoClass,
                                                optionOneChecked, optionOneDefaultValue, optionOneOnClick, optionOneCaption,
                                                optionTwoChecked, optionTwoDefaultValue, optionTwoOnClick, optionTwoCaption}){
    return(
                <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-8 col-md-4 col-sm-12">{caption}</label>
                                                <div className="col-lg-4 col-md-8 col-sm-12 funkyradio">
                                                    <div  className={`funkyradio-${optionOneClass}`}>
                                                            <input type="checkbox" name={optionName}  id={optionOneId} 
                                                            checked={optionOneChecked} 
                                                            defaultValue={optionOneDefaultValue} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                    <div  className={`funkyradio-${optionTwoClass}`}>
                                                            <input type="checkbox" name={optionName} id={optionTwoId} 
                                                            checked={optionTwoChecked} 
                                                            defaultValue={optionTwoDefaultValue} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}