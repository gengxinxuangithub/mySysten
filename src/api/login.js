import { request } from '@/api/config/request'
export function login(data) {
  // 登录接口
  return request({
    url: '/ucp-system/login/login',
    method: 'post',
    data: data
  })
}
//退出登录
export function logOut(params) {
  return request({
    url: '/ucp-system/login/logout',
    method: 'get',
    params
  })
}

//日志分页查询
export function logList(data) {
  return request({
    url: '/ucp-system/log/logList',
    method: 'post',
    data: data
  })
}

//查询日志详情
export function logDetail(data) {
  return request({
    url: '/ucp-system/log/logDetail?id=' + data.id,
    method: 'get',
    data
  })
}

//查询角色列表
export function roleList(data) {
  return request({
    url: '/ucp-system/role/list',
    method: 'post',
    data
  })
}

//新增编辑角色
export function roleUpdate(data) {
  return request({
    url: '/ucp-system/role/saveOrUpdate',
    method: 'post',
    data
  })
}

//删除角色
export function deleteRole(params) {
  return request({
    url: '/ucp-system/role/delete',
    method: 'delete',
    params
  })
}

//获取菜单数据
export function menuList(data) {
  return request({
    url: '/ucp-system/menu/getTree',
    method: 'get',
    data
  })
}

//新增编辑菜单
export function menuUpdate(data) {
  return request({
    url: '/ucp-system/menu/saveOrUpdate',
    method: 'post',
    data
  })
}

//删除菜单
export function menuDelete(params) {
  return request({
    url: '/ucp-system/menu/delete',
    method: 'get',
    params
  })
}

//设置角色菜单权限
export function setRoleMenus(params) {
  return request({
    url: '/ucp-system/role/updateRoleMenus',
    method: 'post',
    params
  })
}

//删除分组信息
export function deleteGroup(data) {
  return request({
    url: `/ucp-system/group/delete/${data.id}`,
    method: 'delete',
    data
  })
}

//根据分组id查询分组详情
export function groupDetail(data) {
  return request({
    url: `/ucp-system/group/get/${data.id}`,
    method: 'delete',
    body: data
  })
}
//分组管理分页查询
export function groupList(data) {
  return request({
    url: `/ucp-system/group/page`,
    method: 'post',
    data
  })
}

//根据id删除分组人员
export function deleteGroupPerson(data) {
  return request({
    url: `/ucp-system/group/person/delete/${data.id}`,
    method: 'get',
    data
  })
}
//在分组中增加或修改人员
export function editGroupPerson(data) {
  return request({
    url: `/ucp-system/group/person/saveOrUpdate`,
    method: 'get',
    data
  })
}
//修改或新增分组信息
export function editGroup(data) {
  return request({
    url: `/ucp-system/group/saveOrUpdate`,
    method: 'post',
    data
  })
}
