import React, { Component } from 'react'
import { Pagination, Table } from 'antd';
import { getActionsComponents } from './JsonParser'
import ActionContainer from './actions/ActionContainer';

class TableTest extends Component {

    getResultExample(data){
        const elementList = data.inputList || [];
        let resultExample1={};
        let resultExample2={};
        elementList.forEach(element => {
            resultExample1[element.keyElement] = element.keyElement + "Example1"; 
            resultExample2[element.keyElement] = element.keyElement + "Example2";
        });
        return Object.keys(resultExample1).length !== 0?[resultExample1, resultExample2]:[];
    }

    render() {
        const actionsObj={
            reset: this.props.reset,
            refetch: this.props.refetch,
            mainUrl: this.props.mainUrl
        }
        const paginationComponent = this.props.dataQuery.pagination? 
        <Pagination position='top' showSizeChanger current={(this.props.offset || 0) +1} 
        total={this.props.total || 0} pageSize={this.props.limit || 0}
        style={{marginBottom:"15px"}} size="middle" onShowSizeChange={this.props.onChangePagination}
        onChange={this.props.onChangePagination}/>
        : null;
        let firstRecord = this.props.dataQuery.inputList || [];
        return (<React.Fragment>
            {paginationComponent}
            <Table
                pagination={!this.props.dataQuery.pagination}
                dataSource={this.getResultExample(this.props.dataQuery)}
                rowKey={firstRecord[0]?firstRecord[0].keyElement:"id"}
                size='small'
                bordered={true}
                scroll={{ x: true }}
                rowClassName="table-small-font-size selectionable-table"
                onRow={(record) => ({
                    onClick: () => {
                        this.props.onSelectRow(record);
                    },
                })}
                title={() => <ActionContainer selected={this.props.selected} reset={this.props.reset}>
                                {getActionsComponents(this.props.dataQuery, this.props.selected, actionsObj, true)}
                            </ActionContainer>}
            >
                {this.props.children}
            </Table>
        </React.Fragment>
        );
    }

}

export default TableTest;