import React, {Component} from 'react';
import { Table, Divider } from 'antd';
import { Modal,Button ,Form, Input, Checkbox} from 'antd';
import axios from 'axios'
const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};


class Home extends Component {
    columns =()=> [{
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '时间',
        dataIndex: 'created_at',
        key: 'created_at',
    },{
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
      <a href="javascript:;" onClick={this.showModalB.bind(this,text)}>编辑</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={this.handleDelete.bind(this,text)}>删除</a>
    </span>
        ),
    }];

    constructor(props) {
        super(props);
        this.state = {
            form:{},
            advertisement: [],
            visibleA: false,
            visible_b: false,
        }
    }

    showModalA = (text) => {
        console.log(text)
        this.setState({
            visibleA: true,
        });
    }
    showModalB = (text) => {
        axios.get(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${text.id}/edit`).then(res => {
            console.log(res)
            this.setState({
                form: res.data.data.advertisement
            })
        })
        this.setState({
            visible_b: true,
        });
    }

    handleOkA = () => {
        this.props.form.validateFields(
            (err,value) => {
                if (!err) {
                    axios.post(`http://cmovie.holyzq.com/api/admin/v1/advertisements`,value).then(res=>{
                        this.handleCancelA()
                        this.init()
                    })
                }
            },
        );
    }

    handleCancelA = () => {
        console.log('Clicked cancel button');
        this.setState({
            visibleA: false,
        });
    }

    handleOkB = () => {
        this.props.form.validateFields(
            (err,value) => {
                if (!err) {
                    axios.put(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${this.state.form.id}`,value).then(res=>{
                        this.init()
                        this.setState({
                            visible_b: false,
                        });
                    })
                }
            },
        );
    }

    handleCancelB = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible_b: false,
        });
    }


    handleChange = (e) => {
        this.setState({
            checkNick: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });
        });
    }

    handleDelete=(text)=>{
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk:()=> {
                axios.delete(`http://cmovie.holyzq.com/api/admin/v1/advertisements/${text.id}`).then(res => {
                    this.init()
                })
            },
            onCancel() {},
        });
    }

    init(){
        axios.get(`http://cmovie.holyzq.com/api/admin/v1/advertisements`).then(res=>{
            this.setState({
                advertisement: res.data.data
            })
        })
    }

    componentDidMount(){
        this.init()
    }

    render() {
        const { visibleA,visible_b,confirmLoading, ModalText } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="App">
                <Button onClick={this.showModalA}>新增</Button>
                <Modal
                    title="新增"
                    visible={visibleA}
                    onOk={this.handleOkA}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancelA}
                    destroyOnClose={true}
                >
                    <div>
                        <Form.Item {...formItemLayout} label="广告id">
                            {getFieldDecorator('advertisement_node_id', {
                                rules: [{
                                    required: true,
                                    message: '请输入广告id',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="照片id">
                            {getFieldDecorator('photo_id', {
                                rules: [{
                                    required: true,
                                    message: '请输入照片id',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="广告名字">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your name',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="网址">
                        {getFieldDecorator('url', {
                            rules: [{
                                required: true,
                                message: 'Please input your url',
                            }],
                        })(
                            <Input placeholder="Please input your name" />
                        )}
                    </Form.Item>
                        <Form.Item {...formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your desc',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="排序">
                            {getFieldDecorator('sort', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your sort',
                                }],
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                    </div>
                </Modal>

                <Modal
                    title="编辑"
                    visible={visible_b}
                    onOk={this.handleOkB}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancelB}
                    destroyOnClose={true}
                >
                    <div>
                        <Form.Item {...formItemLayout} label="广告id">
                            {getFieldDecorator('advertisement_node_id', {
                                rules: [{
                                    required: true,
                                    message: '请输入广告id',
                                }],
                                initialValue: this.state.form.advertisement_node_id
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="照片id">
                            {getFieldDecorator('photo_id', {
                                rules: [{
                                    required: true,
                                    message: '请输入照片id',
                                }],
                                initialValue: this.state.form.photo_id,
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="广告名字">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your name',
                                }],
                                initialValue: this.state.form.name,
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="网址">
                            {getFieldDecorator('url', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your url',
                                }],
                                initialValue: this.state.form.url,
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="描述">
                            {getFieldDecorator('desc', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your desc',
                                }],
                                initialValue: this.state.form.desc,
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="排序">
                            {getFieldDecorator('sort', {
                                rules: [{
                                    required: true,
                                    message: 'Please input your sort',
                                }],
                                initialValue: this.state.form.sort,
                            })(
                                <Input placeholder="Please input your name" />
                            )}
                        </Form.Item>
                    </div>
                </Modal>
                <Table columns={this.columns()} rowKey="id" dataSource={this.state.advertisement} />
            </div>
        );
    }
}

const WrappedDynamicRule = Form.create()(Home);
export default WrappedDynamicRule;

// if(this.checked==false){
// //     var changeArr = $(this).val()
// //     telArr.splice(indexOf(changeArr))
// //     console.log(telArr)
// // }

