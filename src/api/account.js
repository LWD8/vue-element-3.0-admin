import fetch from '@/utils/request'

// 获取用户列表
export function getUserList() {
  return fetch({
    url: '/user/list',
    method: 'post'
  })
}
