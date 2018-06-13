import React from 'react';

export default function FunkyRadioTwoOptionsDamageIndices({caption,captionClass,optionsClass,
                                                                optionOneId,
                                                                optionTwoId,
                                                                optionOneHtmlFor,
                                                                optionTwoHtmlFor,
                                                                optionOneChecked, optionOneDefaultValue, optionOneOnClick, optionOneCaption,
                                                                optionTwoChecked, optionTwoDefaultValue, optionTwoOnClick, optionTwoCaption}){
    return(
                <div className="form-group row">
                        <div className={`control-label ${captionClass}`} dangerouslySetInnerHTML={{ __html: caption }}></div>
                                               
                                                <div className={`funkyradio ${optionsClass}`}>
                                                    <div className="funkyradio-danger">
                                                            <input type="checkbox" name={optionOneId}  id={optionOneId} 
                                                            checked={optionOneChecked} 
                                                            defaultValue={optionOneDefaultValue} 
                                                            onChange={optionOneOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                    </div>
                                                    <div className="funkyradio-success">
                                                            <input type="checkbox" name={optionTwoId} id={optionTwoId} 
                                                            checked={optionTwoChecked} 
                                                            defaultValue={optionTwoDefaultValue} 
                                                            onChange={optionTwoOnClick}/>
                                                            <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                    </div>
                                                </div>
                                            </div>



        );
}