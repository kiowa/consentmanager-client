import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

window.Konsent = {
    init(options) {
        window.KonsentOptions = options || {};
        new Vue({
            store,
            components: {
                App
            },
            render: h => h('app', {
            }),
        }).$mount('#app')
    }
}

const event = new Event('KonsentReady')
window.dispatchEvent(event)
