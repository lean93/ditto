import React, { Component } from 'react'
import { Pagination, Table } from 'antd';
import { Query } from 'react-apollo';
import {buildGraphQlQuery, getActionsComponents} from './JsonParser'
import ActionContainer from './actions/ActionContainer';

class TableResponse extends Component {

    skipquery(data){
        var keys = Object.keys(data);
        return keys.length === 0;
    }

    render() {
        if(this.skipquery(this.props.variables)){
            return null;
        }else{
            const columnInputs = (this.props.dataQuery.inputList || []).filter(elem =>{
                return elem.type === "column"
            })
            return (
                <Query  skip={this.skipquery(this.props.variables)}
                        query={buildGraphQlQuery(this.props.variables, columnInputs, this.props.customPagination)} fetchPolicy='cache-and-network' 
                        variables={this.props.variables}>
                {({data, loading, refetch}) => {
                    let respQuery = data || {}
                    let dataResponse = respQuery[this.props.dataQuery.queryName] || {} 
                    let dataList;
                    let totalRow
                    if(this.props.customPagination){
                        dataList = dataResponse.content || [];
                        totalRow = dataResponse.total || 0
                    }else{
                        dataList = dataResponse ||[];
                        totalRow = dataList.length || 0;
                    } 
                    this.props.saveRefetch(refetch);
                    const actionsObj={
                        reset: this.props.reset,
                        refetch: this.props.refetch,
                        mainUrl: this.props.mainUrl
                    }
                    const paginationComponent = this.props.dataQuery.pagination? 
                    <Pagination position='top' showSizeChanger current={(this.props.offset || 0) +1} 
                    total={totalRow} pageSize={this.props.limit || 0}
                    style={{marginBottom:"15px"}} size="middle" onShowSizeChange={this.props.onChangePagination}
                    onChange={this.props.onChangePagination}/>
                    : null;
                    let firstRecord = this.props.dataQuery.inputList || [];
                    return (<React.Fragment>
                                {paginationComponent}
                                <Table
                                    pagination={!this.props.dataQuery.pagination}
                                    dataSource={dataList}
                                    rowKey={firstRecord[0]?firstRecord[0].keyElement:"id"}
                                    size='small'
                                    loading={loading}
                                    bordered={true}
                                    scroll={{ x: true }}
                                    rowClassName="table-small-font-size selectionable-table"
                                    /*rowSelection={{
                                        selectedRowKeys: [this.props.selectedRow.id],
                                        onSelect: this.props.onSelectReport,
                                        type: 'radio'
                                    }}*/
                                    onRow={(record) => ({
                                        onClick: () => {
                                            this.props.onSelectRow(record);
                                        },
                                    })}
                                    title={() =><ActionContainer selected={this.props.selected} reset={this.props.reset}> 
                                                    {getActionsComponents(this.props.dataQuery, this.props.selected, actionsObj)}
                                                </ActionContainer>}
                                    >
                                    {this.props.children}
                                </Table>
                        </React.Fragment>
                            );
                        }}
                </Query>);
        }
        
    }           

}

export default TableResponse;