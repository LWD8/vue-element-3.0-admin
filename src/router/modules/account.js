import Layout from '@/layout'

const accountRouter = {
  path: '/zhanghu',
  component: Layout,
  redirect: '/zhanghu',
  name: 'zhanghu',
  meta: {
    title: '账户信息',
    icon: 'icon-zhanghuxinxi3'
  },
  children: [
    // 用户信息
    {
      path: 'user',
      component: () => import('@/views/account/index'),
      name: 'zhanghu.user',
      meta: {
        title: '用户信息'
      }
    }
  ]
}
export default accountRouter
