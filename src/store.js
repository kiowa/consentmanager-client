import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    consents: [
      {
        'id': 'newsletter',
        'label': 'Newsletter',
        'value': false
      },
      {
        'id': 'analytics',
        'label': 'Analytics',
        'value': false
      },
      {
        'id': 'goals',
        'label': 'Conversion tracking',
        'value': false
      }
    ]
  },
  mutations: {
    consent(state, payload) {
      let o = state.consents.filter(c => c.id === payload.id);
      if (o.length === 1) {
        o[0].value = payload.value
      }

      window.localStorage.setItem('consents', JSON.stringify(state.consents))
    },
    consents(state, payload) {
      state.consents = payload;
    }
  },

  actions: {
    loadConsents(context) {
      let consents = window.localStorage.getItem('consents')
      if (consents !== null) {
        context.commit('consents', JSON.parse(consents))
      }
    }
  }
})

export default store
