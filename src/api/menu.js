import fetch from '@/utils/request'

export function getMenu() {
  return fetch({
    url: '`menu/user_menu',
    method: 'post'
  })
}
