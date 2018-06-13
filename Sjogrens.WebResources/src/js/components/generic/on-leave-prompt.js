import React from 'react';
import { Prompt } from 'react-router-dom';

class OnLeavePrompt extends React.Component{
constructor(props) {
        super(props);
        this.onLeaveMessage = this.onLeaveMessage.bind(this);
    }

    onLeaveMessage(location) {
        var msg, msgPath;
        var path = location.pathname;
        var idx = path.lastIndexOf('/') ;
      
    
        msg = 'You have unsaved changes.'
        if (idx > 0) {
       var pageName = path.substring(idx + 1);
        msgPath = `Are you sure you want to leave ${pageName} ?`
        }
        else {
            msgPath = `Are you sure you want to leave?`
        }
    return msg + '\n' + msgPath
    
    }

render (){
    return(
        <Prompt 
    when={this.props.changed}
    message={this.onLeaveMessage(location)}
  />
    );


}
}


export default OnLeavePrompt;


