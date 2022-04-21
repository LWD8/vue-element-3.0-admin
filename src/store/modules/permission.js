import { getMenu } from '@/api/menu'
const state = {
  routes: [],
  addRoutes: [],
  buttonActions: [],
  menus: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
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
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  },
  getRoutes({ state }) {
    return state.routes
  },
  generateActions({ commit }, actions) {
    return new Promise(resolve => {
      const accessedActions = {}
      actions.forEach(item => {
        accessedActions[item.authCode] = item
      })
      commit('SET_BUTTON_ACTIONS', accessedActions)
      resolve(accessedActions)
    })
  },
  getMenus({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(res => {
          resolve(res.data.list)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateMenus({ state, commit, dispatch }, menus) {
    commit('SET_MENUS', menus)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
