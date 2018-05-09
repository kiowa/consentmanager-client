import Vuex from 'vuex'
import Vue from 'vue'
import uuid from './uuid4'
import Api from './api'

Vue.use(Vuex)

const api = new Api()

const store = new Vuex.Store({
  state: {
    device: '',
    consents: {}
  },

  mutations: {
    device(state, payload) {
      state.device = payload;
      window.localStorage.setItem('consents.device', payload);
    },

    consent(state, payload) {
      Object.assign(state.consents[payload.category], payload);
      let data = state.consents[payload.category];
      data.device = state.device;
      api.saveConsent(data)
      .then(response => {
        Object.assign(state.consents[payload.category], response.data)
        window.localStorage.setItem('consents.consent', JSON.stringify(state.consents))
      });
    },

    consents(state, payload) {
      state.consents = payload;
    }
  },

  actions: {
    async loadConsents(context) {
      let device = window.localStorage.getItem('consents.device');
      if (!device) {
        device = uuid();
      }
      context.commit('device', device);

      let consents = window.localStorage.getItem('consents.consent')
      if (consents === null) {
          consents = {}
      } else {
          consents = JSON.parse(consents)
      }

      await api.categories()
      .then(response => {
        response.data.forEach(category => {
          consents[category.name] = consents[category.name] || {};
          Object.assign(consents[category.name], category);
          consents[category.name].category = category.name;
       })
      });

      await api.consents(device)
      .then(response => {
        response.data.forEach(consent => {
          Object.assign(consents[consent.category], consent)
        })
      })
      context.commit('consents', consents)
    }
  }
})

export default store
