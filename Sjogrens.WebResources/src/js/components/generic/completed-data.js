import React from 'react';
import { NavLink } from 'react-router-dom'
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat,handleUTCDateTimeFormat} from '../../factory/date-functions'



function renderCompletedBy(completedBy, completedDate){
    return (
        <div>
        <div className="row">
        <div className="col-md-3 text-right">
            <span><strong>By:</strong></span>
        </div>
        <div className="col-md-9 text-left">
        <span className="audit-text">{completedBy}</span>
        </div>
        </div>
        <div className="row">
        
        <div className="col-md-3 text-right">
            <span><strong>On:</strong></span>
        </div>
        <div className="col-md-9 text-left">
        <p className="audit-text">{handleDateTimeFormat(completedDate)}</p>
        </div>
    </div>
    </div>
    )
}


export default function CompletedData({completedBy, completedDate}){ 
    return(
        <div className="audit">
         
            {!!completedBy &&   
                renderCompletedBy(completedBy, completedDate)
            }
        </div>
    );
}