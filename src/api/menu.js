/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

export function getMenu() {
  return fetchPost(`menu/user_menu`)
}
