import Vuex from 'vuex'
import Vue from 'vue'
import uuid from './uuid4'
import Api from './api'

Vue.use(Vuex)

const api = new Api()

const store = new Vuex.Store({
  state: {
    userid: '',
    consents: []
  },

  mutations: {
    userid(state, payload) {
      state.userid = payload;
      window.localStorage.setItem('consents.userid', payload);
    },

    consent(state, payload) {
      Object.assign(state.consents[payload.category], payload);
      window.localStorage.setItem('consents.consent', JSON.stringify(state.consents))
      payload.userid = state.userid
      api.saveConsent(state.consents[payload.category])
    },

    consents(state, payload) {
      state.consents = payload;
    }
  },

  actions: {
    async loadConsents(context) {
      let userid = window.localStorage.getItem('consents.userid');
      if (!userid) {
        userid = uuid();
      }
      context.commit('userid', userid);

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
       })
      });

      await api.consents(userid)
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
