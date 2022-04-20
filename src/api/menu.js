/* eslint-disable */
import {
  fetchPost,
} from '@/utils/request'

export function getMenu() {
  return fetchPost(`menu/user_menu`)
}
