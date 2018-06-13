import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PanelDefault from '../../components/generic/panel-default';
import {getConsent, consentClear, consentUpdateAndGet, consentUpdateWithToken, consentUpdate} from '../../actions/consent';
import ConsentForm from '../../components/patient/consent-form';

class Consent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getConsentGlobalError:''
        };
        this.getConsent = this.getConsent.bind(this);
       this.handleGetConsentGlobalError = this.handleGetConsentGlobalError.bind(this);
       this.handleSaveConsent = this.handleSaveConsent.bind(this);
    }

    componentDidMount () {
       // console.log('consent loaded');
        this.props.consentClear(); 
        if(this.props.token){
             this.getConsent(this.props.token);
           }
       }

    componentWillUnmount(){
        this.props.consentClear(); 
       }

       
    handleGetConsentGlobalError(error){
      //  console.log('handleGetConsentGlobalError');        
      //  console.log(error);
        this.setState({
            getConsentGlobalError:error.message,
        })
      }

      getConsent(token){       
        var consentGetParams = {
                token: token
        }
          //  console.log('getConsent');
        this.props.getConsent(consentGetParams).catch(this.handleGetConsentGlobalError)
        }

handleSaveConsent(consentPostParams){
 //  console.log('handleSaveConsent')
    if (consentPostParams.token.length == 0)
        consentPostParams.token = this.props.patientDetailsResult.data.token

//console.log('handleSaveConsent')
//console.log( consentPostParams);

    var consentGetParams = {
        token: consentPostParams.token
    }

   // console.log('consentUpdateAndGet')
    //console.log(consentGetParams)
   // console.log(consentPostParams)
    


  //  console.log('this.props.consentUpdateAndGet(consentPostParams,consentGetParams)')
  //  this.props.consentUpdateAndGet(consentPostParams,consentGetParams)//.catch(this.handleGetConsentGlobalError);
//    this.props.consentUpdateWithToken(consentGetParams.token,consentPostParams);
// this.props.consentUpdate(consentPostParams)
// .then(p=> this.props.getConsent(consentGetParams)).catch(this.handleGetConsentGlobalError);


// if (token){
//     consentPostParams.token  = token


//     var consentGetParams = {
//        token: token
//    }


this.props.consentUpdate(consentPostParams)
.then(cu=>this.props.getConsent(consentGetParams))

//this.props.spineSave(patientAddWithAuditParams).then(p=>this.props.consentUpdateWithToken(p.token,consentPostParams))
    // .catch(this.handleSpineSaveError);

    //console.log('consentUpdateAndGet')

    }


    render (){
        {
            return (<ConsentForm consent={this.props.consentResult}  handleSaveConsent={this.handleSaveConsent}/>)
        }
    }
}

function mapStateToProps(state) {
    return {
        consentResult: state.consentResult,
        patientDetailsResult: state.patientDetailsResult
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({getConsent: getConsent, consentClear:consentClear, consentUpdateAndGet:consentUpdateAndGet, consentUpdateWithToken:consentUpdateWithToken, consentUpdate:consentUpdate}, dispatch);
}

 export default connect(mapStateToProps,matchDispatchToProps)(Consent);
