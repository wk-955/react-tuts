import React, { Component } from 'react'
import { Card, Upload } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/login'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const mapState = state => ({
    avatarUrl: state.user.avatar
})


@connect(mapState, { changeAvatar })
class Profile extends Component {

    state = {
        isUploading: false,
        avatarUrl: ''
    }

    handleUploadAvatar = ({file}) => {
        const data = new FormData()
        data.append('Token', '96e35ec3046076438182633805296a42d70170aa:Gds5fbMeNtHJO_4JvYGLmDA8voA=:eyJkZWFkbGluZSI6MTU4ODY2Nzg4NCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE4MjE0IiwiYWlkIjoiMTY4NjQ1NiIsImZyb20iOiJmaWxlIn0=')
        data.append('file', file)
        this.setState({
            isUploading: true
        })
        axios.post('http://up.imgapi.com/', data)
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({
                        isUploading: false
                    })
                    this.props.changeAvatar(resp.data.linkurl)
                } else {
                    // 处理错误
                    
                }
            })
            .catch(error => {
                console.log(error, '<-err->');
            })
    }

    render () {
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">上传</div>
            </div>
        )
        console.log(this.props)
        console.log(this.state.avatarUrl)
        return (
            <div>
                <Card
                    title='个人设置'
                    bordered={false}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={this.handleUploadAvatar}
                    >
                       {this.props.avatarUrl ? <img src={this.props.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Card>
                
            </div>
        )
    }
}

export default Profile