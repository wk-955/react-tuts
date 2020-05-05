import React, { Component, createRef } from 'react'
import { Card, Row, Col, } from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import { getAmount } from '../../requests'


export default class Dashboard extends Component {

    constructor() {
        super()
        this.articleAmount = createRef()
    }

    initArticleCharts = () => {
        this.articleChart = echarts.init(this.articleAmount.current)

        getAmount()
            .then((resp) => {

            const option = {
                color: ['#29B6F6'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: resp.amount.map(item => item.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: resp.amount.map(item => item.value),
                    type: 'line',
                    areaStyle: {}
                }]
            }
        this.articleChart.setOption(option)
        })
    }
    

    componentDidMount() {
        this.initArticleCharts()
    }

    render() {
        return (
            <>
                <Card title="概览" bordered={false}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="col-gutter-row" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="col-gutter-row" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="col-gutter-row" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div className="col-gutter-row" style={{backgroundColor: '#29B6F6'}}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="最近浏览" bordered={false}>
                    <div ref={this.articleAmount} style={{height: '240px'}} />
                </Card>
            </>
        )
    }
}
