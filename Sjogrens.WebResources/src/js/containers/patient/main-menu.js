import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import PanelDefault from '../../components/generic/panel-default';
import MainMenuCard from '../../components/patient/main-menu-card';

import {paths} from '../../constants/paths/environment';
class MainMenu extends React.Component{
    constructor(props) {
        super(props);   
        this.state = {
            token:null
        }
    }


    componentWillReceiveProps(nextProps){
      //  console.log('top 1 nav rec')
      //  console.log(nextProps);
             if (nextProps.patientDetailsResult.requestRecieved && nextProps.patientDetailsResult.data ){ 
                 this.setState({
                     token:nextProps.patientDetailsResult.data.token
                 })
               }
         }

    componentDidMount () {
      //  console.log('top 1 nav mount')
            if(this.props.patientDetailsResult.requestRecieved && this.props.patientDetailsResult.data ){
                
                this.setState({
                    token:this.props.patientDetailsResult.data.token
                })

               }
           }
    


    render (){
        return(
            <MainMenuCard token={this.state.token} />
        );
    }
}

//export default MainMenu;


function mapStateToProps(state) {
    return {
        patientDetailsResult: state.patientDetailsResult
    };
}

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({getPatientDetails: getPatientDetails,patientDetailsClear:patientDetailsClear}, dispatch);
// }

 export default connect(mapStateToProps,null, null, {pure:false})(MainMenu);
