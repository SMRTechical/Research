import React from 'react';
import { NavLink } from 'react-router-dom'

export default function AlertDanger({heading, message, dismissable}){
    return(
        <div className="alert alert-danger">
            {
                dismissable && <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            }
            <span className="fa fa-exclamation-triangle fa-4 mr-1"></span> <strong>{heading}</strong>
            <hr className="message-inner-separator-danger" />
            <p>{message}</p>
        </div>

    );
}