import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMaterial from 'vue-material/dist/vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

window.Konsent = {
  init(options) {
    new Vue({
      store,
      render: h => h('app', {
      }),
      components: {
	App
      },
    }).$mount('#app')
  },

  foo() {

  }
}

window.Konsent.init()
const event = new Event('KonsentReady')
window.dispatchEvent(event)
