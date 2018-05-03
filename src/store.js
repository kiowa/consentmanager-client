import Vuex from 'vuex'
import Vue from 'vue'
import Api from './api'
import uuid from './uuid4'

Vue.use(Vuex)

const api = new Api()

const store = new Vuex.Store({
  state: {
    userid: '',
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
    userid(state, payload) {
      state.userid = payload;
      window.localStorage.setItem('consents.userid', payload);
    },

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
      let userid = window.localStorage.getItem('consents.userid');
      if (!userid) {
        userid = uuid();
      }
      context.commit('userid', userid);

      let local_consents = window.localStorage.getItem('consents')
      if (local_consents === null) {
          local_consents = []
      } else {
          local_consents = JSON.parse(local_consents)
      }
      let consents = []
      api.categories()
      .then(response => {
        response.data.forEach(category => {
            let lcs = local_consents.filter(c =>  c.id === category.name )
            let value = null
            if (lcs.length > 0) {
                value = lcs[0].value
            }
            consents.push({
                'id': category.name,
                'label': category.label,
                'value': value || category.default
            })
        })
      })
        context.commit('consents', consents)
    }
  }
})

export default store
