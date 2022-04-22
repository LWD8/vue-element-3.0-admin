import fetch from '@/utils/request'

export function handleLogin(data) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data
  })
}
