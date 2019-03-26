import React, { Component } from 'react'

class ShowName extends Component {

    render() {
        let buttonSelected={}
        if(this.props.selected){
            buttonSelected={ borderWwidth:'5px',borderStyle:'dotted', padding:10, paddingBottom:0, paddingTop:0};
        }
        return (

          <div style={{marginBottom:'-15px', ...buttonSelected}} key="displayNameContainer"><i><p><b>File Name: </b>{this.props.fileName}</p></i></div>
        );
    }
}

export default ShowName;