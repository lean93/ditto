import React, {Component} from 'react'
import { Select } from 'antd';
import {Query} from 'react-apollo';
import {buildGraphQlQueryByName} from './JsonParser';

const Option = Select.Option;

class SelectByQuery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const queryName = this.props.queryName;
        const valKey = this.props.valKey || "val";
        const descrKey = this.props.descrKey || "descr"
        return (
            <Query query={buildGraphQlQueryByName(queryName, valKey, descrKey)}>
                {({loading, error, data}) => {
                    const info = data || {};
                    const listData = info[queryName] || [];
                    return (
                        <Select onChange={this.props.onChange} placeholder={this.props.placeholder} 
                                allowClear value={this.props.value || undefined}>
                        {listData.map((elem)=>{
                            return(
                                <Option value={elem[valKey]} key={elem[valKey]}>{elem[descrKey]}</Option>
                            );
                        })}
                    </Select>
                    );
                }}
            </Query>
        );
    }

}

export default SelectByQuery