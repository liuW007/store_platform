import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import config from '@/config'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.config.productionTip = false

/**
 * @description 将config赋值到Vue原型
 */
Vue.prototype.$config = config

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
