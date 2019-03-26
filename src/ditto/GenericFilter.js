import React, {Component} from 'react';
import {getInputFilters, getColumnsTable, isEmptyValue} from './main/JsonParser'
import FilterContainer from './main/FilterContainer';
import TableResponse from './main/TableResponse';
import TableTest from './main/TableTest';
import {message} from 'antd'
import { DownloadProvider } from './context/Download.context';

class GenericFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query:{},
            selectedRow:null,
            refetch: null,
            showErrors:false
        }
        this.onSearch = this.onSearch.bind(this);
        this.onSelectRow = this.onSelectRow.bind(this);
        this.onResetRow = this.onResetRow.bind(this);
        this.saveRefetch = this.saveRefetch.bind(this);
        this.hideErrors = this.hideErrors.bind(this);
        this.onChangePagination = this.onChangePagination.bind(this);
    }

    onSearch(query, skipValidation){
        const listRequired = this.getRequeriedFields(this.props.data);
        const listPriority = this.getPriorityFields(this.props.data);
        const isNotEmpty = listRequired.length>0 && listPriority.length>0
        if(!skipValidation && isNotEmpty && listRequired.every( elem => isEmptyValue(query[elem])) && listPriority.every(elem=> isEmptyValue(query[elem]))){
            message.info("Debe completar alguno de los campos requeridos",2)
            this.setState({
                showErrors: true
            })
        }else{
            if(this.props.data.pagination){
                query.offset = this.state.query.offset || 0
                query.limit = this.state.query.limit || 10
            }else{
                delete query.offset;
                delete query.limit;
            }
            this.setState({
                query: query,
                showErrors: false
            })
            if(this.props.onlyTest){
                console.log("Searching this variables:");
                console.log(query);
            }
        }
        
    }

    hideErrors(){
        if(this.state.showErrors){
            this.setState({
                showErrors: false
            })
        }
    }
    saveRefetch(refetch){
        this.state.refetch = refetch;
    }
    onSelectRow(record){
        this.setState({
            selectedRow: record
        })
    }

    onResetRow(){
        this.setState({
            selectedRow: null
        })
    }

    getRequeriedFields(data){
        return (data.inputList || []).filter(elem =>{
            return elem.required;
        }).map(elem=>{
            return elem.keyElement
        });
    }
    
    getPriorityFields(data){
        return (data.inputList || []).filter(elem =>{
            return elem.priority;
        }).map(elem=>{
            return elem.keyElement
        });
    }

    onChangePagination(page, pageSize){
        this.setState({
            query:{
                ...this.state.query,
                offset:page -1,
                limit: pageSize
            },
        })
    }

    render() {
        const tableProps={
            key: "responseTable",
            dataQuery: this.props.data,
            reset: this.onResetRow,
            variables: this.state.query,
            selected: this.state.selectedRow,
            onSelectRow: this.onSelectRow,
            saveRefetch: this.saveRefetch,
            refetch: this.state.refetch,
            mainUrl: this.props.mainUrl,
            customPagination: this.props.data.pagination,
            onChangePagination: this.onChangePagination,
            offset: this.state.query.offset,
            limit: this.state.query.limit
        }
        const tableComponent = this.props.onlyTest? <TableTest  {...tableProps}> {getColumnsTable(this.props.data)}</TableTest>:
                                                    <TableResponse {...tableProps}>{getColumnsTable(this.props.data)}</TableResponse>;
        return (
            <React.Fragment>
                <DownloadProvider>
                    <FilterContainer key="filterSmart" onSearch={this.onSearch} onlyTest={this.props.onlyTest} showError={this.state.showErrors} 
                                    requeriedElements={this.getRequeriedFields(this.props.data)} hideErrors={this.hideErrors} pagination={this.props.data.pagination}>
                    {getInputFilters(this.props.data)}
                    </FilterContainer>
                    <br/>
                    {tableComponent}
                </DownloadProvider>
            </React.Fragment>
        )
    }
}

export default GenericFilter;
