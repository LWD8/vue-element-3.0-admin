import {
  getMenu
} from '@/api/menu'
import {
  constantRoutes,
  asyncRoutes
} from '@/router'
import Router from 'vue-router'
import store from '@/store'

/**
 * 路由映射集合
 */
const _routesMap = {}

/**
 * 生成路由映射集合
 * @param {Array} routes
 */
const getRoutesMap = routes => {
  routes.forEach(item => {
    _routesMap[item.name] = item.component
    if (item.children && item.children.length > 0) {
      getRoutesMap(item.children)
    }
  })
  return _routesMap
}

export const routesMap = getRoutesMap(asyncRoutes)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode: 'hash',
  scrollBehavior: (to, from, savePosition) => ({
    // 每次进到页面期望滚到的位置
    x: 0,
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

/**
 * 动态生成路由
 * @param {Array} routesList
 */
const generateRoutes = (routesList) => {
  let routes = filterRoutes(routesList)

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    routes = asyncRoutes
  }

  routes = [
    ...routes
  ]

  router.matcher = createRouter().matcher

  router.addRoutes(routes)

  return routes
}

/**
 * 过滤不符合规则的路由
 * @param {Array} routesList
 */
export const filterRoutes = (routesList) => {
  const routes = []

  routesList.forEach(route => {
    const _ = {}
    _.name = route.display_name
    _.path = route.url
    _.component = routesMap[route.url]
    _.hidden = false
    _.alwaysShow = false
    _.meta = {
      requireAuth: true,
      title: route.display_name,
      icon: route.icon || '',
      activeMenu: route.activeMenu || ''
    }

    if (route.children && route.children.length > 0) {
      _.children = filterRoutes(route.children)
    }
    routes.push(_)
  })

  return routes
}

const state = {
  routes: [],
  addRoutes: [],
  buttonActions: [],
  menus: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  },
  SET_BUTTON_ACTIONS: (state, actions) => {
    state.buttonActions = actions
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  setRoutes({
    commit
  }, routes) {
    commit('SET_ROUTES', routes)
  },
  getRoutes({
    state
  }) {
    return state.routes
  },
  generateActions({
    commit
  }, actions) {
    return new Promise((resolve) => {
      const accessedActions = {}
      actions.forEach(item => {
        accessedActions[item.authCode] = item
      })
      commit('SET_BUTTON_ACTIONS', accessedActions)
      resolve(accessedActions)
    })
  },
  getMenus({
    state,
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      // merchant/menu/user
      if (state.menus && state.menus.length > 0) {
        resolve(state.menus)
      } else {
        getMenu().then(async res => {
          const routes = generateRoutes(res.data.list || [])
          // const routes = generateRoutes([])
          store.dispatch('app/setMenus', [...routes, ...constantRoutes])

          resolve(res.data.list)
        }).catch(err => {
          reject(err)
        })
      }
    })
  },
  updateMenus({
    state,
    commit,
    dispatch
  }, menus) {
    commit('SET_MENUS', menus)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
