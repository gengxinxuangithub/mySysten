import axios from 'axios'
import { baseRequestConfig } from '@/api/config/config'
import { interceptors } from '@/api/config/interceptors'

const requestWithoutBaseUrl = axios.create({
  ...baseRequestConfig
})

/**
 * 注册请求响应拦截
 */
interceptors(requestWithoutBaseUrl)

/**
 * 导出
 */
export { requestWithoutBaseUrl }
