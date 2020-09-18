import { request } from '@/api/config/request'

/*组织结构模块 */

//获取组织机构树
export function getOrganizeTree(params) {
  return request({
    url: '/ucp-system/organization/getTree',
    method: 'GET',
    params
  })
}

//删除组织机构信息
export function deleteOrganizeMessage(params) {
  return request({
    url: '/ucp-system/organization/delete',
    method: 'GET',
    params
  })
}

//添加组织机构信息
export function addOrganizeMessage(data) {
  return request({
    url: '/ucp-system/organization/save',
    method: 'POST',
    data
  })
}

//修改组织机构信息
export function updataOrganizeMessage(data) {
  return request({
    url: '/ucp-system/organization/update',
    method: 'PUT',
    data
  })
}

//通过名称查询组织信息
export function getOrganizeByName(params) {
  return request({
    url: '/ucp-system/organization/getOrgByName',
    method: 'GET',
    params
  })
}

//获取所有列表信息
export function listAll(params) {
  return request({
    url: '/ucp-system/organization/listAll',
    method: 'GET',
    params
  })
}

/*日志结构模块 */

//获取日志信息
export function logList(data) {
  return request({
    url: '/ucp-system/log/logList',
    method: 'POST',
    data
  })
}

/* 用户管理模块 */

//获取人员列表
export function userList(data) {
  return request({
    url: '/ucp-system/person/lists?size=' + data.size + '&start=' + data.start,
    method: 'POST',
    data
  })
}

//添加人员信息
export function addUserMsg(data) {
  return request({
    url: '/ucp-system/person/save',
    method: 'POST',
    data
  })
}

//编辑用户信息
export function editUserMsg(data) {
  return request({
    url: '/ucp-system/person/savaOrUpdate',
    method: 'POST',
    data
  })
}

//删除用户信息
export function deleteUserMsg(params) {
  return request({
    url: '/ucp-system/person/delete',
    methhod: 'GET',
    params
  })
}

//搜索用户信息
export function getUserMsg(params) {
  return request({
    url: '/ucp-system/person/getByPerson',
    method: 'GET',
    params
  })
}

//获取所有角色
export function roleLists(data) {
  return request({
    url: './ucp-system/role/list',
    method: 'POST',
    data
  })
}

/* 组件管理模块 */

//获取组件列表
