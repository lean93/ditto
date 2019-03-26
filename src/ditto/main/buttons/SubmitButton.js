import React, { Component } from 'react'
import { Button } from 'antd';
import PropTypes from 'prop-types';

class SubmitButton extends Component {
    render() {
        return <Button type="primary" onClick={this.props.onClick} icon={this.props.icon || "search"} style={{ marginLeft: '10px' }}>
                     {this.props.text || this.props.label || "Search"}
              </Button>;
    }
}

SubmitButton.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func
};

export default SubmitButton;