import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import axios from '@/api'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import '@/styles/index.less'

// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)
import plugin from '@/components'
Vue.use(plugin)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
