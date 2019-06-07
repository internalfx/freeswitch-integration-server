import _ from 'lodash'
// import Promise from 'bluebird'

export const state = function () {
  return {
    auth: {
      user: null
    }
  }
}

export const mutations = {
  set: function (state, payload) {
    Object.entries(payload).forEach(function ([key, val]) {
      _.set(state, key, val)
    })
  }

}

export const actions = {
  nuxtServerInit: async function ({ commit }, { app, env }) {
    // commit('set', { baseURL: env.baseURL })
  }
}

export const getters = {
}
