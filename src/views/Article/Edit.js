import React, { Component, createRef } from 'react'
import { Card, Button,Form, Input, DatePicker, message, Spin } from 'antd'
import E from 'wangeditor'
import './edit.less'
import { getArticleById, saveArticle } from '../../requests'
import moment from 'moment'


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
const editLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class ArticleEdit extends Component {
    
    constructor () {
      super()
      this.editorRef = createRef()
      this.formRef = createRef()
      this.state = {
        isLoading: false
      }
    }

    initEditor = () => {
      this.editor = new E(this.editorRef.current)
      this.editor.customConfig.onchange = (html) => {
        this.formRef.current.setFieldsValue({
          content: html
        })
      }
      this.editor.create()
    }

    componentDidMount() {
      this.initEditor()
      this.setState({
        isLoading: true
      })
      getArticleById(this.props.match.params.id)
        .then((resp) => {
          const { id, ...data } = resp
          data.createAt = moment(data.createAt)
          this.formRef.current.setFieldsValue(data)
          this.editor.txt.html(data.content)
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }

    render() {
      
      const onFinish = values => {
        this.setState({
          isLoading: true
        })
        // 成功输出
        this.formRef.current.validateFields()
          .then((values) => {
            const data = Object.assign({}, values, {
              createAt: values.createAt.valueOf()
            })
            saveArticle(this.props.match.params.id, data)
              .then((resp) => {
                message.success(resp.msg)
            })
              .finally(() => {
                this.setState({
                  isLoading: false
                })
                this.props.history.push('/admin/article')
              })
        })
      }


      return (
            <Card title='文章编辑' bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>} >
              <Spin spinning={this.state.isLoading}>
                <Form
                  ref={this.formRef}
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入标题!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="作者"
                    name="author"
                    rules={[{ required: true, message: '请输入作者!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="阅读量"
                    name="amount"
                    rules={[{ required: true, message: '请输入阅读量!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="创作时间"
                    name="createAt"
                    rules={[{ required: true, message: '请选择创作时间!' }]}
                  >
                    <DatePicker showTime placeholder="选择时间" />
                  </Form.Item>

                  <Form.Item {...editLayout}
                    label="内容"
                    name="content"
                    rules={[{  message: '内容!' }]}
                  >
                    <div className="editSetting" ref={this.editorRef}/>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      保存修改
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </Card>
        )
    }
} 


export default ArticleEdit