import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    layer: null
  },

  mutations: {
    setLayer(state, layer) {
      state.layer = layer;
    }
  },

  actions: {
    setLayerAction({ commit }, layer) {
      commit('setLayer', layer)
    }
  },

  getters: {
    layer(state) {
      return state.layer
    }
  }
})