/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

// 获取设备列表
export function deviceList() {
  return fetchPost(`device/device_list`)
}

// 获取账号列表
export function appList() {
  return fetchPost(`device/app_list`)
}

// 获取账号信息
export function getAppInfo(data) {
  return fetchPost(`device/get_info`, data)
}
