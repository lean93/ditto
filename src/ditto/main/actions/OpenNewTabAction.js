import React, { Component } from 'react'
import { Button } from 'antd';

class OpenNewTabAction extends Component {
        openInNewTab(id, url) {
           const urlSplited = url.split("!val");
           let finalUrl;
           if (urlSplited.length === 1) {
                finalUrl = urlSplited[0] + id;
           } else {
                finalUrl = urlSplited[0] + id + urlSplited[1];
           }
           window.open(finalUrl, "_blank")
        }

        render() {
                return (
                        <Button key="openNewTab" type="primary" icon={this.props.icon || "export"}
                                onClick={() => this.openInNewTab(this.props.id ,this.props.mainUrl + this.props.url)} style={{ marginTop: '3px' }}>
                                {this.props.textButton}
                        </Button>
                );
        }

}

export default OpenNewTabAction;