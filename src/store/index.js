import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    layer: null,
    isEditable: true,
    suggestion: {
      visible: false,
      id: null,
      name: null,
      description: null,
      place: null,
      category: null,
      contactText: null
    },
    category: [
      {key: "name", value: "Мелкий саженец цветы, кусты, земля и т.д."},
      {key: "деревья", value: "Деревья"},
      {key: "вертикаль", value: "Вертикальное озеленение"},
      {key: "благоустройство", value: "Благоустройство"},
      {key: "элемент", value: "Любой элемент благоустройства"}
    ],
    responsibilityAreas: [
      {
        name: "мо",
        title: "ЗНОП местного значения",
        color: "greenyellow"
      },
      {
        name: "район",
        title: "Центральный район",
        color: "green"
      },
      {
        name: "город",
        title: "ЗНОП городского значения",
        color: "yellow"
      },
      {
        name: "улица",
        title: "Улица",
        color: "purple"
      },
      {
        name: "дом",
        title: "Собственность дома",
        color: "pink"
      },
      {
        name: "хз",
        title: "Нерелевантные запросы",
        color: "gray"
      }
    ]
  },

  mutations: {
    setLayer(state, layer) {
      state.layer = layer;
    },
    setSuggestion(state, data) {
      state.suggestion = Object.assign(state.suggestion, data);;
    },
    setSuggestionVisible(state, value) {
      state.suggestion.visible = value;
    },
    toggleEditMode(state) {
      state.isEditable = !state.isEditable;
    }
  },

  actions: {
    setLayerAction({ commit }, layer) {
      commit('setLayer', layer)
    },
    setSuggestionAction({ commit }, value) {
      commit('setSuggestion', value)
    },
    setSuggestionVisibleAction({ commit }, value) {
      commit('setSuggestionVisible', value)
    },
    toggleEditModeAction({ commit }) {
      commit('toggleEditMode')
    },
  },

  getters: {
    layer(state) {
      return state.layer
    },
    suggestion(state) {
      return state.suggestion
    },
    category(state) {
      return state.category
    },
    responsibilityAreas(state) {
      return state.responsibilityAreas
    },
    isEditable(state) {
      return state.isEditable
    }
  }
})