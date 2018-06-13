import React from 'react';

import classnames from 'classnames'

import FadeIn from '../../../../components/animation/fade-in';

export default function FunkyRadioFourOptionsESSDAI({caption,optionsCount,captionClass,optionsClass,
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
                                                isComplete, isOpen, showToggle, toggle, weighting, weightingClass,calculatedWeighting,
                                                renderWeightingDetails, weightingHeading, weightingDetails, renderWeightingScore,
                                                detailClass}){
    return(
        <div className="form-group">
                        <div className="row">
                                <div className={`control-label ${captionClass}`}>
                                        { 
                                                showToggle ? !isComplete ? !isOpen ?       
                                                <i className="fa fa-plus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => toggle()}></i>:
                                                <i className="fa fa-minus-circle text-primary fa-pointer mr-10" aria-hidden="true" onClick={() => toggle()}></i>:
                                                        null :null} 
                                                                {caption}</div>
                                                        <div className={`funkyradio ${optionsClass}`}>
                                                                
                                                        <div  className={classnames('funkyradio-default',{invisible: optionOneDisabled})}>
                                                                <input type="checkbox" name={optionOneId}  id={optionOneId} 
                                                                checked={optionOneChecked} 
                                                                defaultValue={optionOneDefaultValue} 
                                                                onChange={optionOneOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionOneHtmlFor}>{optionOneCaption}</label>
                                                        </div>
                                                               

                                                        


                                                        <div className={classnames('funkyradio-default',{invisible: optionTwoDisabled})} >
                                                                <input type="checkbox" name={optionTwoId} id={optionTwoId} 
                                                                checked={optionTwoChecked} 
                                                                defaultValue={optionTwoDefaultValue} 
                                                                onChange={optionTwoOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionTwoHtmlFor}>{optionTwoCaption}</label>
                                                        </div>
                                                               
                                                               
                                                        <div className={classnames('funkyradio-default',{invisible: optionThreeDisabled})}>
                                                                <input type="checkbox" name={optionThreeId} id={optionThreeId} 
                                                                checked={optionThreeChecked } 
                                                                defaultValue={optionThreeDefaultValue} 
                                                                onChange={optionThreeOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionThreeHtmlFor}>{optionThreeCaption}</label>
                                                        </div>
                                                               
                                                        <div className={classnames('funkyradio-default',{invisible: optionFourDisabled})}>
                                                                <input type="checkbox" name={optionFourId} id={optionFourId} 
                                                                checked={optionFourChecked } 
                                                                defaultValue={optionFourDefaultValue} 
                                                                onChange={optionFourOnClick}/>
                                                                <label className="radio-inline" htmlFor={optionFourHtmlFor}>{optionFourCaption}</label>
                                                                                                              </div>
                                                    

                                                              
                                                      
                                                        </div>
                                                     
                                                        <div className={weightingClass}>
                                                                <span className="mr-5 weighting-header pull-left">Weighting: </span><span className="mr-5"><strong>{weighting}</strong></span> 
                                                              

                                                                {
                                                                (calculatedWeighting || parseInt(calculatedWeighting) >= 0) ? renderWeightingScore(calculatedWeighting):null
                                                                }
                                                        </div>
                                </div>
                                { isOpen &&
                                        <FadeIn>
                                                <div className="row">
                                                        <div className={detailClass}>
                                                        <div className="block-content-no-border">
                                                        <div className="panel panel-default">
                                                                { weightingHeading &&
                                                                <div className="panel-heading font-italic">

                                                                <strong  dangerouslySetInnerHTML={ { __html: weightingHeading} } >
                                                                 </strong>
                                                                </div>
                                                                }
                                                                <div className="panel-body">
                                                                {renderWeightingDetails(weightingDetails)}
                                                                </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                </div>
                                        </FadeIn>
                                                     }
                               

                </div>
        );
}