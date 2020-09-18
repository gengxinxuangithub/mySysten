import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const routes = [
  {
    path: '/',
    name: 'login',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/index'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/userManagement'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'organizationManagement',
        name: 'organizationManagement',
        component: () => import('@/views/organizationManagement'),
        meta: { title: '组织管理', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/views/roleManagement'),
        meta: { title: '角色管理', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'menuManagement',
        name: 'menuManagement',
        component: () => import('@/views/menuManagement'),
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'authorityManagement',
        name: 'authorityManagement',
        component: () => import('@/views/authorityManagement'),
        meta: { title: '权限管理', icon: 'el-icon-s-flag' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'logManagement',
        name: 'logManagement',
        component: () => import('@/views/logManagement'),
        meta: { title: '日志管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'deviceManagement',
        name: 'deviceManagement',
        component: () => import('@/views/deviceManagement'),
        meta: { title: '设备管理', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'groupManagement',
        name: 'groupManagement',
        component: () => import('@/views/groupManagement'),
        meta: { title: '分组管理', icon: 'el-icon-share' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'systemSettings',
        name: 'systemSettings',
        component: () => import('@/views/systemSettings'),
        meta: { title: '系统设置', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'componentManagement',
        name: 'componentManagement',
        component: () => import('@/views/componentManagement'),
        meta: { title: '组件管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'templateManagement',
        name: 'templateManagement',
        component: () => import('@/views/templateManagement'),
        meta: { title: '模板管理', icon: 'el-icon-s-grid' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'applicationDevelopment',
        name: 'applicationDevelopment',
        component: () => import('@/views/applicationDevelopment'),
        meta: { title: '应用定制开发', icon: 'el-icon-s-cooperation' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '安全管理', icon: 'el-icon-s-opportunity' },
    children: [
      {
        path: 'securityManagement',
        name: 'securityManagement',
        component: () => import('@/views/securityManagement'),
        meta: { title: 'IP授权', icon: 'el-icon-s-flag' },
        children: []
      },
      {
        path: 'singleSignOn',
        name: 'singleSignOn',
        component: () => import('@/views/securityManagement/modules/singleSignOn'),
        meta: { title: '单点登录', icon: 'el-icon-star-on' }
      }
    ]
  },

  // 404页面必须放到路由尾部
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    routes
  })

const router = createRouter()

export default router
