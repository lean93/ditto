import React, { Component } from 'react'
import { Form, Row, Col, Icon } from 'antd';
const FormItem = Form.Item;

class ActionContainer extends Component {

    render() {
        const childrens = React.Children.toArray(this.props.children);
        if (childrens.length === 0 || this.props.selected === null) {
            return null;
        } else {
            return (
                <Row align="left" key="reportDetail">
                    <Col span={24} key="files" className="file-download-background">
                        <Form layout={'inline'}>
                            {childrens.map((child, i) => {
                                return (
                                    <FormItem key={i} style={{marginRight: '25px'}}>
                                        {child}
                                    </FormItem>)

                            })}
                            <Icon key="closeX" type="close" style={{ fontSize: 20, color: 'rgb(116, 155, 102)', float: 'right', marginTop: '11px', cursor: 'pointer' }} onClick={this.props.reset} />
                        </Form>
                    </Col>
                </Row>
            );
        }
    }
}

export default ActionContainer;