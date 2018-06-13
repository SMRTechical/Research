import React from 'react';
import classnames from 'classnames'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';


// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Handle = Slider.Handle;

// const handle = (props) => {
//   const { value, dragging, index, ...restProps } = props;
//   return (
//     <Tooltip
//       prefixCls="rc-slider-tooltip"
//       overlay={value}
//       visible={dragging}
//       placement="top"
//       key={index}
//     >
//       <Handle value={value} {...restProps} />
//     </Tooltip>
//   );
// };

export default function RCSlider({caption,beforeText, afterText, min,max,marks,step, defaultValue,onChange,isComplete}){
    return(
        <div className="row">
        <div className="col-md-12"> 
        <div className="page-header" dangerouslySetInnerHTML={ { __html: caption} }></div>
            <div className="block block-inclusion-criteria-head no-pad">
     <div className="block-content-no-border row row-eq-height ">
         <div className="col-md-1">
            <strong>{beforeText}</strong>
             </div>
             <div className="col-md-10">
                 <Slider min={min} 
                            max={max} 
                            step={step} marks={marks}  
                            defaultValue={defaultValue} 
                            onChange={onChange}
                            trackStyle={{ backgroundColor: '#0064ca'}}
                            disabled={isComplete}
                            />
             </div>
             <div className="col-md-1">
             <strong>{afterText}</strong>
             </div>
    </div>
    </div>
</div>
</div>
        );
}