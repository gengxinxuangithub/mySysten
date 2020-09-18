import router from './router'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// 无需重定向的白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 设置页面title
  document.title = getPageTitle(to.meta.title)

  // 确保用户登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 检测到登录, 默认跳转到首页
      next({ path: '/homePage' })
    } else {
      next()
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单的直接放行
      next()
    } else {
      // 其他没有权限的直接跳转到登录页
      next({ path: '/login' })
    }
  }
})
