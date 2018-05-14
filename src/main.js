import 'document-register-element'
import Vue from 'vue'
import App from './App.vue'
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

/* window.Konsent = {
 *     init(options) {
 *         window.KonsentOptions = options || {};
 *         new Vue({
 *             store,
 *             components: {
 *                 App
 *             },
 *             render: h => h('app', {
 *             }),
 *         }).$mount('#app')
 *     }
 * }
 * 
 * const event = new Event('KonsentReady')
 * window.dispatchEvent(event) */
