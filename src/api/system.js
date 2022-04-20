/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

// 获取菜单列表
export function getMenuList() {
  return fetchPost(`menu/list`)
}
