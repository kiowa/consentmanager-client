import 'document-register-element'
import Vue from 'vue'
import store from './store'
import VueCustomElement from 'vue-custom-element'

import ConsentForm from './components/ConsentForm.vue'
import SubjectRequestForm from './components/SubjectRequestForm.vue'


Vue.config.productionTip = false
Vue.config.ignoredElements = [
  'consent-form',
  'subject-request'
]

Vue.use(VueCustomElement)

Vue.customElement('consent-form', ConsentForm, {})
Vue.customElement('subject-request', SubjectRequestForm, {})

window.Consent = {
  accepted: (category) => {
    if (store.state.consents[category]) {
      return store.state.consents[category].accepted
    }
    return false
  },

  device: () => {
    return store.state.device
  }
}
store.dispatch('setupDevice')
