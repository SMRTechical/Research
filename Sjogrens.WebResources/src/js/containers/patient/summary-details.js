import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import TicTacToe from '../../games/tic-tac-toe';
//import SummaryChart from  '../../components/chart/summary-chart';
class SummaryDetails extends React.Component{
    constructor(props) {
        super(props);       
    }

    render (){
        return(
            <div>

                <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Patient Summary</h3>
                        </div>
                        <div className="panel-body scrollbar-v-visit-content">
                        <div className="row">
                            <div className="col-md-12 text-center"> 
                            <div className="page-header">Under Construction</div>  
            
                            <div id="construction"></div>         
            
            
                            </div>
                            </div>
                        </div>
                    </div>
        </div>
        );
    }
}

export default SummaryDetails;
