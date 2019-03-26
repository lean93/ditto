import React, { Component } from 'react'
import { Button } from 'antd';

class ClearButton extends Component {

    render() {
        return <Button type="default" onClick={this.props.onClick} icon={this.props.icon || "reload"} style={{ marginLeft: '10px' }}>
                     {this.props.text || this.props.label || "Search"}
              </Button>;
    }

}

export default ClearButton;