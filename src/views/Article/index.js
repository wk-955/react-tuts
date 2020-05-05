import React, { Component } from 'react'
import moment from 'moment'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd'
import { getArticles, deleteArticleById } from '../../requests'

const ButtonGrop = Button.Group

const titleDisplayMap = {
    id: 'id',
    title: '标题',
    author: '作者',
    createAt: '创建时间',
    amount: '阅读量'
}


export default class ArticleList extends Component {
    constructor() {
        super()
        this.state = {
                dataSource: [],
                columns: [],
                total: 0,
                isLoading: false,
                offset: 0,
                limited: 10,
                deleteArticleTitle: '',
                isShowArticleModal: false,
                deleteArticleConfirmLoading: false,
                deleteArticleId: null
        }
    }
    createColumns = (columnKeys) => {
        const columns = columnKeys.map(item => {
            if (item === 'amount') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record) => {
                        const { amount } = record
                        return (
                            <Tooltip title={amount > 250 ? '超过250' : '未超过250'}>
                                <Tag color={amount > 250 ? 'red' : 'green' }>{record.amount}</Tag>
                            </Tooltip>
                        )}
                }
            }
            if (item === 'createAt') {
                return {
                    title: titleDisplayMap[item],
                    key: item,
                    render: (text, record) => {
                        const { createAt } = record
                        return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                    }
                }
            }
            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
            }
        })
        columns.push({
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <ButtonGrop>
                        <Button size="small" type="primary" onClick={this.EditArticle.bind(this, record.id)}>编辑</Button>
                        <Button size="small" type="danger" onClick={this.showDeleteArticle.bind(this, record)}>删除</Button>
                    </ButtonGrop>
                )
            }
        })
        return columns
    }

    EditArticle = (id) => {
        this.props.history.push(`/admin/article/edit/${id}`)
    }
    showDeleteArticle = (record) => {
        this.setState({
            isShowArticleModal: true,
            deleteArticleTitle: record.title,
            deleteArticleId: record.id
        })
    }

    getData = () => {
        this.setState({
            isLoading: true
        })
        getArticles(this.state.offset, this.state.limited)
            .then(resp => {
                const columnKeys = Object.keys(resp.list[0])
                const columns = this.createColumns(columnKeys)
                this.setState({
                    total: resp.total,
                    dataSource: resp.list,
                    columns,
                })
            })
            .catch(err => {
                // 处理错误
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    deleteArticle = () => {
        this.setState({
            deleteArticleConfirmLoading: true
        })
        deleteArticleById(this.state.deleteArticleId)
            .then(resp => {
                message.success(resp.msg)
                this.getData()
            })
            .finally(() => {
                this.setState({
                    deleteArticleConfirmLoading: false,
                    isShowArticleModal: false
            })
        })
    }

    hideDeleteModal = () => {
        this.setState({
            isShowArticleModal: false,
            deleteArticleTitle: '',
            deleteArticleConfirmLoading: false
        })
    }

    onPageChange = (page, pageSize) => {
        this.setState({
            offset: pageSize * (page -1),
            limited: pageSize
        }, () => {
            this.getData()
        })
    }
    onShowSizeChange = (current, size) => {
        this.setState({
            offset: 0,
            limited: size
        }, () => {
            this.getData()
        })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <Card title="文章列表" bordered={false} extra={<Button>导出Excel</Button>} >
                <Table 
                    rowKey={record => record.id}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    loading={this.state.isLoading}
                    pagination={{
                        current: this.state.offset / this.state.limited + 1,
                        total: this.state.total,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        hideOnSinglePage: true,
                        onChange: this.onPageChange,
                        onShowSizeChange: this.onShowSizeChange
                    }}
                />
                <Modal 
                    title='是否删除'
                    visible={this.state.isShowArticleModal}
                    onCancel={this.hideDeleteModal}
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                    onOk={this.deleteArticle.bind()}
                >
                    <Typography><span style={{color: '#f00'}}>{this.state.deleteArticleTitle}</span>?</Typography>
                </Modal>

            </Card>
        )
    }
}
