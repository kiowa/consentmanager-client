import Vue from 'vue'
import App from './App.vue'
import store from './store'

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
  }
}

window.Konsent.init()
const event = new Event('KonsentReady')
window.dispatchEvent(event)
