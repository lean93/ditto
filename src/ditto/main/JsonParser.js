import React from 'react'
import { Table } from 'antd';

import InputFilter from './InputFilter';
import gql from 'graphql-tag';
import ShowName from './actions/ShowName';
import DownloadAction from './actions/DownloadAction';
import MutationAction from './actions/MutationAction';
import OpenNewTabAction from './actions/OpenNewTabAction';

const Column = Table.Column;

export const getInputFilters = (data)=>{
    const dataInput = data ||{};
    const inputList = dataInput.inputList ||[]; 
    const buttonsList = dataInput.buttonsList || [];

    const inputElements = inputList.map(input =>{
        return <InputFilter type={input.type} mode={input.mode} keyElement={input.keyElement} format={input.format} key={input.keyElement} clicked={input.clicked}
                            label={input.label} placeholder={input.placeholder} span={input.span} options={input.options} queryName={input.queryName}/>
    }) || [];


    const buttonsElements = buttonsList.map(input =>{
        return <InputFilter type={input.type} mode={input.mode} keyElement={input.keyElement} key={input.keyElement} clicked={input.clicked}
                            label={input.label}/>
    }) || [];
    const resultList = inputElements.concat(buttonsElements);
    return resultList;

}

export const getColumnsTable = (data)=>{
    const dataInput = data || {};
    const columnList = dataInput.inputList ||[]; 

    const columnElements = columnList.map(input =>{
        let styleObj= input.hide?"hide-column":""
        return <Column key={input.keyElement} className={styleObj} title={<b><i>{input.label || input.keyElement}</i></b>} dataIndex={input.keyElement}/>
    }) || [];

    return columnElements;
}

export const buildGraphQlQueryByName=(name, val, descr)=>{
    const queryString = "query Query{ " + name + "{ " + val + " " +descr+" }}";
    return gql([queryString]);
}

export const buildGraphQlQuery = (data , extraColumns, pagination)=>{
    var keys = Object.keys(data);
    if(keys.length > 0){
        let queryString = "query Query(";
        let queryParams ="";
        let variables="";
        let attr="";
        keys.forEach(key =>{
            let typeAttr = "String"
            if(key === "offset" || key === "limit"){
                typeAttr="Float"
            }
            queryParams += "$"+key+": "+typeAttr+",";
            variables +=  key + ": $"+key + ", ";
            if(key !== "offset" && key !== "limit"){
                attr += key + " ";
            }
            
        })
        if(extraColumns.length >0){
            extraColumns.forEach(elem=>{
                attr+= elem.keyElement+ " ";
            })
        }

        queryParams = queryParams.slice(0,-1);
        variables = variables.slice(0,-1);
        if(pagination){
            queryString += queryParams + "){getFilterTestList(" + variables + "){ total content{" + attr + "}}}";
        }else{
            queryString += queryParams + "){getFilterTestList(" + variables + "){" + attr + "} }";
        }
        return gql([queryString]);
    }else{
        return null;
    }
}

export const buildGraphQlMutation = (data)=>{
    var key = data.referenceId || "id";
    var mutationName = data.name || "delete"

    let queryString = "mutation Mutation(";
    let queryParams =  "$"+key+": String"
    let variables= key + ": $"+key ;

    queryString += queryParams + "){" + mutationName +"(" + variables + ")}";
    return gql([queryString]);
}

export const getQueryVariables = (children) =>{
    let queryObj = {}
    children.forEach(elem =>{
        if(elem.props.type !== "button" && elem.props.type !== "column"){
            queryObj[elem.props.keyElement] = null
        }
    })

    return queryObj;
}

export const getMutationVariables = (data, selected) =>{
    let queryObj = {}
    queryObj[data.referenceId]= selected[data.referenceId];
    return queryObj;
}

const getComponent = (data, rowSelected, actionsObj, test) =>{
    const selected = rowSelected || {};
    let buttonSelected={}
    if(data.clicked){
        buttonSelected={ borderWwidth:'5px',borderStyle:'dotted', padding:10};
    }
    switch(data.type){
        case "name":
        return (
                <ShowName key="nameComp" fileName={selected[data.referenceId]} selected={data.clicked}/>
                )
        case "download":
        return (<div style={{...buttonSelected, display:'inline'}} key="downloadContainer">
                <DownloadAction key="download" id={selected[data.referenceId]} url={data.url} textButton={data.text} icon={data.icon} mainUrl={actionsObj.mainUrl}
                                testAction={test}/>
                </div>)
        case "mutation":
        return (<div style={{...buttonSelected, display:'inline'}} key="mutationContainer">
                <MutationAction key="mutation" data={data} selected={rowSelected} text={data.text} actions={actionsObj} testAction={test}/>
                </div>)
        case "open-tab":
        return (<div style={{...buttonSelected, display:'inline'}} key="openNewTab">
                <OpenNewTabAction key="openNewTabButton" id={selected[data.referenceId]} url={data.url} textButton={data.text} icon={data.icon} mainUrl={actionsObj.mainUrl}
                                testAction={test}/>
                </div>)
        default:
            console.error(data.type, " - Not defined to build a action compononet");
            return null;
    }
}

export const getActionsComponents = (data, selected, actionsObj , test)=>{
    const actions = data.actions || [];
    if(actions.length !== 0){
        return actions.map(action =>{
            return getComponent(action,selected, actionsObj, test);
        })

    }else{
        return null;
    }
}

export const isEmptyValue =(value)=>{
    return value=== null || value === undefined || value ==="";
}