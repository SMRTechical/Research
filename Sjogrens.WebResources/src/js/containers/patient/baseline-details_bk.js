import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';


class BaselineDetails_bk extends React.Component{
    constructor(props) {
        super(props);
       
    }


    getPatientBaseline
    render (){
        return(
            <div>
                <PanelDefault title={"Baseline"}>
             The Baseline Data
                 </PanelDefault>             
        </div>
        );
    }
}

export default BaselineDetails_bk;
