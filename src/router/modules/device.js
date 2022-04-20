import Layout from '@/layout'

const accountRouter = {
  path: '/device',
  component: Layout,
  redirect: '/device',
  name: 'device',
  meta: {
    title: '设备管理',
    icon: 'icon-device'
  },
  children: [
    // 设备列表
    {
      path: 'device_list',
      component: () => import('@/views/device/deviceList'),
      name: 'device.device_list',
      meta: {
        title: '设备列表'
      }
    },
    // 账号列表
    {
      path: 'app_list',
      component: () => import('@/views/device/appList'),
      name: 'device.app_list',
      meta: {
        title: '账号列表'
      }
    }
  ]
}
export default accountRouter
