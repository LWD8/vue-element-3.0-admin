/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

// 获取用户列表
export function getUserList() {
  return fetchPost(`user/list`)
}

// 获取角色信息
export function getRoles() {
  return fetchPost(`user/get_roles`)
}

// 用户编辑、新增
export function userStore(data) {
  return fetchPost(`user/store`, data)
}
