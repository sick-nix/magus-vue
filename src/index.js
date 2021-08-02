import Vue from 'vue'
import App from 'src/App.vue'
import store from 'store'
import router from 'router'
import RouterLink from 'vue-router'
import RouterView from 'vue-router'
import Magus from "src/Magus"
import VueFormulate from '@braid/vue-formulate'
import FormulateVSelectPlugin from 'libs/vue-formulate/vue-select/main'
import VModal from 'vue-js-modal'
import VueSelect from "vue-select"
import assets from 'assets'

Magus.instance.setConfig(window.MAGUS_CONFIG || {})
Magus.setStore(store)

Vue.prototype.$assets = assets
Vue.config.productionTip = false

Vue.use(RouterView)
Vue.use(RouterLink)
Vue.use(VueFormulate, {
  classes: {
    label: 'form-label',
    wrapper: '',
    input(context) {
      const classList = []
      if(context.hasErrors)
        classList.push('border', 'border-danger')
      else if(context.hasValue && context.validation)
        classList.push('border-success')
      switch (context.classification) {
        case 'button':
          classList.push('btn', 'btn-primary', 'btn-block')
          break
        case 'text':
          classList.push('input', 'form-control', 'input-block')
          break
      }
      return classList
    },
    error: ['f6']
  },
  plugins: [ FormulateVSelectPlugin ]
})
Vue.use(VModal)
Vue.component(VueSelect)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
