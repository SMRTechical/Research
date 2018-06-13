import React from 'react';

export default function FunkyRadioThreeOptionsVertical({caption,
                                                optionName,
                                                optionOneId,
                                                optionTwoId,
                                                optionThreeId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionThreeHtmlFor,
                                                optionOneChecked, optionOneDefaultValue, optionOneOnClick, optionOneCaption,
                                                optionTwoChecked, optionTwoDefaultValue, optionTwoOnClick, optionTwoCaption,
                                                optionThreeChecked, optionThreeDefaultValue, optionThreeOnClick, optionThreeCaption}){
    return(
                <div className="form-group row">
                                                <label htmlFor="attendedUHBpSSClinic" className ="control-label col-lg-12 col-md-12 col-sm-12">{caption}</label>
                                                <div className="col-md-offset-6 col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-success">
                                                            <input type="Radio" name={optionName}  id={optionOneId} 
                                                            checked={optionOneChecked} 
                                                            defaultValue={optionOneDefaultValue} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                    </div>
                                                    <div className="col-md-offset-6 col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-danger">
                                                            <input type="Radio" name={optionName} id={optionTwoId} 
                                                            checked={optionTwoChecked} 
                                                            defaultValue={optionTwoDefaultValue} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                    </div>
                                                    <div className="col-md-offset-6 col-md-6 col-sm-12 funkyradio">
                                                    <div className="funkyradio-default">
                                                            <input type="Radio" name={optionName} id={optionThreeId} 
                                                            checked={optionThreeChecked} 
                                                            defaultValue={optionThreeDefaultValue} 
                                                            onChange={optionThreeOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionThreeHtmlFor}>{optionThreeCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}