import React, { Component } from 'react'
import { Input } from 'antd';

class Text extends Component {

    render(){
        return <Input placeholder={this.props.placeholder} onChange={this.props.onChange} 
        value={this.props.value} style={this.props.style}/>;
    }

}

export default Text;