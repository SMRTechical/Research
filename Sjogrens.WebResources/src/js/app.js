

import '../scss/main.scss';

import '../img/on-Grey-Loader.gif';
import '../img/page-Not-Found.jpg';
import '../img/bg-qehb.jpg';


// var doSojogrens = true

// if (!window.sjogrensInitConfig){
//     doSojogrens - false;
//     console.error('Error - no config');
// }
// else{
//    console.log(window.sjogrensInitConfig);
// }

// // if(!window.sjogrensInitConfig.organisations || !window.sjogrensInitConfig.organisations.length) {
// //    // console.log(window.sjogrensInitConfig.organisations);
// //    // console.log(window.sjogrensInitConfig.organisations.length);
// //     doSojogrens - false;
// //     console.error('No Organisations in config data');
// // }


 initConfig = {

//    organisations: window.sjogrensInitConfig.organisations,
    enableSessionTimeout: window.sjogrensInitConfig.appConfig.enableSessionTimeout,
    timeoutMinutes: window.sjogrensInitConfig.appConfig.timeoutMinutes,
    timeoutWarningMinutes: window.sjogrensInitConfig.appConfig.timeoutWarningMinutes,
    user: window.sjogrensInitConfig.userInfo
};



import React from 'react'
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allReducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter as Router, StaticRouter, Route } from 'react-router-dom';
import  {App}  from './components/start_up/app'

//store is all data for entire application
const store = createStore(
    allReducers,
   composeWithDevTools(
        applyMiddleware(thunk)
    )
    );

ReactDom.render( 
    <div className="container-fluid mt-20">
        <Router >
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>,
</div>,
document.getElementById('root')
);



