/* eslint-disable */
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 200000
})

export let loadingInstance
// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  // 接口响应有误捕捉
  error => {
    return Promise.reject(error)
  }
)

export default service
