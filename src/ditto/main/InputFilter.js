import React, { Component } from 'react'
import { DatePicker, Checkbox, Button, Select } from 'antd';
import NumericInput from './NumericInput';
import Text from './Text';
import SubmitButton from './buttons/SubmitButton';
import ClearButton from './buttons/ClearButton';
import SelectByQuery from './SelectByQuery'

const Option = Select.Option;
const { RangePicker } = DatePicker;
const {MonthPicker} = DatePicker;

class InputFilter extends Component {
    
    render() {
        const type = this.props.type || "text";

        const mainProp={
            onChange: this.props.onChange,
            value: this.props.value,
            className: this.props.className
        }
        switch (type){
            case "text":
                return (
                    <Text placeholder={this.props.placeholder} {...mainProp}/>
                );
            case "column":
            return null;
            case "numeric":
                return (
                    <NumericInput {...mainProp} placeholder={this.props.placeholder}/>
                );
            case "select":
                return(
                    <Select onChange={this.props.onChange} placeholder={this.props.placeholder} allowClear value={this.props.value || undefined}>
                        {(this.props.options || []).map((elem)=>{
                            return(
                                <Option value={elem.val} key={elem.val}>{elem.descr}</Option>
                            );
                        })}
                    </Select>
                );
            case "select-by-query":
                return(
                    <SelectByQuery onChange={this.props.onChange} placeholder={this.props.placeholder} allowClear 
                        value={this.props.value || undefined} queryName={this.props.queryName}/>
        
                );
            case "button":
                switch(this.props.mode){
                    case "submit":
                    return( <SubmitButton style={{width:'100%'}} label={this.props.label} 
                                  onClick={this.props.onClick}/>);
                    case "clear":
                    return(<ClearButton style={{width:'100%'}} label={this.props.label}
                                    onClick={this.props.onClick}/>);
                    default:
                    return(<Button type={getTypeButton(this.props.mode)} onClick={this.props.onClick} icon="search" style={{ marginLeft: '10px' }}>
                                {this.props.text || this.props.label || "new Button"}
                           </Button>);
                }        
            case "date-range":
            return(<RangePicker format={this.props.format || "DD/MM/YYYY"} style={{width:'100%'}}
                                    onChange={this.props.onChange} value={this.props.value === null? []: this.props.value}/>);
            case "date-simple":
            return(<DatePicker format={this.props.format || "DD/MM/YYYY"} style={{width:'100%'}}
                                onChange={this.props.onChange} value={this.props.value}/>);
            case "date-period":
            return(<MonthPicker  onChange={this.props.onChange} style={{width:'100%'}} format={this.props.format}
                        allowClear={false} value={this.props.value}/>);
                
            case "checkbox":
            return(<Checkbox onChange={this.props.onChange} checked={this.props.checked} style={{paddingTop:'3px'}}>{this.props.label || ""}</Checkbox>);
            default:
        }
    }
}

const getTypeButton = (mode)=>{
    switch(mode){
        case "submit":
            return "primary";
        case "clear":
            return "default";
        case "delete":
            return "danger";
        default:
            return "default";
    }
}

export default InputFilter;