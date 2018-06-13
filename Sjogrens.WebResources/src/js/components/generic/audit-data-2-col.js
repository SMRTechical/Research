import React from 'react';
import { NavLink } from 'react-router-dom'
import {padDayMonthWithZero,handleDateFormat,handleDateTimeFormat,handleUTCDateTimeFormat} from '../../factory/date-functions'


function renderCreatedBy(createdBy, createdDate){
return (
    <div>
    <div className="row">
    <div className="col-md-6 text-right">
        <span><strong>Created By:</strong></span>
    </div>
    <div className="col-md-6 text-left">
    <span className="audit-text">{createdBy}</span>
    </div>
    </div>
    <div className="row">
    <div className="col-md-6 text-right">
        <span><strong>Created Date:</strong></span>
    </div>
    <div className="col-md-6 text-left">
    <span className="audit-text">{handleDateTimeFormat(createdDate)}</span>
    </div>
</div>
</div>
)
}

function renderUpdatedBy(lastUpdatedBy, lastUpdatedDate){
    return (
        <div>
        <div className="row">
        <div className="col-md-6 text-right">
            <span><strong>Last Updated By:</strong></span>
        </div>
        <div className="col-md-6 text-left">
        <span className="audit-text">{lastUpdatedBy}</span>
        </div>
   </div>
        <div className="row">
        <div className="col-md-6 text-right">
            <span><strong>Last Updated Date:</strong></span>
        </div>
        <div className="col-md-6 text-left">
        <p className="audit-text">{handleDateTimeFormat(lastUpdatedDate)}</p>
        </div>
    </div>
    </div>
    )
}


export default function AuditData2Col({createdBy, createdDate, lastUpdatedBy, lastUpdatedDate}){ 
    return(
        <div>
            {!!createdBy && 
                renderCreatedBy(createdBy, createdDate)
            }
            {!!lastUpdatedBy &&   
                renderUpdatedBy(lastUpdatedBy, lastUpdatedDate)
            }
        </div>
    );
}