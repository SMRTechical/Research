import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SlideOnEnter extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                transitionAppear={true}
                transitionAppearTimeout={1000}>
                    {this.props.children}
                    </ReactCSSTransitionGroup>
                </div>
        )
    }
}


export default SlideOnEnter;