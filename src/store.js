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
      state.consents = payload
    }
  }
})

export default store
