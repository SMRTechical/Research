import React from 'react';
import { NavLink } from 'react-router-dom'
import {handleDateFormat } from '../../factory/date-functions'
import PanelDefault from '../../components/generic/panel-default';
import classnames from 'classnames';

export default function AttendanceCard({dateOfAttendance, newVisit, initialVisit, completed, visitHeaderId}){
    return(
        <div className={classnames('panel',{'panel-success': completed,'panel-primary': !completed})}>
            <div className="panel-heading">
                <h3 className="panel-title text-left">{
                                                        initialVisit && !completed  ? "Initial" : 
                                                        !initialVisit && newVisit && !completed ? "New" : 
                                                        !initialVisit && !newVisit && !completed ? "Current" :
                                                        completed ? "Completed" : "hmmm!"}
                    &nbsp;visit date:&nbsp;{handleDateFormat(dateOfAttendance)} 
                                 {/* {
                                    (initialVisit) ? <span className="ml-5">First visit</span> : null
                                }

                                {
                                    (!initialVisit && newVisit) ? <span className="ml-5">New visit</span> : null
                                }

                                {
                                    (!initialVisit && !newVisit && !completed) ? <span className="ml-5">Existing visit</span> : null
                                }

                                {
                                    (completed) ? <span className="ml-5">Completed visit</span> : null
                                } */}
                </h3>
            </div>
                
    </div>

                   



    );
}