import React, { Component } from 'react'

export const DownloadContext = React.createContext();

export class DownloadProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idsReportDownloading: []
        }
        this.addElement = this.addElement.bind(this);
        this.removeElement = this.removeElement.bind(this);
    }

    addElement(id){
        const processList = this.state.idsReportDownloading.concat(id);
        this.setState({
            idsReportDownloading: processList
        })
        return processList;
    };

    removeElement(id){
        const processList = this.state.idsReportDownloading.filter((content) => {
            return content !== id;
        });
        this.setState({
            idsReportDownloading: processList
        })
        return processList;
    };

    render() {
        return (
            <DownloadContext.Provider value={{
                list: this.state.idsReportDownloading,
                add: this.addElement,
                remove: this.removeElement,
            }}>
                {this.props.children}
            </DownloadContext.Provider>
        );
    }
}