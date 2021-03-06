import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/249380' : ''
})

const service1 = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/249380' : ''
})


service.interceptors.request.use((config) => {
    config.data = Object.assign({}, config.data, {
        authToken: 'qweasdzxc'
    })
    return config
})

service.interceptors.response.use((resp) => {
    if (resp.data.code === 200) {
        return resp.data.data
    }else{
        // 全局处理错误
        message.error(resp.data.errMsg)
    }
})

// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/v1/articleList', {
        offset,
        limited
    })
} 

// 删除文章
export const deleteArticleById = (id) => {
    return service.post(`/api/v1/articleDelete/${id}`)
} 

// 获取文章
export const getArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
} 

// 保存文章
export const saveArticle = (id, data) => {
    return service.post(`/api/v1/articleEdit/${id}`, data)
} 

// 浏览量统计
export const getAmount = () => {
    return service.post('/api/v1/articleAmount')
} 

// 获取数据
export const getData = (data) => {
    return service.post('/api/v1/getdata', data)
} 
 
// 获取通知列表
export const getNotifications = () => {
    return service.post('/api/v1/nitifications')
}

// 登录接口
export const loginRequest = (userInfo) => {
    return service1.post('/api/v1/login', userInfo)
}