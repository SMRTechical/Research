import React from 'react';

import classnames from 'classnames'

export default function FunkyCheckboxThreeOptions({caption,captionClass,optionsClass,
                                                optionOneId,
                                                optionTwoId,
                                                optionThreeId,
                                                optionFourId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionThreeHtmlFor,
                                                optionFourHtmlFor,
                                                optionOneChecked,  optionOneOnClick, optionOneCaption,
                                                optionTwoChecked,  optionTwoOnClick, optionTwoCaption,
                                                optionThreeChecked,  optionThreeOnClick, optionThreeCaption,
                                                optionFourChecked,  optionFourOnClick, optionFourCaption}){
    return(
                <div className="form-group row">
                                                <div className={`control-label page-header ${captionClass}`}>{caption}</div>
                                                <div className={`funkyradio ${optionsClass}`}>
                                                    <div className="funkyradio-danger">
                                                            <input type="checkbox" name={optionOneId}  id={optionOneId} 
                                                            checked={optionOneChecked ? optionOneChecked :false} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                    <div className="funkyradio-warning">
                                                            <input type="checkbox" name={optionTwoId} id={optionTwoId} 
                                                            checked={optionTwoChecked ? optionTwoChecked :false} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                    <div className="funkyradio-success">
                                                            <input type="checkbox" name={optionThreeId} id={optionThreeId} 
                                                            checked={optionThreeChecked ? optionThreeChecked :false} 
                                                            onChange={optionThreeOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionThreeHtmlFor}>{optionThreeCaption}</label>
                                                    </div>
                                                   
                                                </div>
                                            </div>



        );
}