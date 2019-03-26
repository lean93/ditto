import React, { Component } from 'react'
import { Button, message } from 'antd';
import {buildGraphQlMutation, getMutationVariables} from '../JsonParser';
import { Mutation } from 'react-apollo';


class MutationAction extends Component {
    constructor(props) {
        super(props);
        this.onCompleted = this.onCompleted.bind(this);
    }
    
    onCompleted(){
        message.success(<b>Action Completed!!!</b>,7);
        const actions = this.props.actions || {};
        actions.reset();
        actions.refetch().catch(e => { console.log(e)});
    }

    onError(){
        message.error(<b>Action Failed!!!</b>,7);
    }

    render() {
        const data= this.props.data || {};
        const variablesMut = getMutationVariables(data, this.props.selected);
        return(
        <Mutation mutation={buildGraphQlMutation(data)} key="mutAct"
            onCompleted={this.onCompleted} onError={this.onError}>
        {(deleteExclusionsHandle) => {
            return (
                <Button type={data.mode || "danger"} icon={data.icon || "delete"} style={{ marginTop: '3px' }} 
                    disabled={this.props.selected === null} key="mutationAction"
                    onClick={() => 
                        deleteExclusionsHandle({ variables: variablesMut})}
                    >
                    {this.props.text || "Mutation"}
                </Button>
            )
            }}
        </Mutation>)
    }
}

export default MutationAction;