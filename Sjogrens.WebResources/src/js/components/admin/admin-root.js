import React from 'react';

import classnames from 'classnames'
import { NavLink, Link, Route } from 'react-router-dom'
import PanelDefault from '../generic/panel-default';
import {paths} from '../../constants/paths/environment'

export class AdminRoot extends React.Component {
    constructor(props) {
        super(props);
       
       
    }

    render() {
    return ( 
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <PanelDefault title={"Admin"}>                   
                            <div className="btn-group-vertical">
                                <Link className="btn btn-success" to={paths.indexLink}><i className="fa fa-search" aria-hidden="true"></i>&nbsp;Patient Search</Link>
                                <a className="btn btn-success" href="#"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;User Admin</a>
                                <a className="btn btn-success"href="#">Visit Admin</a>
                            </div>
                        </PanelDefault>
                    </div>
                </div>
            </div>
        </div>
    );
}
};


export default AdminRoot;
