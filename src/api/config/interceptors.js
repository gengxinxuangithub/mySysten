import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import { ErrorMatchList } from '@/api/config/errorMatchList'

export function interceptors(service) {
  service.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers['Authorization'] = getToken()
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== 200) {
        switch (res.code) {
          case 401:
            removeToken()
            location.reload()
            break
          case 405:
            Message({
              message: '请求方法有误, 请检查',
              type: 'error',
              duration: 5 * 1000
            })
            break
          case 500:
            Message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })
            break
          default:
            Message({
              message: res.message,
              type: 'error',
              duration: 5 * 1000
            })
            break
        }
        return Promise.reject(res.message)
      } else {
        return res
      }
    },
    error => {
      let msg = error
      ErrorMatchList.forEach(list => {
        if (list.rule.test(error)) {
          msg = list.msg
        }
      })
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(error)
    }
  )
}
