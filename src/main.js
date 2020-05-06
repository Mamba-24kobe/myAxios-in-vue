import Vue from 'vue'
import './plugins/axios'
import  App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import Http from './api/http/Http.js'
Vue.config.productionTip = false
Vue.prototype.$Http = Http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
