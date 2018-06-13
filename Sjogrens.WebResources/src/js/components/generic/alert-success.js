import React from 'react';
import { NavLink } from 'react-router-dom'

export default function AlertSuccess({heading, message, dismissable}){
    return(
        <div className="alert alert-success">
            {
                dismissable && <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            }
            <span className="fa fa-check-circle fa-4 mr-1"></span> <strong>{heading}</strong>
            <hr className="message-inner-separator-success" />
            <p>{message}</p>
        </div>

    );
}