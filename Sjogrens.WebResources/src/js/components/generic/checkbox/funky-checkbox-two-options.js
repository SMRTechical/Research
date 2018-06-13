import React from 'react';

import classnames from 'classnames'

export default function FunkyCheckboxTwoOptions({caption,captionClass,optionsClass,
                                                optionOneId,
                                                optionTwoId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionOneChecked,  optionOneOnClick, optionOneCaption,
                                                optionTwoChecked,  optionTwoOnClick, optionTwoCaption}){
    return(
                <div className="form-group row">
                                                <div className={`control-label ${captionClass}`}>{caption}</div>
                                                <div className={`funkyradio ${optionsClass}`}>
                                                    <div className="funkyradio-success">
                                                            <input type="checkbox" name={optionOneId}  id={optionOneId} 
                                                            checked={optionOneChecked ? optionOneChecked :false} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                    <div className="funkyradio-danger">
                                                            <input type="checkbox" name={optionTwoId} id={optionTwoId} 
                                                            checked={optionTwoChecked ? optionTwoChecked :false} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}