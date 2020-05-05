import React, { Component } from 'react'
import { Card } from 'antd'


class NoAuth extends Component {
    render () {
        return (
            <div>
                <Card>
                    你没有权限查看此页面！
                </Card>
                
            </div>
        )
    }
}

export default NoAuth