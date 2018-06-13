import React from 'react';

import classnames from 'classnames'

import FadeIn from '../../../../components/animation/fade-in';

export default function FunkyRadioFourOptionsActivityScore({caption,optionsCount,captionClass,optionsClass,
                                                optionOneDisabled,
                                                optionTwoDisabled,
                                                optionThreeDisabled,
                                                optionFourDisabled,
                                                optionOneId,
                                                optionTwoId,
                                                optionThreeId,
                                                optionFourId,
                                                optionOneHtmlFor,
                                                optionTwoHtmlFor,
                                                optionThreeHtmlFor,
                                                optionFourHtmlFor,
                                                optionOneChecked,  optionOneDefaultValue,  optionOneOnClick, optionOneCaption,
                                                optionTwoChecked, optionTwoDefaultValue,  optionTwoOnClick, optionTwoCaption,
                                                optionThreeChecked, optionThreeDefaultValue,  optionThreeOnClick, optionThreeCaption,
                                                optionFourChecked, optionFourDefaultValue,  optionFourOnClick, optionFourCaption,
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
                                                           <div className={`funkyradio ${optionsClass}`}>    
                                                        <div className={classnames('funkyradio-default',{invisible: optionThreeDisabled})}>
                                                                <input type="checkbox" name={optionThreeId} id={optionThreeId} 
                                                                checked={optionThreeChecked } 
                                                                defaultValue={optionThreeDefaultValue} 
                                                                onChange={optionThreeOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionThreeHtmlFor}>{optionThreeCaption}</label>
                                                        </div>
                                                               
                                                               </div>

                                                               <div className={`funkyradio ${optionsClass}`}>
                                                        <div className={classnames('funkyradio-default',{invisible: optionFourDisabled})}>
                                                                <input type="checkbox" name={optionFourId} id={optionFourId} 
                                                                checked={optionFourChecked } 
                                                                defaultValue={optionFourDefaultValue} 
                                                                onChange={optionFourOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionFourHtmlFor}>{optionFourCaption}</label>
                                                                                                              </div>
                                                    
</div>
                                                    </div>
                                                    </div>          
                                                      
                                                        </div>
                                                     
                                                     
                                </div>
                               
                               

        );
}