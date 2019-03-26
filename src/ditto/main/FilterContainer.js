import React, { Component } from 'react'
import { Form, Row, Col} from 'antd';
import {getQueryVariables, isEmptyValue} from '../main/JsonParser'
import moment from 'moment'

const FormItem = Form.Item;

class FilterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.onClear = this.onClear.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getPropsToInput = this.getPropsToInput.bind(this);
    }

    onClear(){
        const filters = Object.getOwnPropertyNames(this.state);
        filters.forEach(elem=>{
            this.setState({
                [elem]: null
            })
        })
    }

    onChangeInput(keyElement, value){
        this.setState({
            [keyElement]: value
        })
        this.props.hideErrors();
    }

    getButtons(children) {
        const buttons = React.Children.map(children, (child, i) => {
            const keyElement = child.props.keyElement || i;
            let buttonSelected={};
            if(child.props.clicked){
                buttonSelected={ borderWwidth:'5px',borderStyle:'dotted', padding:10}
            }
            const functionButton = child.props.mode ==="submit"? () => this.props.onSearch(this.state): this.onClear; 
            const childrenWithProps = React.cloneElement(child, { key: keyElement, onClick:functionButton});
            return (<div style={{...buttonSelected, display:'inline'}}>
                    {childrenWithProps}
                </div>
            )
        });

        return (
            <Col span={24} style={{ textAlign: 'right',marginTop: '20px'}}>
                {buttons}
            </Col>)
    }
    getFields(children) {
        const columns = React.Children.map(children, (child, i) => {
            let label;
            if (child.props.type === "checkbox"){
                label = "";
            }else{
                if(typeof(child.props.label) == typeof(true)){
                    if(child.props.label){
                        label = "label " + i
                    }else{
                        label ="";
                    }
                }else{
                    label = child.props.label || "label " + i;
                }
            }

            const keyElement = child.props.keyElement || i;
            const childrenWithProps = React.cloneElement(child, this.getPropsToInput(child.props, keyElement));
            let styleSelected={}
            if(child.props.clicked){
                styleSelected={ borderWwidth:'5px',borderStyle:'dotted'}
            }
            let classNameStr="";
            
            if(this.props.showError && this.props.requeriedElements.includes(child.props.keyElement) && isEmptyValue(this.state[child.props.keyElement])){
                classNameStr='has-error';
            }
            return (
                <Col span={child.props.span || 6} key={keyElement}>
                    <FormItem label={<b>{label}</b>} colon={label!==""} className={classNameStr}style={{marginBottom:'2px', paddingBottom:'2px', marginTop:'2px', paddingTop:'2px', ...styleSelected}}>
                        {childrenWithProps}
                    </FormItem>
                </Col>
            )
        });
        return columns;
    }

    componentWillMount(){
        const children = React.Children.toArray(this.props.children);
        const queryObj = getQueryVariables(children);
        this.setState({
            ...queryObj
        });
        if(!this.props.onlyTest){
            this.props.onSearch(queryObj, true);
        }
    }

    getPropsToInput(props, keyElement){
        let data;
        const dateFormat = props.format || "DD-MM-YYYY";
        switch(props.type){
            case "numeric":
            data={
                onChange:(e) => this.onChangeInput(keyElement, e),
                value: this.state[keyElement]
            }
            break;
            case "select":
            data={
                onChange: (e) => this.onChangeInput(keyElement, e),
                value: this.state[keyElement]
            }
            break;
            case "select-by-query":
            data={
                onChange: (e) => this.onChangeInput(keyElement, e),
                value: this.state[keyElement]
            }
            break;
            case "date-range":
            const rangeDate = this.state[keyElement];
            data={
                onChange: (e) => this.onChangeInput(keyElement, this.getDateValue(e, props, dateFormat)),
                value: rangeDate? rangeDate.length !== 0? [ moment(rangeDate[0], dateFormat ),moment(rangeDate[1],dateFormat)]: []: [] 
            }
            break;
            case "date-simple":
            data={
                onChange: (e) => this.onChangeInput(keyElement, this.getDateValue(e, props, dateFormat)),
                value: this.state[keyElement]? moment(this.state[keyElement], dateFormat) : null 
        
            }
            break;
            case "date-period":
                    data={
                        onChange: (e) => this.onChangeInput(keyElement, this.getDateValue(e, props, dateFormat)),
                        value: this.state[keyElement]? moment(this.state[keyElement], dateFormat) : null 
                }
    
            break;
            case "checkbox":
            data={
                onChange: (e) => this.onChangeInput(keyElement, e.target.checked),
                checked: this.state[keyElement] || false
            }
            break;
            default:
            data={
                onChange: (e) => this.onChangeInput(keyElement, e.target.value),
                value: this.state[keyElement]
            }
            break;
        }
        return data;
    }
    
    getDateValue(e, props, format){
        let value;
        if(e === null || e.length ===0){
            return e;
        }else{
            if(props.type==="date-range"){
                value = e.map(dataMoment =>{
                    return moment(dataMoment).format(format);
                });
            }else{
                value = moment(e).format(format);
            }
            return value;
        }
    }

    render() {
        const children = React.Children.toArray(this.props.children);
        const filters = children.filter(child=>{
            return child.props.type !=="button" && child.props.type !=="column" 
        });
        const buttons = children.filter(child=>{
            return child.props.type ==="button"
        });
        return (
            <Form className="filter-background">
                <Row gutter={24} type="flex" align="middle">
                    {this.getFields(filters)}
                </Row>
                <Row>
                    {this.getButtons(buttons)}
                </Row>
            </Form>
        );
    }
}

export default FilterContainer;