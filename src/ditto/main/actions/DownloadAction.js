import React, { Component } from 'react'
import { Button } from 'antd';
import {downloadFile} from'../../utils/HttpService'
import { DownloadContext } from '../../context/Download.context';

class DownloadAction extends Component {

    onClick(id, url){
        const urlSplited = url.split("!val");
        let finalUrl;
        if(urlSplited.length === 1){
            finalUrl = urlSplited[0] + id;
        }else{
            finalUrl = urlSplited[0] + id + urlSplited[1];
        }
        if(this.props.testAction){
            alert("Get Url: " + finalUrl+ " To download");
        }else{
            this.props.context.add(this.props.id);
            downloadFile(finalUrl, id, this.props.context.remove);
        }
    }

    render() {
        const context = this.props.context;
            return (
                    <Button key="donwloadAction" type="primary" icon={this.props.icon || "download"} loading={context.list.includes(this.props.id)}
                                style={{ marginTop: '3px' }} onClick={() =>this.onClick(this.props.id, this.props.mainUrl + this.props.url)}>
                        {this.props.textButton}
                    </Button>
            );
        }
    
}

export default (props) => (
    <DownloadContext.Consumer>
         {context => <DownloadAction context={context} {...props} />}
    </DownloadContext.Consumer>
);