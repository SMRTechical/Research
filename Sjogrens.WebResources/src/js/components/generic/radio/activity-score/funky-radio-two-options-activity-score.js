import React from 'react';

import classnames from 'classnames'

import FadeIn from '../../../../components/animation/fade-in';

export default function FunkyRadioTwoOptionsActivityScore({caption,optionsCount,captionClass,optionsClass,
                                                optionOneDisabled,
                                                optionTwoDisabled,
                                                optionOneId,
                                                optionTwoId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionOneChecked,  optionOneDefaultValue,  optionOneOnClick, optionOneCaption,
                                                optionTwoChecked, optionTwoDefaultValue,  optionTwoOnClick, optionTwoCaption,
                                                isComplete}){
    return(
        <div className="form-group">
            <div className="row">
                <div className={`control-label ${captionClass}`} dangerouslySetInnerHTML={{ __html: caption }}></div>
                     <div className="block block-inclusion-criteria-head no-pad">
                                <div className="block-content-no-border row">
                                         <div className={`funkyradio ${optionsClass}`}>
                                                        <div  className={classnames('funkyradio-default',{invisible: optionOneDisabled})}>
                                                                <input type="checkbox" name={optionOneId}  id={optionOneId} 
                                                                checked={optionOneChecked} 
                                                                defaultValue={optionOneDefaultValue} 
                                                                onChange={optionOneOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                        </div>
                                        </div>
                                        <div className={`funkyradio ${optionsClass}`}>
                                                        <div className={classnames('funkyradio-default',{invisible: optionTwoDisabled})} >
                                                                <input type="checkbox" name={optionTwoId} id={optionTwoId} 
                                                                checked={optionTwoChecked} 
                                                                defaultValue={optionTwoDefaultValue} 
                                                                onChange={optionTwoOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                        </div>
                                        </div>
                                </div>
                        </div> 
                </div>      
        </div>
        );
}