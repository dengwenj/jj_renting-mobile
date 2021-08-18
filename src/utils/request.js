import axios from 'axios'
import BASE_URL from './url'
import { getItem } from '@utils/storage'

const request = axios.create({
  baseURL: BASE_URL,
})

// 请求拦截器
request.interceptors.request.use(
  // 如果用户已登录，统一给接口设置 token 信息
  function (config) {
    if (getItem('jjzf_token')) {
      config.headers.authorization = getItem('jjzf_token')
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
