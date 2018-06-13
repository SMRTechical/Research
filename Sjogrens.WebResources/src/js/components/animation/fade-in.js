import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FadeIn extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>

<ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionLeave={true}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppearTimeout={1000}>
                    {this.props.children}
                    </ReactCSSTransitionGroup>
                </div>
        )
    }
}


export default FadeIn;