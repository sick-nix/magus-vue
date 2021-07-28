import Vue from 'vue'
import App from 'src/App.vue'
import store from 'store'
import router from 'router'
import RouterLink from 'vue-router'
import RouterView from 'vue-router'
import Magus from "src/Magus"
import VueFormulate from '@braid/vue-formulate'
import assets from 'assets'

Vue.config.productionTip = false

Vue.use(RouterView)
Vue.use(RouterLink)
Vue.use(VueFormulate, {
  classes: {}
})

Magus.instance.setConfig(window.MAGUS_CONFIG || {})
Magus.setStore(store)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
