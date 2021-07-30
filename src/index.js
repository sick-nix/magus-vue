import Vue from 'vue'
import App from 'src/App.vue'
import store from 'store'
import router from 'router'
import RouterLink from 'vue-router'
import RouterView from 'vue-router'
import Magus from "src/Magus"
import VueFormulate from '@braid/vue-formulate'
import assets from 'assets'

Object.defineProperty(Vue.prototype, '$assets', assets)

Vue.config.productionTip = false

Vue.use(RouterView)
Vue.use(RouterLink)
Vue.use(VueFormulate, {
  classes: {
    label: 'form-label',
    wrapper: 'mb-2',
    input(context) {
      const classList = []
      if(context.hasErrors)
        classList.push('border', 'border-danger')
      else if(context.hasValue && context.validation)
        classList.push('border-success')
      switch (context.classification) {
        case 'button': classList.push('btn', 'btn-primary'); break
        case 'text': classList.push('input', 'form-control'); break
      }
      return classList
    },
    error: ['text-danger', 'small', 'list-unstyled']
  }
})

Magus.instance.setConfig(window.MAGUS_CONFIG || {})
Magus.setStore(store)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
