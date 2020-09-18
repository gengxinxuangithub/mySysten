import axios from 'axios'
import { interceptors } from '@/api/config/interceptors'
import { baseRequestConfig } from '@/api/config/config'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  ...baseRequestConfig
})

/**
 * 注册请求响应拦截
 */
interceptors(request)

/**
 * 导出
 */
export { request }
