import React from 'react';
import Modal from 'react-modal';
class ModalDefault extends React.Component{
constructor(props) {
        super(props);
    }



render (){
    return(

        <Modal isOpen={this.props.isOpen} 
                onAfterOpen={this.props.onAfterOpen}  
                onRequestClose={this.props.onRequestClose} 
                style={this.props.style} 
                contentLabel={this.props.contentLabel}
                shouldCloseOnOverlayClick={false}
                role="dialog">
           {this.props.children}
            </Modal>
         
    );


}
}


export default ModalDefault;