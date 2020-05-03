import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    features: null,
    type: null,
    isEditable: true,
    visibleSuggestion: false,
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
      state.features = layer.features;
      state.type = layer.type;
    },
    saveSuggestion(state, data) {
      const properties = state.features.find(item => item.properties.id === data.id).properties;
      Object.assign(properties, data);      
    },
    toggleEditMode(state) {
      state.isEditable = !state.isEditable;
    },
    toggleVisibleSuggestion(state, value) {
      state.visibleSuggestion = value;
    },
  },

  actions: {
    setLayerAction({ commit }, layer) {
      commit('setLayer', layer)
    },
    saveSuggestionAction({ commit }, value) {
      commit('saveSuggestion', value)
    },
    toggleVisibleSuggestionAction({ commit }, value) {
      commit('toggleVisibleSuggestion', value)
    },
    toggleEditModeAction({ commit }) {
      commit('toggleEditMode')
    },
  },

  getters: {
    layer(state) {
      return {
        features: state.features,
        type: state.type,
      }
    },
    category(state) {
      return state.category
    },
    responsibilityAreas(state) {
      return state.responsibilityAreas
    },
    isEditable(state) {
      return state.isEditable
    },
    visibleSuggestion(state) {
      return state.visibleSuggestion
    },
    suggestion(state) {
      return id => state.features.find(item => item.properties.id === id).properties;
    }
  }
})